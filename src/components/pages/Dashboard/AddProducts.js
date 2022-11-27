import { useQuery } from '@tanstack/react-query';
import moment from 'moment/moment';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import Loader from '../../shared/Loader';

const AddProducts = () => {
    const { user } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const imgHostKey = process.env.REACT_APP_imgbb_key
    const navigate = useNavigate()

    const { data: categories, isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/categories')
                const data = await res.json()
                return data
            }
            catch (err) {
                console.log(err)
            }
        }
    })

    const handleAddProduct = data => {
        const image = data.image[0];
        const formData = new FormData()
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const product = {
                        sellerName: data.name,
                        email: data.email,
                        name: data.model,
                        price: data.price,
                        category: data.category,
                        condition: data.condition,
                        location: data.location,
                        details: data.description,
                        image: imgData.data.url,
                        date: moment(new Date()).format('DD/MM/YYYY'),
                        status: 1,
                        advertised: false,
                    }
                    // add product to db
                    fetch('http://localhost:5000/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(result => {
                            if (result.acknowledged) {
                                toast.success(`${data.name} is added in the shop`)
                                navigate('/dashboard/myproducts')
                            }
                        })

                }
            })
    }

    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <div>
            <h1 className='text-5xl'>Add Product</h1>
            <form className='flex flex-col justify-center items-center max-w-full' onSubmit={handleSubmit(handleAddProduct)}>
                <div className="form-control w-96">
                    <label className="label">
                        <span className="label-text">Seller Name</span>
                    </label>
                    <input type="text"
                        placeholder="Seller Name"
                        className="input input-bordered w-96"
                        {...register("name")} defaultValue={user?.displayName} readOnly />
                </div>
                <div className="form-control w-96">
                    <label className="label">
                        <span className="label-text">Seller Email</span>
                    </label>
                    <input type="text"
                        placeholder="Seller Email"
                        className="input input-bordered w-96"
                        {...register("email")} defaultValue={user?.email} readOnly />
                </div>
                <div className="form-control w-96">
                    <label className="label">
                        <span className="label-text">Product Name</span>
                    </label>
                    <input type="text"
                        placeholder="Product Name"
                        className="input input-bordered w-96"
                        {...register("model")} />
                </div>
                <div className="form-control w-96">
                    <label className="label">
                        <span className="label-text">Price</span>
                    </label>
                    <input type="text"
                        placeholder="Price"
                        className="input input-bordered w-96"
                        {...register("price")} />
                </div>
                <div className="form-control w-96">
                    <label className="label">
                        <span className="label-text">Product Category</span>
                    </label>
                    <select
                        {...register("category")}
                        className="select select-ghost w-96 input-bordered">
                        <option disabled selected>Category</option>
                        {
                            categories.map(category => <option
                                key={category.category_id}
                                value={category.name}
                            >{category.name}</option>)
                        }
                    </select>
                </div>
                <div className="form-control w-96">
                    <label className="label">
                        <span className="label-text">Condition</span>
                    </label>
                    <select
                        {...register("condition")}
                        className="select select-ghost w-96 input-bordered">
                        <option disabled selected>Condition</option>
                        <option value='excellent'>Excellent</option>
                        <option value='good'>Good</option>
                        <option value='average'>Average</option>
                    </select>
                </div>
                <div className="form-control w-96">
                    <label className="label">
                        <span className="label-text">Location</span>
                    </label>
                    <select
                        {...register("location")}
                        className="select select-ghost w-96 input-bordered">
                        <option disabled selected>Location</option>
                        <option value='dhaka'>Dhaka</option>
                        <option value='chittagong'>Chittagong</option>
                        <option value='khulna'>Khulna</option>
                    </select>
                </div>
                <div className="form-control w-96">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input type="file"
                        placeholder="Photo"
                        className="input input-bordered w-full py-2"
                        {...register("image")} />
                </div>
                <div className="form-control w-96">
                    <label className="label">
                        <span className="label-text">Product Description</span>
                    </label>
                    <textarea rows='6' cols='3' type="text"
                        placeholder="Your Product Description"
                        className="textarea textarea-bordered w-96"
                        {...register("description")} />
                </div>
                <input className='btn btn-accent mt-5' type="submit" value='Add Product' />
                <Toaster></Toaster>
            </form>
        </div>
    );
};

export default AddProducts;