import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import Loader from '../../shared/Loader';

const MyOrders = () => {
    const { user, loading } = useContext(AuthContext)
    const { data: bookings = [] } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/myorders?email=${user?.email}`, {
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

    if (loading) {
        return <Loader></Loader>
    }

    return (
        <div>
            <h1 className='text-5xl'>My Products: {bookings.length}</h1>
            <div className="overflow-x-auto mt-4">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Model</th>
                            <th>Image</th>
                            <th>Condition</th>
                            <th>Status</th>
                            <th>Price</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings?.map((booking, i) =>
                                <tr key={booking._id}>
                                    <th>{i + 1}</th>
                                    <td>{booking.name}</td>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                <img src={booking.image} alt='' />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{booking.condition}</td>
                                    <td>Booked</td>
                                    <td>${booking.price}</td>
                                    <td>
                                        {
                                            booking.paid ?
                                                <p className='text-blue-500'>Paid</p>
                                                :
                                                <Link to={`/dashboard/payment/${booking._id}`}>
                                                    <button className='btn btn-xs bg-blue-400'>Pay Now</button></Link>
                                        }
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;