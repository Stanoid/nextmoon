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


  
  useEffect(() => {

    //TODO: get products with category id and save it to products state

    getSubcatProducts();

  
    
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
        
      }


      const getSubcatProducts = ()=>{
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
            
           setProducts(data);
           return data
          }).then((datasub)=>{
        
            //
        
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
                
            //setRelatedProducts(data);
            let prodarray = [];
        
            for (let i = 0; i < data.length; i++) {
            
              for (let j = 0; j <  data[i].products.length; j++) {
                
                prodarray.push(data[i].products[j]);
                
              }
            
            }
            
            setRelatedProducts(prodarray);
           
        
           
        
              }).then((prds)=>{
                 setLod(false)
              })
          
          })
        
        
        
        
        
      }


      



  return (
  

<>

<div dir="rtl" style={{
  
  display:lod?'flex':'none' ,
  justifyContent:"center", 
  alignItems:"center."
}}>
<div style={{zIndex:10,width:"100vw",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{justifyContent:"center",alignItems:"center"}} className="lds-facebook"><div></div><div></div><div></div></div>
      </div>
</div>
      
   
    <div className="space-y-2 px-0 sm:px-0 lg:px-10" dir="rtl" style={{ display:lod?'none':'flex' ,justifyContent:'center'
      ,alignItems:"flex-start",flexDirection:'column',marginTop:8,width:'100%'}}>


        

<div className="my-2 mt-16 lg:m-8 px-2 text-right text-moon-300 font-bold text-xl " >
  {products[0]&&products[0].subcatagory.name_ar} :
</div>



<div >
    
    <div className='grid  lg:gap-x-4 lg:gap-y-4
     xl:gap-x-4 xl:gap-y-6 md:gap-x-2 md:gap-y-2 gap-x-0 gap-y-0  xl:grid-cols-6 md:grid-cols-4 grid-cols-2  '
     style={{width:'100%'}}>
    
    {products&&products.map(product=>(
 product.status?     
<div  key={product.id}>
<Product data={product} />
</div>:<></>
))}
    
  



  </div>
  
  </div>





<div >
    


<div className="  lg:m-8 px-2 py-2 text-right text-moon-300 font-bold text-xl " >
{"منتجات ذات صلة"} :
</div>

    <div className="">

    
    <div className='grid 
     lg:gap-x-4
     lg:gap-y-4
     xl:gap-x-4 
     xl:gap-y-4
      md:gap-x-2
     md:gap-y-2
      gap-x-0
       gap-y-0
     

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
