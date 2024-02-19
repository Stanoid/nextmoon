import React from 'react'
import { Theme } from '../local'
function OptionEL() {
  return (
    <div  style={{
        width:"100%",
        padding:10,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"

    }} >


<div style={{
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
   
    borderRight:"0px solid grey",
   justifyContent:"space-between",

    
}}>


<div style={{
    display:"flex",alignItems:"center",justifyContent:"center",
    fontSize:15,fontWeight:500,marginBottom:10

}}>

    Size

</div>


<div style={{
    display:"flex",alignItems:"center",justifyContent:"center"
}}>

    
<div style={{
    padding:"2px 8px", 
    fontSize:20,
    fontWeight:500,
    color:Theme.primary,
    margin:"0px 5px",
    borderRadius:10,
    border:"2px solid " + Theme.primary,

}}>
    S
</div>


<div style={{
        padding:"2px 8px", 
    fontSize:20,
    margin:"0px 5px",
    fontWeight:500,
    color:"grey",
    borderRadius:10,
    border:"2px solid grey",

}}>
    M
</div>




<div style={{
       padding:"2px 8px", 
    fontSize:20,
    margin:"0px 5px",
    fontWeight:500,
    color:"grey",
    borderRadius:10,
    border:"2px solid grey",

}}>
    L
</div>


</div>







</div>


















<div style={{
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    marginLeft:20,
   justifyContent:"space-between",

    
}}>


<div style={{
    display:"flex",alignItems:"center",justifyContent:"center",
    fontSize:15,fontWeight:500,marginBottom:10

}}>

    Color

</div>


<div style={{
    display:"flex",alignItems:"center",justifyContent:"center"
}}>


   <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
   <div style={{
    padding:"8", 
    fontSize:20,
    width:35,
    height:35,
    fontWeight:500,
    backgroundColor:"grey",
    margin:"0px 5px",
    borderRadius:100,
    border:"4px solid " + Theme.primary,
}}> 
</div>
{/* <div style={{padding:3,
    lineHeight:1,display:"flex",
    justifyContent:"center",
    alignItems:"center",
    fontWeight:500,
    color:Theme.primary,
    }}>
    Bright red
</div> */}

    </div> 



    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
   <div style={{
    padding:"8", 
    fontSize:20,
    width:35,
    height:35,
    fontWeight:500,
    backgroundColor:"blue",
    margin:"0px 5px",
    borderRadius:100,
    border:"0px solid " + Theme.primary,
}}> 
</div>

    </div> 




    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
   <div style={{
    padding:"8", 
    fontSize:20,
    width:35,
    height:35,
    fontWeight:500,
    backgroundColor:"green",
    margin:"0px 5px",
    borderRadius:100,
    border:"0px solid " + Theme.primary,
}}> 
</div>

    </div> 






</div>







</div>













</div>




 
  )
}

export default OptionEL