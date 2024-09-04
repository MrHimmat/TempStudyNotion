import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {AiOutlineMenuUnfold} from "react-icons/ai"
import Side from "./Side"
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"
import CoursesTable from "./InstructorCourses/CoursesTable"

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [sidebarVisible , setSidebarVisible] = useState(false);

  const toggleSidebar = () =>{
    setSidebarVisible(prev => !prev);
  }

  return (
    <div >
          <div>
                {/* Mobile menu icon */}
                <div className="lg:hidden  -mt-5 flex text-white" onClick={toggleSidebar}>
                  <AiOutlineMenuUnfold className="text-3xl" />
                </div>

                {/* Sidebar */}
                <Side isVisible={sidebarVisible} onClose={() => setSidebarVisible(false)} />
          </div>
      <div className="mb-14 mt-3 flex items-center justify-between">
          
       {/* <div> */}
            <h1 className="text-3xl font-bold font-inter font-500 text-richblack-5">My Courses</h1>
       {/* </div> */}
        <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>
      </div>
        {courses && <CoursesTable  courses={courses} setCourses={setCourses} />}   
    </div>
  )
}