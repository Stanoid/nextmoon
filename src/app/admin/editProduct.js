"use client";

import React from "react";
import { useContext, useEffect, useState } from "react";
import { Theme, API_URL, CURRENCY } from "../local";
import InputEl from "../comps/inputel";
import axios from "axios";
import { BsX } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { TiThMenu } from "react-icons/ti";
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
      getColors();
    }
    
  }, [eff,refr]);


  const addVarient= ()=>{

    if(!stock||!price||!color||!size){
alert("all f r r");
return;
    }


    let sizeob = null;
    let colorob= null;


    for (let i = 0; i < colors.length; i++) {


      if(colors[i].id==color){
        
        colorob = colors[i]
      }
      
    }

    for (let j = 0; j < sizes.length; j++) {  
            if(sizes[j].id==size){
              
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

    
   setEff(false)
   setRefr(!refr);

  }


  const handleSizeRemove = (index) => {
    console.log(index);
    let oldar = sizeSelect;
    oldar.splice(index, 1);
    console.log(oldar);
    setSizeselect(oldar);
    setEff(false);
    setRefr(!refr);
  };

  const handleColorRemove = (index) => {
    console.log(index);
    let oldar = colorSelect;
    oldar.splice(index, 1);
    console.log(oldar);
    setColorselect(oldar);
    setEff(false);
    setRefr(!refr);
  };

  const handleSizesSelect = (size, ind) => {
    for (let index = 0; index < sizes.length; index++) {
      if (sizes[index].id == size) {
        return (
          <div className="flex mx-1 flex-col justify-center items-center space-y-1 text-sm border-2 border-gray-400 p-1 rounded-md">
            {/* <div>
        {sizes[index].attributes.icon}
        </div> */}

            <div>{sizes[index].attributes.name_ar}</div>
            <div
              onClick={() => {
                handleSizeRemove(ind);
              }}
              className=" flex group px-0.5 rounded-sm cursor-pointer hover:bg-red-300   transition-colors justify-center
         items-center text-base  text-white "
            >
              <div className=" text-red-500 group-hover:text-white  text-sm ">
                حذف
              </div>

              <div className="w-4 h-4 mr-0.5 flex items-center justify-center  rounded-full bg-red-300">
                <BsX />
              </div>
            </div>
          </div>
        );
      }
    }
  };

  const handleColorSelect = (color, ind) => {
    for (let index = 0; index < colors.length; index++) {
      if (colors[index].id == color) {
        return (
          <div
            style={{ backgroundColor: colors[index].colorCode }}
            className="flex p-3 rounded-md mx-1 text-sm flex-col space-y-1 justify-center items-center "
          >
            <div className=" bg-black/50 text-white px-3 py-0.5 rounded-md  ">
              {colors[index].name_ar}
            </div>

            <div
              onClick={() => {
                handleColorRemove(ind);
              }}
              className=" flex group px-0.5 rounded-sm cursor-pointer hover:bg-red-300   transition-colors justify-center
         items-center text-base  text-white "
            >
              <div className=" text-red-500 group-hover:text-white  text-sm ">
                حذف
              </div>

              <div className="w-4 h-4 mr-0.5 flex items-center justify-center  rounded-full bg-red-300">
                <BsX />
              </div>
            </div>
          </div>
        );
      }
    }
  };

  const getProducts = () => {

  setlod(true)
  
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
        let sizearr = [];
        data.data.attributes.varients.data[0].attributes.sizes.data.forEach(element => {
          console.log(element.id);
          sizearr.push(element.id);
          setSizeselect(sizearr);
        });

        let colorarr = [];
        data.data.attributes.varients.data[0].attributes.colors.data.forEach(element => {
          console.log("colors",element.id);
          colorarr.push(element.id);
          setColorselect(colorarr);
        });
        
         setSubc(data.data.attributes.subcatagory.data&&data.data.attributes.subcatagory.data.id);
         setVarients(data.data.attributes.varients&&data.data.attributes.varients.data[0].id);
         setPrice(data.data.attributes.varients&&data.data.attributes.varients.data[0].attributes.price);
         setStock(data.data.attributes.varients&&data.data.attributes.varients.data[0].attributes.stock);
         setCode(data.data.attributes.varients&&data.data.attributes.varients.data[0].attributes.code);
         
         let varientDeleteArray = []


         for (let i = 0; i < data.data.attributes.varients.data.length; i++) {
      varientDeleteArray.push(data.data.attributes.varients.data[i].id);

          
         }


         setVarientDelete(varientDeleteArray);

         
       
      })
      .then(() => {
         
        props.setLod(false);
        setlod(false)
      });
  };

  const getColors = () => {
    props.setLod(true);
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + isLogged.data.jwt,
      },
    };
    fetch(`${API_URL}products?func=getColorsAdmin`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setColors(data);
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
        Authorization: "Bearer " + isLogged.data.jwt,
      },
    };

    fetch(`${API_URL}sizes`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        //  console.log("siiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",data.data)
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
        // Authorization: "Bearer " + udata.data.jwt,
      },
    };

    fetch(`${API_URL}subcatagories?func=getAllSubcat`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        
        setCats(data);
      })
      .then(() => {
        getProducts();
      });
  };


  const removeVHandler = (index)=>{

    
   
    let temparv = varients
  
     temparv.splice(index,1);
       
    setVarients(temparv);
    setEff(false)
    setRefr(!refr);
    




    





  }


  const submitProduct = (imgsob) => {
    
   setlod(true)

    //
    if (
      namear == "" ||
      nameen == "" ||
      descar == "" ||
      colorSelect.length == 0 ||
      sizeSelect.length == 0 ||
      descen == "" ||
      subc == null ,
      price==null,
      code==null,
      stock==null
    ) {
      alert("empty feilds");
      setlod(false);
      return;
    } else {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + udata.data.jwt,
        },
        body: JSON.stringify({
          nameen: nameen,
          namear: namear,
          color:colorSelect,
          size:sizeSelect,
          price:price,
          code:code,
          stock:stock,
          varient:varients,
          descen: descen,
          descar: descar,
          subc: subc,
        //   vartoDelete: varientDelete,
        //  varients:varients
        
        }),
      };


     

      fetch(`${API_URL}products/${props.pid}?func=EditProduct`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          
        })
        .then(() => {
          props.notifi("success","تم تعديل المنتج")
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
          
          fontWeight: "bold",
          alignSelf: "flex-start",
          borderBottom: "3px solid " + Theme.primary,
          marginBottom: 15,
        }}
      >
        تعديل منتج :
      </div>

      <div
        style={{
          width: "100%",
          display: "grid",
          gap: 10,
          gridTemplateAreas: `
' namear  namear  nameen nameen  ' 
'descriptionAr descriptionAr descriptionAr descriptionAr'
'descriptionEn descriptionEn descriptionEn descriptionEn'
'cat . . .'
'size sizeSelect sizeSelect sizeSelect'
'color colorSelect colorSelect colorSelect'
'price stock code code'

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



{/* <div style={{ gridArea: "size" }}>
          <InputEl
            value={size}
            outputfunc={(val) => {
              if (sizeSelect.includes(parseInt(val))) {
                return;
              }
              let oldSizes = sizeSelect;
              oldSizes.push(parseInt(val));
              setSizeselect(oldSizes);
              setEff(false);
              setRefr(!refr);
            }}
            iden={"size"}
            data={sizes}
            select={true}
            label={"المقاس"}
          />
        </div> */}

        <div style={{ gridArea: "color" }}>
          <InputEl
            value={color}
            outputfunc={(val) => {
              if (colorSelect.includes(parseInt(val))) {
                return;
              }
              let oldColors = colorSelect;
              oldColors.push(parseInt(val));
              setColorselect(oldColors);
              setEff(false);
              setRefr(!refr);
            }}
            iden={"color"}
            data={colors}
            select={true}
            iscats={true}
            label={"اللون"}
          />
        </div>

        {/* <div
          className="bg-gray-100  rounded-md  flex justify-center items-center "
          style={{ gridArea: "sizeSelect" }}
        >
          {sizeSelect.length == 0 ? (
            <div className="flex w-full text-gray-400 h-full justify-center items-center">
              إختر مقاسات
            </div>
          ) : (
            sizeSelect &&
            sizeSelect.map((size, index) => handleSizesSelect(size, index))
          )}
        </div> */}

        <div
          className="bg-gray-100 rounded-md  flex justify-center items-center "
          style={{ gridArea: "colorSelect" }}
        >
          {colorSelect.length == 0 ? (
            <div className="flex w-full text-gray-400 h-full justify-center items-center">
              إختر الألوان
            </div>
          ) : (
            colorSelect &&
            colorSelect.map((color, index) => handleColorSelect(color, index))
          )}
        </div>

{/* 
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
      
        <div style={{ gridArea: "code" }}>
          <InputEl
            value={code}
            outputfunc={(val) => {
              //setStock(val);
              setCode(val);
            }}
            num={false}
            label={"كود المنتج"}
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
        </div> */}





        {/* <div style={{ gridArea: "varients" }}>

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
,backgroundColor:Theme.primary,color:"white",fontSize:20}}>{varient.attributes.sizes.data[0]&&varient.attributes.sizes.data[0].attributes.icon}</div>
<div style={{width:35,height:35,
    marginLeft:-10,marginTop:-5
    ,borderRadius:100,backgroundColor:varient.attributes.colors.data[0]&&varient.attributes.colors.data[0].attributes.colorCode}} ></div>
</div>
<div style={{display:"flex",alignItems:"center",justifyContent:"flex",flexDirection:"column"}}>
<div style={{fontWeight:"bold",padding:10,paddingBottom:0,fontSize:13}}>
{varient.attributes.sizes.data[0]&&varient.attributes.sizes.data[0].attributes.name_en} <span> / </span> 
{varient.attributes.colors.data[0]&&varient.attributes.colors.data[0].attributes.name_ar}
</div>
<div style={{color:"grey",fontStyle:'oblique',fontSize:13}}>
    {varient.attributes.price} {CURRENCY}
</div>

<div style={{color:"grey",fontStyle:'oblique',fontSize:13}}>
    {varient.attributes.stock} PCs
</div>
</div>

<div className="py-1 px-1.5 bg-red-600  rounded-sm text-white text-sm" onClick={()=>{removeVHandler(index)}} style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
<FaTrash style={{marginRight:10}}/> 
حذف
</div>


</div>
))}
      </div>

      </div>

        </div> */}

        {/* <div style={{ gridArea: "price" }}>
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
        </div> */}

        
      </div>

      {/* <div  className="shadow-sm" onClick={()=>{addVarient()}}  style={{backgroundColor:Theme.secondary,cursor:"pointer",color:"white",borderRadius:5,padding:"5px 10px",margin:"20px 0px",display:"flex",alignItems:"center",justifyContent:"center"}}>
       <FaPlus/>   <div style={{marginLeft:10}}> إضافة خيار  </div> 
      </div> */}


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
