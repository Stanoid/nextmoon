"use client";

import React, { useEffect, useState } from "react";
import { API_URL, CURRENCY, IMG_URL } from "../local";
import { useSelector } from "react-redux";
import { Button, Chip, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import Image from "next/image";

function Inventory(props) {
  const udata = useSelector((state) => state.root.auth.data && state.root.auth.data);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showStockModal, setShowStockModal] = useState(false);
  const [stockUpdates, setStockUpdates] = useState({});
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    outOfStock: 0,
    totalValue: 0
  });

  useEffect(() => {
    getInventory();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, products]);

  const getInventory = () => {
    setLoading(true);
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
        calculateStats(data);
        setLoading(false);
        props.setLod(false);
      })
      .catch(() => {
        setLoading(false);
        props.setLod(false);
      });
  };

  const calculateStats = (productsData) => {
    let totalProducts = 0;
    let lowStock = 0;
    let outOfStock = 0;
    let totalValue = 0;

    productsData.forEach(product => {
      if (product.varients && product.varients.length > 0) {
        product.varients.forEach(variant => {
          totalProducts++;
          const stock = variant.stock || 0;
          const price = variant.price || 0;
          
          if (stock === 0) outOfStock++;
          else if (stock < 10) lowStock++;
          
          totalValue += stock * price;
        });
      }
    });

    setStats({
      totalProducts,
      lowStock,
      outOfStock,
      totalValue
    });
  };

  const filterProducts = () => {
    if (!searchQuery.trim()) {
      setFilteredProducts(products);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = products.filter(product => 
      product.code?.toLowerCase().includes(query) ||
      product.name_ar?.toLowerCase().includes(query) ||
      product.name_en?.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  const openStockModal = (product) => {
    setSelectedProduct(product);
    const updates = {};
    product.varients?.forEach(variant => {
      updates[variant.id] = variant.stock || 0;
    });
    setStockUpdates(updates);
    setShowStockModal(true);
  };

  const updateStock = () => {
    if (!selectedProduct) return;

    setLoading(true);
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + udata.data.jwt,
      },
      body: JSON.stringify({
        productId: selectedProduct.id,
        stockUpdates: stockUpdates
      }),
    };

    fetch(`${API_URL}products?func=UpdateStock`, requestOptions)
      .then((response) => response.json())
      .then(() => {
        props.notifi("success", "تم تحديث المخزون بنجاح");
        setShowStockModal(false);
        getInventory();
      })
      .catch(() => {
        props.notifi("error", "فشل تحديث المخزون");
        setLoading(false);
      });
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { color: "danger", text: "نفذ" };
    if (stock < 10) return { color: "warning", text: "منخفض" };
    return { color: "success", text: "متوفر" };
  };

  const getVariantLabel = (variant, product) => {
    const size = variant.sizes?.data?.[0]?.attributes?.name_ar || variant.sizes?.data?.[0]?.name_ar || "";
    const color = variant.colors?.data?.[0]?.attributes?.name_ar || variant.colors?.data?.[0]?.name_ar || "";
    return `${size} - ${color}`;
  };

  return (
    <div dir="rtl" className="w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 text-moon-200">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
            إدارة المخزون المتقدمة
          </h1>
        </div>
        <p className="text-gray-500 text-sm">تتبع وإدارة كميات المنتجات في المخزون</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">إجمالي المنتجات</p>
              <p className="text-2xl font-bold text-blue-700">{stats.totalProducts}</p>
            </div>
            <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600 font-medium">مخزون منخفض</p>
              <p className="text-2xl font-bold text-yellow-700">{stats.lowStock}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-yellow-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium">نفذ من المخزون</p>
              <p className="text-2xl font-bold text-red-700">{stats.outOfStock}</p>
            </div>
            <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">قيمة المخزون</p>
              <p className="text-2xl font-bold text-green-700">{stats.totalValue.toLocaleString()} {CURRENCY}</p>
            </div>
            <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <Input
          placeholder="ابحث عن منتج (الكود، الاسم...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          startContent={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          }
          classNames={{
            input: "text-right",
            inputWrapper: "bg-white"
          }}
        />
      </div>

      {/* Products List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="lds-facebook"><div></div><div></div><div></div></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16 mx-auto mb-4 text-gray-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <p className="text-lg">لا توجد منتجات</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all">
              <div className="flex items-start gap-4">
                {/* Product Image */}
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

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800 truncate">{product.name_ar}</h3>
                      <p className="text-sm text-gray-500">{product.code}</p>
                    </div>
                  </div>

                  {/* Variants */}
                  {product.varients && product.varients.length > 0 && (
                    <div className="space-y-2">
                      {product.varients.map((variant, idx) => {
                        const status = getStockStatus(variant.stock || 0);
                        return (
                          <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-700">{getVariantLabel(variant, product)}</span>
                              <Chip size="sm" color={status.color} variant="flat">
                                {status.text}
                              </Chip>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-semibold text-gray-700">
                                الكمية: {variant.stock || 0}
                              </span>
                              <span className="text-sm text-gray-500">
                                {variant.price} {CURRENCY}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-moon-200 to-moon-300 text-white flex-shrink-0"
                  onClick={() => openStockModal(product)}
                >
                  تحديث المخزون
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stock Update Modal */}
      <Modal 
        isOpen={showStockModal} 
        onClose={() => setShowStockModal(false)}
        size="2xl"
        dir="rtl"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h3 className="text-xl font-bold">تحديث المخزون</h3>
            {selectedProduct && (
              <p className="text-sm text-gray-500 font-normal">{selectedProduct.name_ar} - {selectedProduct.code}</p>
            )}
          </ModalHeader>
          <ModalBody>
            {selectedProduct?.varients && selectedProduct.varients.length > 0 && (
              <div className="space-y-4">
                {selectedProduct.varients.map((variant, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-gray-700">{getVariantLabel(variant, selectedProduct)}</span>
                      <Chip size="sm" color={getStockStatus(variant.stock || 0).color} variant="flat">
                        {getStockStatus(variant.stock || 0).text}
                      </Chip>
                    </div>
                    <Input
                      type="number"
                      label="الكمية الجديدة"
                      value={stockUpdates[variant.id] || 0}
                      onChange={(e) => setStockUpdates({
                        ...stockUpdates,
                        [variant.id]: parseInt(e.target.value) || 0
                      })}
                      min={0}
                      classNames={{
                        input: "text-right"
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button 
              variant="light" 
              onPress={() => setShowStockModal(false)}
            >
              إلغاء
            </Button>
            <Button 
              className="bg-gradient-to-r from-moon-200 to-moon-300 text-white"
              onPress={updateStock}
              isLoading={loading}
            >
              حفظ التغييرات
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Inventory;
