import { fetchCafeList } from "@/lib/services/cafe";
import { CafeData } from "@/types/cafe";
import { useQuery } from "@tanstack/react-query";

export const useGetCafeList = () => {
  const { data, isLoading, isError } = useQuery<CafeData[]>({
    queryKey: ["cafes"],
    queryFn: fetchCafeList,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, isError };
};
