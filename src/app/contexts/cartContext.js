'use client'
import { createContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useI18n } from '../lib/i18n';
export const CartCon = createContext();






export const CartContext = ({children})=>{
  const ls = require("local-storage");
  const { t, locale } = useI18n();
  const [cartData, setCartData] = useState(ls.get("MinimoonCart"));



  

// useEffect(() => {
//   if(ls.get("MinimoonCart")){
//   //  
//   }else{
//     ls.set("MinimoonCart",[]);
//     //
//   }

//   //handleTotal();
//   }, [ls.get("MinimoonCart")]);

  
  const [CartTotal, setCartTotal] = useState(0);



  const [favData, setFavdata] = useState(
    [
    
    ]
   );



   
// const handleTotal=()=>{
 
// 

//   if(ls.get("MinimoonCart").length&&ls.get("MinimoonCart").length==0){
//     setCartTotal(0);
//     
//     // return
//   }
  
//   let total = 0;

  
// //
 
//   for (let i = 0; i < ls.get("MinimoonCart")&&ls.get("MinimoonCart").length; i++) {

// // var temp = cartData[i].data.attributes.varients.filter(obj => {
// //   return obj.id === cartData[i].selvar
// // });

// 

// for (let j = 0; j < ls.get("MinimoonCart")[i].data.attributes.varients.data.length; j++) {
//   const element = ls.get("MinimoonCart")[i].data.attributes.varients.data[j];
// total = total + (ls.get("MinimoonCart")[i].data.attributes.varients.data[j].attributes.price *ls.get("MinimoonCart")[i].qty);
//   
// }
//   }

// return total;
 
// }



  const addToCart = (ob)=>{


    let arr = null
    if(ls.get("MinimoonCart")){
        
        
        }else{
          ls.set("MinimoonCart",[]);
        
        }    



  
  
        arr= ls.get("MinimoonCart");
   
    arr = arr.concat(ob)//??
    //setCartData(arr)
    
    ls.set("MinimoonCart",arr)
   // handleTotal();
    

  }


  
  const addTofav = (ob)=>{
    //this code dosent make sense but it works
    const oldcart = favData; //????
    let arr = oldcart
    arr = arr.push(ob)//??
    setFavdata(favData)
    useNotifi("success","Added To Likes");
    
  }



  const removeFromFav = (id)=>{
    
        const oldcart = favData; //????
        let arr = oldcart
        arr = arr.filter(item => item.id !== id);//??
        setFavdata(arr)
        useNotifi("success","Removed from` Likes");
        
    
      }

  
  const removeFromCart = (id)=>{



    const oldcart = cartData; //????
    let arr = oldcart
  //  arr  = arr.slice(id+1)


arr = arr.slice(0, id).concat(arr.slice(id+1))
   
    setCartData(arr)

    
   
    ls.set("MinimoonCart",arr)
    
    //handleTotal();
    
   

    
  }

const useNotifi =(type,msg)=>{
  const baseStyle = {
    borderRadius: '12px',
    padding: '16px 20px',
    fontSize: '14px',
    fontWeight: '500',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
    maxWidth: '400px',
    minWidth: '280px',
  };

  const toastConfig = {
    duration: 3000,
    position: window.innerWidth >= 1024 ? (locale === 'ar' ? 'top-left' : 'top-right') : 'top-center',
  };

  switch(type){
    case 'success':
      toast.success(msg, {
        ...toastConfig,
        id: `success-${Date.now()}`,
        style: {
          ...baseStyle,
          background: '#ffffff',
          color: '#090808',
          border: '2px solid #e16d64',
        },
        iconTheme: {
          primary: '#e16d64',
          secondary: '#ffffff',
        },
      });
      break;

    case 'error':
      toast.error(msg, {
        ...toastConfig,
        id: `error-${Date.now()}`,
        style: {
          ...baseStyle,
          background: '#ffffff',
          color: '#090808',
          border: '2px solid #ef4444',
        },
        iconTheme: {
          primary: '#ef4444',
          secondary: '#ffffff',
        },
      });
      break;

    case 'warn':
      toast(msg, {
        ...toastConfig,
        id: `warn-${Date.now()}`,
        icon: '⚠️',
        style: {
          ...baseStyle,
          background: '#ffffff',
          color: '#090808',
          border: '2px solid #f59e0b',
        },
      });
      break;

    case 'info':
      toast(msg, {
        ...toastConfig,
        id: `info-${Date.now()}`,
        icon: 'ℹ️',
        style: {
          ...baseStyle,
          background: '#ffffff',
          color: '#090808',
          border: '2px solid #65c9e0',
        },
      });
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
  reverseOrder={false}
  gutter={12}
  toastOptions={{
    className: '',
    style: {
      fontFamily: 'inherit',
    },
  }}
/>


   {children}
    </CartCon.Provider>
  );
}

export default CartContext