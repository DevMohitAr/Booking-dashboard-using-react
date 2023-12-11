import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
export const useSettings = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return { data, isLoading };
};
