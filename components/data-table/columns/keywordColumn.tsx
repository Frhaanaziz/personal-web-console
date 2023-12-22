'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Button, buttonVariants } from '@/components/ui/button';
import { ChevronsUpDown, MoreHorizontal } from 'lucide-react';
import { ColumnDef, Row } from '@tanstack/react-table';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { formatDateWithTime, getErrorMessage } from '@/lib/utils';
// import { deleteKeywordAction } from '@/app/_actions/config';
import { useId } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';
import { Keyword } from '@prisma/client';
import { api } from '@/trpc/react';
import { useRouter } from 'next/navigation';

export const keywordColumns: ColumnDef<Keyword>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'keyword',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="sm"
          className="text-md"
        >
          Keyword
          <ChevronsUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="pl-3">{row.getValue('keyword')}</div>,
  },
  {
    accessorKey: 'group',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="sm"
          className="text-md"
        >
          Group
          <ChevronsUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="pl-3">{row.getValue('group')}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="sm"
          className="text-md"
        >
          Created At
          <ChevronsUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="pl-3">
        {formatDateWithTime(row.getValue('createdAt'))}
      </div>
    ),
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="sm"
          className="text-md"
        >
          Updated At
          <ChevronsUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="pl-3">
        {formatDateWithTime(row.getValue('updatedAt'))}
      </div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <ActionCell row={row} />,
  },
];

function ActionCell({ row }: { row: Row<Keyword> }) {
  const id = useId();
  const utils = api.useUtils();
  const router = useRouter();

  const { mutate } = api.keyword.delete.useMutation({
    onMutate: () => {
      toast.loading('Deleting keyword...', { id });
    },
    onSuccess: () => {
      toast.success('Keyword deleted', { id });
      utils.keyword.getAll.invalidate();
      router.refresh();
    },
    onError: (error) => {
      toast.error(getErrorMessage(error), { id });
    },
  });

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/config/keywords/${row.original.id}/edit`}>Edit</Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* DeleteMenuItem */}
          <DropdownMenuItem asChild>
            <AlertDialogTrigger className="w-full">Delete</AlertDialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* DeleteMenuDialogContent */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            keyword and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: 'destructive' })}
            onClick={() => mutate(row.original.id)}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
