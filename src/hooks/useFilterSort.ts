import { useState, useMemo, useCallback } from "react";

export type SortOrder = "asc" | "desc";

export interface SortConfig<TField extends string | number = string | number> {
  field: TField;
  order: SortOrder;
}

export interface UseFilterSortOptions<
  T,
  TField extends string | number = string | number
> {
  items: T[];
  filterFn?: (item: T, searchTerm: string) => boolean;
  sortFn?: (items: T[], config: SortConfig<TField>) => T[];
  initialSortField?: TField;
  initialSortOrder?: SortOrder;
}

export function useFilterSort<
  T,
  TField extends string | number = string | number
>({
  items,
  filterFn,
  sortFn,
  initialSortField,
  initialSortOrder = "asc",
}: UseFilterSortOptions<T, TField>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<TField>(
    initialSortField ?? ("" as TField)
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialSortOrder);

  const sortConfig: SortConfig<TField> = useMemo(
    () => ({ field: sortField, order: sortOrder }),
    [sortField, sortOrder]
  );

  const filteredItems = useMemo(() => {
    if (!filterFn || !searchTerm.trim()) {
      return items;
    }
    return items.filter((item) => filterFn(item, searchTerm));
  }, [items, searchTerm, filterFn]);

  const sortedItems = useMemo(() => {
    if (!sortFn) {
      return filteredItems;
    }
    return sortFn(filteredItems, sortConfig);
  }, [filteredItems, sortConfig, sortFn]);

  const filteredCount = filteredItems.length;

  const handleSortFieldChange = useCallback((field: TField) => {
    setSortField((prevField) => {
      if (prevField === field) {
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
        return prevField;
      }
      setSortOrder("asc");
      return field;
    });
  }, []);

  const handleSortOrderToggle = useCallback(() => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    sortField,
    sortOrder,
    sortConfig,
    filteredItems: sortedItems,
    filteredCount,
    totalCount: items.length,
    handleSortFieldChange,
    handleSortOrderToggle,
  };
}
