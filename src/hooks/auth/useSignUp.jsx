import { useMutation } from "@tanstack/react-query";
import { signUpApi  } from "../../services/apiAuthentication";
import toast from "react-hot-toast";

export default function useSignUp() {
  const { mutate, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (user) => {
      
      toast.success("user has been created successfully");
    },
    onError:()=>{
        console.log("its error");
    }
  });
  return {mutate, isLoading}
}
