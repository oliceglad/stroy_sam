export const Cart = ({ className, count = 0 }) => {
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
          d="M9 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
          fill="#1C1B1B"
        />
        <path
          d="M20 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
          fill="#1C1B1B"
        />
        <path
          d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
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
