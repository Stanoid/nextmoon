'use client'

import React from 'react';
import { useContext,useEffect,useState } from 'react';
import { Theme ,API_URL} from '../local';
import InputEl from '../comps/inputel';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { TiThMenu } from "react-icons/ti";
import { FaTimes,FaEdit,FaCheck } from 'react-icons/fa';
import LoadingBtn from '../comps/loadingbtn';
import { AuthCon } from '../contexts/AuthCon';
import TableComp from "../comps/sandbox/table"


function AddCat(props) {
    const ls = require("local-storage")
    const {logindata,logoutUser}  = useContext(AuthCon);

    const [namear,setNamear] = useState("");
    const [nameen,setNameen] = useState("");
    const [cats,setCats] = useState(null);
    const [cat,setCat] = useState(null);
    const [firsttrans,setFirsttrans] = useState(null);
    const [sizes,setSizes] = useState([]);


    const router = useRouter(); 
    const [lod,setlod] = useState(false)


    useEffect(() => {

    //get payment methods from stripe
     // getSections();
      
     props.setLod(false);
   
    })
    
   
 
   

    const handleSubmit = (event) => {
      event.preventDefault();
  

    
    };


    
    
        
        const getSections=()=>{
        
          props.setLod(true);
      
             
        const requestOptions = {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer ' + ls.get("atkn")
          },
        
      };
    
        fetch(`${API_URL}sections`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
          setCats(data.data)
          }).then(()=>{
            
          getCats();
          })
    
    
        }



        const getCats=()=>{
        
          props.setLod(true)
      
             
        const requestOptions = {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer ' + ls.get("atkn")
          },
        
      };
    
        fetch(`${API_URL}catagories?populate=section`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
         
        //  console.log(data)
            let arr = [];
            for (let i = 0; i < data.data.length; i++) {
              let ob = {};
             ob.id = data.data[i].id
              ob.name_ar = data.data[i].attributes.name_ar;
              ob.name_en = data.data[i].attributes.name_en;  
              ob.section = data.data[i].attributes.section.data.attributes.name_ar;
              ob.createdAt = data.data[i].attributes.createdAt;
   
              arr.push(ob) 
             // console.log("rrrr",ob)
             
            }
   
            return arr
            
         
          }).then((arr)=>{
            setSizes(arr)
            
            props.setLod(false);
          
          })
    
    
        }

        const deleteEntry=(id)=>{        
          const requestOptions = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + ls.get("atkn")
            },
          
        };
      
          fetch(`${API_URL}catagories/${id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              
           getCats();
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
  //setLogged(0);
  router.push("/login")

   }
    
     
      });

  }



 const submitload = ()=>{




  if(namear==""||nameen==""||cat==null){
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
                
                    "name_ar":namear,
                    "name_en":nameen,
                    "section":cat,
                    "status": true            
             
                  }
              )
          
        };
      
          fetch(`${API_URL}catagories?func=AddCat`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              
             getCats();
           //  alert("size added")

              setlod(false);
            }).then(()=>{
         
            
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

   



<div style={{
    width:"100%",
display:"grid",
gap:10,
gridTemplateAreas:`
'card card card card '
'cvv cvv exp exp '
'name name name name'
'ops ops ops ops' 



`

   }} >


    <div style={{gridArea:"card"}}>
      <InputEl outputfunc={(val)=>{setNamear(val)}} label={"رقم البطاقة"}/>
    </div>

    <div style={{gridArea:"cvv"}}>
      <InputEl outputfunc={(val)=>{setNameen(val)}} label={" الرمز السري"}/>
    </div>

    <div style={{gridArea:"exp"}}>
      <InputEl outputfunc={(val)=>{setNameen(val)}} label={"تاريخ الإنتهاء"}/>
    </div>
    

    
    <div style={{gridArea:"name"}}>
      <InputEl outputfunc={(val)=>{setNameen(val)}} label={"إسم حامل البطاقة"}/>
    </div>

        
    <div className='my-3' style={{gridArea:"ops"}}>


    <div style={{display:"flex",justifyContent:"start",alignItems:"center"}}>
     <div style={{width:20,height:20,border:"2px solid black"}}>
      <div onClick={()=>{setFirsttrans(!firsttrans)}} style={{width:"100%"
        ,cursor:"pointer",height:"100%",color:"white",fontSize:12,backgroundColor:firsttrans?Theme.primary:"white",display:"flex",alignItems:"center",justifyContent:"center"}}>
    <FaCheck  />
      </div>
     </div>
<div style={{marginRight:7,fontWeight:"bolder",color:"grey"}}>
حفظ البطاقة للمدفوعات المستقبلية 
</div>
     </div>

    </div>
    


 



  
  

   </div>


  

  

   <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>


<LoadingBtn act={()=>{submitload()}} lod={lod} text={"إضافة طريقة الدفع "} />
</div>



<div  className='mt-12 w-full' >


{
  sizes?<TableComp



  columns={
    [
      {name: "ID", uid: "id", sortable: true},
      {name: "الإسم (العربية)", uid: "name_ar", sortable: true},
      {name: "الإسم (الإنجليزية)", uid: "name_en", sortable: true}, 
      {name: "القسم", uid: "section", sortable: true},
    
      {name: "الخيارات", uid: "createdAt"},
    ]
   }
   
   data={sizes}
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


</div>



      
    </div>
    




  )
}

export default AddCat