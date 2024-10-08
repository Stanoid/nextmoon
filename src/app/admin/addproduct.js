"use client";
import { CldUploadWidget } from 'next-cloudinary';
import React from "react";
import { useContext, useEffect, useState } from "react";
import { Theme, API_URL, CURRENCY } from "../local";
import InputEl from "../comps/inputel";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { TiThMenu } from "react-icons/ti";
import LoadingBtn from "../comps/loadingbtn";
import { FaPlusCircle } from "react-icons/fa";
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
  const [cats, setCats] = useState([]);
  const [resource, setResource] = useState();
  const [namear, setNamear] = useState("");
  const [sizeSelect, setSizeselect] = useState([]);
  const [colorSelect, setColorselect] = useState([]);
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
    if (eff) {
      getColors();
    }
  }, [eff, refr]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

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
            style={{ backgroundColor: colors[index].attributes.colorCode }}
            className="flex p-3 rounded-md mx-1 text-sm flex-col space-y-1 justify-center items-center "
          >
            <div className=" bg-black/50 text-white px-3 py-0.5 rounded-md  ">
              {colors[index].attributes.name_ar}
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

  const uploadMedia = () => {
    if (lod) {
      return;
    }

    if (
      namear == "" ||
      nameen == "" ||
      descar == "" ||
      descen == "" ||
      subc == null ||
      colorSelect.length == 0 ||
      sizeSelect.length == 0 ||
      code == "" ||
      stock == null ||
      price == null ||
      files == []
    ) {
      // alert("empty feildsfff  ",code);
      // console.log(sizeSelect,)
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
      //
      axios
        .post(`${API_URL}upload`, postData)
        .then((response) => {
          const imageId = response.data[0].id;

          tmepar[i] = response.data[0].url;

          //    setImgs(tmepar);

          if (i == files.length - 1) {
            submitProduct(tmepar);
          }
        })
        .then(() => {});
    }
    //

    //
    //   setImgs(tmepar);
  };

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
        // "Authorization": 'Bearer ' + ls.get("atkn")
      },
    };

    fetch(`${API_URL}subcatagories?func=getAllSubcat`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setCats(data);
      })
      .then(() => {
        props.setLod(false);
      });
  };



  const submitProduct = (tmepar) => {
    //

    if(lod||imgLod|| resource== undefined){
      return
    }

  

    if (
      namear == "" ||
      nameen == "" ||
      descar == "" ||
      descen == "" ||
      subc == null ||
      colorSelect.length == 0 ||
      sizeSelect.length == 0 ||
      code == "" ||
      stock == null ||
      price == null ||
      resource== undefined
      
    ) {
      alert("empty sub feilds");
      return;
    } else {
      setlod(true)
      //setlod(true);
      //const jsonarray = JSON.stringify(imgsob);
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + isLogged.data.jwt,
        },
        body: JSON.stringify({
          nameen: nameen,
          namear: namear,
          descen: descen,
          descar: descar,
          subc: subc,
          code: code,
          color: colorSelect,
          size: sizeSelect,
          stock: stock,
          price: price,
          imgs: JSON.stringify(resource),
        }),
      };

      fetch(`${API_URL}products?func=AddProduct`, requestOptions)
        .then((response) => response.json())
        .then((data) => {})
        .then(() => {
          //  console.log(data)
          setlod(false);
          //  getProducts();
        });
    }
  };

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
'descriptionAr descriptionAr descriptionAr descriptionAr'
'descriptionEn descriptionEn descriptionEn descriptionEn'
'cat images images images'
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

<CldUploadWidget
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
    
    
    
     // { public_id, secure_url, etc }
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
</CldUploadWidget>


<div className='flex flex-row ' >
{resource&&resource.map(img=>(

<div className='mx-2 py-2 '>
<img className='rounded-md' src={img.thumb} />
</div>




))}

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

        <div style={{ gridArea: "size" }}>
          <InputEl
            value={size}
            outputfunc={(val) => {
              if (sizeSelect.includes(val)) {
                return;
              }
              let oldSizes = sizeSelect;
              oldSizes.push(val);
              setSizeselect(oldSizes);
              setEff(false);
              setRefr(!refr);
            }}
            iden={"size"}
            data={sizes}
            select={true}
            label={"المقاس"}
          />
        </div>

        <div style={{ gridArea: "color" }}>
          <InputEl
            value={color}
            outputfunc={(val) => {
              if (colorSelect.includes(val)) {
                return;
              }
              let oldColors = colorSelect;
              oldColors.push(val);
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
        </div>

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
          color={imgLod||resource==undefined?"grey":Theme.primary}
            act={()=>{ submitProduct()}}
            icon={<FaPlusCircle />}
            lod={lod}
            disabled={true}
            text={"إضافة المنتج"}
          />
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
