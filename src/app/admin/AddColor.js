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
import TableComp from "../comps/sandbox/table"
import { useSelector } from 'react-redux';

function AddColor(props) {
    const ls = require("local-storage")
    const {logindata,logoutUser}  = useContext(AuthCon);

    const [namear,setNamear] = useState("");
    const [nameen,setNameen] = useState("");
    const [colorCode,setColorCode] = useState("");
    const [colors,setcolors] = useState([])

    const router = useRouter(); 
    const [lod,setlod] = useState(false)
    const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)


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

        
        const getcolors=()=>{
         props.setLod(true)
    
             
        const requestOptions = {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer ' + udata.data.jwt
          },
        
      };
    
        fetch(`${API_URL}colors`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
          
            let arr = [];
            for (let i = 0; i < data.data.length; i++) {
              let ob = {};
             ob.id = data.data[i].id
              ob.name_ar = data.data[i].attributes.name_ar;
              ob.name_en = data.data[i].attributes.name_en;  
              ob.colorCode = data.data[i].attributes.colorCode;
              ob.color = data.data[i].attributes.colorCode;
              ob.colore = data.data[i].attributes.createdAt;
   
              arr.push(ob) 
             // console.log("rrrr",ob)
             
            }

            return arr
          
          }).then((arr)=>{
         props.setLod(false);
          setcolors(arr)
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
  //setLogged(0);
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
                "Authorization": 'Bearer ' + udata.data.jwt
            },
            body: JSON.stringify(
                {
                
                    "name_ar": namear,
                    "name_en": nameen,
                    "colorCode":colorCode,
                    "status": true
               
                  
             
                  }
              )
          
        };


        console.log(requestOptions)
      
          fetch(`${API_URL}colors?func=AddColor`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              
             setNamear("");
             setNameen("");
             setColorCode("");
            // alert("color added")
            props.notifi("success","تمت إضافة  اللون")
              setlod(false);
            }).then(()=>{
         getcolors();
            
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
' namear  namear  nameen nameen  ' 
'sicon sicon sicon sicon'

`
   }} >
    <div style={{gridArea:"namear"}}>
      <InputEl value={namear} outputfunc={(val)=>{setNamear(val)}}  label={"إسم اللون (العربية)"}/>
    </div>
    <div style={{gridArea:"nameen"}}>
      <InputEl value={nameen} outputfunc={(val)=>{setNameen(val)}} label={"إسم اللون (الإنجليزية)"}/>
    </div>
    <div style={{gridArea:"sicon"}}>
    <div class="w-full">
    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
     Color code  
    </label>
    <input style={{width:150,height:80}} value={colorCode} onChange={(e)=>{setColorCode(e.target.value)}} class="appearance-none block  bg-gray-200 text-gray-700 border
     border-gray-200 rounded py-3 px-3 leading-tight focus:outline-none focus:bg-white
      focus:border-gray-500" id="grid-last-name" type='color' placeholder={"اللون"}/>
  </div>
    </div>
   </div>

  

   <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>


<LoadingBtn act={()=>{submitload()}} lod={lod} text={"إضافة اللون"} />
</div>


<div className='w-full mt-6' > 

{
  colors?<TableComp


editColor={(color)=>{props.setpage(17,color.id)}}
  columns={
    [
      {name: "ID", uid: "id", sortable: true},
      {name: "الإسم (العربية)", uid: "name_ar", sortable: true},
      {name: "الإسم (الإنجليزية)", uid: "name_en", sortable: true}, 
      {name: "الرمز", uid: "colorCode", sortable: true},
      {name: "اللون", uid: "color", sortable: true},
      {name: "الخيارات", uid: "colore"},
    ]
   }
   
   data={colors}
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

export default AddColor