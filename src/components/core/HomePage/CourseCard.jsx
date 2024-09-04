import React from "react";

// Importing React Icons
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  return (
    <div
      className={`w-full sm:w-[360px] lg:w-[30%] ${
        currentCard === cardData?.heading
          ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50"
          : "bg-richblack-800"
      } text-richblack-25 h-auto box-border cursor-pointer rounded-lg overflow-hidden transition-all duration-300`}
      onMouseMove={() => setCurrentCard(cardData?.heading)}
    >
      <div className="border-b-[2px] border-richblack-400 border-dashed h-auto p-4 sm:p-6 flex flex-col gap-3">
        <div
          className={`${
            currentCard === cardData?.heading ? "text-richblack-800" : "text-richblack-25"
          } font-semibold text-[16px] sm:text-[20px]`}
        >
          {cardData?.heading}
        </div>

        <div className="text-richblack-400 text-[14px] sm:text-[16px]">
          {cardData?.description}
        </div>
      </div>

      <div
        className={`flex justify-between items-center ${
          currentCard === cardData?.heading ? "text-blue-300" : "text-richblack-300"
        } px-4 sm:px-6 py-2 sm:py-3 font-medium`}
      >
        {/* Level */}
        <div className="flex items-center gap-1 sm:gap-2 text-[14px] sm:text-[16px]">
          <HiUsers />
          <p>{cardData?.level}</p>
        </div>

        {/* Flow Chart */}
        <div className="flex items-center gap-1 sm:gap-2 text-[14px] sm:text-[16px]">
          <ImTree />
          <p>{cardData?.lessionNumber} Lesson</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
