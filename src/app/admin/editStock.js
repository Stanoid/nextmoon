"use client";

import React from "react";
import { useContext, useEffect, useState } from "react";
import { Theme, API_URL, CURRENCY } from "../local";
import InputEl from "../comps/inputel";
import axios from "axios";
import { BsX } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { TiThMenu } from "react-icons/ti";
import Image from "next/image";
import { useSelector } from "react-redux";
import OptionELEdit from "../comps/optionELedit";
import LoadingBtn from "../comps/loadingbtn";
import { FaTimes, FaEdit,FaTrash,FaPlus } from "react-icons/fa";
import { AuthCon } from "../contexts/AuthCon";

function EditProduct(props) {
  const ls = require("local-storage");
  const { logindata, logoutUser } = useContext(AuthCon);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [logged, setLogged] = useState(0);
  const [userData, setUserdata] = useState(null);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [cats, setCats] = useState([]);
  const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)
  const [namear, setNamear] = useState("");
  const [nameen, setNameen] = useState("");
  const [descar, setDescar] = useState("");
  const [descen, setDescen] = useState("");
  const [subc, setSubc] = useState(null);
  const [imgs, setImgs] = useState([]);
  const [img, setImg] = useState(null);
  const [color, setcolor] = useState(null);
  const [size, setSize] = useState(null);

  const [sizeSelect, setSizeselect] = useState([]);
  const [colorSelect, setColorselect] = useState([]);

  const [price, setPrice] = useState(null);
  const [stock, setStock] = useState(null);
  const [code, setCode] = useState(null);
  const [lod, setlod] = useState(false);
  const [varientDelete,setVarientDelete] = useState([]);

  const [eff, setEff] = useState(true);
  const [refr, setRefr] = useState(true);
  const isLogged = useSelector(
    (state) => state.root.auth.data && state.root.auth.data
  );
  const [varients,setVarients]= useState([])
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    imgs: "",
  });

  const [files, setFiles] = useState([]);
  useEffect(() => {
    // loginval();
    if(eff){
      getProducts();
    }
    
  }, [eff,refr]);






  const handleStockChange = (val,id)=>{
 //console.log(val,id)

 setVarients(
  varients.map((vari) =>
    vari.id === id ? { ...vari, attributes: { ...vari.attributes, stock: val } } : vari
  )
);


//console.log("ovar",oldvar);
//console.log("vvar",varients);

  }


  const handlePriceChange = (val,id)=>{
    //console.log(val,id)
   
    setVarients(
     varients.map((vari) =>
       vari.id === id ? { ...vari, attributes: { ...vari.attributes, price: val } } : vari
     )
   );
   
   
   //console.log("ovar",oldvar);
   //console.log("vvar",varients);
   
     }


     
  const handlediscountChange = (val,id)=>{
    //console.log(val,id)
   
    setVarients(
     varients.map((vari) =>
       vari.id === id ? { ...vari, attributes: { ...vari.attributes, old_price: val } } : vari
     )
   );
   
   
   //console.log("ovar",oldvar);
   //console.log("vvar",varients);
   
     }

  const getProducts = () => {

  setlod(true)
  props.setLod(true);
  
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //Authorization: "Bearer " + udata.data.jwt,
      },
    };
    fetch(`${API_URL}products/${props.pid}?func=getFullProduct`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("peodddddddddddddddd",data)
       // setProducts(data.data);
        setNamear(data.data.attributes.name_ar)
        setNameen(data.data.attributes.name_en);
        setDescar(data.data.attributes.description_ar)
        setDescen(data.data.attributes.description_en)
      
         setSubc(data.data.attributes.subcatagory.data&&data.data.attributes.subcatagory.data.id);
         setImg(data.data.attributes.img)
         setVarients(data.data.attributes.varients&&data.data.attributes.varients.data);
         setPrice(data.data.attributes.varients&&data.data.attributes.varients.data[0].attributes.price);
         setStock(data.data.attributes.varients&&data.data.attributes.varients.data[0].attributes.stock);
         setCode(data.data.attributes.code);
         
       
      })
      .then(() => {
         
        props.setLod(false);
        setlod(false)
      });
  };


  const submitProduct = (imgsob) => {
    
   setlod(true)
   //props.setLod(true);

    //
    if (
    varients==null
    ) {
      alert("empty feilds");
     setlod(false)
      // props.setLod(false);
      return;
    } else {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + udata.data.jwt,
        },
        body: JSON.stringify({
          varient:varients,  
        }),
      };


     

      fetch(`${API_URL}products/${props.pid}?func=editStock`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          
        })
        .then(() => {
          props.notifi("success","تم تعديل الكميات")
          //props.setLod(false);
          props.setpage(20);
         
         
        });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        padding: 5,
      }}
    >
      <div
        style={{
          padding: 10,
          
          fontWeight: "bold",
          alignSelf: "flex-start",
          borderBottom: "3px solid " + Theme.primary,
          marginBottom: 15,
        }}
      >
        تعديل كمية :
      </div>

      <div
        style={{
          width: "100%",
          display: "grid",
          gap: 10,
          gridTemplateAreas: `
' namear  namear  . .  ' 
'descriptionAr descriptionAr descriptionAr descriptionAr'




`,
        }}
      >
        <div style={{ gridArea: "namear" }}>
        <div className="flex  space-x-3  " >
        
        <div className=' w-32  h-32' style={{position:"relative"}} >
       {img?<Image  fill objectFit='cover'
          quality={70}
          className="rounded-md"
          
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={img&&JSON.parse(img)[0].url} 
        
          /> :<></>}
          </div>

          <div className=" flex items-center  " >
            <div className="mx-4 font-bold px-4 rounded-full py-2 text-white bg-moon-200 " >  {code&&code} </div>
          </div>

        </div>
        </div>

      


        <div style={{ gridArea: "descriptionAr" }}>



       
        {varients&&varients.map((vari, index)=>(


<div
className="py-2"
style={{
  //backgroundColor: index%2==1?"#e0e0e0":"white" ,
  borderBottom:"2px solid "+Theme.primary,
  width: "100%",
  display: "grid",
  gap: 10,
  gridTemplateAreas: `
'varient discount price  stock ' 

`,
}}
>


<div style={{ gridArea: "stock" }}>
          <InputEl
            value={vari.attributes.stock}
            outputfunc={(val) => {
             handleStockChange(val,vari.id);
            }}
            num={true}
            label={"الكمية"}
          />
        </div>


        <div style={{ gridArea: "price" }}>
          <InputEl
            value={vari.attributes.price}
            outputfunc={(val) => {
             handlePriceChange(val,vari.id);
            }}
            num={true}
            label={" السعر "+ CURRENCY }
          />
        </div>


        <div style={{ gridArea: "discount" }}>
          <InputEl
            value={vari.attributes.old_price}
            outputfunc={(val) => {
             handlediscountChange(val,vari.id);
            }}
            num={true}
            label={" الخصم % " }
          />
        </div>

<div className="p-5 flex  flex-col   " style={{ gridArea: "varient" }}>
        <div>
          {vari.attributes.sizes.data[0].attributes.name_ar} (  {vari.attributes.sizes.data[0].attributes.icon})
        </div>

        <div className="flex   items-center  ">
       <div>{vari.attributes.colors.data[0].attributes.name_ar}</div><div  className="w-6 h-6 mr-1 rounded-full " style={{backgroundColor:vari.attributes.colors.data[0].attributes.colorCode}} >  </div>
        </div>
        
        {/* <div className="flex   items-center  ">
       <div>{vari.attributes.price} {CURRENCY} </div>
    
        </div> */}


        </div>



</div>



))}


        </div>

      

      



      


        
        
      </div>

  

<div style={{
   //borderTop:"2px solid "+Theme.primary,
   width:"100%",
   margin:"20px 0px"
}}>

</div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
         
          justifyContent: "center",
        }}
      >
        <LoadingBtn
          act={lod?()=>{}:() => {
            submitProduct();
          }}
          lod={lod}
          text={"تعديل الكميات"}
        />
      </div>
    </div>
  );
}

export default EditProduct;
