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
import { useSelector } from 'react-redux';
import { AuthCon } from '../contexts/AuthCon';



function EditSize(props) {
    const ls = require("local-storage")
    const {logindata,logoutUser}  = useContext(AuthCon);
    const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)

    const [namear,setNamear] = useState("");
    const [nameen,setNameen] = useState("");
    const [sicon,setSicon] = useState("");
    //const [sizes,setSizes] = useState([]);


    const router = useRouter(); 
    const [lod,setlod] = useState(false)


    useEffect(() => {
    getSize();
   
    }, [])
    
   
 
   

    const handleSubmit = (event) => {
      event.preventDefault();
  

    
    };


    
    
        
        const getSize=()=>{
         
    
             
        const requestOptions = {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer ' + udata.jwt
          },
        
      };
    
        fetch(`${API_URL}sizes/${props.sid}`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            
           //setSizes(data.data);
           setNamear(data.data.attributes.name_ar)
           setNameen(data.data.attributes.name_en)
           setSicon(data.data.attributes.icon)
          }).then(()=>{
         
          
          })
    
    
        }


        const deleteEntry=(id)=>{
         
    
             
          const requestOptions = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + udata.jwt
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



  if(sicon==""||namear==""||nameen==""){
    alert("Empty Feilds")
    return;
  }


        setlod(true);

      
        

        const requestOptions = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + udata.jwt
            },
            body: JSON.stringify(
                {      
                    "name_ar": namear,
                    "name_en":nameen,
                    "icon":sicon,
                  }
              )
          
        };
      
          fetch(`${API_URL}sizes/${props.sid}?func=EditSize`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              
              
              setlod(false);
            }).then(()=>{
              props.setpage(3);
              //return to sizes
                
            
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
      <InputEl value={namear} outputfunc={(val)=>{setNamear(val)}} label={"Size name (Arabic)"}/>
    </div>

    <div  style={{gridArea:"nameen"}}>
      <InputEl value={nameen} outputfunc={(val)=>{setNameen(val)}} label={"Size name (English)"}/>
    </div>


    <div style={{gridArea:"sicon"}}>
      <InputEl value={sicon} outputfunc={(val)=>{setSicon(val)}} label={"Size Icon (X,XXL,...)"}/>
    </div>

  
  

   </div>

  

   <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>


<LoadingBtn act={()=>{submitload()}} lod={lod} text={"Update Size"} />
</div>

      
    </div>
    




  )
}

export default EditSize






















































