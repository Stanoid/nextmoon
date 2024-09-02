import {React,useEffect,useState} from 'react'
import { CURRENCY, Theme } from '../local'
import { motion } from 'framer-motion'





function OptionEL(props) {
const varHandler = (id,s)=>{


}




  return (
    <div >

    
    <div 
className=' '
    style={{
        width:"100%",
        
        display:"flex",

        justifyContent:"flex-end",
        alignItems:"center"
    }}>






{props.vars&&props.vars.map(varient=>(
<motion.div   whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}

 onClick={()=>{props.varselect(varient.id,varient.attributes.product_ref)}}   className='shadow-md transition-colors flex-row lg:flex-row
  md:flex-col sm:flex-row  ' style={{padding:"10px 10px",color:props.selid==varient.id?"white":"black"
,borderRadius:5,margin:7,backgroundColor:props.selid==varient.id?Theme.primary:"white",cursor:"pointer",
display:"flex",justifyContent:"center",alignItems:"center"
}}  key={varient.id} >
{/* <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
<div  style={{width:30,height:30,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",
border:"3px solid white",marginRight:-10,zIndex:0,marginBottom:-5
,backgroundColor:Theme.primary,color:"white",fontSize:20}}>{varient.attributes.size.data.attributes.icon}</div>
<div style={{width:35,height:35,
    marginLeft:-10,marginTop:-5
    ,borderRadius:100,backgroundColor:varient.attributes.color.data.attributes.colorCode}} ></div>
</div> */}
<div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
<div style={{fontWeight:"bold",padding:"3px 4px"}}>
{varient.attributes.size.data.attributes.icon} <span> </span>
</div>
{/* <div style={{color:props.selid==varient.id?"white":"black"
,fontStyle:'oblique'}}>
    {varient.attributes.price} {CURRENCY}
</div> */}
</div>
</motion.div>
))}



<div 
  className=' transition-colors flex-row lg:flex-row
  md:flex-col sm:flex-row  ' style={{padding:"10px 10px",color:"black"
,borderRadius:5,margin:7,
display:"flex",justifyContent:"center",alignItems:"center"
}}   >
{/* <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
<div  style={{width:30,height:30,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",
border:"3px solid white",marginRight:-10,zIndex:0,marginBottom:-5
,backgroundColor:Theme.primary,color:"white",fontSize:20}}>{varient.attributes.size.data.attributes.icon}</div>
<div style={{width:35,height:35,
    marginLeft:-10,marginTop:-5
    ,borderRadius:100,backgroundColor:varient.attributes.color.data.attributes.colorCode}} ></div>
</div> */}
<div style={{display:"flex",whiteSpace:'nowrap',alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
<div style={{fontWeight:"bold",padding:"3px 4px"}}>
{": المقاس"} <span> </span>
</div>
{/* <div style={{color:props.selid==varient.id?"white":"black"
,fontStyle:'oblique'}}>
    {varient.attributes.price} {CURRENCY}
</div> */}
</div>
</div>


 </div> 


 <div 
className=''
    style={{
        width:"100%",
        
        display:"flex",

        justifyContent:"flex-end",
        alignItems:"center"
    }}>






{props.vars&&props.vars.map(varient=>(
<motion.div   whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}

 onClick={()=>{props.varselect(varient.id,varient.attributes.product_ref)}}   className='shadow-md transition-colors flex-row lg:flex-row
  md:flex-col sm:flex-row  ' style={{color:props.selid==varient.id?"white":"black"
,borderRadius:100,margin:7,backgroundColor:props.selid==varient.id?Theme.primary:"white",cursor:"pointer",
display:"flex",justifyContent:"center",alignItems:"center"
}}  key={varient.id} >
<div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>

<div style={{width:35,height:35,borderRadius:100,backgroundColor:varient.attributes.color.data.attributes.colorCode}} ></div>
</div>
{/* <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
<div style={{fontWeight:"bold",padding:"3px 4px"}}>
{varient.attributes.size.data.attributes.icon} <span> </span>
</div>

</div> */}
</motion.div>
))}



<div 
  className=' transition-colors flex-row lg:flex-row
  md:flex-col sm:flex-row   ' style={{padding:"10px 10px",color:"black"
,borderRadius:5,margin:7,
display:"flex",justifyContent:"flex-end",alignItems:"center"
}}   >
{/* <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
<div  style={{width:30,height:30,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",
border:"3px solid white",marginRight:-10,zIndex:0,marginBottom:-5
,backgroundColor:Theme.primary,color:"white",fontSize:20}}>{varient.attributes.size.data.attributes.icon}</div>
<div style={{width:35,height:35,
    marginLeft:-10,marginTop:-5
    ,borderRadius:100,backgroundColor:varient.attributes.color.data.attributes.colorCode}} ></div>
</div> */}
<div style={{display:"flex",alignItems:"center",whiteSpace:"nowrap",justifyContent:"flex-end",flexDirection:"row"}}>
<div style={{fontWeight:"bold",padding:"3px 4px"}}>
{": اللون"} <span> </span>
</div>
{/* <div style={{color:props.selid==varient.id?"white":"black"
,fontStyle:'oblique'}}>
    {varient.attributes.price} {CURRENCY}
</div> */}
</div>
</div>


 </div> 





 </div>
  )
}

export default OptionEL