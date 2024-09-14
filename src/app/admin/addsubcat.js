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
import TableComp from "../comps/sandbox/table"
import { propagateServerField } from 'next/dist/server/lib/render-server';
import { useSelector } from 'react-redux';

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

    const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)

    useEffect(() => {
    getCats();
   
    }, [])
    
   
 
   

    const handleSubmit = (event) => {
      event.preventDefault();
  

    
    };


    
    
        
        const getCats=()=>{
         
    
             props.setLod(true)
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
         
          getSubcats()
          })
    
    
        }


        const getSubcats=()=>{
         
          props.setlod(true)
    
             
          const requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                // "Authorization": 'Bearer ' + udata.data.jwt
            },
          
        };
      
          fetch(`${API_URL}subcatagories?func=getAllSubcat`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              
              console.log(data)
    
              let arr = [];
              for (let i = 0; i < data.length; i++) {
                let ob = {};
               ob.id = data[i].id
                ob.name_ar = data[i].name_ar;
                ob.name_en = data[i].name_en;  
                ob.cat = data[i].catagory.name_ar;
                ob.createdAt = data[i].createdAt;
     
                arr.push(ob) 
               // console.log("rrrr",ob)
               
              }
     
              return arr




             setSubcats(data);
            }).then((arr)=>{
           setSubcats(arr)
            props.setlod(false);
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
  //setLogged(0);
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
      
          fetch(`${API_URL}subcatagories?func=AddSubCat`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              
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
    width:"100%",
display:"grid",
gap:10,
gridTemplateAreas:`
' namear  namear  nameen nameen  ' 
'cat cat . .'

`

   }} >


    <div style={{gridArea:"namear"}}>
      <InputEl outputfunc={(val)=>{setNamear(val)}} label={"إسم الفئة الفرعية (العربية)"}/>
    </div>

    <div style={{gridArea:"nameen"}}>
      <InputEl outputfunc={(val)=>{setNameen(val)}} label={"إسم الفئة الفرعية (الأنجليزية)"}/>
    </div>

    <div style={{gridArea:"cat"}}>
    <InputEl value={catid} outputfunc={(val)=>{setCatid(val)}} select={true} data={cat}   label={"الفئة"}/>
    </div>



  
  

   </div>

  

   <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>


<LoadingBtn act={()=>{submitload()}} lod={lod} text={"Add Sub-category"} />
</div>


<div  className='mt-12 w-full' >


{
  subcats?<TableComp



  columns={
    [
      {name: "ID", uid: "id", sortable: true},
      {name: "الإسم (العربية)", uid: "name_ar", sortable: true},
      {name: "الإسم (الإنجليزية)", uid: "name_en", sortable: true}, 
      {name: "الفئة", uid: "cat", sortable: true},
    
      {name: "الخيارات", uid: "createdAt"},
    ]
   }
   
   data={subcats}
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

export default AddSubCat;
