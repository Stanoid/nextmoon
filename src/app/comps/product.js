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
        ,padding:10,borderRadius:7,textAlign:'left',width:"100%",height:"100%"}}>


<div style={{
  display:loading?'flex':'none' 
}}>
<div style={{zIndex:10}}>
      <div style={{justifyContent:"center",alignItems:"center"}} className="lds-facebook"><div></div><div></div><div></div></div>
      </div>
</div>




<div style={{
  display:loading?'none':'flex',alignItems:"normal",justifyContent:"center",flexDirection:"column" 
}} >
      <div  onClick={()=>{router.push(`/products?pid=${props.data.id}`);setLoading(true);}} style={{borderRadius:5,
      cursor:"pointer"}}>
     
<img
id={props.data.id}
      quality={"50"}
       width={"100%"}
        height={"100%"} 
        
        style={{objectFit:'cover',width:'100%',height:'100%',borderRadius:12}}
      
        // onError={()=>{document.getElementById(props.data.id).src = props.data.img&&JSON.parse(props.data.img)[1]}}
          className={[Styles.nextimg]} 
          src={IMG_URL.concat(props.data.img&&JSON.parse(props.data.img)[1])} 
          />


       
      </div>

      <div  onClick={()=>{router.push(`/products?pid=${props.data.id}`);setLoading(true);}}
       className={Styles.ptfont} style={{color:"#585858",fontSize:'13.5px',cursor:"pointer"
       ,marginTop:10,marginBottom:5,lineHeight:1.2,textTransform:'capitalize',wordSpacing:0.6,lineBreak:"strict"}} >
         
          {props.data.name_en.length>=19?props.data.name_en.slice(0,40)+"...":props.data.name_en}
          <div style={{color:"grey",fontSize:12,display:'flex',alignItems:'center',padding:"5px 0px"}}>{props.data.seller.username}
           <BsCheckCircleFill style={{color:Theme.primary,marginLeft:3,display:"block"}} /> </div>
      </div>




<div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>

<div className='lg:flex-col md:flex-col flex-col sm:flex-col' style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",}}>

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

<div style={{display:"flex",alignItems:"center",justifyContent:"center",fontSize:15}}>

 <div style={{fontWeight:"bold"}}>4.5 </div> <div style={{color:"gold"}} > <div style={{padding:2,marginTop:-3}} > <BsStarFill/></div> </div> <div style={{color:"lightgray",fontSize:12}}> (12) </div>
</div>

</div>
    
      




<div className='shadow-md col-span-5' style={{
  display:props.atcbtn?"block":"none",
  marginTop:5,
    backgroundColor:Theme.secondary,
    color:"white",
    padding:"8px 12px",
    borderRadius:8, }}>
    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
    <div style={{
    color:"white",
    marginRight:5
  }}>
     <BsCartPlusFill/> 
  </div>
    <span className='text-base' style={{textWrap:"nowrap"}}>  Add to Cart</span>
    </div>
  </div>














      </div>

    
   
    


        </div>
    )
}
