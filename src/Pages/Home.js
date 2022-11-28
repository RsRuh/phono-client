import React, { useContext, useState } from 'react';
import sony from '../assets/sony.jpg'
import kidni from '../assets/kidni.jpg';
import samsu from '../assets/samsu.jpg'
import myPhn from '../assets/myPhn.jpg'
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import ModalForm from '../components/modalForm/ModalForm';
import ExtraSection from './ExtraSection';

const Home = () => {
    const { user } = useContext(AuthContext);

    const url = 'http://localhost:5000/view-ads';

    const { data: products = [] } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }

    })


    const categories = [
        { name: "OnePlus", link: "/dashboard", icon: myPhn },
        { name: "Apple", link: "/", icon: kidni },
        { name: "Samsung", link: "/", icon: samsu },
        { name: "Sony", link: "/", icon: sony },
    ];

    const [productInfo, setProductInfo] = useState({})

    const handleCheckout = event => {
        setProductInfo(event);
    }


    return (
        <div >
            {
                products?.length > 0 &&

                <div className="relative flex items-center justify-center w-full text-gray-50 my-5 border">

                    <div className="flex items-center justify-start w-full h-full gap-6 md:py-4 mx-auto overflow-auto lg:gap-8">
                        {
                            products.map((product, i) => <div key={i} className="relative border md:flex flex-shrink-0 w-full sm:w-auto">
                                <img className="object-cover object-center md:h-96 aspect-square bg-gray-500" src={product.mobileImg} alt={i + 1} />
                                <div className='md:px-5 p-5 md:p-0'>
                                    <p className='text-red-600 text-3xl md:mt-10'>{product.category}</p>
                                    <p className='text-black'>{product.productName}</p>
                                    <p className='text-black text-sm'>Used: {product.purchaseYear} Year</p>
                                    <p className='text-black text-sm'>Condition: {product.condition}</p>
                                    <p className='text-black text-sm'>Location: {product.location}</p>
                                    <button
                                        onClick={() => handleCheckout(product)}
                                        className="btn btn-xs btn-primary"
                                    >
                                        <span className='mx-auto'>
                                            <label className='cursor-pointer' htmlFor="purchaseModal">Book Now</label></span>
                                    </button>
                                </div>


                            </div>)
                        }
                    </div>

                </div>
            }

            <div className='md:mt-5 border shadow'>
                <h2 className='font-bold text-violet-800 text-2xl md:text-5xl'>Our Mobile Categories</h2>
                <div className='grid md:grid-cols-4 gap-5 mb-10'>


                    {
                        categories.map((category, i) => <Link key={i} to={`/category/${category.name}`} className="group shadow block mt-5 overflow-hidden">
                            <img
                                alt="Tee"
                                src={category.icon}
                                className="h-[350px] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-[450px]"
                            />

                            <div className="relative bg-white pt-4">
                                <h3
                                    className="text-xl text-center mb-5 ml-5 text-gray-700 group-hover:underline group-hover:underline-offset-4">
                                    {category.name}
                                </h3>
                            </div>
                        </Link>)
                    }

                </div>
            </div>
            <ExtraSection></ExtraSection>
            <ModalForm productInfo={productInfo}></ModalForm>
        </div>
    );
};

export default Home;