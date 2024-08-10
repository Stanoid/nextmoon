'use client'

import Product from "../comps/product";
import dynamic from "next/dynamic";
import { API_URL, Theme } from "../local";
import { useState,useRef,useEffect,useContext } from "react";

const Slider = dynamic(() => import("../comps/mainSlider"));
export default function Home() {
  const [lod,setLod]= useState(true)
  const [products,setProducts] = useState([])
  
  const [relatedproducts,setRelatedProducts] = useState([])


  
//   useEffect(() => {

//     //TODO: get products with category id and save it to products state

// // 
// const requestOptions = {
//   method: 'GET',
//   headers: {
//       "Content-Type": "application/json",
//       // "Authorization": 'Bearer ' + ls.get("atkn")
//   },

// };
// fetch(`${API_URL}products?func=getProductswithSubid&sid=${getQueryVariable("sid")}`, requestOptions)
//   .then((response) => response.json())
//   .then((data) => {
    
//    setProducts(data);
//    return data
//   }).then((datasub)=>{

//     //

//     const requestOptionssub = {
//       method: 'GET',
//       headers: {
//           "Content-Type": "application/json",
//           // "Authorization": 'Bearer ' + ls.get("atkn")
//       },
    
//     };
//     fetch(`${API_URL}subcatagories?func=getRelatedsubcats&cid=${datasub[0]&&datasub[0].subcatagory.catagory.id}&sid=${getQueryVariable("sid")} `, requestOptionssub)
//       .then((response) => response.json())
//       .then((data) => {
        
//     //setRelatedProducts(data);
//     let prodarray = [];

//     for (let i = 0; i < data.length; i++) {
    
//       for (let j = 0; j <  data[i].products.length; j++) {
        
//         prodarray.push(data[i].products[j]);
        
//       }
    
//     }
    
//     setRelatedProducts(prodarray);
   

   

//       }).then((prds)=>{
//          setLod(false)
//       })
  
//   })





  
    
//        }, [])

//TODO: move to a context
       function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split("=");
          if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
          }
        }
        
      }



    



  return (
  

<>

<div dir="rtl"  style={{
  
  display:lod?'flex':'none' ,
  justifyContent:"center", 
  alignItems:"center."
}}>
<div style={{zIndex:10,width:"100vw",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{justifyContent:"center",alignItems:"center"}} className="lds-facebook"><div></div><div></div><div></div></div>
      </div>
</div>
      
   
    <div className="space-y-2 px-1.5" dir="rtl" style={{ display:lod?'none':'flex' ,justifyContent:'center'
      ,alignItems:"flex-start",flexDirection:'column',marginTop:8,width:'100%'}}>
  
    <div style={{width:"100%",position:"relative"}} className='lg:col-span-2 xl:col-span-2 md:col-span-3 col-span-6  flex sm:flex lg:hidden '>
           <img width={"100%"} className='rounded-md'  src={"/offers/offer2.png"} />
           </div>

         

           <div style={{width:'100%',position:"relative"}} 
           className='lg:col-span-4 h-min xl:col-span-4 md:col-span-3 col-span-6 flex sm:flex lg:hidden md:hidden xl:hidden'>
           <Slider  slides={[
            '/offers/offermob8.png',
            '/offers/offermob9.png',
            '/offers/offermob7.png',
            '/offers/offermob6.png',
            '/offers/offermob5.png',
            '/offers/offermob4.png',
            '/offers/offermob3.png',
            '/offers/offermob2.png',
            '/offers/offermob1.png',
           ]} />
            {/* <Slider  slides={[
            '/offers/ban1.png',
            '/offers/ban2.png',
            '/offers/ban3.png',
        
           ]} /> */}
           </div>

           <div style={{width:'100%',position:"relative"}} 
           className='lg:col-span-4 h-min xl:col-span-4 md:col-span-3 col-span-6 hidden sm:hidden lg:flex md:flex xl:flex'>

           <Slider  slides={[
            
            '/offers/offer1.png',
            '/offers/offer2.png',
            '/offers/offer3.png',
            '/offers/offer4.png',
            '/offers/offer5.png',
            '/offers/offer6.png',
            '/offers/offer7.png' ]} />
          
           </div>


<div className="p-4" style={{
  fontSize:25,
  fontWeight:"bold",
  color:Theme.primary,
  borderBottom:"3px solid "+Theme.primary,
}}>
  {products[0]&&products[0].subcatagory.name_ar} :
</div>



<div >
    
    <div className='grid  lg:gap-x-4 lg:gap-y-6 xl:gap-x-4 xl:gap-y-6 md:gap-x-4 md:gap-y-4 gap-x-4 gap-y-4 p-4 xl:grid-cols-6 md:grid-cols-4 grid-cols-2  '
     style={{width:'100%'}}>
    
    {products&&products.map(product=>(
 product.status?     
<div  key={product.id}>
<Product data={product} />
</div>:<></>
))}
    
  



  </div>
  
  </div>



  <div className="p-4" style={{
  fontSize:25,
  fontWeight:"bold",
  color:Theme.primary,
  borderBottom:"3px solid "+Theme.primary,
}}>
  
{"منتجات ذات صلة"} :
</div>


<div >
    
    <div className="p-4">

    
    <div className='grid 
     lg:gap-x-4
     lg:gap-y-6
     xl:gap-x-4 
     xl:gap-y-6
      md:gap-x-4
     md:gap-y-4
      gap-x-4
       gap-y-4
     p-4 

     xl:grid-cols-6
      md:grid-cols-4 
      grid-cols-2  '
     style={{width:'100%'}}>

{relatedproducts&&relatedproducts.map(product=>(

<div  key={product.id}>
<Product data={product} />
</div>

))}
</div>

  </div>
  
  </div>


<div>

</div>


<br/><br/><br/><br/>



  </div>

  </>
 
  );
}
