import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../context/AuthProvider';
import Loader from '../../shared/Loader';
import { TiTick } from "react-icons/ti"
import ConfirmModal from '../../shared/ConfirmModal';

const AllSellers = () => {
    const { loading } = useContext(AuthContext)
    const [deleteSell, setDeleteSell] = useState(null)

    const closeModal = () => {
        setDeleteSell(null)
    }

    const { data: allSellers = [], refetch } = useQuery({
        queryKey: ['allSellers'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://phone-down-server.vercel.app/users/allsellers`)
                const data = await res.json()
                return data
            }
            catch (err) {
                console.log(err)
            }
        }
    })



    const handleMakeAdmin = id => {
        fetch(`https://phone-down-server.vercel.app/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Added to admin panel')
                    refetch()
                }
            })
    }

    const handleVerify = seller => {
        fetch(`https://phone-down-server.vercel.app/products?email=${seller.email}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })

        fetch(`https://phone-down-server.vercel.app/users/allsellers/${seller._id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Seller verified')
                    refetch()
                }
            })
    }

    const handleDeleteSeller = seller => {
        fetch(`https://phone-down-server.vercel.app/users/allsellers/${seller._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Seller Deleted')
                    refetch()
                }
            })
    }


    if (loading) {
        return <Loader></Loader>
    }

    return (
        <div className='pt-4'>
            <h1 className='text-3xl font-bold'>All <span className='text-emerald-500'>Sellers</span></h1>
            <div className="overflow-x-auto mt-5">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Seller Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Verified Status</th>
                            <th>Admin Status</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allSellers?.map((seller, i) =>
                                <tr key={seller._id}>
                                    <th>{i + 1}</th>
                                    <td>{seller.name}</td>
                                    <td>{seller.email}</td>
                                    <td>{seller.role}</td>
                                    <td>{!seller?.verified ? <button onClick={() => handleVerify(seller)} className='btn btn-xs bg-blue-400'>Pending</button> : <span className='text-blue-500 text-2xl'><TiTick></TiTick></span>}</td>
                                    <td>{seller?.status !== 'admin' ? <button onClick={() => handleMakeAdmin(seller._id)} className='btn btn-xs bg-blue-400'>Make Admin</button> : <span className='text-green-500'>Admin</span>}</td>
                                    <td><label onClick={() => setDeleteSell(seller)} htmlFor="confirm-modal" className='btn btn-xs bg-red-400'>Delete</label></td>
                                    <Toaster></Toaster>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deleteSell && <ConfirmModal
                    title={'Are you sure to delete?'}
                    message={`If you delete seller : ${deleteSell.name},it can't be undone`}
                    successAction={handleDeleteSeller}
                    successBtnName='Delete'
                    modalData={deleteSell}
                    closeModal={closeModal}
                >

                </ConfirmModal>
            }
        </div>
    );
};

export default AllSellers;