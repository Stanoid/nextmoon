import React from 'react'
import { FaPlus,FaMinus } from 'react-icons/fa6'
import { Theme } from '../local'
function QuantEl() {
  return (
  

    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
       <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <FaPlus/>
       </div>


       <div style={{display:"flex",justifyContent:"center",alignItems:"center",
       padding:"0px 20px",
    fontSize:20,
    fontWeight:"bold"
    }}>
    2   
       </div>



       <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <FaMinus/>
       </div>
        
    </div>



 
  )
}

export default QuantEl