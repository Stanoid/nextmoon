'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast, ToastContainer } from 'react-toastify'
import { API_URL } from '../local'
import InputEl from '../comps/inputel'
import { useRouter } from 'next/navigation'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { FaFacebook, FaInstagram, FaXTwitter, FaGoogle, FaCircleRight } from 'react-icons/fa6'
import LoadingBtn from '../comps/loadingbtn'
import Logowhite from "../../../public/logoblack.svg"
import { Theme } from '../local'
import { useI18n } from '../lib/i18n'
import { initSocialLogin } from '../lib/actions/api/auth/social'

export default function Register() {
  const { t, direction } = useI18n()

  const [name, setname] = useState("");
  const [gender, setGender] = useState("M");
  const [age, setAge] = useState("");
  const [lod, setLod] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null);
  const [state, setstate] = useState();
  const [city, setcity] = useState();
  const [address, setaddress] = useState();
  const [address2, setaddress2] = useState();
  const [phone, setPhone] = useState("");
  const [type, setType] = useState(0);
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [cpass, setcpass] = useState("");

  const ls = require("local-storage");
  const router = useRouter();

  const notify = (type, msg) => {
    const options = {
      hideProgressBar: true,
      draggable: true,
      closeButton: false,
    };
    switch (type) {
      case 'success':
        toast.success(msg, options)
        break;
      case 'error':
        toast.error(msg, options)
        break;
      case 'warn':
        toast.warn(msg, options)
        break;
    }
  }

  const handleemail = (email) => {
    const newemail = email.replace(/ /g, '');
    setemail(newemail);
  }

  const regis = () => {
    setLod(true)

    const requestOptions = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: name,
        email: email,
        password: pass,
      }),
    };

    fetch(`${API_URL}auth/local/register`, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.jwt) {
          notify("success", `${t('welcomeMessage')} ${data.user.username}`);
          ls.set("atkn", data.jwt);
          router.replace("/");
        } else {
          if (data.error.message === "Email is already taken") {
            notify("error", t('emailAlreadyTaken'));
          } else {
            notify("error", `${t('unexpectedError')} ${data.error.message}`);
          }
        }
        setLod(false)
      });
  }

  const page2Handler = () => {
    if (!name || !email || !pass || !cpass) {
      notify("error", t("pleaseFillAllFields") || "Please fill all fields");
      return;
    }
    
    if (pass !== cpass) {
      notify("error", t("passwordsDontMatch"));
      return;
    }
    
    if (pass.length < 6) {
      notify("error", t("passwordTooShort") || "Password must be at least 6 characters");
      return;
    }
    
    // Call register function directly
    regis();
  }

  return (
    <div
      style={{ backgroundSize: 50 }}
      className="w-full min-h-screen flex justify-center items-center md:py-20 py-4"
    >
      <ToastContainer limit={3} />

      <div className="w-full md:w-3/4 lg:w-1/2 xl:w-1/2 p-3 flex justify-center">
        <div style={{ backgroundColor: "rgba(255,255,255,1)" }}
          className='w-full max-w-lg flex align-middle rounded-lg transition-transform justify-center text-right p-3 md:p-4 lg:p-8 shadow-md shadow-gray-300 flex-col items-center'>

          <div className="w-full md:w-3/4 lg:w-3/4 px-3 py-5 my-3 flex flex-col justify-center items-center">
            <Logowhite width={96} className="mb-4" />
          </div>

          {/* Step 1 */}
          <div style={{ display: type === 0 ? "block" : "none" }} className="w-full transition-all">
            <div className='w-full flex align-middle justify-between'>
              <div className='flex-grow '>
                <h3 dir={direction} className={`text-center text-base text-gray-900 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                  {t("welcome")}
                </h3>
                <p className={`text-center text-base text-gray-500 mb-4 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                  {t("pleaseLoginToContinue")}
                </p>
              </div>
            </div>

            <div className='flex flex-col gap-3 my-4'>
              <InputEl outputfunc={(val) => setname(val)} label={t("username")} />
              <InputEl outputfunc={(val) => handleemail(val)} label={t("email")} />
              <InputEl outputfunc={(val) => setpass(val)} label={t("password")} type="password" />
              <InputEl outputfunc={(val) => setcpass(val)} label={t("confirmPassword")} type="password" />
            </div>

            <LoadingBtn
              act={page2Handler}
              text={t("continue")}
              lod={lod}
              icon={<FaCircleRight />}
            />

            <div className="w-full relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-base bg-white text-gray-500">
                  {t('orRegisterWith')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div 
                onClick={() => {
                  setSocialLoading('google')
                  initSocialLogin('google')
                }}
                className={`p-3 border border-gray-300 rounded-md w-full cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-100 transition duration-150 ease-in-out ${socialLoading === 'google' ? 'opacity-50 pointer-events-none' : ''}`}
              >
                {socialLoading === 'google' ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
                ) : (
                  <FaGoogle className="text-red-500 text-xl" />
                )}
                <span className="text-gray-600 text-sm">Google</span>
              </div>
              <div 
                onClick={() => {
                  setSocialLoading('facebook')
                  initSocialLogin('facebook')
                }}
                className={`p-3 border border-gray-300 rounded-md cursor-pointer w-full flex items-center justify-center gap-2 hover:bg-gray-100 transition duration-150 ease-in-out ${socialLoading === 'facebook' ? 'opacity-50 pointer-events-none' : ''}`}
              >
                {socialLoading === 'facebook' ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
                ) : (
                  <FaFacebook className="text-blue-600 text-xl" />
                )}
                <span className="text-gray-600 text-sm">Facebook</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
