'use client'
import { createContext, useContext, useState,useEffect,useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const CartCon = createContext();



// const mainScroll = useRef(null);
// useEffect(() => {
//   const handleScroll = () => {
//     const el = mainScroll.current;
   
//     console.log("Coords Boss: ",el.getBoundingClientRect())
//   };

//   const element = mainScroll.current;
//   element.addEventListener("scroll", handleScroll);

//   return () => {
//     element.removeEventListener("scroll", handleScroll);
//   };
// }, []);


export const CartContext = ({children})=>{
  const [cartData, setCartData] = useState(
   [
  
   ]
  );


  const [favData, setFavdata] = useState(
    [
    
    ]
   );



  const addToCart = (ob)=>{
    //this code dosent make sense but it works
    console.log("incoming object ",ob)
    // const oldcart = cartData; //????
    // let arr = oldcart
    // arr = arr.push(ob)//??
    // setCartData(cartData)
    // console.log("cart from context (Add): " ,cartData)//??
  }


  
  const addTofav = (ob)=>{
    //this code dosent make sense but it works
    const oldcart = favData; //????
    let arr = oldcart
    arr = arr.push(ob)//??
    setFavdata(cartData)
    useNotifi("Added To Likes");
    console.log("Likes from context (Add): " ,favData)//??
  }



  const removeFromFav = (id)=>{
    console.log(id);
        const oldcart = favData; //????
        let arr = oldcart
        arr = arr.filter(item => item.id !== id);//??
        setFavdata(arr)
        console.log("Likes from context: (Remove)" ,favData)//??
    
      }

  
  const removeFromCart = (id)=>{
console.log(id)
    const oldcart = cartData; //????
    let arr = oldcart
    arr = arr.filter(item => item.id !== id);//??
    setCartData(arr)
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
      toast.success(msg,options)
      break;

      case 'error':
        toast.error(msg,options)
        break;

        case 'warn':
          toast.warn(msg,options)
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
      useNotifi,
      // mainScroll
      
      }}>
        <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition = "Bounce"
        />


   {children}
    </CartCon.Provider>
  );
}

export default CartContext