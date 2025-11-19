'use client' 

import React, { useContext, useEffect, useState } from 'react';
import { API_URL } from '../local';
import InputEl from '../comps/inputel';
import LoadingBtn from '../comps/loadingbtn';
import { AuthCon } from '../contexts/AuthCon';
import TableComp from "../comps/sandbox/table";
import { useSelector } from 'react-redux';
import Image from 'next/image';

function AddSubCat(props) {
    const { logindata, logoutUser } = useContext(AuthCon);
    const udata = useSelector((state) => state.root.auth.data && state.root.auth.data);

    const [namear, setNamear] = useState("");
    const [nameen, setNameen] = useState("");
    const [cat, setCat] = useState([]);
    const [subcats, setSubcats] = useState([]);
    const [catid, setCatid] = useState(null);
    const [editSubcat, setEditSubcat] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [lod, setlod] = useState(false);

    useEffect(() => {
        getCats();
    }, []);

    const getCats = () => {
        props.setLod(true);
        fetch(`${API_URL}catagories`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + udata.data.jwt
            },
        })
        .then(res => res.json())
        .then(data => {
            setCat(data.data);
        })
        .then(() => getSubcats());
    }


    const makeImgUrl = (url) => {
        if (!url) return null;
      
        // Remove /api and trailing slash from API_URL
        const base = API_URL.replace('/api', '').replace(/\/$/, '');
        // Ensure the path starts with a single /
        const path = url.startsWith('/') ? url : `/${url}`;
      
        return `${base}${path}`;
      };

      

      const getSubcats = () => {
        props.setLod(true);
        fetch(`${API_URL}subcatagories?func=getAllSubcat`, {
          method: 'GET',
          headers: { "Content-Type": "application/json" }
        })
        .then(res => res.json())
        .then(data => {
          console.log("Server response:", data); 
          const arr = data
            .filter(s => s.catagory)
            .map(s => ({
              id: s.id,
              img: makeImgUrl(s.img?.data?.attributes?.url || s.img?.url),
              name_ar: s.name_ar,
              name_en: s.name_en,
              cat: s.catagory?.name_ar || "—",
              createdAt: s.createdAt,
              feat: s.feat,
              topsec: s.topsec ?? false,
            }));
          setSubcats(arr);
          props.setLod(false);
        });
      };
      

    const deleteEntry = (id) => {
        fetch(`${API_URL}subcatagories/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + udata.data.jwt
            }
        })
        .then(res => res.json())
        .then(() => {
            props.notifi("success", "تم حذف الفئة الفرعية");
            getSubcats();
        });
    }

const toggleTopsec = (subcat) => {
  fetch(`${API_URL}subcatagories/${subcat.id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + udata.data.jwt
    },
    body: JSON.stringify({ topsec: !subcat.topsec })
  })
  .then(res => res.json())
  .then(() => {
    props.notifi("success", "تم تعديل حالة الفئة الرئيسية");
    getSubcats();
  }).catch(err => {
    console.error("Error toggling top section:", err);
    props.notifi("error", "حدث خطأ أثناء تعديل حالة الفئة الرئيسية");
    });
};



    

    const toggleFeat = (subcat) => {
        fetch(`${API_URL}subcatagories/${subcat.id}?func=togFeat`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + udata.data.jwt
            },
            body: JSON.stringify({ status: !subcat.feat })
        })
        .then(res => res.json())
        .then(() => {
            props.notifi("success", "تم تعديل الفئة الفرعية");
            getSubcats();
        });
    }

    const submitload = () => {
        if (!namear || !nameen || !catid) {
            alert("Empty Fields");
            return;
        }
    
        setlod(true);
    
        const formData = new FormData();
        formData.append("name_ar", namear);
        formData.append("name_en", nameen);
        formData.append("catagory", catid);
        if (imageFile) formData.append("img", imageFile);
    
        let url, method;
        if (editSubcat) {
            url = `${API_URL}subcatagories/${editSubcat.id}`; 
            method = "PUT";
        } else {
            url = `${API_URL}subcatagories?func=AddSubCat`; 
            method = "POST";
        }
    
        fetch(url, {
            method,
            headers: { "Authorization": 'Bearer ' + udata.data.jwt },
            body: formData
        })
        .then(async (res) => {
            const text = await res.text();
            try {
                return JSON.parse(text);
            } catch {
                throw new Error(text);
            }
        })
        .then(() => {
            getSubcats();
            props.notifi("success", editSubcat ? "تم تعديل الفئة الفرعية" : "تمت إضافة الفئة الفرعية");
            setlod(false);
            setEditSubcat(null);
            setNamear("");
            setNameen("");
            setCatid(null);
            setImageFile(null);
        })
        .catch(err => {
            console.error("Error updating/adding subcategory:", err);
            props.notifi("error", err.message);
            setlod(false);
        });
    }
    
    const startEdit = (scat) => {
        setEditSubcat(scat);
        setNamear(scat.name_ar);
        setNameen(scat.name_en);
        const selectedCat = cat.find(c => c.name_ar === scat.cat);
        setCatid(selectedCat ? selectedCat.id : null);
        setImageFile(null);
    }

    return (
        <div dir="rtl" className="w-full max-w-6xl mx-auto p-4">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 text-moon-200">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                        </svg>
                        إدارة الفئات الفرعية
                    </h1>
                    <button
                        onClick={() => props.setpage(0)}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <p className="text-gray-500 text-sm">أضف وأدر الفئات الفرعية للمنتجات</p>
            </div>

            {/* Add Subcategory Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-moon-200">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    {editSubcat ? "تعديل الفئة الفرعية" : "إضافة فئة فرعية جديدة"}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <InputEl value={namear} outputfunc={setNamear} label="إسم الفئة الفرعية (العربية)" />
                    <InputEl value={nameen} outputfunc={setNameen} label="إسم الفئة الفرعية (الإنجليزية)" />
                </div>

                <div className="mb-4">
                    <InputEl value={catid} outputfunc={setCatid} select data={cat} label="الفئة" />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">صورة الفئة الفرعية</label>
                    <div className="flex items-center gap-4">
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => setImageFile(e.target.files[0])}
                            className="block w-full text-sm text-gray-600
                                       file:mr-4 file:py-2.5 file:px-4
                                       file:rounded-lg file:border-0
                                       file:text-sm file:font-semibold
                                       file:bg-gradient-to-r file:from-moon-200 file:to-moon-300
                                       file:text-white
                                       hover:file:from-moon-300 hover:file:to-moon-200
                                       file:cursor-pointer file:transition-all file:shadow-sm"
                        />
                        {(imageFile || editSubcat?.img) && (
                            <div className="relative w-24 h-24 flex-shrink-0">
                                <img 
                                    src={imageFile ? URL.createObjectURL(imageFile) : editSubcat.img} 
                                    alt="Preview" 
                                    className="w-full h-full object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end">
                    <LoadingBtn act={submitload} lod={lod} text={editSubcat ? "تعديل الفئة الفرعية" : "إضافة فئة فرعية"} />
                </div>
            </div>

            {/* Subcategories List */}
            <div className="w-full">
                {subcats ? (
                    <TableComp
                        deleteProduct={deleteEntry}
                        editScat={startEdit}
                        togfeat={toggleFeat}
                        toggleTopsec={toggleTopsec}
                        columns={[
                            { name: "ID", uid: "id", sortable: true },
                            {name: "Image", uid: "img", sortable: true},

                           
                              
                              
    
                                              
                            { name: "الإسم (العربية)", uid: "name_ar", sortable: true },
                            { name: "الإسم (الإنجليزية)", uid: "name_en", sortable: true },
                            { name: "الفئة", uid: "cat", sortable: true },
                            { name: "فئة مميزة", uid: "feat", sortable: true },
                            { name: "فئة مميزة", uid: "topsec", sortable: true },

                            { name: "الخيارات", uid: "scate" },
                        ]}
                        data={subcats}
                    />
                ) : (
                    <div style={{ display: lod ? 'flex' : 'none', alignItems: "center", justifyContent: "center" }}>
                        <div className="lds-facebook"><div></div><div></div><div></div></div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AddSubCat;
