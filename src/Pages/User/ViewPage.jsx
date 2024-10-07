import React, { useEffect, useState } from 'react'
import { Card, Avatar } from "@nextui-org/react";
import { useLocation } from 'react-router-dom';
import { getBlogData } from '../../Api/UserApi';
import parse from 'html-react-parser';
const ViewPage = () => {
  const location = useLocation();
  const { id } = location.state || {};

  const [blogDatas, setBlogData] = useState(null);
console.log('oooo',id);

const blogData = async()=>{
  try{
    const response = await getBlogData(id)
    console.log('jjjjjj',response.data.data)
    setBlogData(response.data.data)
  }catch(error){
    console.log(error)
}

}
useEffect(()=>{
  blogData()
},[])


  return (
    

       
    <div className="w-full mt-20 min-h-screen flex flex-col justify-center items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] p-10">
     
          {blogDatas ? (
        <div>
      <Card className="w-[80%] max-w-4xl h-auto bg-black/10 p-6 rounded-xl shadow-lg">
        {/* Blog Image */}
        <div>
          <img
            className="w-full h-[300px] object-cover rounded-lg mb-6"
            src={`http://localhost:5000/uploads/${blogDatas.coverImage}`}
            alt="Blog Image"
          />
        </div>

        {/* Blog Heading and Text */}
        <div className="text-white">
          <h2 className="text-2xl font-bold mb-4">{blogDatas.heading}</h2>
          {/* <p className="text-lg leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lacinia interdum neque. Integer fermentum auctor tortor. Curabitur eget varius nulla. Suspendisse sed augue nec sapien luctus egestas. Etiam venenatis mi id quam vulputate, nec luctus ligula tristique.
          </p> */}
        </div>
      </Card>

      {/* Full Text Content Card */}
      <Card className="w-[80%] max-w-4xl mt-2  p-2 rounded-xl shadow-lg">
        <div className="text-black  rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Content</h3>
          <span className="leading-relaxed text-black ">
          {parse(blogDatas.content)}ddddddddd
          </span>
        </div>

        {/* Optional Blog Footer Image */}
        {blogDatas.optionalImage ? (
        <div className="mt-6">
          <img
            className="w-full h-[200px] object-cover rounded-lg"
            src={`http://localhost:5000/uploads/${blogDatas.optionalImage}`}
            alt="Footer Image"
          />
        </div>
        ):('')}
      </Card>

      </div>
    ) :('')}
    </div>
      
  );
}

export default ViewPage;
