import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useBuyer from '../hooks/useBuyer';
import useSeller from '../hooks/useSeller';
import Header from '../shared/Header';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext)
    const [isAdmin] = useAdmin(user?.email)
    const [isSeller] = useSeller(user?.email)
    const [isBuyer] = useBuyer(user?.email)

    console.log(isAdmin, isSeller, isBuyer)

    return (
        <div>
            <Header></Header>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn bg-emerald-500 btn-sm border-0 drawer-button lg:hidden mt-4">Open Dashboard</label>

                </div>
                <div className="bg-teal-200">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-teal-200 text-base-content font-semibold">
                        <>
                            {
                                isAdmin && <>
                                    <li><Link to='/dashboard/allbuyers'>All Buyers</Link></li>
                                    <li><Link to='/dashboard/allsellers'>All Sellers</Link></li>
                                    <li><Link to='/dashboard/reported'>Reported Products</Link></li>
                                </>
                            }
                        </>
                        <>
                            {
                                isSeller && <>
                                    <li><Link to='/dashboard/addproducts'>Add Products</Link></li>
                                    <li><Link to='/dashboard/myproducts'>My Products</Link></li>
                                </>
                            }
                        </>
                        <>
                            {
                                isBuyer && <>
                                    <li><Link to='/dashboard/myorders'>My Orders</Link></li>
                                </>
                            }
                        </>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;