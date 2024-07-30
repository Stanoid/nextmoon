'use client'
import {React,useState }from 'react'
import { FaPlus,FaMinus } from 'react-icons/fa6'
import { Theme } from '../local'

function QuantEl(props) {

  const [counter,setCounter] = useState(1);

  return (
  

    <div  style={{padding:"8px 10px",marginBottom:10,backgroundColor:"white",color:"black",borderRadius:5,display:"flex"
    ,alignItems:"center",justifyContent:"center"}}>
       <div onClick={()=>{
        if(props.qty>1){
          props.quantHandler(props.qty-1)
         
        }
      
       }} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <FaMinus/>
       </div>


       <div style={{display:"flex",justifyContent:"center",alignItems:"center",
       padding:"0px 20px",
    fontSize:20,
    fontWeight:"bold"
    }}>
    {props.qty} 
       </div>



       <div
       onClick={()=>{
        if(props.qty<props.stock){
          props.quantHandler(props.qty+1)
        }
       }}
       style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <FaPlus/>
       </div>
        
    </div>



 
  )
}

export default QuantEl