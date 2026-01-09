import { memo, useState, useEffect, type ReactElement } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchBarProps<T extends string | number> {
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  debounceMs?: number;
  getDisplayValue?: (value: T) => string;
}

function SearchBarComponent<T extends string | number>({
  value,
  onChange,
  placeholder = "Search...",
  debounceMs = 300,
  getDisplayValue,
}: SearchBarProps<T>): ReactElement {
  const displayValue = getDisplayValue ? getDisplayValue(value) : String(value);
  const [localValue, setLocalValue] = useState(displayValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      const convertedValue = (
        typeof value === "number" ? Number(localValue) || 0 : localValue
      ) as T;
      onChange(convertedValue);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [localValue, onChange, debounceMs, value]);

  useEffect(() => {
    setLocalValue(displayValue);
  }, [displayValue]);

  const handleClear = () => {
    setLocalValue("");
    const emptyValue = (typeof value === "number" ? 0 : "") as T;
    onChange(emptyValue);
  };

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type={typeof value === "number" ? "number" : "text"}
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="pl-9 pr-9"
      />
      {localValue && (
        <Button
          variant="ghost"
          size="icon-sm"
          className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
          onClick={handleClear}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

export const SearchBar = memo(SearchBarComponent) as <
  T extends string | number
>(
  props: SearchBarProps<T>
) => ReactElement;
