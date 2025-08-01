import { CafeData } from "@/types/cafe";

type ApiResponse = {
  item?: CafeData[] | CafeData;
};

export function normalizeItem(item: ApiResponse["item"]) {
  if (!item) return [];
  return Array.isArray(item) ? item : [item];
}
