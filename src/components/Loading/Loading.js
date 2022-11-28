import React from 'react';
import {ClockLoader} from 'react-spinners';

const Loading = () => {
    return (
        <div className="flex mt-[200px] justify-center items-center h-full">
            <div><ClockLoader color="#5B21B6" size={200} speedMultiplier={3}/></div>
        </div>
    );
};

export default Loading;