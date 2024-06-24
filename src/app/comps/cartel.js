/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState,useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { BsChevronDown,BsChevronUp,BsThermometer,BsTrashFill } from 'react-icons/bs'
import  FaHeartCircleMinus from 'react-icons/fa6'
import {CURRENCY, IMG_URL, Theme} from "../local"

import { BsX } from 'react-icons/bs'






export default function Cartel(props) {
  const [open, setOpen] = useState(true)
  const [varient, setVarient] = useState(true)




  
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



<div  style={{padding:10,width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between"}}>


<div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>

<img width={100} 
style={{
 borderRadius:5
}}
src={ IMG_URL.concat(JSON.parse(props.data.attributes.img)[0])} />


</div>

<div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexDirection:props.order?"row":"column"}} className='sm:flex-col lg:flex-row' >

<div style={{fontSize:15,padding:5,paddingBottom:0,fontWeight:"bold",textAlign:"left"}}>{props.data.attributes.name_en}</div>


      <div style={{fontSize:15,padding:5,color:Theme.primary,paddingTop:0}}>{varient.attributes&&varient.attributes.price} {CURRENCY}
      <span style={{padding:5,paddingTop:0,color:"black",fontWeight:"bold"}}>{props.qty} Pc/s</span>

      </div>
     

</div>

   



      <div style={{display:"flex",alignContent:"center",justifyContent:"center",flexDirection:"column",marginRight:10}}>

      <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
<div  style={{width:25,height:25,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",
border:"3px solid white",marginRight:-10,zIndex:10,marginBottom:-5
,backgroundColor:Theme.primary,color:"white",fontSize:14}}>{varient.attributes&&varient.attributes.size.data.attributes.icon}</div>

<div style={{width:30,height:30,
    marginLeft:-10,marginTop:-5
    ,borderRadius:100,backgroundColor:varient.attributes&&varient.attributes.color.data.attributes.colorCode}} ></div>

</div>

<div style={{fontSize:13,display:props.order?"none":"block",textAlign:"center"}}>
{varient.attributes&&varient.attributes.size.data.attributes.name_en} <span>  </span> {varient.attributes&&varient.attributes.color.data.attributes.name_en}
</div>

      </div>


      <div
      onClick={()=>{props.removeItem(props.index)}}
      style={{display:props.order?"none":"flex",alignItems:"center",justifyContent:"center",borderLeft:"2px solid lightgrey",paddingLeft:10}}>
        <div style={{backgroundColor:"red",padding:2.5,borderRadius:100}}>
        <BsX style={{color:"white",fontSize:25}} />
        </div>
  
      </div>

   
</div>





    

   

    </div>

      )
}
