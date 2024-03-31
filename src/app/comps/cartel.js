/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { BsChevronDown,BsChevronUp,BsTrashFill } from 'react-icons/bs'
import  FaHeartCircleMinus from 'react-icons/fa6'
import {CURRENCY, Theme} from "../local"

import { BsX } from 'react-icons/bs'

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More products...
]

// function truncate(str, n){
//   return (str.length > n) ? str.slice(0, n-1) + '&hellip;'+"..." : str+"...";
// };


export default function Cartel(props) {
  const [open, setOpen] = useState(true)


  const removeid = ()=>{

props.removeItem(props.index);
  }


  return (
  <div>
      

<div  className={props.order?"shadow-none":'shadow-md'} style={{
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  padding:props.order?"0px 0px":"0px 20px",
  borderRadius:10,
margin:10,
}}>






<div style={{
  
    alignItems:"center",
    margin:10,
    display:props.order?"none":"flex",

    justifyContent:'center',

  }}> 

<span


onClick={props.like?()=>{removeid()}:()=>{removeid()}}
 className=  'shadow-md' style={{

  color:props.like?"#FE2E2E":"white",
  backgroundColor:props.like?"white":"#FE2E2E",
  cursor:"pointer",
  padding:props.like?10:5,


 borderRadius:100

}}>

{
  props.like?<BsTrashFill style={{  fontWeight:"bold", fontSize:20}} />:<BsX style={{ color:"white", fontWeight:"bold", fontSize:20}} />
 
}

</span>
 

  

  </div>






<div style={{
  display:"flex",
  justifyContent:"center",
  flexDirection:"column",
  color: props.order?"white":Theme.secondary,
fontWeight:"bold",
lineHeight:1,
fontSize:15,
margin:10,
textAlign:"left",
  alignItems:"flex-start",
}}>
<div>
{/* {truncate(props.name,20)} */ 
props.name
}
</div>

<div

style={{
  color:props.order?"white":"grey",
  textAlign:"left",
  fontSize:15,
 
  marginTop:5
}}>

  {props.price[0].price +"  "+ CURRENCY} 

</div>



</div>



<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>

<div style={{
    padding:"1.5px 6px", 
    fontSize:15,
    fontWeight:500,
    color:Theme.primary,
    margin:"0px 5px",
    borderRadius:5,
    border:"2px solid " + Theme.primary,

}}>
    {props.cartsize}
</div>

<div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",marginTop:10}}>
   <div style={{
    padding:"5", 
    fontSize:20,
    width:25,
    height:25,
    fontWeight:500,
    backgroundColor:props.cartcolor,
    margin:"0px 5px",
    borderRadius:100,
    border:"0px solid " + Theme.primary,
}}> 
</div>

    </div> 




</div>

<div style={{
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  margin:10,
  marginRight:0
}}>


  <img
   src={"/pimg/"+props.img+".jpg"}
   width={props.order?70:100}
   style={{
    borderRadius:5,

   }}
   ></img>

</div>




</div>


                   
  </div>
  )
}
