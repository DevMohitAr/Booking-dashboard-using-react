import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";

export default function useBookings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  //FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  //SORT
  const sortValue = searchParams.get("sortBy") || "totalPrice-asc";
  const sort = !sortValue ? null : sortValue;

  //PAGINATION
  let pageValue = searchParams.get("page");
  pageValue = pageValue && Number(pageValue);
  const itemsSize = 5;
  const totalItems = 24;
  const noOfPages = Math.ceil(24 / 5);
  let finalDec;
  if (pageValue) {
    const initialValue = (pageValue - 1) * itemsSize;
    const finalValue = itemsSize * (pageValue - 1) + (itemsSize - 1);
    finalDec = { initialValue, finalValue };
  }
  //QUERY
  const { isLoading, isError, data } = useQuery({
    queryKey: ["bookings", filter, sort, pageValue],
    queryFn: () => getBookings({ filter, sort, finalDec }),
  });
  if (pageValue < noOfPages) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, pageValue + 1],
      queryFn: () => getBookings({ filter, sort, finalDec }),
    });
  }
  if (pageValue > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, pageValue - 1],
      queryFn: () => getBookings({ filter, sort, finalDec }),
    });
  }

  return { isLoading, isError, data };
}
