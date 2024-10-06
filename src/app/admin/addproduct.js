"use client";

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

  const [namear, setNamear] = useState("");
  const[sizeSelect,setSizeselect] = useState([]);
  const[colorSelect,setColorselect] = useState([])
  const [nameen, setNameen] = useState("");
  const [descar, setDescar] = useState("");
  const [code, setCode] = useState("");
  const [descen, setDescen] = useState("");
  const [subc, setSubc] = useState(null);
  const [imgs, setImgs] = useState([]);
  const [color, setcolor] = useState(null);
  const [size, setSize] = useState(null);
  const [price, setPrice] = useState(null);
  const [stock, setStock] = useState(null);
  const [lod, setlod] = useState(false);
  const isLogged = useSelector((state) => state.root.auth.data&&state.root.auth.data)
  const [products, setProducts] = useState([]);

  const [eff, setEff] = useState(true);
  const [refr, setRefr] = useState(true);


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

const handleSizesSelect =(size)=>{

  for (let index = 0; index < sizes.length; index++) {

    if(sizes[index].id==size){
      return <div className="flex flex-col justify-center items-center space-y-0.5" >
        <div>
        {sizes[index].attributes.icon}
        </div>

        <div>
        {sizes[index].attributes.name_ar}
        </div>
      </div>
    }
    
  }

}

const handleColorSelect =(color)=>{

  for (let index = 0; index < colors.length; index++) {

    if(colors[index].id==color){
      return <div className="flex flex-col justify-center items-center space-y-0.5" >
        <div style={{backgroundColor:colors[index].attributes.colorCode}} className=" w-5 h-5 rounded-full ">
        
        </div>

        <div>
        {colors[index].attributes.name_ar}
        </div>
      </div>
    }
    
  }

}



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
      color == null ||
      size == null ||
      code == "" ||
      stock == null ||
      price == null ||
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
      .then((data) => {
        
      })
      .then(() => {
        getProducts();
      });
  };

  const getProducts = () => {
    setlod(true)
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
    props.setLod(true)
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + isLogged.data.jwt,
      },
    };
    fetch(`${API_URL}colors`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        
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

  const loginval = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + isLogged.data.jwt,
      },
    };

    fetch(`${API_URL}users/me`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        

        if (data.id) {
          if (data.type == 1) {
          } else {
          }
        } else {
          setLogged(0);
          router.push("/login");
        }
      });
  };

  const submitProduct = (tmepar) => {
    
    //

    if (
      namear == "" ||
      nameen == "" ||
      descar == "" ||
      descen == "" ||
      subc == null ||
      color == null ||
      size == null ||
      code == "" ||
      stock == null ||
      price == null ||
      files == []
    ) {
      alert("empty feilds");
      return;
    } else {
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
          color: color,
          size: size,
          stock: stock,
          price: price,
          imgs: JSON.stringify(tmepar),
        }),
      };

      fetch(`${API_URL}products?func=AddProduct`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          
        })
        .then(() => {
          setlod(false)
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

     

        <div style={{ gridArea: "images" }}>
          <div class="w-full">
            <form onSubmit={handleSubmit} id="imgForm">
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

           
            </form>
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
              let oldSizes = sizeSelect;
              oldSizes.push(val)
              setSizeselect(oldSizes);
              setEff(false)
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
              let oldColors = colorSelect;
              oldColors.push(val)
              setColorselect(oldColors);
              setEff(false)
              setRefr(!refr);
            }}
            iden={"color"}
            data={colors}
            select={true}
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

        <div className="bg-gray-100 rounded-md  flex justify-center items-center " style={{ gridArea: "sizeSelect" }}>
          {sizeSelect.length==0?<div className="flex w-full text-gray-400 h-full justify-center items-center" >
           إختر مقاسات 
          </div>:
          sizeSelect&&sizeSelect.map((size,index)=>(
           <div className="mx-3 ">
           {handleSizesSelect(size)} 
           </div>
          ))
          }
      
        </div>

        <div className="bg-gray-100 rounded-md  flex justify-center items-center " style={{ gridArea: "colorSelect" }}>
          {colorSelect.length==0?<div className="flex w-full text-gray-400 h-full justify-center items-center" >
           إختر الألوان 
          </div>:
          colorSelect&&colorSelect.map((color,index)=>(
            <div className="mx-3 ">
            {handleColorSelect(color)} 
            </div>
          ))
          }
      
        </div>

      

     

        
    
      </div>

      <div className=""
        style={{
          width:"100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >

        <div>
        <LoadingBtn
          act={ lod?()=>{}:() => {
            uploadMedia();
          }}
          icon={<FaPlusCircle/>}
          lod={lod}
          text={"إضافة المنتج"}
        />
        </div>
       
      </div>

    
    </div>
  );
}

export default AddProduct;
