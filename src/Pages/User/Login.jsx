import React from 'react'
import {  Button, } from "@nextui-org/react";
import { toast } from 'react-toastify';
import { loginValidationSchema } from '../../Validations/LoginValidations';
import { useFormik } from 'formik';
import { login } from '../../Api/UserApi';
import { useDispatch } from 'react-redux';
import  {  setUserInfo } from '../../Redux/UserSlice'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const  {errors,handleBlur,handleChange,handleSubmit,touched}  = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: loginValidationSchema,
        onSubmit: async( data ) => {
            try {
                const response = await login(data)
                console.log('login',response);
                if(response.status ==200){
                    toast.success(response.data.message)
            dispatch(setUserInfo(response.data.data))
            localStorage.setItem('token',response.data.token)
            navigate('/')
                }
                
                
            } catch (error) {
                console.log(error);
                
            }            
        },
      });
    

    return (
        <div className="flex justify-center  absolute inset-0 -z-10 h-full w-full items-center  [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">

            <div className="bg-blue-600 sm:w-[30%] p-8 sm:p-12 rounded-3xl shadow-2xl text-center backdrop-filter backdrop-blur-sm bg-opacity-5 border border-blue-500">
                <h2 className='text-white mb-5 font-semibold text-3xl'>Login</h2>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                    <input
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='mt-3 border-blue-700 text-white shadow appearance-none border rounded-xl w-full py-3 px-6 leading-tight focus:outline-none focus:shadow-outline  backdrop-blur-sm bg-white/20 placeholder-white 
                      hover:bg-white/40 hover:border-blue-500 transition duration-200 ease-in-out text-md'
                        placeholder='Email'

                    />
                    {errors.email &&  touched.email && <p className='text-sm text-red-500'>{errors.email}</p>}
                    <input
                        name="password"
                        type='password'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='mt-3 border-blue-700 text-white shadow appearance-none border rounded-xl w-full py-3 px-6 leading-tight focus:outline-none focus:shadow-outline  backdrop-blur-sm bg-white/20 placeholder-white 
                      hover:bg-white/40 hover:border-blue-500 transition duration-200 ease-in-out text-md'
                        placeholder='Password'
                        autoComplete="off"
                    />
                     {errors.password &&  touched.password && <p className='text-sm text-red-500'>{errors.password}</p>}


                    <div className="mt-5 self-center w-[50%]">
                        <Button
                            radius="full"
                            type='submit'
                            className="bg-gradient-to-tr mt-2 mb-3 font-semibold from-pink-500 to-yellow-500 text-white shadow-lg w-full"
                        >
                            Login
                        </Button>
                    </div>
                </form>
                <span className='text-white mt-3 '>don't have a account ? <span className='text-blue hover:font-semibold hover:text-green-700 m-5 cursor-pointer' ><Link to='/signup'>SignUp</Link>  </span></span>
            </div>
        </div>
    )
}

export default Login
