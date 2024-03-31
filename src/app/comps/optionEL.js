import {React,useEffect,useState} from 'react'
import { Theme } from '../local'






function OptionEL(props) {
    const [selected, setSelected] = useState(0);
    const [selectedC, setSelectedC] = useState(0);



    // useEffect(() => {
    
    
    // }, [])
    

const varHandler = (id,s)=>{
setSelected(id);
props.cartSize(s);
props.selectedfunc(id);

}


const colorHanlder = (id,c)=>{
    setSelectedC(id);
    props.cartcolor(c)

    props.selectedfuncC(id);
    
    }


  return (
    <div 
    className='flex-col sm:flex-col lg:flex-row '
    style={{
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
   marginTop:15,
    borderRight:"0px solid grey",
   justifyContent:"space-between",

    
}}>


<div style={{
    display:"flex",alignItems:"center",justifyContent:"center",
    fontSize:15,fontWeight:500,marginBottom:10

}}>

 

</div>


<div style={{
    display:"flex",alignItems:"center",justifyContent:"center"
}}>




{props.vars&&props.vars.map((varr,index)=>(



<div
className='shadow-md'
onClick={()=>{varHandler(varr.id,varr.icon)}}  key={index} style={{
    padding:"5px 8px", 
    fontSize:20,
    fontWeight:500,
    cursor:"pointer",
 display:"flex",
 alignItems:"center",
 lineHeight:0.9,
 flexDirection:"column",
 justifyContent:"center",
    margin:"0px 5px",
    color: varr.id==selected?Theme.primary:"grey",
    borderRadius:10,
    border:"2px solid grey " ,
    borderColor: varr.id==selected?Theme.primary:"grey",

}}>
 <span>
 {varr.icon}
    </span> 
   
    <span style={{
        fontSize:10,

    }}>{varr.nameEn}</span>
</div>

))}
    
</div>







</div>


















<div style={{
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    marginLeft:20,
    marginTop:15,
   justifyContent:"space-between",

    
}}>


<div style={{
    display:"flex",alignItems:"center",justifyContent:"center",
    fontSize:15,fontWeight:500,marginBottom:10

}}>

  

</div>


<div style={{
    display:"flex",alignItems:"center",justifyContent:"center"
}}>



{props.colors&&props.colors.map((color,index)=>(


<div
onClick={()=>{
    colorHanlder(color.id,color.colorCode);
}}
key={index} style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
<div style={{
 padding:"8", 
 fontSize:20,
 width:35,
 cursor:"pointer",

 height:35,
 fontWeight:500,
 backgroundColor:color.colorCode,
 margin:"0px 5px",
 borderRadius:100,
 border:"4px solid white",
 borderColor: color.id == selectedC?Theme.primary:"white",
}}> 
</div>
<span

style={{
    fontSize: color.id == selectedC?15:13,
    
    color: color.id == selectedC?Theme.primary:"grey",
}}
>{color.nameEn}</span>
 </div> 





))}

 


 




  






</div>







</div>













</div>




 
  )
}

export default OptionEL