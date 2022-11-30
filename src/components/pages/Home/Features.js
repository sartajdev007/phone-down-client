import React from 'react';
import van from '../../../assets/images/icons8-delivery-van-64.png'
import notify from '../../../assets/images/icons8-push-notifications-64.png'
import verify from '../../../assets/images/icons8-verified-badge-48.png'

const Features = () => {
    return (
        <div className='my-20'>
            <h1 className='text-5xl font-bold text-emerald-500'>Our Features</h1>
            <p className='font-semibold pt-5'>We aspire to be the frontrunner in the reselling market</p>
            <div className='grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-2 mt-10'>
                <div className="card w-96 bg-base-100 shadow-xl shadow-emerald-200">
                    <figure className="px-10 pt-10">
                        <img src={van} alt="Shoes" className="rounded-xl w-20" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="text-2xl font-semibold">Faster Delivery!</h2>
                        <p className='font-semibold'>Our sellers provide you with fastest delivery on doorstep</p>
                    </div>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl shadow-emerald-200">
                    <figure className="px-10 pt-10">
                        <img src={verify} alt="Shoes" className="rounded-xl w-20" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="text-2xl font-semibold">Verified Sellers!</h2>
                        <p className='font-semibold'>Buy comofortably from our verified sellers</p>
                    </div>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl shadow-emerald-200">
                    <figure className="px-10 pt-10">
                        <img src={notify} alt="Shoes" className="rounded-xl w-20" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="text-2xl font-semibold">Quick Response!</h2>
                        <p className='font-semibold'>You don't have to wait a while to get response</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;