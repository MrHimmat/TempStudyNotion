import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
// import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// import CourseReviewModal from "./CourseReviewModal";
import { IoIosArrowDropleft } from "react-icons/io";
import IconBtn from "../../common/IconBtn";

export default function Mobile({ setReviewModal, isVisible, onClose }) {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    (() => {
      if (!courseSectionData.length) return;
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );
      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId);
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id;
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id);
      setVideoBarActive(activeSubSectionId);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionData, courseEntireData, location.pathname]);

  return (
    <>
      <div className={`fixed top-0 z-10 left-0 h-full w-80 bg-gray-800 text-white transition-transform transform ${
        isVisible ? 'translate-x-0' : '-translate-x-full'
      } lg:relative lg:translate-x-0 lg:w-64 lg:h-auto bg-richblue-800 rounded-md p-3 lg:flex lg:flex-col lg:space-y-4 lg:py-4 lg:px-6`}>
        <div className="lg:hidden flex flex-col h-full">
          {/* Close button for small screens */}
          <button
            onClick={onClose}
            className="flex items-center text-white mb-4"
          >
           <IoIosArrowDropleft className="text-2xl" />
            {/* <span className="ml-2">Close</span> */}
          </button>
        </div>
        <div className="flex -ml-5 -mt-[600px] lg:hidden md:hidden flex-col h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] border-r-[1px] border-r-richblack-700 lg:bg-richblack-800">
          <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
            <div className="flex w-full items-center justify-between">
              <div
                onClick={() => navigate(`/dashboard/enrolled-courses`)}
                className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90 cursor-pointer"
                title="back"
              >
                <IoIosArrowBack size={30} />
              </div>
              <IconBtn
                text="Add Review"
                customClasses="ml-auto"
                onClick={ ()=> setReviewModal(true)}
              />
            </div>
            <div className="flex flex-col">
              <p>{courseEntireData?.courseName}</p>
              <p className="text-sm font-semibold text-richblack-500">
                {completedLectures?.length} / {totalNoOfLectures}
              </p>
            </div>
          </div>

          <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
            {courseSectionData.map((course, index) => (
              <div
                className="mt-2 cursor-pointer text-sm text-richblack-5"
                onClick={() => setActiveStatus(course?._id)}
                key={index}
              >
                {/* Section */}
                <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                  <div className="w-[70%] font-semibold">
                    {course?.sectionName}
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`transition-transform duration-500 ${
                        activeStatus === course?._id ? "rotate-0" : "rotate-180"
                      }`}
                    >
                      <BsChevronDown />
                    </span>
                  </div>
                </div>

                {/* Sub Sections */}
                {activeStatus === course?._id && (
                  <div className="transition-height duration-500 ease-in-out">
                    {course.subSection.map((topic, i) => (
                      <div
                        className={`flex gap-3 px-5 py-2 ${
                          videoBarActive === topic._id
                            ? "bg-yellow-200 font-semibold text-richblack-800"
                            : "hover:bg-richblack-900"
                        }`}
                        key={i}
                        onClick={() => {
                          navigate(
                            `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                          );
                          setVideoBarActive(topic._id);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={completedLectures.includes(topic?._id)}
                          onChange={() => {}}
                        />
                        {topic.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
