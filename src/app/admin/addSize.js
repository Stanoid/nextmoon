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
   
    },[])
    
   
 
   

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
    
        fetch(`${API_URL}products?func=getSizesAdmin`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
       let arr = [];
         for (let i = 0; i < data.length; i++) {
           let ob = {};
          ob.id = data[i].id
           ob.name_ar = data[i].name_ar;
           ob.name_en = data[i].name_en;  
           ob.icon = data[i].icon;
           ob.size = data[i].createdAt;

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
             props.notifi("success","تم حذف المقاس") ;
             
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
              console.log(data)
             setNamear("");
             setNameen("");
             setSicon("");
             getSizes();
           //  alert("size added")
           props.notifi("success","تمت إضافة  المقاس")

             // setlod(false);
            }).then(()=>{
         
            
            })
      



    }
   


 


 

  return (
    <div dir="rtl" className="w-full max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 text-moon-200">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
            </svg>
            إدارة المقاسات
          </h1>
          <button
            onClick={() => props.setpage(0)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-gray-500 text-sm">أضف وأدر مقاسات المنتجات</p>
      </div>

      {/* Add Size Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-moon-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          إضافة مقاس جديد
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <InputEl outputfunc={(val)=>{setNamear(val)}} label={"إسم المقاس (العربية)"}/>
          <InputEl outputfunc={(val)=>{setNameen(val)}} label={"إسم المقاس (الإنجليزية)"}/>
          <InputEl outputfunc={(val)=>{setSicon(val)}} label={"الرمز (S, M, L, XL...)"}/>
        </div>

        <div className="flex justify-end">
          <LoadingBtn act={()=>{submitload()}} lod={lod} text={"إضافة المقاس"} />
        </div>
      </div>

      {/* Sizes List */}
      <div className='w-full'>   



{
  sizes?<TableComp


editSize={(size)=>{props.setpage(16,size.id)}}
deleteProduct={deleteEntry}
  columns={
    [
      {name: "ID", uid: "id", sortable: true},
      {name: "الإسم (العربية)", uid: "name_ar", sortable: true},
      {name: "الإسم (الإنجليزية)", uid: "name_en", sortable: true}, 
      {name: "الرمز", uid: "icon", sortable: true},
    
     {name: "الخيارات", uid: "size"},
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






















































