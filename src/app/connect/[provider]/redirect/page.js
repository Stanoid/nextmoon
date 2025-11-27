'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useParams, useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { ROOT_URL } from '../../../local'
import * as types from '../../../lib/types'

export default function SocialAuthCallback() {
  const searchParams = useSearchParams()
  const params = useParams()
  const router = useRouter()
  const dispatch = useDispatch()
  const [status, setStatus] = useState('جاري التحقق...')
  const [error, setError] = useState(null)

  const ls = typeof window !== 'undefined' ? require('local-storage') : null

  useEffect(() => {
    const handleCallback = async () => {
      const provider = params.provider
      const accessToken = searchParams.get('access_token')
      const idToken = searchParams.get('id_token')

      if (!accessToken && !idToken) {
        setError('لم يتم العثور على رمز المصادقة')
        setStatus('فشل تسجيل الدخول')
        return
      }

      try {
        // Build callback URL with available tokens
        let callbackUrl = `${ROOT_URL}auth/${provider}/callback?`
        if (accessToken) callbackUrl += `access_token=${accessToken}`
        if (idToken) callbackUrl += `${accessToken ? '&' : ''}id_token=${idToken}`

        const response = await fetch(callbackUrl)
        
        if (!response.ok) {
          throw new Error('فشل التحقق من الحساب')
        }

        const data = await response.json()

        if (data.jwt && data.user) {
          // Save token
          if (ls) {
            ls.set('atkn', data.jwt)
          }

          // Dispatch login action
          dispatch({
            type: types.LOGIN,
            payload: { error: false, data }
          })

          setStatus('تم تسجيل الدخول بنجاح!')

          // Redirect based on user type
          setTimeout(() => {
            switch (data.user.type) {
              case 1:
                router.replace('/admin')
                break
              case 2:
                router.replace('/agent')
                break
              case 3:
                router.replace('/vendor')
                break
              case 5:
                router.replace('/delivery')
                break
              default:
                router.replace('/')
            }
          }, 1000)
        } else {
          throw new Error('بيانات غير صالحة من الخادم')
        }
      } catch (err) {
        console.error('Social auth error:', err)
        setError(err.message || 'حدث خطأ أثناء تسجيل الدخول')
        setStatus('فشل تسجيل الدخول')
      }
    }

    handleCallback()
  }, [searchParams, params, dispatch, router, ls])

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        {error ? (
          <>
            <div className="text-red-500 text-xl mb-4">❌</div>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => router.push('/login')}
              className="px-4 py-2 bg-moon-200 text-white rounded hover:bg-moon-300"
            >
              العودة لتسجيل الدخول
            </button>
          </>
        ) : (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-moon-200 mx-auto mb-4"></div>
            <p className="text-gray-600">{status}</p>
          </>
        )}
      </div>
    </div>
  )
}
