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


    useEffect(() => {
    // loginval();
 //  getPromoList();
 sessionTest()
    }, [])
    
   
 
    

        
        const AddPromo=()=>{    
          setlod(true);
          const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + ls.get("atkn")
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
          setlod(true)
          const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + ls.get("atkn")
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
          
          setpromoData(data.data)
          setHasmore(data.has_more);
          setlod(false)
    //render promotions TODO


            }).then(()=>{
              setSize(size+1);  
            })
      
    
        }


      const getmore = ()=>{
        //setSize(size+1);
        if(!hasMore){return}
        getPromoList();

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
    width:"70%",
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
      <InputEl outputfunc={(val)=>{setNameen(val)}} label={"Promotion name"}/>
    </div>
    <div style={{gridArea:"namear"}}>
      <InputEl outputfunc={(val)=>{setPromocode(val)}} label={"Promotion code"}/>
    </div>

    <div style={{gridArea:"nameen"}}>
      <InputEl outputfunc={(val)=>{setDiscount(val)}} min={1} max={100} num={true} label={"Discount Percentage"}/>
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
                    name_en:"Expiry date"
                  }
                },
                {
                  id:2,
                  attributes:{
                    name_en:"Number of redeems"
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
            label={"Epxiry with:"}
          /> 
    

    </div>
    <div style={{gridArea:"ddiv"}}>
{expiry==1?
<InputEl outputfunc={(val)=>{setExpirydate(val)}} date={true} label={"Expiration date"}/>
:expiry==2?
<InputEl outputfunc={(val)=>{setRedeems(val)}} num={true}  label={"NO. of redeems"}/>
:<></>
}

    </div>

    <div style={{gridArea:"first"}}>

    <div style={{marginTop:10}}  class="w-full">
    <div style={{fontSize:20,color:"black",fontWeight:"bold",marginBottom:7}}>
      Promotion restrictions:
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
<div style={{marginLeft:7,fontWeight:"bolder",color:"grey"}}>
 Set a minimum amout for orders
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
<div style={{marginLeft:7,fontWeight:"bolder",color:"grey"}}>
 Limit promotion code to first transaction only
</div>
     </div>


   
    
   
   </div>


    </div>


  </div>
    </div>

  
  

   </div>

  

   <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:20}}>


<LoadingBtn act={()=>{AddPromo()}} lod={lod} text={"Add Promo Code"} />
</div>


<div className='shadow-md' style={{marginTop:20,width:"70%",padding:10,borderRadius:10}}>
<div style={{color:Theme.primary,fontSize:25,fontWeight:"bold"}}>
Added Colors:
</div>
<br/>
<div > 
<table style={{width:"100%"}}>
<tr style={{textAlign:"left",marginBottom:20}}>
    <th>Promo Name</th>
    <th>Promo Code</th>
    <th>Redeems limit</th>
    <th> Times redeemed</th>
    <th> Percent off </th>
    {/* <th>status</th>
    <th>Delete</th> */}
  </tr>

<br/>


{promoData&&promoData.map((promo,index)=>(


<tr  style={{textAlign:"left",padding:5, backgroundColor:index%2==0?"lightgray":"white"  }}>
    <th style={{padding:15}} >  {promo.name}</th>
    <th style={{padding:15}} >  {promo.code}</th>
    <th  style={{padding:15}} > {promo.max_redemptions?promo.max_redemptions:"-"}</th>
    <th  style={{padding:15}}> {promo.times_redeemed}  </th>
    <th  style={{padding:15}}> {promo.percent_off}%  </th>
    {/* <th  style={{padding:15}}> {promo.valid}  </th> */}
   
  
 
  </tr>

))}
</table>
</div>
</div>


<div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
<LoadingBtn act={()=>{getmore()}} lod={lod} text={hasMore?"Load more":"End of list"} />
</div>

      
    </div>
    




  )
}

export default PromoCodes