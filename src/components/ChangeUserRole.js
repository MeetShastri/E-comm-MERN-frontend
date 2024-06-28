import React, { useEffect, useState } from 'react'
import ROLE from '../common/role.js'
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-toastify';


const ChangeUserRole = ({
    name, email, role, onClose, userId, callFunc
}) => {
    const [userRole, setUserRole] = useState(null)
    

    useEffect(() => {
        setUserRole(role)
    }, [])
    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value)
        console.log(e.target.value);
    }

    const updateUserRole = async() => {
        const response = await fetch("http://localhost:5000/api/updateuser", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                role: userRole
            })
        })
        const data = await response.json()
        if(data.success){
            toast.success(data.message)
            onClose()
            callFunc()
        }
        if(data.error){
            toast.error(data.error)
        }
    }
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 absolute w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>
      <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
        <div>
        <button className='text-3xl block ml-auto' onClick={onClose}>
            <IoMdClose/>
        </button>
        </div>
        <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
        <p>Name : {name}</p>
        <p>Email : {email}</p>
        <div className='flex items-center justify-between my-4'>
        <p>Role : </p>
        <select className='px-4 py-1 border rounded' value={userRole} onChange={handleOnChangeSelect}>
        {
            Object.values(ROLE).map((role) => (
                <option value={role} key={role}>{role}</option>
            ))
        }
        </select>
        </div>
        <button className='bg-red-600 text-white px-4 py-1 rounded-full hover:bg-red-700 w-fit mx-auto block' onClick={updateUserRole}>Change Role</button>
      </div>
    </div>
  )
}

export default ChangeUserRole
