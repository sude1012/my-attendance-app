import { useState } from "react";

function PrimaryButton({ children, onClick, className = "" }) {
  const [isClicked] = useState(false);

  return (
    <div>
      <button
        onClick={onClick}
        className={
          isClicked
            ? "cursor-pointer bg-[#004254]/75 text-white font-bold py-5 w-40 m-2 sm:w-56 md:w-64 rounded-[0.75rem] transition duration-100 ease-in-out hover:bg-[#004254]/75 " +
              className
            : "cursor-pointer bg-[#004254] text-white font-bold py-5 w-40 m-2 sm:w-56 md:w-64 rounded-[0.75rem] transition duration-100 ease-in-out hover:bg-[#004254]/75"
        }
      >
        <span className="text-lg">{children}</span>
      </button>
    </div>
  );
}

export default PrimaryButton;
