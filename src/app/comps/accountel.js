import React from 'react';
import { useContext,useEffect,useState,useMemo } from 'react';
import { Theme ,API_URL} from '../local';
import { useRouter } from 'next/navigation'
import { FaUserAlt } from "react-icons/fa";



import { AuthCon } from '../contexts/AuthCon';


function AccounteEl() {
    const ls = require("local-storage")
    const {logindata}  = useContext(AuthCon);
    const router = useRouter(); 
    const [logged,setLogged] = useState(0)
    const [userData,setUserdata] = useState(null)
    useEffect(() => {
     loginval();
    })

    
    


    
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
        
      //  
   if(data.id){
   setLogged(1)
   setUserdata(data);
   }else{
  setLogged(0);
  setUserdata(null);
   }
    
     
      });

  }


 

  return (
  
<>

{
    logged?
    <div 
    
    onClick={
        ()=>{router.push("/profile")}
        }
    style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
    }}>


     {userData&&userData.username}


     <button
                          onClick={() => {
                            handleOpenCart(true);
                          }}
                          style={{
                            fontSize: 20,
                            marginLeft: 5,
                            padding: 10,
                            borderRadius: 100,
                            backgroundColor: "white",
                            color: Theme.primary,
                          }}
                          className="p-2 m-1 text-white  rounded-sm
             
             focus:shadow-outline focus:text-gray-500"
                        >
                          <FaUserAlt />
                        </button>

    </div>
    :<> 
    <button
              
              onClick={
                ()=>{router.push("/login")}
                }
                style={{backgroundColor:Theme.primary,borderRadius:5}}
                            className="p-2 m-1 text-white  rounded-sm
                             hover:bg-gray-100 hover:text-gray-500
                             
                             focus:outline-none
                              focus:shadow-outline focus:text-gray-500">
                                {/* {LOCALE.hello.ar} */}
                                Login
                            
                            </button>
              
                            
              
              
                            
                            <button
                            
                            onClick={
                              ()=>{router.push("/register")}
                              }
                              style={{backgroundColor:Theme.primary,borderRadius:5}}
                            className="p-2 m-1  text-white rounded-sm
                             hover:bg-gray-100 hover:text-gray-500 focus:outline-none
                              focus:shadow-outline focus:text-gray-500">
                                Register
                            
                            </button>
     </>
}

</>


  )
}

export default AccounteEl