import React from 'react';
import ContactUsForm from '../ContactPage/ContactUsForm';

const ContactFormSection = () => {
  return (
    <div className='flex flex-col justify-center bg-richblack-800 p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl items-center max-w-full md:max-w-3xl mx-auto'>
      <h1 className='text-xl sm:text-2xl md:text-3xl font-inter font-bold text-white'>
        Get in Touch
      </h1>
      <p className='text-base sm:text-lg md:text-xl font-inter font-semibold mt-2 sm:mt-3 md:mt-4 mb-6 sm:mb-7 md:mb-8 text-richblack-200 text-center'>
        We'd love to hear from you. Please fill out this form.
      </p>
      <div className='w-full'>
        <div className='max-w-full md:max-w-3xl mx-auto'>
          <ContactUsForm />
        </div>
      </div>
    </div>
  );
};

export default ContactFormSection;
