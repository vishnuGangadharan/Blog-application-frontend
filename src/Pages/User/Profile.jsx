import React, { useEffect } from "react";
import { Card, Avatar } from "@nextui-org/react";
import { CardHeader, CardBody, Image } from "@nextui-org/react";
import parse from 'html-react-parser';
import { useSelector } from "react-redux";
import { deleteBlog, getBlog, showUserBlogs } from "../../Api/UserApi";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ActionModal from "../../Components/ActionModal";
import { MdDelete } from "react-icons/md";
import EditModal from "../../Components/EditModal";

const Profile = () => {
  const [blogData, setBlogData] = React.useState(null); 
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [updatedData, setUpdatedData] = React.useState(null);

  const handleUpdateFromChild = (data) => {
    setBlogData((prev) => {
      const updatedData = prev.map((post) => 
      post._id == data._id ? {...post,...data } : post)
      return updatedData;
    })
  }

  const getBlogData = async () => {
    try {
      const response = await showUserBlogs();
      console.log('Blog data:', response.data.data);
      setBlogData(response.data.data || []); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogData();
  }, [userInfo._id]);

  const handleDelete = async (id) => {
    try {
      const response = await deleteBlog(id);
      console.log('Deleted:', response);
      setBlogData(response.data.data || []);
      toast.success("Blog deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const blogDetails = (id) => {
    navigate("/view", { state: { id } });
  }

  // const handleEdit = (id) => {
  //   navigate("/edit", { state: { id } });
  // }

  return (
    <div className="flex flex-col items-center min-h-screen w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] pt-28 pb-10">
      <Card className="w-[60%] mt-10 h-56 flex flex-col md:flex-row justify-center items-center bg-white/10 backdrop-blur-sm rounded-xl border border-gray-700">
        <div className="mr-10">
          <Avatar
            src={userInfo && userInfo.profilePicture}
            className="w-24 h-24 md:w-28 md:h-28 text-large border-4 border-blue-600"
          />
        </div>

        <div className="flex flex-col gap-4 w-full md:w-[60%]">
          <input
            type="text"
            readOnly
            className="border-blue-700 text-white shadow appearance-none border rounded-xl w-full py-3 px-6 leading-tight focus:outline-none focus:shadow-outline backdrop-blur-sm bg-white/20 placeholder-white hover:bg-white/40 hover:border-blue-500 transition duration-200 ease-in-out text-md"
            placeholder={userInfo && userInfo.userName}
            autoComplete="off"
          />
          <input
            type="text"
            readOnly
            className="border-blue-700 text-white shadow appearance-none border rounded-xl w-full py-3 px-6 leading-tight focus:outline-none focus:shadow-outline backdrop-blur-sm bg-white/20 placeholder-white hover:bg-white/40 hover:border-blue-500 transition duration-200 ease-in-out text-md"
            placeholder={userInfo && userInfo.email}
            autoComplete="off"
          />
        </div>
      </Card>

      <div className="w-full mt-14 text-center">
        <span className="text-white text-3xl font-semibold">My Blogs</span>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 pt-10 px-16">
          {blogData && blogData.length > 0 ? (
            blogData.map((item, index) => (
              <Card
                key={index}
                className="transition-transform cursor-pointer transform hover:scale-105 rounded-lg shadow-lg bg-white/70 hover:bg-white/80"
              >
                <CardHeader className="flex flex-col">
                  <h4 className="text-lg font-bold text-gray-800">{item.heading}</h4>
                </CardHeader>
                <CardBody className="overflow-hidden justify-center items-center">
                  <Image
                    alt="Card background"
                    className="object-cover w-full h-auto rounded-t-lg"
                    src={item.coverImage}
                    onClick={() => blogDetails(item._id)}
                    width={270}
                    height={180}
                  />
                <div className="flex justify-between items-center mt-5 gap-16" >
                {/* <FaEdit size={20} className="hover:text-blue-500"  /> */}
                {/* <ActionModal 
                  icon={<FaEdit size={20} className="hover:text-blue-500" />} 
                  // handleDelete={() => handleDelete(item._id)}  */}
{/* 
                /> */}
                <EditModal 
                coverImageProp={item.coverImage} 
                headingProp={item.heading} 
                contentProp={item.content}  
                optionalImageProp={item.optionalImage} 
                id={item._id}
                onUpdate={handleUpdateFromChild}
                 />

                <ActionModal 
                  icon={<MdDelete size={20} className="hover:text-blue-500" />} 
                  handleDelete={() => handleDelete(item._id)} 
                />
                </div>
                </CardBody>
              </Card>
            ))
          ) : (
            <span className="text-white font-semibold border-2">No blogs available</span>
          ) }
        </div>
      </div>
    </div>
  );
};

export default Profile;
