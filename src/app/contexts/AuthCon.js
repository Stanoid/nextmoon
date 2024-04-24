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
    console.log("started");
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
        console.log(data);
                      
        if (data.jwt) {
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


            case 4:
              router.replace("/");
            break;
          }
         


          //router.replace("/");
        }
      });
  };


  const logoutUser = () => {
    
    ls.set("atkn", "");

    location.reload();
  }



  const loginval = ()=>{
console.log("loginval ")

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


        setLogindata(data)
     
      });

  }

  const useNotifi = (type, msg) => {
    const options = {
      hideProgressBar: true,
      draggable: true,
      closeButton: false,
      autoClose: 3000,
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
        loginval
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />

      {children}
    </AuthCon.Provider>
  );
};

export default AuthenContext;
