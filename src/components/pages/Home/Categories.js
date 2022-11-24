import React from 'react';

const Categories = () => {
    return (
        <div>
            <h1 className='text-5xl text-center'>Categories</h1>
            <p className='font-semibold'>Explore from our second hand phone categories</p>
            <div className="card w-96 glass">
                <figure><img src="https://placeimg.com/400/225/arch" alt="car!" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Life hack</h2>
                    <p>How to park your car at your garage?</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Learn now!</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categories;