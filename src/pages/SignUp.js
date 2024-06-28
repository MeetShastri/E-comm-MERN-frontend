import React, { useState } from 'react'
import loginIcon from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/ImageToBase64';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    
        const [showPassword, setShowPassword] = useState(false)
        const [showConfirmPassword, setShowConfirmPassword] = useState(false)
        const [data, setData] = useState({
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
            profilePic:""
        })

        const navigate = useNavigate();
    
        const handleChange = (e) => {
            const { name, value } = e.target
            setData((preve) => {
                return {
                    ...preve,
                    [name]: value
                }
            })
        }

        const handleUploadPic = async(e) => {
            const file = e.target.files[0]
            if (file.size > 1048576) { // 1 MB limit (adjust as needed)
            toast.error('Image size is too large (max 1 MB)');
            return;
    }
            console.log("file", file);
             const imagePic = await imageTobase64(file);
           
            setData((preve) => {
                return {
                    ...preve,
                    profilePic: imagePic
                }
            })
        }
    
        const handleSubmit = async(e) => {
            e.preventDefault()
            if(data.password === data.confirmPassword) {
                const dataResponse = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const res = await dataResponse.json()
            if(res.success){
                toast.success(res.message)
                navigate('/login')
            }
            else{
                toast.error(res.message)
            }
            console.log("res", res);
        }
        else {
            toast.error("Password and Confirm Password should be same")
        }
            }

            

  return (
    <section id='signup'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-2 py-5 w-full max-w-sm mx-auto mt-20'>
                    <div className='w-20 h-20 mx-auto relative rounded-full overflow-hidden'>
                        <div>
                        <img src={data.profilePic || loginIcon} alt="login icon" srcset="" />
                        </div>
                        <form>

                        <label>
                        <div className='text-xs bg-opacity-80 pb-4 cursor-pointer bg-slate-200 text-center py-4 absolute bottom-0 w-full'>
                            Upload Photo
                        </div>
                        <input type="file" className='hidden' onChange={handleUploadPic}/>
                        </label>
                        </form>
                    </div>
                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Name: </label>
                            <div className='bg-slate-100 p-2'>
                                <input 
                                onChange={handleChange} 
                                name='name' 
                                type="text" 
                                placeholder='Enter Name' 
                                className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>
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
                                value={data.password}
                                className='w-full h-full outline-none bg-transparent' />
                                <div className='cursor-pointer text-xl'>
                                    <span>
                                        {showPassword ? <FaEye onClick={() => setShowPassword(false)} /> : <FaRegEyeSlash onClick={() => setShowPassword(true)} />}
                                    </span>
                                </div>
                            </div>
                            {/* <Link to={'/forgotpassword'} className='text-red-600 hover:underline block w-fit ml-auto'>Forgot Password</Link> */}
                        </div>
                        <div>
                            <label>Confirm Password: </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input 
                                onChange={handleChange} name='confirmPassword' 
                                type={showConfirmPassword ? "text" : "password"} placeholder='Enter Confirm Password' 
                                value={data.confirmPassword}
                                className='w-full h-full outline-none bg-transparent' />
                                <div className='cursor-pointer text-xl'>
                                    <span>
                                        {showConfirmPassword ? <FaEye onClick={() => setShowConfirmPassword(false)} /> : <FaRegEyeSlash onClick={() => setShowConfirmPassword(true)} />}
                                    </span>
                                </div>
                            </div>
                            {/* <Link to={'/forgotpassword'} className='text-red-600 hover:underline block w-fit ml-auto'>Forgot Password</Link> */}
                        </div>
                        <button className='bg-red-600 text-white px-6 py-2 rounded-full  hover:text-red-700 hover:scale-110 hover:text-white w-full max-w-[150px] transition-all mx-auto block mt-4'>Sign Up</button>
                    </form>
                    <p className='text-center my-4'>Already have an account? <Link to={'/login'} className='text-red-600 hover:underline hover:text-red-700'>Sign In</Link></p> 
                </div>
            </div>
        </section>
  )
}

export default SignUp
