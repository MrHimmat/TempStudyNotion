import { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import Side from "./Side"; // Ensure the Sidebar component is correctly imported

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Default to true for initial loading state
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      setLoading(true);
      try {
        const res = await getUserEnrolledCourses(token);
        const filterPublishCourse = res.filter((ele) => ele.status !== "Draft");
        setEnrolledCourses(filterPublishCourse);
      } catch (error) {
        console.log("Could not fetch enrolled courses.");
      } finally {
        setLoading(false); // Ensure loading is set to false in finally
      }
    };

    fetchEnrolledCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);


  // to toggle the sidebar links as per requirement
  const [sidebarVisible ,setSidebarVisible] = useState(false);
  const toggleSidebar = () =>{
    setSidebarVisible(prev=>!prev);
  }

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (enrolledCourses.length === 0) {
    return (
      <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
        You have not enrolled in any course yet.
      </p>
    );
  }

  return (
    <>
      {/* Mobile menu icon */}
      <div className="lg:hidden -mt-5 h-full flex text-white" onClick={toggleSidebar}>
        <AiOutlineMenuUnfold className="text-3xl" />
      </div>

      {/* Sidebar */}
      <Side isVisible={sidebarVisible} onClose={() => setSidebarVisible(false)} />
      <div className="text-2xl md:text-3xl lg:text-4xl text-richblack-5 font-bold my-4">
        Enrolled Courses
      </div>
      <div className="my-8 lg:relative text-richblack-5">
        {/* Headings */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-t-lg bg-richblack-500 text-white">
          <p className="px-4 py-2 font-semibold">Course Name</p>
          <p className="hidden md:block lg:px-[350px] md:px-60 py-2 font-semibold">Duration</p>
          <p className="lg:px-64 md:px-52 py-2 px-4 font-semibold">Progress</p>
        </div>
        {/* Course Names */}
        {enrolledCourses.map((course, i, arr) => (
          <div
            className={`grid grid-cols-1 md:grid-cols-4 gap-2 border border-richblack-700 ${
              i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
            }`}
            key={course._id} // Use course._id as key for better identification
          >
            <div
              className="flex items-center gap-4 px-4 py-3 cursor-pointer col-span-1 md:col-span-2"
              onClick={() => {
                navigate(
                  `/view-course/${course._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                );
              }}
            >
              <img
                src={course.thumbnail}
                alt="course_img"
                className="h-12 w-12 md:h-14 md:w-14 rounded-lg object-cover"
              />
              <div className="flex flex-col">
                <p className="font-semibold text-sm md:text-base">
                  {course.courseName}
                </p>
                <p className="text-xs text-richblack-300 md:text-sm">
                  {course.courseDescription.length > 50
                    ? `${course.courseDescription.slice(0, 50)}...`
                    : course.courseDescription}
                </p>
              </div>
            </div>
            <div className="hidden md:block px-4 py-3 text-center">
              {course?.totalDuration}
            </div>
            <div className="px-4 py-3">
              <p className="text-sm mb-1">Progress: {course.progressPercentage || 0}%</p>
              <ProgressBar
                completed={course.progressPercentage || 0}
                height="8px"
                isLabelVisible={false}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
