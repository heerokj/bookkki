import { fetchCafeList, fetchSearchCafe } from "@/lib/services/cafe";
import { normalizeItem } from "@/shared/utils/normalizeItem";
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

export const useGetSearchCafe = (cafeName: string) => {
  const { data, isLoading, isError } = useQuery<CafeData[]>({
    queryKey: ["searchCafe", cafeName], //NOTE - cafeName
    queryFn: () => fetchSearchCafe(cafeName),
    enabled: cafeName !== "",
    staleTime: 1000 * 60 * 5,
  });

  return { searchList: normalizeItem(data), isLoading, isError };
};
