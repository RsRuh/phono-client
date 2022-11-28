import React from 'react';
import banner from '../assets/banner.jpg'

const Dashboard = () => {
    return (
        <div>
            <div className="flex flex-col mx-auto overflow-hidden rounded">
                <img src={banner} alt="" className="w-full h-60 sm:h-96 bg-gray-500" />
                <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 sm:px-10 sm:mx-12 lg:rounded-md bg-gray-100">
                    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                        <div className="grid grid-cols-1 row-gap-8 md:grid-cols-3">
                            <div className="text-center md:border-r">
                                <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">144K</h6>
                                <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                                    Mobiles
                                </p>
                            </div>
                            <div className="text-center md:border-r">
                                <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">12.9K</h6>
                                <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                                    Sellers
                                </p>
                            </div>
                            <div className="text-center">
                                <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">48.3K</h6>
                                <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                                    Users
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;