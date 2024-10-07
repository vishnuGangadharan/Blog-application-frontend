import { Avatar } from '@nextui-org/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../Redux/UserSlice'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Nav = () => {

    const userInfo = useSelector((state) => state.user.userInfo);
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = async() => {
        dispatch(logoutUser())
        localStorage.removeItem('token')
        navigate('/login')
    }
  return (
    <div className='w-full h-28 bg-black/95 fixed top-0 z-10 flex   justify-evenly'>
      <div className='ml-24 flex items-center'>
        <span className='md:text-3xl text-blue-800 font-bold'>Blog Application</span>
      </div>
      <div className='flex items-center'>
     <Link to='/'> <span className='text-white  hover:text-blue-700  mr-40 font-bold text-2xl'>home</span></Link>

      </div>
      <div className='mr-24 gap-6  flex items-center'>
      <Link to='/profile'><Avatar  className='cursor-pointer'  src={userInfo && userInfo.profilePicture} size="lg" /></Link>
      <span className='text-white ml-2 font-semibold hover:text-red-400 cursor-pointer' onClick={handleLogout}>Logout</span>
      </div>
      </div>
  )
}
//"https://i.pravatar.cc/150?u=a04258114e29026302d"

export default Nav
