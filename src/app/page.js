'use client'

import Image from "next/image";
import Product from "./comps/product";
import Hero from "./comps/hero";
import { API_URL ,Theme} from "./local";
import { useState,useRef,useEffect,useContext } from "react";
import FeatProduct from "./comps/featuredProducts";
import { AuthCon } from "./contexts/AuthCon";
import Skeleton,{ SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import FeaturedComp from "./comps/featured";
import Cart from "./comps/cart";
import PromoComp from "./comps/promo";
import { product } from "./comps/productdata";
export default function Home() {
  const [openCart,setOpenCart] = useState(false);
  const childCompRef = useRef()
  const {loginval}  = useContext(AuthCon);
  const [products,setProducts] = useState()
  const [lod,setLod] = useState(true);

  
  useEffect(() => {
   

    getAllProducts();
    
       }, [])



       const getAllProducts = ()=>{
        setLod(true);
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
           setLod(false)
          
           
            }).then(()=>{
              setLod(false)
            })
    
    
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
<div style={{width:"100%"}}>
<Hero  />
  </div> 
<div  style={{width:"90%",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>

 <div style={{marginTop:15,display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%"}}>
  <PromoComp/>
  <PromoComp/>
  <PromoComp/>

  </div> 
</div>


<div style={{width:"90%"}}>
  <FeaturedComp/>
</div>

{
  !lod?<div >
    
  <div className='grid  lg:gap-x-4 lg:gap-y-6 xl:gap-x-4 xl:gap-y-6 md:gap-x-4 md:gap-y-4 gap-x-2 gap-y-4 p-2 
  xl:grid-cols-8
   md:grid-cols-4 
   grid-cols-2  '
   style={{width:'100%'}}>
  
  {products&&products.map(product=>(
product.status?     
<div  key={product.id}>
<Product atcbtn={false} data={product} />
</div>:<></>
))}
  




</div>
<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
</div>:<div  style={{ width: "100%", padding: "20px 10px" }}>
 
 <SkeletonTheme baseColor="white" highlightColor={Theme.primary}>
 
      <Skeleton count={3} />
   
  </SkeletonTheme>

 
</div>
}
    
  </div>
 
  );
}
