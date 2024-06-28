import React, { useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import  ROLE  from '../common/role';

const Header = () => {
    const user = useSelector((state) => state.user?.user)
    const dispatch = useDispatch()
    const [menuDisplay, setMenuDisplay] = useState(false)

    const handleLogout = async() => {
        const response = await fetch("http://localhost:5000/api/userlogout", {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          })
          const data = await response.json()
          if(data.success){
            toast.success(data.message)
            dispatch(setUserDetails(null))
          }
          else{
            toast.error(data.message)
          }
    }
  return (
    <header className=" shadow-md h-16 bg-white">
        <div className="container mx-auto h-full items-center flex px-4 justify-between">
            <div className=''>
                <Link to={'/'}><Logo w={90} h={50}/></Link>
            </div>

            <div className='hidden lg:flex items-center w-full justify-between max-w-sm  border rounded-full focus-within:shadow pl-2'>
                <input type="text" placeholder='Search products here' className='w-full outline-none'/>
                <div className='text-lg min-[50px] h-8 bg-red-600 rounded-r-full p-2 items-center justify-center'><GrSearch/></div>
            </div>

            <div className='flex items-center gap-7 '>
                <div className='relative  flex justify-center'>
                {
                    user?._id && (
                        <div className='text-3xl cursor-pointer' onClick={() => setMenuDisplay(!menuDisplay)}>
                {
                    user?.profilePic ? <img src={user?.profilePic} alt={user?.name} className='w-12 h-12 rounded-full object-cover'/> : <FaRegCircleUser/>
                }
                    
                </div>
                    )
                }
                
                {
                    menuDisplay && (
                        <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded '>
                    <nav>
                    {
                        user?.role === ROLE.ADMIN && (
                            <Link to={'/adminpanel/allproducts'} className='text-sm whitespace-nowrap hover:bg-slate-100 p-2 hidden md:block' onClick={() => setMenuDisplay(!menuDisplay)}>Admin Panel</Link>
                        )

                    }
                         
                    </nav>
                </div>
                    )
                }
                
                </div>
                <div className='text-2xl cursor-pointer relative'>
                   <span><FaShoppingCart/></span> 
                   <div className='text-xs bg-red-600 rounded-full w-4 h-4 flex items-center justify-center absolute -top-2 right-0'>
                    <p className='text-sm'>0</p>
                   </div>
                </div>
                    <div>
                    {
                        user?._id ?(
                            <button className='bg-red-600 text-white px-4 py-1 rounded-full hover:bg-red-700' onClick={handleLogout}>Logout</button>
                        )
                        :(
                        <Link to={'/login'} className='bg-red-600 text-white px-4 py-1 rounded-full hover:bg-red-700'>Login</Link>
                        )
                    }

                        
                    </div>
            </div>
        </div>
    </header>
  )
}


export default Header
