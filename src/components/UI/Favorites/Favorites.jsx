import React from "react";

export const Favorites = ({ className, count = 0 }) => {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.501 5.501 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"
          stroke="#1C1B1B"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {count > 0 && (
        <svg
          style={{ position: "absolute", top: -6, right: -8 }}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="2"
            y="2"
            width="20"
            height="20"
            rx="10"
            fill="#FB4E4E"
          />
          <text
            x="12"
            y="13"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="11"
            fontWeight="bold"
            fill="white"
          >
            {count > 99 ? "99+" : count}
          </text>
        </svg>
      )}
    </div>
  );
};
