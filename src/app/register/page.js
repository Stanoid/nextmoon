'use client'
import React from 'react'
import { useState,useEffect } from 'react'

import { Flip, Slide, toast,ToastContainer } from 'react-toastify'
import { API_URL } from '../local'
import interCell from '../comps/intercel'
import { BsMegaphone,BsShop,BsPlus } from 'react-icons/bs';
import { ArrowRightIcon,PlusIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/navigation';
import LoadingBtn from '../comps/loadingbtn'
import Link from 'next/link'
import Image from 'next/image';
import { Theme } from '../local'
export default function Register() {

  const [name, setname] = useState("");
  const [gender, setGender] = useState("M");
  const [age, setAge] = useState("");
  const [lod, setLod] = useState(false);
  const [states, setstaes] = useState("");
  const [cities, setcities] = useState("");
  const [work, setWork] = useState("");
  const [selected, setSelected] = useState([]);
  const [cats, setCats] = useState();

  const [social1,setSocial1]=useState();
  const [social2,setSocial2]=useState();
  const [social3,setSocial3]=useState();
  const [state,setstate]=useState();
  const [city,setcity]=useState();
  const [address,setaddress]=useState();
  const [phone, setPhone] = useState("");
  const [type, setType] = useState(0);
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [cpass, setcpass] = useState("");
 const ls = require("local-storage");
const router = useRouter();
  
const notify = (type,msg)=>{

  const options={
    hideProgressBar:true,
    draggable:true,
    closeButton:false,
    
  }
  switch(type){
    case 'success':
      toast.success(msg,options)
      break;

      case 'error':
        toast.error(msg,options)
        break;

        case 'warn':
          toast.warn(msg,options)
          break;

        

  }
 
}



useEffect(()=>{

  getstate();  
  getCats();  
 
 },[])


 const getstate=()=>{

  const requestOptions = {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
      
    },
  
};
fetch(`${API_URL}/states`, requestOptions)
    .then(response => response.json())
    .then(data =>{
     
   // console.log(data);
    setstaes(data.data);
       
    });



   
 }

 
 const getCats=()=>{

  const requestOptions = {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
      
    },
  
};
fetch(`${API_URL}/catagories`, requestOptions)
    .then(response => response.json())
    .then(data =>{
     
    //console.log(data);
  setCats(data.data);
       
    });



   
 }

const handleType=(type)=>{
setType(type);
}

  const regis =()=>{

    setLod(true)

    if(pass==""||name==""||email==""||phone==""||address==""||city==""||state==""){
      notify("error","جميع الحقول مطلوبة ");
      setLod(false)
      return;

    }

    if(pass!==cpass){
      notify("error","كلمة السر غير متطابقة ");
      setLod(false)
      return;

    }


  //   axios
  // .post(`${API_URL}/auth/local`, {
  //   username: name,
  //   email: email,
  //   password: pass,
  // })
  // .then(response => {
  //  notify("success","Registered succefully");
  //  router.replace("/login");

  // })
  // .catch(error => {
  //   notify("error","Something wrong, please try again later");
  // });

  let sso = {
    "first":social1,
    "second":social2,
    "third":social3,
  }

  let newarc = [];
  for (let i = 0; i < selected.length; i++) {
  newarc.push(selected[i].id);
    
  }

  //console.log(newarc);
  

  const requestOptions = {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
      
    },
    body: JSON.stringify(
      {
          "username": name,
          "type":1,
          "job":work,
          "age":age,
          "gender":gender,
          "catagories":newarc,
          "city":city,
          "state":state,
          "adress":address,
          "phone":phone,
          "social":sso,
          "email": email,
          "password": pass,
        }
    )
};

//console.log(requestOptions);

