"use client";

import React from "react";
import { useContext, useEffect, useState } from "react";
import { Theme, API_URL, CURRENCY } from "../local";
import InputEl from "../comps/inputel";
import axios from "axios";
import { useRouter } from "next/navigation";
import { TiThMenu } from "react-icons/ti";
import LoadingBtn from "../comps/loadingbtn";
import { FaTimes, FaEdit } from "react-icons/fa";
import Skeleton,{ SkeletonTheme } from 'react-loading-skeleton'
import { AuthCon } from "../contexts/AuthCon";

function ProductsList(props) {
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
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    imgs: "",
  });

  const [files, setFiles] = useState([]);
  useEffect(() => {
    // loginval();
    getProducts();

  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
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
      color == null ||
      size == null ||
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
        Authorization: "Bearer " + ls.get("atkn"),
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
        Authorization: "Bearer " + ls.get("atkn"),
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
        Authorization: "Bearer " + ls.get("atkn"),
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
    setlod(true)
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
      });
  };

  const loginval = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ls.get("atkn"),
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
          Authorization: "Bearer " + ls.get("atkn"),
        },
        body: JSON.stringify({
          nameen: nameen,
          namear: namear,
          descen: descen,
          descar: descar,
          subc: subc,
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
          getProducts();
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
        className="shadow-md"
        style={{ marginTop: 20, width: "70%", padding: 10, borderRadius: 10 }}
      >
        <div style={{ color: Theme.primary, fontSize: 25, fontWeight: "bold" }}>
           المنتجات المضافة :
        </div>
        <br />
        <div>
          <table style={{ width: "100%" }}>
            <tr style={{ textAlign: "right", marginBottom: 20 }}>
              <th> {"إسم المنتج (العربية)"} </th>
             
             <th>الخيارات</th>
              <th>الفئة</th>
              <th>الحالة</th>
              <th>تعديل</th>
              <th>حذف</th>
            </tr>
            <br />
           {lod?<div className="flex items-center p-5 text-moon-200 font-bold text-2xl justify-center w-full">

     جارِ تحميل المنتجات...
         
           </div>:<>
            {products &&
              products.map((product, index) => (
                <tr
                  style={{
                    textAlign: "left",
                    padding: 5,
                    backgroundColor: index % 2 == 0 ? "lightgray" : "white",
                  }}
                >
                  <th style={{ padding: 15 }}> { product.name_ar.length>=40?product.name_ar.slice(0,40)+"...":product.name_ar }</th>
                
                  <th
                  dir="ltr"
                    style={{
                      
                      display: "flex",
                      alignItems: "center",
                      justifyContent:"flex-end"
                    }}
                  >
                    {product.varients &&
                      product.varients.map((varient, indexo) => (
                        <div
                          className="flex-row lg:flex-col md:flex-col sm:flex-row "
                          style={{
                            padding: 10,
                            borderRadius: 10,
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          key={varient.id}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <div
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: 7,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "3px solid",
                                borderColor:
                                  index % 2 == 0 ? "lightgray" : "white",
                                marginRight: -10,
                                zIndex: 10,
                                marginBottom: -5,
                                backgroundColor: Theme.primary,
                                color: "white",
                                fontSize: 20,
                              }}
                            >
                              {varient.size && varient.size.icon}
                            </div>
                            <div
                              style={{
                                width: 35,
                                height: 35,
                                marginLeft: -10,
                                marginTop: -5,
                                borderRadius: 100,
                                backgroundColor:
                                  varient.color && varient.color.colorCode,
                              }}
                            ></div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexDirection: "column",
                              fontSize: 10,
                            }}
                          >
                            <div
                              style={{
                                color: "grey",
                                fontStyle: "oblique",
                                fontSize: 15,
                                marginTop: 5,
                              }}
                            >
                              {varient.price} {CURRENCY}
                            </div>
                          </div>
                        </div>
                      ))}
                  </th>

                  <th style={{ padding: 15 }}>
                    {" "}
                    {product.subcatagory && product.subcatagory ? (
                      product.subcatagory.name_ar
                    ) : (
                      <span style={{ color: "red" }}>None</span>
                    )}
                  </th>
                  <th style={{ padding: 15 }}>
                    <label class="switch">
                      <input
                        type="checkbox"
                        onChange={() => {
                          handleStatus(product.status, product.id);
                        }}
                        checked={product.status}
                      />
                      <span class="slider round"></span>
                    </label>
                  </th>

                  <th style={{ padding: 15 }}>
                    <div
                      onClick={() => {
                        props.setpage(15, product.id);
                      }}
                      style={{
                        color: "white",
                        backgroundColor: Theme.secondary,
                        padding: 5,
                        borderRadius: 100,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FaEdit />
                    </div>
                  </th>

                  <th style={{ padding: 15 }}>
                    <div
                      onClick={() => {
                        deleteEntry(product.id);
                      }}
                      style={{
                        color: "white",
                        backgroundColor: "#ff2e2e",
                        padding: 5,
                        borderRadius: 100,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FaTimes />
                    </div>
                  </th>
                </tr>
              ))}</>}
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductsList;
