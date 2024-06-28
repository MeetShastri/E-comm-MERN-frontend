import React, { useContext, useState } from 'react'
import loginIcon from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Context from '../context';


const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate();
    const {fetchUserDetails} = useContext(Context)


    const handleChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const dataResponse =  await fetch('http://localhost:5000/api/signin', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const res =  await dataResponse.json()
    if(res.success){
        toast.success(res.message)  
        navigate('/')
        fetchUserDetails()
    }
    else{
        toast.error(res.message)
    }
    }
        console.log("login data", data);
    return (
        <section id='login'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-2 py-5 w-full max-w-sm mx-auto mt-20'>
                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcon} alt="login icon" srcset="" />
                    </div>
                    <form className='pt-6' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Email: </label>
                            <div className='bg-slate-100 p-2'>
                                <input 
                                onChange={handleChange} 
                                name='email' 
                                type="email" 
                                placeholder='Enter Email' 
                                className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>
                        <div>
                            <label>Password: </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input 
                                onChange={handleChange} name='password' 
                                type={showPassword ? "text" : "password"} placeholder='Enter Password' 
                                className='w-full h-full outline-none bg-transparent' />
                                <div className='cursor-pointer text-xl'>
                                    <span>
                                        {showPassword ? <FaEye onClick={() => setShowPassword(false)} /> : <FaRegEyeSlash onClick={() => setShowPassword(true)} />}
                                    </span>
                                </div>
                            </div>
                            <Link to={'/forgotpassword'} className='text-red-600 hover:underline block w-fit ml-auto'>Forgot Password</Link>
                        </div>
                        <button className='bg-red-600 text-white px-6 py-2 rounded-full   hover:scale-110 hover:text-white w-full max-w-[150px] transition-all mx-auto block mt-4'>Login</button>
                    </form>
                    <p className='text-center my-4'>Don't have an account? <Link to={'/signup'} className='text-red-600 hover:underline hover:text-red-700'>Sign Up</Link></p> 
                </div>
            </div>
        </section>
    )
}


export default Login
