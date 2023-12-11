import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function BookingInformation({ data }) {
  const { bookingId } = useParams();
  const { numNights, numGuests, totalPrice, status, guests, cabins, isPaid } =
    data;

  const { fullName } = guests;
  const handleChange = ()=>{

  }
  return (
    <>
      <Link to="/bookings" className="absolute right-7 top-20 text-lg ">
        Back to Bookings
      </Link>
      <div className="p-16 max-w-4xl m-auto ">
        <h1 className=" font-medium text-2xl">Booking id is - {bookingId}</h1>{" "}
        <div className="relative  grid grid-cols-2 bg-slate-800 text-slate-50 px-20 py-20 gap-4 mt-5 text-2xl ">
          <p> Name </p>
          <h2 className="text-cyan-400 justify-self-center ">{fullName}</h2>
          <p>Status </p>
          <h2 className="text-cyan-400 justify-self-center ">{status}</h2>
          <p>Number of Nights </p>
          <h2 className="text-cyan-400 justify-self-center">{numNights}</h2>
          <p>Number of guests</p>
          <h2 className="text-cyan-400 justify-self-center">{numGuests}</h2>
          <p>total price </p>
          <h2 className="text-cyan-400 justify-self-center">{totalPrice}</h2>
        </div>
        <p
          className={`text-center  uppercase text-4xl text-green-50 ${
            isPaid ? "bg-green-600" : "bg-red-600 text-red-50"
          } p-3`}
        >
          {isPaid ? "paid" : "payment at hotel"}
        </p>
      </div>
     
    </>
  );
}
