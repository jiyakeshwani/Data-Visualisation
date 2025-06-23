/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Module, Variable } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { moduleData } from "../dummyContent";

type modulesState = {
  modules: Module[];
  activeModule: Module | null;
};

const initialState: modulesState = {
  modules: moduleData,
  activeModule: moduleData[0],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setActiveModule: (state: any, action: any) => {
      state.activeModule = action.payload;
    },
    toggleVariableSelection: (state: any, action: PayloadAction<string>) => {
      const variableName = action.payload as string;
      const updatedVariables = state.activeModule.variables.map(
        (variable: any) =>
          variable.name === variableName
            ? { ...variable, selected: !variable.selected }
            : variable
      );
      state.activeModule.variables = updatedVariables;
    },
    updateVariableData: (
      state,
      action: PayloadAction<{ updated: Variable; originalName: string }>
    ) => {
      const { updated, originalName } = action.payload;

      const index = state.activeModule?.variables.findIndex(
        (v) => v.name === originalName
      );

      if (index !== undefined && index !== -1 && state.activeModule) {
        state.activeModule.variables[index] = updated;
      }
    },
  },
});
export const { setActiveModule, toggleVariableSelection, updateVariableData } =
  modulesSlice.actions;
export default modulesSlice.reducer;
