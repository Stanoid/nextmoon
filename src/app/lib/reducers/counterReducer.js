import axios from "axios";
import { API_URL } from "../../local";
import { useRouter } from "next/navigation";
import { useState } from "react";


const initialState = {
  count: {},
  
};

var obg = {}


async function getData(state,action) {
  
  const createPromise = axios.post(`${API_URL}auth/local`, action.payload)
         
    const dataPromise = createPromise.then(function (response) {
           // console.log(response);
            switch(response.data.user.type){
              case 1:
              // location.replace("/admin");
            //  console.log("fff")
              return response.data
              break;
        
        
              case 2:
              return "/agent";
              break;
        
              case 3:
              return "/vendor";
              break;
        
        
              case 5:
                return "/delivery";
                break;
        
        
              case 4:
                return "/";
              break;
            }
           
        
        
          })
          .catch(function (error) {
            console.log("error",error);
            switch (data.error.status) {
              case 400:
                //useNotifi("error","بريد إلكتروني أو كلمة مرور غير صحيحة")
                break;
            
                case 429:
                  //useNotifi("warn","      تجاوزت الحد المسموح للمحاولات, الرجاء المحاولة لاحقآ")
                  break;
              
        
              default:
                //useNotifi("warn","         حدث حطأ ما, الرجاء المحاولة لاحقآ")
                break;
            }
        
          
        
        
          });
    
    const res = await dataPromise;
    //console.log(res);
return res

}



const counterReducer =  (state = initialState, action) => {
    
       
  //console.log("aaaa",action.type)
  switch (action.type) {
    case 'LOGIN':
      //console.log("aaa")


            

        // const waitPromise = await dataPromise; 
        // console.log(waitPromise);

//      try {
//       // getData(state,action).then(res=> console.log(res)                                                                                                                                                                                                                     )
//  // console.log(dta)
//      } catch (error) {
//       console.log(error)
//      }
     
      
   
    return {count:  (async () => {const res = await getData(state,action); return res; })().then((rrs)=>{ return rrs }) }
  
    break;



    case 'DECREMENT':
      return { count: state.count + 1 };
    
      default:
      return state;
  }
};

export default counterReducer;