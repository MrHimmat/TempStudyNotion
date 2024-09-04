import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import { createRating } from "../../../services/operations/courseDetailsAPI";
import IconBtn from "../../common/IconBtn";

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, [setValue]);

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  };

  const onSubmit = async (data) => {
    try {
      if (!courseEntireData?._id) {
        throw new Error("Course ID is missing");
      }
      await createRating(
        {
          courseId: courseEntireData._id,
          rating: data.courseRating,
          review: data.courseExperience,
        },
        token
      );
      setReviewModal(false);
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  if (!user) {
    console.error("User data is not available");
    return null; // or a fallback UI
  }

  if (!courseEntireData) {
    console.error("Course data is not available");
    return null; // or a fallback UI
  }

  return (
    <div className="fixed inset-0 z-[1000] grid h-screen w-screen place-items-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">Add Review</p>
          <button
            onClick={() => setReviewModal(false)}
            aria-label="Close review modal"
          >
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>
        {/* Modal Body */}
        <div className="p-6">
          <div className="flex items-center justify-center gap-x-4">
            <img
              src={user?.image}
              alt={`${user?.firstName} profile`}
              className="aspect-square w-[50px] rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-richblack-5">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-richblack-5">Posting Publicly</p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col items-center"
          >
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />
            <div className="flex w-11/12 flex-col space-y-2 mt-4">
              <label
                className="text-sm text-richblack-5"
                htmlFor="courseExperience"
              >
                Add Your Experience <sup className="text-pink-200">*</sup>
              </label>
              <textarea
                id="courseExperience"
                placeholder="Add Your Experience"
                {...register("courseExperience", { required: true })}
                className="form-style resize-none min-h-[130px] w-full px-3 py-2 border border-richblack-500 rounded-md"
              />
              {errors.courseExperience && (
                <span className="ml-2 text-xs text-pink-200">
                  Please add your experience.
                </span>
              )}
            </div>
            <div className="mt-6 flex w-11/12 justify-end gap-x-2">
              <button
                type="button"
                onClick={() => setReviewModal(false)}
                className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
                aria-label="Cancel"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex cursor-pointer items-center gap-x-2 rounded-md bg-blue-500 py-[8px] px-[20px] font-semibold text-white"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
