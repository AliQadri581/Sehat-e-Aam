import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const LabTests = () => {
    const [tests, setTests] = useState([]);

    useEffect(() => {
       
        const fetchTests = async () => {
            try {
                const response = await axios.get('http://localhost:4040/labtests'); 
                setTests(response.data);
            } catch (error) {
                console.error('Error fetching tests:', error);
            }
        };

        fetchTests();
    }, []);

    return (
        <div>
            <Header/>
            <h1 className='text-5xl font-bold text-black text-center mt-7'>Laboratory Tests</h1>

            <style>{`
                .flip-card {
                    background-color: transparent;
                    width: 290px;
                    height: 250px;
                    perspective: 1000px;
                    font-family: sans-serif;
                    display: inline-block;
                    margin: 10px;
                }

                .title {
                    font-size: 1.5em;
                    font-weight: 900;
                    text-align: center;
                    margin: 0;
                }

                .flip-card-inner {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    transition: transform 0.8s;
                    transform-style: preserve-3d;
                }

                .flip-card:hover .flip-card-inner {
                    transform: rotateY(180deg);
                }

                .flip-card-front, .flip-card-back {
                    box-shadow: 0 8px 14px 0 rgba(0,0,0,0.2);
                    position: absolute;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                    -webkit-backface-visibility: hidden;
                    backface-visibility: hidden;
                    border: 1px solid coral;
                    border-radius: 1rem;
                }

                .flip-card-front {
                    background: linear-gradient(120deg, bisque 60%, rgb(255, 231, 222) 88%, rgb(255, 211, 195) 40%, rgba(255, 127, 80, 0.603) 48%);
                    color: coral;
                }

                .flip-card-back {
                    background: linear-gradient(120deg, rgb(255, 174, 145) 30%, coral 88%, bisque 40%, rgb(255, 185, 160) 78%);
                    color: white;
                    transform: rotateY(180deg);
                }
            `}</style>

            <div className="flex flex-wrap justify-center">
                {tests.map(test => (
                    <div key={test._id} className="flip-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <p className="title">{test.testName}</p>
                                
                            </div>
                            <div className="flip-card-back">
                                <p className="title">{test.testType}</p>
                                <p>{test.testPrice}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LabTests;
