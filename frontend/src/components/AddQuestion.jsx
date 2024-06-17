import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

function AddQuestion() {
    const [genre, setGenre] = useState("");
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState({ a: "", b: "", c: "", d: "" });
    const [correctAnswer, setCorrectAnswer] = useState("");
    const {authenticated} = useContext(AuthContext);

    useEffect(()=>{
        if(!authenticated){
            navigate('/');
        }
    },[])

    const handleOptionChange = (optionKey) => (event) => {
        setOptions({ ...options, [optionKey]: event.target.value });
    };
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:3000/addquestions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                genre,
                question,
                options,
                correct_answer: correctAnswer
            })
        });

        const data = await response.json();
        console.log(data);
    };

    return (
        <>
            <div className='flex justify-center text-7xl text-turqouise mt-[10vh]'>Quizateria</div>
            <div className="fixed bg-white/20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[50vh] w-[40vw] rounded-lg border-2 flex flex-col justify-center items-center">
                <div className="flex-col">
                    <form onSubmit={handleSubmit}>
                        <select value={genre} onChange={(e) => setGenre(e.target.value)} className="my-2 p-1 rounded-md">
                            <option value="">Select a Genre</option>
                            <option value="Science">Science</option>
                            <option value="History">History</option>
                            <option value="Literature">Literature</option>
                            <option value="Sports">Sports</option>
                        </select><br/>

                        <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Enter Question"  className="my-2 p-1 rounded-md"/>
                        <br/>
                        <input value={options.a} onChange={handleOptionChange("a")} placeholder="Enter Option A"  className="my-2 p-1 rounded-md" />
                        <br/>
                        <input value={options.b} onChange={handleOptionChange("b")} placeholder="Enter Option B"  className="my-2 p-1 rounded-md"/>
                        <br/>
                        <input value={options.c} onChange={handleOptionChange("c")} placeholder="Enter Option C"  className="my-2 p-1 rounded-md"/>
                        <br/>
                        <input value={options.d} onChange={handleOptionChange("d")} placeholder="Enter Option D" className="my-2 p-1 rounded-md" />
                        <br/>
                        <select value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} className="mt- p-1 rounded-md my-2">
                            <option value="">Select the Correct Option</option>
                            <option value="a">a</option>
                            <option value="b">b</option>
                            <option value="c">c</option>
                            <option value="d">d</option>
                        </select><br/>
                        <button type="submit" className="my-2 mx-2 p-1 text-white rounded-lg border-2">Submit</button>
                        <button className="p-1 text-white rounded-lg border-2" onClick={()=>{navigate('/')}}>Back</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddQuestion;