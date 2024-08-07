'use client'

import React from 'react';
import dynamic from 'next/dynamic';
import { useContext,useEffect,useState } from 'react';
import { Theme ,API_URL} from '../local';
import { useRouter } from 'next/navigation'


const AddColor = dynamic(() => import('./AddColor'));
const EditProduct = dynamic(() => import('./editProduct'));
const EditColor = dynamic(() => import('./editColor'));
const PromoCodes = dynamic(() => import('./promoCodes'));
const AddSubCat = dynamic(() => import('./addsubcat'));
const EditSize = dynamic(() => import('./editsize'));
const Orders = dynamic(() => import('./orders'));
const EditCat = dynamic(() => import('./EditCat'));
const ProductsList = dynamic(() => import('./productsList'));
const AddCat = dynamic(() => import('./addcat'));
const EditSubCat = dynamic(() => import('./EditSubcat'));




import { TiThMenu } from "react-icons/ti";
import AddProduct from './addproduct';


import { AuthCon } from '../contexts/AuthCon';


function AccounteEl() {
    const ls = require("local-storage")
    const {logindata,logoutUser}  = useContext(AuthCon);
    const router = useRouter(); 
    const [page,setPage] = useState(1) 
    const [logged,setLogged] = useState(0)
    const [colors,setColors] = useState([])
    const [sizes,setSizes] = useState([])
    const [pid,setPid] = useState(null);
    const [sid,setSid] = useState(null);
    const [cid,setCid] = useState(null);
    const [catid,setCatid] = useState(null);
    const [scatid,setScatid] = useState(null);

    const [userData,setUserdata] = useState(null)
    useEffect(() => {
     loginval();
   
  
    }, [])



    

    async function loginvalHandler(){
      
      loginval.then(function(result) {
       
    });
    }
 
    



    
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

      

        
  if(data.id){   

  if(data.type==1){
       
  }else{

    router.replace("/login")



    }
  
   }else{
  setLogged(0);
  router.push("/login")

   }
    
     
      });

  }



  const handleEdit = (pageid,id)=>{

    setPid(id)

   setPage(pageid)


  }

  
  const handleSizeEdit = (pageid,id)=>{

    setSid(id)

   setPage(pageid)


  }

  
  const handleColorEdit = (pageid,id)=>{

    setCid(id)

   setPage(pageid)


  }


  
  const handleCatEdit = (pageid,id)=>{

    setCatid(id)

   setPage(pageid)


  }

  const handleScatEdit = (pageid,id)=>{

    setScatid(id)

   setPage(pageid)


  }
 

  return (
  
<>

{
    
    <div 
    style={{
    
      padding:5,
      textWrap:"nowrap"
      
    }}>


      

<ul style={{borderBottom:"2px solid lightgrey",paddingBottom:5}} dir='rtl' class="flex flex-wrap scrollable-content 
 text-sm font-medium text-right  text-moon-200/80  border-gray-200 dark:border-gray-700 dark:text-gray-400">
<li onClick={()=>{setPage(1)}} class="me-1">
        <a style={{backgroundColor: page==1?"rgb(243 244 246)": "white" ,color:page==1?Theme.primaryDark:Theme.primary,cursor:"pointer"}} class="inline-block 
        p-3  hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">إضافة منتج</a>
    </li>
    
    <li onClick={()=>{setPage(2)}} class="me-1">
        <a  aria-current="page" style={{backgroundColor: page==2?"rgb(243 244 246)": "white" ,color:page==2?Theme.primaryDark:Theme.primary,cursor:"pointer"}}
         class="inline-block p-3   active dark:bg-gray-800 dark:text-blue-500">المنتجات</a>
    </li>


   
    <li onClick={()=>{setPage(3)}} class="me-1" >
        <a style={{backgroundColor: page==3?"rgb(243 244 246)": "white" ,color:page==3?Theme.primaryDark:Theme.primary,cursor:"pointer"}} 
         class="inline-block p-3  hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">المقاسات</a>
    </li>
    <li onClick={()=>{setPage(4)}} class="me-1">
        <a  style={{backgroundColor: page==4?"rgb(243 244 246)": "white" ,color:page==4?Theme.primaryDark:Theme.primary,cursor:"pointer"}} 
        class="inline-block p-3  hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">الألوان</a>
    </li>

    <li onClick={()=>{setPage(5)}} class="me-1">
        <a  style={{backgroundColor: page==5?"rgb(243 244 246)": "white" ,color:page==5?Theme.primaryDark:Theme.primary,cursor:"pointer"}}
         class="inline-block p-3  hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">الفئات</a>
    </li>

    <li onClick={()=>{setPage(6)}} class="me-1" >
        <a  style={{backgroundColor: page==6?"rgb(243 244 246)": "white" ,color:page==6?Theme.primaryDark:Theme.primary,cursor:"pointer"}}
         class="inline-block p-3 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">الفئات الفرعية</a>
    </li>


    <li onClick={()=>{setPage(14)}} class="me-1" >
        <a  style={{backgroundColor: page==14?"rgb(243 244 246)": "white" ,color:page==14?Theme.primaryDark:Theme.primary,cursor:"pointer"}}
         class="inline-block p-3  hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">الطلبات</a>
    </li>






      <li onClick={()=>{setPage(10)}} class="me-1" style={{borderLeft:"2px solid lightgrey"}}>
        <a  style={{backgroundColor: page==10?"rgb(243 244 246)": "white" ,color:page==10?Theme.primaryDark:Theme.primary,cursor:"pointer"}}
         class="inline-block p-3  hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">العروض الترويجية</a>
    </li>
{/* 
    <li onClick={()=>{setPage(11)}} class="me-1">
        <a  style={{backgroundColor: page==11?"rgb(243 244 246)": "white" ,color:page==11?Theme.primaryDark:Theme.primary,cursor:"pointer"}}
         class="inline-block p-3  hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Trending products</a>
    </li>

    <li onClick={()=>{setPage(12)}} class="me-1">
        <a  style={{backgroundColor: page==12?"rgb(243 244 246)": "white" ,color:page==12?Theme.primaryDark:Theme.primary,cursor:"pointer"}}
         class="inline-block p-3  hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">On sale</a>
    </li>

    <li onClick={()=>{setPage(13)}} class="me-1">
        <a  style={{backgroundColor: page==13?"rgb(243 244 246)": "white" ,color:page==13?Theme.primaryDark:Theme.primary,cursor:"pointer"}}
         class="inline-block p-3  hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Week highlight</a>
    </li>




    <li onClick={()=>{setPage(7)}} class="me-1" style={{borderLeft:"2px solid lightgrey"}}>
        <a  style={{backgroundColor: page==7?"rgb(243 244 246)": "white" ,color:page==7?Theme.primaryDark:Theme.primary,cursor:"pointer"}}
         class="inline-block p-3  hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Agents</a>
    </li> */}

    <li onClick={()=>{setPage(8)}} class="me-1">
        <a  style={{backgroundColor: page==8?"rgb(243 244 246)": "white" ,color:page==8?Theme.primaryDark:Theme.primary,cursor:"pointer"}}
         class="inline-block p-3  hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"> البائعين </a>
    </li>


    <li onClick={()=>{setPage(9)}} class="me-1">
        <a  style={{backgroundColor: page==9?"rgb(243 244 246)": "white" ,color:page==9?Theme.primaryDark:Theme.primary,cursor:"pointer"}}
         class="inline-block p-3  hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">العملاء</a>
    </li>
  
</ul>


<div style={{padding:10}}>
{page==1 ?  <AddProduct setpage={(pid,id)=>{handleEdit(pid,id)}} /> :<></>}
  {page==2 ?  <ProductsList  setpage={(pid,id)=>{handleEdit(pid,id)}} />  :<></>}
  {page==3 ? <AddSize setpage={(sid,id)=>{handleSizeEdit(sid,id)}} /> :<></>}
  {page==4 ? <AddColor  setpage={(cid,id)=>{handleColorEdit(cid,id)}} />  :<></>}
  {page==5 ? <AddCat setpage={(catid,id)=>{handleCatEdit(catid,id)}} /> :<></>}
  {page==6 ? <AddSubCat setpage={(scatid,id)=>{handleScatEdit(scatid,id)}} /> :<></>}




  {page==15 ? pid?<EditProduct setpage={(page)=>{setPage(page)}} pid={pid} />:<EditProduct setpage={(page)=>{setPage(page)}} pid={pid} /> :<></>}

  {page==14 ? <Orders  setpage={(cid,id)=>{handleColorEdit(cid,id)}} />  :<></>}
  {page==10 ? <PromoCodes setpage={(sid,id)=>{handleSizeEdit(sid,id)}} /> :<></>}

  {page==16 ? sid?<EditSize setpage={(page)=>{setPage(page)}} sid={sid} />:<EditSize setpage={(page)=>{setPage(page)}} sid={sid} /> :<></>}

  
  
  {page==17 ? cid?<EditColor setpage={(page)=>{setPage(page)}} cid={cid} />:<EditColor setpage={(page)=>{setPage(page)}} cid={cid} /> :<></>}

  

  {page==18 ? catid?<EditCat setpage={(page)=>{setPage(page)}} catid={catid} />:<EditCat setpage={(page)=>{setPage(page)}} catid={catid} /> :<></>}
  
  

  {page==19 ? scatid?<EditSubCat setpage={(page)=>{setPage(page)}} scatid={scatid} />:<EditSubCat setpage={(page)=>{setPage(page)}} scatid={scatid} /> :<></>}
  
  




</div>



     

    </div>
    
}

</>


  )
}

export default AccounteEl






















































