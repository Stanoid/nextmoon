import { store } from '../store';
import * as types from '../types'
import {loginUser} from "./api/auth/index";
import { revalidateTag } from 'next/cache';
// INITIALIZES CLOCK ON SERVER
const state = store.getState();

// INITIALIZES CLOCK ON CLIENT
export const login =  (pld) => async (dispatch) =>{
  //console.log(pld);

  const res = await loginUser(pld);


//console.log(res.user.type);
//location.replace("/")



dispatch({ type: types.LOGIN, payload: res })




if(res.error){
//  alert(res.data);
  return;
}


 switch(res.data.user.type){
  case 1:
    
  location.replace("/admin");
  break;


  case 2:
  location.replace("/agent");
  break;

  case 3:
  location.replace("/vendor");
  break;


  case 5:
    location.replace("/delivery");
    break;


  case 4:
    location.replace("/");
  break;
}



 
}



export const addToCart =  (pld) => async (dispatch,getState) =>{
const state = getState();
//console.log(state.root.cart.data)
//return



  let carr = state.root.cart.data;
var nnccr = JSON.parse(JSON.stringify(carr));
//return [] //hard reset

// console.log("nccr",nnccr);
// console.log("pld",pld)

const i = carr.findIndex(e => e.data.id === pld.data.id && e.color==pld.color && e.size==pld.size);
if (i > -1  ) {


  if(nnccr[i].color==pld.color && nnccr[i].size==pld.size){
    console.log("match sizes and clors")
    nnccr[i].qty = nnccr[i].qty + pld.qty;
    dispatch({ type: types.ADDTOCART, payload: nnccr })
  }else{
    console.log(" not match sizes and clors")
    const ncarr =  carr.concat(pld);
    dispatch({ type: types.ADDTOCART, payload: ncarr })
  }


//console.log(nnccr)



}else{

  const ncarr =  carr.concat(pld);
  //console.log("length",ncarr)
  dispatch({ type: types.ADDTOCART, payload: ncarr })


}


}


export const removeFromCart =  (pld) => async (dispatch,getState) =>{
const state = getState();


let carr = state.root.cart.data;
var nnccr = JSON.parse(JSON.stringify(carr));

for (let i = 0; i < nnccr.length; i++) {
 
  if(nnccr[i].selvar==pld.id && nnccr[i].color==pld.color && nnccr[i].size==pld.size ){
    nnccr.splice(i, 1);
  }
  
}

//console.log(nnccr)


  dispatch({ type: types.CLEARCART, payload: nnccr })


}


export const clearCart =  (pld) => async (dispatch,getState) =>{
  const state = getState();
  
    dispatch({ type: types.REMOVEFROMCART, payload: [] })
  
  
  }


  
// INCREMENT COUNTER BY 1
export const incrementCount = () => ({ type: types.INCREMENT })

// DECREMENT COUNTER BY 1
export const decrementCount = () => ({ type: types.DECREMENT })

// RESET COUNTER
// export const logout = () => ({ type: types.LOGOUT })



export const logout =  () => async (dispatch) =>{
  //console.log(pld);
//revalidateTag("user")
 dispatch({ type: types.LOGOUT })




 
}