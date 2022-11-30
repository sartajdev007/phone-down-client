import React from 'react';
import { FcSmartphoneTablet } from "react-icons/fc"


const Banner = () => {
    return (
        <div className="hero" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1519944518895-f08a12d6dfd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")`, backgroundRepeat: 'no-repeat' }}>
            <div className="hero-overlay bg-teal-100 bg-opacity-70"></div>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=329&q=80" className="rounded-lg max-w-lg shadow-2xl" alt='' />
                <div className='mr-20 md:pl-24 text-white'>
                    <span className='text-7xl'><FcSmartphoneTablet></FcSmartphoneTablet></span>
                    <h1 className="text-5xl font-bold text-emerald-600">Welcome to <span className=''>Phone Down!!</span></h1>
                    <p className="py-6 text-lg text-black">Your one stop shop to replace your phone with an affordable and stylish one. We have collections of second hand phones that you won't get elsewhere</p>
                </div>
            </div>
        </div>
    );
};

export default Banner;