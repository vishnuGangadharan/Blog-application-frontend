import React, { useEffect } from 'react';
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { getBlog } from '../../Api/UserApi';
import { useNavigate } from "react-router-dom";

const Blogs = ({data}) => {
  const [blogData, setBlogData] = React.useState([]);
  const navigate = useNavigate();

  const getBlogData = async () => {
    try {
      const response = await getBlog();
      console.log('Blog data:', response.data.data);
      setBlogData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const blogDetails = (id) => {
    navigate("/view", { state: { id } });
  };

  useEffect(() => {
    getBlogData();
    if (Array.isArray(data) && data.length > 0) {
      setBlogData((prev) => [...prev, ...data]);
    }
  }, [data]);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 pt-10 px-16">
      {/* Render cards */}
      {blogData.length > 0 ? (
        blogData.map((item, index) => (
          <Card
            key={index}
            className="transition-transform transform cursor-pointer hover:scale-105 rounded-lg shadow-lg bg-white/70 hover:bg-white/80"
          >
            <CardHeader className="flex flex-col">
              <h4 className="text-lg font-bold text-gray-800">{item.heading}</h4>
              <small className="text-gray-500">12 Tracks</small>
            </CardHeader>
            <CardBody className="overflow-hidden justify-center items-center">
              <Image
                alt="Card background"
                className="object-cover w-full h-auto rounded-t-lg"
              //  https://blog-application-sand-seven.vercel.app/profile
                // src={`http://localhost:5000/uploads/${item.coverImage}`}
                src={`${import.meta.env.VITE_FRONT_URL}/uploads/${item.coverImage}`}
                onClick={() => blogDetails(item._id)}
                width={270}
                height={180} // Optional to control height
              />
            </CardBody>
          </Card>
        ))
      ) : (
        <span className="text-white font-semibold border-2">No blogs available</span>
      )}
    </div>
  );
};

export default Blogs;
