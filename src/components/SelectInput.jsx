const SelectInput = ({ label, options }) => {
  return (
    <div className="mb-6">
      LUE
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <select className="w-full bg-transparent placeholder:text-LIGHTGRAY text-DARKBLUE text-sm border border-LIGHTGRAY rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
        {options.map((option, index) => {
          return <option key={index}>{option}</option>;
        })}
      </select>
    </div>
  );
};

export default SelectInput;
