import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Side from "./Side"
import { AiOutlineMenuUnfold } from "react-icons/ai"
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import { getInstructorData } from "../../../services/operations/profileAPI"
import InstructorChart from "./InstructorDashboard/InstructorChart"

export default function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState(null)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const instructorApiData = await getInstructorData(token);
      const result = await fetchInstructorCourses(token)
      if (instructorApiData.length) setInstructorData(instructorApiData)
      if (result) setCourses(result)
      setLoading(false)
    }
    getData();

  }, [token])

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  )

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  )

  const [sidebarVisible, setSidebarVisible] = useState(false)

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev)
  }

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-6 p-4 lg:p-6">
      {/* Mobile menu icon */}
      <div className="lg:hidden flex justify-between items-center">
        <div className="text-white" onClick={toggleSidebar}>
          <AiOutlineMenuUnfold className="text-3xl" />
        </div>
        <h1 className="text-2xl font-bold text-richblack-5">
          Hi {user?.firstName} 👋
        </h1>
      </div>

      {/* Sidebar */}
      <Side isVisible={sidebarVisible} onClose={() => setSidebarVisible(false)} />

      <div className="flex-1">
        <div className="space-y-4 lg:space-y-6">
          <h1 className="hidden lg:block text-2xl font-bold text-richblack-5">
            Hi {user?.firstName} 👋
          </h1>
          <p className="font-medium text-richblack-200">
            Let's start something new
          </p>
          {loading ? (
            <div className="spinner"></div>
          ) : courses.length > 0 ? (
            <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
              {/* Chart / Graph */}
              <div className="flex-1">
                {totalAmount > 0 || totalStudents > 0 ? (
                  <InstructorChart courses={instructorData} />
                ) : (
                  <div className="rounded-md bg-richblack-800 p-6">
                    <p className="text-lg font-bold text-richblack-5">Visualize</p>
                    <p className="mt-4 text-xl font-medium text-richblack-50">
                      Not Enough Data To Visualize
                    </p>
                  </div>
                )}
              </div>

              {/* Total Statistics */}
              <div className="flex flex-col rounded-md bg-richblack-800 p-6 space-y-4">
                <p className="text-lg font-bold text-richblack-5">Statistics</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-lg text-richblack-200">Total Courses</p>
                    <p className="text-3xl font-semibold text-richblack-50">
                      {courses.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-richblack-200">Total Students</p>
                    <p className="text-3xl font-semibold text-richblack-50">
                      {totalStudents}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-richblack-200">Total Income</p>
                    <p className="text-3xl font-semibold text-richblack-50">
                      Rs. {totalAmount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20 text-center">
              <p className="text-2xl font-bold text-richblack-5">
                You have not created any courses yet
              </p>
              <Link to="/dashboard/add-course">
                <p className="mt-1 text-lg font-semibold text-yellow-50">
                  Create a course
                </p>
              </Link>
            </div>
          )}
        </div>

        {courses.length > 0 && (
          <div className="rounded-md bg-richblack-800 p-6 mt-6">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-richblack-5">Your Courses</p>
              <Link to="/dashboard/my-courses">
                <p className="text-xs font-semibold text-yellow-50">View All</p>
              </Link>
            </div>
            <div className="my-4 flex flex-col space-y-6 lg:space-y-0 lg:flex-row lg:space-x-6">
              {courses.slice(0, 3).map((course) => (
                <div key={course._id} className="flex-1">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="h-[200px] w-full rounded-md object-cover"
                  />
                  <div className="mt-3">
                    <p className="text-sm font-medium text-richblack-50">
                      {course.courseName}
                    </p>
                    <div className="mt-1 flex items-center space-x-2">
                      <p className="text-xs font-medium text-richblack-300">
                        {course.studentsEnrolled.length} students
                      </p>
                      <p className="text-xs font-medium text-richblack-300">|</p>
                      <p className="text-xs font-medium text-richblack-300">
                        Rs. {course.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
