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
import { useSelector } from 'react-redux';


function EditCat(props) {
    const ls = require("local-storage")
    const {logindata,logoutUser}  = useContext(AuthCon);

    const [namear,setNamear] = useState("");
    const [nameen,setNameen] = useState("");
    const [sizes,setSizes] = useState([]);

    const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)

    const router = useRouter(); 
    const [lod,setlod] = useState(false)


    useEffect(() => {
    getCat();
   
    })
    
   
 
   

    const handleSubmit = (event) => {
      event.preventDefault();
  

    
    };


    
    
        
        const getCat=()=>{
         
    
             
        const requestOptions = {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer ' + udata.data.jwt
          },
        
      };
    
        fetch(`${API_URL}catagories/${props.catid}`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            
            setNamear(data.data.attributes.name_ar);
            setNameen(data.data.attributes.name_en);
         ////set states of inputs
          }).then(()=>{
         
          
          })
    
    
        }


        const deleteEntry=(id)=>{        
          const requestOptions = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + udata.data.jwt
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



  if(namear==""||nameen==""){
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
                    "name_ar":namear,
                    "name_en":nameen,         
             
                  }
              )
          
        };
      
          fetch(`${API_URL}catagories/${props.catid}?func=EditCat`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              
         
          
props.notifi("success","تم تعديل الفئة")
              setlod(false);
            }).then(()=>{
           props.setpage(5);
             
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


`

   }} >


    <div style={{gridArea:"namear"}}>
      <InputEl value={namear} outputfunc={(val)=>{setNamear(val)}} label={"Category name (Arabic)"}/>
    </div>

    <div style={{gridArea:"nameen"}}>
      <InputEl value={nameen} outputfunc={(val)=>{setNameen(val)}} label={"Category name (English)"}/>
    </div>




  
  

   </div>

  

   <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>


<LoadingBtn act={()=>{submitload()}} lod={lod} text={"تعديل الفئة "} />
</div>



      
    </div>
    




  )
}

export default EditCat