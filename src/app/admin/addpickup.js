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



function AddPickUp(props) {
    const ls = require("local-storage")
    const {logindata,logoutUser}  = useContext(AuthCon);

    const [namear,setNamear] = useState("");
    const [nameen,setNameen] = useState("");
    const [addressar,setaddressar] = useState("");
    const [addressen,setaddressen] = useState("");
    const [commphone,setcommphone] = useState("");
    const [compphone,setcompphone] = useState("");
    const [pickups,setPickups]= useState(null);
    const [pickphone,setpickphone] = useState("");
    const [delprice,setdelprice] = useState("");
    const [pickprice,setpickprice] = useState("");
    const [returnprice,setreturnprice] = useState("");


    const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)

    const router = useRouter(); 
    const [lod,setlod] = useState(false)


    useEffect(() => {
    //getPickups();
   
    },[])
    
   
 
   

    const handleSubmit = (event) => {
      event.preventDefault();
  

    
    };


    
    
        
        const getPickups=()=>{
         
    props.setLod(true);
             
        const requestOptions = {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer ' + udata.data.jwt
          },
        
      };
    
        fetch(`${API_URL}pickups`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
       let arr = [];
         for (let i = 0; i < data.data.length; i++) {
           let ob = {};
          ob.id = data.data[i].id
           ob.name_ar = data.data[i].attributes.name_ar;
           ob.name_en = data.data[i].attributes.name_fr;  
           ob.icon = data.data[i].attributes.icon;
           ob.size = data.data[i].attributes.createdAt;

           arr.push(ob) 
          // console.log("rrrr",ob)
          
         }

         return arr
          }).then((arr)=>{
          setPickups(arr);
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



  // if(sicon==""||namear==""||nameen==""){
  //   alert("Empty Feilds")
  //   return;
  // }


        setlod(true);

      
        

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + udata.data.jwt
            },
            body: JSON.stringify(
              {data:  {
                
                "name_ar": namear,
                "name_en":nameen,
                "address_ar":addressar,
                "address_fr": addressen,
                "commercial_num": commphone,
                "complains_num": compphone,
                "desk_num": pickphone,
                "home_price": delprice,
                "pickup_price": pickprice,
                "return_price": returnprice,
                

              
              
         
              }}
              )
          
        };
      
          fetch(`${API_URL}pickups`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              console.log(data)

             //getSizes();
           //  alert("size added")
           props.notifi("success","تمت إضافة  نقطة التوصيل")
           setlod(false);

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
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            إدارة نقاط التوصيل
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
        <p className="text-gray-500 text-sm">أضف وأدر نقاط التوصيل والاستلام</p>
      </div>

      {/* Add Pickup Point Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-moon-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          إضافة نقطة توصيل جديدة
        </h2>
        
        {/* Location Info */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">معلومات الموقع</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <InputEl outputfunc={(val)=>{setNamear(val)}} label={"إسم الولاية (العربية)"}/>
            <InputEl outputfunc={(val)=>{setNameen(val)}} label={"إسم الولاية (الفرنسية)"}/>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <InputEl outputfunc={(val)=>{setaddressar(val)}} label={"العنوان (العربية)"}/>
            <InputEl outputfunc={(val)=>{setaddressen(val)}} label={"العنوان (الفرنسية)"}/>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">معلومات الاتصال</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputEl outputfunc={(val)=>{setcommphone(val)}} label={"رقم الهاتف التجاري"}/>
            <InputEl outputfunc={(val)=>{setcompphone(val)}} label={"رقم هاتف الشكاوي"}/>
            <InputEl outputfunc={(val)=>{setpickphone(val)}} label={"رقم هاتف مكتب الاستقبال"}/>
          </div>
        </div>

        {/* Pricing Info */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">الأسعار</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputEl outputfunc={(val)=>{setdelprice(val)}} num label={"سعر التوصيل للمنزل"}/>
            <InputEl outputfunc={(val)=>{setpickprice(val)}} num label={"سعر التوصيل لنقطة الاستلام"}/>
            <InputEl outputfunc={(val)=>{setreturnprice(val)}} num label={"سعر الاسترجاع"}/>
          </div>
        </div>

        <div className="flex justify-end">
          <LoadingBtn act={()=>{submitload()}} lod={lod} text={"إضافة نقطة التوصيل"} />
        </div>
      </div>

      {/* Pickup Points List */}
      <div className='w-full'>   


{/* 
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
} */}

</div>


      
    </div>
    




  )
}

export default AddPickUp






















































