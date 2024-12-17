'use client'

import Product from "../comps/product";
import dynamic from "next/dynamic";
import { API_URL, Theme,IMG_URL } from "../local";
import { useState,useRef,useEffect,useContext } from "react";
import { useRouter } from "next/navigation";
import { FaSlack } from "react-icons/fa6";
import ProductCopm from "../comps/product";
import Image from "next/image";
import HorDiv from "../comps/hordiv";
const Slider = dynamic(() => import("../comps/mainSlider"));
export default function Home() {
  const [lod,setLod]= useState(true)
  const [products,setProducts] = useState([])
const router = useRouter();
  const [relatedproducts,setRelatedProducts] = useState([])


  
  useEffect(() => {


   getCatProducts()
  
    
       },[])

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



    const getCatProducts = ()=>{



       
const requestOptions = {
  method: 'GET',
  headers: {
      "Content-Type": "application/json",
      // "Authorization": 'Bearer ' + ls.get("atkn")
  },

};
fetch(`${API_URL}products?func=getProductswithCatid&cid=${getQueryVariable("cid")}`, requestOptions)
  .then((response) => response.json())
  .then((data) => {
    
    console.log(data)
   setProducts(data);
  setLod(false)
  }).then(()=>{

    
  
  })






    }

    



  return (
  

<>

<div className=""   style={{
  
  display:lod?'flex':'none' ,
  justifyContent:"center", 
  alignItems:"center."
}}>
<div style={{zIndex:10,width:"100vw",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{justifyContent:"center",alignItems:"center"}} className="lds-facebook"><div></div><div></div><div></div></div>
      </div>
</div>
      
   
    <div className="space-y-2 px-0 sm:px-0  whitespace-nowrap  " dir="ltr" style={{ display:lod?'none':'flex' ,justifyContent:'center'
      ,alignItems:"center",flexDirection:'column',marginTop:8,width:'100%'}}>
  
  
  <div  className="w-full py-2  mt-12 overflow-x-hidden flex items-center justify-center ">

  {products&&products.map(prd=>(

<div onClick={()=>{router.push(`/subcatagories?sid=${prd.id}`)}} className="shadow-md min-w-28 w-28 lg:w-40 lg:min-w-40 mx-1.5 sm:mx-1.5 lg:m-2
 rounded-sm hover:scale-105  hover:shadow-medium cursor-pointer  transition-all " > 



<div className='w-28 h-28  lg:w-40 lg:h-40  relative ' >
       
      
       <Image quality={20} objectFit="cover" className="rounded-md rounded-b-none" fill 
        src={"https://res.cloudinary.com/strapimedia/image/upload/v1728387477/minimoon_assets/g2lsfkim9mi7dwc1ofxs.jpg"} />
      
         </div>

<div className="py-2 w-28 sm:w-28  lg:w-40  flex items-center rounded-b-md justify-center text-sm  ">
  {prd.name_ar}
</div>
   </div>

))}


  </div>

<div >
    
    <div className='flex mt-8 flex-col justify-center items-center  '
     style={{width:'100%'}}>
    
    {products&&products.map((sub,index)=>(

<div className="w-full  px-0 sm:px-0 ">
<div className="my-2 px-2 text-right text-moon-300 font-bold text-xl " >
: {sub.name_ar}
</div>

{index%2==0?<div className=" px-0 sm:px-0 lg:px-2  grid w-full lg:gap-x-1 lg:gap-y-2 xl:gap-x-2 xl:gap-y-2
 md:gap-x-4
 md:gap-y-4 
gap-x-0
 gap-y-0 my-6
  xl:grid-cols-6
  lg:grid-cols-6
   md:grid-cols-4 
   grid-cols-2  "   >
  {sub.products&&sub.products.map(prd=>(
prd.status?  
<div className="   "  key={prd.id}>
<ProductCopm atcbtn={false} data={prd} />
</div>
:<></>
))}
  
</div>:<div className="w-full"> <HorDiv cid={sub.id} data={sub.products} /> </div>}




  
  
  
  </div>

))}
    
  



  </div>
  
  </div>



<div >
    
 
  
  </div>


<div>

</div>


<br/><br/><br/><br/>



  </div>

  </>
 
  );
}
