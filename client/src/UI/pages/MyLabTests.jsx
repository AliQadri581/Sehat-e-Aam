
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import Header from '../components/Header';
// // import { Link } from 'react-router-dom';

// // const MyLabTests = () => {
// //     const [tests, setTests] = useState([]);

// //     useEffect(() => {
// //         const fetchTests = async () => {
// //             try {
// //                 const response = await axios.get('http://localhost:4040/mytests', {
// //                     withCredentials: true
// //                 });
// //                 setTests(response.data);
// //             } catch (error) {
// //                 console.error('Error fetching tests:', error);
// //             }
// //         };

// //         fetchTests();
// //     }, []);

// //     const handleDelete = async (testId) => {
// //         try {
// //             await axios.delete(`http://localhost:4040/test/${testId}`, {
// //                 withCredentials: true
// //             });
// //             setTests(tests.filter(test => test._id !== testId));
// //         } catch (error) {
// //             console.error('Error deleting test:', error);
// //         }
// //     };

// //     return (
// //         <div>
// //             <Header />
// //             <h1 className='text-5xl font-bold text-black text-center mt-7'>My Laboratory Tests</h1>
// //             <style>{`
// //                 .card {
// //                     width: 350px;
// //                     height: 200px;
// //                     transition: all .5s;
// //                     box-shadow: 15px 15px 30px rgba(25, 25, 25, 0.11), -15px -15px 30px rgba(60, 60, 60, 0.082);
// //                     text-align: center;
// //                     overflow: hidden;
// //                     margin: 10px;
// //                     display: inline-block;
// //                 }

// //                 .card:hover {
// //                     height: 300px;
// //                     background: linear-gradient(360deg, #edededc5 60%, hsla(0, 0%, 13%, 1) 70%);
// //                 }

// //                 .card .header {
// //                     padding: 20px;
// //                     display: flex;
// //                     flex-direction: column;
// //                     align-items: center;
// //                     justify-content: center;
// //                     background: #212121;
// //                     margin-bottom: 16px;
// //                 }

// //                 .card .header .img-box {
// //                     width: 50px;
// //                 }

// //                 .card .header .title {
// //                     font-size: 1em;
// //                     letter-spacing: .1em;
// //                     font-weight: 900;
// //                     text-transform: uppercase;
// //                     padding: 4px 0 14px 0;
// //                     transition: all .5s;
// //                     color: #edededc5;
// //                 }

// //                 .card:hover .header {
// //                     clip-path: polygon(0 0, 100% 0, 100% 100%, 0 96%);
// //                 }

// //                 .card:hover .card .header .title {
// //                     padding: 0;
// //                 }

// //                 .card .content {
// //                     display: block;
// //                     text-align: left;
// //                     color: #212121;
// //                     margin: 0 18px;
// //                 }

// //                 .card .content p {
// //                     transition: all .5s;
// //                     font-size: 1em;
// //                     margin-bottom: 8px;
// //                 }

// //                 .card .content .btn  {
// //                     color: white;
// //                     background-color: rgba(244, 67, 54);
// //                     border: none;
// //                     padding: 5px 10px;
// //                     margin: 5px;
// //                     cursor: pointer;
// //                     transition: all .3s;
// //                     border-radius: 3px;
// //                 }

// //                 .card .content .btn:hover {
// //                     background-color: darkorange;
// //                 }
// //             `}</style>
// //             <div className="flex flex-wrap justify-center">
// //                 {tests.map(test => (
// //                     <div key={test._id} className="card">
// //                         <div className="header">
// //                             <div className="img-box">
// //                                 <svg
// //                                     version="1.0"
// //                                     xmlns="http://www.w3.org/2000/svg"
// //                                     xml:space="preserve"
// //                                     viewBox="0 0 100 100"
// //                                     width="2.5em"
// //                                     height="2.5em"
// //                                     fill="currentColor"
// //                                     className="mr-1 text-[rgba(244,67,54)]"
// //                                 >
// //                                     <path d="M90 42.301 76.666 19.209l-13.334 7.699V10H36.667v16.908l-13.335-7.699L10 42.301 23.332 50 10 57.698l13.331 23.093 13.335-7.698V90h26.666V73.093l13.334 7.698L90 57.698 76.666 50 90 42.301zm-9.107 17.84-6.666 11.543-17.561-10.138v21.787H43.332V61.546L25.774 71.684l-6.666-11.543L36.667 50 19.108 39.863l6.666-11.549 17.558 10.14V16.667h13.334v21.787l17.561-10.14 6.666 11.549L63.332 50l17.561 10.141z" />
// //                                 </svg>
// //                             </div>
// //                             <span className="title">{test.testName}</span>
// //                         </div>
// //                         <div className="content">
// //                             <p>Type: {test.testType}</p>
// //                             <p>Price: ${test.testPrice}</p>
// //                             <Link  to={'/UpdateTest'} className="btn">Update</Link>
// //                             <button className="btn" onClick={() => handleDelete(test._id)}>Delete</button>
// //                         </div>
// //                     </div>
// //                 ))}
// //             </div>
// //         </div>
// //     );
// // }

