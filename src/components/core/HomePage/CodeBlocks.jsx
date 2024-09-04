import React from 'react';
import  CTAButton  from '../HomePage/Button';
import { IoIosArrowForward } from 'react-icons/io';
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({
    position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroudGradient, codeColor
}) => {
  return (
    <div className={`${position} flex flex-col my-10 lg:my-20 mx-auto gap-36 justify-between mt-10 lg:mt-20 px-4 lg:px-8`}>

      {/* Part 1 */}
      <div className='flex flex-col gap-4 lg:gap-6 -mb-10 lg:mb-16 w-full lg:w-1/2'>
        <div className='text-xl sm:text-2xl lg:text-4xl font-bold'>
          {heading}
        </div>
        <div className='text-base sm:text-lg lg:text-richblack-200 font-inter max-w-full'>
          {subheading}
        </div>
        <div className='flex flex-col sm:flex-row gap-4 lg:gap-6'>
          <CTAButton active={true} linkto={ctabtn1.linkto} className='w-full sm:w-auto'>
            <div className='flex items-center gap-2'>
              {ctabtn1.text}
              <IoIosArrowForward />
            </div>
          </CTAButton>
          <CTAButton linkto={ctabtn2.linkto} className='w-full sm:w-auto'>
            {ctabtn2.text}
          </CTAButton>
        </div>
      </div>

      {/* Part 2 */}
      <div className='w-full lg:w-1/2 flex flex-col lg:flex-row text-sm lg:text-base font-mono lg:font-inter rounded-lg shadow-custom pt-4 lg:pt-9'>
        {/* Background Gradient */}
        <div className='hidden lg:flex flex-col items-center text-richblack-300 px-3 w-1/12'>
          {[...Array(11).keys()].map(num => (
            <div key={num} className='py-1'>{num + 1}</div>
          ))}
        </div>
        <div className={`w-full lg:w-11/12 flex flex-col px-2 ${codeColor}`}>
          <TypeAnimation
            sequence={[codeblock, 2000, " "]}
            repeat={Infinity}
            cursor={true}
            style={{
              whiteSpace: "pre-line",
              display: "block"
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};


export default CodeBlocks