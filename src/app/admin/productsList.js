"use client";

import React from "react";
import { useEffect, useState } from "react";
import { API_URL, CURRENCY, IMG_URL } from "../local";
import TableComp from '../comps/sandbox/table';
import { useSelector } from "react-redux";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useI18n } from "../lib/i18n";


function ProductsList(props) {
  const { t } = useI18n();
  const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)
  const [lod, setlod] = useState(false);
  const [products, setProducts] = useState([]);
  const [viewMode, setViewMode] = useState('table'); // 'table', 'list', 'grid'
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
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
      .then(() => {
        props.notifi("success","تم حذف المنتج")
        getProducts();
      })
      .catch(() => {});
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
      .then(() => {
        if(status){
          props.notifi("success","تم إظهار المنتج")
        }else{
          props.notifi("success","تم إخفاء المنتج")
        }
        getProducts();
      })
      .catch(() => {});
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
        props.setLod(false);
      })
      .catch(() => {
        props.setLod(false);
      });
  };

  const filteredProducts = products.filter(product => 
    product.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.name_ar?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.name_en?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderGridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredProducts.map((product) => (
        <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 overflow-hidden">
          <div className="relative h-48 bg-gray-100">
            {product.images && product.images[0] ? (
              <Image
                src={product.images[0].url?.startsWith('http') ? product.images[0].url : `${IMG_URL}${product.images[0].url}`}
                alt={product.name_ar}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
            )}
            <div className="absolute top-2 right-2">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${product.status ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                {product.status ? t('statusAvailable') : t('statusUnavailable')}
              </span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-800 mb-1 truncate">{product.name_ar}</h3>
            <p className="text-sm text-gray-500 mb-2">{product.code}</p>
            <p className="text-lg font-bold text-moon-200 mb-3">
              {product.varients && product.varients[0] ? `${product.varients[0].price} ${CURRENCY}` : 'N/A'}
            </p>
            <div className="flex gap-2">
              <Button size="sm" className="flex-1 bg-gradient-to-r from-moon-200 to-moon-300 text-white" onClick={() => handleEdit(product)}>
                {t('edit')}
              </Button>
              <Button size="sm" variant="bordered" className="flex-1" onClick={() => handleDuplicate(product)}>
                {t('copyProduct')}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-3">
      {filteredProducts.map((product) => (
        <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 p-4 flex items-center gap-4">
          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
            {product.images && product.images[0] ? (
              <Image
                src={product.images[0].url?.startsWith('http') ? product.images[0].url : `${IMG_URL}${product.images[0].url}`}
                alt={product.name_ar}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-800 truncate">{product.name_ar}</h3>
            <p className="text-sm text-gray-500">{product.code}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-moon-200">
              {product.varients && product.varients[0] ? `${product.varients[0].price} ${CURRENCY}` : 'N/A'}
            </p>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mt-1 ${product.status ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
              {product.status ? t('statusAvailable') : t('statusUnavailable')}
            </span>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button size="sm" isIconOnly className="bg-gradient-to-r from-moon-200 to-moon-300 text-white" onClick={() => handleEdit(product)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </Button>
            <Button size="sm" isIconOnly variant="bordered" onClick={() => handleDuplicate(product)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
              </svg>
            </Button>
            <Button size="sm" isIconOnly variant="light" className="text-red-600" onClick={() => deleteEntry(product.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div dir="rtl" className="w-full">
      {/* Header with Search and View Switcher - Matching Orders Style */}
      <div className="flex flex-col gap-4 mb-4">
        {/* Search Bar */}
        <div className="w-full">
          <div className="relative w-full sm:max-w-[44%]">
            <input
              type="text"
              placeholder="أبحث ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-moon-200 focus:border-transparent bg-white"
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
        </div>

        {/* Filters and View Switcher */}
        <div className="flex justify-between gap-3 items-end">
          <div className="flex gap-3 flex-wrap">
            {/* View Switcher */}
            <div className="flex gap-1 bg-moon-100/30 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-md transition-all ${viewMode === 'table' ? 'bg-gradient-to-r from-moon-200 to-moon-300 text-white shadow-sm' : 'text-moon-300/60 hover:bg-moon-100/50'}`}
                title="عرض جدول"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-gradient-to-r from-moon-200 to-moon-300 text-white shadow-sm' : 'text-moon-300/60 hover:bg-moon-100/50'}`}
                title="عرض قائمة"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-gradient-to-r from-moon-200 to-moon-300 text-white shadow-sm' : 'text-moon-300/60 hover:bg-moon-100/50'}`}
                title="عرض شبكة"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Add Product Button */}
          <Button
            className="bg-gradient-to-r from-moon-200 to-moon-300 text-white font-medium shadow-sm"
            startContent={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            }
            onClick={() => props.setpage(14, null)}
          >
            {t('addProduct')}
          </Button>
        </div>

        {/* Count Info */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">عدد : {filteredProducts.length}</span>
        </div>
      </div>

      {/* Content */}
      {lod ? (
        <div className="flex justify-center items-center py-20">
          <div className="lds-facebook"><div></div><div></div><div></div></div>
        </div>
      ) : (
        <>
          {viewMode === 'table' && products.length > 0 && (
            <TableComp
              columns={[
                {name: "ID", uid: "id", sortable: true},
                {name: ".", uid: "images", sortable: true},
                {name: "الإسم", uid: "name_ar", sortable: true}, 
                {name: "رمز المنتج", uid: "code", sortable: true},
                {name: "السعر", uid: "varients", sortable: true},
                {name: "حالة المنتج", uid: "status", sortable: true},
                {name: "تعديل", uid: "createdAt"},
              ]}
              delorder={handleEdit}
              search={"code"}
              duplicateProduct={handleDuplicate}
              deleteProduct={deleteEntry}
              statusChange={handleStatus}
              data={products}
            />
          )}
          {viewMode === 'list' && renderListView()}
          {viewMode === 'grid' && renderGridView()}
          
          {filteredProducts.length === 0 && !lod && (
            <div className="text-center py-20 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16 mx-auto mb-4 text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <p className="text-lg">{t('noData')}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProductsList;
