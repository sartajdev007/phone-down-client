import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const MyOrders = () => {
    const { user, loading } = useContext(AuthContext)
    const { data: bookings = [], refetch } = useQuery({
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

    return (
        <div>
            <h1 className='text-5xl'>My Products: {bookings.length}</h1>
            <div className="overflow-x-auto mt-4">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Model</th>
                            <th>Seller Email</th>
                            <th>Condition</th>
                            <th>Status</th>
                            <th>Payment</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings?.map((booking, i) =>
                                <tr key={booking._id}>
                                    <th>{i + 1}</th>
                                    <td>{booking.name}</td>
                                    <td>{booking.seller}</td>
                                    <td>{booking.condition}</td>
                                    <td>Booked</td>
                                    <td><button className='btn btn-xs bg-blue-400'>Payment</button></td>
                                    <td><button className='btn btn-xs bg-red-400'>Delete</button></td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;