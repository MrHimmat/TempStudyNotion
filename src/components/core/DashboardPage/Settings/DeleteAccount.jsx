import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteProfile } from "../../../../services/operations/settingsAPI";
import ConfirmationModal from "../../../common/ConfirmationModal"; // Ensure you have this component

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      setError("");
      await dispatch(deleteProfile(token));
      navigate("/"); // Redirect after successful deletion
    } catch (error) {
      setError("Failed to delete account. Please try again.");
      console.error("ERROR MESSAGE - ", error.message);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="my-6 lg:my-10 flex flex-col lg:flex-row gap-y-6 lg:gap-x-5 rounded-md border border-pink-700 bg-pink-900 p-6 lg:p-8">
        <div className="flex aspect-square h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-pink-700">
          <FiTrash2 className="text-2xl lg:text-3xl text-pink-200" />
        </div>
        <div className="flex flex-col space-y-4 lg:space-y-2 w-full lg:w-3/5">
          <h2 className="text-xl lg:text-lg font-semibold text-richblack-5">
            Delete Account
          </h2>
          <div className="text-pink-25">
            <p className="text-sm lg:text-base">
              Would you like to delete your account?
            </p>
            <p className="text-sm lg:text-base">
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the content associated with it.
            </p>
          </div>
          <button
            type="button"
            className={`w-full lg:w-fit cursor-pointer italic ${loading ? 'text-pink-500' : 'text-pink-300'} text-sm lg:text-base`}
            onClick={() => setShowModal(true)}
            disabled={loading}
          >
            {loading ? "Processing..." : "I want to delete my account."}
          </button>
        </div>
      </div>
      {showModal && (
        <ConfirmationModal
          modalData={{
            text1: "Are you sure you want to delete your account?",
            text2: "This action is irreversible and will remove all your data.",
            btn1Text: "Delete",
            btn2Text: "Cancel",
            btn1Handler: handleDeleteAccount,
            btn2Handler: () => setShowModal(false),
          }}
        />
      )}
      {error && <p className="text-red-500 text-center text-sm lg:text-base mt-4">{error}</p>}
    </>
  );
}
