'use client'

import React from 'react'

import Styles from "../styles/Home.module.css"
import { Theme,CURRENCY } from '../local'

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
  // console.log("group",props.hasGroup)
//https://res.cloudinary.com/strapimedia/image/upload/v1645445395/tyler-nix-BQrxXytYaHI-unsplash_zeggsu.jpg
//https://res.cloudinary.com/strapimedia/image/upload/w_1000,ar_1:1,c_fill/v1645445395/tyler-nix-BQrxXytYaHI-unsplash_zeggsu.jpg
  



//image path handler
// let imm = props.img;
//   let ino = imm.split("/", 6).join("/").length
//   let res = "";
 
// let head = imm.slice(0,ino+1);
// let foot = imm.slice(ino+1,imm.length);

// let nx = head.concat("w_1000,ar_1:1,c_fill/")
// nx = nx.concat(foot);
//setCimg(nx);



//console.log("nx",nx)
//console.log("result",head.concat(foot))

   }, [])



   


    return (

      
        <div  onClick={()=>{router.push(`/products?pid=${props.id}`);setLoading(true);}} className="shadow-md"  
        style={{marginBom:20,cursor:"pointer",display:'block',
        display:"flex",alignItems:"center",justifyContent:"center"
        ,padding:10,borderRadius:10,textAlign:'left',width:props.half?"60%":"100%",height:"100%"}}>


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
      <div style={{borderRadius:5,alignItems:'center',justifyContent:"center"}}>

    

      
    <img
      quality={"50"}
       width={"100%"}
        height={"100%"} 
        
        style={{objectFit:'cover',width:'100%',height:'100%',borderRadius:8}}
      
      
          className={[Styles.nextimg]} 
          src={"/pimg/"+props.id+".jpg"} 
          />
      </div>

      <div onClick={()=>{router.push(`/products/${props.id}`);}} className={Styles.ptfont} style={{color:"#585858",fontSize:'13.5px',marginTop:10,marginBottom:5,lineHeight:1.2,textTransform:'capitalize',wordSpacing:0.6}} >
         
          {props.name}
          <div style={{color:"grey",fontSize:12,display:'flex',alignItems:'center',padding:"5px 0px"}}>{props.vendor} <BsCheckCircleFill style={{color:Theme.primary,marginLeft:3,display:props.ver?"block":"none"}} /> </div>
      </div>

    
      
      <div className='grid grid-cols-5 gap-x-0'>

      <div className='col-span-2' >
<span className='text-sm lg:text-sm md:text-2xl sm:2xl ' style={{color:"grey"}} 
      >  <span style={{fontWeight:"bold",color:Theme.primary}} >{parseFloat(props.price.price)} {CURRENCY} </span> 
      </span>
   </div>
   <div onClick={()=>{router.push(`/catagories/${props.cat[0].id}`)}} className='col-span-3' >
<span style={{color:"white",backgroundColor:Theme.primary,padding:"1px 5px 1px 5px",
borderRadius:"3px 5px 0px 5px",fontSize:13}}>{props.cat[0].Name}
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
