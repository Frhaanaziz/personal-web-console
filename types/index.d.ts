import { AppRouter } from '@/server/api/root';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

export interface PaginatedDataUtils {
  currentPage: number;
  totalRow: number;
  rowsPerPage: number;
  totalPages: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  hashedPassword: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Keyword {
  id: string;
  keyword: string;
  group: string;
  createdAt: Date;
  updatedAt: Date;
}

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
