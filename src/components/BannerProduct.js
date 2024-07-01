import React from 'react'
// import image1 from '../assets/banner/img1.webp'
// import image1Mobile from '../assest/banner/img1_mobile.png'
import image1 from '../assest/banner/img1.webp'
const BannerProduct = () => {
  return (
    <div className='container mx-auto px-4 rounded overflow-hidden'>
      <div className='h-72 w-full bg-slate-200'>
            <img src={image1} alt="" />
      </div>
    </div>
  )
}

export default BannerProduct
