import React from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/apiAuthentication";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useLogin() {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("The provided email and/or password is incorrect");
    },
  });
  return { mutate, isLoading };
}
