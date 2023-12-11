import { useMutation } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
export const useUpdateSetting = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("setting has been updated");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: () => {
      toast.error("there is some prob");
    },
  });

  return { mutate, isLoading };
};
