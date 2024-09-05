import { useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import ConfirmationModal from "../../common/ConfirmationModal";
import SidebarLink from "./SidebarLink";
import { AiOutlineMenuFold } from "react-icons/ai";

export default function Side({isVisible , onClose}) {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null);

  // Check if either profile or auth is loading
  if (profileLoading || authLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-3.5rem)] min-w-[220px] border-r border-r-richblack-700 bg-richblack-800">
        <div className="spinner">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div className={`fixed top-0 lg:hidden left-0 h-full w-64 bg-gray-800 text-white transition-transform transform ${
      isVisible ? 'translate-x-0' : '-translate-x-full'
    } lg:relative lg:translate-x-0 lg:w-64 lg:h-auto bg-richblue-800 rounded-md p-3 lg:flex lg:flex-col lg:space-y-4 lg:py-4 lg:px-6`}>
        <div className="">
            <button onClick={onClose} className="text-white">
                <AiOutlineMenuFold className="text-3xl" />
            </button>
        </div>
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null;
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            );
          })}
        </div>
        <div className="mx-auto mt-4 sm:mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
        <div className="flex flex-col">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="flex items-center gap-x-2 px-8 py-2 text-sm font-medium text-richblack-300 hover:bg-richblack-700"
          >
            <VscSignOut className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}
