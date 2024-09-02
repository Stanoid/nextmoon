import { API_URL } from "../../../../local";

export  const homeProductsFetcher = async () =>{
    const requestOptions = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
      
    };
  
    try {
   
        fetch(`${API_URL}products?func=getAllProducts`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
    
            return data
    
        }).then(()=>{
        })
        

    } catch (error) {
        
return null

    }

   
   
} 


