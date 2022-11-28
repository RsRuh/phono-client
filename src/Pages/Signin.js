import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useToken from '../hooks/useToken';

const Signin = () => {

    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('')
    const [token] = useToken(userEmail)

    if (token) {
        navigate(from, { replace: true })
    }


    const { signin } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = data => {

        signin(data.email, data.password)
            .then((userData) => {
                const user = userData.user;
                setUserEmail(user.email)
            })
            .catch((error) => {
                console.error(error);
            });

    };


    return (
        <div>
            <section className="bg-white">
                <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                    <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
                        <img className="object-cover w-24 h-24 mx-auto rounded-full" src="https://img.freepik.com/free-vector/farmer-using-agricultural-technology_53876-120543.jpg?w=826&t=st=1668980182~exp=1668980782~hmac=ee440c6f45350363eca94cbedb079121ea2c60c5b6f82d6478bd3cce82bcd058" alt="user avatar" />

                        <div className="flex items-center justify-center mt-6">

                            <Link to="/sign-in" className="w-1/3 pb-4 md:text-xl text-sm text-center text-gray-800 border-b-2 border-blue-500">
                                Sign In
                            </Link>

                            <Link to="/sign-up" className="w-1/3 pb-4 md:text-xl text-sm text-center text-gray-500 border-b">
                                sign up
                            </Link>
                        </div>

                        <div className="relative flex items-center mt-6">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 md:w-6 h-5 md:h-6 md:mx-3 mx-1 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </span>
                            <input {...register("email", { required: "Email Address is required" })}
                                aria-invalid={errors.email ? "true" : "false"} type="email" className="block w-full md:py-3 py-1 text-gray-700 bg-white border rounded-md md:px-11 px-7 text-sm md:text-xl  focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" />
                        </div>
                        {errors.email && <p className='text-red-600' role="alert">{errors.email?.message}</p>}
                        <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 md:w-6 h-5 md:h-6 md:mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </span>

                            <input {...register("password", { required: "Password is required" })}
                                aria-invalid={errors.password ? "true" : "false"} type="password" className="block w-full px-7 md:px-10 md:py-3 py-1 text-gray-700 bg-white border rounded-md text-sm md:text-xl  focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" />
                        </div>
                        {errors.password && <p className='text-red-600' role="alert">{errors.password?.message}</p>}



                        <div className="mt-6">
                            <button className="w-full md:px-6 md:py-3 py-1 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-opacity-50">
                                Login
                            </button>

                            <div className="mt-6 text-center ">
                                <p className="text-sm md:text-xl">
                                    Don't have account? <Link className='hover:underline text-blue-500' to='/sign-up'>Sign up</Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Signin;