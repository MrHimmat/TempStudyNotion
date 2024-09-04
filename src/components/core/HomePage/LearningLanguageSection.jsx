import React from 'react';
import  HighLightText  from '../HomePage/HighlightText';
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.png";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
import  CTAButton  from '../HomePage/Button';

 const LearningLanguageSection = () => {
  return (
    <div className='flex flex-col items-center mb-20 mx-auto mt-20 px-4 lg:px-8'>
      <div className='text-center mb-12'>
        <div className='text-2xl sm:text-3xl font-inter font-bold text-black mb-4'>
          Your Swiss Knife for 
          <HighLightText text={"learning any language"} />
        </div>
        <p className='text-sm sm:text-base font-inter text-center font-semibold text-richblack-200 w-full sm:w-3/4 lg:w-1/2 mx-auto'>
          Using Spin makes learning multiple languages easy. With 20+ languages, realistic voice-over, progress tracking, custom schedules, and more.
        </p>
      </div>

      <div className='flex flex-col lg:flex-row items-center justify-center gap-6 mb-12'>
        <div className='relative w-full sm:w-1/3 hover:scale-105 transition-transform duration-300'>
          <img 
            className='object-contain w-full rounded-lg ' 
            src={Know_your_progress} 
            alt="Know Your Progress" 
          />
        </div>
        <div className='relative w-full sm:w-1/3 hover:scale-105 transition-transform duration-300'>
          <img 
            className='object-contain w-full rounded-lg ' 
            src={Compare_with_others} 
            alt="Compare with Others" 
          />
        </div>
        <div className='relative w-full sm:w-1/3 hover:scale-105 transition-transform duration-300'>
          <img 
            className='object-contain w-full rounded-lg ' 
            src={Plan_your_lessons} 
            alt="Plan Your Lessons" 
          />
        </div>
      </div>

      <CTAButton active={true} linkto={"/login"}>
        <div className='flex items-center justify-center'>
          Learn More
        </div>
      </CTAButton>
    </div>
  );
}


export default LearningLanguageSection