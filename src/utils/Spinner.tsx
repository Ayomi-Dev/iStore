// components/Spinner.tsx
import React from "react";

type SpinnerProps = {
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-12 h-12",
  lg: "w-16 h-16",
};

const Spinner: React.FC<SpinnerProps> = ({ size = "md" }) => {
  return (
    <div
      className={`relative ${sizeClasses[size]}`}
    >
      {/* Animated gradient circle */}
      <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-blue-500 animate-spin"></div>
      
      {/* Inner circle for thickness control */}
      <div className="absolute inset-2 rounded-full bg-transparent"></div>
    </div>
  );
};

export default Spinner;
