"use client"

import { ROOT_URL } from "../../../../local"

/**
 * Initiates social login by redirecting to the provider's OAuth page
 * @param {string} provider - The provider name ('google', 'facebook')
 */
export const initSocialLogin = (provider) => {
  // Strapi social auth endpoint (needs /api/ prefix)
  const socialAuthUrl = `${ROOT_URL}api/connect/${provider}`
  
  // Redirect to the OAuth provider
  window.location.href = socialAuthUrl
}

/**
 * Handles the callback from social login
 * This should be called on the callback page after OAuth redirect
 * @param {string} provider - The provider name
 * @param {string} accessToken - The access token from the URL params
 */
export const handleSocialCallback = async (provider, accessToken) => {
  try {
    const response = await fetch(
      `${ROOT_URL}auth/${provider}/callback?access_token=${accessToken}`
    )
    
    if (!response.ok) {
      throw new Error('Social authentication failed')
    }
    
    const data = await response.json()
    return { error: false, data }
  } catch (error) {
    console.error('Social login error:', error)
    return { error: true, data: error.message }
  }
}
