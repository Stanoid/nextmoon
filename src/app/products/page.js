"use client";
import Skeleton,{ SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import React, { useState, useEffect, useContext, useRef, useSear } from "react";
import { useRouter } from "next/navigation";
import { API_URL, ROOT_URL, CURRENCY, Theme,IMG_URL,DEF_IMG } from "../local";
import QuantEl from "../comps/quantel";
import RootLayout from "@/app/layout";
import {
  BsHeartFill,
  BsCartPlusFill,
  BsFillCartCheckFill,
} from "react-icons/bs";
import { Flip, Slide, toast, ToastContainer } from "react-toastify";
import { CartCon, CartContext } from "@/app/contexts/cartContext";
import OptionEL from "@/app/comps/optionEL";
import Head from "next/head";
import { product } from "@/app/comps/productdata";

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product({}) {
  const [db, setDb] = useState(null);
  const [price, setPrice] = useState();
  const [lod, setLod] = useState(true);
  const [selectedV, setSelectedV] = useState();
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



      for (let i = 0; i < product.data.length; i++) {
        if (product.data[i].id == getQueryVariable("pid")) {
          console.log("here:", product.data[i]);
        
  
        
  
        } else {
        }
      }






  }, []);


  const varselectHandler = (vid)=>{
setQty(1)
setSelectedV(vid);

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
   
      addToCart({ 
        data: db, 
        selvar: selectedV, 
        qty: qty, 
      });
      console.log("Product Has been added on empty cart: ", db.attributes.name_en);
      useNotifi("success", "Product has been added to cart");
  
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
    
    <div>
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
          class="h-auto max-w-full rounded-lg"
          src={ IMG_URL.concat(imgs[mimg]) }
          alt=""
        />
      </div>
      <div class="grid grid-cols-5 gap-4">
      {imgs&&imgs.length!=0?imgs.map((img,index)=>( 
          <div style={{cursor:"pointer",
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
        </div>
          
     
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
        alignItems: "flex-start",
       padding:20
      }}
    >
      <div className=" ">
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
          New Arrival
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h2
              style={{
                fontWeight: "bold",
                fontSize: 20,
                lineHeight: 1.3,
              }}
              className="max-w-xl mt-6 mb-6  font-semibold leading-loose tracking-wide text-gray-700  "
            >
              {db&&db.attributes.name_en}
            </h2>
          </div>

          <div>
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
                marginLeft: 5,
              }}
            >
              <BsHeartFill />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center mb-6">
          {/* old sellers info div */}
        </div>
        <p
          style={{
            display: "inline-block",
            fontWeight: "bold",
            fontSize: 25,
            color: "black",
          }}
          className="inline-block text-2xl font-semibold  "
        >
          <span>{price}</span> {CURRENCY}
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
          className="max-w-xl mt-6 mb-6  font-semibold leading-loose tracking-wide text-gray-900  dark:text-gray-800"
        >
          {db&&db.attributes.description_en}
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
        <div style={{width:"100%",padding:"10px",backgroundColor:"#FAFAFA",borderRadius: "10px 10px 0px 0px",}}>
          <OptionEL varselect={(vid)=>{varselectHandler(vid)}} selid={selectedV} vars={db&&db.attributes.varients.data} />

    
               </div>


            

               <div
            
             
            style={{
             
              backgroundColor: "#F2F2F2",
              color: "white",
           
              cursor: "pointer",
              display:"flex",
              alignItems:"center",
              width:"100%",
              justifyContent:"center",
              flexDirection:"column",
              padding: "10px",
              borderRadius: "0px 0px 10px 10px",
            }}
          >
 


 <div >
 <QuantEl qty={qty} quantHandler={(q)=>{setQty(q)}} stock={stock}/>
 </div>

       

            <div
             className="shadow-md"
              onClick={() => {
                HandleAddToCart();
              }}
              style={{
                display: "flex",
                padding:10,
                borderRadius:10,
                backgroundColor:Theme.primary,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  color: "white",
                  fontSize: 23,
                  marginRight: 5,
                }}
              >
                <BsCartPlusFill />
              </div>
              <span> Add to Cart</span>
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
:<div  style={{ width: "100%", padding: "20px 10px" }}>
 
 <SkeletonTheme baseColor="white" highlightColor={Theme.primary}>
 
      <Skeleton count={3} />
   
  </SkeletonTheme>

 
</div>

    }
    </div>
  );
}

