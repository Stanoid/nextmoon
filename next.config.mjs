/** @type {import('next').NextConfig} */

//import withPlaiceholder from "@plaiceholder/next";
import withBundleAnalyzer from"@next/bundle-analyzer"
const nextConfig = {
  experimental: {
    optimizePackageImports: ['nextui-org/react'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
    images: {

  
        // domains: [ '192.168..61.110','localhost'],
  
        remotePatterns: [
          // {
          //   protocol: 'https',
          //   hostname: 'res.cloudinary.com',
          //   port: '',
          //   pathname: '/account123/**',
          // },
          {
            protocol: 'http',
            hostname: '**',
          },
          {
            protocol: 'https',
            hostname: '**',
          },
        ],
      },

      webpack(config) {
        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find((rule) =>
          rule.test?.test?.('.svg'),
        )
    
        config.module.rules.push(
          // Reapply the existing rule, but only for svg imports ending in ?url
          {
            ...fileLoaderRule,
            test: /\.svg$/i,
            resourceQuery: /url/, // *.svg?url
          },
          // Convert all other *.svg imports to React components
          {
            test: /\.svg$/i,
            issuer: fileLoaderRule.issuer,
            resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
            use: ['@svgr/webpack'],
          },
        )
    
        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i
    
        return config
      },
    


};



// reactStrictMode: true,
// images: {
//   domains: ["https://dhback-8b00e5257b7f.herokuapp.com/","192.168.43.110","res.cloudinary.com","http://localhost:3000"],
// },

// webpack(config) {
//   config.module.rules.push({
//     test: /\.svg$/,
//     use: ["@svgr/webpack"]
//   });

//   return config;




export default nextConfig;
//module.exports = withBundleAnalyzer(nextConfig)


