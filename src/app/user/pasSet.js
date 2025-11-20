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

<div dir='rtl' className="w-full">
  {/* Header */}
  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8'>
    <div className='flex items-center gap-4'>
      <div className='p-4 rounded-2xl text-white shadow-lg' style={{backgroundColor: Theme.primary}}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
      </div>
      <div>
        <h2 className='text-3xl font-bold text-gray-900'>تغيير كلمة المرور</h2>
        <p className='text-sm text-gray-500 mt-1'>تحديث كلمة المرور الخاصة بحسابك</p>
      </div>
    </div>
  </div>

  {/* Security Info */}
  <div className='bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-xl p-5 mb-8'>
    <div className='flex items-start gap-3'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
      </svg>
      <div>
        <h3 className='font-semibold text-blue-900 mb-1'>نصائح لكلمة مرور قوية</h3>
        <ul className='text-sm text-blue-800 space-y-1'>
          <li>• استخدم 8 أحرف على الأقل</li>
          <li>• اجمع بين الأحرف الكبيرة والصغيرة والأرقام</li>
          <li>• تجنب استخدام معلومات شخصية</li>
        </ul>
      </div>
    </div>
  </div>

  {/* Form Fields */}
  <div className='max-w-3xl mx-auto space-y-6'>
    <div className='bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-gray-200 transition-all'>
      <div className='flex items-center gap-3 mb-4'>
        <div className='w-10 h-10 rounded-lg flex items-center justify-center' style={{backgroundColor: `${Theme.primary}20`}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" style={{color: Theme.primary}}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
          </svg>
        </div>
        <label className='text-sm font-semibold text-gray-700'>كلمة المرور الحالية</label>
      </div>
      <InputEl outputfunc={(val)=>{setNamear(val)}} label={""} />
    </div>

    <div className='bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-gray-200 transition-all'>
      <div className='flex items-center gap-3 mb-4'>
        <div className='w-10 h-10 rounded-lg flex items-center justify-center' style={{backgroundColor: `${Theme.primary}20`}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" style={{color: Theme.primary}}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </div>
        <label className='text-sm font-semibold text-gray-700'>كلمة المرور الجديدة</label>
      </div>
      <InputEl outputfunc={(val)=>{setNameen(val)}} label={""} />
    </div>
    
    <div className='bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-gray-200 transition-all'>
      <div className='flex items-center gap-3 mb-4'>
        <div className='w-10 h-10 rounded-lg flex items-center justify-center' style={{backgroundColor: `${Theme.primary}20`}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" style={{color: Theme.primary}}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <label className='text-sm font-semibold text-gray-700'>تأكيد كلمة المرور</label>
      </div>
      <InputEl outputfunc={(val)=>{setNameen(val)}} label={""} />
    </div>
  </div>

  {/* Save Button */}
  <div className='flex justify-center mt-10'>
    <button
      onClick={()=>{submitload()}}
      disabled={lod}
      className='flex items-center gap-3 px-10 py-4 rounded-xl text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
      style={{backgroundColor: Theme.primary}}
    >
      {lod ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>جاري الحفظ...</span>
        </>
      ) : (
        <>
          <FaSave className='text-xl' />
          <span>تحديث كلمة المرور</span>
        </>
      )}
    </button>
  </div>
</div>

      
    </div>
    




  )
}

export default AddCat