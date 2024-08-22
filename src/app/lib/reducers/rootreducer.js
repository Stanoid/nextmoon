import { combineReducers } from 'redux'
import * as types from '../types'





// // COUNTER REDUCER
// // const counterReducer = (state = 0, { type }) => {
// //   switch (type) {
// //     case types.INCREMENT:
// //       return state + 1
// //     case types.DECREMENT:
// //       return state - 1
// //     case types.RESET:
// //       return 0
// //     default:
// //       return state
// //   }
// // }

// // INITIAL TIMER STATE
// const initialTimerState = {
//   lastUpdate: 0,
//   light: false,
// }

// // TIMER REDUCER
// const timerReducer = (state = initialTimerState, { type, payload }) => {
//   switch (type) {
   
//     default:
//       return state
//   }
// }

const initialAuthState = {
  data: null,
}

const authReducer = (state = initialAuthState, { type, payload }) => {
  switch (type) {
    case types.LOGIN:
      return {
        data: payload,
      }
      break;

      case types.LOGOUT:
        return {
          data: null,
        }
        break;

      
    default:
      return state
  }
}


const initialCartState = {
  data: [],
}

const cartReducer = (state = initialCartState, { type, payload }) => {
  switch (type) {
    case types.ADDTOCART:

    

      return {
        data: payload,
      }
      break;

      case types.REMOVEFROMCART:
        return {
          data: payload,
        }
        break;

      
    default:
      return state
  }
}




const removerFunc = (sts,id)=>{

  const oldcart = sts.data; //????
  let arr = oldcart
  //  arr  = arr.slice(id+1)
  return arr = arr.slice(0, id).concat(arr.slice(id+1))
  
  
  }

const adderFunc = (sts,pld)=>{


//console.log(typeof(sts));

let carr = sts.data;
let nnccr = carr
console.log([...sts.data])
return sts.data


//return [] //hard reset

// const i = carr.findIndex(e => e.data.id === pld.data.id);
// if (i > -1) {
//   console.log("index",i);
//   // We know that at least 1 object that matches has been found at the index i
//    const nqty = carr[i].data.qty + 1 ;
//    //carr[i].data.qty = nqty
//    //nnccr[i].data.qty =+ nnccr[i].data.qty;
// console.log(nnccr)
//    return carr
// }else{

//   const ncarr =  carr.concat(pld);
//   console.log("length",ncarr.length)
//  return ncarr


// }






}





// COMBINED REDUCERS
const reducers = {
  auth:authReducer,
  cart:cartReducer
}

export default combineReducers(reducers)
