const Pagination = ({ step, setStep, totalSteps = 4 }) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-8 text-lg font-semibold">
      
      {/* Previous Button */}
      <button
        type="button"
        onClick={() => step > 1 && setStep(step - 1)}
        className={`px-3 py-1 rounded ${
          step > 1
            ? "text-BLUE hover:bg-gray-200 cursor-pointer"
            : "text-gray-300 cursor-not-allowed"
        }`}
      >
        &lt;
      </button>

      {/* Page Numbers */}
      {[...Array(totalSteps)].map((_, index) => {
        const num = index + 1;
        return (
          <button
            key={num}
            type="button"
            onClick={() => setStep(num)}
            className={`px-3 py-1 rounded transition-all ${
              step === num
                ? "bg-BLUE text-white scale-110 shadow"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {num}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        type="button"
        onClick={() => step < totalSteps && setStep(step + 1)}
        className={`px-3 py-1 rounded ${
          step < totalSteps
            ? "text-BLUE hover:bg-gray-200 cursor-pointer"
            : "text-gray-300 cursor-not-allowed"
        }`}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
