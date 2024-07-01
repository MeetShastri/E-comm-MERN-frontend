import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';


const AdminProductCard = ({
    data,
    fetchData
}) => {
    const[editProduct, setEditProduct] = useState(false)
  return (
    <div className='p-4 bg-white'>
    <div className='w-40'>
    <div className='w-32 h-32 justify-center items-center'>
    <img src={data?.productImage[1]} width={120} height={120} alt="" className='object-fill mx-auto h-full'/>
    </div>
                <h1 className='text-ellipsis line-clamp-2'>{data?.productName}</h1>
                <div>
                <p className='font-semibold'>
                {
                    displayINRCurrency(data.sellingPrice)
                }

                </p>
                <div className='w-fit ml-auto p-2 hover:bg-green-600 rounded-full hover:text-white cursor-pointer bg-green-200' onClick={() => setEditProduct(true)}>
                    <MdEdit/>
                </div>
                </div>

                
    </div>
                
                {
                    editProduct && <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchData={fetchData}/>
                }
              </div>
  )
}

export default AdminProductCard
