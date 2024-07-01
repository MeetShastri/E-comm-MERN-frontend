import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])
  const fetchAllProduct = async() => {
    const response = await fetch("http://localhost:5000/api/getproducts", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    setAllProduct(data?.data || [])
  }

  useEffect(() => {
    fetchAllProduct()
  }, [])
  return (
    <div>
      <div className='bg-white p-2 px-4 flex justify-between items-center'>
        <h2 className='text-lg font-bold'>All Products</h2>
        <button className='border-2 py-1 px-3 rounded-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all' onClick={() => setOpenUploadProduct(true)}>Upload Product</button>
      </div>

      <div className='flex items-center gap-5 py-4 flex-wrap h-[calc(100vh-190px)]  overflow-y-scroll'>
        {
          allProduct.map((product,index) => {
            return(
              <AdminProductCard key={index+"allproduct"} data={product} fetchData = {fetchAllProduct}/>
            )
          })
        }
      </div>
    {
        openUploadProduct && <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
    }
    </div>
  )
}

export default AllProducts
