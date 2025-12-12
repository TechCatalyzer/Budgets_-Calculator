const Paragraph = (value, label) => {
  return (
    <div className="bg-WHITE rounded p-3 shadow-sm">
        <p className="text-gray-500">{label}</p>
        <p className="flex flex-col md:flex-row md:flex-wrap gap-3 text-sm">{value}</p>
    </div>
  )
}

export default Paragraph