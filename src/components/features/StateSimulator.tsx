import { memo, useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle, Inbox, Loader2 } from "lucide-react";

export type SimulatedState = "normal" | "loading" | "error" | "empty";

interface StateSimulatorProps {
  onStateChange: (state: SimulatedState) => void;
}

export const StateSimulator = memo(function StateSimulator({
  onStateChange,
}: StateSimulatorProps) {
  const [selectedState, setSelectedState] = useState<SimulatedState>("normal");

  const handleStateClick = (state: SimulatedState) => {
    setSelectedState(state);
    onStateChange(state);
  };

  const handleReset = () => {
    setSelectedState("normal");
    onStateChange("normal");
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-muted/50 rounded-xl border">
      <span className="text-sm font-medium text-muted-foreground mr-2">
        Simulate State:
      </span>
      <Button
        variant={selectedState === "loading" ? "default" : "outline"}
        size="sm"
        onClick={() => handleStateClick("loading")}
        className="h-8"
      >
        <Loader2 className="h-3 w-3 mr-1.5" />
        Loading
      </Button>
      <Button
        variant={selectedState === "error" ? "default" : "outline"}
        size="sm"
        onClick={() => handleStateClick("error")}
        className="h-8"
      >
        <AlertCircle className="h-3 w-3 mr-1.5" />
        Error
      </Button>
      <Button
        variant={selectedState === "empty" ? "default" : "outline"}
        size="sm"
        onClick={() => handleStateClick("empty")}
        className="h-8"
      >
        <Inbox className="h-3 w-3 mr-1.5" />
        Empty
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleReset}
        className="h-8"
        disabled={selectedState === "normal"}
      >
        <RefreshCw className="h-3 w-3 mr-1.5" />
        Reset
      </Button>
    </div>
  );
});
