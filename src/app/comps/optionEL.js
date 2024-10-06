import {React,useEffect,useState} from 'react'
import { CURRENCY, Theme } from '../local'
import { color, motion } from 'framer-motion'





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








<div className='flex space-x-3'>



{props.vars[0].attributes.sizes.data&&props.vars[0].attributes.sizes.data.map(size=>(

<div onClick={()=>{props.sizeSelect(size.id)}} key={size.id} className='border-4 px-2  py-2 rounded-md ' style={{borderColor: props.size==size.id?
     Theme.primary : "grey" , display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
<div style={{fontWeight:"bold",padding:"3px 4px"}}>
{size.attributes.icon} <span> </span>
</div>
{/* <div style={{color:props.selid==varient.id?"white":"black"
,fontStyle:'oblique'}}>
    {varient.attributes.price} {CURRENCY}
</div> */}
</div>


))}


</div>




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





<div className='flex space-x-3'>



{props.vars[0].attributes.colors.data&&props.vars[0].attributes.colors.data.map(color=>(

<div key={color.id} onClick={()=>{props.colorSelect(color.id)}} className='rounded-full cursor-pointer border-4 '  style={{ borderColor: props.color==color.id? Theme.primary: "white" , display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
<div style={{backgroundColor:color.attributes.colorCode}} className='w-9 h-9 rounded-full'>

</div>
{/* <div style={{color:props.selid==varient.id?"white":"black"
,fontStyle:'oblique'}}>
    {varient.attributes.price} {CURRENCY}
</div> */}
</div>


))}


</div>



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