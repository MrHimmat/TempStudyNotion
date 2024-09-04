import React from 'react';
import Instructor from "../../../assets/Images/Instructor.png";
import  HighLightText  from '../HomePage/HighlightText';
import { IoIosArrowForward } from "react-icons/io";
import  CTAButton  from '../HomePage/Button';

const InstructorSection = () => {
  return (
    <div className='w-full max-w-7xl mx-auto px-4 gap-20 py-20 flex flex-col lg:flex-row lg:items-center lg:justify-between'>
      <div className='w-full lg:w-1/2 flex justify-center lg:justify-start'>
        <div className='shadow-custom  rounded-lg'>
          <img src={Instructor} alt="Instructor" className='w-full rounded-lg h-auto' />
        </div>
      </div>

      <div className='w-full lg:w-1/2 mt-8 lg:mt-0 lg:pl-8'>
        <div className='text-center lg:text-left'>
          <div className='text-white text-2xl lg:text-3xl font-inter font-bold'>
            Become an 
            <HighLightText text={"instructor"} />
          </div>
          <p className='text-richblack-300 font-inter mt-4 lg:mt-5 lg:text-sm'>
            Instructors from around the world teach millions of students on StudyNotion.
            We provide the tools and skills to teach what you love.
          </p>
          <div className='flex justify-center lg:justify-start mt-6'>
            <CTAButton active={true} linkto={"/signup"}>
              <div className='flex items-center'>
                Start Teaching Today
                <IoIosArrowForward />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}


export default InstructorSection