import { supabase } from "./supabase";
import { getToday } from "../utils/helpers";
export const getBookings = async ({ filter, sort, finalDec }) => {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice,cabins(name),guests(fullName)"
    );
  //FILTER

  if (filter) {
    query = query.eq(filter.field, filter.value);
  }
  if (sort) {
    const [field, direction] = sort.split("-");

    if (direction === "desc") {
      query = query.order(field, { ascending: false });
    } else {
      query = query.order(field, { ascending: true });
    }
  }
  if (!finalDec) {
    query = query.range(0, 4);
  } else {
    const { initialValue, finalValue } = finalDec;
    query = query.range(initialValue, finalValue);
  }

  const { data: bookings, error } = await query;
  if (error) {
    console.error(error);
    throw new Error("cabin cant be deleted");
  }
  return bookings;
};

export const getBooking = async (id) => {
  let { data: bookings, error } = await supabase
    .from("bookings")
    .select("*,cabins(*),guests(*)")
    .eq("id", id)
    .single();
  if (error) {
    console.error(error);
    throw new Error("cabin cant be deleted");
  }
  return bookings;
};

export const updateBooking = async (id,obj) => {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select();
    if (error) {
      console.error(error);
      throw new Error("cabin cant be deleted");
    }
    return data;
};

export const getBookingsAfterDate =async (date) =>{
  const {data,error} = await supabase.from("bookings").select("created_at,totalPrice,extrasPrice").gte("created_at",date).lte("created_at",getToday({end:true}))

   if (error) {
     console.error(error);
     throw new Error("Bookings could not get loaded");
   }

   return data;
}

export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}