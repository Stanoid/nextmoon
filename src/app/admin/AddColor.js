'use client'

import React from 'react';
import { useContext,useEffect,useState } from 'react';
import { Theme ,API_URL} from '../local';
import InputEl from '../comps/inputel';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { TiThMenu } from "react-icons/ti";
import LoadingBtn from '../comps/loadingbtn';
import { FaTimes,FaEdit } from 'react-icons/fa';
import { AuthCon } from '../contexts/AuthCon';
import TableComp from "../comps/sandbox/table"
import { useSelector } from 'react-redux';

function AddColor(props) {
    const ls = require("local-storage")
    const {logindata,logoutUser}  = useContext(AuthCon);

    const [namear,setNamear] = useState("");
    const [nameen,setNameen] = useState("");
    const [colorCode,setColorCode] = useState("");
    const [colors,setcolors] = useState([])

    const router = useRouter(); 
    const [lod,setlod] = useState(false)
    const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)


    useEffect(() => {
    // loginval();
   getcolors();
    },[])
    
   
 
   

    const handleSubmit = (event) => {
      event.preventDefault();
  

    
    };


    
    

    const deleteEntry=(id)=>{
         
    
             
      const requestOptions = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + udata.data.jwt
        },
      
    };
  
      fetch(`${API_URL}colors/${id}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          props.notifi("success","تم حذف اللون") ;

       getcolors();
        }).then(()=>{
       
        
        })
  
  
      }

        
        const getcolors=()=>{
         props.setLod(true)
    
             
        const requestOptions = {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer ' + udata.data.jwt
          },
        
      };
    
        fetch(`${API_URL}colors`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
          
            let arr = [];
            for (let i = 0; i < data.data.length; i++) {
              let ob = {};
             ob.id = data.data[i].id
              ob.name_ar = data.data[i].attributes.name_ar;
              ob.name_en = data.data[i].attributes.name_en;  
              ob.colorCode = data.data[i].attributes.colorCode;
              ob.color = data.data[i].attributes.colorCode;
              ob.colore = data.data[i].attributes.createdAt;
   
              arr.push(ob) 
             // console.log("rrrr",ob)
             
            }

            return arr
          
          }).then((arr)=>{
         props.setLod(false);
          setcolors(arr)
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



  if(colorCode==""||namear==""||nameen==""){
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
                    "name_en": nameen,
                    "colorCode":colorCode,
                    "status": true
               
                  
             
                  }
              )
          
        };


        console.log(requestOptions)
      
          fetch(`${API_URL}colors?func=AddColor`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              
             setNamear("");
             setNameen("");
             setColorCode("");
            // alert("color added")
            props.notifi("success","تمت إضافة  اللون")
              setlod(false);
            }).then(()=>{
         getcolors();
            
            })
      



    }
   


 


 

  return (
    <div dir="rtl" className="w-full max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 text-moon-200">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
            </svg>
            إدارة الألوان
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
        <p className="text-gray-500 text-sm">أضف وأدر ألوان المنتجات</p>
      </div>

      {/* Add Color Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-moon-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          إضافة لون جديد
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <InputEl value={namear} outputfunc={(val)=>{setNamear(val)}} label={"إسم اللون (العربية)"}/>
          <InputEl value={nameen} outputfunc={(val)=>{setNameen(val)}} label={"إسم اللون (الإنجليزية)"}/>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">اختر اللون</label>
          <div className="flex items-end gap-3">
            <div className="relative">
              <input 
                style={{backgroundColor:colorCode?colorCode:"#e5e7eb"}} 
                value={colorCode} 
                onChange={(e)=>{setColorCode(e.target.value)}} 
                className="w-20 h-20 rounded-xl border-2 border-gray-300 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                type='color'
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-gray-300 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <InputEl value={colorCode} outputfunc={(val)=>{setColorCode(val)}} label={"رمز اللون (Hex)"}/>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <LoadingBtn act={()=>{submitload()}} lod={lod} text={"إضافة اللون"} />
        </div>
      </div>

      {/* Colors List */}
      <div className='w-full'> 

{
  colors?<TableComp

  deleteProduct={deleteEntry}
editColor={(color)=>{props.setpage(17,color.id)}}
  columns={
    [
      {name: "ID", uid: "id", sortable: true},
      {name: "الإسم (العربية)", uid: "name_ar", sortable: true},
      {name: "الإسم (الإنجليزية)", uid: "name_en", sortable: true}, 
      {name: "الرمز", uid: "colorCode", sortable: true},
      {name: "اللون", uid: "color", sortable: true},
      {name: "الخيارات", uid: "colore"},
    ]
   }
   
   data={colors}
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

export default AddColor