import React from "react";

import useBooking from "../../hooks/bookings/useBooking";
import BookingInformation from "./BookingInformation";

export default function BookingDetail() {
  const { data, isLoading, isError } = useBooking();

  if (isLoading) {
    return <p>loading...</p>;
  }
  if (isError) {
    return <p>error....</p>;
  }
  return (
    <div>
      <BookingInformation data={data} />
    </div>
  );
}
