const SelectInput = ({ label, value, onChange, options }) => {
  return (
    <div className="mb-6">
<<<<<<< HEAD
      LUE
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <select className="w-full bg-transparent placeholder:text-LIGHTGRAY text-DARKBLUE text-sm border border-LIGHTGRAY rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
        {options.map((option, index) => {
          return <option key={index}>{option}</option>;
        })}
=======
      <label className=" font-medium mb-2">{label}</label>
      <select className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#003366] focus:outline-none">
        value={value}
        onChange={onChange}
       <option value="">Select</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
>>>>>>> c8a7bb4edd9d6b6b21edd89e0a7ce79423e38dd7
      </select>
    </div>
  );
};

export default SelectInput;
