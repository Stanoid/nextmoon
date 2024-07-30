"use client";
import Skeleton,{ SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import React, { useState, useEffect, useContext, useRef, useSear } from "react";
import { useRouter } from "next/navigation";
import { API_URL, ROOT_URL, CURRENCY, Theme,IMG_URL,DEF_IMG } from "../local";
import QuantEl from "../comps/quantel";
import {
  BsHeartFill,
  BsCartPlusFill,
  BsFillCartCheckFill,
} from "react-icons/bs";
import { Flip, Slide, toast, ToastContainer } from "react-toastify";
import { CartCon, CartContext } from "../contexts/cartContext";
import OptionEL from "../comps/optionEL";
import LoadingOverlay from '../comps/loadingOverlay';
import Head from "next/head";


const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


export default function Product({}) {
  const [db, setDb] = useState(null);
  const [price, setPrice] = useState();
  const [lod, setLod] = useState(true);
  const [selectedV, setSelectedV] = useState();
  const [pref, setPref] = useState();
  const [selectedC, setSelectedC] = useState();
  const [size, setSize] = useState();
  const [color, setColor] = useState();
  const [stock,setStock] = useState(0);
  const [qty,setQty]=useState(1);
  const [mimg,setmimg] = useState();
  const [imgs,setImgs]=useState([]);

  

  useEffect(() => {
  
    setmimg(0);
    //console.log(getQueryVariable("pid"));


    getFullProduct();


      // callback function to call when event triggers
      const onPageLoad = () => {
        console.log('page loaded');
       // setLod(true);
      };
  
      // Check if the page has already loaded
      if (document.readyState === 'complete') {
        onPageLoad();
      } else {
        window.addEventListener('load', onPageLoad, false);
        // Remove the event listener when component unmounts
        return () => window.removeEventListener('load', onPageLoad);
      }



      // for (let i = 0; i < product.data.length; i++) {
      //   if (product.data[i].id == getQueryVariable("pid")) {
      //     console.log("here:", product.data[i]);
        
  
        
  
      //   } else {
      //   }
      // }






  }, []);


  const varselectHandler = (vid,prodRef)=>{
setQty(1)
setSelectedV(vid);
setPref(prodRef)

const vrs = db.attributes.varients.data;

for (let i = 0; i < vrs.length; i++) {
 if(vrs[i].id==vid){
  setPrice(vrs[i].attributes.price);
  setStock(vrs[i].attributes.stock);
 }
  
}





  }



  const getFullProduct = ()=>{
        
    setLod(true);
    const requestOptions = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            // "Authorization": 'Bearer ' + ls.get("atkn")
        },
      
    };
  
      fetch(`${API_URL}products/${getQueryVariable("pid")}?func=getFullProduct`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          //console.log(data.data.attributes.varients.data[0].attributes.price)
          setImgs(JSON.parse(data.data.attributes.img));
          setPrice(data.data.attributes.varients.data[0].attributes.price);
          setStock(data.data.attributes.varients.data[0].attributes.stock);
          setSelectedV(data.data.attributes.varients.data[0].id);
          setPref(data.data.attributes.varients.data[0].attributes.product_ref)
          console.log(data.data.attributes.varients.data[0].attributes.product_ref)
          setSelectedC(data.data.attributes.varients.data[0].attributes.color.data.id);
          setSize(data.data.attributes.varients.data[0].attributes.size.data.id);
          setColor(data.data.attributes.varients.data[0].attributes.color.data.attributes.colorCode);
          setDb(data.data);
        }).then(()=>{
        setLod(false);
        console.log("aaaaa",imgs)
        });


}





  const { cartData, addToCart, addTofav, favData, useNotifi, removeFromFav } =
    useContext(CartCon);

  const HandleAddToCart = () => {
   console.log(pref)
      addToCart({ 
        data: db, 
        selvar: selectedV, 
        product_ref:pref,
        qty: qty, 
      });
   //   console.log("Product Has been added on empty cart: ", db.attributes.name_en);
      useNotifi("success", "تمت إضافة المنتج إلى السلة");
  
  };




  const handleimgselection = (index)=>{
    setmimg(index)
  }



  //legacy code.
  // const  ls = require('local-storage');
  // const router = useRouter();

  const HandleAddToFav = (id) => {
    if (favData.length == 0) {
      addTofav(db);
      console.log("Product Has been added on empty likes: ", db.nameEn);
      //useNotifi("success","Product has been added to Liked")
    } else {
      if (
        favData.find((obj) => obj.id === parseInt(getQueryVariable("pid"))) ==
        undefined
      ) {
        addTofav(db);
        console.log("Product Has been added: to liked ", db.nameEn);
        // useNotifi("success","Product has been added to Liked")
      } else {
        console.log("Product removed from liked:  ", db.nameEn);
        removeFromFav(db.id);
      }

      // const object = array.find(obj => obj.id === 3);

      // old cart handler (uncontrollable for loop)
      // for (let i = 0; i < cartData.length; i++) {
      //   if(cartData[i].id===parseInt(getQueryVariable("pid"))){
      //     console.log("Already trigger:",cartData[i].id,parseInt(getQueryVariable("pid")));
      //    return
      //   }else{
      //     console.log("added trigger:",cartData[i].id,parseInt(getQueryVariable("pid")));
      //     addToCart(db);

      //   }
      //   }
    }
  };

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

  return (
    
    <div  >
      <Head>
        {/* <title>{"Minimoon | " + db.attributes&&db.attributes.name_en} </title>
        <meta name="description" content={db.attributes.descriptionEn} /> */}
        <meta name="theme-color" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <ToastContainer  limit={3}/> */}

    {
  !lod? <div className="main " style={{ width: "100%", padding: "20px 10px" }}>
        

  <div
    className="flex-col lg:flex-row sm:flex-col md:flex-col "
    style={{
      width: "100%",
      display: "flex",

      justifyContent: "center",
      alignItems: "flex-start",
    }}
  >
    
    <div style={{ width: "100%",marginBottom:10 }} class="grid gap-4">
      <div>
        <img
        id="mimg"
         onError={()=>{document.getElementById("mimg").src=DEF_IMG}}
          class=" rounded-lg"
          src={ IMG_URL.concat(imgs[mimg]) }
          alt=""
        />
      </div>
      <div class="grid grid-cols-5 gap-4">
      {imgs&&imgs.length!=0?imgs.map((img,index)=>( 
        
          img?<div style={{cursor:"pointer",
        border:"3px solid white",
        borderRadius:10,
        borderColor: mimg==index?Theme.primary:"white",
        }} onClick={()=>{
           handleimgselection(index);
          }}>
          <img
          id={index}
            class="h-auto max-w-full rounded-lg"
            style={{width:"100%"}}
            onError={()=>{document.getElementById(index).src=DEF_IMG}}
            src={IMG_URL.concat(img)}
            alt=""
          />
        </div>:<></>
          
     
         )): <div></div>}
        
      </div>
      
    </div>

   
    <div
      style={{
        width: "100%",
        height: "100%",
        
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-end",
       padding:3,
       marginTop:5,
      }}
    >
      <div className=" w-full">
        <span
        onClick={()=>{console.log("aaaaaaaaa",imgs)}}
          style={{
            backgroundColor: Theme.secondary,
            color: "white",
            borderRadius: 20,
            padding: "7px 14px",
            fontSize: 15,
          }}
          class="px-2.5 py-0.5 text-xs   rounded-xl "
        >
        {db&&db.attributes.subcatagory.data.attributes.name_ar}
        
        </span>
        <div
          style={{
            display: "flex",
      alignItems:"center",
      justifyContent:"space-between",
           
           
          }}
        >


<div
              onClick={() => {
                HandleAddToFav();
              }}
              className="shadow-md"
              style={{
                color: "#FA5882",
                backgroundColor: "white",
                
                fontSize: 25,
                padding: "8px 12px",
                paddingTop: 9,
                paddingBottom: 7,
                borderRadius: 8,
               
              
              }}
            >
              <BsHeartFill />
            </div>

          <div>
            <h2
              style={{
                fontWeight: "bold",
                fontSize: 20,
                width:"100%",
                
                lineHeight: 1.3,
              }}
              className="max-w-xl mt-6 mb-6 t  text-right font-semibold leading-loose tracking-tight text-gray-700  "
            >
              {db&&db.attributes.name_ar}
            </h2>
          </div>

         
          
          </div>
        

      
        <p
          style={{
            display: "inline-block",
            fontWeight: "bold",
            textAlign:"right",
            fontSize: 25,
         
            width:"100%",
            color: "black",
          }}
          className="inline-block text-2xl font-semibold  "
        >
          <span> {CURRENCY} {price} </span> 
          <span
            style={{
              marginLeft: "0.5 rem",
              fontSize: "1 rem",
              lineHeight: "1.5 rem",
              fontWeight: 400,
              textDecorationLine: "line-through",
            }}
            className="ml-3 text-base font-normal text-gray-500 line-through dark:text-gray-400"
          >
            {price + 21} {CURRENCY}
          </span>
        </p>

        <p
          style={{ fontWeight: 400, fontSize: 15, lineHeight: 1.2 }}
          className="max-w-xl mt-6 mb-6 text-right  font-semibold leading-loose tracking-wide text-gray-900  dark:text-gray-800"
        >
          {db&&db.attributes.description_ar}
        </p>
      </div>

      <div
        className=""
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
          padding: 20,
        }}
      >
        <div className='bg-moonsec-100/10' style={{width:"100%",padding:"10px",borderRadius: "10px 10px 0px 0px",}}>
          <OptionEL varselect={(vid,prodRef)=>{varselectHandler(vid,prodRef)}} selid={selectedV} vars={db&&db.attributes.varients.data} />

    
               </div>


            

               <div
            
             className='bg-moon-100/50 py-4 pb-5'
            style={{
             
             
              color: "white",
           
              cursor: "pointer",
              display:"flex",
              alignItems:"center",
              width:"100%",
              justifyContent:"center",
              flexDirection:"column",
              
              borderRadius: "0px 0px 10px 10px",
            }}
          >
 


 <div >
 <QuantEl qty={qty} quantHandler={(q)=>{setQty(q)}} stock={stock}/>
 </div>

       

            <div
             className="shadow-lg shadow-moon-100/70 rounded-md px-6 py-2.5 mt-3 bg-moon-200 "
              onClick={() => {
                HandleAddToCart();
              }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
             
              <span> أضف إلى السلة  </span>
              <div
                style={{
                  color: "white",
                  fontSize: 23,
                  marginLeft: 8,
                }}
              >
                <BsCartPlusFill />
              </div>
            </div>
          </div>
            
              
      

        <div style={{ marginTop: 14, width: "100%" }}>
          <div
            className="flex-col lg:flex-co sm:flex-col md:flex-col"
            style={{

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >



          </div>
        </div>
      </div>
    </div>
  </div>
</div>
:<div  style={{ width: "100%",opacity:0.4, padding: "20px 10px" }}>
 
 <SkeletonTheme baseColor="white" highlightColor={Theme.primary}>
 
   <div className='px-2' >
   <Skeleton count={4} />
    </div> 

    <div className='flex mt-2 items-center justify-between w-full ' >
      
      <div className='mx-2 flex-grow ' >
        <Skeleton count={3} />
      </div>
  
   
    


    </div>


    <div className='mx-2 mt-2 flex-grow ' >
        <Skeleton count={3} />
      </div>
   
  </SkeletonTheme>



 
</div>

    }
    </div>
  );
}

