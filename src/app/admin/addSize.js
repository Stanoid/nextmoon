'use client'

import React from 'react';
import { useContext,useEffect,useState } from 'react';
import { Theme ,API_URL} from '../local';
import InputEl from '../comps/inputel';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { TiThMenu } from "react-icons/ti";
import { FaTimes,FaEdit } from 'react-icons/fa';
import LoadingBtn from '../comps/loadingbtn';

import { AuthCon } from '../contexts/AuthCon';



function AddSize(props) {
    const ls = require("local-storage")
    const {logindata,logoutUser}  = useContext(AuthCon);

    const [namear,setNamear] = useState("");
    const [nameen,setNameen] = useState("");
    const [sicon,setSicon] = useState("");
    const [sizes,setSizes] = useState([]);


    const router = useRouter(); 
    const [lod,setlod] = useState(false)


    useEffect(() => {
    getSizes();
   
    }, [])
    
   
 
   

    const handleSubmit = (event) => {
      event.preventDefault();
  

    
    };


    
    
        
        const getSizes=()=>{
         
    
             
        const requestOptions = {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer ' + ls.get("atkn")
          },
        
      };
    
        fetch(`${API_URL}sizes`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            
           setSizes(data.data);
          }).then(()=>{
         
          
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
      
          fetch(`${API_URL}sizes/${id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              
           getSizes();
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



  if(sicon==""||namear==""||nameen==""){
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
                
                    "name_ar": namear,
                    "name_en":nameen,
                    "icon":sicon,
                    "status": true
                  
                  
             
                  }
              )
          
        };
      
          fetch(`${API_URL}sizes?func=AddSize`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              
             setNamear("");
             setNameen("");
             setSicon("");
             getSizes();
             alert("size added")

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
    width:"70%",
display:"grid",
gap:10,
gridTemplateAreas:`
' namear  namear  nameen nameen  ' 
'sicon sicon sicon sicon'

`


   }} >


    <div style={{gridArea:"namear"}}>
      <InputEl outputfunc={(val)=>{setNamear(val)}} label={"Size name (Arabic)"}/>
    </div>

    <div style={{gridArea:"nameen"}}>
      <InputEl outputfunc={(val)=>{setNameen(val)}} label={"Size name (English)"}/>
    </div>


    <div style={{gridArea:"sicon"}}>
      <InputEl outputfunc={(val)=>{setSicon(val)}} label={"Size Icon (X,XXL,...)"}/>
    </div>

  
  

   </div>

  

   <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>


<LoadingBtn act={()=>{submitload()}} lod={lod} text={"Add Size"} />
</div>


<div className='shadow-md' style={{marginTop:20,width:"70%",padding:10,borderRadius:10}}>
<div style={{color:Theme.primary,fontSize:25,fontWeight:"bold"}}>
Added Sizes:
</div>
<br/>
<div > 
<table style={{width:"100%"}}>
<tr style={{textAlign:"left",marginBottom:20}}>
    <th>Size Name (English)</th>
    <th>Size Name (Arabic)</th>
    <th> Size icon</th>
    <th>Edit</th>
    <th>Delete</th>
  </tr>
<br/>
{sizes&&sizes.map((size,index)=>(
<tr  style={{textAlign:"left",padding:5, backgroundColor:index%2==0?"lightgray":"white"  }}>
    <th style={{padding:15}} >  {size.attributes.name_en}</th>
    <th  style={{padding:15}} > {size.attributes.name_ar}</th>
    <th  style={{padding:15}}> {size.attributes.icon}</th>
    <th  style={{padding:15}}>
      <div onClick={()=>{props.setpage(16,size.id)}}  style={{color:"white",backgroundColor:Theme.secondary,padding:5,borderRadius:100,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
  <FaEdit  />
</div>
</th>
    <th>
    <div onClick={()=>{deleteEntry(size.id)}} style={{color:"white",backgroundColor:"#ff2e2e",padding:5,borderRadius:100,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
  <FaTimes  />
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

export default AddSize






















































