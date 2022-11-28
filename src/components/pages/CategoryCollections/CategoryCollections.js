import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import BookingModal from './BookingModal';

const CategoryCollections = () => {
    const { user, loading } = useContext(AuthContext)
    const category = useLoaderData()
    const [categoryProducts, setCategoryProducts] = useState([])
    const [product, setProduct] = useState(null)

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


    return (
        <div className='grid grid-cols-1 justify-items-center gap-5 md:grid-cols-2 lg:grid-cols-3 my-10'>
            {
                categoryProducts.filter(product => product.category === category.name).filter(product => !product.status).map(
                    product => <div key={product._id} className="card w-96 bg-base-100 shadow-xl">
                        <figure className="p-3">
                            <img className="max-w-[200px] h-[200px] rounded-xl" src={product.image} alt="" />
                        </figure>
                        <div className="card-body items-center">
                            <h2>{product.name}</h2>
                            <p>{product.details}</p>
                            <div className=''>
                                <p className='font-semibold'>Price:${product.price}</p>
                                <br />
                                <p className='font-semibold'>Condition:{product.condition}</p>
                                <br />
                                <p className='font-semibold'>Seller:{product.sellerName}</p>
                            </div>
                            <div className="card-actions">
                                <label onClick={() => setProduct(product)} htmlFor="booking-modal" className="btn btn-primary">Book It</label>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                product && <BookingModal
                    product={product}
                    setProduct={setProduct}
                    user={user}
                    loading={loading}
                ></BookingModal>
            }
        </div>
    );
};

export default CategoryCollections;