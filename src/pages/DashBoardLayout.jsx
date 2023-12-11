import React from 'react'
import Stats from '../components/Stats'
import useRecentBookings from '../hooks/bookings/useRecentBookings'
import useRecentStays from "../hooks/bookings/useRecentStays";
import { useCabins } from '../hooks/cabins/useCabin';
import SalesChart from './SalesChart';

export default function DashBoardLayout() {
 const {bookings,isLoading:isLoading1} =   useRecentBookings();
  const { confirmedStays, isLoading: isLoading2, numDays } = useRecentStays();
 const cabins=useCabins()
 if (isLoading1 || isLoading2 ) return <p>loading....</p>;

  return (
    <div >
      <div>
        <Stats
          bookings={bookings}
          confirmedStays={confirmedStays}
          numDays={numDays}
          cabinCount={cabins.length}
        />
      </div>
      <div>
        <SalesChart bookings={bookings} numDays={numDays}/>
      </div>
    </div>
  );
}
