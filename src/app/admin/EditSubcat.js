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


function EditSubCat(props) {
    const ls = require("local-storage")
    const {logindata,logoutUser}  = useContext(AuthCon);
    const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)
    const [namear,setNamear] = useState("");
    const [nameen,setNameen] = useState("");
    const [sicon,setSicon] = useState("");
    const [sizes,setSizes] = useState([]);
    const [cat,setCat] = useState(null)
    const [subcats,setSubcats] = useState([]);
    const [catid,setCatid]= useState(null);
    const router = useRouter(); 
    const [lod,setlod] = useState(false)


    useEffect(() => {
    getCats();
   
    })
    
   
 
   

    const handleSubmit = (event) => {
      event.preventDefault();
  

    
    };


    
    
        
        const getCats=()=>{
         
    
             
        const requestOptions = {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer ' + udata.data.jwt
          },
        
      };
    
        fetch(`${API_URL}catagories`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            
           setCat(data.data);
          }).then(()=>{
         
          getSubcat()
          })
    
    
        }


            
        const getSubcat=()=>{
         
    
             
          const requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + udata.data.jwt
            },
          
        };
      
          fetch(`${API_URL}subcatagories/${props.scatid}?populate=catagory`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              
             setNamear(data.data.attributes.name_ar);
             setNameen(data.data.attributes.name_en);
             setCatid(data.data.attributes.catagory.data.id)
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
      
          fetch(`${API_URL}subcatagories/${id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              
           getSubcats();
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



  if(namear==""||nameen==""||catid==null){
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
                    "catagory":catid
                              
             
                  }
              )
          
        };
      
          fetch(`${API_URL}subcatagories/${props.scatid}?func=EditSubCat`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              
          
              props.notifi("success"," تم تعديل الفئة الفرعية")


              setlod(false);

              props.setpage(6)
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
'cat cat . .'

`

   }} >


    <div style={{gridArea:"namear"}}>
      <InputEl value={namear} outputfunc={(val)=>{setNamear(val)}} label={"Sub-category name (Arabic)"}/>
    </div>

    <div style={{gridArea:"nameen"}}>
      <InputEl value={nameen} outputfunc={(val)=>{setNameen(val)}} label={"Sub-category name (English)"}/>
    </div>

    <div style={{gridArea:"cat"}}>
    <InputEl value={catid} outputfunc={(val)=>{setCatid(val)}} select={true} data={cat}   label={"Category"}/>
    </div>



  
  

   </div>

  

   <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>


<LoadingBtn act={()=>{submitload()}} lod={lod} text={" تعديل الفئة الفرعية"} />
</div>



      
    </div>
    




  )
}

export default EditSubCat