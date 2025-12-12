
const TextInput = ({ label, placeholder, input_type, value, onChange, name }) => {
  
  return (
    <div className="mb-6">
      <label className="block text-DARKGRAY-xl font-medium mb-2">{label}</label>
      <input
        type={input_type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className="w-full bg-transparent placeholder:text-LIGHTGRAY text-DARKGRAY text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none"
      />
    </div>
  );
};

export default TextInput;
