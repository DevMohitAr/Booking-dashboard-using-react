import { updateBooking } from "../../services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function useCheckIn() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkIn, isLoading: isCheckIn } = useMutation({
    mutationFn: (id) => updateBooking(id, { isPaid: true, status: "confirm" }),
    onSuccess: (data) => {
      toast.success(`checked in Successfully`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => {
      toast.error("prob in check in");
    },
  });
  return { checkIn, isCheckIn };
}
