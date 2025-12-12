const ParagraphResuls = (label, value) => {
  return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
        <div className="bg-gray-50 rounded p-3">
        <p className="text-gray-500 text-xs uppercase mb-1">{label}</p>
        <p className="font-medium">{value}</p>
        </div>
    </div>
  )
}

export default ParagraphResuls