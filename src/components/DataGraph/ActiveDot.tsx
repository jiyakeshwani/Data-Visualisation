import { type DotProps } from "recharts";

/**
 * ActiveDot Component
 *
 * Custom active dot renderer used in Recharts `<Line />` components.
 * Displays a larger, subtle glowing ring effect around the active point on hover.
 *
 * @param props - Props passed by Recharts containing the active dot's coordinates.
 * @returns A small circle surrounding the active dot for emphasis.
 */
export const ActiveDot = (props: DotProps) => {
  const { cx, cy } = props;

  // Safety check: if coordinates are not available, render nothing
  if (cx == null || cy == null) return null;

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={10}
        fill="none"
        stroke="#b4ff39"
        strokeWidth={1}
        opacity={0.3}
      />
    </g>
  );
};
