/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ActiveModule from "@/components/ActiveModule";
import { EditVariablesPanel } from "@/components/Variables/EditVariableCard";
import { setActiveModule } from "@/redux/modulesSlice";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const activeModule = useSelector((state: any) => state.modules.activeModule);
  const modules = useSelector((state: any) => state.modules.modules);
  const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);

  /**
   * Handles module tab click and updates active module state
   */
  const handleModuleChange = (module: any) => {
    dispatch(setActiveModule(module));
  };

  return (
    <div className="min-h-screen bg-[var(--bg-dark-primary)] text-white flex">
      {/* Slide-over Edit Variables Panel */}
      <EditVariablesPanel
        isOpen={isEditPanelOpen}
        onClose={() => setIsEditPanelOpen(false)}
      />

      {/* Sidebar */}
      <aside className="px-4 hidden md:flex bg-[var(--bg-dark-primary)] flex-col justify-between items-center pt-5 pb-7 border-l border-gray-800">
        {/* Top Sidebar Icons */}
        <div className="space-y-6 flex flex-col">
          <SidebarIcon icon="/bars.svg" alt="bars" />
          <SidebarIcon icon="/home.svg" alt="home" bordered />
          <SidebarIcon icon="/bell.svg" alt="bell" />
          <SidebarIcon icon="/calender.svg" alt="calendar" />
          <SidebarIcon icon="/cloud.svg" alt="cloud" />
          <SidebarIcon icon="/setting.svg" alt="setting" />
        </div>

        {/* User Icon */}
        <button className="text-white">
          <img src="/user.svg" alt="user" />
        </button>
      </aside>

      {/* Main Dashboard Area */}
      <main className="flex-1 px-4 md:pl-1.5 md:pr-0 py-5 bg-[var(--bg-dark-primary)]">
        {/* Top Header: Modules and Search */}
        <div className="flex flex-col md:flex-row justify-between pr-0 md:pr-6 items-center mb-5 bg-[var(--bg-dark-primary)]">
          {/* Module Tabs */}
          <div className="flex gap-2.5 ml-0 md:ml-3 items-center">
            {modules.map((module: any, i: number) => (
              <button
                key={i}
                onClick={() => handleModuleChange(module)}
                className={`capitalize px-4 py-[7px] text-sm rounded-[5px] ${
                  activeModule.name === module.name
                    ? "border-[0.7px] border-[#525252] bg-[#262525]"
                    : ""
                }`}
              >
                {module.name}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="flex w-full md:w-auto mt-5 md:mt-0 px-3 py-2 items-center gap-2.5 border-[0.7px] border-[#525252] rounded-md text-white">
            <img className="p-1" src="/search.svg" alt="search" />
            <input
              type="text"
              placeholder="Search"
              className="text-sm placeholder:text-white outline-none bg-transparent w-full"
            />
          </div>
        </div>

        {/* Active Module Content */}
        <ActiveModule setIsEditPanelOpen={setIsEditPanelOpen} />
      </main>
    </div>
  );
};

/**
 * SidebarIcon - Reusable icon button for the sidebar
 */
const SidebarIcon = ({
  icon,
  alt,
  bordered = false,
}: {
  icon: string;
  alt: string;
  bordered?: boolean;
}) => {
  return (
    <button
      className={`p-2 ${
        bordered
          ? "border-[0.5px] border-[#525252] bg-[#262525] rounded-lg"
          : ""
      }`}
    >
      <img src={icon} alt={alt} />
    </button>
  );
};
