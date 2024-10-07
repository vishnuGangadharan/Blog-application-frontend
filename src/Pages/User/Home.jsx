import React, { useState } from 'react'
import {Avatar} from "@nextui-org/react";
import Blogs from './Blogs';
import { FaPlus } from "react-icons/fa";
import ModalOpen from '../../Components/Modal';
import { useScroll } from 'framer-motion';
const Home = () => {

  const [newData, setNewData] = useState(null);
  const dataFromChild = (data) => {
    setNewData(data);
  };
  
  return (
    <div className='min-h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] pb-10'>
    
      <div className='pt-36'>
        <Blogs data = {newData} />
      </div>
      <div className='fixed bottom-20 right-12'>
        <div >
        <ModalOpen newData={dataFromChild} />
        </div>
      </div>
     
    </div>
    
  )
}

export default Home


