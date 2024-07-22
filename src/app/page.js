'use client'

import Image from "next/image";
import ProductCopm from "./comps/product";
import Hero from "./comps/hero";
import { API_URL ,Theme} from "./local";

import { useState,useRef,useEffect,useContext,useMemo,useCallback } from "react";
import FeatProduct from "./comps/featuredProducts";
import { AuthCon } from "./contexts/AuthCon";
import Skeleton,{ SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import FeaturedComp from "./comps/featured";
import AnimateOnViewEnter from "./comps/AnimateOnViewEnter"
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
      
      
              console.log("data22233",data)
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
        console.log(productso.data);
        setProducts(productso.data)

      }




  return (
  


      
   
    <div style={{display:'flex',justifyContent:'center',alignItems:"center",flexDirection:'column', width:'100%'}}>
 {lod?<LoadingOverlay/>:<></>} 
 <Cart ref={childCompRef}   openHandler={handleOpenCart} open={openCart} />
<div style={{width:"100%"}}>
<Hero  />
  </div> 
  <div  className="bg-moon-100 flex justify-center "   >

<div className="w-full lg:w-3/4 " >
<FeaturedComp/>
</div>

</div>

<div  style={{width:"90%",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>

 <div className="flex-col md:flex-row lg:flex-row sm:flex-col" style={{marginTop:15,display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%"}}>
 
 <div className="flex flex-col sm:flex-col align-middle justify-center" >







 </div>


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


    <div class="    p-8 px8 lg:px-64 w-full bg-gradient-to-r from-moonsec-100 to-moonsec-100/75  text-right lg:py-16">
      <div className="min-w-fit" >
      <h1 class="mb-4 text-3xl font-semibold tracking-tight  leading-tight text-white md:text-5xl lg:text-4xl ">
      ولما كان تناسي حقوق الإنسان وازدراؤها قد أفضيا إلى أعمال همجية</h1>
        <p class="text-lg text-center  break-words font-medium text-moon-300/70 lg:text-xl  ">
              لمّا كان الاعتراف بالكرامة المتأصلة في جميع
        </p>
      </div>
     
       
    </div>

</div>:<div  style={{ width: "100%", padding: "20px 10px" }}>
 
 <SkeletonTheme baseColor="white" highlightColor={Theme.primary}>
 
      <Skeleton count={3} />
   
  </SkeletonTheme>

 
</div>
}
    
  </div>
 
  );
}
