'use client'

import React from 'react'

import Styles from "../styles/Home.module.css"
import { Theme,CURRENCY, API_URL, IMG_URL, DEF_IMG } from '../local'

import Image from 'next/image'
import { useState,useEffect } from 'react'

import { MAIN_STYLE } from '../styles/style'
import Head from 'next/head'
import { BsStarFill,BsCheck2Circle,BsCheckCircleFill,BsCartPlusFill } from 'react-icons/bs'
import { useRouter } from 'next/navigation'



export default function Product(props) {
  const router = useRouter();
  const [loading,setLoading]= useState(false);
 const [cimg,setCimg] = useState("");


  useEffect(() => {
//getprice();

// }
//console.log("img url", IMG_URL.concat(props.data.img&&JSON.parse(props.data.img)[0])) 


   }, [])

// const getprice = ()=>{
//   for (let i = 0; i < props.data.length; i++) {
    
    
//   }
// }

   


    return (

      
        <div  className="shadow-md"  
        style={{marginBom:20,display:'block',
        display:"flex",alignItems:"center",justifyContent:"center"
        ,padding:10,borderRadius:10,textAlign:'left',width:"100%",height:"100%"}}>


<div style={{
  display:loading?'flex':'none' 
}}>
<div style={{zIndex:10}}>
      <div style={{justifyContent:"center",alignItems:"center"}} className="lds-facebook"><div></div><div></div><div></div></div>
      </div>
</div>




<div style={{
  display:loading?'none':'block' 
}} >
      <div  onClick={()=>{router.push(`/products?pid=${props.data.id}`);setLoading(true);}} style={{borderRadius:5,alignItems:'center',
      cursor:"pointer",justifyContent:"center"}}>

{/* 
<object
  type="image/png"
  data="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANcAAACUCAMAAAA3b0xFAAAAMFBMVEXp7vG6vsG+wsXe4uXj6OvY3N+2ur3FyczS1tnLz9Lm6+7a3+LBxcjg5ejIzM/U2dxYFhVVAAACQElEQVR4nO3b4XqCIBhAYUWiFLT7v9s1zImKNaXlRzvvv83W49kQNVlRAAAAAAAAAAAAAAAArNFVsvbohiV9Oatkrq6O7pjRrnwJdT26ZKJ5TdWNsUe3hGrzsrCyOTpm1PSj0CVS/l1OR9eMKr9HVqfyv5766JqR71Lp73P51C5D1zv8k6724krV2e0Ttuiupr6fYd3miyLJXbobztFGbb12kNxVB5cObuMFuuCu/hQ9qLcdY4K7ZleKetP7CO6a3q+Ytamjiv4hBXepadfKzGFVF/t27l1WxXdfcFc3vZmKTojWJ9fLY09w13WS5WLzhlVrk6XgrnYyEGOfVtifVyyOMcFdxSnI6iKzXhVun22T3DWGmS4yCu1knM7CRXcVtvNfukvklXY6X86OMdldRVOdrlf7aMoIwsLNwrtWLbNu032wPdOualE1G4p5dsWzwrAsuyKDcJgVh5dk0tWEk9161hiWR5cugxOYXa/6PtP1v4EsulpnxvPuw6zvWdG/MIeu1gUj7NEg7Pkbmgy67o9Y+r2snmb1T1Hkd+mfHb4NxSeDMKOuNviYo/5NVh5d7fk3Kdl17XmInkGXfj5L5Ni1K0t+145jK4euducCFeldbudKDulduw4uut6LLrokoCvbrmYn/8OCu5LQ9R4f3RV/lryJX6sjqKu/5VLnRP2tgKSV5t182k4gaD128LFaKiNoGN7YFy2gNxtXiv053aX/e4oqnaDF84P2lCz6TBoAAAAAAAAAAAAAAAAAAEjzBS7CIGgyDyyNAAAAAElFTkSuQmCC"
  width="100%"
  height="100%"
  
  aria-label="This image should exist, but alas it does not"
> */}
  
     
<img
id={props.data.id}
      quality={"50"}
       width={"100%"}
        height={"100%"} 
        
        style={{objectFit:'cover',width:'100%',height:'100%',borderRadius:8}}
      
        onError={()=>{document.getElementById(props.data.id).src = DEF_IMG}}
          className={[Styles.nextimg]} 
          src={IMG_URL.concat(props.data.img&&JSON.parse(props.data.img)[0])} 
          />

{/* </object> */}
    

   
      </div>

      <div  onClick={()=>{router.push(`/products?pid=${props.data.id}`);setLoading(true);}}
       className={Styles.ptfont} style={{color:"#585858",fontSize:'13.5px',cursor:"pointer"
       ,marginTop:10,marginBottom:5,lineHeight:1.2,textTransform:'capitalize',wordSpacing:0.6}} >
         
          {props.data.name_en}
          <div style={{color:"grey",fontSize:12,display:'flex',alignItems:'center',padding:"5px 0px"}}>{props.data.seller.username}
           <BsCheckCircleFill style={{color:Theme.primary,marginLeft:3,display:"block"}} /> </div>
      </div>



    
      
       <div className='lg:flex-row md:flex-row flex-col sm:flex-col' style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",}}>

      <div style={{cursor:"pointer"}}  onClick={()=>{router.push(`/products?pid=${props.data.id}`);setLoading(true);}} className='' >
<span className='text-sm lg:text-sm md:text-2xl sm:2xl ' style={{color:"grey"}} 
      >  <span style={{fontWeight:"bold",color:Theme.primary}} >{parseFloat(props.data.varients[0].price)} {CURRENCY} </span> 
      </span>
   </div>
   <div style={{display:props.data.subcatagory?"":"none"}}  onClick={()=>{router.push(`/categories?cid=${props.data.subcatagory&&props.data.subcatagory.id}`)}} className=' ' >
<span style={{color:"white",backgroundColor:Theme.primary,padding:"3px 5px 3px 5px",cursor:"pointer",
borderRadius:"3px 5px 0px 5px",fontSize:13}}>{props.data.subcatagory&&props.data.subcatagory.name_en}
</span>
</div>
</div>


{/* add to cart button on product */}
{/* 
<div className='shadow-md col-span-5' style={{
    backgroundColor:Theme.primary,
    color:"white",
    padding:"8px 12px",
    borderRadius:8, }}>
    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
    <div style={{
    color:"white",
    fontSize:23,
    marginRight:5
  }}>
     <BsCartPlusFill/> 
  </div>
    <span> Add to Cart</span>
    </div>
  </div> */}














      </div>

    
   
    


        </div>
    )
}
