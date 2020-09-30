import { Grid, Typography } from '@material-ui/core';
import React, { useState, useEffect, useContext} from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/bookings?email='+loggedInUser.email, {
            headers: {
                'authorization': `Bearer ${sessionStorage.getItem('token') }`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => setBookings(data))
       
    }, [])

    return (
        <>
            <Typography variant="h6">You total Booked : {bookings.length}</Typography>
            <Grid container justify="center">
                {
                    bookings.map(booking =>
                        <Grid key={booking._id} style={{margin:'1rem', padding:'1rem'}}>
                            <Typography> Name : {booking.name} </Typography>
                            <Typography> CheckIn Date : {new Date(booking.checkIn).toDateString('dd/MM/yyyy')} </Typography>
                            <Typography> CheckOut Date : {new Date(booking.checkOut).toDateString('dd/MM/yyyy')} </Typography>
                        </Grid>)
                }

            </Grid>
        </>
       
 
    );
};

export default Bookings;