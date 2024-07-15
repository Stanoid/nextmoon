'use client'
import React, { useState, useEffect,useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CURRENCY, Theme ,API_URL} from "../local";
import { CartCon } from "../contexts/cartContext";
import Cartel from "../comps/cartel";
// Make sure to call loadStripe outside of a component’s render to avoid
export default function App() {
  const [clientSecret, setClientSecret] = useState("");
  const {cartData,removeFromCart,CartTotal}  = useContext(CartCon);



  
  const [Total,setTotal] = useState()
  
  const ls = require("local-storage");
  useEffect(() => {

//setTotal(handleTotal())
  //  console.log("cart from checkout",cartData)

    // // Create PaymentIntent as soon as the page loads
    // fetch("/create-payment-intent", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => setClientSecret(data.clientSecret));
  }, []);




  const handleOrder = ()=>{
    console.dir(cartData);
    let payarray = []
    for (let i = 0; i < cartData.length; i++) {
      payarray.push({
        id: cartData[i].selvar,
        qty: cartData[i].qty,
        desc: cartData[i].data.attributes.description_en 
      
      })
    }


    console.log(payarray)
    
      const requestOptions = {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
       items: payarray
      })
};
  fetch(`${API_URL}orders?func=initPaymentSession`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log("checoutlinked",data );
  window.location= data.url;
    }).then(()=>{
      
    });
                          

  }


  const handleTotal = ()=>{

 //   console.log("aaaaaaaa",cartData.length&&cartData.length);

  if(cartData.length==0){
   // setCartTotal(0);
    console.log("empty trig gered")
    // return
  }
  
  let total = 0;
  for (let i = 0; i < cartData.length; i++) {
//console.log("ffffffffffffffffffff",cartData[i].data.attributes.varients.data.length)

for (let j = 0; j < cartData[i].data.attributes.varients.data.length; j++) {
  const element = cartData[i].data.attributes.varients.data[j];
total = total + (cartData[i].data.attributes.varients.data[j].attributes.price *cartData[i].qty);
  //console.log("aaaaaaa",total)
}
  }

return total;

  }



  const appearance = {
    theme: 'stripe',
  };


  



  return (
    <div className="grid-cols-12">
   
   <div class="relative mx-auto w-full bg-white">
  <div class="grid min-h-screen grid-cols-10">


  <div class="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
      <h2 class="sr-only">Order summary</h2>
      <div>
        {/* <img src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" class="absolute inset-0 h-full w-full object-cover" /> */}
        <div  style={{backgroundColor:Theme.secondary}}  class="absolute inset-0 h-full w-ful "></div>
      </div>
      <div
   
      class="relative">
      
                 
      {cartData&&cartData.length!=0?cartData.map((cart,index)=>(
                <Cartel
                key={index}
                index={index}
                data={cart.data}
                selvar={cart.selvar}
                 removeItem={removeFromCart} 
                 qty={cart.qty}
                order={true}

                      />

               )): <div>Empty order</div>}

        <div class="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>

       
      
        <div style={{marginTop:13}} class="space-y-2">
        <p class="flex justify-between text-sm font-medium text-white"><span>Vat: 10%</span><span>$55.00</span></p>
          <p class="flex justify-between text-lg font-bold text-white"><span>Total price:</span><span> {handleTotal()}  {CURRENCY}</span></p>
          
        </div>
      </div>
     
    
    </div>




    <div class="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
      <div class="mx-auto w-full max-w-lg">
        <h1 class="relative text-2xl font-medium text-gray-700 sm:text-3xl">Checkout<span style={{backgroundColor:Theme.primary}} class="mt-2 block h-1 w-10  sm:w-20">
          </span></h1>
        <form action="" class="mt-10 flex flex-col space-y-4">
          <div><label for="email" class="text-xs font-semibold text-gray-500">Email</label><input type="email" id="email" name="email"
           placeholder="john.capler@fang.com" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 
           shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /></div>

           <div className="rounded-md shadow-md">
           <div style={{marginTop:13,width:"100%",display:"flex",justifyContent:"center",alignItems:"center",height:100,borderRadius:3,backgroundColor:"white"}}>
       <div>Delivery</div>
        </div>
           </div>


           <div className="shadow-md rounded-md">
           <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center",height:65,borderRadius:3,backgroundColor:"white"}}>
       <div>Promotin code</div>
        </div>
           </div>

       
        </form>
        <p class="mt-10 text-center text-sm font-semibold text-gray-500">By placing this order you agree to the <a href="#" 
        class="whitespace-nowrap text-blue-500 underline hover:text-blue-300">Terms and Conditions</a></p>
        <button type="submit" onClick={()=>{handleOrder()}} style={{backgroundColor:Theme.primary}}  class="mt-4 inline-flex w-full items-center justify-center rounded 
        py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 
        transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg">Place Order</button>
      </div>




        
    </div>





  </div>
</div>




{/*       
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )} */}
    </div>
  );
}