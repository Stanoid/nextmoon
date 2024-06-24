'use client'

import Image from "next/image";
import Product from "../comps/product";
import Hero from "../comps/hero";
import { API_URL, Theme } from "../local";
import { useState,useRef,useEffect,useContext } from "react";

import Cart from "../comps/cart";

import { product } from "../comps/productdata";
import { data } from "autoprefixer";
export default function Home() {
  const [openCart,setnhbpenCart] = useState(false);
  const childCompRef = useRef()
  const [lod,setLod]= useState(true)
  const [products,setProducts] = useState([])
  
  const [relatedproducts,setRelatedProducts] = useState([])


  
  useEffect(() => {

    //TODO: get products with category id and save it to products state

// console.log(getQueryVariable("sid"))
const requestOptions = {
  method: 'GET',
  headers: {
      "Content-Type": "application/json",
      // "Authorization": 'Bearer ' + ls.get("atkn")
  },

};
fetch(`${API_URL}products?func=getProductswithSubid&sid=${getQueryVariable("sid")}`, requestOptions)
  .then((response) => response.json())
  .then((data) => {
    console.log("suuuuuuuuuub data ", data);
   setProducts(data);
   return data
  }).then((datasub)=>{

    //console.log("then data ", datasub[0].subcatagory.catagory.id);

    const requestOptionssub = {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
          // "Authorization": 'Bearer ' + ls.get("atkn")
      },
    
    };
    fetch(`${API_URL}subcatagories?func=getRelatedsubcats&cid=${datasub[0]&&datasub[0].subcatagory.catagory.id}&sid=${getQueryVariable("sid")} `, requestOptionssub)
      .then((response) => response.json())
      .then((data) => {
        console.log("related produccts data ", data);
    //setRelatedProducts(data);
    let prodarray = [];

    for (let i = 0; i < data.length; i++) {
    
      for (let j = 0; j <  data[i].products.length; j++) {
        
        prodarray.push(data[i].products[j]);
        
      }
    
    }
    console.log("all products",prodarray);
    setRelatedProducts(prodarray);
   

   

      }).then((prds)=>{
         setLod(false)
      })
  
  })





  
    
       }, [])

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
        console.log("Query variable %s not found", variable);
      }

  const handleOpenCart =(open)=>{
    setOpenCart(open)

 
    
    
        }


    



  return (
  

<>

<div style={{
  display:lod?'flex':'none' ,
  justifyContent:"center", 
  alignItems:"center."
}}>
<div style={{zIndex:10,width:"100vw",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{justifyContent:"center",alignItems:"center"}} className="lds-facebook"><div></div><div></div><div></div></div>
      </div>
</div>
      
   
    <div style={{ display:lod?'none':'flex' ,justifyContent:'center',alignItems:"flex-start",flexDirection:'column',marginTop:10,width:'100%'}}>

<div className="p-4" style={{
  fontSize:25,
  fontWeight:"bold",
  color:Theme.primary,
  borderBottom:"3px solid "+Theme.primary,
}}>
  {products[0]&&products[0].subcatagory.name_en} :
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
   Related Products :
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
