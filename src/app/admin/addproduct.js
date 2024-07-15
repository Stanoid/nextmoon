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
    getColors();
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
      //console.log("postdata",postData);
      axios
        .post(`${API_URL}upload`, postData)
        .then((response) => {
          const imageId = response.data[0].id;

        

          tmepar[i] = response.data[0].url;
          
          console.log("Response image url", response.data[0].url);
          //    setImgs(tmepar);

          if (i == files.length - 1) {
            submitProduct(tmepar);
          }
        })
        .then(() => {});
    }
    //console.log("trmpa",tmepar);

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
        console.log("deleted ", data.data);
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
        console.log("status updated", data);
      })
      .then(() => {
        getProducts();
      });
  };

  const getProducts = () => {
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
        console.log("Product data ", data);
        setProducts(data);
      })
      .then(() => {
        setlod(false);
      });
  };

  const getColors = () => {
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
        // "Authorization": 'Bearer ' + ls.get("atkn")
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
        console.log("aaaaaaaaaaaaaaaaaaaaaaa", data);

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
    console.log(tmepar);
    //console.log("aaaaa",imgsob);

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
          console.log("added product data", data);
        })
        .then(() => {
          getProducts();
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
          width: "70%",
          display: "grid",
          gap: 10,
          gridTemplateAreas: `
' namear  namear  nameen nameen  ' 
'descriptionAr descriptionAr descriptionAr descriptionAr'
'descriptionEn descriptionEn descriptionEn descriptionEn'
'cat images images images'
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
            label={"Product name (Arabic)"}
          />
        </div>

        <div style={{ gridArea: "nameen" }}>
          <InputEl
            value={nameen}
            outputfunc={(val) => {
              setNameen(val);
            }}
            label={"Product name (English)"}
          />
        </div>

        <div style={{ gridArea: "descriptionAr" }}>
          <InputEl
            value={descar}
            outputfunc={(val) => {
              setDescar(val);
            }}
            label={"Product description (Arabic)"}
          />
        </div>

        <div style={{ gridArea: "descriptionEn" }}>
          <InputEl
            value={descen}
            outputfunc={(val) => {
              setDescen(val);
            }}
            label={"Product description (English)"}
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
            label={"Sub-category"}
          />
        </div>

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
        </div>

        <div style={{ gridArea: "price" }}>
          <InputEl
            value={price}
            outputfunc={(val) => {
              setPrice(val);
            }}
            num={true}
            label={"Price"}
          />
        </div>

        <div style={{ gridArea: "stock" }}>
          <InputEl
            value={stock}
            outputfunc={(val) => {
              setStock(val);
            }}
            num={true}
            label={"Stock"}
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
            label={"Color"}
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
            label={"Size"}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoadingBtn
          act={() => {
            uploadMedia();
          }}
          lod={lod}
          text={"Add product"}
        />
      </div>

      <div
        className="shadow-md"
        style={{ marginTop: 20, width: "70%", padding: 10, borderRadius: 10 }}
      >
        <div style={{ color: Theme.primary, fontSize: 25, fontWeight: "bold" }}>
          Added products:
        </div>
        <br />
        <div>
          <table style={{ width: "100%" }}>
            <tr style={{ textAlign: "left", marginBottom: 20 }}>
              <th>Product name (English)</th>
             
             <th>Varients</th>
              <th>Subcatagory</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            <br />
            {products &&
              products.map((product, index) => (
                <tr
                  style={{
                    textAlign: "left",
                    padding: 5,
                    backgroundColor: index % 2 == 0 ? "lightgray" : "white",
                  }}
                >
                  <th style={{ padding: 15 }}> { product.name_en.length>=40?product.name_en.slice(0,40)+"...":product.name_en }</th>
                
                  <th
                    style={{
                      display: "flex",
                      alignItems: "center",
                      alignItems: "center",
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
                      product.subcatagory.name_en
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
              ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
