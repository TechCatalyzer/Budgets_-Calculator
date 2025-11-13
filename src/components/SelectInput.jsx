const SelectInput = ({ label, value, onChange, options }) => {
  return (
    <div className="mb-6">
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
      </select>
    </div>
  );
};

export default SelectInput;
