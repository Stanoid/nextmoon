'use client'

import React from 'react';
import { useContext,useEffect,useState } from 'react';
import { Theme ,API_URL} from '../local';
import InputEl from '../comps/inputel';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { User } from '@nextui-org/react';
import { TiThMenu } from "react-icons/ti";
import { FaTimes,FaEdit, FaSave, FaUserAlt } from 'react-icons/fa';
import LoadingBtn from '../comps/loadingbtn';
import { AuthCon } from '../contexts/AuthCon';
import TableComp from "../comps/sandbox/table"


function AddCat(props) {
    const ls = require("local-storage")
    // const {logindata,logoutUser}  = useContext(AuthCon);
const [logindata,setLogindata]= useState(null)

    const [namear,setNamear] = useState("");
    const [nameen,setNameen] = useState("");
    const [cats,setCats] = useState(null);
    const [cat,setCat] = useState(null);
    const [sizes,setSizes] = useState([]);


    const router = useRouter(); 
    const [lod,setlod] = useState(false)


    useEffect(() => {


      loginval();
    
   
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
              "Authorization": 'Bearer ' + ls.get("atkn")
          },
        
      };
    
        fetch(`${API_URL}catagories?populate=section`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
         
        //  console.log(data)
            let arr = [];
            for (let i = 0; i < data.data.length; i++) {
              let ob = {};
             ob.id = data.data[i].id
              ob.name_ar = data.data[i].attributes.name_ar;
              ob.name_en = data.data[i].attributes.name_en;  
              ob.section = data.data[i].attributes.section.data.attributes.name_ar;
              ob.createdAt = data.data[i].attributes.createdAt;
   
              arr.push(ob) 
             // console.log("rrrr",ob)
             
            }
   
            return arr
            
         
          }).then((arr)=>{
            setSizes(arr)
            
            props.setLod(false);
          
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
      
          fetch(`${API_URL}catagories/${id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              
           getCats();
            }).then(()=>{
           
            
            })
      
      
          }

    


    
   const loginval = ()=>{

props.setLod(true)
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

      
    setLogindata(data);
       props.setLod(false) 
  if(data.id){


   }else{
 
  router.push("/login")

   }
    
     
      });

  }



 const submitload = ()=>{




  if(namear==""||nameen==""||cat==null){
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
                    "section":cat,
                    "status": true            
             
                  }
              )
          
        };
      
          fetch(`${API_URL}catagories?func=AddCat`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              
             getCats();
           //  alert("size added")

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

<div className='text-moon-200/80 font-semibold w-full  text-right text-2xl mt-3 mb-4 '>
تعديل العنوان
</div>





   



<div className='w-full sm:w-full lg:w-2/3' style={{
    
display:"grid",
gap:10,
gridTemplateAreas:`
' name name'
' city country' 
' details details'
' post street'
' map map'



`

   }} >


    <div style={{gridArea:"name"}}>
      <InputEl outputfunc={(val)=>{setNamear(val)}} label={"  الاسم بالكامل"}/>
    </div>

    <div style={{gridArea:"city"}}>
    
    <InputEl
            value={cat}
            outputfunc={(val) => {
              console.log(val);
            }}
            iden={"color"}
            data={[{id:1,name_ar:"مدينة"}]}
            select={true}
           iscats
            label={"المدينة"}
          />

    </div>
    
    
    <div style={{gridArea:"country"}}>
    
    <InputEl
            value={cat}
            outputfunc={(val) => {
              console.log(val);
            }}
            iden={"color"}
            data={[{id:1,name_ar:"دولة"}]}
            select={true}
           iscats
            label={"الدولة"}
          />

    </div>

    
    <div style={{gridArea:"details"}}>
    <InputEl  outputfunc={(val)=>{setNameen(val)}} label={" تفاصيل العنوان"}/>

    </div>


    
    <div style={{gridArea:"post"}}>
    <InputEl  outputfunc={(val)=>{setNameen(val)}} label={" الرمز البريدي"}/>

    </div>

 
    
    <div style={{gridArea:"street"}}>
    <InputEl  outputfunc={(val)=>{setNameen(val)}} label={"اسم الشارع"}/>

    </div>

   
    <div className='' style={{gridArea:"map"}}>
      <div className='text-lg font-semibold my-2'>
         حدد الموقع على الخريطة
      </div>
   <div className='h-40 w-full bg-moon-100 rounded-md'>

   </div>

    </div>



  
  

   </div>


  

  

   <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>


<LoadingBtn act={()=>{submitload()}} icon={<FaSave/>} lod={lod} text={" حفط  "} />
</div>





      
    </div>
    




  )
}

export default AddCat