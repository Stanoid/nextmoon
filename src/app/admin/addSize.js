'use client'

import React from 'react';
import { useContext,useEffect,useState } from 'react';
import { Theme ,API_URL} from '../local';
import InputEl from '../comps/inputel';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import TableComp from "../comps/sandbox/table"
import { TiThMenu } from "react-icons/ti";
import { FaTimes,FaEdit } from 'react-icons/fa';
import LoadingBtn from '../comps/loadingbtn';
import { useSelector } from 'react-redux';
import { AuthCon } from '../contexts/AuthCon';



function AddSize(props) {
    const ls = require("local-storage")
    const {logindata,logoutUser}  = useContext(AuthCon);

    const [namear,setNamear] = useState("");
    const [nameen,setNameen] = useState("");
    const [sicon,setSicon] = useState("");
    const [sizes,setSizes] = useState([]);

    const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)

    const router = useRouter(); 
    const [lod,setlod] = useState(false)


    useEffect(() => {
    getSizes();
   
    }, [])
    
   
 
   

    const handleSubmit = (event) => {
      event.preventDefault();
  

    
    };


    
    
        
        const getSizes=()=>{
         
    props.setLod(true);
             
        const requestOptions = {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer ' + udata.data.jwt
          },
        
      };
    
        fetch(`${API_URL}sizes`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
       let arr = [];
         for (let i = 0; i < data.data.length; i++) {
           let ob = {};
          ob.id = data.data[i].id
           ob.name_ar = data.data[i].attributes.name_ar;
           ob.name_en = data.data[i].attributes.name_en;  
           ob.icon = data.data[i].attributes.icon;
           ob.createdAt = data.data[i].attributes.createdAt;

           arr.push(ob) 
          // console.log("rrrr",ob)
          
         }

         return arr
          }).then((arr)=>{
          setSizes(arr);
          setlod(false)
            props.setLod(false);
         console.log("ddd",arr)
          })
    
    
        }


        const deleteEntry=(id)=>{
         
   // setlod(true)
             
          const requestOptions = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + udata.data.jwt
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



  if(sicon==""||namear==""||nameen==""){
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
           //  alert("size added")

             // setlod(false);
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
'sicon sicon sicon sicon'

`


   }} >


    <div style={{gridArea:"namear"}}>
      <InputEl outputfunc={(val)=>{setNamear(val)}} label={"إسم المقاس (العربية)"}/>
    </div>

    <div style={{gridArea:"nameen"}}>
      <InputEl outputfunc={(val)=>{setNameen(val)}} label={"إسم المقاس (الإنجليزية)"}/>
    </div>


    <div style={{gridArea:"sicon"}}>
      <InputEl outputfunc={(val)=>{setSicon(val)}} label={"الرمز  (X,XXL,...)"}/>
    </div>

  
  

   </div>

  

   <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>


<LoadingBtn act={()=>{submitload()}} lod={lod} text={"إضافة المقاس "} />
</div>



<div  className='w-full mt-6'>   



{
  sizes?<TableComp



  columns={
    [
      {name: "ID", uid: "id", sortable: true},
      {name: "الإسم (العربية)", uid: "name_ar", sortable: true},
      {name: "الإسم (الإنجليزية)", uid: "name_en", sortable: true}, 
      {name: "الرمز", uid: "icon", sortable: true},
    
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

export default AddSize






















































