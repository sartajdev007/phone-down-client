import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { TiTick } from 'react-icons/ti';
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
                const res = await fetch('http://localhost:5000/products', {
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
        fetch(`http://localhost:5000/products/${product._id}`, {
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
        <div className='grid grid-cols-1 justify-items-center gap-5 md:grid-cols-2 lg:grid-cols-3 my-10'>
            {
                categoryProducts.filter(product => product.category === category.name).filter(product => !product.status).length === 0 ? <h1 className='my-12 text-center font-bold text-5xl'>Sold Out</h1> :
                    categoryProducts.filter(product => product.category === category.name).filter(product => !product.status).map(
                        product => <div key={product._id} className="card w-96 bg-base-100 shadow-xl">
                            <figure className="p-3">
                                <img className="max-w-[200px] h-[200px] rounded-xl" src={product.image} alt="" />
                            </figure>
                            <div className="card-body items-center">
                                <h2>{product.name}</h2>
                                <p>{product.details}</p>
                                <div className=''>
                                    <p className='font-semibold'>Resell Price:${product.price}</p>
                                    <br />
                                    <p className='font-semibold'>Condition:{product.condition}</p>
                                    <br />
                                    <div className='flex'>
                                        <p className='font-semibold'>Seller: {product.sellerName}</p>
                                        <p className=''>{product.verifiedSeller && <TiTick className='text-blue-500 text-2xl'></TiTick>}</p>
                                    </div>
                                    <br />
                                </div>
                                <div className="card-actions">
                                    <label onClick={() => setProduct(product)} htmlFor="booking-modal" className="btn btn-primary">Book It</label>
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
    );
};

export default CategoryCollections;