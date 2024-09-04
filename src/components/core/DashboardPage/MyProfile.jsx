import React, { useState } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import {formattedDate} from "../../../utils/dateFormatter"
import { AiOutlineMenuUnfold } from "react-icons/ai";
import Side from "./Side"; // Ensure the Sidebar component is correctly imported

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(prevState => !prevState);
  };

  return (
    <div className="relative p-4 lg:p-8">
      {/* Mobile menu icon */}
      <div className="lg:hidden -mt-5 flex text-white" onClick={toggleSidebar}>
        <AiOutlineMenuUnfold className="text-3xl" />
      </div>

      {/* Sidebar */}
      <Side isVisible={sidebarVisible} onClose={() => setSidebarVisible(false)} />

      <h1 className="mb-8 text-2xl font-bold mt-5 text-richblack-5 lg:text-3xl">
        My Profile
      </h1>
      {/* Profile Overview */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
        <div className="flex items-center gap-4 rounded-md border border-richblack-700 bg-richblack-800 p-6 lg:w-full">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="w-24 h-24 rounded-full object-cover border-4 border-richblack-700"
            onClick={() => navigate("/dashboard/settings")}
          />
          <div className="space-y-2 flex-grow">
            <p className="text-lg lg:w-full w-[120px] font-semibold text-richblack-5 lg:text-xl truncate">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm lg:w-full w-[120px] text-richblack-300 truncate">{user?.email}</p>
          </div>
          <div className="lg:mr-2 lg:flex hidden ml-7">
            <IconBtn
              text="Edit"
              onclick={() => navigate("/dashboard/settings")}
            >
              <RiEditBoxLine />
            </IconBtn>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="my-6 rounded-md border border-richblack-700 bg-richblack-800 p-6 lg:my-8 lg:p-8">
        <div className="flex items-center justify-between mb-4">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p className={`${
          user?.additionalDetails?.about ? "text-richblack-5" : "text-richblack-400"
        } text-sm`}>
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>

      {/* Personal Details Section */}
      <div className="my-6 rounded-md border border-richblack-700 bg-richblack-800 p-6 lg:my-8 lg:p-8">
        <div className="flex items-center justify-between mb-4">
          <p className="text-lg font-semibold text-richblack-5">Personal Details</p>
          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-5">{user?.firstName}</p>
            </div>
            <div>
              <p className="text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5 truncate">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">{user?.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ?? "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
