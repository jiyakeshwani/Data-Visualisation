/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Variable } from "@/types";
import clsx from "clsx";
import { ChevronDown, ChevronUp, Info, Pencil, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  toggleVariableSelection,
  updateVariableData,
} from "@/redux/modulesSlice";
import { ModifyVariableForm } from "./ModifyVariableForm";

type EditVariablesPanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

/**
 * Slide-over panel to search, view, select, and edit variables.
 * Includes search, hover details, edit form, and categorization toggles.
 */
export const EditVariablesPanel = ({
  isOpen,
  onClose,
}: EditVariablesPanelProps) => {
  const dispatch = useDispatch();
  const variables = useSelector(
    (state: any) => state.modules.activeModule.variables
  );
  const [search, setSearch] = useState("");
  const [isPrimaryOpen, setIsPrimaryOpen] = useState(false);
  const [isSecondaryOpen, setIsSecondaryOpen] = useState(false);
  const [filteredVariables, setFilteredVariables] =
    useState<Variable[]>(variables);
  const [selectedVariable, setSelectedVariable] = useState<Variable | null>(
    null
  );
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);
  const [showDescription, setShowDescription] = useState(false);
  const [editingVariable, setEditingVariable] = useState<Variable | null>(null);

  /**
   * Save changes to variable and update Redux state
   */
  const updateVariable = (updated: Variable) => {
    const updatedWithCost = {
      ...updated,
      totalCost: updated.cost.reduce((sum, c) => sum + c.value, 0),
    };

    // Update local filtered state
    setFilteredVariables((prev) =>
      prev.map((v) => (v.name === editingVariable?.name ? updatedWithCost : v))
    );

    // Dispatch Redux update
    dispatch(
      updateVariableData({
        updated: updatedWithCost,
        originalName: editingVariable?.name || updated.name,
      })
    );

    setEditingVariable(null);
  };

  /**
   * Show variable description on hover after delay
   */
  const handleHoverStart = (v: Variable) => {
    const timer = setTimeout(() => {
      setSelectedVariable(v);
      setShowDescription(true);
    }, 1500);
    setHoverTimer(timer);
  };

  /** Hide description and clear timer on hover out */
  const handleHoverEnd = () => {
    if (hoverTimer) clearTimeout(hoverTimer);
    setTimeout(() => {
      setShowDescription(false);
    }, 5500);
  };

  /** Filter variables by search query */
  useEffect(() => {
    setFilteredVariables(
      variables.filter((v: any) =>
        v.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [variables, search]);

  /** Group filtered variables by category */
  const grouped = useMemo(() => {
    return filteredVariables.reduce((acc: Record<string, Variable[]>, item) => {
      acc[item.category] = acc[item.category] || [];
      acc[item.category].push(item);
      return acc;
    }, {});
  }, [filteredVariables]);

  /** Toggle selection state of a variable */
  const toggleSelect = (v: Variable) => {
    const updated = filteredVariables.map((varItem) =>
      varItem.name === v.name
        ? { ...varItem, selected: !varItem.selected }
        : varItem
    );
    setFilteredVariables(updated);
    setSelectedVariable(v);
    dispatch(toggleVariableSelection(v.name));
  };

  return (
    <div
      style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
      className={clsx(
        "fixed inset-0 z-50 transition-all duration-300 ease-in-out",
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      )}
    >
      <div
        className={clsx(
          "absolute inset-0 bg-black/20 transition-opacity duration-300",
          isOpen ? "backdrop-blur-xs" : ""
        )}
        onClick={onClose}
      />

      <div
        className={clsx(
          "absolute top-0 right-0 h-full w-full max-w-[680px] overflow-y-scroll pt-3 shadow-lg border border-[#525252] bg-[#0E0D0D] transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center px-4 md:px-6 py-4">
          <h4 className="text-white text-xl font-medium">Edit Variables</h4>
          <button onClick={onClose}>
            <X className="text-white w-5 h-5" />
          </button>
        </div>

        <div className="px-4 md:px-6 mt-2 w-full">
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <div className="flex px-3 py-2 items-center gap-2.5 bg-[#2C2E334D] border-[0.67px] border-[#5A5A5A] rounded w-full md:w-[60%] text-white">
              <img className="p-1" src="/search.svg" alt="search" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-sm placeholder:text-white outline-none"
              />
            </div>
            <div className="flex gap-3">
              <button className="px-5 py-2 bg-[#242424] flex gap-3 items-center text-white border border-[#333] rounded text-sm">
                <img className="w-4 h-4" src="/neutralSparkle.svg" alt="" />
                Autofill
              </button>
              <button className="px-5 py-2 bg-[#23291E] text-[#C9FF3B] border-[0.67px] border-[#577113] rounded text-sm flex gap-3 items-center">
                <img src="/return.svg" alt="" />
                Rerun
              </button>
            </div>
          </div>

          {editingVariable ? (
            <ModifyVariableForm
              variable={editingVariable}
              onSave={updateVariable}
              onClose={() => setEditingVariable(null)}
            />
          ) : (
            <>
              <div className="h-80 overflow-y-scroll scrollbar bg-[#161618] border border-[#525252] mt-7 rounded p-4 md:p-7">
                {Object.entries(grouped).map(([category, vars]) => (
                  <div key={category} className="mb-6">
                    <h4 className="text-sm text-white mb-2">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {vars.map((v) => (
                        <button
                          key={v.name}
                          onClick={() => toggleSelect(v)}
                          onMouseEnter={() => handleHoverStart(v)}
                          onMouseLeave={handleHoverEnd}
                          className={`flex items-center gap-3 px-2.5 py-1.5 rounded-[20px] border-[0.5px] transition-all duration-200 text-sm mt-3
                            ${
                              v.selected
                                ? "bg-[#282E16] border-[#C9FF3B] text-[#C8E972FD]"
                                : "bg-[#5959594D] border-[#EEEEEE] text-[#D5D5D5]"
                            }`}
                        >
                          {v.name}
                          <div className="flex gap-2">
                            <img
                              className="w-3 h-3"
                              src={
                                v.selected
                                  ? "/sparkle.svg"
                                  : "/neutralSparkle.svg"
                              }
                              alt=""
                            />
                            <img
                              src={v.selected ? "/tick.svg" : "/plus.svg"}
                              alt=""
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {selectedVariable && (
                <div
                  className={clsx(
                    "transition-all duration-500 ease-in-out overflow-hidden",
                    showDescription
                      ? "max-h-[500px] opacity-100 translate-y-0"
                      : "max-h-0 opacity-0 -translate-y-2"
                  )}
                >
                  <div className="bg-[#222324] border-l border-b border-r border-[#525252] md:p-8 p-4 rounded-b">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-white flex gap-3 md:text-lg font-semibold">
                        {selectedVariable.name}
                        <Info className="w-4 h-4 text-white" />
                      </h4>
                      <button
                        onClick={() => {
                          setShowDescription(false);
                          setEditingVariable(selectedVariable);
                        }}
                        className="px-3 py-1.5 bg-[#23291E] text-[#C9FF3B] border-[0.67px] border-[#577113] rounded md:text-sm text-xs flex gap-2 items-center"
                      >
                        <Pencil className="text-[#C9FF3B] md:w-4 md:h-4 h-3 w-3" />
                        Edit
                      </button>
                    </div>
                    <p className="text-[#BBBBBB] text-xs md:text-sm font-normal">
                      {selectedVariable.description}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-6 space-y-4 transition-all duration-500">
                <div className="w-full bg-[#1c1c1c] border border-[#333] rounded-md">
                  <button
                    onClick={() => setIsPrimaryOpen(!isPrimaryOpen)}
                    className="w-full flex justify-between items-center px-4 py-3"
                  >
                    <span className="text-[#C8E972] font-medium md:text-lg">
                      Primary Variables
                    </span>
                    <div className="flex items-center justify-center w-6 h-6 md:w-10 md:h-10">
                      <div className="rounded-full border border-[#C8E972] md:px-3 px-2 py-1 md:py-2">
                        {isPrimaryOpen ? (
                          <ChevronUp className="w-3 h-5 md:w-5 md:h-5 text-[#C8E972]" />
                        ) : (
                          <ChevronDown className="w-3 h-5 md:w-5 md:h-5 text-[#C8E972]" />
                        )}
                      </div>
                    </div>
                  </button>
                  {isPrimaryOpen && (
                    <div className="px-4 py-2 text-[#C8E972] text-sm border-t border-[#333]">
                      Primary Value 1
                    </div>
                  )}
                </div>

                <div className="w-full bg-[#1c1c1c] border border-[#333] rounded-md">
                  <button
                    onClick={() => setIsSecondaryOpen(!isSecondaryOpen)}
                    className="w-full flex justify-between items-center px-4 py-3"
                  >
                    <span className="text-[#C8E972] font-medium md:text-lg">
                      Secondary Variables
                    </span>
                    <div className="flex items-center justify-center w-6 h-6 md:w-10 md:h-10">
                      <div className="rounded-full border border-[#C8E972] md:px-3 px-2 py-1.5 md:py-2">
                        {isSecondaryOpen ? (
                          <ChevronUp className="w-3 h-5 md:w-5 md:h-5 text-[#C8E972]" />
                        ) : (
                          <ChevronDown className="w-3 h-5 md:w-5 md:h-5 text-[#C8E972]" />
                        )}
                      </div>
                    </div>
                  </button>
                  {isSecondaryOpen && (
                    <div className="px-4 py-2 text-[#C8E972] text-sm border-t border-[#333]">
                      Secondary Value 1
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
