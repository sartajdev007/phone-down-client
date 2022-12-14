import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Categories = () => {
    const [categories, setCategories] = useState([])


    useEffect(() => {
        axios.get('https://phone-down-server.vercel.app/categories')
            .then(function (response) {
                // handle success
                setCategories(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }, [])

    return (
        <div className='my-10'>
            <h1 className='text-5xl font-bold text-emerald-500'>Categories</h1>
            <p className='font-semibold pt-5 text-lg'>Explore from our second hand phone categories</p>
            <div className='grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-2 mt-10'>
                {
                    categories.map(category =>
                        <div key={category.category_id} className="card w-96 glass shadow-xl shadow-emerald-100">
                            <figure className='bg-base-300 p-3'><img className='w-[300px] h-[150px]' src={category.img} alt="" /></figure>
                            <div className="card-body">
                                <h2 className='text-3xl font-bold'>{category.name}</h2>
                                <p className='text-lg'>See our second hand collections</p>
                                <div className="card-actions justify-center">
                                    <Link to={`/categories/${category._id}`}><button className="btn bg-emerald-500 border-0 hover:bg-emerald-400">View Collection</button></Link>
                                </div>
                            </div>
                        </div>)
                }
            </div>
        </div>
    );
};

export default Categories;