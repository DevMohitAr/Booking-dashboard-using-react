import React from "react";
import { Link, useParams } from "react-router-dom";
import useBooking from "./useBooking";
import BookingInformation from "../../pages/bookings/BookingInformation";
import CheckBox from "../../components/CheckBox";
import useCheckIn from "./useCheckIn";
export default function CheckinBookings() {
  const [confirmPaid, setConfirmPaid] = React.useState(false);
  const { bookingId } = useParams();
  const { data, isLoading, isError } = useBooking();
  const { checkIn, isCheckIn } = useCheckIn();
  React.useEffect(() => {
    setConfirmPaid(data?.isPaid || false);
  }, [data]);
  if (isLoading) {
    return <p>laoding...</p>;
  }
  if (isError) {
    return <p>error.....</p>;
  }
  const handleClick = () => {
    if (!confirmPaid) return;

    checkIn(bookingId);
  };
  return (
    <>
      <div>
        bookingId is {bookingId}
        <BookingInformation data={data} />
        <div className="flex justify-center gap-2 capitalize text-lg">
          <CheckBox
            checked={confirmPaid}
            id="confirm"
            disabled={confirmPaid}
            onChange={() => setConfirmPaid(!confirmPaid)}
          >
            I confirm {data.fullName} has paid the ammount
          </CheckBox>
        </div>
      </div>
      <div className="mt-5 flex justify-center">
        <button
          className={`${
            !confirmPaid ? "bg-purple-100 text-purple-900" : "bg-purple-800"
          } p-3 text-purple-100`}
          disabled={!confirmPaid}
          onClick={handleClick}
        >
          Check in
        </button>
      </div>
    </>
  );
}
