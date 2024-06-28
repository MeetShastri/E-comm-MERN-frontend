import React from 'react'
const url = `https://api.cloudinary.com/v1_1/deo6ymlzx/image/upload`
const uploadImage = async(image) => {
    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset", "ecommerce")
    const dataRespose = await fetch(url,{
        method: "POST",
        body: formData
    })
    return dataRespose.json()
    
}

export default uploadImage
