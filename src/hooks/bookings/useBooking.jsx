import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
export default function useBooking() {
  const { bookingId } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBooking(bookingId),
  });

  return { data, isLoading, isError };
}
