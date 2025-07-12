'use client'
import React from 'react'
import { useState,useEffect } from 'react'
import { motion } from 'framer-motion'
import {  toast,ToastContainer } from 'react-toastify'
import { API_URL } from '../local'
import InputEl from '../comps/inputel'
import { useRouter } from 'next/navigation';
import { FaArrowCircleLeft, FaCheckCircle } from 'react-icons/fa'
import { FaFacebook,FaInstagram,FaXTwitter,FaGoogle } from 'react-icons/fa6'
import LoadingBtn from '../comps/loadingbtn'

import { Theme } from '../local'
import { FaCircleRight } from 'react-icons/fa6'
export default function Register() {

  const [name, setname] = useState("");
  
  const [gender, setGender] = useState("M");
  const [age, setAge] = useState("");
  const [lod, setLod] = useState(false);
  const [states, setstaes] = useState("");
  const [cities, setcities] = useState("");
  const [selected, setSelected] = useState([]);
  const [cats, setCats] = useState();
  const [state,setstate]=useState();
  const [city,setcity]=useState();
  const [address,setaddress]=useState();
  const [address2,setaddress2]=useState();
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

  //getstate();  
 
 
 },[])


  const regis =()=>{
console.log(email,pass,name)
    setLod(true)

    // if(pass==""||name==""||email==""||phone==""||address==""||city==""||state==""){
    //   notify("error","جميع الحقول مطلوبة ");
    //   setLod(false)
    //   return;

    // }

 


  

  // let newarc = [];
  // for (let i = 0; i < selected.length; i++) {
  // newarc.push(selected[i].id);
    
  // }

  //console.log(newarc);
  

  const requestOptions = {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
      
    },
    body: JSON.stringify(
      {
       
        username  : name,
        email: email,
          password : pass,
        }
    )
};

//console.log(requestOptions);

