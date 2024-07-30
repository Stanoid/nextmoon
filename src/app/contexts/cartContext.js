'use client'
import { createContext, useContext, useState,useEffect,useRef } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
export const CartCon = createContext();






export const CartContext = ({children})=>{
  const ls = require("local-storage");
  const [cartData, setCartData] = useState(ls.get("MinimoonCart"));



  

// useEffect(() => {
//   if(ls.get("MinimoonCart")){
//   //  console.log("ls already there ")
//   }else{
//     ls.set("MinimoonCart",[]);
//     //console.log("ls initated on null value ")
//   }

//   //handleTotal();
//   }, [ls.get("MinimoonCart")]);

  
  const [CartTotal, setCartTotal] = useState(0);



  const [favData, setFavdata] = useState(
    [
    
    ]
   );



   
// const handleTotal=()=>{
 
// console.log("aaaaaaaa",ls.get("MinimoonCart").length&&ls.get("MinimoonCart").length);

//   if(ls.get("MinimoonCart").length&&ls.get("MinimoonCart").length==0){
//     setCartTotal(0);
//     console.log("empty triggered")
//     // return
//   }
  
//   let total = 0;

  
// //console.log("aaaaaaaaaaaaaaaaaaaaa",cartData)
 
//   for (let i = 0; i < ls.get("MinimoonCart")&&ls.get("MinimoonCart").length; i++) {

// // var temp = cartData[i].data.attributes.varients.filter(obj => {
// //   return obj.id === cartData[i].selvar
// // });

// console.log("ffffffffffffffffffff",ls.get("MinimoonCart")[i].data.attributes.varients.data.length)

// for (let j = 0; j < ls.get("MinimoonCart")[i].data.attributes.varients.data.length; j++) {
//   const element = ls.get("MinimoonCart")[i].data.attributes.varients.data[j];
// total = total + (ls.get("MinimoonCart")[i].data.attributes.varients.data[j].attributes.price *ls.get("MinimoonCart")[i].qty);
//   console.log("aaaaaaa",total)
// }
//   }

// return total;
 
// }



  const addToCart = (ob)=>{


    let arr = null
    if(ls.get("MinimoonCart")){
        console.log("ls already there ");
        
        }else{
          ls.set("MinimoonCart",[]);
        console.log("ls initated on null value ",ls.get("MinimoonCart"))
        }    



  
  
        arr= ls.get("MinimoonCart");
   
    arr = arr.concat(ob)//??
    //setCartData(arr)
    console.log(arr);
    ls.set("MinimoonCart",arr)
   // handleTotal();
    console.log("cart from context (Add) ",arr)//??

  }


  
  const addTofav = (ob)=>{
    //this code dosent make sense but it works
    const oldcart = favData; //????
    let arr = oldcart
    arr = arr.push(ob)//??
    setFavdata(favData)
    useNotifi("success","Added To Likes");
    console.log("Likes from context (Add): " ,favData)//??
  }



  const removeFromFav = (id)=>{
    console.log(id);
        const oldcart = favData; //????
        let arr = oldcart
        arr = arr.filter(item => item.id !== id);//??
        setFavdata(arr)
        useNotifi("success","Removed from` Likes");
        console.log("Likes from context: (Remove)" ,favData)//??
    
      }

  
  const removeFromCart = (id)=>{
console.log(id)


    const oldcart = cartData; //????
    let arr = oldcart
  //  arr  = arr.slice(id+1)


arr = arr.slice(0, id).concat(arr.slice(id+1))
   
    setCartData(arr)

    console.log("bafore setting minimooncart" ,arr)//??
   
    ls.set("MinimoonCart",arr)
    
    //handleTotal();
    console.log("cart from context: (Remove)" ,cartData)//??
   

    
  }

const useNotifi =(type,msg)=>{
  const options={
    hideProgressBar:true,
    draggable:true,
    closeButton:false,
    autoClose: 3000,
    
  }
  switch(type){
    case 'success':
      toast.success(msg)
      break;

      case 'error':
        toast.error(msg)
        break;

        case 'warn':
          toast.error(msg)
          break;

        

  }
}



  return (
    //let { isOpen } = useContext(SidebarContext);
    <CartCon.Provider 
    value={{
      cartData,
      addToCart,
      removeFromCart,
      favData,
      removeFromFav,
      
      addTofav,
      CartTotal,
      useNotifi,
      // mainScroll
      
      }}>
     

<Toaster
  position="top-center"
  reverseOrder={false}
/>


   {children}
    </CartCon.Provider>
  );
}

export default CartContext