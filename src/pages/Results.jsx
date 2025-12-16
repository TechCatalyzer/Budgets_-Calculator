import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Buttons";
import { formatHours as formatHoursText } from "../components/script";

const Results = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { calculationResult, calculationError } = state || {};

  const formatDateDisplay = (value) => {
    if (!value) return "--";
    const date = new Date(value);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatAllowance = (allowance = {}) => {
    if (!allowance.eligible) return "Not eligible";
    return `Eligible • US$${Number(allowance.amount || 0).toFixed(2)}`;
  };

  if (!calculationResult && !calculationError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No results found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-BLUE py-10">
      <Header />

      <div className="bg-WHITE mt-6 mx-auto w-[90%] md:w-[80%] p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-DARKGRAY mb-4">
          Travel & Subsistence Results
        </h2>

        {calculationError && (
          <p className="text-red-600 font-medium">{calculationError}</p>
        )}

        {calculationResult && (
          <>
            {/* SUMMARY */}
            <div className="bg-gray-100 border rounded-lg p-4 space-y-3">
              <Paragraph
                label="Total Payment"
                value={`US$${calculationResult.summary.totalPayment.toFixed(2)}`}
              />
              <Paragraph
                label="Total DSA"
                value={`US$${calculationResult.summary.totalDSA.toFixed(2)}`}
              />
              <Paragraph
                label="Trip Duration"
                value={`${calculationResult.summary.totalDurationDays.toFixed(
                  2
                )} days`}
              />
              <Paragraph
                label="Outbound Travel"
                value={formatHoursText(calculationResult.summary.outboundHours)}
              />
              <Paragraph
                label="Return Travel"
                value={formatHoursText(calculationResult.summary.returnHours)}
              />
            </div>

            {/* DAY BY DAY */}
            {calculationResult.dayByDay?.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">
                  Daily Eligibility Breakdown
                </h3>

                <div className="space-y-4">
                  {calculationResult.dayByDay.map((day) => (
                    <div
                      key={day.dayNumber}
                      className="border rounded-lg p-4 bg-white"
                    >
                      <p className="font-semibold">
                        Day {day.dayNumber} – {formatDateDisplay(day.date)}
                      </p>

                      <p className="text-sm text-gray-600">
                        Location: {day.location}
                      </p>

                      <p className="text-sm font-medium">
                        Daily Total: US$
                        {Number(day.dayTotal || 0).toFixed(2)}
                      </p>

                      <div className="grid md:grid-cols-2 gap-3 mt-3">
                        {Object.entries(day.allowances).map(([key, value]) => (
                          <div key={key} className="bg-gray-50 p-3 rounded">
                            <p className="text-xs uppercase text-gray-500">
                              {key}
                            </p>
                            <p>{formatAllowance(value)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        <div className="flex justify-center mt-6">
          <Button label="Back to Form" onClick={() => navigate("/")} />
        </div>
      </div>
    </div>
  );
};

export default Results;
