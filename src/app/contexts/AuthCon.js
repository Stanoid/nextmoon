"use client";
import { createContext, useContext, useState, useEffect, useRef } from "react";
// import { ToastContainer, toast } from 'react-toastify';
import toast, { Toaster } from "react-hot-toast";
import { API_URL } from "../local";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

export const AuthCon = createContext();

export const AuthenContext = ({ children }) => {


  const [logindata,setLogindata] = useState();
  const ls = require("local-storage");
  const router = useRouter();

  const loginUser = (cred, pass) => {
    
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "identifier": cred,
        "password": pass,
      }),
    };

    fetch(`${API_URL}auth/local`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        
            if(data.error){
              console.log(data.error);
              switch (data.error.status) {
                case 400:
                  useNotifi("error","بريد إلكتروني أو كلمة مرور غير صحيحة")
                  break;
              
                  case 429:
                    useNotifi("warn","      تجاوزت الحد المسموح للمحاولات, الرجاء المحاولة لاحقآ")
                    break;
                

                default:
                  useNotifi("warn","         حدث حطأ ما, الرجاء المحاولة لاحقآ")
                  break;
              }

              return;
            }           
        console.log(data)
        if (data.jwt) {
         setLogindata(data)
          ls.set("atkn", data.jwt);
          switch(data.user.type){
            case 1:
              
            router.replace("/admin");
            break;


            case 2:
            router.replace("/agent");
            break;

            case 3:
            router.replace("/vendor");
            break;


            case 5:
              router.replace("/delivery");
              break;


            case 4:
              router.replace("/");
            break;
          }
         


          //router.replace("/");
        }else{
          useNotifi("error","بريد إلكتروني أو كلمة مرور غير صحيحة")
           return 0;
        }
      });
  };
         



  const logoutUser = () => {
    
    ls.set("atkn", "");

    location.reload();
  }



  const loginval = ()=>{


    const requestOptions = {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + ls.get("atkn")
      },
    
  };

    fetch(`${API_URL}users/me`, requestOptions)
      .then((response) => response.json())
      .then((data) => {


        return data
     
      });



  
    }

    const getLoginData = ()=>{
    
return 12

    }

  const useNotifi = (type, msg) => {
    const options = {
      hideProgressBar: false,
      draggable: true,
      closeButton: true,
      autoClose: 2000,
    };
    switch (type) {
      case "success":
        toast.success(msg);
        break;

      case "error":
        toast.error(msg);
        break;

      case "warn":
        toast.error(msg);
        break;
    }
  };

  return (
    //let { isOpen } = useContext(SidebarContext);
    <AuthCon.Provider
      value={{
        loginUser,
        logoutUser,
        getLoginData,
        loginval
      }}
    >
      <Toaster position="top-center" containerClassName="text-right" reverseOrder={false} />

      {children}
    </AuthCon.Provider>
  );
};

export default AuthenContext;
