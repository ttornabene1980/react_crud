"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface Column<T> {
  key: string;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
  filterable?: boolean;
  searchable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  searchPlaceholder?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onEdit,
  onDelete,
  searchPlaceholder = "Search...",
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<
    Record<string, string>
  >({});

  // Get unique values for a column
  const getUniqueValues = (columnKey: string): string[] => {
    const values = data
      .map((row) => {
        const value = row[columnKey];
        return value !== null && value !== undefined ? String(value) : "";
      })
      .filter((v) => v !== "");
    return Array.from(new Set(values)).sort();
  };

  // Filter data based on search and column filters
  const filteredData = React.useMemo(() => {
    return data.filter((row) => {
      // Full-text search across all searchable columns
      if (searchTerm) {
        const searchableColumns = columns.filter((col) => col.searchable !== false);
        const matchesSearch = searchableColumns.some((col) => {
          const value = row[col.key];
          return value !== null && value !== undefined
            ? String(value).toLowerCase().includes(searchTerm.toLowerCase())
            : false;
        });
        if (!matchesSearch) return false;
      }

      // Column-specific filters
      for (const [columnKey, filterValue] of Object.entries(columnFilters)) {
        if (filterValue && filterValue !== "all") {
          const rowValue = row[columnKey];
          const rowValueStr =
            rowValue !== null && rowValue !== undefined ? String(rowValue) : "";
          if (!rowValueStr.includes(filterValue)) {
            return false;
          }
        }
      }

      return true;
    });
  }, [data, searchTerm, columnFilters, columns]);

  const clearFilter = (columnKey: string) => {
    setColumnFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[columnKey];
      return newFilters;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Column Filters */}
      {columns.some((col) => col.filterable !== false) && (
        <div className="flex flex-wrap gap-2">
          {columns
            .filter((col) => col.filterable !== false)
            .map((column) => {
              const uniqueValues = getUniqueValues(column.key);
              const filterValue = columnFilters[column.key] || "all";

              return (
                <div key={column.key} className="flex items-center gap-2">
                  <Select
                    value={filterValue}
                    onValueChange={(value) => {
                      if (value === "all") {
                        clearFilter(column.key);
                      } else {
                        setColumnFilters((prev) => ({
                          ...prev,
                          [column.key]: value,
                        }));
                      }
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={`Filter ${column.header}`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All {column.header}</SelectItem>
                      {uniqueValues.map((value) => (
                        <SelectItem key={value} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {filterValue !== "all" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => clearFilter(column.key)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              );
            })}
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key}>{column.header}</TableHead>
              ))}
              {(onEdit || onDelete) && <TableHead className="w-[100px]">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                  className="h-24 text-center"
                >
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {column.render
                        ? column.render(row[column.key], row)
                        : String(row[column.key] ?? "")}
                    </TableCell>
                  ))}
                  {(onEdit || onDelete) && (
                    <TableCell>
                      <div className="flex gap-2">
                        {onEdit && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(row)}
                          >
                            Edit
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => onDelete(row)}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

