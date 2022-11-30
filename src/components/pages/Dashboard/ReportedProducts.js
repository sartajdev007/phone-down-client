import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ConfirmModal from '../../shared/ConfirmModal';

const ReportedProducts = () => {
    const [deleteReportedProduct, setDeleteReportedProduct] = useState(null)

    const closeModal = () => {
        setDeleteReportedProduct(null)
    }

    const { data: products = [], refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://phone-down-server.vercel.app/products`, {
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

    const handleDeleteReportedProduct = product => {
        fetch(`https://phone-down-server.vercel.app/reported/${product._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Product Deleted')
                    refetch()
                }
            })
    }


    return (
        <div>
            <h1 className='text-3xl font-bold text-red-600'>Reported Products</h1>
            <div className="overflow-x-auto mt-4">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Model</th>
                            <th>Seller</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.filter(product => product.reported).map((product, i) =>
                                <tr key={product._id}>
                                    <th>{i + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                <img src={product.image} alt='' />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.sellerName}</td>
                                    <td><label onClick={() => setDeleteReportedProduct(product)} htmlFor="confirm-modal" className='btn btn-xs bg-red-400'>Delete</label></td>
                                    <Toaster></Toaster>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deleteReportedProduct && <ConfirmModal
                    title={'Are you sure to delete?'}
                    message={`If you delete reported : ${deleteReportedProduct.name},it can't be undone`}
                    successAction={handleDeleteReportedProduct}
                    successBtnName='Delete'
                    modalData={deleteReportedProduct}
                    closeModal={closeModal}
                >
                </ConfirmModal>
            }
        </div>
    );
};

export default ReportedProducts;