import React from 'react';
import { FcSmartphoneTablet } from "react-icons/fc"


const Banner = () => {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content grid grid-cols-1 lg:grid-cols-2 lg:grid-row-reverse">
                <img src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=329&q=80" className="max-w-sm rounded-lg shadow-2xl" alt='' />
                <div>
                    <span className='text-7xl'><FcSmartphoneTablet></FcSmartphoneTablet></span>
                    <h1 className="text-5xl font-bold">Welcome to <span className=''>Phone Down!!</span></h1>
                    <p className="py-6">Your one stop shop to replace your phone with an affordable and stylish one.</p>
                    <button className="btn bg-emerald-500 border-0">Explore Collection</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;