import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useUserRole from '../hooks/useUserRole';
import { MdPayment } from "react-icons/md";

const WishList = () => {

    const { user } = useContext(AuthContext);
    
    const [getRole] = useUserRole(user?.email)  

    const url = `http://localhost:5000/wishlist?email=${user?.email}`;

    const { data: wishlists = [] } = useQuery({
        queryKey: ['wishlists', user?.email],
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


    return (
        <div className="w-full lg:px-8 lg:py-14 md:px-6 px-4 md:py-8 py-4 bg-white lg:h-screen h-auto" id="scroll">
            {
                wishlists?.map((wishlist, i) => <div key={i} className="md:flex  py-8 md:py-10 bg-gray-200 lg:py-8 border-t border-gray-50">
                    <div className="md:w-4/12 2xl:w-1/4 w-full">
                        <img src={wishlist?.mobileImg} alt="Black Leather Bag" className="md:ml-5 rounded h-60 w-60 object-center object-cover md:block hidden" />
                        <img src={wishlist?.mobileImg} alt="Black Leather Bag" className="md:hidden w-full h-full object-center object-cover" />
                    </div>
                    <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                        <div className="flex items-center justify-between w-full pt-1">
                            <p className="text-base font-black leading-none text-gray-800">{wishlist?.productName}</p>
                            <select aria-label="Select quantity" className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none ">
                                <option>01</option>
                            </select>
                        </div>
                        <p className="text-xs leading-3 text-gray-600 pt-2">Condition: {wishlist?.condition}</p>
                        <p className="text-xs leading-3 text-gray-600 py-4">{wishlist?.purchaseYear} Year Used</p>
                        <p className="w-96 text-xs leading-3 text-gray-600">Purchase Price: {wishlist?.purchasePrice}tk</p>
                        <div className="flex items-center justify-between pt-5">
                            <div className="flex items-center">
                            {
                                getRole === "Buyer" &&  <Link to={`/payments-wish/${wishlist._id}`}><button className='flex items-center p-1 rounded text-black bg-white gap-1 mt-2 text-sm'><MdPayment />Pay</button> </Link>
                           }
                               
                            </div>
                            <p className="text-base font-black md:mr-3 leading-none text-gray-800">{wishlist?.sellingPrice}tk</p>
                        </div>
                    </div>
                </div>)
            }
            {
                !wishlists.length && <p className='text-black text-5xl'>Sorry Nothings is here. Please choice some product  </p>
            }
        </div>
    );
};

export default WishList;