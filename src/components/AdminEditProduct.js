import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import productCategory from '../helpers/productCategory.js'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage.js';
import DisplayImage from './DisplayImage.js';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';

const AdminEditProduct = ({
onClose,
productData,
fetchData
}) => {
    const [data, setData] = useState({
        ...productData,
        productName: productData?.productName,
        brandName: productData?.brandName,
        category: productData?.category,
        productImage: productData?.productImage || [],
        description: productData?.description,
        price: productData?.price,
        sellingPrice: productData?.sellingPrice,
    })
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
    const [fullScreenImage, setFullScreenImage] = useState("")

    const handleOnChange = (e) => {
        const {name, value} = e.target
        setData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
    }

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]
        const uploadImageCloudinary = await uploadImage(file)

        setData((prev) => { return { ...prev, productImage: [...prev.productImage, uploadImageCloudinary.url] } })
    }

    const handleDeleteProductImage = async(index)=>{
    console.log("image index",index)
    
    const newProductImage = [...data.productImage]
    newProductImage.splice(index,1)

    setData((preve)=>{
      return{
        ...preve,
        productImage : [...newProductImage]
      }
    })
    
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    const response = await fetch('http://localhost:5000/api/updateproduct', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const res = await response.json()
    if(res.success){
        toast.success(res.message)
        onClose()
        fetchData()
    }
    else{
        toast.error(res.message)
    }
  }
  return (
    <div className='fixed w-full h-full bottom-0 top-0 left-0 right-0 flex justify-center items-center bg-slate-200 bg-opacity-35'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-auto'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-lg font-bold'>Edit Product</h2>

                    <div className='text-3xl block ml-auto hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <IoMdClose />
                    </div>
                </div>
                <form className='grid p-4 gap-2  h-full pb-5' onSubmit={handleSubmit}>
                    <label htmlFor="productName" >Product Name</label>
                    <input
                        type='text'
                        id='productName'
                        name='productName'
                        placeholder='Enter Product Name'
                        value={data.productName}
                        onChange={handleOnChange}
                        required
                        className='p-2 bg-slate-100 border rounded' />


                    <label htmlFor="productName" className='mt-3' >Brand Name</label>
                    <input
                        type='text'
                        id='brandName'
                        name='brandName'
                        placeholder='Enter Brand Name'
                        value={data.brandName}
                        onChange={handleOnChange}
                        required
                        className='p-2 bg-slate-100 border rounded' />



                    <label htmlFor="category" className='mt-3'>Category</label>
                    <select value={data.category} name="category" onChange={handleOnChange} required className='p-2 bg-slate-100 border rounded'>
                    <option value={""}>Select Category</option>
                        {
                            productCategory.map((category, index) => (
                                <option value={category.value} key={category.value + index}>{category.label}</option>
                            ))
                        }
                    </select>


                    <label htmlFor="productImage" className='mt-3'>Product Image</label>
                    <label htmlFor='uploadImageInput'>
                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>

                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>

                                <span><FaCloudUploadAlt className='text-4xl text-center text-slate-500' /></span>
                                <p>Upload Product Image</p>
                                <input type="file" id="uploadImageInput" className='hidden' onChange={handleUploadProduct} />
                            </div>
                        </div>
                    </label>
                    <div>
                  {
                    data?.productImage[0] ? (
                        <div className='flex items-center gap-2'>
                            {
                              data.productImage.map((el,index)=>{
                                return(
                                  <div className='relative group'>
                                      <img 
                                        src={el} 
                                        alt={el} 
                                        width={80} 
                                        height={80}  
                                        className='bg-slate-100 border cursor-pointer'  
                                        onClick={()=>{
                                          setOpenFullScreenImage(true)
                                          setFullScreenImage(el)
                                        }}/>

                                        <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleDeleteProductImage(index)}>
                                          <MdDelete/>  
                                        </div>
                                  </div>
                                )
                              })
                            }
                        </div>
                    ) : (
                      <p className='text-red-600 text-xs'>*Please upload product image</p>
                    )
                  }
                  
              </div>

              <label htmlFor='price' className='mt-3'>Price :</label>
              <input 
                type='number' 
                id='price' 
                placeholder='Enter Price' 
                value={data.price} 
                name='price'
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
              />

<label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
              <input 
                type='number' 
                id='sellingPrice' 
                placeholder='Enter Selling Price' 
                value={data.sellingPrice} 
                name='sellingPrice'
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
              />

            <label htmlFor='description' className='mt-3'>Description :</label>
              <textarea 
                className='h-28 bg-slate-100 border resize-none p-1' 
                placeholder='Enter Product Description' 
                rows={3} 
                onChange={handleOnChange} 
                name='description'
                value={data.description}
              >
              </textarea>
                    <button className='bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 mb-10'>Update Product</button>
                </form>
            </div>
            {
                openFullScreenImage && (
                    <DisplayImage imageUrl={fullScreenImage} onClose={() => setOpenFullScreenImage(false)} />
                )
            }

        </div>
  )
}

export default AdminEditProduct
