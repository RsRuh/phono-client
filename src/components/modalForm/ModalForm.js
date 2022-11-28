import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { TbCurrencyTaka } from "react-icons/tb";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import useUserRole from '../../hooks/useUserRole';



const ModalForm = ({ productInfo }) => {

    const { user } = useContext(AuthContext);
    const [getRole] = useUserRole(user?.email)
    const { sellerName, productName, sellerEmail, condition, location, message, mobileImg, category, purchasePrice, purchaseYear, sellingPrice, productNumber, _id } = productInfo;


    const handleSubmitModal = event => {
        event.preventDefault();
        const form = event.target;
        const number = form.number.value;
        const address = form.address.value
        const purchaseInfo = {
            buyerEmail: user?.email,
            buyerImg: user?.photoURL,
            buyerName: user?.displayName,
            buyerAddress: address,
            buyerNumber: number,
            sellerName: sellerName,
            sellerEmail: sellerEmail,
            mobileImg: mobileImg,
            condition: condition,
            message: message,
            productId: _id,
            productName: productName,
            category: category,
            purchasePrice: purchasePrice,
            purchaseYear: purchaseYear,
            sellingPrice: sellingPrice,
            productNumber: productNumber
        }

        fetch('http://localhost:5000/purchased', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(purchaseInfo)
        })
            .then(res => res.json())
            .then(mobiles => {
                // console.log(mobiles);
                toast.success('Added to Book, Please Checkout to buy')
                form.reset();
            })
            .catch((error) => {
                console.error(error);
            });


        fetch(`http://localhost:5000/checked?id=${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(purchaseInfo)
        })
            .then(res => res.json())
            .then(success => {
            })
            .catch((error) => {
                console.error(error);
            });
    }


    return (
        <div>
            <input type="checkbox" id="purchaseModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <section>
                        <h1 className="sr-only">Add to Book</h1>

                        <div className="relative mx-auto max-w-screen-2xl">
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="bg-gray-50 py-12 md:py-24">
                                    <div className="mx-auto max-w-lg px-4 lg:px-8">
                                        <div className="flex items-center">
                                            <img className="h-10 w-10 rounded-full" src={user?.photoURL} alt="" />
                                            <h2 className="ml-4 font-medium">{user?.displayName}</h2>
                                        </div>

                                        <div className="mt-8">
                                            <p className="text-2xl flex font-medium tracking-tight">{sellingPrice}<TbCurrencyTaka className="w-6 h-6 text-black" /></p>
                                            <p className="mt-1 text-sm text-gray-500">For the purchase of</p>
                                        </div>

                                        <div className="mt-12">
                                            <div className="flow-root">
                                                <ul className="-my-4 divide-y divide-gray-200">
                                                    <li className="flex items-center justify-between py-4">
                                                        <div className="flex items-start">
                                                            <img
                                                                alt="Trainer"
                                                                src={mobileImg}
                                                                className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
                                                            />

                                                            <div className="ml-4">
                                                                <p className="text-sm">{productName}</p>

                                                                <dl className="mt-1 space-y-1 text-xs text-gray-500">
                                                                    <div>
                                                                        <dt className="inline">Condition:</dt>
                                                                        <dd className="inline">{condition}</dd>
                                                                    </div>

                                                                    <div>
                                                                        <dt className="inline">Location:</dt>
                                                                        <dd className="inline">{location}</dd>
                                                                    </div>
                                                                </dl>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <p className="text-sm flex font-medium tracking-tight">{sellingPrice}<TbCurrencyTaka className="w-6 h-6 text-black" />
                                                                <small className="text-gray-500">x1</small>
                                                            </p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white py-12 md:py-24">
                                    <div className="mx-auto max-w-lg px-4 lg:px-8">
                                        <form onSubmit={handleSubmitModal} className="grid grid-cols-6 gap-4">
                                            <div className="col-span-6">
                                                <label className="mb-1 block text-sm text-gray-600" htmlFor="first_name">
                                                    Your Name
                                                </label>

                                                <input
                                                    className="w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm"
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    defaultValue={user?.displayName}
                                                    placeholder={user?.displayName}
                                                    disabled
                                                />
                                            </div>

                                            <div className="col-span-6">
                                                <label className="mb-1 block text-sm text-gray-600" htmlFor="email">
                                                    Email
                                                </label>

                                                <input
                                                    className="w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm"
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    defaultValue={user?.email}
                                                    placeholder={user?.email}
                                                    disabled
                                                />
                                            </div>

                                            <div className="col-span-6">
                                                <label className="mb-1 block text-sm text-gray-600" htmlFor="number">
                                                    Phone
                                                </label>

                                                <input
                                                    className="w-full border rounded-lg border-gray-200 p-2.5 text-sm shadow-sm"
                                                    type="number"
                                                    id="number"
                                                    name='number'
                                                />
                                            </div>
                                            <div className="col-span-6">
                                                <label className="mb-1 block text-sm text-gray-600" htmlFor="address">
                                                    Meetup Location
                                                </label>

                                                <input
                                                    className="w-full border rounded-lg border-gray-200 p-2.5 text-sm shadow-sm"
                                                    type="text"
                                                    id="address"
                                                    name='address'
                                                />
                                            </div>
                                            <div className="modal-action col-span-6">
                                                { user?.email && getRole === 'Buyer' &&
                                                    <button type='submit' className='mx-auto my-8 font-semibold rounded-md border'>
                                                        <label htmlFor="purchaseModal" className='cursor-pointer p-10'>Purchase</label>
                                                    </button>
                                                }
                                                { user?.email && getRole !== 'Buyer' &&
                                                    <div className='py-2 px-4 mx-auto my-8 font-semibold rounded-md border'>
                                                        <label htmlFor="purchaseModal" className='cursor-pointer'>Only Buyer Can Purchase</label>
                                                    </div>
                                                }
                                                { !user &&
                                                    <Link to='/sign-in' className='py-2 px-4 mx-auto my-8 font-semibold rounded-md border'>
                                                        <label htmlFor="purchaseModal" className=''>Please Login First</label>
                                                    </Link>
                                                }
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

        </div>
    );
};

export default ModalForm;