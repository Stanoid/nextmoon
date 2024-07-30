"use client";

import React from "react";
import { useContext, useEffect, useState } from "react";
import { Theme, API_URL, CURRENCY } from "../local";
import InputEl from "../comps/inputel";
import axios from "axios";

import { useRouter } from "next/navigation";
import { TiThMenu } from "react-icons/ti";
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

  const [namear, setNamear] = useState("");
  const [nameen, setNameen] = useState("");
  const [descar, setDescar] = useState("");
  const [descen, setDescen] = useState("");
  const [subc, setSubc] = useState(null);
  const [imgs, setImgs] = useState([]);
  const [color, setcolor] = useState(null);
  const [size, setSize] = useState(null);
  const [price, setPrice] = useState(null);
  const [stock, setStock] = useState(null);
  const [lod, setlod] = useState(false);
  const [varientDelete,setVarientDelete] = useState([]);

  const [eff, setEff] = useState(true);
  const [refr, setRefr] = useState(true);

  const [varients,setVarients]= useState([])
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    imgs: "",
  });

  const [files, setFiles] = useState([]);
  useEffect(() => {
    // loginval();
    if(eff){
      getColors();
    }
    
  }, [eff,refr]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const uploadMedia = () => {
    if (
      namear == "" ||
      nameen == "" ||
      descar == "" ||
      descen == "" ||
      subc == null ||
      color == null||
      size == null ||
      stock == null||
      price == null||
      files == []
    ) {
      alert("empty feilds");
      return;
    }

    if (files == []) {
      alert("Please upload images");
      return;
    }

    setlod(true);

    var tmepar = [];

    
    for (let i = 0; i < files.length; i++) {
      const postData = new FormData();
      postData.append("files", files[i]);
      //console.log("postdata",postData);
      axios
        .post("http://localhost:1337/api/upload", postData)
        .then((response) => {
          const imageId = response.data[0].id;
          tmepar[i] = response.data[0].url;
          console.log("uhrurhguhrughrughug", response.data[0].url);
          setImgs(tmepar);
        })
        .then(() => {
          if (i == files.length - 1) {
            submitProduct();
          }
        });
    }
 
  };


  const addVarient= ()=>{

    if(!stock||!price||!color||!size){
alert("all f r r");
return;
    }


    let sizeob = null;
    let colorob= null;


    for (let i = 0; i < colors.length; i++) {


      if(colors[i].id==color){
        console.log("color ob",colors[i])
        colorob = colors[i]
      }
      
    }

    for (let j = 0; j < sizes.length; j++) {  
            if(sizes[j].id==size){
              console.log("size ob",sizes[j])
              sizeob = sizes[j];
            }
            
          }

    


    let tempo = varients;
    tempo.push(
  {attributes:{
    price:price,
    stock:stock,
    size: {
      "id": sizeob.id,
     "data":{
      "attributes": {
        "status": true,
        "name_ar": sizeob.attributes.name_ar,
        "name_en": sizeob.attributes.name_en,
        "icon": sizeob.attributes.icon
    }
     }
  },
  color: {
    "id": colorob.id,
    "data":{
      "attributes": {
        "status": true,
        "name_en": colorob.attributes.name_ar,
        "name_ar": colorob.attributes.name_en,
        "colorCode": colorob.attributes.colorCode,
       
    }
    }
}

  }}


    )

    setVarients(tempo)

    console.log("varrrrrrrrrrrrrrrrrrrrs",varients)
   setEff(false)
   setRefr(!refr);

  }

  const getProducts = () => {

  setlod(true)
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ls.get("atkn"),
      },
    };
    fetch(`${API_URL}products/${props.pid}?func=getFullProduct`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Product speced data ", data.data);
       // setProducts(data.data);
        setNamear(data.data.attributes.name_ar)
        setNameen(data.data.attributes.name_en);
        setDescar(data.data.attributes.description_ar)
        setDescen(data.data.attributes.description_en)
     
         setSubc(data.data.attributes.subcatagory.data&&data.data.attributes.subcatagory.data.id);
         setVarients(data.data.attributes.varients&&data.data.attributes.varients.data);
         let varientDeleteArray = []


         for (let i = 0; i < data.data.attributes.varients.data.length; i++) {
      varientDeleteArray.push(data.data.attributes.varients.data[i].id);

          
         }


         setVarientDelete(varientDeleteArray);

         
         
         setlod(false);

      })
      .then(() => {
       
      });
  };

  const getColors = () => {
setlod(true);
    if(!eff){
      return
        }

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ls.get("atkn"),
      },
    };

    fetch(`${API_URL}colors`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("color data ", data.data);
        setColors(data.data);
      })
      .then(() => {
        getSizes();
      });
  };

  const getSizes = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ls.get("atkn"),
      },
    };

    fetch(`${API_URL}sizes`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("sizes data ", data.data);
        setSizes(data.data);
      })
      .then(() => {
        getCats();
      });
  };

  const getCats = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + ls.get("atkn"),
      },
    };

    fetch(`${API_URL}subcatagories?func=getAllSubcat`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("sub catagories data ", data);
        setCats(data);
      })
      .then(() => {
        getProducts();
      });
  };


  const removeVHandler = (index)=>{

    console.log(index);
   
    let temparv = varients
  
     temparv.splice(index,1);
       
    setVarients(temparv);
    setEff(false)
    setRefr(!refr);
    console.log("aaaa",varients)




    





  }


  const submitProduct = (imgsob) => {
    console.log("vardelete",varientDelete);
   setlod(true)

    //console.log("aaaaa",imgsob);
    if (
      namear == "" ||
      nameen == "" ||
      descar == "" ||
      descen == "" ||
      subc == null 
    ) {
      alert("empty feilds");
      setlod(false);
      return;
    } else {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + ls.get("atkn"),
        },
        body: JSON.stringify({
          nameen: nameen,
          namear: namear,
          descen: descen,
          descar: descar,
          subc: subc,
          vartoDelete: varientDelete,
         varients:varients
        
        }),
      };


     

      fetch(`${API_URL}products/${props.pid}?func=EditProduct`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log("added product data", data);
        })
        .then(() => {

          props.setpage(2);
          setlod(false);
         
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
          fontSize: 25,
          fontWeight: "bold",
          alignSelf: "flex-start",
          borderBottom: "5px solid " + Theme.primary,
          marginBottom: 15,
        }}
      >
        Edit Product:
      </div>

      <div
        style={{
          width: "70%",
          display: "grid",
          gap: 10,
          gridTemplateAreas: `
' namear  namear  nameen nameen  ' 
'descriptionAr descriptionAr descriptionAr descriptionAr'
'descriptionEn descriptionEn descriptionEn descriptionEn'
'cat . . .'
'varients  varients  varients varients '
'color size price stock'
`,
        }}
      >
        <div style={{ gridArea: "namear" }}>
          <InputEl
            value={namear}
            outputfunc={(val) => {
              setNamear(val);
            }}
            label={"إسم المنتج (العربية)"}
          />
        </div>

        <div style={{ gridArea: "nameen" }}>
          <InputEl
            value={nameen}
            outputfunc={(val) => {
              setNameen(val);
            }}
            label={"إسم المنتج (الإنجليزية)"}
          />
        </div>

        <div style={{ gridArea: "descriptionAr" }}>
          <InputEl
            value={descar}
            outputfunc={(val) => {
              setDescar(val);
            }}
            label={"وصف المنتج (العربية)"}
          />
        </div>

        <div style={{ gridArea: "descriptionEn" }}>
          <InputEl
            value={descen}
            outputfunc={(val) => {
              setDescen(val);
            }}
            label={"وصف المنتج (الإنجليزية)"}
          />
        </div>

        <div style={{ gridArea: "cat" }}>
          <InputEl
            value={subc}
            outputfunc={(val) => {
              setSubc(val);
            }}
            select={true}
            iscats={true}
            data={cats}
            label={"الفئة"}
          />
        </div>
{/* 
        <div style={{ gridArea: "images" }}>
          <div class="w-full">
            <form onSubmit={handleSubmit} id="imgForm">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Images
              </label>

              <input
                onChange={(e) => {
                  setFiles(e.target.files);
                }}
                class="appearance-none block w-full bg-gray-200 text-gray-700 border
     border-gray-200 rounded py-3 px-3 leading-tight focus:outline-none focus:bg-white
      focus:border-gray-500"
                id="grid-last-name"
                accept="image/*"
                name="imgs"
                type="file"
                multiple
                placeholder={"Images"}
              />

              <button type="submit">Submit</button>
            </form>
          </div>
        </div> */}


        <div style={{ gridArea: "varients" }}>

        <div
        dir="rtl"
        style={{
          
          padding: 10,
          fontSize: 20,
          fontWeight: "bold",
          alignSelf: "flex-start",
          borderBottom: "2px solid " + Theme.secondary,
          marginBottom: 15,
        }}
      >
      <div>
      خيارات المنتج :
        </div> 

      <div  style={{display:"grid", gap: 5,
          gridTemplateAreas: `
'. . . .' 
'. . . .' 

`,}}>
      {varients&&varients.map((varient,index)=>(
        <div  dir="ltr"   className='shadow-md flex-row lg:flex-col md:flex-col sm:flex-row ' style={{padding:"15px 10px"
,borderRadius:10,margin:7,cursor:"pointer",
display:"flex",justifyContent:"center",alignItems:"center"
}}  key={varient.id} >



<div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
<div  style={{width:30,height:30,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",
border:"3px solid white",marginRight:-10,zIndex:10,marginBottom:-5
,backgroundColor:Theme.primary,color:"white",fontSize:20}}>{varient.attributes.size.data&&varient.attributes.size.data.attributes.icon}</div>
<div style={{width:35,height:35,
    marginLeft:-10,marginTop:-5
    ,borderRadius:100,backgroundColor:varient.attributes.color.data&&varient.attributes.color.data.attributes.colorCode}} ></div>
</div>
<div style={{display:"flex",alignItems:"flex-end",justifyContent:"flex",flexDirection:"column"}}>
<div style={{fontWeight:"bold",padding:10,paddingBottom:0,fontSize:13}}>
{varient.attributes.size.data&&varient.attributes.size.data.attributes.name_en} <span> / </span> {varient.attributes.color.data&&varient.attributes.color.data.attributes.name_ar}
</div>
<div style={{color:"grey",fontStyle:'oblique',fontSize:13}}>
    {varient.attributes.price} {CURRENCY}
</div>

<div style={{color:"grey",fontStyle:'oblique',fontSize:13}}>
    {varient.attributes.stock} PCs
</div>
</div>

<div onClick={()=>{removeVHandler(index)}} style={{padding:10,marginTop:10,fontSize:15,backgroundColor:"red",borderRadius:5,color:"white",display:"flex",alignItems:"center",justifyContent:"center"}}>
<FaTrash style={{marginRight:10}}/> 
حذف
</div>


</div>
))}
      </div>

      </div>

        </div>

        <div style={{ gridArea: "price" }}>
          <InputEl
            value={price}
            outputfunc={(val) => {
              setPrice(val);
            }}
            num={true}
            label={"السعر"}
          />
        </div>

        <div style={{ gridArea: "stock" }}>
          <InputEl
            value={stock}
            outputfunc={(val) => {
              setStock(val);
            }}
            num={true}
            label={"الكمية"}
          />
        </div>

        <div style={{ gridArea: "color" }}>
          <InputEl
            value={color}
            outputfunc={(val) => {
              setcolor(val);
            }}
            iden={"color"}
            data={colors}
            select={true}
            label={"اللون"}
          />
        </div>

        <div style={{ gridArea: "size" }}>
          <InputEl
            value={size}
            outputfunc={(val) => {
              setSize(val);
            }}
            iden={"size"}
            data={sizes}
            select={true}
            label={"المقاس"}
          />
        </div>

        
      </div>

      <div  className="shadow-sm" onClick={()=>{addVarient()}}  style={{backgroundColor:Theme.secondary,cursor:"pointer",color:"white",borderRadius:5,padding:"5px 10px",margin:"20px 0px",display:"flex",alignItems:"center",justifyContent:"center"}}>
       <FaPlus/>   <div style={{marginLeft:10}}> إضافة خيار  </div> 
      </div>


<div style={{
   borderTop:"2px solid "+Theme.secondary,
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
          text={"تعديل المنتج"}
        />
      </div>
    </div>
  );
}

export default EditProduct;
