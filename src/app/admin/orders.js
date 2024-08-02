'use client'

import React from 'react';
import { useContext,useEffect,useState } from 'react';
import { Theme ,API_URL} from '../local';
import InputEl from '../comps/inputel';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { TiThMenu } from "react-icons/ti";
import { FaCheck,FaHourglass } from 'react-icons/fa6';
import LoadingBtn from '../comps/loadingbtn';
import { FaTimes,FaEdit } from 'react-icons/fa';
import { AuthCon } from '../contexts/AuthCon';



function Orders(props) {
    const ls = require("local-storage")
    const {logindata,logoutUser}  = useContext(AuthCon);

    const [namear,setNamear] = useState("");
    const [nameen,setNameen] = useState("");
    const [colorCode,setColorCode] = useState("");
    const [colors,setcolors] = useState([])
    const [orderData,setOrderdata] = useState(null);
    const router = useRouter(); 
    const [lod,setlod] = useState(false)


    useEffect(() => {
    // loginval();
   getOrders();
    }, [])
    
   
  

    const getOrders=(id)=>{
         
    
             
      const requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + ls.get("atkn")
        },
      
    };
  
      fetch(`${API_URL}orders?func=getOrders`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          
          setOrderdata(data)
        }).then(()=>{
       
        
        })
  
  
      }

        
        const getcolors=()=>{
         
    
             
        const requestOptions = {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer ' + ls.get("atkn")
          },
        
      };
    
        fetch(`${API_URL}colors`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            
           setcolors(data.data);
          }).then(()=>{
         
          
          })
    
    
        }

    


    
   const loginval = ()=>{


    const requestOptions = {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + ls.get("atkn")
      },
    
  };

    fetch(`${API_URL}users/me`, requestOptions)
      .then((response) => response.json())
      .then((data) => {

      

        
  if(data.id){

  if(data.type==1){
       
 
  }else{



    }
  
   }else{
  setLogged(0);
  router.push("/login")

   }
    
     
      });

  }



 const submitload = ()=>{



  if(colorCode==""||namear==""||nameen==""){
    alert("Empty Feilds")
    return;
  }


        setlod(true);

      
        

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + ls.get("atkn")
            },
            body: JSON.stringify(
                {
                  "data":{
                    "name_ar": namear,
                    "name_en": nameen,
                    "colorCode":colorCode,
                    "status": true
                  }
                  
             
                  }
              )
          
        };
      
          fetch(`${API_URL}colors`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              
             setNamear("");
             setNameen("");
             setColorCode("");
             alert("color added")

              setlod(false);
            }).then(()=>{
         
            
            })
      



    }
   


 const expireOrder =(id)=>{

setlod(true);

             
    const requestOptions = {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + ls.get("atkn")
      },
      body: JSON.stringify(
        {
      
          "id":id,
     
          }
      )
    
  };

    fetch(`${API_URL}orders?func=expireOrder`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        
       getOrders();
      }).then(()=>{
     setlod(false)
      
      })


    }

 


 

  return (
  



    
<div 
    style={{
      
      display:"flex",
      alignItems:"center",
      flexDirection:"column",
      justifyContent:"center",
      padding:5
      
 }}>

   




<div className='shadow-md' style={{marginTop:20,width:"90%",padding:10,borderRadius:10}}>
<div style={{color:Theme.primary,fontSize:25,fontWeight:"bold"}}>
Orders:
</div>
<br/>
<div > 
<table  style={{width:"100%"}}>
<tr style={{textAlign:"left",marginBottom:20}}>
    <th>Buyer name</th>
    <th>Order amount</th>
    <th> Payment Status</th>
    <th> Order Date </th>
    <th> Action </th>
    
  </tr>

<br/>


{orderData&&orderData.map((order,index)=>(


<tr  style={{textAlign:"left",padding:5, backgroundColor:index%2==0?"lightgray":"white"  }}>
    <th style={{padding:15}} >  {order.customer_details&&order.customer_details.name}</th>
    <th  style={{padding:15}} > {order.amount_total +" "+order.currency.toUpperCase() } </th>
    <th  style={{padding:15}}> {order.payment_status=="paid"?
      <div style={{display:'flex',alignItems:"center",justifyContent:"flex-start"}}>
        
        <div style={{display:"flex",padding:"3px 15px",alignItems:"center",
          justifyContent:"center",backgroundColor:"#82FA58",color:"white",borderRadius:30}}>
          <FaCheck/>
          <div style={{marginLeft:4}}>Paid</div>
        </div>
        
        </div>:
       <div style={{display:'flex',alignItems:"center",justifyContent:"flex-start"}}>
        
       <div style={{display:"flex",padding:"3px 15px",alignItems:"center",
         justifyContent:"center",backgroundColor:"#FE9A2E",color:"white",borderRadius:30}}>
         <FaHourglass/>
         <div style={{marginLeft:4}}>Pending</div>
       </div>
       
       </div>
       
      }  </th>
    <th  style={{padding:15}}> {Date(order.created).toString().slice(0,Date(order.created).toString().indexOf("GMT"))}  </th>
    <th  style={{padding:15}}> 
      <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
       <div onClick={()=>{expireOrder(order.id)}} style={{display:order.payment_status=="paid"?"none":"flex",width:100,alignItems:"center",
        padding:8,borderRadius:30,backgroundColor:"red",color:"white",justifyContent:"center"}}>
        
        {lod?
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}} className="lds-facebookbtn">
  <div></div><div></div><div></div></div>: 
  <div style={{display:"flex",alignContent:"center",justifyContent:"center"}}>
<div style={{display:"flex",fontSize:17,alignItems:"center",justifyContent:"center",marginRight:5}}> 
<FaTimes />
</div>
<div  style={{display:"flex",alignItems:"center",justifyContent:"center"}}> Cancel </div>
  </div>
  
}
  
        </div> 

        
      </div>
      
        </th>
    
    

  </tr>

))}
</table>
</div>
</div>



      
    </div>
    




  )
}

export default Orders