'use client'
import React, { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import { toast, ToastContainer } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { login } from "../lib/actions/counterAction"
import { useRouter } from 'next/navigation'
import { FaFacebook, FaGoogle, FaInstagram, FaXTwitter, FaEye, FaEyeSlash } from 'react-icons/fa6'
import LoadingBtn from '../comps/loadingbtn'
import InputEl from '../comps/inputel'
import Logowhite from "../../../public/logoblack.svg"
import { useI18n } from '../lib/i18n'
export default function Login() {
  const { t, direction } = useI18n();
  const [email, setemail] = useState("")
  const [pass, setpass] = useState("")
  const [lod, setLod] = useState(false)
  // Renamed for clarity with Lucide icons (EyeOff is common)
  const [showpass, setShowpass] = useState(false)
  const { loginUser } = useContext(AuthCon)
  const udata = useSelector((state) => state.root.auth.data && state.root.auth.data)
  const router = useRouter()
  const dispatch = useDispatch()
  const { useNotifi } = useContext(CartCon)

  const handleEmail = (email) => setemail(email.replace(/ /g, ''))

  const loginRouter = () => {
    if (udata && udata.error) {
      switch (udata.data) {
        case 400:

        toast.error(t('invalidCredentials'), { position: "top-right", autoClose: 4000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, theme: "light" })
          break
        case 429:
          toast.error(t('tooManyRequests'), { position: "top-right", autoClose: 4000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, theme: "light" })
          break
      }
    }
    setLod(false)
  }

  const handleLogin = () => {
    setLod(true)
    dispatch(login({ "identifier": email, "password": pass })).then(() => {
      setTimeout(loginRouter, 10)
    }).catch(() => setLod(false))
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center md:py-20 py-4 ">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        limit={3}
      />

      <div
        style={{
          width: "512px",
          padding: "24px",
          gap: "24px",
          borderRadius: "8px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
        className="shadow-md shadow-gray-300 mx-4"
      >
        <Logowhite width={96} className="mb-4" />

        {/* <h2 className="text-xl text-center text-gray-700 mb-1">تسجيل دخول لحسابك</h2> */}
        <h3 dir={direction} className={`text-center text-base text-gray-900 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>{t('welcomeBack')}</h3>
        <p className={`text-center text-base text-gray-500 mb-4 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>{t('pleaseLogin')}</p>
        <div className="w-full flex flex-col gap-2 relative">
  <InputEl outputfunc={handleEmail} label={t('email')} />

  <div className="w-full relative">
  <InputEl
    outputfunc={(val) => setpass(val)}
    ispass
    label={t('password')}
    type={showpass ? "text" : "password"}
  />

  <motion.div
    className={`absolute top-1/2 ${direction === 'rtl' ? 'right-3' : 'left-3'} -translate-y-1/2 flex items-center cursor-pointer text-gray-400`}
    onClick={() => setShowpass(!showpass)}
    initial={{ rotate: 0, opacity: 0 }}
    animate={{ rotate: showpass ? 20 : 0, opacity: 1 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  >
    {showpass ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
  </motion.div>
</div>

</div>


        <motion.div className="w-full mt-4 text-base" whileTap={{ scale: 1.03 }}>
          <LoadingBtn act={handleLogin} text={t('login')} lod={lod} fullWidth />
        </motion.div>

        <div
          className={`w-full text-center mt-3 text-gray-600 text-base cursor-pointer hover:text-gray-800 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
          onClick={() => router.push("/register")}
        >
      {t('noAccount')}  <span className='text-moon-200 hover:underline'>{t('registerNewAccount')}</span>
        </div>

        <div className="w-full relative my-4">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className={`px-2 text-base bg-white text-gray-500 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                {t('orRegisterWith')}                </span>
            </div>
        </div>

        <div className="w-full">
          {/* <p className="text-center mb-4 text-gray-600">التسجيل بواسطة</p> */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 justify-items-center">
          <div className="p-2 border border-gray-300 rounded-md w-full cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-100 transition duration-150 ease-in-out">
                <FaGoogle className="text-gray-600 text-xl" /> <span className="text-gray-600 text-sm">Google</span>
            </div>
            <div className="p-2 border border-gray-300 rounded-md cursor-pointer w-full flex items-center justify-center gap-2 hover:bg-gray-100 transition duration-150 ease-in-out">
                <FaFacebook className="text-gray-600 text-xl" /> <span className="text-gray-600 text-sm">Facebook</span>
            </div>

            <div className="p-2 border border-gray-300 rounded-md w-full cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-100 transition duration-150 ease-in-out">
                <FaInstagram className="text-gray-600 text-xl" /> <span className="text-gray-600 text-sm">Instagram</span>
            </div>
            <div className="p-2 border border-gray-300 rounded-md w-full cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-100 transition duration-150 ease-in-out">
                <FaXTwitter className="text-gray-600 text-xl" /> <span className="text-gray-600 text-sm">X</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
