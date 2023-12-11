import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOutApi } from "../../services/apiAuthentication";
import { useNavigate } from "react-router-dom";

export default function useLogOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logOut, isLoading: isLoggingOut } = useMutation({
    mutationFn: logOutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login");
    },
    onError: () => {
      throw new Error("unable to logout");
    },
  });

  return { logOut, isLoggingOut };
}
