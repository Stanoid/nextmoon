'use client'

import React from 'react';
import { useContext,useEffect,useState } from 'react';
import { Theme ,API_URL} from '../local';
import InputEl from '../comps/inputel';
import LoadingBtn from '../comps/loadingbtn';
import { FaCheck } from 'react-icons/fa';
import { AuthCon } from '../contexts/AuthCon';
import TableComp from "../comps/sandbox/table";
import { useSelector } from 'react-redux';


function PromoCodes(props) {
    useContext(AuthCon);
    const [promocode,setPromocode] = useState("")
    const [discount,setDiscount] = useState(0);
    const [expiry,setExpiry] = useState(1);
    const [hasMore,setHasmore] = useState(null);

    const [expirydate,setExpirydate] = useState(1);
    const [redeems,setRedeems] = useState(1);
    const [firsttrans,setFirsttrans] = useState(false);
    const [isminorder,setIsminorder] = useState(false);
    const [minorder,setMinorder] = useState(0);
    const [promoData,setpromoData] = useState(null);

   const [size,setSize] =useState(1)
    const [nameen,setNameen] = useState("");

    const [lod,setlod] = useState(false)
    const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)


    useEffect(() => {
    // loginval();
  getPromoList();
 //sessionTest()
    },[])
    
   
 
    

        
        const AddPromo=()=>{    
          setlod(true);
          const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + udata.data.jwt
            },
            body: JSON.stringify(
                {   
                  name:nameen,   
                  code: promocode,
                  discount: discount,
                  isfirsttran:firsttrans,
                  isminamount:isminorder,
                  minorder:minorder,
                  expiry:expiry,
                  exp_date:expirydate,
                  redeems:redeems
                  }
              )  
        };
          fetch(`${API_URL}orders?func=AddPromoCode`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
          
        
          setlod(false)
            }).then(()=>{  
            })
      
    
        }

        const getPromoList=()=>{    
         props.setLod(true)
          setlod(true)
          const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + udata.data.jwt
            },
            body: JSON.stringify(
                {      
                 size:(size*10)
                  }
              )  
        };
          fetch(`${API_URL}orders?func=listpromo`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);

              let arr = [];
              for (let i = 0; i < data.data.length; i++) {
                let ob = {};
               ob.id = data.data[i].id
                ob.name = data.data[i].name;
                ob.code = data.data[i].code;  
                ob.max_redemptions = data.data[i].max_redemptions||"-"
                ob.times_redeemed = data.data[i].times_redeemed;
                ob.percent_off = data.data[i].percent_off;
                ob.createdAt="ddd"
                arr.push(ob) 
              }
              console.log(arr)

              setHasmore(data.has_more);
              setSize(size+1);  
              setlod(false)
              setpromoData(arr)
              props.setLod(false)
              return arr
            })
      
    
        }


      const getmore = ()=>{
        //setSize(size+1);
        if(!hasMore){return}
        getPromoList();
        setlod(false)

      }
      

  

  return (
    <div dir="rtl" className="w-full max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 text-moon-200">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25 12 11.25l3 3m-3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            إدارة العروض الترويجية
          </h1>
          <button
            onClick={() => props.setpage(0)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-gray-500 text-sm">أضف وأدر أكواد الخصم والعروض الترويجية</p>
      </div>

      {/* Add Promo Code Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-moon-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          إضافة عرض ترويجي جديد
        </h2>
        
        {/* Basic Info */}
        <div className="mb-6">
          <div className="mb-4">
            <InputEl outputfunc={(val)=>{setNameen(val)}} label={"إسم العرض"}/>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputEl outputfunc={(val)=>{setPromocode(val)}} label={"رمز العرض"}/>
            <InputEl outputfunc={(val)=>{setDiscount(val)}} min={1} max={100} num={true} label={"نسبة التخفيض %"}/>
          </div>
        </div>

        {/* Expiry Settings */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">إعدادات الصلاحية</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <InputEl
                value={expiry}
                outputfunc={(val) => {
                  setExpiry(val);
                }}
                iden={"size"}
                data={
                  [
                    {
                      id:1,
                      attributes:{
                        name_ar:"تاريخ الإنتهاء "
                      }
                    },
                    {
                      id:2,
                      attributes:{
                        name_ar:"عدد إستخدامات  "
                      }
                    }
                  ]
                }
                select={true}
                label={"نوع العرض :"}
              /> 
            </div>
            <div>
              {expiry==1?
                <InputEl outputfunc={(val)=>{setExpirydate(val)}} date={true} label={"تاريخ الإنتهاء "}/>
                :expiry==2?
                <InputEl outputfunc={(val)=>{setRedeems(val)}} num={true}  label={"عدد الإستخدامات"}/>
                :<></>
              }
            </div>
          </div>
        </div>

        {/* Conditions */}
        <div className="mb-6">
          <div className='text-lg' style={{color:"black",fontWeight:"bold",marginBottom:7}}>
            شروط العرض :
          </div>   
          <div className='w-full' style={{display:"flex",alignItems:"flex-start",flexDirection:"column",justifyContent:"center"}}>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"center",flexDirection:"row",margin:"5px 0px",padding:7}}>
              <div style={{display:"flex",marginRight:20,justifyContent:"center",alignItems:"center"}}>
                <div style={{width:20,height:20,border:"2px solid black"}}>
                  <div onClick={()=>{setIsminorder(!isminorder)}} style={{width:"100%",cursor:"pointer",height:"100%",color:"white",fontSize:12,backgroundColor:isminorder?Theme.primary:"white",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <FaCheck  />
                  </div>
                </div>
                <div style={{marginRight:7,fontWeight:"bolder",color:"grey"}}>
                  إعداد حد أدنى للطلب
                </div>
              </div>
              <div style={{display:isminorder?"flex":"none",alignItems:"center",justifyContent:"center"}} > 
                <InputEl outputfunc={(val)=>{setMinorder(val)}} num={true}  label={"Minimum order amount"}/>
              </div>
            </div>

            <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"row",padding:7}}>
              <div style={{display:"flex",marginRight:20,justifyContent:"center",alignItems:"center"}}>
                <div style={{width:20,height:20,border:"2px solid black"}}>
                  <div onClick={()=>{setFirsttrans(!firsttrans)}} style={{width:"100%",cursor:"pointer",height:"100%",color:"white",fontSize:12,backgroundColor:firsttrans?Theme.primary:"white",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <FaCheck  />
                  </div>
                </div>
                <div style={{marginRight:7,fontWeight:"bolder",color:"grey"}}>
                  العرض متوفر لاول عملية شراء فقط
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:20}}>
          <LoadingBtn act={()=>{AddPromo()}} lod={lod} text={" إضافة العرض "} />
        </div>

        <div className='mt-12 w-full'>
          {
            promoData?<TableComp
              columns={
                [
                  {name: "ID", uid: "id", sortable: true},
                  {name: "الإسم (العربية)", uid: "name", sortable: true},
                  {name: " كود العرض", uid: "code", sortable: true}, 
                  {name: "حد الإستخدامات", uid: "max_redemptions", sortable: true},
                  {name: " عدد الإستخدامات", uid: "times_redeemed", sortable: true},
                  {name: "  نسبة الخصم", uid: "percent_off"},
                ]
              }
              data={promoData}
            />:
            <div style={{
              display:lod?'flex':'none',
              alignItems:"center",
              justifyContent:"center"
            }}>
              <div style={{zIndex:10}}>
                <div style={{justifyContent:"center",alignItems:"center"}} className="lds-facebook"><div></div><div></div><div></div></div>
              </div>
            </div>
          }
        </div>

        <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
          <LoadingBtn act={()=>{getmore()}} lod={lod} text={hasMore?"Load more":"End of list"} />
        </div>
      </div>
    </div>
  )
}

export default PromoCodes