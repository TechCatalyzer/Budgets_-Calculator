const TextArea = ({ placeholder, label, value, onChange, name}) => {
  return (
    <div className="mb-6">
      <label className="block text-DARKGRAY-700 font-medium mb-2">
        {label}
      </label>
      <textarea
        className="w-full bg-transparent placeholder:text-LIGHTGRAY text-DARKGRAY text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none"
        placeholder={placeholder}
        rows="3"
        value={value}
        name={name}
        onChange={onChange}
      ></textarea>
    </div>
  );
};

export default TextArea;
