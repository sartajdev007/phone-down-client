import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import Loader from '../../shared/Loader';

const Register = () => {
    const { createUser, updateUserProfile, loading } = useContext(AuthContext)
    const [error, setError] = useState('')
    const navigate = useNavigate()



    const handleSubmit = e => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const role = form.role.value;
        const password = form.password.value;

        // console.log(name, email, role)
        setError('')
        createUser(email, password)
            .then(result => {
                const user = result.user
                toast.success('Registration successful')
                const profile = {
                    displayName: name,
                    email: email,
                    role: role,
                };
                console.log(profile)
                updateUserProfile(profile)
                    .then(() => {
                        saveUser(name, email, role)
                    })
                    .catch(e => console.log(e))
                form.reset()
            })
            .catch(error => {
                console.error(error)
                setError(error.message)
            })
    }

    const saveUser = (name, email, role) => {
        const user = { name, email, role }
        fetch('https://phone-down-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                getUserToken(email)
            })
    }

    const getUserToken = email => {
        fetch(`https://phone-down-server.vercel.app/jwt?email=${email}`)
            .then(res => res.json())
            .then(data => {
                if (data.accessToken) {
                    localStorage.setItem('accessToken', data.accessToken)
                    navigate('/')
                }
            })
    }

    if (loading) {
        return <Loader></Loader>
    }


    return (
        <div>
            <div className="flex flex-col justify-center min-h-screen overflow-hidden">
                <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-green-600/40 ring-2 ring-green-600 lg:max-w-xl">
                    <h1 className="text-3xl font-extrabold text-center text-green-700  uppercase">
                        Register!!
                    </h1>
                    <form onSubmit={handleSubmit} className="mt-6">
                        <div className="mb-2">
                            <label
                                htmlFor="name"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                required
                                name='name'
                                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                name='email'
                                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label
                                className="block text-sm text-center font-semibold text-gray-800">
                                Select your role
                            </label>
                            <select name='role' className="select select-bordered block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40">
                                <option disabled selected>Pick one</option>
                                <option value='seller'>Seller</option>
                                <option value='buyer'>Buyer</option>
                            </select>
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name='password'
                                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mt-6">
                            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">
                                Register
                            </button>
                        </div>
                        <p className='text-red-500'>
                            {error}
                        </p>
                    </form>

                    <p className="mt-8 text-xs font-bold text-center text-gray-700">
                        Already have an account?{" "}
                        <Link to='/login'
                            className="font-medium text-green-700 hover:text-green-400"
                        >
                            Login
                        </Link>
                        <Toaster></Toaster>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;