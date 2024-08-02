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



function AddColor(props) {
    const ls = require("local-storage")
    const {logindata,logoutUser}  = useContext(AuthCon);

    const [namear,setNamear] = useState("");
    const [nameen,setNameen] = useState("");
    const [colorCode,setColorCode] = useState("");
    const [colors,setcolors] = useState([])

    const router = useRouter(); 
    const [lod,setlod] = useState(false)


    useEffect(() => {
    // loginval();
   getcolors();
    }, [])
    
   
 
   

    const handleSubmit = (event) => {
      event.preventDefault();
  

    
    };


    
    

    const deleteEntry=(id)=>{
         
    
             
      const requestOptions = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + ls.get("atkn")
        },
      
    };
  
      fetch(`${API_URL}colors/${id}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          
       getcolors();
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
      <InputEl outputfunc={(val)=>{setNamear(val)}} label={"Color name (Arabic)"}/>
    </div>

    <div style={{gridArea:"nameen"}}>
      <InputEl outputfunc={(val)=>{setNameen(val)}} label={"Color name (English)"}/>
    </div>


    <div style={{gridArea:"sicon"}}>
     
    <div class="w-full">
    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
     Color code  
    </label>
    <input style={{width:150,height:80}}  onChange={(e)=>{setColorCode(e.target.value)}} class="appearance-none block  bg-gray-200 text-gray-700 border
     border-gray-200 rounded py-3 px-3 leading-tight focus:outline-none focus:bg-white
      focus:border-gray-500" id="grid-last-name" type='color' placeholder={"Color code"}/>
  </div>


    </div>

  
  

   </div>

  

   <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>


<LoadingBtn act={()=>{submitload()}} lod={lod} text={"Add Color"} />
</div>


<div className='shadow-md' style={{marginTop:20,width:"70%",padding:10,borderRadius:10}}>
<div style={{color:Theme.primary,fontSize:25,fontWeight:"bold"}}>
Added Colors:
</div>
<br/>
<div > 
<table style={{width:"100%"}}>
<tr style={{textAlign:"left",marginBottom:20}}>
    <th>Color Name (English)</th>
    <th>Color Name (Arabic)</th>
    <th> Color Code</th>
    <th> Color </th>
    <th>Edit</th>
    <th>Delete</th>
  </tr>

<br/>


{colors&&colors.map((color,index)=>(


<tr  style={{textAlign:"left",padding:5, backgroundColor:index%2==0?"lightgray":"white"  }}>
    <th style={{padding:15}} >  {color.attributes.name_en}</th>
    <th  style={{padding:15}} > {color.attributes.name_ar}</th>
    <th  style={{padding:15}}> {color.attributes.colorCode}  </th>
    <th> <div style={{width:30,height:30,backgroundColor:color.attributes.colorCode,borderRadius:100}}></div> </th>
    <th  style={{padding:15}}>
      <div   onClick={()=>{props.setpage(17,color.id)}} style={{color:"white",backgroundColor:Theme.secondary,padding:5,borderRadius:100,cursor:"pointer",display:"flex",
      alignItems:"center",justifyContent:"center"}}>
  <FaEdit  />
</div>
</th>
    <th>
    <div onClick={()=>{deleteEntry(color.id)}} style={{color:"white",backgroundColor:"#ff2e2e",padding:5,borderRadius:100,
    cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
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

export default AddColor