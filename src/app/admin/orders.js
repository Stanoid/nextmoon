'use client'
import React from 'react';
import { useContext,useEffect,useState,useRef } from 'react';
import { Theme ,API_URL, CURRENCY} from '../local';
import TableComp from '../comps/sandbox/table';
import DeliveryPopup from '../comps/deliveryPopup';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Input } from '@nextui-org/react';


function Orders(props) {
    const ls = require("local-storage")
    const childCompRef = useRef();
    const [namear,setNamear] = useState("");
    const [nameen,setNameen] = useState("");
    const [colorCode,setColorCode] = useState("");
    const [openDel,setOpenDel] = useState(false);
    const [colors,setcolors] = useState([])
    const [orderData,setOrderdata] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter(); 
    const [ordata,setOrdata] = useState(null)
    const [lod,setlod] = useState(false)
    const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)
    const [stats, setStats] = useState({
      totalOrders: 0,
      pendingOrders: 0,
      confirmedOrders: 0,
      deliveredOrders: 0,
      cancelledOrders: 0,
      totalRevenue: 0,
      averageOrderValue: 0,
    });

    

    useEffect(() => {
    // loginval();
   getOrders();
    },[])
    
   
  const handleOpenDel = (open)=>{
    setOpenDel(open)
  }

    const calculateOrderStats = (ordersData) => {
      let totalOrders = ordersData.length;
      let pendingOrders = 0;
      let confirmedOrders = 0;
      let deliveredOrders = 0;
      let cancelledOrders = 0;
      let totalRevenue = 0;

      ordersData.forEach((order) => {
        const status = order.status?.toLowerCase() || "";
        const total = parseFloat(order.total) || 0;

        if (status.includes("pending") || status.includes("قيد")) pendingOrders++;
        else if (status.includes("confirmed") || status.includes("مؤكد")) confirmedOrders++;
        else if (status.includes("delivered") || status.includes("تم")) deliveredOrders++;
        else if (status.includes("cancelled") || status.includes("ملغي")) cancelledOrders++;

        if (status.includes("delivered") || status.includes("تم")) {
          totalRevenue += total;
        }
      });

      const averageOrderValue = deliveredOrders > 0 ? totalRevenue / deliveredOrders : 0;

      setStats({
        totalOrders,
        pendingOrders,
        confirmedOrders,
        deliveredOrders,
        cancelledOrders,
        totalRevenue,
        averageOrderValue,
      });
    };

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
        const ordersArray = Array.isArray(data) ? data.reverse() : [];
        setOrderdata(ordersArray);
        calculateOrderStats(ordersArray);
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

 


 

  const filteredOrders = orderData ? orderData.filter(order => 
    !searchQuery.trim() || 
    order.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id?.toString().includes(searchQuery) ||
    order.city?.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
  
<div dir="rtl" className="w-full">

  <DeliveryPopup
    ref={childCompRef}
    data={ordata?ordata:null}
    getOrders={()=>{getOrders()}}
    openHandler={handleOpenDel}
    open={openDel}
    isadmin={true}
  />

  {/* Header */}
  <div className="mb-6">
    <div className="flex items-center justify-between mb-2">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 text-moon-200">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
        إدارة الطلبات
      </h1>
    </div>
    <p className="text-gray-500 text-sm">متابعة وإدارة جميع الطلبات</p>
  </div>

  {/* Stats Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-blue-600 font-medium">إجمالي الطلبات</p>
          <p className="text-2xl font-bold text-blue-700">{stats.totalOrders}</p>
        </div>
        <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-blue-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border border-yellow-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-yellow-600 font-medium">قيد الانتظار</p>
          <p className="text-2xl font-bold text-yellow-700">{stats.pendingOrders}</p>
        </div>
        <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-yellow-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-purple-600 font-medium">مؤكدة</p>
          <p className="text-2xl font-bold text-purple-700">{stats.confirmedOrders}</p>
        </div>
        <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-purple-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-green-600 font-medium">تم التوصيل</p>
          <p className="text-2xl font-bold text-green-700">{stats.deliveredOrders}</p>
        </div>
        <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-green-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
          </svg>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-red-600 font-medium">ملغية</p>
          <p className="text-2xl font-bold text-red-700">{stats.cancelledOrders}</p>
        </div>
        <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200 sm:col-span-2 lg:col-span-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-emerald-600 font-medium">إجمالي الإيرادات</p>
          <p className="text-2xl font-bold text-emerald-700">{stats.totalRevenue.toLocaleString()} {CURRENCY}</p>
          <p className="text-xs text-emerald-600 mt-1">متوسط الطلب: {stats.averageOrderValue.toLocaleString()} {CURRENCY}</p>
        </div>
        <div className="w-12 h-12 bg-emerald-200 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-emerald-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
      </div>
    </div>
  </div>

  {/* Search Bar */}
  <div className="mb-6">
    <Input
      placeholder="ابحث عن طلب (رقم الهاتف، الاسم، رقم الطلب، المدينة...)"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="max-w-md"
      startContent={
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      }
      classNames={{
        input: "text-right",
        inputWrapper: "bg-white"
      }}
    />
  </div>

  {/* Orders Table */}
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
    {
      orderData?<TableComp
       data={filteredOrders}
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