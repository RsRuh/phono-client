import React, { useContext } from 'react';
import { SiGoogleads, SiGoogleadsense } from "react-icons/si";
import { AuthContext } from '../../contexts/AuthProvider';
import useUserRole from '../../hooks/useUserRole';
import Loading from '../Loading/Loading';
import { MdPayment } from "react-icons/md";
import { SiPayoneer } from "react-icons/si";
import { Link } from 'react-router-dom';

const ListCard = ({ product, handleDeleteProduct, handleAds }) => {

    const { user, loading } = useContext(AuthContext);
    const [getRole] = useUserRole(user?.email)



    const { productName, purchasePrice, sellingPrice, uploadDate, mobileImg, _id } = product;



    if (loading) {
        return <Loading></Loading>
    }
    return (
        <li className="flex flex-col bg-gray-900 px-2 py-6 sm:flex-row sm:justify-between">
            <div className="flex w-full space-x-2 sm:space-x-4">
                <img className="flex-shrink-0 object-cover w-20 h-20 border-transparent rounded outline-none sm:w-32 sm:h-32 bg-gray-500" src={mobileImg} alt="Polaroid camera" />
                <div className="flex flex-col justify-between w-full pb-4">
                    <div className="flex justify-between w-full pb-2 space-x-2">

                        <div className="space-y-1">
                            <h3 className="text-lg font-semibold leading-snug sm:pr-8">{productName}</h3>
                            { getRole === "Seller" && !user.verified &&
                                <button onClick={() => handleAds(_id)} className='flex items-center p-1 rounded text-black bg-violet-400 gap-1 text-sm'><SiGoogleads />Ads</button>
                            }
                            {
                                getRole === "Buyer" && user.verified && <button className='flex items-center p-1 rounded text-black bg-green-500 gap-1 text-sm'><SiGoogleadsense />Added</button>
                            }

                           {
                                getRole === "Buyer" && !product.paid &&  <Link to={`/payments/${_id}`}><button className='flex items-center p-1 rounded text-black bg-white gap-1 mt-2 text-sm'><MdPayment />Pay</button> </Link>
                           }
                           {
                                getRole === "Buyer" && product.paid && <button className='flex items-center p-1 rounded text-black bg-green-500 gap-1 text-sm'><SiPayoneer />Payed</button>
                           }
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-semibold">{sellingPrice}tk</p>
                            <p className="text-sm line-through text-gray-600">{purchasePrice}tk</p>
                        </div>
                    </div>
                    <div className="flex text-sm divide-x">

                        {getRole === 'Seller' &&

                            <button onClick={() => handleDeleteProduct(_id)} type="button" className="flex items-center px-2 py-1 pl-0 space-x-1">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                                    <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                                    <rect width="32" height="200" x="168" y="216"></rect>
                                    <rect width="32" height="200" x="240" y="216"></rect>
                                    <rect width="32" height="200" x="312" y="216"></rect>
                                    <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                                </svg>
                                <span>Remove</span>
                            </button>

                        }
                        <div type="button" className="flex items-center px-2 py-1 space-x-1">
                            <span>{uploadDate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default ListCard;