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
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  </div>
  <div>
    <h2 className='text-2xl font-bold text-gray-900'>تعديل العنوان</h2>
    <p className='text-sm text-gray-500'>إدارة عناوين التوصيل</p>
  </div>
</div>





   



<div className='max-w-4xl mx-auto'>
  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
    <div className='md:col-span-2 bg-gray-50 rounded-xl p-6 border border-gray-200'>
      <InputEl outputfunc={(val)=>{setNamear(val)}} label={"  الاسم بالكامل"}/>
    </div>

    <div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
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
    
    <div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
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

    <div className='md:col-span-2 bg-gray-50 rounded-xl p-6 border border-gray-200'>
      <InputEl  outputfunc={(val)=>{setNameen(val)}} label={" تفاصيل العنوان"}/>
    </div>

    <div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
      <InputEl  outputfunc={(val)=>{setNameen(val)}} label={" الرمز البريدي"}/>
    </div>
    
    <div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
      <InputEl  outputfunc={(val)=>{setNameen(val)}} label={"اسم الشارع"}/>
    </div>

    <div className='md:col-span-2 bg-gray-50 rounded-xl p-6 border border-gray-200'>
      <div className='text-lg font-semibold mb-4 text-gray-900'>
        حدد الموقع على الخريطة
      </div>
      <div className='h-64 w-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
        </svg>
      </div>
    </div>
  </div>
</div>

<div className='flex justify-center mt-8'>
  <LoadingBtn act={()=>{submitload()}} icon={<FaSave/>} lod={lod} text={" حفظ العنوان  "} />
</div>





      
    </div>
    




  )
}

export default AddCat