import React from "react";
import useBookings from "../../hooks/bookings/useBookings";
import BookingPage from "./BookingPage";
import CompFilter from "../../components/CompoundFilter";
import { useSearchParams } from "react-router-dom";
import SortBy from "../../components/SortBy";
import Pagination from "../../components/Pagination";

export default function Bookings() {
  const { data: bookings, isLoading, isError } = useBookings();
  const [searchParams, setSearchParams] = useSearchParams();
  const filterValue = searchParams.get("status") || "all";
  if (isError) {
    return <p>error...</p>;
  }
  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <div className="flex items-center p-4 justify-between">
        <h1>Bookings</h1>
        <div>
          {" "}
          {
            <CompFilter
              filterField={"status"}
              options={[
                { label: "All", value: "all" },
                { label: "unconfirmed", value: "unconfirmed" },
                { label: "checked-in", value: "checked-in" },
                { label: "checked-out", value: "checked-out" },
              ]}
              filterValue={filterValue}
            />
          }
        </div>
        <div>
          <SortBy
            options={[
              { label: "total price low to high", value: "totalPrice-asc" },
              { label: "total price High to low", value: "totalPrice-desc" },
            ]}
          />
        </div>
      </div>
      <div className="grid grid-cols-[0.9fr_1fr_1.5fr_1fr_1fr_1fr_1fr_0.5fr]  text-center bg-slate-700 capitalize font-bold p-4 text-slate-100">
        <p>Cabins</p>
        <h2>Guest</h2>
        <p>Dates</p>
        <h3>Status</h3>
        <h2>NoOfDays</h2>
        <p>TotalPrice</p>
      </div>
      {bookings.map((booking) => {
        return <BookingPage key={booking.id} booking={booking} />;
      })}
      <div>
        {" "}
        <Pagination totalItems={24} />
      </div>
    </div>
  );
}
