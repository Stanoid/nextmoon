'use client'

import Image from "next/image";
import Product from "./comps/product";
import Hero from "./comps/hero";
import { API_URL } from "./local";
import { useState,useRef,useEffect,useContext } from "react";
import FeatProduct from "./comps/featuredProducts";
import { AuthCon } from "./contexts/AuthCon";

import Cart from "./comps/cart";

import { product } from "./comps/productdata";
export default function Home() {
  const [openCart,setOpenCart] = useState(false);
  const childCompRef = useRef()
  const {loginval}  = useContext(AuthCon);
  const [products,setProducts] = useState()

  
  useEffect(() => {
   

    getAllProducts();
    
       }, [])



       const getAllProducts = ()=>{
        
        const requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                // "Authorization": 'Bearer ' + ls.get("atkn")
            },
          
        };
      
          fetch(`${API_URL}products?func=getAllProducts`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
      
      
              console.log("data22233",data)
           setProducts(data)
          
           
            });
    
    
    }



  const handleOpenCart =(open)=>{
    setOpenCart(open)

 
    
    
        }


        async function getProducts(){
        const responseprod = await fetch(`${API_URL}/item/all`);
        const productso = await  responseprod.json();
        console.log(productso.data);
        setProducts(productso.data)

      }




  return (
  


      
   
    <div style={{display:'flex',justifyContent:'center',alignItems:"center",flexDirection:'column',marginTop:10,width:'100%'}}>

 <Cart ref={childCompRef}   openHandler={handleOpenCart} open={openCart} />

<div  style={{width:"100%"}}>
  <Hero  />
</div>


    <div >
    
    <div className='grid  lg:gap-x-4 lg:gap-y-6 xl:gap-x-4 xl:gap-y-6 md:gap-x-4 md:gap-y-4 gap-x-4 gap-y-4 p-4 xl:grid-cols-6 md:grid-cols-4 grid-cols-2  '
     style={{width:'100%'}}>
    
    {products&&products.map(product=>(

<div  key={product.id}>

<Product data={product} />

</div>
))}
    
  



  </div>
  <br/><br/><br/><br/>
  </div>
  </div>
 
  );
}
