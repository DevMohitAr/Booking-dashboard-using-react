import React from "react";

export default function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkins = confirmedStays.length;
const occupation =
  confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
  (numDays * cabinCount);
  return (
    <div >
      <Stat numBookings={numBookings} sales={sales} checkins={checkins} />
    </div>
  );
}

const Stat = ({ numBookings, sales, checkins}) => {
 return (
   <div className="shadow-md p-12 flex justify-between px-12  ">
     <div className=" p-8 text-gray-50 bg-slate-900 rounded-lg">
       <label htmlFor="">Bookings</label>
       <h2 className="text-center text-3xl">{numBookings}</h2>
     </div>
     <div className=" p-8 text-gray-50 bg-slate-900 rounded-lg">
       <label htmlFor="">Sales</label>
       <p className="text-center text-3xl">{sales}</p>
     </div>
     <div className=" p-8 text-gray-50 bg-slate-900 rounded-lg">
       <label htmlFor="">Checkins</label>
       <h3 className="text-center text-3xl">{checkins}</h3>
     </div>
   </div>
 );
};
