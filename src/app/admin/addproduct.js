"use client";
import { CldUploadWidget } from 'next-cloudinary';
import React from "react";
import { useContext, useEffect, useState,useRef } from "react";
import { Theme, API_URL, CURRENCY } from "../local";
import InputEl from "../comps/inputel";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import LoadingBtn from "../comps/loadingbtn";
import { FaPlusCircle, FaPlusSquare } from "react-icons/fa";
import { AuthCon } from "../contexts/AuthCon";
import { BsX } from "react-icons/bs";

function AddProduct(props) {
  const ls = require("local-storage");
  const { logindata, logoutUser } = useContext(AuthCon);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [logged, setLogged] = useState(0);
  const [userData, setUserdata] = useState(null);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const firstRenderRef = useRef(true);
  const [cats, setCats] = useState([]);
  const [resource, setResource] = useState();
  const [namear, setNamear] = useState("");
  const [sizeSelect, setSizeselect] = useState([]);
  const [colorSelect, setColorselect] = useState([]);
  const [varients,setVarients] = useState([]);
  const [nameen, setNameen] = useState("");
  const [descar, setDescar] = useState("");
  const [code, setCode] = useState("");
  const [uimg,setUimg] = useState([]);
  const [descen, setDescen] = useState("");
  const [subc, setSubc] = useState(null);
  const [imgs, setImgs] = useState([]);
  const [color, setcolor] = useState(null);
  const [size, setSize] = useState(null);
  const [price, setPrice] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [stock, setStock] = useState(null);
  const [lod, setlod] = useState(false);
  const[imgLod,setImglod] = useState(false);
  const isLogged = useSelector(
    (state) => state.root.auth.data && state.root.auth.data
  );
  const [products, setProducts] = useState([]);

  const [eff, setEff] = useState(true);
  const [refr, setRefr] = useState(true);

  const [formData, setFormData] = useState({
    imgs: "",
  });

  const [files, setFiles] = useState([]);
  useEffect(() => {
    // loginval();


    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      if (eff) {
        getColors();
      }
    } else {
      //orderhandler(getQueryVariable("orderid"));
      setRefr(false);        
    }

// console.log(props.pid,"sssssssssssssssssssssssssssssss")



  }, [eff, refr]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleSizeRemove = (index) => {
    console.log(index);
    let oldar = varients;
    oldar.splice(index, 1);
    console.log(oldar);
    setVarients(oldar);
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


  function oldPrice(newPrice, discountPercentage) {
    const discountFactor = 1 - (discountPercentage / 100);
    const oldPrice = newPrice / discountFactor;
    return parseInt(oldPrice);
  }

const handleProductFilling = ()=>{

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
    console.log("proddddddddd",data)
   
    setNamear(data.data.attributes.name_ar)
    setNameen(data.data.attributes.name_en);
    setDescar(data.data.attributes.description_ar)
    setDescen(data.data.attributes.description_en)
    let colorarr = [];
    data.data.attributes.varients.data[0].attributes.colors.data.forEach(element => {
      console.log("colors",element.id);
      colorarr.push(element.id);
      setColorselect(colorarr);
    });
    
     setSubc(data.data.attributes.subcatagory.data&&data.data.attributes.subcatagory.data.id);
    // setVarients(data.data.attributes.varients&&data.data.attributes.varients.data[0].id);
    // setPrice(data.data.attributes.varients&&data.data.attributes.varients.data[0].attributes.price);
   // setStock(data.data.attributes.varients&&data.data.attributes.varients.data[0].attributes.stock);
     //setCode(data.data.attributes.varients&&data.data.attributes.varients.data[0].attributes.code);
     let oldarr = varients;
     data.data.attributes.varients.data.forEach(element => {
      oldarr.push({size:element.attributes.sizes.data[0].id,stock:element.attributes.stock,price:element.attributes.price,discount:element.attributes.old_price,color:element.attributes.colors.data[0].id});
   
     });

     setVarients(oldarr);
     setEff(false);
     setRefr(!refr);
  
  })
  .then(() => {
     
    props.setLod(false);
    setlod(false)
  });




}


  const handleSizesSelect = (vari, ind) => {
    for (let index = 0; index < sizes.length; index++) {
      if (sizes[index].id == vari.size) {
        return (
          <div className="flex mx-1 my-4 flex-col justify-center min-w-32 items-center space-y-1 text-sm border-2 border-gray-400 p-1 rounded-md">
           

            <div className='mt-2 font-bold'>{sizes[index].name_ar} ({sizes[index].icon}) </div>
            <div className='flex justify-around w-full ' ><div className='line-through font-bold' >{ oldPrice(vari.price,vari.discount) } {CURRENCY} </div> 
            <div className='text-moon-200 font-bold' >{vari.price} {CURRENCY} </div> </div>
            <div>الخصم:{vari.discount} % </div>
            <div>الكمية:{vari.stock}</div>
            <div>
              {handleColorSelect(vari.color)}
            </div>
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

  const handleColorSelect = (color) => {
    for (let index = 0; index < colors.length; index++) {
      if (colors[index].id == color) {
        return (
          <div
            style={{}}
            className="flex p-3 rounded-md mx-1 text-sm flex-row space-x-1 justify-between items-center "
          >
            <div className="  font-bold ml-1 px-3 py-0.5 rounded-md  ">
              {colors[index].name_ar}
            </div>
            <div style={{backgroundColor:colors[index].colorCode}} className='w-6 h-6 rounded-full' ></div>
          </div>
        );
      }
    }
  };

  const uploadMedia = async () => {
    if (lod || imgLod || !files || files.length === 0) {
      return;
    }


    
  
    setImglod(true);
    const postData = new FormData();
    files.forEach((file) => {
      postData.append("files", file);
    });
  
    try {
      const response = await axios.post(`${API_URL}upload`, postData, {
        headers: {
          Authorization: "Bearer " + isLogged.data.jwt,
        },
      });
  
      const uploadedImages = response.data.map((img) => ({
        name: img.name,
        url: img.url,
        thumb: `${API_URL}${img.url}`,
        size: img.size,
        id: img.id,
      }));
  
      setResource(uploadedImages);
      setImglod(false);
      return uploadedImages
      // submitProduct(uploadedImages);
    } catch (err) {
      console.error("Image upload failed", err);
      setImglod(false);
    }
  };
  


  // console.log("uploading token:", isLogged?.data?.jwt);

  // for (let i = 0; i < files.length; i++) {
  //   const postData = new FormData();
  //   files.forEach(file => {
  //     postData.append("files", file);
  //   });
  
  //   axios.post(`${API_URL}upload`, postData,{
  //     headers: {
  //       Authorization: "Bearer " + isLogged.data.jwt,
  //       // Note: DO NOT set Content-Type here; let axios set it automatically for multipart/form-data
  //     },
  //   })
  //     .then((response) => {
  //       const uploadedImages = response.data.map((img) => ({
  //         name: img.name,
  //         url: img.url,
  //         thumb: `${API_URL}${img.url}`,
  //         size: img.size,
  //         id: img.id,
  //       }));
        
  //       setResource(uploadedImages); 
  //       setImglod(false);
  //       // submitProduct(uploadedImages); 
  //     })
  //     .catch((err) => {
  //       console.error("Image upload failed", err);
  //       setImglod(false);
  //     });
  
  //   break; 
  // }
  
  const deleteEntry = (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + isLogged.data.jwt,
      },
    };

    fetch(`${API_URL}products/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        getProducts();
      })
      .then(() => {});
  };

  const handleStatus = (status, id) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + isLogged.data.jwt,
      },
      body: JSON.stringify({
        status: !status,
      }),
    };

    fetch(`${API_URL}products/${id} ?func=EditStatus`, requestOptions)
      .then((response) => response.json())
      .then((data) => {})
      .then(() => {
        getProducts();
      });
  };

  const getProducts = () => {
    setlod(true);
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + isLogged.data.jwt,
      },
    };
    fetch(`${API_URL}products?func=getAllProductsAdmin`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .then(() => {
        setlod(false);
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

    fetch(`${API_URL}products?func=getSizesAdmin`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        //  console.log("siiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",data.data)
        setSizes(data);
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
        // "Authorization": 'Bearer ' + ls.get("atkn")
      },
    };

    fetch(`${API_URL}subcatagories?func=getAllSubcat`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setCats(data);
      })
      .then(() => {

        
    if(props.pid){
      handleProductFilling();
          }else{
            props.setLod(false)
          }

       
      });
  };

  useEffect(() => {
    console.log("here isthe resource " ,resource);

  },[resource])



  const submitProduct = (images) => {
    if (lod || imgLod || !images) return;
  
    if (
      namear === "" || nameen === "" || descar === "" || descen === "" ||
      subc == null || code === "" || images.length === 0
    ) {
      props.notifi("error", "جميع الحقول مطلوبة");
      return;
    }
  
    setlod(true);

    const formattedVarients = varients.map((variant) => ({
      size: parseInt(variant.size, 10),
      stock: parseInt(variant.stock, 10),
      price: parseInt(variant.price, 10),
      // discount: parseInt(variant.discount, 10),
      discount: parseFloat(variant.discount),

      color: parseInt(variant.color, 10),
    }));
  
    const imageRelationData = images.map(img => ({ id: img.id }));

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + isLogged.data.jwt,
      },
      body: JSON.stringify({
        nameen,
        namear,
        descen,
        descar,
        subc,
        code,
        varients: JSON.stringify(formattedVarients), 
        imgs: imageRelationData,
      }),
    };

    console.log("prequest load ",
      {
        nameen,
        namear,
        descen,
        descar,
        subc,
        code,
        varients,
        imgs: imageRelationData,
      }
    )
  console.log("variants being sent",varients)
console.log("images being sent",images);

  fetch(`${API_URL}products?func=AddProduct`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Product created:", data);
        props.notifi("success", "تمت إضافة المنتج");
        setlod(false);
      })
      .catch((err) => {
        console.log("product created", data)
        console.error("Failed to submit product:", err.data);
        props.notifi("error", "فشل إضافة المنتج");
        setlod(false);
      });
  };
  


  const addvarient = ()=>{
    if( stock == null ||
      price == null ||size==null||color==null){
        props.notifi("error","السعر و المقاس و الكمية واللون  حقول مطلوبة")
       return
      }

      let oldarr = varients;
     oldarr.push({size:size,stock:stock,price:price,discount:discount,color:color});
      setVarients(oldarr);
      setEff(false);
      setRefr(!refr);
      console.log(varients);

  }

  return (
    <div dir="rtl" className="w-full max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-800">إضافة منتج جديد</h1>
          <button
            onClick={() => props.setpage(2)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-gray-500 text-sm">أضف معلومات المنتج والصور والخيارات</p>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-moon-200">
              <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
            المعلومات الأساسية
          </h2>
          <div className="space-y-4">
            <InputEl
              value={namear}
              outputfunc={(val) => {
                setNamear(val);
              }}
              label={"إسم المنتج (العربية)"}
            />
            
            <InputEl
              value={nameen}
              outputfunc={(val) => {
                setNameen(val);
              }}
              label={"إسم المنتج (الإنجليزية)"}
            />
            
            <InputEl
              value={code}
              outputfunc={(val) => {
                setCode(val);
              }}
              num={false}
              label={"كود المنتج"}
            />
            
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
        </div>

        {/* Description Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-moon-200">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
            الوصف
          </h2>
          <div className="space-y-4">
            <InputEl
              value={descar}
              outputfunc={(val) => {
                setDescar(val);
              }}
              label={"وصف المنتج (العربية)"}
            />
            
            <InputEl
              value={descen}
              outputfunc={(val) => {
                setDescen(val);
              }}
              label={"وصف المنتج (الإنجليزية)"}
            />
          </div>
        </div>
      </div>

      {/* Images Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-moon-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          صور المنتج
        </h2>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-moon-200 transition-colors bg-gray-50">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              const filesArray = Array.from(e.target.files);
              console.log("Selected files:", filesArray); 
              setFiles(filesArray);
            }}
            className="block w-full text-sm text-gray-600
                       file:mr-4 file:py-2.5 file:px-4
                       file:rounded-lg file:border-0
                       file:text-sm file:font-semibold
                       file:bg-gradient-to-r file:from-moon-200 file:to-moon-300
                       file:text-white
                       hover:file:from-moon-300 hover:file:to-moon-200
                       file:cursor-pointer file:transition-all file:shadow-sm"
          />
          
          {files.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {files.map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    className="rounded-lg w-full h-24 object-cover border-2 border-gray-200 group-hover:border-moon-200 transition-colors shadow-sm"
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all flex items-center justify-center">
                    <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">{index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pricing & Variants Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-moon-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
          </svg>
          السعر والخيارات
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <InputEl
            value={price}
            outputfunc={(val) => {
              setPrice(val);
            }}
            num={true}
            label={"سعر البيع"}
          />
          
          <InputEl
            value={discount}
            outputfunc={(val) => {
              setDiscount(val);
            }}
            num={true}
            label={"نسبة الخصم %"}
          />
          
          <InputEl
            value={stock}
            outputfunc={(val) => {
              setStock(val);
            }}
            num={true}
            label={"الكمية"}
          />
          
          <InputEl
            value={size}
            outputfunc={(val) => {
              setSize(val)
              console.log(val)
              setEff(false);
              setRefr(!refr);
            }}
            iden={"size"}
            data={sizes}
            iscats={true}
            select={true}
            label={"المقاس"}
          />
        </div>

        <div className="mb-6">
          <InputEl
            value={color}
            outputfunc={(val) => {
              console.log(val);
              setcolor(val);
            }}
            iden={"color"}
            data={colors}
            select={true}
            iscats={true}
            label={"اللون"}
          />
        </div>

        {/* Add Variant Button */}
        <div className="flex justify-end mb-6">
          <LoadingBtn
            color={Theme.primary}
            act={()=>{ addvarient()}}
            icon={<FaPlusSquare />}
            lod={null}
            disabled={true}
            text={"إضافة الخيار"}
          />
        </div>

        {/* Variants Display */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">خيارات المنتج المضافة</h3>
          {varients.length == 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12 mb-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
              </svg>
              <p className="text-sm">لم يتم إضافة خيارات بعد</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {varients && varients.map((vari, index) => handleSizesSelect(vari, index))}
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex justify-center">
        <LoadingBtn
          color={imgLod || varients.length === 0 ? "grey" : Theme.primary}
          act={async () => {
            if (!resource || resource.length === 0) {
              const uploadedImages = await uploadMedia();
              if (uploadedImages) {
                submitProduct(uploadedImages);
              } else {
                props.notifi("error", "فشل رفع الصور");
              }
            } else {
              submitProduct(resource);
            }
          }}
          icon={<FaPlusCircle />}
          lod={lod}
          disabled={imgLod || varients.length === 0}
          text={"إضافة المنتج"}
        />
      </div>
    </div>
  );
}

export default AddProduct;
