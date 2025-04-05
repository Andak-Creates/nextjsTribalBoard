import React from "react";

type ProgressProps = {
  value: number; // Percentage (0 - 100)
  size?: number; // Optional size
  strokeWidth?: number; // Optional stroke width
  color?: string; // Stroke color
  inside?: boolean;
};

export default function ProgressCircle({
  value,
  size = 100,
  strokeWidth = 8,
  color = "blue",
  inside = false,
}: ProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / 100) * circumference;

  return (
    <div className="flex items-center gap-1">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        //   className="rotate-[-90deg]" // Rotates to start from top
      >
        {/* Transparent Circle for Border Effect */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(0,0,0,0.1)" // Light transparent border effect
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Circle (Border Look) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color} // Dynamic color
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />
        {/* Percentage Text */}
        {inside && (
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="18"
            fill="black"
          >
            {value}%
          </text>
        )}
      </svg>
      {!inside && <p className="text-[15px] text-black">{value}%</p>}
    </div>
  );
}
