import React from "react";
import {useParams} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Resultpage=()=>{
    const {score}=useParams();
    const navigate=useNavigate();

    const handleNavigate=()=>{
        navigate('/');
    };

    return (
        <div className='caret-transparent flex h-screen flex-col items-center justify-center bg-black'>
        <div className='h-[70vh] w-[70vw] text-center m-auto'>
            <div className='font-bold text-2xl text-yellow-300 mt-5 mb-10'>Quiz Results</div>
            <div className='h-[80%] w-[80%] border-2 rounded-[30px] p-4 m-auto'>
                <div className='text-left'>
                    <div className='text-2xl ml-6 font-medium mt-5 text-center text-yellow-300'>
                        Your Score : {score}
                    </div>
                    <div className="flex mt-5 justify-center">
                        <button className="bg-blue-500 text-white p-2 rounded-lg mt-3 w-[15%]" onClick={handleNavigate}>Retake Test</button>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    )
}
export default Resultpage;