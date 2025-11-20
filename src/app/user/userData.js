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
import { useSelector } from 'react-redux';

function AddCat(props) {
    const ls = require("local-storage")
    // const {logindata,logoutUser}  = useContext(AuthCon);

const [logindata,setLogindata]= useState(null)

    const [namear,setNamear] = useState("");
    const [nameen,setNameen] = useState("");
    const [cats,setCats] = useState(null);
    const [cat,setCat] = useState(null);
    const [sizes,setSizes] = useState([]);
    const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)

    const router = useRouter(); 
    const [lod,setlod] = useState(false)

    
   
 
   

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

props.setLod(true)
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
                "Authorization": 'Bearer ' + udata.data.jwt
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

<div className='flex items-center gap-3 mb-8'>
  <div className='p-3 rounded-xl text-white' style={{backgroundColor: Theme.primary}}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  </div>
  <div>
    <h2 className='text-2xl font-bold text-gray-900'>البيانات الشخصية</h2>
    <p className='text-sm text-gray-500'>إدارة معلومات حسابك</p>
  </div>
</div>

<div className='flex justify-center mb-8'>
  <div className='relative'>
    <div className='w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg' style={{backgroundColor: Theme.primary}}>
      {udata?.data?.user?.username?.charAt(0) || 'U'}
    </div>
    <button className='absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border-2 border-gray-100 hover:bg-gray-50 transition-colors'>
      <FaEdit className='text-sm' style={{color: Theme.primary}}/>
    </button>
  </div>
</div>

   



<div className='max-w-2xl mx-auto space-y-6'>
    <div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
      <InputEl value={udata&&udata.data.user.username}  outputfunc={(val)=>{setNamear(val)}} label={" الإسم بالكامل"}/>
    </div>

    <div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
      <InputEl value={udata&&udata.data.user.email} disabled={true} outputfunc={(val)=>{setNameen(val)}} label={" البريد الإلكتروني"}/>
    </div>
    
    <div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
      <InputEl value={udata&&udata.data.user.id}  outputfunc={(val)=>{setNameen(val)}} label={"  رقم الهاتف"}/>
    </div>
</div>

<div className='flex justify-center mt-8'>
  <LoadingBtn act={()=>{submitload()}} icon={<FaSave/>} lod={lod} text={" حفظ التغييرات  "} />
</div>





      
    </div>
    




  )
}

export default AddCat