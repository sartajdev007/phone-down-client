import React, { useContext, useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import Loader from '../../shared/Loader';
import BookingModal from '../CategoryCollections/BookingModal';


const Advertisement = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/products', {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setProducts(data)
            })
    }, [])

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };


    return (
        <div>
            <Carousel
                responsive={responsive}
                swipeable={false}
                draggable={false}
                showDots={true}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                className='p-10'
            >
                {
                    products.filter(product => !product.status).filter(product => product.advertised).map(product =>

                        <div key={product._id} className="card w-96 bg-emerald-100 shadow-xl image-full shadow-emerald-200">
                            <figure><img className='w-[200px] h-[200px]' src={product.image} alt='' /></figure>
                            <div className="card-body">
                                <div className='shadow-md border-2 border-emerald-200 rounded-lg'>
                                    <h2 className='text-xl font-semibold'>Adverts.</h2>
                                </div>
                                <h2 className='text-2xl font-bold text-violet-300'>{product.name}</h2>
                                <p>{product.details}</p>
                                <p>Seller:{product.sellerName}</p>
                                <p>Condition: {product.condition}</p>
                                {/* <div className="card-actions justify-center">
                                        <Link to='/login'><button className="btn btn-primary">Buy Now</button></Link>
                                    </div> */}
                            </div>
                        </div>
                    )
                }
            </Carousel>
        </div >
    );
};

export default Advertisement;