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
   
    })
    
   
 
   

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
  



    
<div 
    style={{
      
      display:"flex",
      alignItems:"center",
      flexDirection:"column",
      justifyContent:"center",
      padding:5
      
 }}>

   



   <div style={{
    width:"100%",
display:"grid",
gap:10,
gridTemplateAreas:`
' namear  namear  nameen nameen  ' 
'addressar addressar addressar addressar'
'addressen addressen addressen addressen'
'commphone commphone compphone compphone'
'pickphone pickphone delprice delprice'
'pickprice pickprice returnprice returnprice'


`


   }} >


 {
  
 }

    <div style={{gridArea:"namear"}}>
      <InputEl outputfunc={(val)=>{setNamear(val)}} label={"إسم الولاية (العربية)"}/>
    </div>

    <div style={{gridArea:"nameen"}}>
      <InputEl outputfunc={(val)=>{setNameen(val)}} label={"إسم الولاية (الفرنسية)"}/>
    </div>

    <div style={{gridArea:"addressar"}}>
      <InputEl outputfunc={(val)=>{setaddressar(val)}} label={" العنوان (العربية)"}/>
    </div>

    <div style={{gridArea:"addressen"}}>
      <InputEl outputfunc={(val)=>{setaddressen(val)}} label={" العنوان (الفرنسية)"}/>
    </div>

    <div style={{gridArea:"commphone"}}>
      <InputEl outputfunc={(val)=>{setcommphone(val)}} label={"رقم الهاتف التجاري"}/>
    </div>
  
    <div style={{gridArea:"compphone"}}>
      <InputEl outputfunc={(val)=>{setcompphone(val)}} label={"رقم هاتف الشكاوي"}/>
    </div>

    <div style={{gridArea:"pickphone"}}>
      <InputEl outputfunc={(val)=>{setpickphone(val)}} label={"رقم هاتف مكتب إستقبال الطرود"}/>
    </div>

    <div style={{gridArea:"delprice"}}>
      <InputEl outputfunc={(val)=>{setdelprice(val)}} num label={" سعر التوصيل للمنزل"}/>
    </div>

    <div style={{gridArea:"pickprice"}}>
      <InputEl outputfunc={(val)=>{setpickprice(val)}} num label={" سعر التوصيل لنقطة الإستلام"}/>
    </div>


    <div style={{gridArea:"returnprice"}}>
      <InputEl outputfunc={(val)=>{setreturnprice(val)}} num label={" سعر الإسترجاع"}/>
    </div>


    


  
  

   </div>

  

   <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end"}}>


<LoadingBtn act={()=>{submitload()}} lod={lod} text={"إضافة نقطة التوصيل "} />
</div>



<div  className='w-full mt-6'>   


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






















































