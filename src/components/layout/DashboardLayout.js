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
            <div className="drawer drawer-mobile my-10">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open Dashboardm Drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        <li><Link to='/dashboard'>My dashboard</Link></li>
                        <>
                            {
                                isAdmin && <>
                                    <li><Link to='/dashboard/allusers'>All Users</Link></li>
                                    <li><Link to='/dashboard/allbuyers'>All Buyers</Link></li>
                                    <li><Link to='/dashboard/allsellers'>All Sellers</Link></li>
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