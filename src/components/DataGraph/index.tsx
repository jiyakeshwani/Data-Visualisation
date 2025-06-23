/* eslint-disable @typescript-eslint/no-explicit-any */

import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  CartesianGrid,
  Customized,
  Line,
  LineChart,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ActiveDot } from "./ActiveDot";
import { CustomTooltip } from "./CustomTooltip";

/**
 * DataGraph Component
 *
 * Renders a line chart visualizing the cost breakdown of a selected variable.
 * Allows user to switch between selected variables via a custom dropdown.
 * Highlights the max value point on the graph.
 */
export const DataGraph = () => {
  const variables = useSelector(
    (state: any) => state.modules.activeModule.variables
  );

  const options = variables.filter((v: any) => v.selected === true);

  const [metric, setMetric] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const data = metric.cost;

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Find index of highest cost value
  const maxIndex = data.reduce(
    (acc: any, cur: any, i: number, arr: any) =>
      cur.value > arr[acc].value ? i : acc,
    0
  );

  const maxData = data[maxIndex];

  return (
    <div
      style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
      className="bg-[#222324] rounded md:p-7 py-4 border mt-4 border-[#525252] text-white"
    >
      <div
        className="flex justify-end mr-3 mb-4 rounded-md relative"
        ref={dropdownRef}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between pr-1 w-[200px] pl-3 py-1 text-sm text-white bg-[#18181A80] border border-[#525252] rounded"
        >
          {metric.name}
          <ChevronDown
            className={clsx(
              "h-5 w-5 ml-3 transition-transform duration-300",
              isOpen && "rotate-180"
            )}
          />
        </button>

        <div
          className={clsx(
            "absolute right-0 top-[110%] z-10 w-48 bg-black border border-[#525252] rounded-md shadow-lg transition-all duration-300 overflow-hidden",
            isOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
          )}
        >
          {options.map((option: any, i: number) => (
            <div
              key={i}
              onClick={() => {
                setMetric(option);
                setIsOpen(false);
              }}
              className={clsx(
                "px-4 py-2 text-sm text-white hover:bg-[#2a2a2a] cursor-pointer",
                option.name === metric.name && "bg-[#2a2a2a]"
              )}
            >
              {option.name}
            </div>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid
            vertical={false}
            stroke="#343434"
            strokeWidth={"0.77px"}
          />

          <XAxis
            dataKey="name"
            stroke="#575757"
            tickMargin={15}
            padding={{ left: 20, right: 20 }}
            tickLine={false}
            axisLine={true}
            style={{ fontSize: "12px", fill: "white" }}
          />

          <YAxis
            stroke="#575757"
            ticks={[20000, 40000, 60000, 80000, 100000]}
            axisLine={true}
            tickMargin={15}
            tickLine={false}
            style={{ fontSize: "12px", fill: "white", paddingLeft: "1rem" }}
            tickFormatter={(v) => `$${v / 1000}K`}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "#444", strokeWidth: 1 }}
          />

          <Customized
            component={({
              points,
            }: {
              points?: { x: number; y: number }[];
            }) => {
              if (!points) return null;
              return (
                <g>
                  {points.map(({ x, y }, i) => (
                    <line
                      key={i}
                      x1={x}
                      y1={y}
                      x2={x}
                      y2={y + 30}
                      stroke="#8AA14F33"
                      strokeWidth={i === maxIndex ? 3 : 2.3}
                      strokeOpacity={i === maxIndex ? 0.8 : 0.3}
                      style={
                        i === maxIndex
                          ? { filter: "drop-shadow(0 0 6px #b4ff39)" }
                          : undefined
                      }
                    />
                  ))}
                </g>
              );
            }}
          />

          <Line
            type="linear"
            dataKey="value"
            stroke="#C8E972"
            strokeWidth={3}
            dot={({ cx, cy, index }) => (
              <circle
                cx={cx}
                cy={cy}
                r={index === maxIndex ? 6 : 5}
                fill="#222324"
                stroke="#C8E972"
                strokeWidth={3}
                style={
                  index === maxIndex
                    ? {
                        filter: "drop-shadow(0 0 6px #C8E972)",
                      }
                    : {}
                }
              />
            )}
            activeDot={<ActiveDot />}
          />

          <ReferenceDot
            x={maxData.name}
            y={maxData.value}
            r={6}
            fill="#222324"
            stroke="#C8E972"
            strokeWidth={3}
            isFront={true}
          />

          <ReferenceLine
            x={maxData.name}
            stroke="#C8E972"
            strokeWidth={2}
            strokeDasharray="6 4"
            ifOverflow="extendDomain"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
