"use client";

import React from "react";
import { useContext, useEffect, useState } from "react";
import { Theme, API_URL, CURRENCY } from "../local";
import InputEl from "../comps/inputel";
import axios from "axios";
import TableComp from '../comps/sandbox/table';
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


  const handleEdit = (ob)=>{
    props.setpage(15, ob.id);
  }

  const getProducts = () => {
    setlod(true);
    props.setLod(true);
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
        console.log(data)
      })
      .then(() => {
        props.setLod(false);
      });
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
   

   {
  products?<TableComp



  columns={
    [
      {name: "ID", uid: "id", sortable: true},
      {name: ".", uid: "img", sortable: true},
      {name: "الإسم", uid: "name_ar", sortable: true}, 
      {name: "الأنواع", uid: "varients", sortable: true},
      {name: "حالة المنتج", uid: "status", sortable: true},
      {name: "تعديل", uid: "createdAt"},
    ]
   }
   delorder={handleEdit}
   data={products}
    />:
  <div style={{
    display:lod?'flex':'none' ,
    alignItems:"center",
    justifyContent:"center"
  }}>
  <div style={{zIndex:10}}>
        <div style={{justifyContent:"center",alignItems:"center"}} className="lds-facebook"><div></div><div></div><div></div></div>
        </div>
  </div>
}
    

    </div>
  );
}

export default ProductsList;
