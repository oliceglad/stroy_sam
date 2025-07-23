export const Cart = ({ className, count = 0 }) => {
  return (
    <div style={{ position: "relative" }}>
      <svg
        width="49"
        height="48"
        viewBox="0 0 49 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M18 37C19.1046 37 20 36.1046 20 35C20 33.8954 19.1046 33 18 33C16.8954 33 16 33.8954 16 35C16 36.1046 16.8954 37 18 37Z"
          fill="#1C1B1B"
        />
        <path
          d="M31 37C32.1046 37 33 36.1046 33 35C33 33.8954 32.1046 33 31 33C29.8954 33 29 33.8954 29 35C29 36.1046 29.8954 37 31 37Z"
          fill="#1C1B1B"
        />
        <path
          d="M13.2875 17H35.7125L32.4125 28.55C32.2948 28.9692 32.0426 29.3381 31.6948 29.6001C31.3471 29.862 30.9229 30.0025 30.4875 30H18.5125C18.0771 30.0025 17.6529 29.862 17.3052 29.6001C16.9574 29.3381 16.7052 28.9692 16.5875 28.55L12.0625 12.725C12.0027 12.5159 11.8764 12.3321 11.7027 12.2012C11.529 12.0704 11.3174 11.9998 11.1 12H9"
          stroke="#1C1B1B"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {count > 0 && (
          <>
            <rect
              x="23.25"
              y="3.25"
              width="21.5"
              height="21.5"
              rx="10.75"
              fill="#FB4E4E"
            />
            <text
              x="34"
              y="18"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="12"
              fontWeight="bold"
              fill="white"
            >
              {count > 99 ? "99+" : count}
            </text>
          </>
        )}
      </svg>
    </div>
  );
};
