import { AppRouter } from "@/server/api/root";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export interface PaginatedDataUtils {
  currentPage: number;
  totalRow: number;
  rowsPerPage: number;
  totalPages: number;
}

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
