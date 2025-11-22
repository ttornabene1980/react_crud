"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AutocompleteOption {
  value: string | number;
  label: string;
}

interface AutocompleteProps {
  options: AutocompleteOption[];
  value?: string | number;
  onValueChange: (value: string | number | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function Autocomplete({
  options,
  value,
  onValueChange,
  placeholder = "Select...",
  className,
  disabled = false,
}: AutocompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = React.useMemo(() => {
    if (!searchTerm) return options;
    const term = searchTerm.toLowerCase();
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(term)
    );
  }, [options, searchTerm]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
          disabled={disabled}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <div className="p-2">
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-2"
            autoFocus
          />
        </div>
        <div className="max-h-[300px] overflow-auto">
          {filteredOptions.length === 0 ? (
            <div className="p-2 text-sm text-muted-foreground text-center">
              No options found
            </div>
          ) : (
            filteredOptions.map((option) => (
              <button
                key={String(option.value)}
                className={cn(
                  "w-full flex items-center justify-between px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer",
                  value === option.value && "bg-accent"
                )}
                onClick={() => {
                  onValueChange(option.value);
                  setOpen(false);
                  setSearchTerm("");
                }}
              >
                <span>{option.label}</span>
                {value === option.value && (
                  <Check className="h-4 w-4" />
                )}
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

