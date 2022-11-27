import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import Loader from '../../shared/Loader';

const CategoryCollections = () => {
    const { user, loading } = useContext(AuthContext)
    const category = useLoaderData()
    const [categoryProducts, setCategoryProducts] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/products', {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setCategoryProducts(data)
            })
    }, [])

    if (loading) {
        return <Loader></Loader>
    }


    return (
        <div className='grid grid-cols-1 justify-items-center gap-5 md:grid-cols-2 lg:grid-cols-3 my-10'>
            {
                categoryProducts.filter(product => product.category === category.name).map(
                    product => <div key={product._id} className="card w-96 bg-base-100 shadow-xl">
                        <figure className="p-3">
                            <img className="max-w-[200px] h-[200px] rounded-xl" src={product.image} alt="" />
                        </figure>
                        <div className="card-body items-center">
                            <h2>{product.name}</h2>
                            <p>{product.details}</p>
                            <div className='flex'>
                                <p className='font-semibold'>Price:${product.price}</p>
                                <p className='font-semibold'>Condition:{product.condition}</p>
                            </div>
                            <div className="card-actions">
                                <label htmlFor="booking-modal" className="btn btn-primary">Book It</label>
                            </div>
                        </div>

                        {/* booking Modal */}
                        <input type="checkbox" id="booking-modal" className="modal-toggle" />
                        <div className="modal">
                            <div className="modal-box relative">
                                <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                <h3 className="text-lg font-bold">Booking!!</h3>
                                <p className="py-4 font-semibold text-xl">{product.name}</p>
                                <form className='grid grid-cols-1 gap-3 mt-10"'>
                                    <div>
                                        <label htmlFor="productName">Product Name</label>
                                        <input type="text" name='productName' value={product.name} className="input w-full input-bordered" readOnly />
                                    </div>
                                    <div>
                                        <label htmlFor="price">Price</label>
                                        <input type="text" name='price' value={product.price} className="input w-full input-bordered" readOnly />
                                    </div>
                                    <div>
                                        <label htmlFor="name">Seller</label>
                                        <input name='name' type="text" placeholder="Name" className="input w-full input-bordered" defaultValue={product?.sellerName} readOnly />
                                    </div>
                                    <div>
                                        <label htmlFor="buyerName">Your Name</label>
                                        <input name='buyerName' type="text" placeholder="Your name" className="input w-full input-bordered" defaultValue={user?.displayName} readOnly />
                                    </div>
                                    <div>
                                        <label htmlFor="buyerEmail">Your Email</label>
                                        <input name='buyerEmail' type="email" placeholder="Your Email" className="input w-full input-bordered" defaultValue={user?.email} readOnly />
                                    </div>
                                    <div>
                                        <label htmlFor="phone">Your Phone</label>
                                        <input name='phone' type="text" placeholder="Your Number" className="input w-full input-bordered" />
                                    </div>
                                    <div>
                                        <label htmlFor="buyerlocation">Your Location</label>
                                        <input name='buyerLocation' type="text" placeholder="Your Location" className="input w-full input-bordered" />
                                    </div>
                                    <br />
                                    <input type="submit" value="Submit" className='w-full max-w-xm btn btn-accent' />
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default CategoryCollections;