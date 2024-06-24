import { Fragment } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, Transition } from '@headlessui/react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'
import { Theme } from '../local'


export default function Drop(props) {

const [eleft,setEleft] = useState(0)
const [etop,setEtop] = useState(0)
const [show,setShow] = useState(false);
const router = useRouter();

  const drawpop = (el)=>{

    if(show){
      setShow(0);
    }else{
      setShow(1);
    }
   
    setEleft(el.target.getBoundingClientRect().left);
    setEtop(el.target.getBoundingClientRect().top);
  

  }


  return (



    

    
 <div
 onClick={(el)=>{
 drawpop(el)
 }}


 onMouseLeave={()=>{setShow(0)}}
 
 style={{
  backgroundColor:"white",
  padding:"5px 7px",
  cursor:"pointer",
  userSelect:"none",
  WebkitUserSelect:"none",
  msUserSelect:"none",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  borderRadius:4,
  marginRight:9,
 }}>
  <div

  
  style={{
    overflow: "hidden",
    color:Theme.secondary,
    textOverflow:"ellipsis",
    whiteSpace:"nowrap"
  }}>


<div>
{props.data.attributes.name_en}
</div>


  
 




    </div>

    <div style={{marginLeft:3,color:"lightgray",fontSize:15}}>
 {
  show? <FaChevronUp/>:<FaChevronDown/>
 } 
 
</div>


  
  

   <div
   
 style={{
 
 
  position:"absolute",
top:etop-30,
left:eleft,
display: show?"block":"none",
 
  
}}
 >


<div id="dropdown" class="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
     

      {props.data.attributes.subcatagories&&props.data.attributes.subcatagories.data.map((subcat,index)=>(

<li>
<a onClick={()=>{location.href = "/subcatagories?sid="+subcat.id }}  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
  {subcat.attributes.name_en}</a>
</li>

))}


    
    </ul>
</div>



 </div>



 </div>







  )
}
