import type { Variable } from "@/types";
import { CircleHelp } from "lucide-react";

interface SelectedVariablesPanelProps {
  variables: Variable[];
}

/**
 * VariablesPanel
 * Renders a grid of up to 4 selected variables with name, description,
 * help icon, and total cost display.
 */
export const VariablesPanel = ({ variables }: SelectedVariablesPanelProps) => {
  const selectedVariables = variables.filter((v) => v.selected);

  return (
    <div className="overflow-x-auto mt-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {selectedVariables.slice(0, 4).map((variable, i) => (
          <div
            key={i}
            className="rounded border border-[#525252] bg-[#222324] text-white p-4 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div className="w-[98%]">
                <div className="text-white font-medium text-lg">
                  {variable.name}
                </div>
                <div className="text-[#BBBBBB] text-xs mt-1 leading-tight">
                  {variable.description}
                </div>
              </div>
              <CircleHelp className="text-[#BBBBBB] w-6 h-6 mt-1 shrink-0" />
            </div>

            <h2 className="text-white text-right font-bold text-3xl mt-9">
              €{variable.totalCost.toFixed(2)}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};
