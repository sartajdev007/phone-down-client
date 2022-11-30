import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../context/AuthProvider';
import ConfirmModal from '../../shared/ConfirmModal';
import Loader from '../../shared/Loader';

const MyProducts = () => {
    const { user, loading } = useContext(AuthContext)
    const [deleteProduct, setDeleteProduct] = useState(null)

    const closeModal = () => {
        setDeleteProduct(null)
    }

    const { data: products = [], refetch } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            try {
                const res = await fetch(`https://phone-down-server.vercel.app/myproducts?email=${user?.email}`, {
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

    const handleAdvertise = id => {
        fetch(`https://phone-down-server.vercel.app/myproducts/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Product Advertised')
                    refetch()
                }
            })
    }
    const handleDeleteProduct = product => {
        fetch(`https://phone-down-server.vercel.app/myproducts/${product._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Product Deleted')
                    refetch()
                }
            })
    }

    if (loading) {
        return <Loader></Loader>
    }


    return (
        <div>
            <h1 className='text-5xl font-bold text-emerald-500'>My Products</h1>
            <div className="overflow-x-auto mt-5">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Model</th>
                            <th>Status</th>
                            <th>Advertise</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, i) =>
                                <tr key={product._id}>
                                    <th>{i + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                <img src={product.image} alt='' />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.status ? <span>Booked</span> : <span>Unsold</span>}</td>
                                    <td>{
                                        !product.status ?
                                            <button onClick={() => handleAdvertise(product._id)} className={product.advertised ? 'btn btn-ghost btn-xs' : 'btn btn-xs bg-blue-400'}>{product.advertised ? 'Advertised' : 'Advertise'}</button>
                                            :
                                            <button className='btn btn-sm' disabled>Advertise</button>
                                    }
                                    </td>
                                    <td><label onClick={() => setDeleteProduct(product)} htmlFor="confirm-modal" className='btn btn-xs bg-red-400'>Delete</label></td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deleteProduct && <ConfirmModal
                    title={'Are you sure to delete?'}
                    message={`If you delete product : ${deleteProduct.name},it can't be undone`}
                    successAction={handleDeleteProduct}
                    successBtnName='Delete'
                    modalData={deleteProduct}
                    closeModal={closeModal}
                >
                </ConfirmModal>
            }
            <Toaster></Toaster>
        </div>
    );
};

export default MyProducts;