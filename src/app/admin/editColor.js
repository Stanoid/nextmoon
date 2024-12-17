'use client'

import React from 'react';
import { useContext,useEffect,useState } from 'react';
import { Theme ,API_URL} from '../local';
import InputEl from '../comps/inputel';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { TiThMenu } from "react-icons/ti";
import LoadingBtn from '../comps/loadingbtn';
import { FaTimes,FaEdit } from 'react-icons/fa';
import { AuthCon } from '../contexts/AuthCon';
import { useSelector } from 'react-redux';


function EditColor(props) {
    const ls = require("local-storage")
    const {logindata,logoutUser}  = useContext(AuthCon);

    const [namear,setNamear] = useState("");
    const [nameen,setNameen] = useState("");
    const [colorCode,setColorCode] = useState("");
    const [colors,setcolors] = useState([])
    const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)

    const router = useRouter(); 
    const [lod,setlod] = useState(false)


    useEffect(() => {
    // loginval();
   getcolor();
    })
    
   
 
   

    const handleSubmit = (event) => {
      event.preventDefault();
  

    
    };


    
    

    const deleteEntry=(id)=>{
         
    
             
      const requestOptions = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + udata.data.jwt
        },
      
    };
  
      fetch(`${API_URL}colors/${id}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          
       getcolors();
        }).then(()=>{
       
        
        })
  
  
      }

        
        const getcolor=()=>{
         
    props.setLod(true)
             
        const requestOptions = {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer ' + udata.data.jwt
          },
        
      };
    
        fetch(`${API_URL}colors/${props.cid}`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            
            setNamear(data.data.attributes.name_ar);
            setNameen(data.data.attributes.name_en);
            setColorCode(data.data.attributes.colorCode)
          
          }).then(()=>{
         
          props.setLod(false)
          })
    
    
        }

    


    
   const loginval = ()=>{


    const requestOptions = {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + udata.data.jwt
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
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + udata.data.jwt
            },
            body: JSON.stringify(
                {
                 
                    "name_ar": namear,
                    "name_en": nameen,
                    "colorCode":colorCode,
                    
                
                  
             
                  }
              )
          
        };
      
          fetch(`${API_URL}colors/${props.cid}?func=EditColor`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              props.notifi("success","تم نعديل اللون")
              setlod(false);
            }).then(()=>{
         props.setpage(4);
            
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
      <InputEl value={namear} outputfunc={(val)=>{setNamear(val)}} label={"Color name (Arabic)"}/>
    </div>

    <div style={{gridArea:"nameen"}}>
      <InputEl value={nameen} outputfunc={(val)=>{setNameen(val)}} label={"Color name (English)"}/>
    </div>


    <div style={{gridArea:"sicon"}}>
     
    <div class="w-full">
    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
     Color code  
    </label>
    <input style={{width:150,height:80}} value={colorCode}  onChange={(e)=>{setColorCode(e.target.value)}} class="appearance-none block  bg-gray-200 text-gray-700 border
     border-gray-200 rounded py-3 px-3 leading-tight focus:outline-none focus:bg-white
      focus:border-gray-500" id="grid-last-name" type='color' placeholder={"Color code"}/>
  </div>


    </div>

  
  

   </div>

  

   <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>


<LoadingBtn act={()=>{submitload()}} lod={lod} text={"تعديل اللون "} />
</div>


      
    </div>
    




  )
}

export default EditColor