fetch(`${API_URL}/auth/local/register`, requestOptions)
    .then(response => response.json())
    .then(data =>{
      if(data.jwt){
      
        notify("success",`مرحبآ بك معنا   ${data.user.username}`);
    ls.set("atkn",data.jwt)
    router.replace("/")

      }else{
        
      //  console.log(data.error.message)

        if(data.error.message=="Email is already taken"){
          notify("error","بريد إلكتروني مستخدم, حاول تسجيل دخول");
        }else{
          notify("error","حدث خطأ ما,الرجاء المحاولة مرة أخري "+ data.error.message);
        }
      
      }
      setLod(false)
      // console.log(data);
       
    });



  }


  const removecat=(id)=>{
    const old = selected;
//console.log("ssss",selected)
    const newar = [];
        for (let i = 0; i < old.length; i++) {
        //   console.log("aaaa",i)
           if(old[i].id==id){

           }else{
               newar.push(old[i])
           }
            
        }


        
     let newcats = cats

     for (let i = 0; i < newcats.length; i++) {
    if(newcats[i].id==id){
      newcats[i].selected=false;
     // console.log("aa")
    }else{
      // newcats.selected=false; 
      // console.log("aaa")
    }
      

   }

   //console.log(newcats)
   setCats(newcats);
    
        //console.log(newar);
        setSelected(newar)
         
    
  }

  const addcat=(id,name)=>{

    if(selected.length>=5){
      return;
    }


    let temp = selected
    let cont = false;
    
    for (let i = 0; i < temp.length; i++) {
      
      if(temp[i].id==id){
        cont =true;
      }
       
     }


     let newcats = cats

     for (let i = 0; i < newcats.length; i++) {
    if(newcats[i].id==id){
      newcats[i].selected=true;
     // console.log("aa")
    }else{
      // newcats.selected=false; 
      // console.log("aaa")
    }
      

   }

 
 

    if(!cont){
      //console.log("first")
      temp.push({"id":id,"name":name});
      setSelected(temp)
      setType(0)
    setTimeout(() => {
      setType(1)
    }, 0);
    
    }
    

  
  
  
  }


  const handleemail =(email)=>{
    const newemail= email.replace(/ /g,'');
    setemail(newemail);
  }

  const handlestate=(value)=>{
   // console.log("Aaa",value);
    setstate(value)
  const requestOptions = {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
      
    },
  
};
fetch(`${API_URL}/states/${value}?populate=cities`, requestOptions)
    .then(response => response.json())
    .then(data =>{
     
  //  console.log(data.data.attributes.cities.data);
   setcities(data.data.attributes.cities.data);
       
    });


    

  }

    return (
        <div>
     
           <ToastContainer  limit={3}/>
  
            <div className="  bg-gradient-to-br text-right  flex justify-center flex-col items-center w-full">

          <div style={{
            padding:15,
            color:Theme.primary
          }}>

          <h1 className="text-center text-2xl font-semibold">تسجيل حساب</h1>

          </div>

    {/* Old signup stepper */}
{/* <div className="w-3/4 md:w-3/4 lg:w-1/4 xl:w-1/4" style={{zIndex:100,display:"flex",marginBottom:20,justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
<h1 className="text-center text-2xl font-semibold text-gray-600">تسجيل حساب</h1>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:10,padding:5,width:"100%"}}>
  <div style={{width:40,height:40,borderRadius:100,backgroundColor:type>=0?Theme.primary:"gray",display:"flex",justifyContent:"center",alignItems:"center"}} >
    <span style={{fontSize:15,color:"white"}}>1</span>
  </div>

  <div style={{width:40,height:40,borderRadius:100,backgroundColor:type>=1?Theme.primary:"gray",display:"flex",justifyContent:"center",alignItems:"center"}} >
    <span style={{fontSize:15,color:"white"}}>2</span>
  </div>

  <div style={{width:40,height:40,borderRadius:100,backgroundColor:type>=2?Theme.primary:"gray",display:"flex",justifyContent:"center",alignItems:"center"}} >
    <span style={{fontSize:15,color:"white"}}>3</span>
  </div>
 
 
 

</div>

<div style={{width:"90%",marginTop:-28,height:6,alignSelf:"center",zIndex:-1,backgroundColor:"gray"}}>
  <div style={{backgroundColor:Theme.primary,width:type*50+"%",height:"100%"}}>

  </div>
</div>
</div> */}


    <div style={{display:type==0?"block":"none",zIndex:1}} className=" px-10 py-2 rounded-xl w-screen  max-w-sm">
      <div className="space-y-4">
      

        <div>
          <label htmlFor="email" className="block mb-1 text-gray-600 font-semibold">أسم المستخدم</label>
          <input  onChange={(event)=>{setname(event.target.value)}} value={name} type="text" className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full" />
        </div>
        <div>
          <label  htmlFor="email" className="block mb-1 text-gray-600 font-semibold">البريد الإلكتروني</label>
          <input value={email} onChange={(event)=>{handleemail(event.target.value)}} type="text" className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full" />
        </div>
        <div>
          <label  htmlFor="email" className="block mb-1 text-gray-600 font-semibold"> رقم الهاتف</label>
          <input value={phone} onChange={(event)=>{setPhone(event.target.value)}} type="text" className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full" />
        </div>


        <div>
          <label htmlFor="email" className="block mb-1 text-gray-600 font-semibold">كلمة المرور</label>
          <input value={pass} onChange={(event)=>{setpass(event.target.value)}} type="password" className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full" />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 text-gray-600 font-semibold">تأكيد كلمة المرور </label>
          <input value={cpass} onChange={(event)=>{setcpass(event.target.value)}} type="password" className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full" />
        </div>


     

 


      </div>
      <button style={{backgroundColor:Theme.primary}} onClick={()=>{setType(1)}} className="mt-4 w-full font-semibold  text-white py-2 rounded-md text-lg tracking-wide">
        <div style={{display:'flex',justifyContent:"center",alignItems:"center"}}>
       
        التالي
       
        </div>
       
        </button>
      <button onClick={()=>{router.replace("/login")}} className="mt-4 w-full   text-primary py-2 rounded-md text-lg underline tracking-wide">تسجيل دخول  </button>
 
    </div>


    
    <div style={{display:type==1?"block":"none",zIndex:1}} className=" px-10 py-8 rounded-xl w-screen  max-w-sm">
      <div className="space-y-4">
        <h5 className="text-center  font-semibold text-gray-600">  المعلومات الشخصية</h5>

        <div onClick={()=>{setType(0)}} style={{fontSize:15,textDecoration:"underline",cursor:"pointer",color:Theme.primary,textAlign:"left"}}>
          رجوع

        </div>

  
  
        <div>
          <label  htmlFor="email" className="block mb-1 text-gray-600 font-semibold">  الوظيفة</label>
          <input value={work} onChange={(event)=>{setWork(event.target.value)}} type="text" className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full" />
        </div>


        <div>
          <label  htmlFor="email" className="block mb-1 text-gray-600 font-semibold">  العمر</label>
          <input value={age} onChange={(event)=>{setAge(event.target.value)}} type="number" className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full" />
        </div>

        <div>
   <label className='block mb-1 text-gray-600 font-semibold' htmlFor="gender">  النوع</label>
<select onChange={()=>{setGender(event.target.value);}} className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full" name="cars" id="state">
  <option value={"M"}>{"ذكر"}</option>
  <option value={"F"}>{"أنثى"}</option>
</select>
   </div>

<div>
<label className='block mb-1 text-gray-600 font-semibold' htmlFor="gender"> {`(5/${selected.length})`} الاهتمامات</label>
{/* {selected&&selected.map((sel) => (
 <InterCell ex={1} addcat={addcat} removecat={removecat} id={sel.id} key={sel.id}  selected={selected} name={sel.name} />
))} */}
<div style={{width:"100%",borderRadius:5,border:"2px solid gray",minHeight:100,maxHeight:300,overflowY:"scroll",padding:5}}>

  
{cats&&cats.map((cat) => (
 <InterCell addcat={addcat} id={cat.id}  key={cat.id} removecat={removecat} ex={cat.selected} selected={selected} name={cat.attributes.Name} />
))}
  
{/*   
  <InterCell addcat={addcat} id={1} selected={selected} name={"cat"} />
  <InterCell  addcat={addcat}  id={2} selected={selected} name={"cat"} /> */}



</div>

</div>
 
        

       
        <h3>
          <b>ملحوظة:</b> تستخدم البيانات الشخصية لترشيح منتجات مناسبة لك
        </h3>
     

     
        <button style={{backgroundColor:Theme.primary}} onClick={()=>{setType(2)}} className="mt-4 w-full font-semibold  text-white py-2 rounded-md text-lg tracking-wide">
        <div style={{display:'flex',justifyContent:"center",alignItems:"center"}}>
       
        التالي
       
        </div>
       
        </button>
      
    
      

      
      
      </div>
      {/* <button style={{backgroundColor:Theme.primary}} onClick={()=>{regis();}} className="mt-4 w-full  font-semibold  text-white py-2 rounded-md text-lg tracking-wide">
        <div style={{display:'flex',justifyContent:"center",alignItems:"center"}}>
       
        إنشاء حساب
       
        </div>
       
        </button> */}


    
 
    </div>

    <div style={{display:type==2?"block":"none",zIndex:1}} className=" px-10 py-8 rounded-xl w-screen  max-w-sm">
      <div className="space-y-4">
        <h5 className="text-center  font-semibold text-gray-600"> المعلومات الشخصية </h5>

        <div onClick={()=>{setType(1)}} style={{fontSize:15,textDecoration:"underline",color:Theme.primary,textAlign:"left"}}>
          رجوع

        </div>

   <div>
   <label className='block mb-1 text-gray-600 font-semibold' htmlFor="state">إختر المدينة :</label>

<select onChange={()=>{handlestate(event.target.value);}} className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full" name="cars" id="state">
  <option selected value="">المدينة</option>
  {states&&states.map(stateo=>(
  <option key={stateo.id}  value={stateo.id}>{stateo.attributes.name}</option>
))}
</select>
   </div>
       
   <div>
   <label className='block mb-1 text-gray-600 font-semibold' htmlFor="city">إختر المنطقة :</label>

<select onChange={()=>{setcity(event.target.value);}} className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full" name="cars" id="city">
  <option value="">المنطقة</option>
  {cities&&cities.map(cityo=>(
  <option key={cityo.id}  value={cityo.id}>{cityo.attributes.name}</option>
))}
</select>
   </div>

   <div>
          <label htmlFor="email" className="block mb-1 text-gray-600 font-semibold">  العنوان بالتفصيل </label>
          <input  onChange={(event)=>{setaddress(event.target.value)}} value={address} placeholder="العنوان" type="text" className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full" />
        </div>


        <div>
          <label htmlFor="email" className="block mb-1 text-gray-600 font-semibold">روابط صفحات التسويق </label>
          <input  onChange={(event)=>{setSocial1(event.target.value)}} value={social1} placeholder="إختياري" type="text" className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full" />
        </div>

        <div>
          <input  onChange={(event)=>{setSocial2(event.target.value)}} value={social2} placeholder="إختياري"  type="text" className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full" />
        </div>

        <div>
          <input  onChange={(event)=>{setSocial3(event.target.value)}} value={social3} type="text" placeholder="إختياري" className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full" />
        </div>

        <h3>
          <b>ملحوظة:</b>بمعرفة صفحات إعلانك يمكننا تقديم نصائح حول كيفية زيادة مبيعاتك
        </h3>

      
    
      

      
      
      </div>
      {/* <button style={{backgroundColor:Theme.primary}} onClick={()=>{regis();}} className="mt-4 w-full  font-semibold  text-white py-2 rounded-md text-lg tracking-wide">
        <div style={{display:'flex',justifyContent:"center",alignItems:"center"}}>
       
        إنشاء حساب
       
        </div>
       
        </button> */}

<LoadingBtn act={()=>{regis()} } text={"إنشاء حساب"} lod={lod} />

    
 
    </div>
    <div style={{height:200}}></div>
</div>
            
        </div>
    )
}

