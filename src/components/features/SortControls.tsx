import { memo, type ReactElement } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import type { SortOrder } from "@/types/user";

export interface SortOption<T extends string | number> {
  value: T;
  label: string;
}

interface SortControlsProps<T extends string | number> {
  field: T;
  order: SortOrder;
  options: SortOption<T>[];
  onFieldChange: (field: T) => void;
  onOrderToggle: () => void;
  placeholder?: string;
}

function SortControlsComponent<T extends string | number>({
  field,
  order,
  options,
  onFieldChange,
  onOrderToggle,
  placeholder = "Sort by",
}: SortControlsProps<T>): ReactElement {
  return (
    <div className="flex items-center gap-2">
      <Select
        value={String(field)}
        onValueChange={(value) => onFieldChange(value as T)}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={String(option.value)} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        size="icon"
        onClick={onOrderToggle}
        className="h-9 w-9"
        aria-label={`Sort ${order === "asc" ? "descending" : "ascending"}`}
      >
        <ArrowUp className={`h-4 w-4 ${order === "asc" ? "" : "rotate-180"}`} />
      </Button>
    </div>
  );
}

export const SortControls = memo(SortControlsComponent) as <T extends string | number>(
  props: SortControlsProps<T>
) => ReactElement;
