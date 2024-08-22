import axios from "axios";
import {API_URL,IMG_URL} from "../../../../local"


export const loginUser = async (pld)=>{

 const res = axios.post(`${API_URL}auth/local`, pld)
      .then(function (response) {
        //console.log(response);
        return response.data
      })
      .catch(function (error) {
        console.log(error);
      });
return await res;


}


