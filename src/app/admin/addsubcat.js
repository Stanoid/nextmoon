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



function AddSubCat(props) {
    const ls = require("local-storage")
    const {logindata,logoutUser}  = useContext(AuthCon);

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
   
    }, [])
    
   
 
   

    const handleSubmit = (event) => {
      event.preventDefault();
  

    
    };


    
    
        
        const getCats=()=>{
         
    
             
        const requestOptions = {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer ' + ls.get("atkn")
          },
        
      };
    
        fetch(`${API_URL}catagories`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log("cats data ",data.data )
           setCat(data.data);
          }).then(()=>{
         
          getSubcats()
          })
    
    
        }


        const getSubcats=()=>{
         
    
             
          const requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                // "Authorization": 'Bearer ' + ls.get("atkn")
            },
          
        };
      
          fetch(`${API_URL}subcatagories?func=getAllSubcat`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              console.log("subcat normal  data ",data )
             setSubcats(data);
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
      
          fetch(`${API_URL}subcatagories/${id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              console.log("deleted ",data.data )
           getSubcats();
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

      console.log("aaaaaaaaaaaaaaaaaaaaaaa",data)

        
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
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + ls.get("atkn")
            },
            body: JSON.stringify(
                {
                
                    "name_ar":namear,
                    "name_en":nameen,
                    "catagory":catid
                              
             
                  }
              )
          
        };
      
          fetch(`${API_URL}subcatagories?func=AddSubCat`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              console.log("added product data",data )
             getSubcats();
             alert("subcat  added")

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
'cat cat . .'

`

   }} >


    <div style={{gridArea:"namear"}}>
      <InputEl outputfunc={(val)=>{setNamear(val)}} label={"Sub-category name (Arabic)"}/>
    </div>

    <div style={{gridArea:"nameen"}}>
      <InputEl outputfunc={(val)=>{setNameen(val)}} label={"Sub-category name (English)"}/>
    </div>

    <div style={{gridArea:"cat"}}>
    <InputEl value={catid} outputfunc={(val)=>{setCatid(val)}} select={true} data={cat}   label={"Category"}/>
    </div>



  
  

   </div>

  

   <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>


<LoadingBtn act={()=>{submitload()}} lod={lod} text={"Add Sub-category"} />
</div>


<div className='shadow-md' style={{marginTop:20,width:"70%",padding:10,borderRadius:10}}>
<div style={{color:Theme.primary,fontSize:25,fontWeight:"bold"}}>
Added Sub-categories:
</div>
<br/>
<div > 
<table style={{width:"100%"}}>
<tr style={{textAlign:"left",marginBottom:20}}>
    <th>Sub-category Name (English)</th>
    <th>Sub-category Name (Arabic)</th>

    <th>Category Name </th>
   
   
    <th>Edit</th>
    <th>Delete</th>
  </tr>
<br/>
{subcats&&subcats.map((size,index)=>(
<tr  style={{textAlign:"left",padding:5, backgroundColor:index%2==0?"lightgray":"white"  }}>
    <th style={{padding:15}} >  {size.name_en}  </th>
    <th  style={{padding:15}} > {size.name_ar}  </th>
   <th>{size.catagory&&size.catagory.name_en} / {size.catagory&&size.catagory.name_ar}</th>
    <th  style={{padding:15}}>
      <div  onClick={()=>{props.setpage(19,size.id)}}  style={{color:"white",backgroundColor:Theme.secondary,padding:5,borderRadius:100,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
  <FaEdit  />
</div>
</th>
    <th  style={{padding:15}} >
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

export default AddSubCat