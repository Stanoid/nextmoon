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
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      // Simulate loading user data
      const timer = setTimeout(() => {
        setLoading(false)
      }, 500)
      return () => clearTimeout(timer)
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
   


 


 

  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px]'>
        <div className="lds-facebook"><div></div><div></div><div></div></div>
        <p className='text-gray-500 mt-4'>جاري تحميل البيانات...</p>
      </div>
    )
  }

  return (
<div dir='rtl' className="w-full">
  {/* Header */}
  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8'>
    <div className='flex items-center gap-4'>
      <div className='p-4 rounded-2xl text-white shadow-lg' style={{backgroundColor: Theme.primary}}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      </div>
      <div>
        <h2 className='text-3xl font-bold text-gray-900'>البيانات الشخصية</h2>
        <p className='text-sm text-gray-500 mt-1'>إدارة معلومات حسابك الشخصية</p>
      </div>
    </div>
  </div>

  {/* Profile Avatar */}
  <div className='flex justify-center mb-8'>
    <div className='relative'>
      <div className='w-28 h-28 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-xl ring-4 ring-white' style={{backgroundColor: Theme.primary}}>
        {udata?.data?.user?.username?.charAt(0) || 'U'}
      </div>
      <button className='absolute bottom-0 right-0 p-3 bg-white rounded-full shadow-lg border-2 border-gray-100 hover:shadow-xl transition-all transform hover:scale-110'>
        <FaEdit className='text-base' style={{color: Theme.primary}}/>
      </button>
    </div>
  </div>

  {/* Form Fields */}
  <div className='max-w-3xl mx-auto space-y-6'>
    <div className='bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-gray-200 transition-all'>
      <div className='flex items-center gap-3 mb-4'>
        <div className='w-10 h-10 rounded-lg flex items-center justify-center' style={{backgroundColor: `${Theme.primary}20`}}>
          <FaUserAlt style={{color: Theme.primary}} />
        </div>
        <label className='text-sm font-semibold text-gray-700'>الإسم بالكامل</label>
      </div>
      <InputEl value={udata&&udata.data.user.username} outputfunc={(val)=>{setNamear(val)}} label={""} />
    </div>

    <div className='bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-gray-200 transition-all'>
      <div className='flex items-center gap-3 mb-4'>
        <div className='w-10 h-10 rounded-lg flex items-center justify-center' style={{backgroundColor: `${Theme.primary}20`}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" style={{color: Theme.primary}}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
        </div>
        <label className='text-sm font-semibold text-gray-700'>البريد الإلكتروني</label>
      </div>
      <InputEl value={udata&&udata.data.user.email} disabled={true} outputfunc={(val)=>{setNameen(val)}} label={""} />
    </div>
    
    <div className='bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-gray-200 transition-all'>
      <div className='flex items-center gap-3 mb-4'>
        <div className='w-10 h-10 rounded-lg flex items-center justify-center' style={{backgroundColor: `${Theme.primary}20`}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" style={{color: Theme.primary}}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
          </svg>
        </div>
        <label className='text-sm font-semibold text-gray-700'>رقم الهاتف</label>
      </div>
      <InputEl value={udata&&udata.data.user.id} outputfunc={(val)=>{setNameen(val)}} label={""} />
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
          <span>حفظ التغييرات</span>
        </>
      )}
    </button>
  </div>
</div>
    




  )
}

export default AddCat