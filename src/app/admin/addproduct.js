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
      discount: parseInt(variant.discount, 10),
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
    <div
      dir="rtl"
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
          width: "100%",
          display: "grid",
          gap: 10,
          gridTemplateAreas: `
' namear  namear  nameen nameen  ' 
'code descriptionAr descriptionAr descriptionAr'
'descriptionEn descriptionEn descriptionEn descriptionEn'
'cat images images images'

'sizeSelect sizeSelect sizeSelect sizeSelect'
'price discount stock size'
'color . . .'
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
            label={"وصف المنتج (الإنجليزية"}
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

        <div className='bg-gray-100 ' style={{ gridArea: "images" }}>
          <div class="w-full flex justify-between items-center  h-full align-middle ">
            {/* <form onSubmit={handleSubmit} id="imgForm">
              <label
                class="block uppercase tracking-wide text-moon-200/80 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                الصور
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
            </form> */}

{/* <CldUploadWidget
  uploadPreset="minimoon"
  onQueuesStart={()=>{setImglod(true)}}

  onSuccess={(result, { widget }) => {
    
    if(result?.info){
      var oldimgs = uimg;
      oldimgs.push({
      name: result.info.original_filename,
      thumb: result.info.thumbnail_url,
      url: result.info.secure_url,
      size: result.info.size,
      id:result.info.public_id,
      });

      setResource(oldimgs);
      setImglod(false)
      
    }
  
  }}
  onQueuesEnd={(result, { widget }) => {
   // widget.close();
   setImglod(false)
   setEff(false);
      setRefr(!refr);
  }}
>
  {({ open }) => {
    function handleOnClick() {
      setResource(undefined);
      open();
    }
    return (
      <button  className='bg-gradient-to-tr  mr-4  text-gray-600 from-moon-200/60  to-moon-200/20 px-5 py-1 rounded-full ' onClick={handleOnClick}>
        {resource?"إعادة رفع":"رفع صور"}
      </button>
    );
  
  }}
</CldUploadWidget> */}
{/* <input
  type="file"
  multiple
  accept="image/*"
  onChange={(e) => {
    const filesArray = Array.from(e.target.files);
    console.log("Selected files:", filesArray); 
    setFiles(filesArray);
  }}
  className="..."
/> */}

<div className='bg-gray-100 ' style={{ gridArea: "images" }}>
          <div class="w-full flex justify-between items-center  h-full align-middle ">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              const filesArray = Array.from(e.target.files);
              console.log("Selected files:", filesArray); 
              setFiles(filesArray);
            }}
            className="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-violet-50 file:text-violet-700
                       hover:file:bg-violet-100"
          />

          <div className='flex flex-row ' >
            {/* Display selected images preview */}
            {files.map((file, index) => (
              <div key={index} className="mx-2 py-2">
                <img
                  className="rounded-md w-24 h-24 object-cover"
                  src={URL.createObjectURL(file)} // Create URL for local file preview
                  alt={`Preview ${index}`}
                />
              </div>
            ))}
          </div>

          </div>
        </div>

<div className='flex flex-row ' >
{/* {resource&&resource.map(img=>(

<div className='mx-2 py-2 '>
<img className='rounded-md' src={img.thumb} />
</div>
))}  */}

{/* {resource &&
  resource.map((img, idx) => (
    <div key={idx} className="mx-2 py-2">
      <img
        className="rounded-md w-24 h-24 object-cover"
        src={img.thumb ? img.thumb : `${API_URL}${img.url}`}
        alt={img.name || `image-${idx}`}
      />
    </div>
))} */}


</div>

<div onClick={()=>{console.log(resource)}}>


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
            label={"سعر البيع"}
          />
        </div>

        <div style={{ gridArea: "discount" }}>
          <InputEl
            value={discount}
            outputfunc={(val) => {
              setDiscount(val);
            }}
            num={true}
            label={"نسبة الخصم %"}
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

        <div style={{ gridArea: "size" }}>
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

        <div style={{ gridArea: "color" }}>
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



        <div
          className="bg-gray-100  rounded-md max-w-full overflow-x-scroll flex justify-start items-center "
          style={{ gridArea: "sizeSelect" }}
        >
          {varients.length == 0 ? (
            <div className="flex w-full  min-h-32 overflow-x-scroll text-gray-400 h-full justify-center items-center">
              خيارات المنتج
            </div>
          ) : (
            varients &&
            varients.map((vari, index) => handleSizesSelect(vari, index))
          )}
        </div>

        {/* <div
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
        </div> */}


      </div>

      <div
        className=""
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <div>
          <LoadingBtn
          color={Theme.primary}
            act={()=>{ addvarient()}}
            icon={<FaPlusSquare />}
            lod={null}
            disabled={true}
            text={"إضافة الخيار"}
          />
        </div>
      </div>

      <div
        className=""
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          {/* <LoadingBtn
          color={imgLod||resource==undefined||varients.length==0?"grey":Theme.primary}
            act={()=>{ submitProduct()}}
            icon={<FaPlusCircle />}
            lod={lod}
            disabled={true}
            text={"إضافة المنتج"}
          /> */}

<LoadingBtn
  color={imgLod || varients.length === 0 ? "grey" : Theme.primary}
  act={async () => {
    if (!resource || resource.length === 0) {
      const uploadedImages = await uploadMedia();
      if (uploadedImages) {
        submitProduct(uploadedImages); // Pass uploaded images
      } else {
        props.notifi("error", "فشل رفع الصور");
      }
    } else {
      submitProduct(resource); // Pass existing resource
    }
  }}
  icon={<FaPlusCircle />}
  lod={lod}
  disabled={imgLod || varients.length === 0}
  text={"إضافة المنتج"}
/>


        </div>
      </div>
    </div>
  );
}

export default AddProduct;

