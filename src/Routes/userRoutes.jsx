import { Route, Routes } from "react-router-dom";
import Login from "../Pages/User/Login";
import SignUp from "../Pages/User/Signup";
import Home from "../Pages/User/Home";
import Profile from "../Pages/User/Profile";
import ViewPage from "../Pages/User/ViewPage";
import UserLayout from "../Layout/UserLayout";
import UserLogin from "../UserProtect.jsx/UserLogin";
import UserLogout from "../UserProtect.jsx/UserLogout";
import EditModal from "../Components/EditModal";
const userRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<UserLogout/>}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<UserLogin/>}>
            <Route path="/edit" element={<EditModal />} />
        <Route element={<UserLayout/>}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/view" element={<ViewPage />} />
        </Route>
        </Route>
      </Routes>
    </>
  )
}

export default userRoutes
