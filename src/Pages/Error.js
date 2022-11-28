import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const Error = () => {

    const error = useRouteError()

    return (
 
         <section className="flex items-center h-screen p-16">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
            
            <div className="max-w-md text-center">
            <img className='h-96' src="https://img.freepik.com/free-vector/404-error-with-person-looking-concept-illustration_114360-7912.jpg?w=1380&t=st=1669629692~exp=1669630292~hmac=1271a1692338c9912a02b21cfb41c97ae6b41bd6e3882c2133c26670a4c96a3f" alt="" />
                <p className="mt-4 md:text-3xl mb-8 text-red-600">{error.statusText || error.message}</p>
                <Link to='/'  className="md:px-8 md:py-3 px-1 py-2 font-semibold rounded bg-violet-400 text-gray-900">Back to homepage</Link>
                
            </div>
        </div>
    </section>
     
    );
};

export default Error;