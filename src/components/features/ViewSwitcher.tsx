import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Table2, LayoutGrid } from "lucide-react";

export type ViewMode = "table" | "cards";

interface ViewSwitcherProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export const ViewSwitcher = memo(function ViewSwitcher({
  view,
  onViewChange,
}: ViewSwitcherProps) {
  return (
    <div className="flex items-center gap-1 border rounded-md p-1">
      <Button
        variant={view === "table" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("table")}
        className="h-8"
        aria-label="Table view"
      >
        <Table2 className="h-4 w-4" />
      </Button>
      <Button
        variant={view === "cards" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("cards")}
        className="h-8"
        aria-label="Cards view"
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
    </div>
  );
});
