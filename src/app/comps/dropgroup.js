import React from 'react'
import { useState,useEffect } from 'react'
import { API_URL,Theme } from '../local'
import Drop from './drop'



function DropGroup() {
const ls = require("local-storage")
const [cats,setCats] = useState();
    

useEffect(() => {
  
    getallcat();
     
    }, [])
    
    
    const getallcat = ()=>{
        
        const requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
              
            },
          
        };
      
          fetch(`${API_URL}catagories?populate=*`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
      
      
              
          console.log("Catagories data ",data.data)
         setCats(data.data);
          
           
            });
    
    
    }




  return (
    <div className='scrollable-content' style={{display:"flex",alignItems:"center",alignItems:"center",overflowX:"scroll",overflowY:"hidden",padding:5}}>

{cats&&cats.map(cat=>(

<div  key={cat.id}>

<Drop data={cat}/>

</div>
))}
    
     
    </div>
  )
}

export default DropGroup