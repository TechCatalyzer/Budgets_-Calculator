const SelectInput = ({ label, options }) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <select className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#003366] focus:outline-none">
        {options.map((option, index) => {
          return <option key={index}>{option}</option>;
        })}
      </select>
    </div>
  );
};

export default SelectInput;
