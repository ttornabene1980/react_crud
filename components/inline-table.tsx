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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import { Autocomplete } from "@/components/autocomplete";

interface InlineTableColumn {
  key: string;
  header: string;
  type?: "text" | "textarea" | "number" | "date" | "boolean" | "autocomplete";
  autocompleteOptions?: Array<{ value: string | number; label: string }>;
  render?: (value: any, row: any, onChange: (value: any) => void) => React.ReactNode;
}

interface InlineTableProps {
  data: any[];
  columns: InlineTableColumn[];
  onAdd: () => void;
  onUpdate: (index: number, field: string, value: any) => void;
  onDelete: (index: number) => void;
  title?: string;
}

export function InlineTable({
  data,
  columns,
  onAdd,
  onUpdate,
  onDelete,
  title,
}: InlineTableProps) {
  const renderCell = (column: InlineTableColumn, value: any, row: any, rowIndex: number) => {
    if (column.render) {
      return column.render(value, row, (newValue) =>
        onUpdate(rowIndex, column.key, newValue)
      );
    }

    switch (column.type) {
      case "boolean":
        return (
          <Checkbox
            checked={Boolean(value)}
            onCheckedChange={(checked) =>
              onUpdate(rowIndex, column.key, checked)
            }
          />
        );
      case "number":
        return (
          <Input
            type="number"
            value={value ?? ""}
            onChange={(e) =>
              onUpdate(rowIndex, column.key, parseFloat(e.target.value) || 0)
            }
            className="w-full"
          />
        );
      case "date":
        return (
          <Input
            type="date"
            value={value ?? ""}
            onChange={(e) => onUpdate(rowIndex, column.key, e.target.value || null)}
            className="w-full"
          />
        );
      case "textarea":
        return (
          <Textarea
            value={value ?? ""}
            onChange={(e) => onUpdate(rowIndex, column.key, e.target.value)}
            className="w-full"
            rows={2}
          />
        );
      case "autocomplete":
        if (column.autocompleteOptions) {
          return (
            <Autocomplete
              options={column.autocompleteOptions}
              value={value}
              onValueChange={(newValue) =>
                onUpdate(rowIndex, column.key, newValue)
              }
              className="w-full"
            />
          );
        }
        return (
          <Input
            value={value ?? ""}
            onChange={(e) => onUpdate(rowIndex, column.key, e.target.value)}
            className="w-full"
          />
        );
      default:
        return (
          <Input
            value={value ?? ""}
            onChange={(e) => onUpdate(rowIndex, column.key, e.target.value)}
            className="w-full"
          />
        );
    }
  };

  return (
    <div className="space-y-4">
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key}>{column.header}</TableHead>
              ))}
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center"
                >
                  No items. Click "Add" to create one.
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {renderCell(column, row[column.key], row, rowIndex)}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(rowIndex)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <Button onClick={onAdd} variant="outline">
        <Plus className="mr-2 h-4 w-4" />
        Add
      </Button>
    </div>
  );
}

