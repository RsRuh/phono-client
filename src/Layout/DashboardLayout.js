import React, { useContext, useEffect, useState } from 'react';
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineLogout, AiOutlineFolderAdd, AiOutlineHome } from "react-icons/ai";
import { FiUserPlus, FiUsers } from "react-icons/fi";
import { VscSignIn } from "react-icons/vsc";
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import Footer from '../Shared/Footer';
import useUserRole from '../hooks/useUserRole';
import Error from '../Pages/Error';

const Main = () => {

    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({ behavior: 'smooth', top: 0 });
    }, [pathname]);

    const { user, logout } = useContext(AuthContext);

    const [getRole, isUserLoading] = useUserRole(user?.email);

    const [open, setOpen] = useState(false);

    if (getRole === 'Buyer') {
        return <Error></Error>
    }

    return (
        <section className="flex md:gap-6 gap-0">
            <div
                className={`bg-[#0e0e0e] min-h-screen ${open ? "w-72" : "w-8 md:w-16"
                    } duration-500 text-gray-100 px-0`}>
                <div className="py-3 flex justify-end">
                    <HiMenuAlt3
                        size={26}
                        className="cursor-pointer"
                        onClick={() => setOpen(!open)}
                    />
                </div>

                <div className="mt-4 flex flex-col gap-4 relative">
                    {
                        user?.email && <div
                            onClick={() => setOpen(!open)}
                            className='group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md'
                        >

                            <div className="avatar">
                                <div className="w-4 rounded-full">
                                    <img src={user?.photoURL} alt='' />
                                </div>
                            </div>
                            <h2
                                style={{
                                    transitionDelay: `00ms`,
                                }}
                                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                    }`}
                            >
                                {user?.displayName}
                            </h2>

                        </div>

                    }
                    <Link
                        to='/'
                        onClick={() => setOpen(!open)}
                        className={'group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md'}
                    >

                        <div><AiOutlineHome className='text-xl' /></div>
                        <h2
                            style={{
                                transitionDelay: '700ms',
                            }}
                            className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                }`}
                        >
                            Home
                        </h2>

                    </Link>
                    <Link
                        to='/dashboard'
                        onClick={() => setOpen(!open)}
                        className={'group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md'}
                    >

                        <div><MdOutlineDashboard className='text-xl' /></div>
                        <h2
                            style={{
                                transitionDelay: '700ms',
                            }}
                            className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                }`}
                        >
                            Dashboard
                        </h2>

                    </Link>
                    {
                        getRole === 'admin' &&
                        <>
                            <Link
                            to='/dashboard/users'
                            onClick={() => setOpen(!open)}
                            className={'group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md'}
                        >

                            <div><FiUsers className='text-xl' /></div>
                            <h2
                                style={{
                                    transitionDelay: '700ms',
                                }}
                                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                    }`}
                            >
                                All Users
                            </h2>

                        </Link>

                        </>
                    }

                    {
                        getRole === 'Seller' &&
                        <>
                        <Link
                                to='/dashboard/add-a-product'
                                onClick={() => setOpen(!open)}
                                className={'group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md'}
                            >

                                <div><AiOutlineFolderAdd className='text-xl' /></div>
                                <h2
                                    style={{
                                        transitionDelay: '700ms',
                                    }}
                                    className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                        }`}
                                >
                                    Add a Product
                                </h2>
                            </Link>
                        <Link
                                to='/dashboard/my-product'
                                onClick={() => setOpen(!open)}
                                className={'group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md'}
                            >

                                <div><TbReportAnalytics className='text-xl' /></div>
                                <h2
                                    style={{
                                        transitionDelay: '700ms',
                                    }}
                                    className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                        }`}
                                >
                                    My Product
                                </h2>

                            </Link>
                            
                            <Link
                                to='/dashboard/my-buyers'
                                onClick={() => setOpen(!open)}
                                className={'group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md'}
                            >

                                <div><FiUsers className='text-xl' /></div>
                                <h2
                                    style={{
                                        transitionDelay: '700ms',
                                    }}
                                    className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                        }`}>
                                    My Buyers
                                </h2>

                            </Link>
                            
                        </>
                    }
                    {
                        user?.email && <button
                            onClick={logout}
                            className={'group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md'}
                        >

                            <div><AiOutlineLogout className='text-xl' /></div>
                            <h2
                                style={{
                                    transitionDelay: '700ms',
                                }}
                                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                    }`}
                            >
                                Log Out
                            </h2>

                        </button>
                    }

                    {
                        !user?.email &&
                        <>
                            <Link to='/sign-in'
                                onClick={() => setOpen(!open)}
                                className={'group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md'}
                            >

                                <div><VscSignIn className='text-xl' /></div>
                                <h2
                                    style={{
                                        transitionDelay: '800ms',
                                    }}
                                    className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                        }`}
                                >
                                    Sign In
                                </h2>

                            </Link>
                            <Link to='/sign-up'
                                onClick={() => setOpen(!open)}
                                className={'group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md'}
                            >

                                <div><FiUserPlus className='text-xl' /></div>
                                <h2
                                    style={{
                                        transitionDelay: '900ms',
                                    }}
                                    className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                        }`}
                                >
                                    Sign Up
                                </h2>

                            </Link>
                        </>
                    }


                </div>

            </div>
            <div className="m-3 text-xl text-gray-900 font-semibold">
                <div className='min-h-screen'>
                    <Outlet></Outlet>
                </div>
                <Footer></Footer>
            </div>
        </section>
    );
};

export default Main;