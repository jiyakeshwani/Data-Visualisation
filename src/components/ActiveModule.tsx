/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/dashboard/ActiveModule.tsx

import clsx from "clsx";
import { ChevronDown, Plus } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { DataGraph } from "./DataGraph";
import { VariablesPanel } from "./Variables";

interface ActiveModuleProps {
  setIsEditPanelOpen: (open: boolean) => void;
}

/**
 * ActiveModule component displays:
 * - Current module's name
 * - Best scenario list (toggleable)
 * - Graph data
 * - KPI/variables section
 */
export default function ActiveModule({
  setIsEditPanelOpen,
}: ActiveModuleProps) {
  const [isOpen, setIsOpen] = useState(true);
  const activeModule = useSelector((state: any) => state.modules.activeModule);

  return (
    <section className="border-t-[1px] border-l-[1px] border-[#525252] bg-[var(--bg-dark-secondary)] rounded px-4 md:px-8 py-4 md:py-6 w-full h-[94.7%]">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex items-center gap-1">
          <img
            className="md:w-7 w-5 md:ml-2 ml-1"
            src="/light.svg"
            alt="light"
          />
          <h1 className="font-bold ml-1 md:ml-2.5 text-xl md:text-[26px]">
            {activeModule.name}
          </h1>
        </div>

        <div className="flex gap-3 mt-4 md:mt-0">
          <button>
            <img
              className="border-[0.7px] border-[#525252] bg-[#262525] md:px-3 md:py-3 p-2 rounded"
              src="/clock.svg"
              alt="clock"
            />
          </button>

          {/* Edit Variables Button - This will open a side panel for editing variable configurations for the selected module */}
          <button
            onClick={() => setIsEditPanelOpen(true)}
            className="border-[0.7px] text-sm md:text-base border-[#525252] bg-[#262525] md:px-3 md:py-2 p-2 rounded"
          >
            Edit Variables
          </button>

          <button>
            <img
              className="border-[0.7px] border-[#525252] bg-[#262525] md:px-3 md:py-3 p-2 rounded"
              src="/upload.svg"
              alt="upload"
            />
          </button>
        </div>
      </div>

      <div className="my-8">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center space-x-3 text-[var(--green-primary)] mb-2 text-lg md:text-[22px]">
            <img src="/sparkle.svg" alt="sparkle" />
            <h2>Best Scenario Results</h2>
          </div>

          <div className="border border-[var(--green-primary)] p-1.5 md:px-2.5 md:py-1.5 rounded-full transition-transform duration-300">
            <ChevronDown
              className={clsx(
                "md:h-5 md:w-5 w-4 h-4 text-[var(--green-primary)] transform transition-transform duration-300",
                { "rotate-180": isOpen }
              )}
            />
          </div>
        </div>

        <div
          className={clsx(
            "overflow-hidden transition-all duration-500 ease-in-out",
            isOpen ? "max-h-[500px] mt-4 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="space-y-2">
            {activeModule.bestScenario.map((scenario: string, i: number) => (
              <div
                key={i}
                className="bg-[#CCFF0005] flex justify-between items-center text-xs md:text-base border-[0.5px] border-[var(--border-green)] text-[var(--green-secondary)] px-4 py-2.5 mb-3 rounded-md"
              >
                <p>{scenario}</p>
                <img src="/dots.svg" alt="options" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-3">
        <div className="flex-1 basis-[57%]">
          <h3 className="text-white md:text-xl font-medium">Graphs</h3>
          <DataGraph />
        </div>

        <div className="w-full flex flex-col basis-[43%]">
          <div className="flex justify-between items-center">
            <h3 className="text-white md:text-xl font-medium">
              Key Performance Indicators
            </h3>
            <button className="bg-[#18181A80] flex gap-2 border border-[#5A5A5AA1] rounded-[5px] text-white md:text-sm text-xs py-1.5 px-2">
              Variables <Plus className="md:w-5 md:h-5 h-4 w-4" />
            </button>
          </div>
          <VariablesPanel variables={activeModule.variables} />
        </div>
      </div>
    </section>
  );
}
