import moment from 'moment';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../../shared/Loader';

const BookingModal = ({ product, setProduct, user, refetch }) => {
    const handleBooking = (e, product) => {
        e.preventDefault()
        const form = e.target;
        const phone = form.phone.value
        const location = form.buyerLocation.value
        const buyerName = form.buyerName.value
        const buyerEmail = form.buyerEmail.value

        const bookedProduct = {
            productId: product._id,
            name: product.name,
            seller: product.email,
            price: product.price,
            image: product.image,
            category: product.category,
            condition: product.condition,
            date: moment(new Date()).format('DD/MM/YYYY HH:mm'),
            status: 1,
            phone,
            location,
            buyerName,
            buyerEmail
        }

        fetch(`https://phone-down-server.vercel.app/bookings/${product._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })


        fetch('https://phone-down-server.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(bookedProduct)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    setProduct(null)
                    toast.success('Booking Successful')
                    refetch()
                }
            })
        setProduct(null)
    }



    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Booking!!</h3>
                    <p className="py-4 font-semibold text-xl">{product?.name}</p>
                    <form onSubmit={(e) => handleBooking(e, product)} className='grid grid-cols-1 gap-3 mt-10"'>
                        <div>
                            <label htmlFor="productName">Product Name</label>
                            <input type="text" name='productName' value={product?.name} className="input w-full input-bordered" readOnly />
                        </div>
                        <div>
                            <label htmlFor="price">Resell Price</label>
                            <input type="text" name='price' value={product?.price} className="input w-full input-bordered" readOnly />
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
                <Toaster></Toaster>
            </div>
        </div>
    );
};

export default BookingModal;