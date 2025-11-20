'use client'

import React from 'react';
import { useEffect,useState } from 'react';
import { Theme } from '../local';
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
const Orders = dynamic(() => import('./orders'))
const Favo = dynamic(() => import('./favo'))
const UserData = dynamic(() => import('./userData'))
const PasSet = dynamic(() => import('./pasSet'))
const Address = dynamic(() => import('./address'))
const PaymentMeth = dynamic(() => import('./paymentmeth'))

function AccounteEl() {
    const router = useRouter(); 
    const [page,setPage] = useState(1) 
    const [lod,setLod] =useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)
    
    useEffect(() => {
      if(udata?.data?.user?.type && udata.data.user.type !== 4){
        router.push("/login")
      }
    },[udata, router])

  const handleEdit = (pageid,id)=>{
   setPage(pageid)
  }

  const menuItems = [
    { id: 1, label: 'الطلبات', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg> },
    { id: 3, label: 'البيانات الشخصية', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg> },
    { id: 4, label: 'تغيير كلمة المرور', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg> },
    { id: 5, label: 'تعديل العنوان', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg> },
    { id: 7, label: 'سياسة الإسترجاع', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" /></svg> },
  ]

  
 

  return (
  
<>

{
    
    <div dir='rtl' className="min-h-screen bg-gray-50 lg:bg-gradient-to-br lg:from-gray-50 lg:via-white lg:to-gray-100">
      
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-3 py-2.5">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0" style={{backgroundColor: Theme.primary}}>
              {udata?.data?.user?.username?.charAt(0) || 'U'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-gray-900 text-sm sm:text-base truncate">{udata?.data?.user?.username}</div>
              <div className="text-xs text-gray-500 truncate">{udata?.data?.user?.email}</div>
            </div>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-200 bg-white shadow-lg">
            <div className="p-2 space-y-1 max-h-[calc(100vh-140px)] overflow-y-auto">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setPage(item.id)
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all text-sm sm:text-base ${
                    page === item.id 
                      ? 'text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                  }`}
                  style={page === item.id ? {backgroundColor: Theme.primary} : {}}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
              <button
                onClick={() => router.push("/logout")}
                className="w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-red-500 hover:bg-red-50 active:bg-red-100 transition-all text-sm sm:text-base"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                </svg>
                <span className="font-medium">تسجيل خروج</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className='max-w-7xl mx-auto px-0 lg:px-8 py-0 lg:py-10'>
        <div className='flex flex-col lg:flex-row gap-0 lg:gap-6'>

          {/* Desktop Sidebar */}
          <div className='hidden lg:block lg:w-80 flex-shrink-0'>
            <div className='sticky top-6 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100'>
              
              {/* Profile Header */}
              <div className='p-6 text-white' style={{backgroundColor: Theme.primary}}>
                <div className='flex flex-col items-center'>
                  <div className='w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-bold mb-3 ring-4 ring-white/30'>
                    {udata?.data?.user?.username?.charAt(0) || 'U'}
                  </div>
                  <h2 className='text-xl font-bold mb-1'>{udata?.data?.user?.username}</h2>
                  <p className='text-sm text-white/80'>{udata?.data?.user?.email}</p>
                </div>
              </div>

              {/* Menu Items */}
              <div className='p-4 space-y-2'>
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPage(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      page === item.id 
                        ? 'text-white shadow-lg transform scale-105' 
                        : 'text-gray-700 hover:bg-gray-50 hover:translate-x-1'
                    }`}
                    style={page === item.id ? {backgroundColor: Theme.primary} : {}}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
                
                <div className='pt-4 mt-4 border-t border-gray-200'>
                  <button
                    onClick={() => router.push("/logout")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200 hover:translate-x-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                    </svg>
                    <span className="font-medium">تسجيل خروج</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className='flex-1 min-w-0'>
            <div className='bg-white lg:rounded-2xl lg:shadow-xl overflow-hidden lg:border lg:border-gray-100 min-h-[calc(100vh-60px)] lg:min-h-[500px]'>
              
              {lod ? (
                <div className='flex items-center justify-center min-h-[calc(100vh-60px)] lg:min-h-[500px]'>
                  <div className="lds-facebook"><div></div><div></div><div></div></div>
                </div>
              ) : (
                <div className='p-3 lg:p-8'>
                  {page === 1 && <Orders setLod={(sta)=>{setLod(sta)}} setpage={(pid,id)=>{handleEdit(pid,id)}} />}
                  {page === 2 && <Favo setLod={(sta)=>{setLod(sta)}} setpage={(pid,id)=>{handleEdit(pid,id)}} />}
                  {page === 3 && <UserData setLod={(sta)=>{setLod(sta)}} setpage={(pid,id)=>{handleEdit(pid,id)}} />}
                  {page === 4 && <PasSet setLod={(sta)=>{setLod(sta)}} setpage={(pid,id)=>{handleEdit(pid,id)}} />}
                  {page === 5 && <Address setLod={(sta)=>{setLod(sta)}} setpage={(pid,id)=>{handleEdit(pid,id)}} />}
                  {page === 6 && <PaymentMeth setLod={(sta)=>{setLod(sta)}} setpage={(pid,id)=>{handleEdit(pid,id)}} />}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
    
}

</>


  )
}

export default AccounteEl




