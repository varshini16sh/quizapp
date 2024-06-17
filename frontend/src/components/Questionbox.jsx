import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Questionbox() {
    const { genre, setGenre } = useContext(AuthContext);
    const [quest, setQues] = useState([]);
    const [currentQues, setCurrentQues] = useState(0);
    const [score, setScore] = useState(0);
    const [submit, isSubmit] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [timer, setTimer] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const getQues = async () => {
            const data = await axios.post('http://localhost:3000/getquestions', {
                genre: genre
            });
            setQues(data.data);
        }
        getQues();
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(timer => timer + 1);
        }, 1000)
        return () => { clearInterval(interval) }
    })

    const prevQues = () => {
        if (currentQues - 1 < 0) {
        }
        else {
            setCurrentQues(currentQues => currentQues - 1);
        }
    }

    const nextQues = () => {
        if (quest.length - 1 <= currentQues) {
            isSubmit(true);
        }
        else {
            setCurrentQues(prevQues => prevQues + 1);
        }
    }

    const handleAnswer = (answer) => {
        setSelectedOptions(prevOptions => {
            const newOptions = [...prevOptions];
            newOptions[currentQues] = answer;
            return newOptions;
        });
        if (answer === quest[currentQues].correct_answer) {
            setScore(prevScore => prevScore + 1);
        }
    }

    return (
        <>       
            <div className='flex justify-center text-7xl text-turqouise mt-[10vh]'>Quizateria</div>
        
        <div className='flex items-center justify-center text-4xl mt-4 text-white'>{genre}</div>
            <div className='flex items-center justify-center h-[70vh] text-white'>
                {!submit && <div className='backdrop-blur-sm bg-white/20 container flex flex-col h-[40vh] w-[40vw] rounded-lg'>
                    {quest[currentQues] &&
                        <>
                            <div className='text-2xl p-2 mb-4 font-medium'>{quest[currentQues].question}</div>
                            {Object.entries(quest[currentQues].options).map(([key, option], index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(key)}
                                    className={`p-2 m-2 rounded-lg  ${selectedOptions[currentQues] === key ? 'bg-turqouise text-white' : 'bg-white text-black'}`}
                                >
                                    {option}
                                </button>
                            ))}
                        </>
                    }
                    <div className='flex mt-auto mb-4 mx-2 justify-between'>
                        <button className='border-2 rounded-lg px-4' onClick={prevQues}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                        <button className='border-2 rounded-lg p-1' onClick={() => { isSubmit(true) }}> Submit</button>
                        <button className='border-2 rounded-lg px-4' onClick={nextQues}>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </div>
                </div>
                }
                {submit && <>
                <div className='flex flex-col'>
                <div className='text-2xl text-white mb-4'>Your score is: {score}</div>
                <button onClick={()=>{navigate('/')}} className='border-2 rounded-lg p-1'>Go Back</button>
                </div>
                </>
                } 
            </div>
        </>
    );
}

export default Questionbox;