import { useState } from "react";
import ChangeProfilePicture from "./ChangeProfilePicture";
import DeleteAccount from "./DeleteAccount";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import Side from "../Side";
export default function Settings() {


  const [sidebarVisible , setSidebarVisible] = useState(false);

  const toggleSidebar = () =>{
    setSidebarVisible(prev=>!prev)
  }

  return (
    <div className="space-y-14">
      {/* Mobile menu icon */}
      <div className="lg:hidden -mt-5 h-full flex text-white" onClick={toggleSidebar}>
        <AiOutlineMenuUnfold className="text-3xl" />
      </div>

      {/* Sidebar */}
      <Side isVisible={sidebarVisible} onClose={() => setSidebarVisible(false)} />
      <div>
           <h1 className="text-4xl font-bold font-500 font-inter text-richblack-5">Edit Profile</h1>
      </div>

      {/* Change Profile Picture */}
      <section className="bg-richblack-800 rounded-md border border-richblack-700 p-8">
        <h2 className="text-3xl font-semibold text-richblack-5 mb-4">
          Change Profile Picture
        </h2>
        <ChangeProfilePicture />
      </section>

      {/* Profile */}
      <section className="bg-richblack-800 rounded-md border border-richblack-700 p-8">
        <h2 className="text-3xl font-semibold text-richblack-5 mb-4">Edit Profile</h2>
        <EditProfile />
      </section>

      {/* Password */}
      <section className="bg-richblack-800 rounded-md border border-richblack-700 p-8">
        <h2 className="text-3xl font-semibold text-richblack-5 mb-4">Update Password</h2>
        <UpdatePassword />
      </section>

      {/* Delete Account */}
      <section className="bg-richblack-800 rounded-md border border-pink-700 p-8">
        <h2 className="text-3xl font-semibold text-richblack-5 mb-4">Delete Account</h2>
        <DeleteAccount />
      </section>
    </div>
  );
}