// // export default MyLabTests;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Header from '../components/Header';
// import { Link } from 'react-router-dom';
// const navigate = useNavigate();
// const MyLabTests = () => {
//     const [tests, setTests] = useState([]);

//     useEffect(() => {
//         const fetchTests = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4040/mytests', {
//                     withCredentials: true
//                 });
//                 setTests(response.data);
//             } catch (error) {
//                 console.error('Error fetching tests:', error);
//             }
//         };

//         fetchTests();
//     }, []);

//     const handleDelete = async (testId) => {
//         try {
//             await axios.delete(`http://localhost:4040/test/${testId}`, {
//                 withCredentials: true
//             });
//             setTests(tests.filter(test => test._id !== testId));
//         } catch (error) {
//             console.error('Error deleting test:', error);
//         }
//     };

//     const handleUpdate = (testId) => {
//         navigate(`/UpdateTest/${testId}`);
//     }

//     return (
//         <div>
//             <Header />
//             <h1 className='text-5xl font-bold text-black text-center mt-7'>My Laboratory Tests</h1>
//             <style>{`
//                 .card {
//                     width: 350px;
//                     height: 200px;
//                     transition: all .5s;
//                     box-shadow: 15px 15px 30px rgba(25, 25, 25, 0.11), -15px -15px 30px rgba(60, 60, 60, 0.082);
//                     text-align: center;
//                     overflow: hidden;
//                     margin: 10px;
//                     display: inline-block;
//                 }

//                 .card:hover {
//                     height: 300px;
//                     background: linear-gradient(360deg, #edededc5 60%, hsla(0, 0%, 13%, 1) 70%);
//                 }

//                 .card .header {
//                     padding: 20px;
//                     display: flex;
//                     flex-direction: column;
//                     align-items: center;
//                     justify-content: center;
//                     background: #212121;
//                     margin-bottom: 16px;
//                 }

//                 .card .header .img-box {
//                     width: 50px;
//                 }

//                 .card .header .title {
//                     font-size: 1em;
//                     letter-spacing: .1em;
//                     font-weight: 900;
//                     text-transform: uppercase;
//                     padding: 4px 0 14px 0;
//                     transition: all .5s;
//                     color: #edededc5;
//                 }

//                 .card:hover .header {
//                     clip-path: polygon(0 0, 100% 0, 100% 100%, 0 96%);
//                 }

//                 .card:hover .card .header .title {
//                     padding: 0;
//                 }

//                 .card .content {
//                     display: block;
//                     text-align: left;
//                     color: #212121;
//                     margin: 0 18px;
//                 }

//                 .card .content p {
//                     transition: all .5s;
//                     font-size: 1em;
//                     margin-bottom: 8px;
//                 }

//                 .card .content .btn  {
//                     color: white;
//                     background-color: rgba(244, 67, 54);
//                     border: none;
//                     padding: 5px 10px;
//                     margin: 5px;
//                     cursor: pointer;
//                     transition: all .3s;
//                     border-radius: 3px;
//                 }

//                 .card .content .btn:hover {
//                     background-color: darkorange;
//                 }
//             `}</style>
//             <div className="flex flex-wrap justify-center">
//                 {tests.map(test => (
//                     <div key={test._id} className="card">
//                         <div className="header">
//                             <div className="img-box">
//                                 <svg
//                                     version="1.0"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     xml:space="preserve"
//                                     viewBox="0 0 100 100"
//                                     width="2.5em"
//                                     height="2.5em"
//                                     fill="currentColor"
//                                     className="mr-1 text-[rgba(244,67,54)]"
//                                 >
//                                     <path d="M90 42.301 76.666 19.209l-13.334 7.699V10H36.667v16.908l-13.335-7.699L10 42.301 23.332 50 10 57.698l13.331 23.093 13.335-7.698V90h26.666V73.093l13.334 7.698L90 57.698 76.666 50 90 42.301zm-9.107 17.84-6.666 11.543-17.561-10.138v21.787H43.332V61.546L25.774 71.684l-6.666-11.543L36.667 50 19.108 39.863l6.666-11.549 17.558 10.14V16.667h13.334v21.787l17.561-10.14 6.666 11.549L63.332 50l17.561 10.141z" />
//                                 </svg>
//                             </div>
//                             <span className="title">{test.testName}</span>
//                         </div>
//                         <div className="content">
//                             <p>Type: {test.testType}</p>
//                             <p>Price: ${test.testPrice}</p>
//                             <button className="btn" onClick={() => handleUpdate(test._id)}>Update</button>
//                             <button className="btn" onClick={() => handleDelete(test._id)}>Delete</button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default MyLabTests;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom'; // Make sure to import useNavigate

