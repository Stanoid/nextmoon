'use client'

import React from 'react';
import { useContext,useEffect,useState } from 'react';
import { Theme ,API_URL} from '../local';
import InputEl from '../comps/inputel';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { TiThMenu } from "react-icons/ti";
import LoadingBtn from '../comps/loadingbtn';
import { FaTimes,FaEdit,FaCheck } from 'react-icons/fa';
import { AuthCon } from '../contexts/AuthCon';
import TableComp from "../comps/sandbox/table";
import { useSelector } from 'react-redux';


function PromoCodes(props) {
    const ls = require("local-storage")
    const {logindata,logoutUser}  = useContext(AuthCon);
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
    const [colorCode,setColorCode] = useState("");
    const [colors,setcolors] = useState([])

    const router = useRouter(); 
    const [lod,setlod] = useState(false)
    const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)


    useEffect(() => {
    // loginval();
  getPromoList();
 //sessionTest()
    }, [])
    
   
 
    

        
        const AddPromo=()=>{    
          setlod(true);
          const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + udata.jwt
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

        const sessionTest=()=>{    
          setlod(true)
          const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
           
            },
            body: JSON.stringify(
                {      
               
                  }
              )  
        };
          fetch(`${API_URL}orders?func=testsession`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
          
        

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
                "Authorization": 'Bearer ' + udata.jwt
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
               // console.log("rrrr",ob)
               
              }
                 console.log(arr)


                 setHasmore(data.has_more);
              return arr

     
          setlod(false)
    //render promotions TODO


            }).then((arr)=>{
              setSize(size+1);  
              setlod(false)
              setpromoData(arr)
              props.setLod(false)
            })
      
    
        }


      const getmore = ()=>{
        //setSize(size+1);
        if(!hasMore){return}
        getPromoList();
        setlod(false)

      }
      

  

  return (
  



    
<div 
    style={{
      
      display:"flex",
      alignItems:"center",
      flexDirection:"column",
      justifyContent:"center",
      padding:5
      
 }}>

   



   <div style={{
    width:"100%",
display:"grid",
gap:10,
gridTemplateAreas:`
' name name name name  ' 
' namear  namear  nameen nameen  ' 
'sicon sicon ddiv ddiv'

'first first first first'


`


   }} >

<div style={{gridArea:"name"}}>
      <InputEl outputfunc={(val)=>{setNameen(val)}} label={"إسم العرض"}/>
    </div>
    <div style={{gridArea:"namear"}}>
      <InputEl outputfunc={(val)=>{setPromocode(val)}} label={"رمز العرض"}/>
    </div>

    <div style={{gridArea:"nameen"}}>
      <InputEl outputfunc={(val)=>{setDiscount(val)}} min={1} max={100} num={true} label={"نسبة التخفيض "}/>
    </div>


    <div style={{gridArea:"sicon"}}>
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
                },

                // {
                //   id:3,
                //   attributes:{
                //     name_en:"One time promotion code"
                //   }
                // }
              ]
            }
            
            select={true}
            label={"نوع العرض :"}
          /> 
    

    </div>
    <div style={{gridArea:"ddiv"}}>
{expiry==1?
<InputEl outputfunc={(val)=>{setExpirydate(val)}} date={true} label={"تاريخ الإنتهاء "}/>
:expiry==2?
<InputEl outputfunc={(val)=>{setRedeems(val)}} num={true}  label={"عدد الإستخدامات"}/>
:<></>
}

    </div>

    <div style={{gridArea:"first"}}>

    <div style={{marginTop:10}}  class="w-full">
    <div className='text-lg' style={{color:"black",fontWeight:"bold",marginBottom:7}}>
      شروط العرض :
    </div>   
    <div  className='w-full' style={{display:"flex",alignItems:"flex-start",flexDirection:"column",justifyContent:"center"}}>
   
   <div  style={{display:"flex",alignItems:"flex-start",justifyContent:"center",flexDirection:"row",margin:"5px 0px",
    padding:7
   }}>
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

   <div  style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"row",
    padding:7
   }}>
     <div style={{display:"flex",marginRight:20,justifyContent:"center",alignItems:"center"}}>
     <div style={{width:20,height:20,border:"2px solid black"}}>
      <div onClick={()=>{setFirsttrans(!firsttrans)}} style={{width:"100%"
        ,cursor:"pointer",height:"100%",color:"white",fontSize:12,backgroundColor:firsttrans?Theme.primary:"white",display:"flex",alignItems:"center",justifyContent:"center"}}>
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
    </div>

  
  

   </div>

  

   <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:20}}>


<LoadingBtn act={()=>{AddPromo()}} lod={lod} text={" إضافة العرض "} />
</div>



<div  className='mt-12 w-full' >


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


<div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
<LoadingBtn act={()=>{getmore()}} lod={lod} text={hasMore?"Load more":"End of list"} />
</div>

      
    </div>
    




  )
}

export default PromoCodes