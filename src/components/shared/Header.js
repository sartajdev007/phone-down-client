import userEvent from '@testing-library/user-event';
import React, { useContext } from 'react';
import { FcSmartphoneTablet } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const Header = () => {
    const { user, logOut } = useContext(AuthContext)

    const handleLogOut = () => {
        logOut()
            .then(() => {
                localStorage.removeItem('accessToken')
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><button className="btn btn-ghost rounded-lg"><Link to='/'>Home</Link></button></li>
                        <li>
                            {
                                user?.uid &&
                                <button className="btn btn-ghost rounded-lg"><Link to='/dashboard'>Dashboard</Link></button>
                            }
                        </li>
                        <li><button className="btn btn-accent rounded-lg"><Link>Blogs</Link></button></li>
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl"><FcSmartphoneTablet></FcSmartphoneTablet>Phone<span>Down</span></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    <li><button className="btn btn-ghost rounded-lg"><Link to='/'>Home</Link></button></li>
                    <li>
                        {
                            user?.uid &&
                            <button className="btn btn-ghost rounded-lg"><Link to='/dashboard'>Dashboard</Link></button>
                        }
                    </li>
                    <li><button className="btn btn-ghost rounded-lg"><Link>Blogs</Link></button></li>
                </ul>
            </div>
            <div className="navbar-end gap-3">
                {
                    user?.uid ?
                        <>
                            <p className='text-lg pr-3 font-semibold  text-teal-500'><span className='text-black p-2'>Welcome</span> {user?.displayName}</p>
                            <Link><button onClick={handleLogOut} className='btn btn-outline hover:bg-red-500'>Log Out</button></Link>
                        </>
                        :
                        <>
                            <Link to='/login' className="btn btn-outline hover:bg-emerald-500">Login</Link>
                            <Link to='/register' className="btn btn-outline hover:bg-emerald-500">Register</Link>
                        </>
                }
            </div>
        </div>
    );
};

export default Header;