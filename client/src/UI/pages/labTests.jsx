
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const LabTests = () => {
    const [labs, setLabs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLabs = async () => {
            try {
                const response = await fetch('http://localhost:4040/labs');
                const data = await response.json();
                setLabs(data);
            } catch (error) {
                console.error('Error fetching labs:', error);
            }
        };

        fetchLabs();
    }, []);

    const handleTests = (labId) => {
        navigate(`/laboratoryTests/${labId}`);
    };

    return (
        <>
            <Header />
            <style>
                {`
                    .card {
                        width: 290px;
                        height: 354px;
                        border-radius: 20px;
                        background: #f5f5f5;
                        position: relative;
                        padding: 1.8rem;
                        border: 2px solid #c3c6ce;
                        transition: 0.5s ease-out;
                        overflow: visible;
                        margin-left: 120px;
                        margin-top: 25px;
                    }

                    .card-details {
                        color: black;
                        height: 100%;
                        gap: .5em;
                        display: grid;
                        place-content: center;
                    }

                    .card-button {
                        transform: translate(-50%, 125%);
                        width: 60%;
                        border-radius: 1rem;
                        border: none;
                        background-color: rgba(244, 67, 54);
                        color: #fff;
                        font-size: 1rem;
                        padding: .5rem 1rem;
                        position: absolute;
                        left: 50%;
                        bottom: 0;
                        opacity: 0;
                        transition: 0.3s ease-out;
                    }

                    .text-body {
                        color: rgb(134, 134, 134);
                    }

                    .text-title {
                        font-size: 1.5em;
                        font-weight: bold;
                    }

                    .card:hover {
                        border-color: rgba(244, 67, 54);
                        box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
                    }

                    .card:hover .card-button {
                        transform: translate(-50%, 50%);
                        opacity: 1;
                    }
                `}
            </style>
            <div>
                {labs.map((lab) => (
                    <div className="card" key={lab._id}>
                        <div className="card-details">
                            <svg
                                version="1.0"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlSpace="preserve"
                                viewBox="0 0 100 100"
                                width="3.5em"
                                height="4.5em"
                                fill="currentColor"
                                className="mr-1 text-[rgba(244,67,54)]"
                            >
                                <path d="M90 42.301 76.666 19.209l-13.334 7.699V10H36.667v16.908l-13.335-7.699L10 42.301 23.332 50 10 57.698l13.331 23.093 13.335-7.698V90h26.666V73.093l13.334 7.698L90 57.698 76.666 50 90 42.301zm-9.107 17.84-6.666 11.543-17.561-10.138v21.787H43.332V61.546L25.774 71.684l-6.666-11.543L36.667 50 19.108 39.863l6.666-11.549 17.558 10.14V16.667h13.334v21.787l17.561-10.14 6.666 11.549L63.332 50l17.561 10.141z" />
                            </svg>
                            <p className="text-title">{lab.laboratoryName}</p>
                            <p className="text-title">{lab.laboratoryAddress}</p>
                            <p className="text-title">{lab.contactPersonName}</p>
                        </div>
                        <button className="card-button" onClick={() => handleTests(lab._id)}>Tests</button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default LabTests;


