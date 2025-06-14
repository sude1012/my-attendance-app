function InputValidation() {
  return (
    <div>
      <div className="mb-5">
        <label
          for="username-success"
          className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500"
        >
          Your name
        </label>
        <input
          type="text"
          id="username-success"
          className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
          placeholder="Bonnie Green"
        />
        <p className="mt-2 text-sm text-green-600 dark:text-green-500">
          <span className="font-medium">Alright!</span> Username available!
        </p>
      </div>
    </div>
  );
}

export default InputValidation;
