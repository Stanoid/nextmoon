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
import { useSelector } from "react-redux";
import { FaTimes, FaEdit } from "react-icons/fa";
import Skeleton,{ SkeletonTheme } from 'react-loading-skeleton'
import { AuthCon } from "../contexts/AuthCon";


function ProductsList(props) {
  const ls = require("local-storage");
    const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)

  const [lod, setlod] = useState(false);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    imgs: "",
  });

  const [files, setFiles] = useState([]);
  useEffect(() => {
    // loginval();
    getProducts();

  },[]);





  const deleteEntry = (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + udata.data.jwt,
      },
    };

    fetch(`${API_URL}products/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        props.notifi("success","تم حذف المنتج")
        getProducts();
      })
      .then(() => {});
  };

  const handleStatus = (status, id) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + udata.data.jwt,
      },
      body: JSON.stringify({
        status: status,
      }),
    };

    fetch(`${API_URL}products/${id} ?func=EditStatus`, requestOptions)
      .then((response) => response.json())
      .then((data) => {

        if(status){
          props.notifi("success","تم إظهار المنتج")

        }else{
          props.notifi("success","تم إخفاء المنتج")

        }
        
      })
      .then(() => {
        getProducts();
      });
  };


  const handleEdit = (ob)=>{
    props.setpage(15, ob.id);
  }

  const handleDuplicate = (ob)=>{
    props.setpage(14, ob.id);
  }

  const getProducts = () => {
    setlod(true);
    props.setLod(true);
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + udata.data.jwt,
      },
    };
    fetch(`${API_URL}products?func=getAllProductsAdmin`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        
        setProducts(data);
        console.log("ssssssssssssssssssssssssss",data)
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
      {name: ".", uid: "images", sortable: true},
      {name: "الإسم", uid: "name_ar", sortable: true}, 
      {name: "رمز المنتج", uid: "code", sortable: true},

      {name: "السعر", uid: "varients", sortable: true},
      {name: "حالة المنتج", uid: "status", sortable: true},
      {name: "تعديل", uid: "createdAt"},
    ]
   }
   delorder={handleEdit}
   search={"code"}
   duplicateProduct={handleDuplicate}
   deleteProduct={deleteEntry}
   statusChange={handleStatus}
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
