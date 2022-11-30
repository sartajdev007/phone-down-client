import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useToken from '../../hooks/useToken';

const Login = () => {
    const { logIn, googleLogin } = useContext(AuthContext)
    const [error, setError] = useState('')
    const [loginEmail, setLoginEmail] = useState('')
    const [token] = useToken(loginEmail)
    const location = useLocation()

    const from = location.state?.from?.pathname || '/'

    const navigate = useNavigate()

    if (token) {
        navigate(from, { replace: true })
    }

    const handleLogin = e => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        logIn(email, password)
            .then(result => {
                const user = result.user
                console.log(user)
                setError('')
                setLoginEmail(email)
                form.reset()
            })
            .catch(error => {
                console.error(error)
                setError(error.message)
            })
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const user = result.user;
                const googleUser = { name: user.displayName, email: user.email }

                fetch(`https://phone-down-server.vercel.app/users/${googleUser.email}`, {
                    method: 'PUT',
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                    });

                fetch('https://phone-down-server.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(googleUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        getUserToken(googleUser.email)
                        navigate(from, { replace: true })
                    })
            })
            .catch(error => {
                console.error(error)
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




    return (
        <div>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-green-700">Log in to your account</h2>
                    </div>
                    <form onSubmit={handleLogin} className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-green-500
                  focus:border-green-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                            <div className='pt-4'>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-green-500
                  focus:border-green-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <p>
                                    Don't have an account?? {" "}
                                    <Link to='/register' className="font-medium text-green-600 hover:text-green-500">
                                        Register
                                    </Link>
                                </p>
                                <p className='text-red-500 font-semibold'>
                                    {error}
                                </p>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center
                py-2 px-4 border border-transparent text-sm font-medium
                rounded-md text-white bg-green-600 hover:bg-green-700
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-green-500"
                            >
                                Sign in
                            </button>
                            <button
                                onClick={handleGoogleLogin}
                                className="mt-5 group relative w-full flex justify-center
                py-2 px-4 border border-transparent text-sm font-medium
                rounded-md text-black border-green-500 bg-tranparent hover:bg-green-700 hover:text-white
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-green-500"
                            >
                                Sign in with Google
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;