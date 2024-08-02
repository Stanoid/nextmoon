'use client'
import React from 'react'
import { useState,useEffect,useContext } from 'react'
import { motion } from 'framer-motion'
import {  toast,ToastContainer } from 'react-toastify'
import { API_URL } from '../local'
import InputEl from '../comps/inputel'
import { useRouter } from 'next/navigation';
import { FaArrowAltCircleLeft,FaArrowCircleLeft,FaArrowCircleRight, FaCheckCircle,FaUserPlus } from 'react-icons/fa'
import LoadingBtn from '../comps/loadingbtn'
import { FaLock } from 'react-icons/fa6'
import { AuthCon } from '../contexts/AuthCon';

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
  const {loginUser}  = useContext(AuthCon);
  
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




 const handlelogin=()=>{
  setLod(1);
 //  
  loginUser(email,pass)
 
  
 
 }




  const handleemail =(email)=>{
    const newemail= email.replace(/ /g,'');
    setemail(newemail);
  }



  const handlestate=(value)=>{
   // 
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
     
  //  
   setcities(data.data.attributes.cities.data);
       
    });


    

  }

    return (
        <div style={{backgroundSize:20}} className="w-full sm:w-full h-full flex min-h-screen  bg-[url('../../public/amblemblack.svg')] bg-moon-200" >  
     
           <ToastContainer  limit={3}/>


           <div  className="  from-moon-200 to-moon-200 hidden sm:hidden lg:flex  md:w-1/4 lg:w-1/2 xl:w-1/2  " ></div>
  
            <div className="  w-full md:w-3/4 lg:w-1/2 xl:w-1/2 p-3 ">
    <div  style={{backgroundColor:"rgba(255,255,255,1)"}} className='w-full  flex align-middle  rounded-lg transition-transform  justify-center  text-right p-3 md:p-4 lg:p-8 shadow-xl  flex-col items-center ' >
        

    {/* Old signup stepper */}
<div  className="  w-full md:w-3/4 lg:w-3/4  px-3 py-5 my-3 transition-all" style={{zIndex:100,display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
<h1 className="text-center text-2xl font-semibold text-moon-300">تسجيل دخول</h1>

</div>


    <div  style={{display:type==0?"block":"none",zIndex:1}} className="w-full transition-all ">

<div>

<div className='w-full  flex align-middle justify-between'>
<div onClick={()=>{router.push("/register")} } className='inline-flex text-moon-300/60 flex-grow align-middle justify-start' 
style={{fontSize:15,textDecoration:"underline",cursor:"pointer",textAlign:"left"}}>
<div style={{marginRight:5}}> <FaUserPlus/> </div>
<div className='flex align-middle justify-center '> ليس لديك حساب؟ أنشئ حساب</div>
</div>

</div>


</div>
    <div style={{
display:"grid",
margin:"16px 0px",
gap:10,
gridTemplateAreas:`

'email'
'pass'

`


   }} >


   

    <div style={{gridArea:"email"}}>
      <InputEl outputfunc={(val)=>{handleemail(val)}} label={"البريد الإلكتروني"}/>
    </div>

  
    <div style={{gridArea:"pass"}}>
      <InputEl outputfunc={(val)=>{setpass(val)}} ispass label={"كلمة المرور"}/>
    </div>

  

  
  

   </div>


  <div className='flex flex-col sm:flex-col lg:flex-row ' >
  <motion.div className='flex-grow p-0 sm:px-0 lg:px-3 ' whileTap={{ scale: 1.03 }}>
      <LoadingBtn act={()=>{handlelogin()} } icon={<FaLock  />} text={"تسجيل دخول"} lod={lod} />
      </motion.div>

      <motion.div className='flex-grow p-0 sm:px-0 lg:px-3 ' whileTap={{ scale: 1.03 }}>
      <LoadingBtn color={"lightgrey"} act={()=>{router.push("/register")} } textColor={"grey"} icon={<FaUserPlus  />} text={"تسجيل حساب جديد"} />
      </motion.div>


  </div>
   
   
    
    </div>


   

    </div>
    </div>
            
        </div>
    )
}

