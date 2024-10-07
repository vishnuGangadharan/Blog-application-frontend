
import React from 'react';
import {  Button, } from "@nextui-org/react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { signupValidationSchema } from '../../Validations/SignUpValidations';
import { useFormik } from 'formik';
import { signup } from '../../Api/UserApi';
import { useDispatch } from 'react-redux';
import  {  setUserInfo } from '../../Redux/UserSlice'
import { Link } from 'react-router-dom';
const SignUp= () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const  {errors,handleBlur,handleChange,handleSubmit,touched}  = useFormik({
        initialValues: {
          name : '',
          email: '',
          phone : '',
          password: '',
          confirmPassword : '',
        },
        validationSchema: signupValidationSchema,
        onSubmit: async( data ) => {
           const response = await signup(data)
           console.log('res',response);
           if(response.status == 200){
            toast.success(response.data.message)
            dispatch(setUserInfo(response.data.data))
            navigate('/')
           }

            
        },
      });
    



  return (
    <div className="flex justify-center  absolute inset-0 -z-10 h-full w-full items-center  [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">

      <div className="bg-blue-600 sm:w-[30%] p-8 sm:p-12 rounded-3xl shadow-2xl text-center backdrop-filter backdrop-blur-sm bg-opacity-5 border border-blue-500">
        <h2 className='text-white mb-5 font-semibold text-3xl'>Sign Up</h2>
        <form className='flex flex-col' onSubmit={handleSubmit} >
          <input
            name='name'
            onChange={handleChange}
            onBlur={handleBlur}
            className='mt-3 border-blue-700 text-white shadow appearance-none border rounded-xl w-full py-3 px-6 leading-tight focus:outline-none focus:shadow-outline  backdrop-blur-sm bg-white/20 placeholder-white 
           hover:bg-white/40 hover:border-blue-500 transition duration-200 ease-in-out text-md'
            placeholder='Name'
          />  
                 {errors.name && touched.name && <p className='text-sm text-red-500'>{errors.name}</p>}

          <input
            onChange={handleChange}
            onBlur={handleBlur}
            type="email"
            name='email'
            className='mt-3 border-blue-700 text-white shadow appearance-none border rounded-xl w-full py-3 px-6 leading-tight focus:outline-none focus:shadow-outline  backdrop-blur-sm bg-white/20 placeholder-white 
             hover:bg-white/40 hover:border-blue-500 transition duration-200 ease-in-out text-md' 
            placeholder='Email'
            
          />    
                 {errors.email && touched.email && <p className='text-sm text-red-500'>{errors.email}</p>}

      
          <input
            type="phone"
            name='phone'
            onChange={handleChange}
            onBlur={handleBlur}
            className='mt-3 border-blue-700 text-white shadow appearance-none border rounded-xl w-full py-3 px-6 leading-tight focus:outline-none focus:shadow-outline  backdrop-blur-sm bg-white/20 placeholder-white 
             hover:bg-white/40 hover:border-blue-500 transition duration-200 ease-in-out text-md' 
            placeholder='Phone'
          />    
                 {errors.phone && touched.phone && <p className='text-sm text-red-500'>{errors.phone}</p>}

          <input
            type="password"
            name='password'
            onChange={handleChange}
            onBlur={handleBlur}
            className='mt-3 border-blue-700 text-white shadow appearance-none border rounded-xl w-full py-3 px-6 leading-tight focus:outline-none focus:shadow-outline  backdrop-blur-sm bg-white/20 placeholder-white 
             hover:bg-white/40 hover:border-blue-500 transition duration-200 ease-in-out text-md'
            placeholder='Password'
            
          />   
                 {errors.password && touched.password && <p className='text-sm text-red-500'>{errors.password}</p>}

       
          <input
            type="password"
            name='confirmPassword'
            onChange={handleChange}
            onBlur={handleBlur}
            className='mt-3 border-blue-700 text-white shadow appearance-none border rounded-xl w-full py-3 px-6 leading-tight focus:outline-none focus:shadow-outline  backdrop-blur-sm bg-white/20 placeholder-white 
          hover:bg-white/40 hover:border-blue-500 transition duration-200 ease-in-out text-md'
            placeholder='Confirm password'
          />
          {errors.confirmPassword && touched.confirmPassword && <p className='text-sm text-red-500'>{errors.confirmPassword}</p>}

          <div className="mt-5 self-center w-[50%]">
            <Button
              radius="full"
              type='submit'
              className="bg-gradient-to-tr mt-2 mb-3 font-semibold from-pink-500 to-yellow-500 text-white shadow-lg w-full"
            >
              Sign Up
            </Button>
          </div>
        </form>
        <span className='text-white mt-3 '>Already have a account ? <span className='text-blue hover:font-semibold hover:text-green-700 m-5 cursor-pointer'><Link to='/login'>Login</Link>  </span></span>
      </div>
    </div>
  );
}

export default SignUp;


