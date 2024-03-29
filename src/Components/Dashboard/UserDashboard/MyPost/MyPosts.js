import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import Pagination from '../../../Home/Travelers/Pagination';



const MyPosts = () => {
    const { user } = useAuth();
    const [travels, setTravels] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(9);
    useEffect(() => {
        fetch(`https://explore-tarvel-server.onrender.com/myPost/${user?.email}`)
            .then(res => res.json())
            .then(data => setTravels(data))
    }, [user?.email]);


    const handleMyPostDelete = (id) => {
        window.confirm("Are you sure you wish to delete this item?") &&
            axios.delete(`https://explore-tarvel-server.onrender.com/travelDelete/${id}`)
                .then(res => {
                    res.data.deletedCount &&
                        alert('Delete Success')
                    fetch(`https://explore-tarvel-server.onrender.com/myPost/${user?.email}`)
                        .then(res => res.json())
                        .then(data => setTravels(data))

                }

                )
    }

    const managePost = travels?.filter(travel => travel?.role === false);
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = managePost.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <div >

            {currentPosts?.length === 0 ?
                <h1 className='  text-gray-600 text-center'>No posts found for you, please post first</h1>
                :
                <h1 className=' text-gray-600 text-center'>My Post {currentPosts?.length} </h1>
            }


            <section className="text-gray-600">

                <div className="max-w-6xl mx-auto">
                    <div className=" flex justify-center flex-wrap">
                        {
                            currentPosts?.reverse()?.map(travel =>

                                <div key={travel?._id} className="max-w-sm w-full sm:w-1/2 lg:w-1/3 px-2 py-6 cursor-pointer">
                                    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                                        <div className=" overflow-hidden " >
                                            <div style={{ height: '200px' }} className="flex justify-end w-full">
                                                <img className=' w-full' src={travel?.img} alt="" />
                                            </div>
                                        </div>
                                        <div className="p-4 flex justify-between">
                                            <p className="uppercase tracking-wide text-sm font-bold text-gray-700">{travel?.title}</p>
                                            <p className="text-3xl text-red-500">${travel?.price}</p>

                                        </div>
                                        <div className=' text-center'>
                                            <button className=' text-amber-400 text-3xl btn'>Pending</button>
                                        </div>
                                        <div className="flex p-4 border-t border-gray-300 text-gray-700 justify-between">
                                            <Link to={`travelsDetails/${travel?._id}`}><Button>Details</Button></Link>
                                            <Button onClick={() => handleMyPostDelete(travel?._id)}>Delete</Button>
                                            <Rating

                                                value={travel?.rating}
                                                precision={0.5}
                                                readOnly
                                            />
                                        </div>

                                    </div>
                                </div>

                            )
                        }
                    </div>
                    <div className=' flex justify-center mb-3'>
                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={managePost?.length}
                            paginate={paginate}
                        ></Pagination>
                    </div>
                </div>

            </section>


        </div>
    );
};

export default MyPosts;