import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Categories = () => {
    const [categories, setCategories] = useState([])


    useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])

    return (
        <div className='my-10'>
            <h1 className='text-5xl'>Categories</h1>
            <p className='font-semibold pt-5'>Explore from our second hand phone categories</p>
            <div className='grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-2 mt-10'>
                {
                    categories.map(category =>
                        <div key={category.category_id} className="card w-96 glass shadow-xl shadow-emerald-100">
                            <figure className='bg-base-300 p-3'><img className='max-w-[300px]' src={category.img} alt="" /></figure>
                            <div className="card-body">
                                <h2 className='text-3xl font-bold'>{category.name}</h2>
                                <div className="card-actions justify-center">
                                    <Link to={`/categories/${category._id}`}><button className="btn bg-emerald-500 border-0">View Collection</button></Link>
                                </div>
                            </div>
                        </div>)
                }
            </div>
        </div>
    );
};

export default Categories;