"use client"

import axios from "axios";
import {API_URL} from "../../../../local"
 const loginFetcher = async (pld)=>{

 const res = axios.post(`${API_URL}auth/local`, pld)
      .then(function (response) {
        //console.log(response);
        return {error:false,data:response.data}
      })
      .catch(function (error) {
        //console.log("aaaa",error);
        return {error:true,data:error.response.status};
      });


return await res;


}


export const loginUser = async (pld)=> {


  // console.log(await unstable_cache( await cached_loginUser(pld)));
  
  try {
    //const res = await unstable_cache( await cached_loginUser(pld));

    return await loginFetcher(pld)
  // try {
  //   const getCachedUser = unstable_cache(
  //     async (ob) => await cached_loginUser(ob),
  //     ['my-app-user'],
  //     {tags: ["user"],
  //       revalidate: 60
  //     }
  //   );

  //   return await getCachedUser(pld)

  // } catch (error) {
  //   console.log(error)
  // }


    
  } catch (error) {
    console.log(error)
  }
} ;


