const PerDiemInput = ({ label = "Per Diem rate for Destination Country", placeholder = "Select Destination Country First", onChange, value }) => {
  return (
    <div className="mb-6">
        <label className="block text-DARKGRAY-xl font-medium mb-2">{label}</label>

        <input
        type="text"
        placeholder={placeholder}
        readOnly
        className="w-full bg-transparent placeholder:text-LIGHTGRAY text-DARKGRAY text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default PerDiemInput