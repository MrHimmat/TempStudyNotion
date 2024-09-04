import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import CourseCard from "./CourseCard";
import HighlightText from "./HighlightText";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className='px-4 sm:px-6 md:px-8'>
      {/* Explore More Section */}
      <div className='text-3xl sm:text-4xl font-semibold text-center my-8'>
        Unlock the
        <HighlightText text={"Power of Code"} />
        <p className='text-center text-richblack-300  text-[16px] font-semibold mt-3'>
          Learn to Build Anything You Can Imagine
        </p>
      </div>

      {/* Tabs Section */}
      <div className='flex flex-wrap gap-4 justify-center mb-6'>
        {tabsName.map((ele, index) => {
          return (
            <div
              className={`text-sm sm:text-base flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                currentTab === ele
                  ? "bg-richblack-900 text-richblack-5 font-medium"
                  : "bg-richblack-800 text-richblack-200"
              }`}
              key={index}
              onClick={() => setMyCards(ele)}
            >
              {ele}
            </div>
          );
        })}
      </div>

      {/* Cards Group */}
      <div className='flex flex-col sm:flex-row sm:flex-wrap gap-6 justify-center'>
        {courses.map((ele, index) => {
          return (
            <CourseCard
              key={index}
              cardData={ele}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMore;
