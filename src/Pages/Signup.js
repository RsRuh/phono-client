import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useToken from '../hooks/useToken';

const SignupBuyers = () => {

    const { createUser, updateUserProfile } = useContext(AuthContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [userEmail, setUserEmail] = useState()
    const location = useLocation();
    const navigate = useNavigate();

    const [token] = useToken(userEmail)

    if (token) {
        navigate('/');
    }

    const from = location.state?.from?.pathname || '/';
    const handleFormSubmit = data => {
        const formData = new FormData()
        formData.append('image', data.photo[0])
        const url = 'https://api.imgbb.com/1/upload?key=dcb7db349a5abe5b1697c51380dd9544';
        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(imageData => {
                // console.log(imageData.data.display_url);
                const userInfo = {
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    userImg: imageData.data.display_url,
                }
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(userInfo)
                })
                    .then(res => res.json())
                    .then(user => {
                        setUserEmail(data.email)
                        createUser(data.email, data.password)
                            .then((result) => {
                                const user = result.user;
                                updateUserProfile(data.name, imageData.data.display_url)
                                    .then(() => { console.log(user) }).catch((error) => { });
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    })
            })
    };



    return (
        <div>
            <section className="bg-white ">
                <div className="container flex items-center justify-center px-6 min-h-screen mx-auto">
                    <form className="w-full max-w-md" onSubmit={handleSubmit(handleFormSubmit)}>
                        <img className="object-cover w-24 h-24 mx-auto rounded-full" src="https://img.freepik.com/free-vector/man-shopping-supermarket_74855-7612.jpg?w=900&t=st=1669231743~exp=1669232343~hmac=a179e185751992330d3b3ea84e502092fafdf14557bcb49531a843b524d1c778" alt="user avatar" />

                        <div className="flex items-center justify-center mt-6">
                            <Link to="/sign-in" className="w-1/3 md:text-xl text-sm pb-4 font-medium text-center text-gray-500 capitalize border-b">
                                Sign In
                            </Link>


                            <Link to="/sign-up" className="w-1/3 md:text-xl text-sm pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500">
                                Sign Up
                            </Link>
                        </div>

                        <div className="relative flex items-center mt-8">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 md:w-6 h-5 md:h-6 md:mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>

                            <input {...register("name", { required: "Name is required" })}
                                aria-invalid={errors.name ? "true" : "false"} type="text" className="block w-full text-gray-700 bg-white md:py-3 py-1 md:px-11 px-7 text-sm md:text-xl  border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Your Name" />
                        </div>
                        {errors.name && <p className='text-red-600' role="alert">{errors.name?.message}</p>}

                        <label htmlFor="dropzone-file" className="flex items-center px-3 md:py-3 py-1 mx-auto md:mt-6 mt-2 text-center bg-white border-2 border-dashed rounded-md cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 md:w-6 h-5 md:h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>

                            <h2 className="mx-3 text-sm md:text-xl text-gray-400">User Photo</h2>

                            <input {...register("photo", { required: "Photo is required" })}
                                aria-invalid={errors.photo ? "true" : "false"} id="dropzone-file" type="file" className="hidden " />
                        </label>
                        {errors.photo && <p className='text-red-600' role="alert">{errors.photo?.message}</p>}

                        <div className="relative flex items-center md:mt-4 mt-2">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 md:w-6 h-5 md:h-6 md:mx-3 mx-1 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </span>
                            <input {...register("email", { required: "Email Address is required" })}
                                aria-invalid={errors.email ? "true" : "false"} type="email" className="block w-full  md:py-3 py-1 md:px-11 px-7 text-sm md:text-xl text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" />
                        </div>
                        {errors.email && <p className='text-red-600' role="alert">{errors.email?.message}</p>}
                        <div className="relative flex items-center md:mt-4 mt-2">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 md:w-6 h-5 md:h-6 md:mx-3 mx-1 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </span>

                            <input {...register("password", { required: "Password is required" })}
                                aria-invalid={errors.password ? "true" : "false"} type="password" className="block w-full  md:py-3 py-1 md:px-11 px-7 text-sm md:text-xl text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" />
                        </div>
                        {errors.password && <p className='text-red-600' role="alert">{errors.password?.message}</p>}

                        <select {...register("role", { required: "Role is required" })} className="select select-bordered w-full text-xl relative flex items-center md:mt-4 mt-2">
                            <option defaultValue>Buyer</option>
                            <option>Seller</option>
                        </select>

                        <div className="md:mt-6 mt-2">

                            {errors.exampleRequired && <span>This field is required</span>}


                            <input className="w-full px-6 md:py-3 py-1 text-sm cursor-pointer font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50" type="submit" name="" id="" />

                            <button aria-label="Login with Google" type="button" className="flex items-center mt-5 justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-400">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                                    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                                </svg>
                                <p>Login with Google</p>
                            </button>

                            <div className="mt-6 text-center">
                                <p className='text-sm md:text-2xl'>
                                    Already have an account? <Link to='/sign-in' className="text-sm py-5 md:text-2xl text-blue-500 hover:underline">Sign In</Link>
                                </p>
                            </div>


                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default SignupBuyers;