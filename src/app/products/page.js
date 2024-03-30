"use client";
import React, { useState, useEffect, useContext, useRef, useSear } from "react";
import { useRouter } from "next/navigation";
import { API_URL, ROOT_URL, CURRENCY, Theme } from "../local";
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
  const [db, setDb] = useState([]);
  const [price, setPrice] = useState();

  const [selectedV, setSelectedV] = useState();
  const [selectedC, setSelectedC] = useState();


  useEffect(() => {
    console.log(getQueryVariable("pid"));

    for (let i = 0; i < product.data.length; i++) {
      if (product.data[i].id == getQueryVariable("pid")) {
        console.log("here:", product.data[i]);
        setDb(product.data[i]);
        setPrice(product.data[i].vars[0].price);
      } else {
      }
    }


  



  }, []);

  const { cartData, addToCart, addTofav, favData, useNotifi, removeFromFav } =
    useContext(CartCon);

  const HandleAddToCart = () => {
    if (cartData.length == 0) {
      addToCart({"data":db,selvar:selectedV,selcolor:selectedC});
      console.log("Product Has been added on empty cart: ", db.nameEn);
      useNotifi("success", "Product has been added to cart");
    } else {
      if (
        cartData.find((obj) => obj.id === parseInt(getQueryVariable("pid"))) ==
        undefined
      ) {
        addToCart({"data":db,selvar:selectedV,selcolor:selectedC});
        console.log("Product Has been added: ", db.nameEn);
        useNotifi("success", "Product has been added to cart");
      } else {

        //old one prdct in cart
        // console.log("Product Aleady in Cart:  ", db.nameEn);
        // useNotifi("warn", "Product is already in cart");
        addToCart({"data":db,selvar:selectedV,selcolor:selectedC});
        console.log("Product Has been added: ", db.nameEn);
        useNotifi("success", "Product has been added to cart");
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
        <title>{"Minimoon | " + db.nameEn} </title>
        <meta name="description" content={db.descriptionEn} />
        <meta name="theme-color" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <ToastContainer  limit={3}/> */}

      <div className="main " style={{ width: "100%", padding: "20px 10px" }}>
        <div
          className="flex-col lg:flex-row sm:flex-col md:flex-col "
          style={{
            width: "100%",
            display: "flex",
            
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >

          {/* legacy image handler */}
          {/* <div
            style={{
              width: "100%",
              marginBottom: 20,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div   className="flex-col md:flex-row lg:flex-row sm:flex-col" style={{ display: "flex"}}>
              <div style={{marginBottom:5}}>
                <img
                  src={"/pimg/" + db.id + ".jpg"}
                  width={"100%"}
                  style={{borderRadius:5}}
                  height={500}
                  alt="Picture of the author"
                />
              </div>

              <div
              className="flex-row md:flex-col lg:flex-col sm:flex-row"
                style={{
               
                  width:"20%",
                  
                  display: "flex",
                  alignItems: "",
               
                
                  justifyContent: "space-between",
                 
               
                }}
              >
                <img
                  src={"/pimg/" + db.id + ".jpg"}
                 
                  height={500}
                    style={{ borderRadius: 5 ,width:"60%",marginRight:5,marginLeft:10}}
                  alt="Picture of the author"
                />

                <img
                    style={{ borderRadius: 5 ,width:"60%",marginRight:5,marginLeft:10}}
                  src={"/pimg/" + db.id + ".jpg"}
                
                  height={500}
                  alt="Picture of the author"
                />

                <img
                  src={"/pimg/" + db.id + ".jpg"}
                
                  height={500}
                  alt="Picture of the author"
                    style={{ borderRadius: 5 ,width:"60%",marginRight:5,marginLeft:10}}
                />
                <img
                  src={"/pimg/" + db.id + ".jpg"}
                
                  height={500}
                  alt="Picture of the author"
                    style={{ borderRadius: 5 ,width:"60%",marginRight:5,marginLeft:10}}
                />
              </div>
            </div>
          </div> */}
  

  <div style={{width:"100%"}} class="grid gap-4">
    <div>
        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg" alt=""/>
    </div>
    <div class="grid grid-cols-5 gap-4">
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt=""/>
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt=""/>
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt=""/>
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt=""/>
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" alt=""/>
        </div>
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
              marginTop:30,
              marginLeft:10,
              marginRight:10,
             
              
              paddingRight: 0,
            }}
          >
            <div className=" ">
              <span
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
              <div style={{
                display:"flex",
                alignItems:"center",
                justifyContent:"space-between",
              }}>



<div>
                <h2
                style={{ fontWeight: "bold", fontSize: 20, lineHeight: 1.3 }}
                className="max-w-xl mt-6 mb-6  font-semibold leading-loose tracking-wide text-gray-700  "
              >
                {db.nameEn}
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
                {db.descriptionEn}
              </p>
            </div>

            <div
              className=""
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                padding: 20,
              }}
            >
              <div>
                <OptionEL selectedfunc={(a)=>{
                  for (let i = 0; i < db.vars.length; i++) {
                  if(db.vars[i].id==a){
                    console.log("price: ",db.vars[i].price)
                    setPrice(db.vars[i].price);
                    setSelectedV(a);

                  }
                    
                  }
                }}
                
                selectedfuncC={(a)=>{
                  for (let i = 0; i < db.colors.length; i++) {
                  if(db.colors[i].id==a){
                   
                    setSelectedC(a);

                  }
                    
                  }
                }}
                
                vars={db.vars} colors={db.colors} />
              </div>

           

              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                  paddingTop: 15,
                }}
              >
                <div
                  style={{
                    display: "block",
                    width: "70%",
                    height: 2,
                    backgroundColor: "#D8D8D8",
                    borderRadius: 3,
                  }}
                ></div>
              </div>

              <div style={{ marginTop: 14, width: "100%" }}>
                <div
                  className="flex-col lg:flex-row sm:flex-col md:flex-col"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                

                  <div
                    onClick={() => {
                      HandleAddToCart();
                    }}
                    className="shadow-md"
                    style={{
                      backgroundColor: Theme.primary,
                      color: "white",
                      marginBottom: 10,

                      padding: "8px 12px",
                      borderRadius: 8,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
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

              
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// function to get elemnt from the server side data

// export async function getServerSideProps({params:{id}}){

//     const product_res = await fetch(`${API_URL}/item/find?id=6`);
//     const found = await product_res.json();

//     console.log("aaaaaaaaaaaaaaaaaaa",found)

//     if(found==undefined||found==null||found=={}||found==[]){
//       return {
//         props:{
//             data: null
//         }
//     }
//     }else{
//       return {
//         props:{
//             data:found.data-
//         }
//     }
//     }

// }
