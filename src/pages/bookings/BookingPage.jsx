import Menu from "../../components/MenuComp";
import { FaEye } from "react-icons/fa";
import { FaHotel } from "react-icons/fa";
import Modal from "../../components/Modal-v1";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoBagCheckOutline } from "react-icons/io5";
import useCheckOut from "../../hooks/bookings/useCheckOut";
export default function BookingPage({ booking }) {
  const {
    id: bookingId,
    cabins,
    guests,
    totalPrice,
    status,
    startDate,
    endDate,
  } = booking;
  const navigate = useNavigate();
  const noOfDays = totalDistance(startDate, endDate);
  const { checkOut, isCheckOut } = useCheckOut();
  const handleCheckout = (id) => {
    checkOut(id);
  };
  return (
    <>
      <div className="grid grid-cols-[0.9fr_1fr_1.5fr_1fr_1fr_1fr_1fr_0.5fr] gap-8 mb-5  shadow-md p-3 text-center ">
        <p>{cabins.name}</p>
        <h2>{guests.fullName}</h2>
        <div className="flex flex-col">
          <span>{changeFormat(startDate)}</span>
          <span>{changeFormat(endDate)}</span>
        </div>
        <h3>{status}</h3>
        <p>{noOfDays} Days</p>
        <p>{totalPrice}</p>
        <div>
          <Menu>
            <Menu.Toggle id={bookingId} />
            <Menu.List id={bookingId}>
              <Menu.Button
                icon={<FaEye />}
                onClick={() => navigate(`/bookings/${bookingId}`)}
              >
                see details
              </Menu.Button>
              {status === "unconfirmed" && (
                <Menu.Button
                  icon={<FaHotel />}
                  onClick={() => navigate(`/checkin/${bookingId}`)}
                >
                  checkin
                </Menu.Button>
              )}
              {status === "checked-in" && (
                <Menu.Button
                  icon={<IoBagCheckOutline />}
                  onClick={() => handleCheckout(bookingId)}
                >
                  checkout
                </Menu.Button>
              )}
            </Menu.List>
          </Menu>
        </div>
      </div>
    </>
  );
}

function changeFormat(date) {
  const dateObject = new Date(date);
  const formattedDate = `${(dateObject.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${dateObject
    .getDate()
    .toString()
    .padStart(2, "0")}/${dateObject.getFullYear()}`;
  return formattedDate;
}

function totalDistance(sd, ed) {
  const startDate = new Date(sd);
  const endDate = new Date(ed);
  const timeDifference = endDate - startDate;
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  return daysDifference;
}
