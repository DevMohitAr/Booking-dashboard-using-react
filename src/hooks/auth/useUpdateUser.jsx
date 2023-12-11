import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { updateUserApi } from "../../services/apiAuthentication";
import toast from "react-hot-toast";

export default function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading:isUpdating } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: ({user}) => {
      queryClient.setQueryData(["user"],user)
      toast.success("user has been updated");
    },
    onError: () => {
      toast.error("there is some problem in updating user details");
    },
  });
  return { updateUser,isUpdating };
}
