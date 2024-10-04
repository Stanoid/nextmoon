/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState,useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {removeFromCart} from "../lib/actions/counterAction"
import { useDispatch } from 'react-redux'
import { XIcon } from '@heroicons/react/outline'
import { BsChevronDown,BsChevronUp,BsThermometer,BsTrashFill } from 'react-icons/bs'
import  FaHeartCircleMinus from 'react-icons/fa6'
import {CURRENCY, IMG_URL, Theme} from "../local"

import { BsX } from 'react-icons/bs'






export default function Cartel(props) {
  const [open, setOpen] = useState(true)
  const [varient, setVarient] = useState(true)
 const dispatch = useDispatch();



  
useEffect(() => {

  
  for (let i = 0; i < props.data.attributes.varients.data.length; i++) {
 

    
    if(props.data.attributes.varients.data[i].id==props.selvar){
      setVarient(props.data.attributes.varients.data[i]);
    }
   
  }

  
}, [])


  const removeid = ()=>{

props.removeItem(props.index);
  }


  return (
  
    <div className='shadow-md'    
    
    style={{display:"flex",borderRadius:10,alignItems:"center",backgroundColor:"white",margin:"10px 10px",justifyContent:"space-between"}}>



<div  style={{padding:10,width:"100%",display:"flex",flexDirection:"row-reverse",alignItems:"center",justifyContent:"space-between"}}>


<div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>

<img width={70} 
style={{
 borderRadius:5
}}
src={ IMG_URL.concat(JSON.parse(props.data.attributes.img)[0])} />


</div>

<div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}} className='sm:flex-col lg:flex-row' >

<div dir='rtl' className='text-xs' style={{padding:5,
paddingBottom:0,fontWeight:"bold",textAlign:"right"}}>
  {props.data.attributes.name_ar.length>40?props.data.attributes.name_ar.slice(0,40)+ "..."
:props.data.attributes.name_ar
  }</div>


      <div dir='rtl' className='font-semibold text-moon-200/80'>{varient.attributes&&varient.attributes.price} {CURRENCY}
      <span className=' italic text-gray-300 ' style={{ padding:5,fontSize:9,paddingTop:0,color:"black",fontWeight:"bold"}}>{props.qty} قطعة</span>

      </div>
     

</div>

   



      <div style={{display:"flex",alignContent:"center",justifyContent:"center",flexDirection:"column",marginLeft:5}}>

  


      <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
<div  style={{width:25,height:25,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",
border:"3px solid white",marginRight:-10,zIndex:10,marginBottom:-5
,backgroundColor:Theme.primary,color:"white",fontSize:14}}>{varient.attributes&&varient.attributes.size.data.attributes.icon}</div>

<div style={{width:30,height:30,
    marginLeft:-10,marginTop:-5
    ,borderRadius:100,backgroundColor:varient.attributes&&varient.attributes.color.data.attributes.colorCode}} ></div>

</div>

<div style={{fontSize:8,display:props.order?"none":"flex",textAlign:"center",marginLeft:0,alignItems:"flex-end"}}>
{varient.attributes&&varient.attributes.size.data.attributes.name_en} <span> <b> / </b> </span> {varient.attributes&&varient.attributes.color.data.attributes.name_ar}
</div>


      </div>


      <div
      onClick={()=>{dispatch(removeFromCart(props.selvar  ))}}
      style={{display:props.order?"none":"flex",alignItems:"center",justifyContent:"center",borderRight:"2px solid lightgrey",paddingRight:10}}>
        <div style={{backgroundColor:"red",padding:2.5,borderRadius:100}}>
        <BsX style={{color:"white",fontSize:25}} />
        </div>
  
      </div>

   
</div>





    

   

    </div>

      )
}
