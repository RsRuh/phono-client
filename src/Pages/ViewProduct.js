import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { CiMobile3 } from "react-icons/ci";
import { GiHealthPotion } from "react-icons/gi";
import { BsCalendarDate } from "react-icons/bs";
import { TbCurrencyTaka } from "react-icons/tb";
import ModalForm from '../components/modalForm/ModalForm';
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthProvider';
import Loading from '../components/Loading/Loading';
import { MdVerified } from "react-icons/md";

const ViewProduct = () => {

    const mobiles = useLoaderData();
    console.log(mobiles);

    const { user, loading } = useContext(AuthContext);


    const handleWishList = event => {


        const { sellingPrice, _id, productNumber } = event;

        const favInfo = {

            sellingPrice,
            favEmail: user?.email,
            favProductId: _id,
            productNumber
        }



        fetch('http://localhost:5000/wishlist', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(favInfo)
        })
            .then(res => res.json())
            .then(phns => {
                toast.success('Wish Added Successfully')
            })
            .catch((error) => {
                console.error(error);
            });

    }


    const [productInfo, setProductInfo] = useState({})

    const handleCheckout = event => {
        setProductInfo(event);
    }

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className='grid md:grid-cols-3 gap-4 my-10'>

            {
                mobiles.map((mobile, i) => <div key={i} className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg">
                    <img className="object-cover object-center w-full h-56" src={mobile?.mobileImg} alt="avatar" />

                    <div className="flex justify-evenly items-center py-3 bg-gray-900">
                        <div className='flex'>
                            <CiMobile3 className="w-6 h-6 text-white" />
                            <h1 className="mx-3 text-lg font-semibold text-white">{mobile?.productName}</h1>
                        </div>
                        <div className='flex'>
                            <h1 className=" text-lg font-semibold text-white">{mobile?.sellingPrice}</h1>
                            <TbCurrencyTaka className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <p className='flex pt-2 text-sm justify-evenly'><span>Publish Time: {mobile?.uploadTime}</span><span>Publish Date: {mobile?.uploadDate}</span></p>
                    <div className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                            <img src={mobile?.userPhoto} alt="" className="object-cover object-center w-8 h-8 rounded-full shadow-sm" />
                            <div className="-space-y-1">
                                <div className='flex'>
                                    <h2 className="text-sm pr-1 font-semibold leading-none">{mobile?.sellerName}</h2>
                                    {
                                        mobile?.tik === true && <MdVerified className="w-4 h-4 text-blue-500" />
                                    }

                                </div>
                                <span className="inline-block text-xs leading-none">{mobile?.sellerNumber}</span>
                            </div>
                        </div>

                        <p className="py-2 text-[18px] text-gray-700">Details: {mobile?.message.slice(0, 100)}</p>

                        <div className="flex items-center mt-4 text-gray-700">
                            <GiHealthPotion className="w-6 h-6 fill-current" />
                            <h1 className="px-2 text-sm">Condition: {mobile?.condition}</h1>
                        </div>

                        <div className="flex items-center mt-4 text-gray-700">
                            <svg aria-label="location pin icon" className="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z" /><path fillRule="evenodd" clipRule="evenodd" d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z" />
                            </svg>

                            <h1 className="px-2 text-sm">{mobile?.location}</h1>
                        </div>

                        <div className="flex items-center mt-4 text-gray-700">
                            <svg aria-label="email icon" className="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z" />
                            </svg>

                            <h1 className="px-2 text-sm">{mobile?.sellerEmail}</h1>

                        </div>
                        <div className="flex items-center mt-4 text-gray-700">
                            <BsCalendarDate className="w-6 h-6 fill-current" />

                            <h1 className="px-2 flex text-sm">{mobile?.purchaseYear} Years used & Purchase Price: {mobile?.purchasePrice}<TbCurrencyTaka className="w-4 h-4" /></h1>
                        </div>
                        <br />
                        <hr />
                        <div className="grid grid-cols-2 mt-5 divide-x">
                            {/* <button type="button" className="flex items-center px-2 py-1 pl-0 space-x-1">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
								<path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
								<rect width="32" height="200" x="168" y="216"></rect>
								<rect width="32" height="200" x="240" y="216"></rect>
								<rect width="32" height="200" x="312" y="216"></rect>
								<path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
							</svg>
							<span>Remove</span>
						</button> */}

                            <button
                                onClick={() => handleWishList(mobile)}
                                className="relative flex items-center font-medium text-indigo-600 before:absolute text-sm md:text-md before:-bottom-1 before:h-1 before:w-full before:origin-right before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-100"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                                    <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                                </svg>
                                <span className='hidden md:block'>Add to-</span>favorites
                            </button>

                            <button
                                onClick={() => handleCheckout(mobile)}
                                className="relative font-medium cursor-pointer text-sm md:text-md flex text-indigo-600 before:absolute before:-bottom-1 before:h-1 before:w-full before:origin-left before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-100"
                            >
                                <span className='mx-auto'>
                                    <label className='cursor-pointer' htmlFor="purchaseModal">CheckOut</label></span>
                            </button>
                        </div>
                    </div>
                </div>)
            }

            <ModalForm productInfo={productInfo}></ModalForm>

        </div>
    );
};

export default ViewProduct;