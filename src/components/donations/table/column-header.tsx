import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Column, Table } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowDownWideNarrowIcon,
  ArrowUpNarrowWideIcon,
  ChevronDownIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  table: Table<TData>;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  table,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <ChevronDownIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowDownWideNarrowIcon className="mr-2 h-3.5 w-3.5" />
            Sort A - Z
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowUpNarrowWideIcon className="mr-2 h-3.5 w-3.5" />
            Sort Z - A
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <div className="flex items-center p-2">
            <Input
              placeholder={`Filter ${title}`}
              value={
                (table.getColumn(column.id)?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn(column.id)?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
