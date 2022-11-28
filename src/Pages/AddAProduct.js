import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthProvider';
import useSellerTik from '../hooks/useSellerTik';

const AddAProduct = () => {

    const { user } = useContext(AuthContext);

    const [getTik] = useSellerTik(user?.email)
    
    let today = new Date();
    let hours = today.getHours()
    let date = today.getDate()
    let month = today.getMonth()
    let year = today.getFullYear()
    if (hours > 12) {
        hours = hours - 12;
    }
    let minute = today.getMinutes()
    // console.log(hours, minute, second);

    const { register, handleSubmit, formState: { errors } } = useForm();

    let randomNumber = Math.floor(Math.random() * 10000000);

    const handleUpload = data => {


        const formData = new FormData()
        formData.append('image', data.photo[0])

        const url = 'https://api.imgbb.com/1/upload?key=dcb7db349a5abe5b1697c51380dd9544';
        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(imageData => {

                const mobileInfo = {
                    sellerName: user?.displayName,
                    productNumber: randomNumber,
                    productName: data.name,
                    sellerEmail: user?.email,
                    userPhoto: user?.photoURL,
                    sellerNumber: data.number,
                    uploadTime: `${hours}:${minute}`,
                    uploadDate: `${date}/${month}/${year}`,
                    condition: data.condition,
                    location: data.location,
                    message: data.message,
                    mobileImg: imageData.data.display_url,
                    category: data.category,
                    purchasePrice: data.purchasePrice,
                    purchaseYear: data.purchaseYear,
                    sellingPrice: data.sellingPrice,
                    status: "available",
                    tik: getTik
                }

                // console.log(imageData);

                fetch('http://localhost:5000/mobiles', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(mobileInfo)
                })
                    .then(res => res.json())
                    .then(mobiles => {
                        console.log(mobiles);
                        toast.success('added successfully')
                    })
                    .catch((error) => {
                        console.error(error);
                    });



            })

    }



    return (
        <>
            <div className="md:p-6 p-1 md:py-12 bg-violet-400 text-gray-900">
                <div className="container mx-auto">
                    <div className="items-center">
                        <h2 className="text-center text-sm md:text-5xl font-bold">
                            Sell your mobile phone in best price at <span className='text-violet-900'>Phono</span>
                        </h2>
                    </div>
                </div>
            </div>
            <section className="bg-gray-100 mt-3 md:mt-10">
                <div className="rounded-lg bg-white md:p-8 p-2 shadow-lg lg:col-span-3 lg:p-12">
                    <form onSubmit={handleSubmit(handleUpload)} className="space-y-4">

                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <label className="sr-only" htmlFor="name">Name</label>
                                <input
                                    {...register("name", { required: "Name is required" })}
                                    className="w-full rounded-lg border p-3 text-sm"
                                    placeholder="Device model name"
                                    type="text"
                                    id="name"
                                />
                            </div>
                            <div>
                                <label className="sr-only" htmlFor="number">Phone</label>
                                <input
                                    {...register("number", { required: "Mobile Number is required" })}
                                    className="w-full rounded-lg border p-3 text-sm"
                                    placeholder="Phone Number"
                                    type="tel"
                                    id="number"
                                />
                            </div>

                            <select {...register("condition", { required: "Condition is required" })} className="select select-bordered w-full md:text-xl relative flex items-center">
                                <option defaultValue>Excellent</option>
                                <option>Good</option>
                                <option>Fair</option>
                            </select>


                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <label className="sr-only" htmlFor="email">Email</label>
                                <input
                                    {...register("email")}
                                    className="w-full rounded-lg border p-3 text-sm"
                                    placeholder={user?.email}
                                    defaultValue={user?.email}
                                    disabled
                                    type="email"
                                    id="email"
                                />
                            </div>

                            <div>
                                <label className="sr-only" htmlFor="location">Location</label>
                                <input
                                    {...register("location", { required: "Location is required" })}
                                    className="w-full rounded-lg border p-3 text-sm"
                                    placeholder="Your Location"
                                    type="text"
                                    id="location"
                                />
                            </div>
                            <select {...register("category", { required: "Category is required" })} className="select select-bordered w-full text-xl relative flex items-center">
                                <option defaultValue>OnePlus</option>
                                <option>Apple</option>
                                <option>Samsung</option>
                                <option>Sony</option>
                            </select>
                        </div>

                        <div className="grid md:grid-cols-5 gap-4">
                            <div>
                                <label className="sr-only" htmlFor="phone">Purchase Price</label>
                                <input
                                    {...register("purchasePrice", { required: "Purchase Price is required" })}
                                    className="w-full rounded-lg border p-3 text-sm"
                                    placeholder="Purchase Price"
                                    type="number"
                                    id="purchasePrice"
                                />
                            </div>

                            <div className='flex items-center'>

                                <h1>Years of use</h1>
                                <select {...register("purchaseYear", { required: "Time is required" })} className="select select-bordered text-xl relative flex items-center">
                                    <option defaultValue>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>1-</option>
                                </select>
                            </div>

                            <div>
                                <label className="sr-only" htmlFor="purchase">Selling Price</label>
                                <input
                                    {...register("sellingPrice", { required: "Selling Price is required" })}
                                    className="w-full rounded-lg border p-3 text-sm"
                                    placeholder="Selling Price"
                                    type="number"
                                    id="sellingPrice"
                                />
                            </div>
                            <div className='md:col-span-2'>
                                <label htmlFor="dropzone-file" className="flex items-center px-3 md:py-2 py-1 mx-auto text-center bg-white border-2 border-dashed rounded-md cursor-pointer ">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 md:w-6 h-5 md:h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>

                                    <h2 className="mx-3 text-sm md:text-xl text-gray-400">User Photo</h2>

                                    <input {...register("photo", { required: "Photo is required" })}
                                        aria-invalid={errors.photo ? "true" : "false"} id="dropzone-file" type="file" className="hidden " />
                                </label>

                            </div>
                        </div>

                        <div>
                            <label className="sr-only" htmlFor="message">Description</label>
                            <textarea
                                {...register("message", { required: "Description is required" })}
                                className="w-full rounded-lg border p-3 text-sm"
                                placeholder="Description"
                                rows="8"
                                id="message"
                            ></textarea>
                        </div>

                        <div className="mt-4">
                            <input className="w-full px-6 md:py-3 py-1 text-sm font-medium cursor-pointer tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50" type="submit" name="" id="" />
                        </div>
                    </form>
                </div>
            </section>
        </>

    );
};

export default AddAProduct;