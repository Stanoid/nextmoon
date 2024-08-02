'use client'

import Image from "next/image";
import ProductCopm from "./comps/product";
import dynamic from "next/dynamic";
const Hero = dynamic(() => import('./comps/hero'))


import { API_URL ,Theme} from "./local";
import { useState,useRef,useEffect,useContext,useMemo,useCallback } from "react";
import FeatProduct from "./comps/featuredProducts";
import { AuthCon } from "./contexts/AuthCon";
import Skeleton,{ SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import FeaturedComp from "./comps/featured";
import SwipeEl from "./comps/swipe"
import AnimateOnViewEnter from "./comps/AnimateOnViewEnter"
import HorDiv from "./comps/hordiv"
import LoadingOverlay from "./comps/loadingOverlay";
import Cart from "./comps/cart";
import PromoComp from "./comps/promo";
import { product } from "./comps/productdata";
export default function Home() {
  const [openCart,setOpenCart] = useState(false);
  const childCompRef = useRef()
  const {loginval}  = useContext(AuthCon);
  const [products,setProducts] = useState()
  const [lod,setLod] = useState(true);
  //const calculation = useMemo(() =>  getAllProducts(), []);
  
  useEffect(() => {
   
setLod(false)
  getAllProducts();
  //  calculation;
    
       }, [])



       const getAllProducts = useCallback(()=>{
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
      
        
              
           setProducts(data)
           setLod(false)
             
           
            }).then(()=>{
              setLod(false)
            })
    
    
    },[])



  const handleOpenCart =(open)=>{
    setOpenCart(open)

 
    
    
        }


        async function getProducts(){
        const responseprod = await fetch(`${API_URL}/item/all`);
        const productso = await  responseprod.json();
        
        setProducts(productso.data)

      }




  return (
  


      
   
    <div style={{display:'flex',justifyContent:'center',alignItems:"center",flexDirection:'column', width:'100%'}}>
 {lod?<LoadingOverlay/>:<></>} 
 <Cart ref={childCompRef}   openHandler={handleOpenCart} open={openCart} />
<div className="bg-gradient-to-t to-moon-100/30 from-moon-100/50 " style={{width:"100%"}}>
<Hero  />
  </div> 
  <div  className="bg-gradient-to-t from-moon-100 to-moon-100/50 flex w-full  justify-center "   >

<div className="w-full lg:w-3/4 " >
<FeaturedComp/>
</div>

</div>







{
  !lod?<div  className="p-0 m-0">
    
 
<div className="  grid  lg:gap-x-1 lg:gap-y-2 xl:gap-x-2 xl:gap-y-2 md:gap-x-4 md:gap-y-4 gap-x-0 gap-y-0 my-6
  xl:grid-cols-6
   md:grid-cols-4 
   grid-cols-2  " style={{width:"100vw"}}>


  {products&&products.map(product=>(
product.status?  

<div className="   "  key={product.id}>
<ProductCopm atcbtn={false} data={product} />
</div>
:<></>
))}
  


</div>


 {/* <div className="flex w-full  align-middle justify-center">
 <PromoComp/>
 </div>
  */}


   

</div>:<div  style={{ width: "100%", padding: "20px 10px" }}>
 
 <SkeletonTheme baseColor="white" highlightColor={Theme.primary}>
 
      <Skeleton count={3} />
   
  </SkeletonTheme>

 
</div>
}

<div className="w-full flex flex-col align-middle h-fit justify-center bg-gradient-to-b from-moonsec-100/90 to-moonsec-100/30 py-4">
<div className="p-6">
<h5 className="text-2xl font-black text-right tracking-normal text-white ">عروض سريعة</h5>
<p className="text-right py-1 font-semibold tracking-tight leading-tight text-moon-300/65 ">
تخفيضات تصل إلى 50% على مختلف الفئات و لفترة محدودة
</p>
</div>
<div  className="flex w-full align-middle mt-1 justify-center" > 
<SwipeEl w={350} h={200}  />
</div>

</div>



<div className="bg-gradient-to-b to-moonsec-200/20 from-moonsec-100/30 py-6">
  <div className="p-4 ">
  <h5 className="text-2xl font-black text-right tracking-normal text-moon-300/80 mt-2 ">: بلوزات طويلة</h5>
  <p className="text-right py-1 font-semibold tracking-tight leading-tight text-moon-300/60 ">
تخفيضات تصل إلى 50% على مختلف الفئات و لفترة محدودة
</p>
  </div>

   <HorDiv data={product&&products} />
</div>


<div className="bg-gradient-to-b from-moonsec-200/20 to-moon-200/20 py-6">
  <div className="p-6">
  <h5 className="text-2xl font-black text-right tracking-normal text-moon-300/80 mt-2 ">:  تيشيرتات</h5>
  <p className="text-right py-1 font-semibold tracking-tight leading-tight text-moon-300/60 ">
تخفيضات تصل إلى 50% على مختلف الفئات و لفترة محدودة
</p>
  </div>

   <HorDiv data={product&&products} />
</div>

{/* <div className="p-2 px-2 sm:px-3 lg:px-80 bg-gradient-to-b to-moonsec-200/30 from-moon-200/20 py-6 ">
<div style={{width:"100%",position:"relative"}} className='lg:col-span-4   h-56  xl:col-span-4 md:col-span-6 col-span-6'>
<Image 
style={{width:"100%"}}
           quality={25} layout='fill'
  objectFit='cover' className='rounded-md'  src={"/offers/offer2.png"} />
           </div>

</div> */}
  

<div className="bg-gradient-to-b from-moon-200/20 to-moonsec-100/30 py-6">
  <div className="p-6">
  <h5 className="text-2xl font-black text-right tracking-normal text-moon-300/80 mt-2 ">:  فساتين سهرة</h5>
  <p className="text-right py-1 font-semibold tracking-tight leading-tight text-moon-300/60 ">
تخفيضات تصل إلى 50% على مختلف الفئات و لفترة محدودة
</p>
  </div>

   <HorDiv data={product&&products} />
</div>
    
  </div>
 
  );
}