fetch(`${API_URL}auth/local/register`, requestOptions)
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




  const page2Handler  =() => {
//Password match check
//Email & phone validation
//Username check



console.log(cpass,pass,email,name,phone);
if(pass!==cpass){
  notify("error","كلمة السر غير متطابقة ");
  setLod(false)
  return;

}
setType(1)

  }


  
  const page3Handler  =() => {
   
    console.log(state,city,address,address2);
    setType(2)
    
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
        <div style={{backgroundSize:50}} className="w-full sm:w-full mt-16 h-full flex min-h-screen 
         bg-[url('../../public/amblemblack.svg')] bg-white" >  
     
           <ToastContainer  limit={3}/>


           <div  className="  from-moon-200 to-moon-200 hidden sm:hidden lg:flex  md:w-1/4 lg:w-1/2 xl:w-1/2  " ></div>
  
            <div className="  w-full md:w-3/4 lg:w-1/2 xl:w-1/2 p-3 ">
    <div  style={{backgroundColor:"rgba(255,255,255,1)"}} className='w-full  flex align-middle  rounded-lg transition-transform  justify-center  text-right p-3 md:p-4 lg:p-8 shadow-xl  flex-col items-center ' >
        

    {/* Old signup stepper */}
<div  className="  w-full md:w-3/4 lg:w-3/4  px-3 py-5 my-3 transition-all" style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
<h1 className="text-center text-2xl font-semibold text-moon-300">تسجيل حساب</h1>
<div className='transition-all' style={{display:"flex",justifyContent:"space-between",alignItems:"center",
  marginTop:10,padding:5,width:"100%",zIndex:2}}>
  <div className='transition-all' style={{width:40,height:40,borderRadius:100,backgroundColor:type>=0?Theme.secondary:"#e5e7eb",display:"flex",justifyContent:"center",alignItems:"center"}} >
    <span style={{fontSize:15,color:"white"}}>1</span>
  </div>

  <div className='transition-all' style={{width:40,height:40,borderRadius:100,backgroundColor:type>=1?Theme.secondary:"#e5e7eb",display:"flex",justifyContent:"center",alignItems:"center"}} >
    <span style={{fontSize:15,color:"white"}}>2</span>
  </div>

  <div className='transition-all' style={{width:40,height:40,borderRadius:100,backgroundColor:type>=2?Theme.secondary:"#e5e7eb",display:"flex",justifyContent:"center",alignItems:"center"}} >
    <span style={{fontSize:15,color:"white"}}>3</span>
  </div>
 
 
 

</div>

<div  style={{width:"90%",marginTop:-28,height:6,alignSelf:"center",zIndex:0,backgroundColor:"#e5e7eb"}}>
  <div className='transition-all'  style={{backgroundColor:Theme.secondary,width:type*50+"%",height:"100%"}}>

  </div>
</div>
</div>


    <div  style={{display:type==0?"block":"none",zIndex:1}} className="w-full transition-all ">

<div>

<div className='w-full  flex align-middle justify-between'>
<div onClick={()=>{router.push("/login")} } className='inline-flex text-moon-300/60 flex-grow align-middle justify-start' 
style={{fontSize:15,textDecoration:"underline",cursor:"pointer",textAlign:"left"}}>
<div style={{marginRight:5}}> <FaArrowCircleLeft/> </div>
<div className='flex align-middle justify-center '>  تسجيل دخول</div>
</div>
<div className='flex-grow '>
<h5 className="text-right  font-semibold text-moon-300/50">معلومات الحساب</h5>
</div>
</div>


</div>
    <div style={{
display:"grid",
margin:"16px 0px",
gap:10,
gridTemplateAreas:`
' namear  namear  namear namear namear ' 
' email email email email email  ' 
'code code phone phone phone'
'pass pass pass pass pass'
'confirm confirm confirm confirm confirm'
'soc soc soc soc soc '


`


   }} >


    <div style={{gridArea:"namear"}}>
      <InputEl outputfunc={(val)=>{setname(val)}} label={"أسم المستخدم"}/>
    </div>

    <div style={{gridArea:"email"}}>
      <InputEl outputfunc={(val)=>{handleemail(val)}} label={"البريد الإلكتروني"}/>
    </div>

    <div style={{gridArea:"code"}}>
    <InputEl value={age} outputfunc={(val)=>{setCats(val)}} select={true} data={null}   label={"رمز الدولة"}/>    </div>

    <div style={{gridArea:"phone"}}>
      <InputEl num={true} outputfunc={(val)=>{setPhone(val)}} label={" رقم الهاتف"}/>
    </div>

    <div style={{gridArea:"pass"}}>
      <InputEl outputfunc={(val)=>{setpass(val)}} ispass label={"كلمة المرور"}/>
    </div>

    <div style={{gridArea:"confirm"}}>
      <InputEl  outputfunc={(val)=>{setcpass(val)}} ispass label={"تأكيد كلمة المرور"}/>
    </div>


    <div className='my-3' style={{gridArea:"soc"}}>
     <div className='text-center my-1 '>التسجيل بواسطة</div> 
   <div className='flex space-x-3 text-2xl flex-row items-center justify-center' >
   <FaFacebook className='text-[#3E5C9A]' />
   <FaInstagram className='text-[#C84278]' />  
   <FaXTwitter/>
   <FaGoogle className='text-[#DF4B38]' />
   </div>
  
    </div>
  

   </div>


  
      <motion.div whileTap={{ scale: 1.03 }}>
      <LoadingBtn act={()=>{page2Handler()} } icon={<FaCircleRight  />} text={"التالي"} lod={lod} />
      </motion.div>
   
    
    </div>


    
    <div style={{display:type==1?"block":"none",zIndex:1}} className=" w-full">
      <div className="">
       
      <div className='w-full  flex align-middle justify-between'>
<div onClick={()=>{setType(0)} } className='inline-flex text-moon-300/60 flex-grow align-middle justify-start' 
style={{fontSize:15,textDecoration:"underline",cursor:"pointer",textAlign:"left"}}>
<div style={{marginRight:5}}> <FaArrowCircleLeft/> </div>
<div className='flex align-middle justify-center '> رجوع</div>
</div>
<div className='flex-grow '>
<h5 className="text-right  font-semibold text-moon-300/50">معلومات الحساب</h5>
</div>
</div>




        <div style={{
display:"grid",
margin:"16px 0px",
gap:10,
gridTemplateAreas:`
' state  state  city city ' 
' line1  line1  line1 line1 ' 
' line2  line2  line2 line2 ' 



`


   }} >






    <div style={{gridArea:"state"}}>
    <InputEl value={age} outputfunc={(val)=>{setstaes(val)}} select={true} data={null}   label={" المحافظة"}/>    </div>

    <div style={{gridArea:"city"}}>
    <InputEl value={age} outputfunc={(val)=>{setcities(val)}} select={true} data={null}   label={" المدينة"}/>    </div>

    <div style={{gridArea:"line1"}}>
      <InputEl outputfunc={(val)=>{setaddress(val)}} label={"العنوان"}/>
    </div>

    <div style={{gridArea:"line2"}}>
      <InputEl outputfunc={(val)=>{setaddress2(val)}} label={"العنوان 2 (إختياري)"}/>
    </div>

  
   

  

  
  

   </div>


  
   <motion.div whileTap={{ scale: 1.03 }}>
      <LoadingBtn act={()=>{page3Handler()} } icon={<FaCircleRight  />} text={"التالي"} lod={lod} />
      </motion.div>
   



 
        

      

      
      
      </div>
    


    
 
    </div>


    <div style={{display:type==2?"block":"none",zIndex:1}} className="w-full">
      <div className="">


      <div className='w-full  flex align-middle justify-between'>
<div onClick={()=>{setType(1)} } className='inline-flex text-moon-300/60 flex-grow align-middle justify-start' 
style={{fontSize:15,textDecoration:"underline",cursor:"pointer",textAlign:"left"}}>
<div style={{marginRight:5}}> <FaArrowCircleLeft/> </div>
<div className='flex align-middle justify-center '> رجوع</div>
</div>
<div className='flex-grow '>
<h5 className="text-right  font-semibold text-moon-300/50">معلومات إضافية</h5>
</div>
</div>
      

<div style={{
display:"grid",
margin:"16px 0px",
gap:10,
gridTemplateAreas:`
' namear  namear  namear namear namear ' 
' email email email email email  ' 

'pass2 pass2 pass2 pass pass'
'confirm confirm confirm confirm confirm'

`


   }} >


    <div style={{gridArea:"namear"}}>
      <InputEl outputfunc={(val)=>{console.log(val)}} label={"معلومات إضافية"}/>
    </div>

    <div style={{gridArea:"email"}}>
    <InputEl outputfunc={(val)=>{console.log(val)}} label={"معلومات إضافية"}/>
    </div>


    <div style={{gridArea:"pass2"}}>
    <InputEl outputfunc={(val)=>{console.log(val)}} label={"معلومات إضافية"}/>
    </div> 

    <div style={{gridArea:"pass"}}>
    <InputEl outputfunc={(val)=>{console.log(val)}} label={"معلومات إضافية"}/>
    </div>

    <div style={{gridArea:"confirm"}}>
    <InputEl outputfunc={(val)=>{console.log(val)}} label={"معلومات إضافية"}/>
    </div>

  
  

   </div>


  
  
     <LoadingBtn act={()=>{regis()} } icon={<FaCheckCircle  />}  text={"تسجيل الحساب"} lod={lod} />

    


 
        

    

      
      
      </div>
    </div>

    </div>
    </div>
            
        </div>
    )
}