import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { changePassword } from "../../../../services/operations/settingsAPI"
import IconBtn from "../../../common/IconBtn"

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitPasswordForm = async (data) => {
    try {
      setLoading(true)
      setError(null)
      await changePassword(token, data)
      navigate("/dashboard/my-profile")
    } catch (error) {
      setError(error.message)
      console.log("ERROR MESSAGE - ", error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitPasswordForm)}>
      <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <h2 className="text-2xl font-semibold text-richblack-25">Password</h2>
        
        {error && (
          <div className="mb-4 text-red-500">
            <p>{error}</p>
          </div>
        )}
        
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="relative flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="oldPassword" className="lable-style text-sm text-richblack-50">
              Current Password <sup className="text-red-900">*</sup>
            </label>
            <input
              type={showOldPassword ? "text" : "password"}
              name="oldPassword"
              id="oldPassword"
              placeholder="Enter Current Password"
              className="form-style p-2 rounded-lg"
              {...register("oldPassword", {
                required: "Please enter your current password.",
              })}
            />
            <span
              onClick={() => setShowOldPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showOldPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            {errors.oldPassword && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                {errors.oldPassword.message}
              </span>
            )}
          </div>
          <div className="relative flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="newPassword" className="lable-style text-sm text-richblack-50">
              New Password <sup className="text-red-900">*</sup>
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              id="newPassword"
              placeholder="Enter New Password"
              className="form-style p-2 rounded-lg"
              {...register("newPassword", {
                required: "Please enter your new password.",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long.",
                },
              })}
            />
            <span
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showNewPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            {errors.newPassword && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                {errors.newPassword.message}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            navigate("/dashboard/my-profile")
          }}
          className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
        >
          Cancel
        </button>
        <IconBtn type="submit" text={loading ? "Updating..." : "Update"} />
      </div>
    </form>
  )
}