const MyLabTests = () => {
    const [tests, setTests] = useState([]);
    const navigate = useNavigate(); // Use the useNavigate hook

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const response = await axios.get('http://localhost:4040/mytests', {
                    withCredentials: true
                });
                setTests(response.data);
            } catch (error) {
                console.error('Error fetching tests:', error);
            }
        };

        fetchTests();
    }, []);

    const handleDelete = async (testId) => {
        try {
            await axios.delete(`http://localhost:4040/test/${testId}`, {
                withCredentials: true
            });
            setTests(tests.filter(test => test._id !== testId));
        } catch (error) {
            console.error('Error deleting test:', error);
        }
    };

    const handleUpdate = (testId) => {
        navigate(`/UpdateTest/${testId}`); // Navigate to the update page with the test ID
    }

    return (
        <div>
            <Header />
            <h1 className='text-5xl font-bold text-black text-center mt-7'>My Laboratory Tests</h1>
            <style>{`
                .card {
                    width: 350px;
                    height: 200px;
                    transition: all .5s;
                    box-shadow: 15px 15px 30px rgba(25, 25, 25, 0.11), -15px -15px 30px rgba(60, 60, 60, 0.082);
                    text-align: center;
                    overflow: hidden;
                    margin: 10px;
                    display: inline-block;
                }

                .card:hover {
                    height: 300px;
                    background: linear-gradient(360deg, #edededc5 60%, hsla(0, 0%, 13%, 1) 70%);
                }

                .card .header {
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background: #212121;
                    margin-bottom: 16px;
                }

                .card .header .img-box {
                    width: 50px;
                }

                .card .header .title {
                    font-size: 1em;
                    letter-spacing: .1em;
                    font-weight: 900;
                    text-transform: uppercase;
                    padding: 4px 0 14px 0;
                    transition: all .5s;
                    color: #edededc5;
                }

                .card:hover .header {
                    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 96%);
                }

                .card:hover .card .header .title {
                    padding: 0;
                }

                .card .content {
                    display: block;
                    text-align: left;
                    color: #212121;
                    margin: 0 18px;
                }

                .card .content p {
                    transition: all .5s;
                    font-size: 1em;
                    margin-bottom: 8px;
                }

                .card .content .btn  {
                    color: white;
                    background-color: rgba(244, 67, 54);
                    border: none;
                    padding: 5px 10px;
                    margin: 5px;
                    cursor: pointer;
                    transition: all .3s;
                    border-radius: 3px;
                }

                .card .content .btn:hover {
                    background-color: darkorange;
                }
            `}</style>
            <div className="flex flex-wrap justify-center">
                {tests.map(test => (
                    <div key={test._id} className="card">
                        <div className="header">
                            <div className="img-box">
                                <svg
                                    version="1.0"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xml:space="preserve"
                                    viewBox="0 0 100 100"
                                    width="2.5em"
                                    height="2.5em"
                                    fill="currentColor"
                                    className="mr-1 text-[rgba(244,67,54)]"
                                >
                                    <path d="M90 42.301 76.666 19.209l-13.334 7.699V10H36.667v16.908l-13.335-7.699L10 42.301 23.332 50 10 57.698l13.331 23.093 13.335-7.698V90h26.666V73.093l13.334 7.698L90 57.698 76.666 50 90 42.301zm-9.107 17.84-6.666 11.543-17.561-10.138v21.787H43.332V61.546L25.774 71.684l-6.666-11.543L36.667 50 19.108 39.863l6.666-11.549 17.558 10.14V16.667h13.334v21.787l17.561-10.14 6.666 11.549L63.332 50l17.561 10.141z" />
                                </svg>
                            </div>
                            <span className="title">{test.testName}</span>
                        </div>
                        <div className="content">
                            <p>Type: {test.testType}</p>
                            <p>Price: ${test.testPrice}</p>
                            <button className="btn" onClick={() => handleUpdate(test._id)}>Update</button>
                            <button className="btn" onClick={() => handleDelete(test._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyLabTests;

