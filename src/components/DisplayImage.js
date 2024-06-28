import React from 'react'
import { IoMdClose } from 'react-icons/io'

const DisplayImage = ({
    imageUrl,
    onClose
}
) => {
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
           

                <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-4'>

                <div className='text-3xl block ml-auto w-fit hover:text-red-600 cursor-pointer' onClick={onClose}>
            <IoMdClose/>
        </div>
                    <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
                        <img src={imageUrl} alt="" className='w-full h-full' />
                    </div>

                </div>

     

        </div>
    )
}

export default DisplayImage
