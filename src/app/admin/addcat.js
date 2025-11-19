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
import { useSelector } from 'react-redux';


function AddCat(props) {
    const ls = require("local-storage")
    const {logindata,logoutUser}  = useContext(AuthCon);

    const [namear,setNamear] = useState("");
    const [nameen,setNameen] = useState("");
    const [cats,setCats] = useState(null);
    const [secs,setSecs] = useState(null);
    const [cat,setCat] = useState(null);
    const [sizes,setSizes] = useState([]);
    const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)


    const router = useRouter(); 
    const [lod,setlod] = useState(false)


    useEffect(() => {


      getSections();
    
   
    },[])
    
   
 
   

    const handleSubmit = (event) => {
      event.preventDefault();
  

    
    };


    
    
        
        const getSections=()=>{
        
          props.setLod(true);
      
             
        const requestOptions = {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              //"Authorization": 'Bearer ' + udata.data.jwt
          },
        
      };
    
        fetch(`${API_URL}sections?func=getSections`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
          console.log("sections",data)  
          setSecs(data)
          }).then(()=>{
            
          getCats();
          })
    
    
        }



        const getCats=()=>{
        
          props.setLod(true)
      
             
        const requestOptions = {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer ' + udata.data.jwt
          },
        
      };
    
        fetch(`${API_URL}catagories?populate=*`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
         
         console.log("thisone",data)
            let arr = [];
            for (let i = 0; i < data.data.length; i++) {
              let ob = {};
             ob.id = data.data[i].id
              ob.name_ar = data.data[i].attributes.name_ar;
              ob.name_en = data.data[i].attributes.name_en;  
              ob.section = data.data[i].attributes.section.data.attributes.name_ar;
              ob.cate = data.data[i].attributes.createdAt;
   
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
              props.notifi("success","تم حذف الفئة") ;

           getCats();
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
           props.notifi("success","تمت إضافة الفئة ")

              setlod(false);
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
            </svg>
            إدارة الفئات
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
        <p className="text-gray-500 text-sm">أضف وأدر فئات المنتجات</p>
      </div>

      {/* Add Category Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-moon-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          إضافة فئة جديدة
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <InputEl outputfunc={(val)=>{setNamear(val)}} label={"إسم الفئة (العربية)"}/>
          <InputEl outputfunc={(val)=>{setNameen(val)}} label={"إسم الفئة (الإنجليزية)"}/>
        </div>

        <div className="mb-6">
          <InputEl
            value={cat}
            outputfunc={(val) => {
              setCat(val);
            }}
            iden={"color"}
            data={secs}
            iscats={true}
            select={true}
            label={"القسم"}
          />
        </div>

        <div className="flex justify-end">
          <LoadingBtn act={()=>{submitload()}} lod={lod} text={"إضافة الفئة"} />
        </div>
      </div>

      {/* Categories List */}
      <div className='w-full'>


{
  sizes?<TableComp

  deleteProduct={deleteEntry}
editCat={(cat)=>{ props.setpage(18,cat.id) }}
  columns={
    [
      {name: "ID", uid: "id", sortable: true},
      {name: "الإسم (العربية)", uid: "name_ar", sortable: true},
      {name: "الإسم (الإنجليزية)", uid: "name_en", sortable: true}, 
      {name: "القسم", uid: "section", sortable: true},
    
     {name: "الخيارات", uid: "cate"},
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

export default AddCat