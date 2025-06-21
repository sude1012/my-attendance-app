import PrimaryButton from "../buttons/PrimaryButton";
function Confirmation({
  fullName = "",
  onCancel,
  onConfirm,
  currentDate,
  currentTime,
  indraNumber = "",
}) {
  return (
    <div
      className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
    w-92 h-92  shadow-lg
    flex flex-col justify-center items-center border-2 border-[#004254] bg-[#E3E2DA] rounded-lg p-4 my-4
    sm:w-[32rem] sm:p-4 md:w-[35rem]"
    >
      <div>
        <h1 className="text-[#004254] text-4xl font-bold">Confirm Time In?</h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        <ul className="text-lg text-[#004254] flex flex-col gap-1 mt-4">
          <li className="text-[#004254] font-bold">{`Indra No.: ${indraNumber}`}</li>
          <li className="text-[#004254] font-bold">
            Name: <span>{fullName}</span>
          </li>
          <li className="text-[#004254]">{`Date and Time: ${currentDate} ${currentTime}`}</li>
        </ul>
      </div>
      <div className="flex flex-row justify-center items-center mt-4 gap-2">
        <PrimaryButton className="mt-4 bg-red-300" onClick={onConfirm}>
          <span>Confirm</span>
        </PrimaryButton>
        <PrimaryButton className="mt-2" onClick={onCancel}>
          <span>Cancel</span>
        </PrimaryButton>
      </div>
    </div>
  );
}

export default Confirmation;
