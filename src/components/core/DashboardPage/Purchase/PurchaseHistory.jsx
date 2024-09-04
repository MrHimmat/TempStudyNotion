import React, { useState } from 'react'
import { AiOutlineMenuUnfold } from "react-icons/ai";
import Side from "../Side";
export default function PurchaseHistory () {

  const [sidebarVisible , setSidebarVisible] = useState(false);

  const toggleSidebar = () =>{
    setSidebarVisible(prev=>!prev);
  }

  return (
    <div className='text-white justify-center items-center flex h-screen font-bold font-inter font-500 text-4xl w-full'>
      {/* Mobile menu icon */}
      <div className="lg:hidden -mt-5 h-full flex text-white" onClick={toggleSidebar}>
        <AiOutlineMenuUnfold className="text-3xl" />
      </div>

      {/* Sidebar */}
      <Side isVisible={sidebarVisible} onClose={() => setSidebarVisible(false)} />
        This Page Is Temporarally Not Available ....
    </div>
  )
}
