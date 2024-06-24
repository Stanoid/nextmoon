'use client'

import Image from "next/image";
import Product from "../comps/product";
import Hero from "../comps/hero";
import { API_URL } from "../local";
import { useState,useRef,useEffect,useContext } from "react";

import Cart from "../comps/cart";

import { product } from "../comps/productdata";
export default function Home() {
  const [openCart,setOpenCart] = useState(false);
  const childCompRef = useRef()

  const [products,setProducts] = useState(product.data)

  
  useEffect(() => {

    //TODO: get products with category id and save it to products state

//console.log(getQueryVariable("cid"))




  
    
       }, [])

//TODO: move to a context
      //  function getQueryVariable(variable) {
      //   var query = window.location.search.substring(1);
      //   var vars = query.split("&");
      //   for (var i = 0; i < vars.length; i++) {
      //     var pair = vars[i].split("=");
      //     if (decodeURIComponent(pair[0]) == variable) {
      //       return decodeURIComponent(pair[1]);
      //     }
      //   }
      //   console.log("Query variable %s not found", variable);
      // }

  const handleOpenCart =(open)=>{
    setOpenCart(open)

 
    
    
        }


    



  return (
  

<></>
      
   
//     <div style={{display:'flex',justifyContent:'center',alignItems:"center",flexDirection:'column',marginTop:10,width:'100%'}}>

//  {/* <Cart ref={childCompRef}   openHandler={handleOpenCart} open={openCart} /> */}

// <div style={{display:"flex",width:"100%",padding:10}}> 



// </div>

//     <div >
    
//     <div     className='grid  lg:gap-x-4 lg:gap-y-6 xl:gap-x-4 xl:gap-y-6 md:gap-x-4 md:gap-y-4 gap-x-4 gap-y-4 p-4 xl:grid-cols-6 md:grid-cols-4 grid-cols-2  ' style={{width:'100%'}}>
    
//     {products&&products.map(product=>(

// <div  key={product.id}>

// <Product data={product} />

// </div>
// ))}
    
  



//   </div>
//   <br/><br/><br/><br/>
//   </div>
//   </div>
 
  );
}
