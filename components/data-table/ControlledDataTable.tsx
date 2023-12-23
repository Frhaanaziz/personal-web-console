'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Settings2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { PaginatedDataUtils } from '@/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Separator } from '../ui/separator';

export function ControlledDataTable({
  data,
  columns,
  utils,
}: {
  data: any[];
  columns: ColumnDef<any>[];
  utils: PaginatedDataUtils;
}) {
  const { currentPage, totalRow, rowsPerPage, totalPages } = utils;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const createQueryString: any = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: currentPage,
    pageSize: rowsPerPage,
  });

  useEffect(() => {
    router.push(
      pathname + '?' + createQueryString('page', pageIndex.toString()),
      { scroll: false }
    );
  }, [pageIndex, createQueryString, pathname, router]);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    // pageCount: totalPages,
    pageCount: totalPages + 1,
    // pageCount: -1,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  const canPreviousPage = pagination.pageIndex > 1;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-4">
        <div className="flex">
          <Input
            placeholder="Filter names..."
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-xs gap-1.5 hidden lg:flex"
              >
                <Settings2 className="w-4 h-4" /> View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4 gap-5 overflow-x-auto ">
        <div className="flex items-center gap-2">
          <p className=" font-semibold flex-shrink-0">
            Page{' '}
            <span>
              {table.getState().pagination.pageIndex} of{' '}
              {/* {table.getPageCount() - 1} */}
              {table.getPageCount()}
            </span>
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-1 self-end">
          <p className="font-semibold">Go to page:</p>
          <Input
            type="number"
            defaultValue={table.getState().pagination.pageIndex}
            min={1}
            max={table.getPageCount()}
            onChange={(e) => {
              //   const page = e.target.value ? Number(e.target.value) : 0;
              const page = e.target.value ? Number(e.target.value) : 1;
              table.setPageIndex(page);
            }}
            className="w-16"
          />
        </div>

        <div className="space-x-2 flex-shrink-0">
          <Button
            size="icon"
            // onClick={() => table.setPageIndex(0)}
            onClick={() => table.setPageIndex(1)}
            disabled={!canPreviousPage}
            // disabled={!table.getCanPreviousPage()}
            className="hidden lg:inline-flex"
          >
            <ChevronsLeft className="w-4 h-4" />
          </Button>

          <Button
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!canPreviousPage}
            // disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          <Button
            size="icon"
            onClick={() => table.setPageIndex(table.getPageCount())}
            disabled={!table.getCanNextPage()}
            className="hidden lg:inline-flex"
          >
            <ChevronsRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
