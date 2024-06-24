import {React,useEffect,useState} from 'react'
import { CURRENCY, Theme } from '../local'
import { FaTrash } from 'react-icons/fa6'





function OptionELEdit(props) {
const varHandler = (id,s)=>{


}




  return (
    <div 
className='flex-col lg:flex-row md:flex-row sm:flex-col'
    style={{
        width:"100%",
        display:"flex",

        justifyContent:"center",
        alignItems:"center"
    }}>


{props.vars&&props.vars.map(varient=>(
<div    className='shadow-md flex-row lg:flex-col md:flex-col sm:flex-row ' style={{padding:"15px 10px"
,borderRadius:10,margin:7,border:props.selid==varient.id?"4px solid"+Theme.primary:"4px solid #FAFAFA",cursor:"pointer",
display:"flex",justifyContent:"center",alignItems:"center"
}}  key={varient.id} >



<div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
<div  style={{width:30,height:30,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",
border:"3px solid white",marginRight:-10,zIndex:10,marginBottom:-5
,backgroundColor:Theme.primary,color:"white",fontSize:20}}>{varient.attributes.size.data.attributes.icon}</div>
<div style={{width:35,height:35,
    marginLeft:-10,marginTop:-5
    ,borderRadius:100,backgroundColor:varient.attributes.color.data.attributes.colorCode}} ></div>
</div>
<div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
<div style={{fontWeight:"bold",padding:10,paddingBottom:0}}>
{varient.attributes.size.data.attributes.name_en} <span> / </span> {varient.attributes.color.data.attributes.name_en}
</div>
<div style={{color:"grey",fontStyle:'oblique'}}>
    {varient.attributes.price} {CURRENCY}
</div>
</div>

<div onClick={()=>{props.removeV(varient.id)}} style={{padding:10,marginTop:10,fontSize:15,backgroundColor:"red",borderRadius:5,color:"white",display:"flex",alignItems:"center",justifyContent:"center"}}>
<FaTrash style={{marginRight:10}}/> 
Remove
</div>


</div>
))}


 </div> 





 
  )
}

export default OptionELEdit