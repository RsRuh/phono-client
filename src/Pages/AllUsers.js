import React, { Fragment, useContext, useState } from 'react';
import { Tab } from '@headlessui/react'
import { AuthContext } from '../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { MdVerified } from "react-icons/md";
import toast from 'react-hot-toast';
import useUserRole from '../hooks/useUserRole';

const AllUsers = () => {

    const { user } = useContext(AuthContext);
    const [getRole, isUserLoading] = useUserRole(user?.email)
    const [role, setRole] = useState('Buyer')

    const url = `http://localhost:5000/users?role=${role}`;

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users', user?.email, role],
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

    const handleCategory = event => {
        setRole(event)
       refetch()
    }


    const handleVerified = seller => {

        fetch(`http://localhost:5000/users/verified/${seller._id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Seller updated successfully')
                    refetch()
                }
            })

    }

    const handleDeleteUser = id => {

        fetch(`http://localhost:5000/user/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
            },
        })
            .then(data => {
                // console.log(data);
                toast.success('Mobile deleted')
                refetch()
            })
            .catch(err => console.log(err))

    }



    return (

        <Tab.Group>
            <div className='flex justify-between mt-20 border-b-4 border-gray-400'>
                <Tab.List className="flex gap-5 items-center -mx-4 p-2 overflow-x-auto overflow-y-hidden  flex-nowrap text-gray-100">
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                onClick={() => handleCategory('Buyer')}
                                className={selected ? 'border-b-4 border-[#A78BFA] text-black' : 'text-gray-500'}
                            >
                                All Buyer
                            </button>
                        )}
                    </Tab>
                    {getRole === 'admin' &&
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    onClick={() => handleCategory('Seller')}
                                    className={selected ? 'border-b-4 border-[#A78BFA] text-black' : 'text-gray-500'}
                                >
                                    All Seller
                                </button>
                            )}
                        </Tab>
                    }
                </Tab.List>
            </div>
            <Tab.Panels>
                <Tab.Panel>
                    <div className="container p-2 mx-auto sm:p-4 text-gray-100">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-xs">

                                <thead className="bg-gray-700">
                                    <tr className="text-left">
                                        <th className="p-3">no.</th>
                                        <th className="p-3">Name</th>
                                        <th className="p-3">Email</th>
                                        <th className="p-3">Remove</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        users?.map((person, i) =>
                                            <tr key={person._id} className="border-b border-opacity-20 border-gray-700 bg-gray-900">
                                                <td className="p-3">
                                                    <p>{i + 1}</p>
                                                </td>
                                                <td className="p-3">
                                                    <p>{person?.name}</p>
                                                </td>
                                                <td className="p-3">
                                                    <p>{person?.email}</p>
                                                </td>
                                                <td className="p-3 flex">
                                                    <button
                                                        onClick={() => handleDeleteUser(person._id)}
                                                        type="button" className="flex items-center justify-center px-2 py-1 pl-0 space-x-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                                                            <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                                                            <rect width="32" height="200" x="168" y="216"></rect>
                                                            <rect width="32" height="200" x="240" y="216"></rect>
                                                            <rect width="32" height="200" x="312" y="216"></rect>
                                                            <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                                                        </svg>
                                                        <span>Remove</span>
                                                    </button>
                                                </td>
                                            </tr>)
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </Tab.Panel>
                <Tab.Panel>
                    <div className="container p-2 mx-auto sm:p-4 text-gray-100">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-xs">

                                <thead className="bg-gray-700">
                                    <tr className="text-left">
                                        <th className="p-3">no.</th>
                                        <th className="p-3">Name</th>
                                        <th className="p-3">Email</th>
                                        <th className="p-3">Verification</th>
                                        <th className="p-3 text">Status</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        users?.map((person, i) =>
                                            <tr key={person._id} className="border-b border-opacity-20 border-gray-700 bg-gray-900">
                                                <td className="p-3">
                                                    <p>{i + 1}</p>
                                                </td>
                                                <td className="p-3">
                                                    <p>{person?.name}</p>
                                                </td>
                                                <td className="p-3">
                                                    <p>{person?.email}</p>
                                                </td>
                                                <td className="p-3">

                                                    {person?.checked !== 'verified' ? <button onClick={() => handleVerified(person)}><MdVerified className="w-6 h-6 text-white" /></button> : <button><MdVerified className="w-6 h-6 text-blue-600" /></button>}
                                                </td>
                                                <td className="p-3 flex">
                                                    <button
                                                        onClick={() => handleDeleteUser(person._id)}
                                                        type="button" className="flex items-center justify-center px-2 py-1 pl-0 space-x-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                                                            <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                                                            <rect width="32" height="200" x="168" y="216"></rect>
                                                            <rect width="32" height="200" x="240" y="216"></rect>
                                                            <rect width="32" height="200" x="312" y="216"></rect>
                                                            <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                                                        </svg>
                                                        <span>Remove</span>
                                                    </button>
                                                </td>
                                            </tr>)
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </Tab.Panel>




            </Tab.Panels>
        </Tab.Group>

    );
};

export default AllUsers;