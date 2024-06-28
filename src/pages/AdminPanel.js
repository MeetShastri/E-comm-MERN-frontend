import React, { useEffect, useState } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import  ROLE  from '../common/role.js'

const AdminPanel = () => {
    const user = useSelector((state) => state.user?.user)
    const [menuDisplay, setMenuDisplay] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
      if(user?.role !== ROLE.ADMIN){
        navigate('/')
      }
    }, [user])
  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
      <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
        <div className='h-32 justify-center flex items-center flex-col'>
        <div className='text-5xl cursor-pointer justify-center flex flex-col relative'>
                {
                    user?.profilePic ? <img src={user?.profilePic} alt={user?.name} className='w-20 h-20 rounded-full object-cover'/> : <FaRegCircleUser/>
                }
                </div>
                <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                <p className='text-sm'>{user?.role}</p>
        </div>
        <div>
            <nav className='grid p-4'>
                <Link to={'allusers'} className='px-2 py-1 hover:bg-slate-200'>All Users</Link>
                <Link to={'allproducts'} className='px-2 py-1 hover:bg-slate-200'>Product</Link>
            </nav>
        </div>
      </aside>

      <main className='w-full h-full '>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminPanel
