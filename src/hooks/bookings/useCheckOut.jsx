import { updateBooking } from "../../services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function useCheckOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkOut, isLoading: isCheckOut } = useMutation({
    mutationFn: (id) =>
      updateBooking(id, { isPaid: true, status: "checked-out" }),
    onSuccess: (data) => {
      toast.success(` checked out Successfully`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => {
      toast.error("prob in check in");
    },
  });
  return { checkOut, isCheckOut };
}
