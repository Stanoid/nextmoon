import { createContext,useState,useEffect } from "react";
import { useRouter } from "next/router";


import { API_URL } from "../src/app/local";
import { Flip, Slide, toast,ToastContainer } from 'react-toastify'
const AuthContext = createContext();


let magic
export const AuthProvider = (props)=>{

    const[user,setUser] = useState(null);
    const[userData,setuserData] = useState(null);
    const[stype,setStype] = useState(null);
    const [loading,setLoading]= useState(false);
    const router = useRouter();
    const ls = require("local-storage")
   //const hello ="hello from provider";
    /**
     * adds user to email
     * @param {string} email 
     */
    const loginUser = async (email,password)=>{
    setLoading(1);
        if(email==""||password==""){
            notify("error","Empty email or password")
            setLoading(0);
        }

            const requestOptions = {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    "identifier":email,
                   "password":password
                })
            };
            fetch(`${API_URL}/auth/local`, requestOptions)
                .then(response => response.json())
                .then(data =>{
                   // 
                    
                    if(data.jwt){
                        ls.set("atkn",data.jwt);
                  //   
                     setUser(data.user.username);
                     setuserData(data.user);
                     setStype(data.user.type)
                     switch(data.user.type){
                       case 1:
                     //   notify("success",`مرحبآ بك  ${data.user.username}, يتم تسجيل دخولك.`)
                        router.replace("/")
                        setLoading(0);
                      
                         break;

                         case 2:
                       //   notify("success",`مرحبآ بك  ${data.user.username}, يتم تسجيل دخولك.`)
                          router.replace("/panel");
                          setLoading(0);
                         

                           break;

                           case 3:
                          //  notify("success",`مرحبآ بك  ${data.user.username}, يتم تسجيل دخولك.`)
                            router.replace("/dpanel");
                            setLoading(0);
                          
  
                             break;

                             case 4:
                          //    notify("success",`شنو يا مكنة`)
                              router.replace("/apanel");
                              setLoading(0);
                            
    
                               break;

                           default:
                          //  notify("success",`مرحبآ بك  ${data.user.username}, يتم تسجيل دخولك.`)
                            router.replace("/");
                            setLoading(0);
                          
  
                             break;
                     }
                       
                    }else{
                        notify("error","بريد إلكتروني أو كلمة سر خاطئة ");
                        setLoading(0);
                    }
                });
    
           
    
    
        
     

    }



    const notify = (type,msg)=>{

        const options={
          hideProgressBar:true,
          draggable:true,
          closeButton:false,
          
        }
        switch(type){
          case 'success':
            toast.success(msg,options)
            break;
    
            case 'error':
              toast.error(msg,options)
              break;
    
              case 'warn':
                toast.warn(msg,options)
                break;
    
              
    
        }
       
      }


    /**
     * retreives the token from magic servers
     */

  



   /**
     * set user to null
     *
     */
    const logOutUser = async ()=>{
    
        try{  
            setUser(null);
            router.push("/login");
        }catch(err){

        }
            }


            const log = async ()=>{
               
             
                  }


             const checkLogged = async(chk)=>{
           
              // let myPromise = new Promise(function(resolve, reject) {
            
              // });

                if(ls.get("atkn")){
                     
                  const requestOptions = {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + ls.get("atkn")
                    },
                  
                };
                fetch(`${API_URL}/users/me?populate=*`, requestOptions)
                    .then(response => response.json())
                    .then(data =>{
                   //  
                    //  
                     
                      if(data.id){
                    setUser(data.username);
                    setuserData(data);
                    setStype(data.type)
                    switch(data.type){
                      case 1:
                        if(chk==1){
                          
                        }else if(chk==2){
                          router.replace("/account");
                        }else if(chk==3){
                          router.replace("/mpanel");
                        }
                      
                        break;

                        case 2:
                   
                         router.replace("/panel")

                          break;

                          case 3:
                         
                           router.replace("/dpanel")
 
                            break;

                            case 4:
                         
                              router.replace("/apanel")
    
                               break;

                          default:
                      
                          // router.replace("/login")
 
                            break;
                    }
                 
                      }else{
                        setUser(null);
                        //router.replace("/login")
                      }
                       
                       
                    });
                    
                }else{
                   router.replace("/login")
                }
                

                


             }


             const isLogged = async(chk)=>{
              
                 // let myPromise = new Promise(function(resolve, reject) {
               
                 // });
   
                   if(ls.get("atkn")){
                        
                     const requestOptions = {
                       method: 'GET',
                       headers: {
                           "Content-Type": "application/json",
                           "Authorization": 'Bearer ' + ls.get("atkn")
                       },
                     
                   };
                   fetch(`${API_URL}/users/me?populate=*`, requestOptions)
                       .then(response => response.json())
                       .then(data =>{
                      // 
                         
   
   
                         if(data.id){
                        
                    
                        setUser(data.username);
                        setuserData(data);
                        setStype(data.type)
                        switch(data.type){
                          case 1:
                        //   notify("success",`مرحبآ بك  ${data.user.username}, يتم تسجيل دخولك.`)
                           router.replace("/")
                           setLoading(0);
                         
                            break;
   
                            case 2:
                          //   notify("success",`مرحبآ بك  ${data.user.username}, يتم تسجيل دخولك.`)
                             router.replace("/panel");
                             setLoading(0);
                            
   
                              break;
   
                              case 3:
                             //  notify("success",`مرحبآ بك  ${data.user.username}, يتم تسجيل دخولك.`)
                               router.replace("/dpanel");
                               setLoading(0);
                             
     
                                break;
   
                                case 4:
                             //    notify("success",`شنو يا مكنة`)
                                 router.replace("/apanel");
                                 setLoading(0);
                               
       
                                  break;
   
                              default:
                             //  notify("success",`مرحبآ بك  ${data.user.username}, يتم تسجيل دخولك.`)
                               router.replace("/");
                               setLoading(0);
                             
     
                                break;
                        }
                          
                       }else{
                           notify("error","بريد إلكتروني أو كلمة سر خاطئة ");
                           setLoading(0);
                       }
   
                        
                        
                          
                       });
                       
                   }else{
                      router.replace("/login")
                   }
                   
   
                   
   
   
                }
   

            useEffect(()=>{
               
                //checkLogged();
            })


return(
    <AuthContext.Provider value={{user,loginUser,logOutUser,notify,isLogged,stype,checkLogged,loading,userData}}>
          <ToastContainer  limit={3}/>
        {props.children}
    </AuthContext.Provider>
)
}

export default AuthContext