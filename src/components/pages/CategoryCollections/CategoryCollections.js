import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import verify from '../../../assets/images/icons8-verified-badge-48.png'
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import BookingModal from './BookingModal';

const CategoryCollections = () => {
    const { user } = useContext(AuthContext)
    const category = useLoaderData()
    const [product, setProduct] = useState(null)

    const { data: categoryProducts = [], refetch } = useQuery({
        queryKey: ['categoryProducts'],
        queryFn: async () => {
            try {
                const res = await fetch('https://phone-down-server.vercel.app/products', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                const data = await res.json()
                return data
            }
            catch (err) {
                console.log(err)
            }
        }
    })



    const handleReport = product => {
        fetch(`https://phone-down-server.vercel.app/products/${product._id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast('Product Reported')
                refetch()
            })
    }


    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1488509082528-cefbba5ad692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGhvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60")` }}>
                <div className="hero-overlay bg-teal-600 bg-opacity-50"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-xl">
                        <h1 className="mb-5 text-6xl font-bold">Explore Our Phones</h1>
                        <p className='mb-5 text-xl'>The Best Condition Second Hand Phones in the Market</p>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 justify-items-center gap-5 md:grid-cols-2 lg:grid-cols-3 my-10'>
                {
                    categoryProducts.filter(product => product.category === category.name).filter(product => !product.status).length === 0 ? <h1 className='my-12 text-center font-bold text-5xl'>Sold Out</h1> :
                        categoryProducts.filter(product => product.category === category.name).filter(product => !product.status).map(
                            product => <div key={product._id} className="card w-96 bg-base-100 shadow-xl shadow-teal-200">
                                <figure className="p-3">
                                    <img className="max-w-[200px] h-[200px] rounded-xl" src={product.image} alt="" />
                                </figure>
                                <div className="card-body items-center">
                                    <h2 className='text-2xl font-semibold border-2 border-fuchsia-300 bg-teal-500 text-white rounded-lg p-2'>{product.name}</h2>
                                    <p className='text-lg font-lg'>Details: {product.details}</p>
                                    <div className='pt-2'>
                                        <p className='font-semibold pt-2'>Re-Sell Price: <strong>${product.price}</strong></p>
                                        <p className='font-semibold pt-2'>Condition: {product.condition}</p>
                                        <div className='flex'>
                                            <p className='font-semibold pt-2'>Seller: <strong>{product.sellerName}</strong></p>
                                            <p className='pt-3'>{product.verifiedSeller && <img className='w-5' src={verify} alt='' />}</p>
                                        </div>
                                        <br />
                                    </div>
                                    <div className="card-actions">
                                        <label onClick={() => setProduct(product)} htmlFor="booking-modal" className="btn btn-outline hover:bg-emerald-400">Book It</label>
                                    </div>
                                    {product.reported ? <button className='btn bg-red-500 btn-xs' disabled>Reported Product</button>
                                        :
                                        <button onClick={() => handleReport(product)} className='btn bg-red-500 btn-xs'>Report To Admin</button>
                                    }
                                </div>
                            </div>
                        )
                }
                {
                    product && <BookingModal
                        product={product}
                        setProduct={setProduct}
                        user={user}
                        refetch={refetch}
                    ></BookingModal>
                }
            </div>
        </div>
    );
};

export default CategoryCollections;