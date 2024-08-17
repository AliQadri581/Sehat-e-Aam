import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const TestBookingForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [test, setTest] = useState({
        testName: '',
        testType: '',
        testPrice: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);   

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const response = await axios.get(`http://localhost:4040/booktests/${id}`, {
                    withCredentials: true
                });
                setTest(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching test:', error);
                setError('Failed to fetch test details');
                setLoading(false);
            }
        };

        fetchTest();
    }, [id]);


    return (
        <div>
                   <form  className="w-full max-w-lg mx-auto mt-5">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="testName">
                            Test Name
                        </label>
                        <input
                            type="text"
                            id="testName"
                            name="testName"
                            value={test.testName}
                          
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="testType">
                            Test Type
                        </label>
                        <input
                            type="text"
                            id="testType"
                            name="testType"
                            value={test.testType}
                            
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="testPrice">
                            Test Price
                        </label>
                        <input
                            type="number"
                            id="testPrice"
                            name="testPrice"
                            value={test.testPrice}
                            
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-[rgba(244,67,54)] inline-block px-6 py-2 rounded text-white font-bold"
                        >
                            Book Test
                        </button>
                    </div>
                </form>
        </div>
    );
}

export default TestBookingForm;








