'use client'
import React from 'react';
import { useContext,useEffect,useState,useRef } from 'react';
import { Theme ,API_URL} from '../local';
import TableComp from '../comps/sandbox/table';
import DeliveryPopup from '../comps/deliveryPopup';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';


function Orders(props) {
    const ls = require("local-storage")
    const childCompRef = useRef();
    const [namear,setNamear] = useState("");
    const [nameen,setNameen] = useState("");
    const [colorCode,setColorCode] = useState("");
    const [openDel,setOpenDel] = useState(false);
    const [colors,setcolors] = useState([])
    const [orderData,setOrderdata] = useState(null);
    const router = useRouter(); 
    const [ordata,setOrdata] = useState(null)
    const [lod,setlod] = useState(false)
    const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)
    

    useEffect(() => {
    // loginval();
   getOrders();
    }, [])
    
   
  const handleOpenDel = (open)=>{
    setOpenDel(open)
  }

    const getOrders=(id)=>{
         
    
      setOpenDel(false)      
             setlod(true)
      const requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + udata.jwt
        },
      
    };
  
      fetch(`${API_URL}orders?func=getDeliveryOrders`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          
          setlod(false)
        setOrderdata(data.reverse())
        }).then(()=>{
       
        
        })
  
  
      }



      const DeliverOrder=(order)=>{


        setOrdata(order);
         setOpenDel(true);

    return

//         setlod(true)
//  const requestOptions = {
//    method: 'POST',
//    headers: {
//        "Content-Type": "application/json",
//        "Authorization": 'Bearer ' + udata.jwt
//    },  body: JSON.stringify(
//     {
//         "id": id,
//       }
//   )
// };
//  fetch(`${API_URL}orders?func=deliverOrder`, requestOptions)
//    .then((response) => response.json())
//    .then((data) => {
//      
//      getOrders();
  
//    }).then(()=>{
  
   
//    })


 }

        
        const getcolors=()=>{
         
    
             
        const requestOptions = {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer ' + udata.jwt
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
          "Authorization": 'Bearer ' + udata.jwt
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
                "Authorization": 'Bearer ' + udata.jwt
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
          "Authorization": 'Bearer ' + udata.jwt
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
  alignItems:"flex-start",
  justifyContent:"center"
      
 }}>

   

                      <div className="flex  flex-col ">
                      

<DeliveryPopup
                          ref={childCompRef}
                          data={ordata?ordata:null}
                          getOrders={()=>{getOrders()}}
                          openHandler={handleOpenDel}
                          open={openDel}
                        />
                      </div>
              




<div className=''  style={{marginTop:20,padding:15,width:"90%",borderRadius:10,backgroundColor:""}}>
<div style={{color:Theme.primary,fontSize:25,fontWeight:"bold"}}>
Orders:
</div>
<br/>

{
  orderData?<TableComp
   data={orderData}
   columns={
    [
      {name: "ID", uid: "id", sortable: true},
      {name: "NAME", uid: "name", sortable: true},
      {name: "PHONE", uid: "phone", sortable: true},
      {name: "CITY", uid: "city", sortable: true},
      {name: "EMAIL", uid: "email",sortable: true },
      {name: "DATE", uid: "date", sortable: true},  
      {name: "STATUS", uid: "status", sortable: true},
      {name: "ACTIONS", uid: "refid"},
    ]
   }
   
   delorder={DeliverOrder}
    />:
  <div style={{
    display:lod?'flex':'none' ,
    alignItems:"center",
    justifyContent:"center"
  }}>
  <div style={{zIndex:10}}>
        <div style={{justifyContent:"center",alignItems:"center"}} className="lds-facebook"><div></div><div></div><div></div></div>
        </div>
  </div>
}

{/* 
 <TableComp data={orderData} /> */}

{/* <div > 
<table  style={{width:"100%"}}>
<tr style={{textAlign:"left",marginBottom:20}}>
 
    <th style={{paddingLeft:10}} > Buyer name</th>
    <th>Buyer phone</th>
    <th>Delivery address</th>
    <th>Status</th> 
    
    <th> View </th>
    
  </tr>

<br/>


{orderData&&orderData.map((order,index)=>(


<tr  style={{textAlign:"left", marginBottom:10,backgroundColor:index%2==0?"#E4E4E4":"white"  }}>
    <th style={{padding:"20px 20px 20px 10px"}} >

    <div>
                             <span> {order.session&&order.session.customer_details.name.toString().split(" ")[0]  } </span>

                             <span> {order.session&&order.session.customer_details.name.toString().split(" ")[order.session&&order.session.customer_details.name.toString().split(" ").length-1]} </span>
                                </div>

       
        
        </th>
    <th> {order.session&&order.session.customer_details.phone } </th>
  
    <th  > {Date(order.session.created).toString().slice(0,Date(order.session.created).toString().indexOf("GMT"))}  </th>
    <th  >
      

    <div className="" style={{display:"flex",alignItems:"center",justifyContent:"flex-start"}} >
                  <div>

                  <div className='shadow-sm text-amber-700 bg-amber-200 ' 
                  style={{
                    display:order.order&&order.order.status=="initiated"?"flex":"none",
                    padding:"7px 11px",
                    alignItems:"center",
                    borderRadius:8,
                    justifyContent:"center",
                    fontWeight:"bold"
                  }}
                  >
                    <div  className='bg-amber-700' style={{width:10,height:10,borderRadius:100,marginRight:7}}></div>
                    <div>Not Delivered</div>
                  </div>

                  <div className='shadow-sm text-green-600 bg-green-300 ' 
                  style={{
                    display:order.order&&order.order.status=="delivered"?"flex":"none",
                    padding:"7px 11px",
                    borderRadius:8,
                    alignItems:"center",
                    justifyContent:"center",
                    fontWeight:"bold"
                  }}
                  >
                    <div  className='bg-green-600' style={{width:10,height:10,borderRadius:100,marginRight:7}}></div>
                    <div>Delivered</div>
                  </div>
               

                  </div>
        


                  
                  </div>




      
       </th> 
    <th >
    
        <div   style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div onClick={()=>{ DeliverOrder(order)}} className='shadow-md rounded-full'  style={{padding:10,cursor:"pointer",backgroundColor:Theme.primary,color:"white",fontSize:"1 rem"}}> <FaEye/> </div>
        </div>
    
      
        </th>
    
    

  </tr>

))}
</table>

<div style={{
  display:lod?'flex':'none' ,
  alignItems:"center",
  justifyContent:"center"
}}>
<div style={{zIndex:10}}>
      <div style={{justifyContent:"center",alignItems:"center"}} className="lds-facebook"><div></div><div></div><div></div></div>
      </div>
</div>
</div> */}
</div>



      
    </div>
    




  )
}

export default Orders