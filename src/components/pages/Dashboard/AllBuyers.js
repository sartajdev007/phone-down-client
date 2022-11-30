import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ConfirmModal from '../../shared/ConfirmModal';

const AllBuyers = () => {
    const [deleteBuyer, setDeleteBuyer] = useState(null)


    const closeModal = () => {
        setDeleteBuyer(null)
    }


    const { data: allBuyers = [], refetch } = useQuery({
        queryKey: ['allBuyers'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/users/allBuyers`)
                const data = await res.json()
                return data
            }
            catch (err) {
                console.log(err)
            }
        }
    })

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
                    refetch()
                }
            })
    }

    const handleDeleteBuyer = buyer => {
        fetch(`http://localhost:5000/users/allsellers/${buyer._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Buyer Deleted')
                    refetch()
                }
            })
    }



    return (
        <div className='pt-4'>
            <h1 className='text-3xl font-bold'>All <span className='text-emerald-500'>Buyers</span></h1>
            <div className="overflow-x-auto mt-5">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Buyer Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Status</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allBuyers?.map((buyer, i) =>
                                <tr key={buyer._id}>
                                    <th>{i + 1}</th>
                                    <td>{buyer.name}</td>
                                    <td>{buyer.email}</td>
                                    <td>{buyer.role}</td>
                                    <td>{buyer?.status !== 'admin' ? <button onClick={() => handleMakeAdmin(buyer._id)} className='btn btn-xs bg-blue-400'>Make Admin</button> : <span className='text-green-500'>Admin</span>}</td>
                                    <td><label onClick={() => setDeleteBuyer(buyer)} htmlFor="confirm-modal" className='btn btn-xs bg-red-400'>Delete</label></td>
                                    <Toaster></Toaster>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deleteBuyer && <ConfirmModal
                    title={'Are you sure to delete?'}
                    message={`If you delete buyer : ${deleteBuyer.name},it can't be undone`}
                    successAction={handleDeleteBuyer}
                    successBtnName='Delete'
                    modalData={deleteBuyer}
                    closeModal={closeModal}
                >

                </ConfirmModal>
            }
        </div>
    );
};

export default AllBuyers;