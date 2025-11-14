const SelectInput = ({ label, value, onChange, options, name }) => {
  return (
    <div className="mb-6">
      <label className=" font-medium mb-2">{label}</label>
      <select
        className="w-full bg-transparent placeholder:text-LIGHTGRAY text-DARKGRAY text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
        value={value}
        onChange={onChange}
        name={name}
      >
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
