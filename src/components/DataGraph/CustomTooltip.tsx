import { CircleQuestionMark } from "lucide-react";
import { useEffect, useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * CustomTooltip Component
 *
 * A custom tooltip used in Recharts for displaying rich hover data
 * for each data point in a LineChart. It compares the hovered value
 * against a predefined target and displays the difference in %
 * along with an arrow and styling based on performance. In our case
 * this will show information about each data point of a variable
 *
 * @param {Object} props
 * @param {boolean} props.active - Indicates if tooltip is active
 * @param {Array} props.payload - Data payload for the hovered point
 * @param {Object} props.coordinate - x and y screen coordinates of the hovered point
 *
 * @returns {JSX.Element | null} The styled tooltip with animated visibility
 */
export const CustomTooltip = ({ active, payload, coordinate }: any) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (active && payload?.length && coordinate) {
      setVisible(true);
    } else {
      timeout = setTimeout(() => setVisible(false), 200);
    }

    return () => clearTimeout(timeout);
  }, [active, payload, coordinate]);

  if (!payload?.length || !coordinate) return null;

  const value = payload[0].value;
  const targetValue = 60000;
  const diff = value - targetValue;
  const percentage = (diff / targetValue) * 100;
  const isPositive = percentage >= 0;

  return (
    <div
      className={`absolute z-50 w-[200px] p-5 border rounded shadow-lg bg-[#222324] border-[#525252] transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{
        left: coordinate.x - 80,
        top: coordinate.y - 90,
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-xl font-bold text-white">
          ${(value / 1000).toFixed(2)}k
        </span>
        <CircleQuestionMark className="text-[#878787] w-5 h-5" />
      </div>

      <div className="flex items-center text-sm mt-1">
        <div
          className={`w-4 h-4 rounded-full border flex items-center justify-center mr-3 text-xs ${
            isPositive
              ? "border-[var(--green-primary)] text-[var(--green-primary)] bg-[#C8E97233]"
              : "border-red-500 text-red-500 bg-red-500/10"
          }`}
        >
          {isPositive ? "↑" : "↓"}
        </div>
        <span className="text-[#878787]">
          {Math.abs(percentage).toFixed(1)}% {isPositive ? "above" : "below"}{" "}
          target
        </span>
      </div>
    </div>
  );
};
