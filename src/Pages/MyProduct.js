import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import ListCard from '../components/ListCard/ListCard';
import { AuthContext } from '../contexts/AuthProvider';

const MyProduct = () => {
    const { user } = useContext(AuthContext);

    const url = `http://localhost:5000/products?email=${user?.email}`;

    const { data: products = [], refetch } = useQuery({
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

    const handleDeleteProduct = id => {

        fetch(`http://localhost:5000/mobiles/${id}`,{
            method: 'DELETE',
            headers: {
              'content-type': 'application/json',
            },
        } )
        .then(data => {
            toast.success('Mobile deleted')
            refetch();
          })
          .catch(err => console.error(err))
         
    }

    
    const handleAds = id => {
        fetch(`http://localhost:5000/products/ads/${id}`,{
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res=>res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                toast.success('Ads Added Successfully')
              
                refetch()
            }
        })
        

    }


    return (
        <div className="flex flex-col p-6 space-y-4 sm:p-10 text-gray-100">
            <h2 className="text-xl font-semibold bg-gray-800 py-5">My Products</h2>
            <ul className="flex flex-col divide-y ">
                {
                    products?.length ?
                        <>
                            {
                                products.map(product => <ListCard
                                    product={product}
                                    handleDeleteProduct={handleDeleteProduct}
                                    key={product._id}
                                    handleAds={handleAds}
                                    
                                ></ListCard>)
                            }
                        </>
                        :
                        <>
                            <section className="flex items-center border shadow-sm bg-gray-200 h-full sm:p-16">
                                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-40 h-40 text-gray-600">
                                        <path fill="currentColor" d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path>
                                        <rect width="176" height="32" x="168" y="320" fill="currentColor"></rect>
                                        <polygon fill="currentColor" points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"></polygon>
                                        <polygon fill="currentColor" points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"></polygon>
                                    </svg>
                                    <p className="text-3xl text-black">You Didn't Sell Anything, Please Sell Something</p>
                                    <Link to="/" className="px-8 py-3 font-semibold rounded bg-violet-400 text-gray-900">Back to homepage</Link>
                                </div>
                            </section>
                            
                        </>
                }

            </ul>
        </div>
    );
};

export default MyProduct;