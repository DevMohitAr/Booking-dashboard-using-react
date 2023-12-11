import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export const useCabins = () => {
  const cabins = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  return cabins;
};
