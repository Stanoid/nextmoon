'use client'
import React from 'react'
import { useState,useEffect,useContext } from 'react'
import { motion } from 'framer-motion'
import {  toast,ToastContainer } from 'react-toastify'
import { API_URL } from '../local'
import InputEl from '../comps/inputel'
import { useSelector,useDispatch } from 'react-redux'
import {login } from "../lib/actions/counterAction"
import { useRouter } from 'next/navigation';
import { FaArrowAltCircleLeft,FaArrowCircleLeft,FaArrowCircleRight, FaCheckCircle,FaUserPlus } from 'react-icons/fa'
import LoadingBtn from '../comps/loadingbtn'
import { FaFacebook, FaGoogle, FaInstagram, FaLock, FaX, FaXTwitter } from 'react-icons/fa6'
import { AuthCon } from '../contexts/AuthCon';
import { CartCon } from '../contexts/cartContext'
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
  const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)
 const ls = require("local-storage");
const router = useRouter();
const sts = useSelector((state) => state)
const dispatch = useDispatch()
const {useNotifi } =
useContext(CartCon);



useEffect(()=>{


 },[])



 const loginrouter = ()=>{
  
  console.log(udata)
  if(udata&&udata.error){
//   alert(udata.data);
//   setLod(false)


 switch(udata&&udata.data){
   case 400 :
     toast.error("كلمة المرور أو البريد الإلكتروني غير صحيحة", {
       position: "top-right",
       autoClose: 4000,
       hideProgressBar: true,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       theme: "light",
       
       });
   break;

   case 429 :
   toast.error("عدد طلبات كبير, الرجاء المحاولة لاحقآ", {
     position: "top-right",
     autoClose: 4000,
     hideProgressBar: true,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
     theme: "light",
     
     });
 break;
 }
   



  }else{
   
 


  //  switch(udata&&udata.data.user.type){
  //      case 1:
         
  //      router.replace("/admin");
  //      break;
     
     
  //      case 2:
  //      router.replace("/agent");
  //      break;
     
  //      case 3:
  //      router.replace("/vendor");
  //      break;
     
     
  //      case 5:
  //        router.replace("/delivery");
  //        break;
     
     
  //      case 4:
  //        router.replace("/");
  //      break;
  //    }



  }

  setLod(false)

 }




 const handlelogin=()=>{
setLod(true);
  try {


    dispatch(login(
      {
        "identifier": email,
        "password": pass,
      }
    )).then(()=>{
setLod(true);
setTimeout(() => {
  loginrouter();
}, 10);

    })
    
  } catch (error) {
    console.log("error",error)
    setLod(false)
  }




  
 
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
        <div style={{backgroundSize:50}} className="w-full sm:w-full mt-16 h-full flex min-h-screen
          bg-[url('../../public/amblemblack.svg')] bg-white" >  
     
           <ToastContainer 
           position="top-right"
           autoClose={3000}
           hideProgressBar={true}
           newestOnTop={false}
           closeOnClick
           rtl={false}
           pauseOnFocusLoss
           draggable
           pauseOnHover
           theme="light"
           limit={3}
           />


           <div  className="  from-moon-200 to-moon-200 hidden sm:hidden lg:flex  md:w-1/4 lg:w-1/2 xl:w-1/2  " ></div>
  
            <div className="  w-full md:w-3/4 lg:w-1/2 xl:w-1/2 p-3 ">
    <div  style={{backgroundColor:"rgba(255,255,255,1)"}} className='w-full  flex align-middle  rounded-lg transition-transform  justify-center  text-right p-3 md:p-4 lg:p-8 shadow-xl  flex-col items-center ' >
        

    {/* Old signup stepper */}
<div  className="  w-full md:w-3/4 lg:w-3/4  px-3 py-3  transition-all" style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
<h1 className="text-center text-2xl  text-moon-300">تسجيل دخول</h1>

</div>


    <div  style={{display:type==0?"block":"none",zIndex:1}} className="w-full transition-all ">

<div>

<div className='w-full  flex align-middle justify-between'>
<div onClick={()=>{router.push("/register")} } className='inline-flex text-moon-300/60 flex-grow items-center justify-end' 
style={{fontSize:15,textDecoration:"underline",cursor:"pointer",textAlign:"left"}}>

<div className='flex align-middle justify-center '> ليس لديك حساب؟ أنشئ حساب</div>
<div style={{marginLeft:5}}> <FaUserPlus/> </div>
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
'soc'
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

{/* 
      <div className='space-x-2'>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(startClock())}
        >
          Increment
        </button>


        <button
          aria-label="Decrement value"
          onClick={() => console.log(sts)}
        >
          Decrement
        </button>
      </div> */}



      <motion.div className='flex-grow p-0 sm:px-0 lg:px-3 ' whileTap={{ scale: 1.03 }}>
      <LoadingBtn color={"lightgrey"} act={()=>{router.push("/register")} } textColor={"grey"} icon={<FaUserPlus  />} text={"تسجيل حساب جديد"} />
      </motion.div>


  </div>

  <div className=' flex justify-center items-center'>

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
   
   
    
    </div>


   

    </div>
    </div>
            
        </div>
    )
}