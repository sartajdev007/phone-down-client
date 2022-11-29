import { useQuery } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';

const ReportedProducts = () => {
    const { data: products = [], refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/products`, {
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

    const handleDeleteProduct = id => {
        fetch(`http://localhost:5000/products/${id}`, {
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
            <h1 className='text-5xl'>My Products</h1>
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
                                    <td><button onClick={() => handleDeleteProduct(product._id)} className='btn btn-xs bg-red-400'>Delete</button></td>
                                    <Toaster></Toaster>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportedProducts;