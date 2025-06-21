import { useState } from "react";

function SecondaryButton({ children }) {
  const [isClicked, setIsClicked] = useState(false);

  function handleClick() {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 100); // Revert after 1 second
  }
  return (
    <div>
      <button
        onClick={handleClick}
        className={
          isClicked
            ? "cursor-pointer bg-[#004254]/75 text-white font-bold py-2 w-44 m-2 sm:w-60 sm:h-15 md:w-64 rounded-[0.75rem] transition duration-100 ease-in-out hover:bg-[#004254]/75"
            : "cursor-pointer bg-[#004254] text-white font-bold py-2 w-44 m-2 sm:w-60 sm:h-15 md:w-64 rounded-[0.75rem] transition duration-100 ease-in-out hover:bg-[#004254]/75"
        }
      >
        <span className="text-lg">{children}</span>
      </button>
    </div>
  );
}

export default SecondaryButton;
