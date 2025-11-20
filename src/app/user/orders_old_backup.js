'use client'

import React from 'react';
import { useEffect,useState,useRef } from 'react';
import { API_URL, Theme, CURRENCY } from '../local';
import ItemsPopup from "../comps/userItemsPopup"
import { useSelector } from 'react-redux';


function Orders(props) {
    const childCompRef = useRef();
    const [openDel,setOpenDel] = useState(false);
    const [orderData,setOrderdata] = useState(null);
    const [ordata,setOrdata] = useState(null)
    const [lod,setlod] = useState(true)
    const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)
    

    useEffect(() => {
      getOrders();
    },[])
    
   
  const handleOpenDel = (open)=>{
    setOpenDel(open)
  }

    const getOrders=()=>{
      if(!udata?.data?.jwt) {
        setlod(false)
        return
      }
         
      props.setLod(true)
      setOpenDel(false)      
      setlod(true)
      
      const requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + udata.data.jwt
        },
      };
  
      fetch(`${API_URL}orders?func=getUserOrders`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log('Orders data:', data)
          setlod(false)
          setOrderdata(data.reverse())
          props.setLod(false)
        })
        .catch((error) => {
          console.error('Error fetching orders:', error)
          setlod(false)
          props.setLod(false)
        })
      }

      const DeliverOrder=(order)=>{
        setOrdata(order);
        setOpenDel(true);
      }

      const getOrderStatus = (order) => {
        if(order.order && order.order.status === 'delivered') return 'delivered'
        if(order.order && order.order.status === 'initiated') return 'initiated'
        return 'initiated'
      }

        
 
    



  

  return (
  



    
<div dir='rtl'
    style={{
  display:"flex",
  alignItems:"flex-start",
  justifyContent:"center"
      
 }}>

   

                      <div className="flex  flex-col ">
                      

{ordata?<ItemsPopup               ref={childCompRef}
                          data={ordata&&ordata}
                          getOrders={()=>{getOrders()}}
                          openHandler={handleOpenDel}
                          open={openDel}/>:<div></div> }
                      </div>
              




<div className='w-full'>
{/* Header */}
<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8'>
  <div className='flex items-center gap-4'>
    <div className='p-4 rounded-2xl text-white shadow-lg' style={{backgroundColor: Theme.primary}}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
    </div>
    <div>
      <h2 className='text-3xl font-bold text-gray-900'>طلباتي</h2>
      <p className='text-sm text-gray-500 mt-1'>تتبع وإدارة جميع طلباتك</p>
    </div>
  </div>
  {orderData && orderData.length > 0 && (
    <div className='flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg'>
      <span className='text-sm text-gray-600'>إجمالي الطلبات:</span>
      <span className='text-lg font-bold' style={{color: Theme.primary}}>{orderData.length}</span>
    </div>
  )}
</div>

{lod ? (
  <div className='flex items-center justify-center min-h-[300px]'>
    <div className="lds-facebook"><div></div><div></div><div></div></div>
  </div>
) : orderData && orderData.length > 0 ? (
  <div className='space-y-4'>
    {orderData.map((order, index) => (
      <div key={index} className='bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300'>
        {/* Order Header */}
        <div className='p-4 sm:p-6 border-b border-gray-100' style={{backgroundColor: `${Theme.primary}10`}}>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold' style={{backgroundColor: Theme.primary}}>
                #{order.id || index + 1}
              </div>
              <div>
                <div className='font-semibold text-gray-900'>طلب رقم {order.id || index + 1}</div>
                <div className='text-sm text-gray-500'>{order.date || 'التاريخ غير متوفر'}</div>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-lg font-bold' style={{color: Theme.primary}}>
                {order.total || '0'} د.ج
              </span>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className='p-4 sm:p-6'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>
              </div>
              <div>
                <div className='text-xs text-gray-500'>طريقة الدفع</div>
                <div className='font-medium text-gray-900'>{order.payment_type || 'نقدي'}</div>
              </div>
            </div>

            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <div>
                <div className='text-xs text-gray-500'>نوع التوصيل</div>
                <div className='font-medium text-gray-900'>{order.delivery_type || 'توصيل منزلي'}</div>
              </div>
            </div>

            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <div>
                <div className='text-xs text-gray-500'>حالة الدفع</div>
                <div className='font-medium text-gray-900'>{order.payment_status || 'مدفوع'}</div>
              </div>
            </div>
          </div>

          {/* Order Tracking */}
          <div className='mt-6 mb-4'>
            <div className='text-sm font-semibold text-gray-700 mb-3'>تتبع الطلب</div>
            <div className='relative'>
              <div className='flex items-center justify-between'>
                {['تم الطلب', 'قيد التحضير', 'جاري التوصيل', 'تم التسليم'].map((step, idx) => {
                  const isActive = idx === 0 || (order.status === 'delivered' && idx <= 3) || (order.status === 'initiated' && idx <= 1)
                  return (
                    <div key={idx} className='flex flex-col items-center flex-1 relative'>
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                        isActive ? 'text-white shadow-lg' : 'bg-gray-200 text-gray-400'
                      }`} style={isActive ? {backgroundColor: Theme.primary} : {}}>
                        {isActive ? '✓' : idx + 1}
                      </div>
                      <div className={`text-xs mt-2 text-center ${isActive ? 'font-semibold' : 'text-gray-400'}`} style={isActive ? {color: Theme.primary} : {}}>
                        {step}
                      </div>
                      {idx < 3 && (
                        <div className={`absolute top-4 sm:top-5 right-1/2 w-full h-0.5 ${isActive ? '' : 'bg-gray-200'}`} 
                          style={isActive ? {backgroundColor: Theme.primary} : {}}></div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className='flex justify-end mt-4'>
            <button
              onClick={() => DeliverOrder(order)}
              className='flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium hover:shadow-lg transition-all transform hover:scale-105'
              style={{backgroundColor: Theme.primary}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              عرض التفاصيل
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
) : (
  <div className='flex flex-col items-center justify-center min-h-[300px] text-gray-500'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-4 opacity-50">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
    <p className='text-lg font-medium'>لا توجد طلبات حتى الآن</p>
    <p className='text-sm'>ابدأ التسوق لإنشاء طلبك الأول</p>
  </div>
)}

{/* 
 <TableComp data={orderData} /> */}

{/* <div > 
<table  style={{width:"100%"}}>
<tr style={{textAlign:"left",marginBottom:20}}>
 
    <th style={{paddingLeft:10}} > Buyer name</th>
    <th>Buyer phone</th>
    <th>Delivery address</th>
    <th>Status</th> 
    
    <th> View </th>
    
  </tr>

<br/>


{orderData&&orderData.map((order,index)=>(


<tr  style={{textAlign:"left", marginBottom:10,backgroundColor:index%2==0?"#E4E4E4":"white"  }}>
    <th style={{padding:"20px 20px 20px 10px"}} >

    <div>
                             <span> {order.session&&order.session.customer_details.name.toString().split(" ")[0]  } </span>

                             <span> {order.session&&order.session.customer_details.name.toString().split(" ")[order.session&&order.session.customer_details.name.toString().split(" ").length-1]} </span>
                                </div>

       
        
        </th>
    <th> {order.session&&order.session.customer_details.phone } </th>
  
    <th  > {Date(order.session.created).toString().slice(0,Date(order.session.created).toString().indexOf("GMT"))}  </th>
    <th  >
      

    <div className="" style={{display:"flex",alignItems:"center",justifyContent:"flex-start"}} >
                  <div>

                  <div className='shadow-sm text-amber-700 bg-amber-200 ' 
                  style={{
                    display:order.order&&order.order.status=="initiated"?"flex":"none",
                    padding:"7px 11px",
                    alignItems:"center",
                    borderRadius:8,
                    justifyContent:"center",
                    fontWeight:"bold"
                  }}
                  >
                    <div  className='bg-amber-700' style={{width:10,height:10,borderRadius:100,marginRight:7}}></div>
                    <div>Not Delivered</div>
                  </div>

                  <div className='shadow-sm text-green-600 bg-green-300 ' 
                  style={{
                    display:order.order&&order.order.status=="delivered"?"flex":"none",
                    padding:"7px 11px",
                    borderRadius:8,
                    alignItems:"center",
                    justifyContent:"center",
                    fontWeight:"bold"
                  }}
                  >
                    <div  className='bg-green-600' style={{width:10,height:10,borderRadius:100,marginRight:7}}></div>
                    <div>Delivered</div>
                  </div>
               

                  </div>
        


                  
                  </div>




      
       </th> 
    <th >
    
        <div   style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div onClick={()=>{ DeliverOrder(order)}} className='shadow-md rounded-full'  style={{padding:10,cursor:"pointer",backgroundColor:Theme.primary,color:"white",fontSize:"1 rem"}}> <FaEye/> </div>
        </div>
    
      
        </th>
    
    

  </tr>

))}
</table>

<div style={{
  display:lod?'flex':'none' ,
  alignItems:"center",
  justifyContent:"center"
}}>
<div style={{zIndex:10}}>
      <div style={{justifyContent:"center",alignItems:"center"}} className="lds-facebook"><div></div><div></div><div></div></div>
      </div>
</div>
</div> */}
</div>



      
    </div>
    




  )
}

export default Orders