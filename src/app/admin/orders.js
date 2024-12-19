'use client'
import React from 'react';
import { useContext,useEffect,useState,useRef } from 'react';
import { Theme ,API_URL} from '../local';
import TableComp from '../comps/sandbox/table';
import DeliveryPopup from '../comps/deliveryPopup';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';


function Orders(props) {
    const ls = require("local-storage")
    const childCompRef = useRef();
    const [namear,setNamear] = useState("");
    const [nameen,setNameen] = useState("");
    const [colorCode,setColorCode] = useState("");
    const [openDel,setOpenDel] = useState(false);
    const [colors,setcolors] = useState([])
    const [orderData,setOrderdata] = useState(null);
    const router = useRouter(); 
    const [ordata,setOrdata] = useState(null)
    const [lod,setlod] = useState(false)
    const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)

    

    useEffect(() => {
    // loginval();
   getOrders();
    },[])
    
   
  const handleOpenDel = (open)=>{
    setOpenDel(open)
  }

    const getOrders=(id)=>{
         
      
      setOpenDel(false)      
             setlod(true)
      const requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + udata.data.jwt
        },
      
    };
  
      fetch(`${API_URL}orders?func=getAdminOrders`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          
          setlod(false)
         // console.log("admin orders",data)
        setOrderdata(data.reverse())
        }).then(()=>{
       
        
        })
  
  
      }


      const DeleteOrder = (orid)=>{
        setlod(true);
          const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + udata.data.jwt
               
            },
            body: JSON.stringify({
               oid: orid,
              })
          };
          fetch(`${API_URL}orders?func=deleteOrder`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
            //  console.log(data)
           setlod(false);
           props.notifi("success"," تم إلغاء الطلب")
          getOrders()
          // dispatch(clearCart([]))
         // window.location= data.url;
            }).then(()=>{
              
            });
        
        
        }

      const ConOrder = (orid)=>{
      //setRefr(false);
      
      
       // console.log(orid);
      setlod(true);
        const requestOptions = {
          method: 'POST',
          headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer ' + udata.data.jwt
             
          },
          body: JSON.stringify({
             oid: orid,
            })
        };
        fetch(`${API_URL}orders?func=orderProccessor`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
          //  console.log(data)
         setlod(false);
         getOrders();
         props.notifi("success"," تم تأكيد الطلب")

        // dispatch(clearCart([]))
       // window.location= data.url;
          }).then(()=>{
            
          });
      
      
      }


      const DeliverOrder=(order)=>{


        setOrdata(order);
         setOpenDel(true);

    return

//         setlod(true)
//  const requestOptions = {
//    method: 'POST',
//    headers: {
//        "Content-Type": "application/json",
//        "Authorization": 'Bearer ' + udata.data.jwt
//    },  body: JSON.stringify(
//     {
//         "id": id,
//       }
//   )
// };
//  fetch(`${API_URL}orders?func=deliverOrder`, requestOptions)
//    .then((response) => response.json())
//    .then((data) => {
//      
//      getOrders();
  
//    }).then(()=>{
  
   
//    })


 }

        
        const getcolors=()=>{
         
    
             
        const requestOptions = {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer ' + udata.data.jwt
          },
        
      };
    
        fetch(`${API_URL}colors`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            
           setcolors(data.data);
          }).then(()=>{
         
          
          })
    
    
        }

    


    
   const loginval = ()=>{


    const requestOptions = {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + udata.data.jwt
      },
    
  };

    fetch(`${API_URL}users/me`, requestOptions)
      .then((response) => response.json())
      .then((data) => {

      

        
  if(data.id){

  if(data.type==1){
       
 
  }else{



    }
  
   }else{
  setLogged(0);
  router.push("/login")

   }
    
     
      });

  }



 const submitload = ()=>{



  if(colorCode==""||namear==""||nameen==""){
    alert("Empty Feilds")
    return;
  }


        setlod(true);

      
        

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + udata.data.jwt
            },
            body: JSON.stringify(
                {
                  "data":{
                    "name_ar": namear,
                    "name_en": nameen,
                    "colorCode":colorCode,
                    "status": true
                  }
                  
             
                  }
              )
          
        };
      
          fetch(`${API_URL}colors`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              
             setNamear("");
             setNameen("");
             setColorCode("");
             alert("color added")

              setlod(false);
            }).then(()=>{
         
            
            })
      



    }
   


 const expireOrder =(id)=>{

setlod(true);

             
    const requestOptions = {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + udata.data.jwt
      },
      body: JSON.stringify(
        {
      
          "id":id,
     
          }
      )
    
  };

    fetch(`${API_URL}orders?func=expireOrder`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        
       getOrders();
      }).then(()=>{
     setlod(false)
      
      })


    }

 


 

  return (
  



    
<div 
    style={{
  display:"flex",
  alignItems:"flex-start",
  justifyContent:"center"
      
 }}>

   

                      <div className="flex  flex-col ">
                      

<DeliveryPopup
                          ref={childCompRef}
                          data={ordata?ordata:null}
                          getOrders={()=>{getOrders()}}
                          openHandler={handleOpenDel}
                          open={openDel}
                          isadmin={true}
                        />
                      </div>
              




<div className=''  style={{marginTop:20,padding:15,width:"100%",borderRadius:10,backgroundColor:""}}>

<br/>

{
  orderData?<TableComp
   data={orderData}
   search={"phone"}
   columns={
    [
      {name: "التاريخ", uid: "date", sortable: true},  

      {name: "ID", uid: "id", sortable: true},
      {name: "اسم العميل", uid: "name", sortable: true},
      {name: "رقم الهاتف", uid: "phone", sortable: true},
      {name: "المجموع", uid: "total", sortable: true},
      {name: "حالة الطلب", uid: "status", sortable: true},
      {name: "حالة الدفع", uid: "payment_status",sortable: true },
      {name: "طريقة الدفع", uid: "payment_type",sortable: true },
      {name: "التوصيل", uid: "delivery_type",sortable: true },
      {name: "المدينة", uid: "city", sortable: true},
      {name: "التفاصيل", uid: "refida"},
    ]
   }
   
   delorder={DeliverOrder}
   deleteorder={DeleteOrder}
   conorder={ConOrder}
    />:
  <div style={{
    display:lod?'flex':'none' ,
    alignItems:"center",
    justifyContent:"center"
  }}>
  <div style={{zIndex:10}}>
        <div style={{justifyContent:"center",alignItems:"center"}} className="lds-facebook"><div></div><div></div><div></div></div>
        </div>
  </div>
}


</div>



      
    </div>
    




  )
}

export default Orders