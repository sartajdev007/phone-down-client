import React, { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import Loader from '../../shared/Loader';

const AllSellers = () => {
    const allSellers = useLoaderData()
    const { loading } = useContext(AuthContext)

    const handleMakeAdmin = id => {
        fetch(`http://localhost:5000/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Added to admin panel')
                }
            })
    }

    const handleVerify = id => {
        fetch(`http://localhost:5000/users/allsellers/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Seller verified')
                }
            })
    }

    const handleDeleteSeller = id => {
        fetch(`http://localhost:5000/users/allsellers/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Seller Deleted')
                }
            })
    }


    if (loading) {
        return <Loader></Loader>
    }

    return (
        <div className='pt-4'>
            <div className="overflow-x-auto">
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
                                    <td>{!seller?.verified ? <button onClick={() => handleVerify(seller._id)} className='btn btn-xs bg-blue-400'>Pending</button> : <span className='text-green-500'>Verified</span>}</td>
                                    <td>{seller?.status !== 'admin' ? <button onClick={() => handleMakeAdmin(seller._id)} className='btn btn-xs bg-blue-400'>Make Admin</button> : <span className='text-green-500'>Admin</span>}</td>
                                    <td><button onClick={() => handleDeleteSeller(seller._id)} className='btn btn-xs bg-red-400'>Delete</button></td>
                                    <Toaster></Toaster>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSellers;