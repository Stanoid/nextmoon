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
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      // Simulate loading address data
      const timer = setTimeout(() => {
        setLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    }, [])


//     useEffect(() => {


// //      loginval();
    
   
//     })
    
   
 
   

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
   


 


 

  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px]'>
        <div className="lds-facebook"><div></div><div></div><div></div></div>
        <p className='text-gray-500 mt-4'>جاري تحميل العنوان...</p>
      </div>
    )
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
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
      </div>
      <div>
        <h2 className='text-3xl font-bold text-gray-900'>تعديل العنوان</h2>
        <p className='text-sm text-gray-500 mt-1'>إدارة عناوين التوصيل الخاصة بك</p>
      </div>
    </div>
  </div>

  {/* Form Fields */}
  <div className='max-w-5xl mx-auto'>
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      {/* Full Name */}
      <div className='lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-gray-200 transition-all'>
        <div className='flex items-center gap-3 mb-4'>
          <div className='w-10 h-10 rounded-lg flex items-center justify-center' style={{backgroundColor: `${Theme.primary}20`}}>
            <FaUserAlt style={{color: Theme.primary}} />
          </div>
          <label className='text-sm font-semibold text-gray-700'>الاسم بالكامل</label>
        </div>
        <InputEl outputfunc={(val)=>{setNamear(val)}} label={""}/>
      </div>

      {/* City */}
      <div className='bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-gray-200 transition-all'>
        <div className='flex items-center gap-3 mb-4'>
          <div className='w-10 h-10 rounded-lg flex items-center justify-center' style={{backgroundColor: `${Theme.primary}20`}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" style={{color: Theme.primary}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
            </svg>
          </div>
          <label className='text-sm font-semibold text-gray-700'>المدينة</label>
        </div>
        <InputEl
          value={cat}
          outputfunc={(val) => {console.log(val);}}
          iden={"color"}
          data={[{id:1,name_ar:"مدينة"}]}
          select={true}
          iscats
          label={""}
        />
      </div>
      
      {/* Country */}
      <div className='bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-gray-200 transition-all'>
        <div className='flex items-center gap-3 mb-4'>
          <div className='w-10 h-10 rounded-lg flex items-center justify-center' style={{backgroundColor: `${Theme.primary}20`}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" style={{color: Theme.primary}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
          </div>
          <label className='text-sm font-semibold text-gray-700'>الدولة</label>
        </div>
        <InputEl
          value={cat}
          outputfunc={(val) => {console.log(val);}}
          iden={"color"}
          data={[{id:1,name_ar:"دولة"}]}
          select={true}
          iscats
          label={""}
        />
      </div>

      {/* Address Details */}
      <div className='lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-gray-200 transition-all'>
        <div className='flex items-center gap-3 mb-4'>
          <div className='w-10 h-10 rounded-lg flex items-center justify-center' style={{backgroundColor: `${Theme.primary}20`}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" style={{color: Theme.primary}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          </div>
          <label className='text-sm font-semibold text-gray-700'>تفاصيل العنوان</label>
        </div>
        <InputEl outputfunc={(val)=>{setNameen(val)}} label={""}/>
      </div>

      {/* Postal Code */}
      <div className='bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-gray-200 transition-all'>
        <div className='flex items-center gap-3 mb-4'>
          <div className='w-10 h-10 rounded-lg flex items-center justify-center' style={{backgroundColor: `${Theme.primary}20`}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" style={{color: Theme.primary}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <label className='text-sm font-semibold text-gray-700'>الرمز البريدي</label>
        </div>
        <InputEl outputfunc={(val)=>{setNameen(val)}} label={""}/>
      </div>
      
      {/* Street Name */}
      <div className='bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-gray-200 transition-all'>
        <div className='flex items-center gap-3 mb-4'>
          <div className='w-10 h-10 rounded-lg flex items-center justify-center' style={{backgroundColor: `${Theme.primary}20`}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" style={{color: Theme.primary}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
            </svg>
          </div>
          <label className='text-sm font-semibold text-gray-700'>اسم الشارع</label>
        </div>
        <InputEl outputfunc={(val)=>{setNameen(val)}} label={""}/>
      </div>

      {/* Map */}
      <div className='lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100'>
        <div className='flex items-center gap-3 mb-4'>
          <div className='w-10 h-10 rounded-lg flex items-center justify-center' style={{backgroundColor: `${Theme.primary}20`}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" style={{color: Theme.primary}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
            </svg>
          </div>
          <label className='text-sm font-semibold text-gray-700'>حدد الموقع على الخريطة</label>
        </div>
        <div className='h-72 w-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-gray-400 transition-all cursor-pointer group'>
          <div className='text-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-400 mx-auto mb-3 group-hover:text-gray-500 transition-colors">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <p className='text-gray-500 font-medium'>انقر لتحديد الموقع</p>
          </div>
        </div>
      </div>
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
          <span>حفظ العنوان</span>
        </>
      )}
    </button>
  </div>
</div>





      
    </div>
    




  )
}

export default AddCat