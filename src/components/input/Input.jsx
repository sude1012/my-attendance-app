function Input({ fullName, setFullName, indraPersons }) {
  return (
    <div className="flex flex-col w-full max-w-xs 2xl:m-1">
      <label
        className="text-2xl font-medium text-[#004254] mb-1
      sm:text-3xl"
      >
        Business Analyst Name:
      </label>
      <select
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="border-2 border-[#004254] ring-[#004254] rounded-lg px-5 py-2 text-lg font-medium text-[#004254] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004254] transition duration-200 ease-in-out w-full"
      >
        <option value="">Select Name</option>
        {indraPersons.map((item) => (
          <option key={item.indra_number} value={item.full_name}>
            {item.full_name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Input;
