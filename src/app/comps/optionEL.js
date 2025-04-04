import {React,useEffect,useState,useContext} from 'react'
import { CURRENCY, Theme } from '../local'
import { color, motion } from 'framer-motion'
import { CartCon } from '../contexts/cartContext';
import { Divider } from '@nextui-org/react';




function OptionEL(props) {

const [refr,setRefr] = useState(true);
const [sizes,setSizes] = useState(null);
const [colors,setColors]=useState(null);
const [sizeId,setSizeId] = useState(null)
const { useNotifi } =
    useContext(CartCon);


    useEffect(() => {
      

    
   
       var size = []
       var sizeob=[]
       var colors = [];

       props.vars.forEach(element => {
      

       colors.push({sizeid:element.attributes.sizes.data[0].id,varid:element.id,color:element.attributes.colors.data[0],qty:element.attributes.stock});
        if(size.includes(element.attributes.sizes.data[0].id)){
       
        }else{
            size.push(element.attributes.sizes.data[0].id);
            sizeob.push(element.attributes.sizes.data[0]);
            
        }
      //  console.log("aaaa",)
     });

     console.log("all colors",props.vars[0]);

     console.log(sizeob)
     setSizes(sizeob);
     setSizeId(sizeob[0].id)
     setColors(colors)
//handlesizeselect();

      
    }, [refr])
    
const handlesizeselect = (size)=>{


    console.log(colors)

        setSizeId(size)
        colors.forEach(element => {
            if(size==element.sizeid){
                console.log(element)
                props.varselect(element.varid);
            }
            
        });
   

 



}


const varDisplay = ()=>{

    for (let i = 0; i < props.vars.length; i++) {
        if(props.vars[i].id == props.vari){
            return <div  className=' space-y-2 flex font-bold whitespace-nowrap justify-around 
             p-4 border-0  border-moon-200 rounded-md items-center  ' >
            

              <div className='flex items-center space-x-3'>
              <div>{props.vars[i].attributes.colors.data[0].attributes.name_ar}</div>
               <div style={{backgroundColor:props.vars[i].attributes.colors.data[0].attributes.colorCode}} className='w-8 h-8 rounded-full' ></div>
              </div>
             <div className='flex flex-col' >
            
             <div className='flex items-center space-x-3 '>
              <div>{props.vars[i].attributes.sizes.data[0].attributes.name_ar}</div>  
               <div> ({props.vars[i].attributes.sizes.data[0].attributes.icon}) </div> 
              </div>



              <div dir='rtl' className='flex items-center  space-x-3 '>
              <div>{props.vars[i].attributes.price} {CURRENCY} </div>  
            
              </div>
             </div>
           
            </div>
          }
        
    }

    // props.vars.forEach(vari => {
    //     if(vari.id == props.vari){
    //       return vari.id
    //     }
    // });


}


  return (

<div className='flex flex-col justify-between items-start space-y-3' >


<div className='w-full'>

    {varDisplay()}
    
</div>


<Divider  />


<div className='space-y-3 w-full' >

    
    <div 
className=' '
    style={{
        width:"100%",
        
        display:"flex",

        justifyContent:"flex-end",
        alignItems:"center"
    }}>








<div className='flex flex-wrap justify-start'>
{sizes&&sizes.map(vari=>(

<div onClick={()=>{handlesizeselect(vari.id)}} key={vari.id} 
className={`${sizeId==vari.id?'shadow-md':'shadow-none'} border-4  cursor-pointer mt-2 mr-2 px-2 transition-all py-2 rounded-md`}
 style={{borderColor: sizeId==vari.id?Theme.primary : "grey" , 
    backgroundColor: sizeId==vari.id?Theme.primary : "white" , 
 display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
<div style={{fontWeight:"bold",padding:"3px 4px"}}>
{vari.attributes.icon} <span> </span>
</div>
</div>
))}
</div>




<div 
  className=' transition-colors flex-row lg:flex-row
  md:flex-col sm:flex-row  ' style={{padding:"10px 10px",color:"black"
,borderRadius:5,margin:7,
display:"flex",justifyContent:"center",alignItems:"center"
}}   >

<div onClick={()=>{setRefr(!refr)}} style={{display:"flex",whiteSpace:'nowrap',alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
<div style={{fontWeight:"bold",padding:"3px 4px"}}>
{": المقاس"} <span> </span>
</div>
</div>
</div>
 </div> 




 <Divider className='w-full' />

 <div 
className=''
    style={{
        width:"100%",
        
        display:"flex",

        justifyContent:"flex-end",
        alignItems:"center"
    }}>







<div className='flex flex-wrap justify-end w-full  space-x-3  '>



{colors&&colors.map(color=>(

color.sizeid==sizeId?<div style={{opacity:color.qty<=0?0.3:1}}  className='flex  flex-col justify-center items-center space-y-1' >
<div key={color.varid} onClick={()=>{color.qty<=0?  useNotifi("error","نفذت الكمية من هذا الخيار") :props.varselect(color.varid) }}
 className={`${props.vari==color.varid?'shadow-lg':'shadow-none'} rounded-full transition-all cursor-pointer border-4 `} 
 style={{ borderColor: props.vari==color.varid? Theme.primary: "white" , display:"flex"
 ,alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
<div style={{backgroundColor:color.color.attributes.colorCode}} className='w-9 h-9   rounded-full'>
</div>
</div>
<div 
style={{   
  color: props.vari==color.varid? Theme.primary: Theme.primaryDark ,
}}
className='font-semibold  text-xs whitespace-nowrap' >
    {color.color.attributes.name_ar}
</div>
</div>:<></>



))}


</div>



<div 
  className=' transition-colors flex-row lg:flex-row
  md:flex-col sm:flex-row   ' style={{padding:"10px 10px",color:"black"
,borderRadius:5,margin:7,
display:"flex",justifyContent:"flex-end",alignItems:"center"
}}   >
<div style={{display:"flex",alignItems:"center",whiteSpace:"nowrap",justifyContent:"flex-end",flexDirection:"row"}}>
<div style={{fontWeight:"bold",padding:"3px 4px"}}>
{": اللون"} <span> </span>
</div>
</div>
</div>
 </div> 
 </div>
 </div>
  )
}

export default OptionEL