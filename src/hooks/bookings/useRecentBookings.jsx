import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getBookingsAfterDate } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'
import { subDays } from "date-fns";
export default function useRecentBookings() {
    const [searchParams] = useSearchParams();
    const numDays = !searchParams.get("last") ? 7:Number(searchParams.get("last"))
    const queryDate = subDays(new Date(),numDays).toISOString();
  const {data:bookings,isLoading} =   useQuery({
        queryKey:["bookings",`last-${numDays}`],
        queryFn:()=>getBookingsAfterDate(queryDate)
    })
  return {isLoading,bookings}
}
