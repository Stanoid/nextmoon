'use client'
import { createContext, useContext, useState,useEffect,useRef } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import toast, { Toaster } from 'react-hot-toast';
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

  
  const [CartTotal, setCartTotal] = useState(0);



  const [favData, setFavdata] = useState(
    [
    
    ]
   );



   
const handleTotal=()=>{

  if(cartData.length==0){
    setCartTotal(0);
    return
  }
  
  let total = 0;
  for (let i = 0; i < cartData.length; i++) {
    // console.log("cart total",cartData)
 total = total + (cartData[i].data.price);
  }
  setCartTotal(total);
}



  const addToCart = (ob)=>{
    //this code dosent make sense but it works
    console.log("incoming object ",ob)
    const oldcart = cartData; //????
    let arr = oldcart
    
    arr = arr.push(ob)//??
    setCartData(cartData)
    handleTotal();
    console.log("cart from context (Add) ")//??
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
    arr = arr.filter(item => item.data.id !== id);//??
    setCartData(arr)
    handleTotal();
    console.log("cart from context: (Remove)" ,cartData)//??
    handleTotal();

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