import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import LoginModal from './LoginModal';

function GenreSelection() {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const genres = ['Science', 'History', 'Literature', 'Sports'];
    const { genre, setGenre, authenticated, isAuthenticated } = useContext(AuthContext);

    const onClose = () => {
        setIsVisible(false);
    }
    return (
        <>
            {isVisible && (
                <div className="fixed inset-0 backdrop-blur-md bg-black bg-opacity-10 z-10"></div>
            )}
            <div className={isVisible ? 'fixed z-20 inset-0 flex items-center justify-center' : 'hidden'}>
                <LoginModal isVisible={isVisible} onClose={onClose} setAuth={isAuthenticated} />
            </div>
            <div className='flex justify-center text-7xl text-turqouise mt-[10vh]'>Quizateria</div>
            <div className='text-white text-2xl flex items-center justify-center h-[80vh]'>
                <div className='flex items-center justify-center'>
                    <div className="bg-white/20 flex flex-col items-center justify-center h-[40vh] w-[50vw] rounded-lg">
                        <h2>Select Genre</h2><br />
                        <div className="flex-row">
                            {genres.map((genre) => (
                                <button
                                    key={genre}
                                    className="p-2 border-2 rounded-md m-2 w-[160px]"
                                    onClick={() => {
                                        setGenre(genre);
                                        navigate('question');
                                    }}
                                >
                                    {genre}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {authenticated && <button className='fixed left-0 top-0 text-white py-2 px-4 h-[4vh] hover:bg-turqouise hover:text-white' onClick={()=>{navigate('/add')}}>
                <FontAwesomeIcon icon={faPlus} /> </button>}
            {!authenticated ? <button onClick={() => { setIsVisible(true) }} className='fixed right-0 p-2 top-0 text-white h-[4vh] hover:bg-turqouise hover:text-white'>Login</button> : <button onClick={() => { isAuthenticated(false) }} className='fixed right-0 p-2 top-0 text-white h-[4vh] hover:bg-turqouise hover:text-white'>Logout</button> }
        </>
    );
};

export default GenreSelection;