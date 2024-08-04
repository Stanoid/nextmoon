import {React,useEffect,useState} from 'react'
import { CURRENCY, Theme } from '../local'
import { motion } from 'framer-motion'





function OptionEL(props) {
const varHandler = (id,s)=>{


}




  return (
    <div 
className='flex-col px-8 lg:flex-col md:flex-col sm:flex-col'
    style={{
        width:"100%",
        
        display:"flex",

        justifyContent:"center",
        alignItems:"center"
    }}>


{props.vars&&props.vars.map(varient=>(
<motion.div   whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}

 onClick={()=>{props.varselect(varient.id,varient.attributes.product_ref)}}   className='shadow-md transition-colors flex-row lg:flex-row
  md:flex-col sm:flex-row min-w-full ' style={{padding:"10px 10px"
,borderRadius:10,margin:7,border:props.selid==varient.id?"4px solid"+Theme.primary:"4px solid #FAFAFA",cursor:"pointer",
display:"flex",justifyContent:"center",alignItems:"center"
}}  key={varient.id} >
<div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
<div  style={{width:30,height:30,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",
border:"3px solid white",marginRight:-10,zIndex:0,marginBottom:-5
,backgroundColor:Theme.primary,color:"white",fontSize:20}}>{varient.attributes.size.data.attributes.icon}</div>
<div style={{width:35,height:35,
    marginLeft:-10,marginTop:-5
    ,borderRadius:100,backgroundColor:varient.attributes.color.data.attributes.colorCode}} ></div>
</div>
<div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
<div style={{fontWeight:"bold",padding:10,paddingBottom:0}}>
{varient.attributes.size.data.attributes.name_en} <span> / </span> {varient.attributes.color.data.attributes.name_ar}
</div>
<div style={{color:"grey",fontStyle:'oblique'}}>
    {varient.attributes.price} {CURRENCY}
</div>
</div>
</motion.div>
))}


 </div> 





 
  )
}

export default OptionEL