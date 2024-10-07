import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const userLogin = () => {
        const userInfo = useSelector((state) => state.user.userInfo);

    return userInfo ?  <Outlet /> : <Navigate to="/login"  />

}

export default userLogin
