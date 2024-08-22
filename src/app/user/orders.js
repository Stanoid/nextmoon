'use client'

import React from 'react';
import { useContext,useEffect,useState,useRef } from 'react';
import { API_URL} from '../local';
import TableComp from '../comps/sandbox/table';
import { useRouter } from 'next/navigation'
import ItemsPopup from "../comps/userItemsPopup"
import { AuthCon } from '../contexts/AuthCon';
import { useSelector } from 'react-redux';


function Orders(props) {
    const ls = require("local-storage")
    const {logindata,logoutUser}  = useContext(AuthCon);
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
    }, [])
    
   
  const handleOpenDel = (open)=>{
    setOpenDel(open)
  }

    const getOrders=(id)=>{
         
    props.setLod(true)
      setOpenDel(false)      
             setlod(true)
      const requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + udata.jwt
        },
      
    };
  
      fetch(`${API_URL}orders?func=getUserOrders`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          
          setlod(false)
        setOrderdata(data.reverse())
        }).then(()=>{
       props.setLod(false)
        
        })
  
  
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
//        "Authorization": 'Bearer ' + ls.get("atkn")
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
              




<div className='px-4 sm:px-4 lg:px-8'  style={{marginTop:10,width:"100%",borderRadius:10,backgroundColor:""}}>
<div className='text-moon-200/80 text-2xl mt-3'>
الطلبات:
</div>
<br/>

{
  orderData?<TableComp
  columns={
    [
      {name: "ID", uid: "id", sortable: true},
      {name: "التاريخ", uid: "date", sortable: true},  
      {name: "إجمالي السعر", uid: "total", sortable: true},
    
      {name: "حالة الدفع", uid: "payment_status",sortable: true },
      {name: "حالة الطلب", uid: "status", sortable: true},
      {name: "التفاصيل", uid: "refid"},
    ]
   }
   data={orderData}
   delorder={DeliverOrder}
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