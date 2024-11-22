import {React,useEffect,useState} from 'react'
import { CURRENCY, Theme } from '../local'
import { color, motion } from 'framer-motion'





function OptionEL(props) {
const varHandler = (id,s)=>{


}




  return (
    <div className='space-y-3' >

    
    <div 
className=' '
    style={{
        width:"100%",
        
        display:"flex",

        justifyContent:"flex-end",
        alignItems:"center"
    }}>








<div className='flex space-x-3'>



{props.vars&&props.vars.map(vari=>(

<div onClick={()=>{props.varselect(vari.id,vari.attributes.product_ref)}} key={vari.id} className='border-4 cursor-pointer px-2 transition-all py-2 rounded-md '
 style={{borderColor: props.vari==vari.id?Theme.primary : "grey" , 
    backgroundColor: props.vari==vari.id?Theme.primary : "white" , 
 display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
<div style={{fontWeight:"bold",padding:"3px 4px"}}>
{vari.attributes.sizes.data[0].attributes.icon} <span> </span>
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

<div className='flex flex-col justify-center items-center space-y-1' >


<div key={color.id} onClick={()=>{props.colorSelect(color.id)}} className='rounded-full transition-all cursor-pointer border-4 ' 
 style={{ borderColor: props.color==color.id? Theme.primary: "white" , display:"flex"
 ,alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
<div style={{backgroundColor:color.attributes.colorCode}} className='w-9 h-9  rounded-full'>

</div>

</div>

<div 
style={{
    
  color: props.color==color.id? Theme.primary: Theme.primaryDark ,
}}
className='font-semibold' >
    {color.attributes.name_ar}
</div>




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