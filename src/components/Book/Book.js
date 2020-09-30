import React, { useContext, useState } from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import { Button } from '@material-ui/core';
import Bookings from '../Bookings/Bookings';

const Book = () => {
    const { bedType } = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = useState({
        checkIn : new Date(),
        checkOut : new Date()
    });

    const handleCheckInDate = (date) => {
        const newDate = {...selectedDate};
        newDate.checkIn = date;
        setSelectedDate(newDate);
    };
    const handleCheckOutDate = (date) => {
        const newDate = { ...selectedDate };
        newDate.checkOut = date;
        setSelectedDate(newDate);
    };

    const handleBooking = () => {
        const newBooking = { ...loggedInUser, ...selectedDate}
        fetch('http://localhost:4000/addBooking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(newBooking)
        })
        .then(response => response.json())
        .then(data => console.log(data))
    }
    // console.log('check in' + selectedDate.checkIn, 'checkout' + selectedDate.checkOut )
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Welcome {loggedInUser.name}! Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date picker inline"
                        value={selectedDate.checkIn}
                        onChange={handleCheckInDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date picker dialog"
                        format="dd/MM/yyyy"
                        value={selectedDate.checkOut}
                        onChange={handleCheckOutDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
                <Button variant="contained" color="primary" onClick={() => handleBooking()}>Book Now</Button>
            </MuiPickersUtilsProvider>

            <Bookings/>
        </div>
    );
};

export default Book;