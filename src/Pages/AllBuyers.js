import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';

const AllBuyers = () => {

    const { user } = useContext(AuthContext);
    const url = `http://localhost:5000/get-buyers?email=${user?.email}`;

    const { data: buyers = [], refetch } = useQuery({
        queryKey: ['buyers', user?.email],
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

    // console.log(buyers);


    return (
        <section className="antialiased bg-gray-100 text-gray-600 px-4">
            <div className="flex flex-col justify-center">
                <div className="w-full mx-auto bg-white shadow-lg  rounded-sm border border-gray-200">
                    <header className="px-5 py-4 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-800">Customers</h2>
                    </header>
                    <div className="p-3">
                        <div className="overflow-x-auto h-screen">
                            <table className="table-auto  w-full">
                                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                    <tr>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">No.</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Name</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Email</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Product Name</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-center">Location</div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y  divide-gray-100">
                                    {
                                        buyers?.map((buyer, i) =>
                                            <tr key={i}>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-left">{i + 1}</div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                                            <img className="rounded-full" src={buyer?.buyerImg} width="40" height="40" alt="" />
                                                            </div>
                                                        <div className="font-medium text-gray-800">{buyer?.buyerName}</div>
                                                    </div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-left">{buyer?.buyerEmail}</div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-left font-medium text-green-500">{buyer?.productName}</div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-sm text-center">{buyer?.buyerAddress}</div>
                                                </td>
                                            </tr>)
                                    }


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AllBuyers;