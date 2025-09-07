import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
  //output: 'export', // Outputs a Single-Page Application (SPA)
  //distDir: 'build', // Changes the build output directory to `build`
  images: {
    domains: [
      'kiskovi97.github.io', 
      'streetkitchen.hu', 
      'img-global.cpcdn.com', 
      "img-global.cpcdn.com", 
      "azureskproductionfs.blob.core.windows.net",
      "static.vecteezy.com",
      "p16-pu-sign-no.tiktokcdn-eu.com"
    ],
  },
}
 
export default nextConfig