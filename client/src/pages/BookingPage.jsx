import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookngDates from "../BookingDates";

export default function BookingPage(){
    const {id} = useParams();
    const [booking, setBooking] = useState(null); 
    useEffect(()=>{
        if(id){
            axios.get('/bookings').then(response =>{
                const foundBooking = response.data.find(({_id})=> _id === id);
                if(foundBooking){
                    setBooking(foundBooking);
                }
            });
        }

    },[id]);

    if(!booking){
        return '';
    }
    return(
        <div className="my-8">
             <h1 className="text-2xl">{booking.place.title}</h1>
            <AddressLink className='my-2 block'>{booking.place.address}</AddressLink>
            <div className="flex bg-gray-500 p-6 my-6 rounded-2xl items-center justify-between">
                <div>
                    <h2 className="text-2xl mb-4">Your booking Information</h2>
                    <BookngDates booking={booking} />
                </div>
                <div className="bg-primary p-6 text-white rounded-2xl">
                    <div>Total Price</div>
                    <div className="text-3xl">Rs.{booking.price}</div>                   
                </div>
                
            </div>
            <PlaceGallery place={booking.place} />
        </div>
    );
}