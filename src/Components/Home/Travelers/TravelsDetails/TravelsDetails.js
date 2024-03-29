import { Box, Container, Divider, Grid, Rating, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../../Shared/Footer/Footer';
import NavigationBar from '../../../Shared/NavigationBar/NavigationBar';

const TravelsDetails = () => {
    const { id } = useParams();
    const [travel, seTravel] = useState({});
    useEffect(() => {
        fetch(`https://explore-tarvel-server.onrender.com/travel/${id}`)
            .then(res => res.json())
            .then(data => seTravel(data))
    }, [id])


    return (
        <div>
            <NavigationBar />
            <div className=' mt-11'>
                <img className=' w-screen' src="https://i.ibb.co/48K3Mr6/travel-experience-3x.jpg" alt="" />
            </div>
            <Container className='pb pt-9'>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid className="row ">

                        <Grid className='col-sm-12 col-md-6 col-lg-6'>
                            <img className='img-fluid' src={travel?.img} alt="" />
                        </Grid>
                        <Grid className='col-sm-12 col-md-6 col-lg-6'>
                            <Typography variant='h3' color='secondary'>{travel?.title}</Typography>
                            <div className='flex '>
                                <h4 className=' font-bold text-emerald-500'>Total Cost $ {travel?.price}</h4>
                                <Rating
                                    value={4}
                                    precision={0.5}
                                    readOnly
                                />
                            </div>
                            <Box>

                                <Typography className='font-bold text-cyan-600'>Date: {travel?.date}</Typography>
                                <Typography>Time: {travel?.time}</Typography>
                            </Box>
                            <Divider />
                            <Typography className=' text-justify'><h4 className=' text-2xl text-cyan-500'>Info:</h4> {travel?.info}</Typography>
                            <button onClick={() => window.history.back()} className=" bg-cyan-700 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Go to Back</button>

                            <Box className='mt-5'>
                                <Typography variant='h4' color='secondary'>Contact informations</Typography>
                                <p className='text-yellow-500'>A: Kichijoji Sun Road 21/1, Tokyo.</p>
                                <p>T: + 123 456 789: + 123 456 8788</p>
                                <small>E: etruscan@qodeinteractive.com</small>
                                <p>W: Thursday to Sunday – 12.00 – 20.00h.</p>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box className=' flex justify-center mt-10'>

                    <Box className=' max-w-screen-md text-justify'>
                        <p className=''>{travel?.description}</p>
                    </Box>
                </Box>

            </Container>
            <h1 className=' text-center text-teal-500 text-4xl pb-2'>Map Location</h1>
            <iFrame className=' p-5 pt-0' src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d3736489.7218514383!2d90.21589792292741!3d23.857125486636733!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1506502314230" width="100%" height="315" frameBorder="0" style={{ border: '0' }}></iFrame>
            <Footer />
        </div>
    );
};

export default TravelsDetails;