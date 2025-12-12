import { useState } from "react";
import Header from "./Header";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import TextArea from "./TextAreaInput";
import Button from "./Buttons";
import Headers from "./Headers";
import countryRates from "../data/Country";
import PerDiemInput from "./PerDiemInput";
import Paragraph from "./Paragraph";
import calculateTravelAndSubsistence, { formatHours as formatHoursText } from "./script";

const JourneyDetails = () => {
  const source = ["Government of Zimbabwe", "External Entity (Non-Government)"];
  const grades = [
    "Ministers and Deputy Ministers",
    "Accounting Officers",
    "Accounting Officers (Non-Accounting)",
    "Chief Directors",
    "Directors",
    "Deputy Directors",
    "Officers",
  ];

  const gradeMap = {
    "Ministers and Deputy Ministers": "minister",
    "Accounting Officers": "accounting",
    "Accounting Officers (Non-Accounting)": "accounting_non",
    "Chief Directors": "chief_director",
    "Directors": "director",
    "Deputy Directors": "deputy_director",
    "Officers": "officer",
  };

  const countryOptions = Object.keys(countryRates);
  const formatHoursDisplay = (hours = 0) => formatHoursText(hours || 0);

  const formatDateDisplay = (value) => {
    if (!value) return "--";
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return "--";
    return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  };

  const formatAllowance = (allowance = {}) => {
    if (!allowance.eligible) return "Not eligible";
    const amount = Number(allowance.amount || 0).toFixed(2);
    return `Eligible • US$${amount}`;
  };

  const [step, setStep] = useState(1);

  const [tripDetails, setTripDetails] = useState({
    name: "",
    ecNumber: "",
    grade: "",
    purpose: "",
    departure: "",
    destination: "",
    departureDate: "",
    arrivalDate: "",
    returnDeparture: "",
    returnDestination: "",
    returnDepartureDate: "",
    returnArrivalDate: "",
    source: "",
    perDiem: "",
  });

  const [outboundRoutes, setOutboundRoutes] = useState([
    { departure: "", destination: "", departureDate: "", arrivalDate: "", perDiem: "" },
  ]);

  const [returnRoutes, setReturnRoutes] = useState([
    { departure: "", destination: "", departureDate: "", arrivalDate: "", perDiem: "" },
  ]);

  const [calculationResult, setCalculationResult] = useState(null);
  const [calculationError, setCalculationError] = useState("");

  const handleReset = () => {
    setTripDetails({
      name: "",
      ecNumber: "",
      grade: "",
      purpose: "",
      departure: "",
      destination: "",
      departureDate: "",
      arrivalDate: "",
      returnDeparture: "",
      returnDestination: "",
      returnDepartureDate: "",
      returnArrivalDate: "",
      source: "",
      perDiem: "",
    });

    setOutboundRoutes([{ departure: "", destination: "", departureDate: "", arrivalDate: "", perDiem: "" }]);
    setReturnRoutes([{ departure: "", destination: "", departureDate: "", arrivalDate: "", perDiem: "" }]);

    setCalculationResult(null);
    setCalculationError("");
    setStep(1);
  };

  const addOutboundRoute = () => {
    setOutboundRoutes((prev) => [...prev, { departure: "", destination: "", departureDate: "", arrivalDate: "", perDiem: "" }]);
  };

  const addReturnRoute = () => {
    setReturnRoutes((prev) => [...prev, { departure: "", destination: "", departureDate: "", arrivalDate: "", perDiem: "" }]);
  };

  const updateOutboundRoute = (index, field, value) => {
    setOutboundRoutes((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      if (field === "destination") updated[index].perDiem = countryRates[value] ?? "";
      return updated;
    });
  };

  const updateReturnRoute = (index, field, value) => {
    setReturnRoutes((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      if (field === "destination") updated[index].perDiem = countryRates[value] ?? "";
      return updated;
    });
  };

  const deleteOutboundRoute = (index) =>
    setOutboundRoutes((prev) => prev.filter((_, i) => i !== index));

  const deleteReturnRoute = (index) =>
    setReturnRoutes((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = (e) => e.preventDefault();

  const handleCalculate = () => {
    setCalculationError("");
    try {
      const gradeKey = gradeMap[tripDetails.grade];
      const fundingKey =
        tripDetails.source === "External Entity (Non-Government)" ? "external" : "government";

      const result = calculateTravelAndSubsistence({
        grade: gradeKey,
        purpose: tripDetails.purpose,
        fundingSource: fundingKey,
        outboundRoutes,
        returnRoutes,
      });

      setCalculationResult(result);
      setStep(4);
    } catch (error) {
      setCalculationResult(null);
      setCalculationError(error.message);
      setStep(4);
    }
  };

  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setTripDetails({ ...tripDetails, [name]: value });
  };


  const HandleRouteChange = (index, field) => (e) => {
    updateOutboundRoute(index, field, e.target.value);
  };

  const HandleReturnRouteChange = (index, field) => (e) => {
    updateReturnRoute(index, field, e.target.value);
  };

  return (
    <div className="min-h-screen bg-BLUE flex flex-col items-center justify-start py-10">
      <Header />

      <div className="bg-WHITE mt-4 rounded-lg shadow-lg w-[90%] md:w-[80%] p-8">
        <form className="w-full" onSubmit={handleSubmit}>
          
          {/* --------------- STEP 1 --------------- */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-semibold text-DARKGRAY mb-4">Trip Details</h2>

              <hr className="border-BLUE mb-6" />

              <div className="w-full flex gap-8">
                <div className="w-1/2">
                  <TextInput
                    label="Name"
                    placeholder="Enter Full Name"
                    value={tripDetails.name}
                    name="name"
                    onChange={HandleInputChange}
                  />
                </div>

                <div className="w-1/2">
                  <TextInput
                    label="EC Number"
                    placeholder="Enter EC Number"
                    value={tripDetails.ecNumber}
                    name="ecNumber"
                    onChange={HandleInputChange}
                  />
                </div>
              </div>

              <SelectInput
                label="Select Grade"
                options={grades}
                value={tripDetails.grade}
                name="grade"
                onChange={HandleInputChange}
              />

              <TextArea
                label="Purpose of the journey"
                placeholder="Enter the purpose of the journey..."
                value={tripDetails.purpose}
                name="purpose"
                onChange={HandleInputChange}
              />

              <div className="flex justify-end mt-4">
                <Button label="Reset" onClick={handleReset} />
              </div>

              {/* Pagination */}
              <Pagination step={step} setStep={setStep} />
            </div>
          )}

          {/* --------------- STEP 2: OUTBOUND ROUTES --------------- */}
          {step === 2 && (
            <div>
              <Headers h3="Outbound Journey" />

              {outboundRoutes.map((route, index) => (
                <div key={index} className="border border-BLUE p-4 rounded-lg mb-4 relative">
                  <button
                    type="button"
                    onClick={() => deleteOutboundRoute(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                  >
                    ×
                  </button>

                  <h3 className="text-xl font-bold text-BLUE mb-3">
                    Outbound Route {index + 1}
                  </h3>

                  <SelectInput
                    label="Departure Country"
                    value={route.departure}
                    options={countryOptions}
                    onChange={HandleRouteChange(index, "departure")}
                  />

                  <SelectInput
                    label="Destination Country"
                    value={route.destination}
                    options={countryOptions}
                    onChange={HandleRouteChange(index, "destination")}
                  />

                  <PerDiemInput value={route.perDiem} />

                  <TextInput
                    label="Departure Date & Time"
                    input_type="datetime-local"
                    value={route.departureDate}
                    onChange={HandleRouteChange(index, "departureDate")}
                  />

                  <TextInput
                    label="Arrival Date & Time"
                    input_type="datetime-local"
                    value={route.arrivalDate}
                    onChange={HandleRouteChange(index, "arrivalDate")}
                  />
                </div>
              ))}

              <div className="flex justify-center">
                <Button label="Add Another Route" onClick={addOutboundRoute} />
              </div>

              <Pagination step={step} setStep={setStep} />
            </div>
          )}

          {/* --------------- STEP 3: RETURN ROUTES --------------- */}
          {step === 3 && (
            <div>
              <Headers h3="Return Journey" />

              {returnRoutes.map((route, index) => (
                <div key={index} className="border border-BLUE p-4 rounded-lg mb-4 relative">
                  <button
                    type="button"
                    onClick={() => deleteReturnRoute(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                  >
                    ×
                  </button>

                  <h3 className="text-xl font-bold text-BLUE mb-3">Return Route {index + 1}</h3>

                  <SelectInput
                    label="Return Departure Country"
                    value={route.departure}
                    options={countryOptions}
                    onChange={HandleReturnRouteChange(index, "departure")}
                  />

                  <SelectInput
                    label="Return Destination Country"
                    value={route.destination}
                    options={countryOptions}
                    onChange={HandleReturnRouteChange(index, "destination")}
                  />

                  <PerDiemInput value={route.perDiem} />

                  <TextInput
                    label="Return Departure Date & Time"
                    input_type="datetime-local"
                    value={route.departureDate}
                    onChange={HandleReturnRouteChange(index, "departureDate")}
                  />

                  <TextInput
                    label="Return Arrival Date & Time"
                    input_type="datetime-local"
                    value={route.arrivalDate}
                    onChange={HandleReturnRouteChange(index, "arrivalDate")}
                  />
                </div>
              ))}

              <Button label="Add Another Return Route" onClick={addReturnRoute} />

              <Pagination step={step} setStep={setStep} />
            </div>
          )}

          {/* --------------- STEP 4: SUMMARY --------------- */}
          {step === 4 && (
            <div>
              <SelectInput
                label="Funding Source"
                options={source}
                value={tripDetails.source}
                name="source"
                onChange={HandleInputChange}
              />

              {calculationError && (
                <p className="text-red-600 font-medium mt-4">{calculationError}</p>
              )}

              {calculationResult && (
                <div className="mt-6 bg-gray-100 border border-gray-200 rounded-lg p-4 space-y-3">
                  <h3 className="text-xl font-semibold text-DARKGRAY">Summary</h3>
                  <p className="text-sm text-gray-600">{calculationResult.summary.purpose}</p>
                  {/*<p className="text-sm text-gray-600">{calculationResult.summary.name}</p>
                  //<p className="text-sm text-gray-600">{calculationResult.summary.grade}</p>*/}

                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <Paragraph
                      label="Total Payment"
                      value={`US$${calculationResult.summary.totalPayment.toFixed(2)}`}
                    />
                  </div>

                  <Paragraph
                    label="Total DSA"
                    value={`US$${calculationResult.summary.totalDSA.toFixed(2)}`}
                  />

                  <Paragraph
                    label="Trip Duration"
                    value={`${calculationResult.summary.totalDurationDays.toFixed(2)} days`}
                  />

                  <Paragraph
                    label="Outbound Travel"
                    value={formatHoursDisplay(calculationResult.summary.outboundHours)}
                  />

                  <Paragraph
                    label="Return Travel"
                    value={formatHoursDisplay(calculationResult.summary.returnHours)}
                  />

                  <Paragraph
                    label="Destination Days"
                    value={calculationResult.summary.destinationDays.toFixed(2)}
                  />
                </div>
              )}

              {calculationResult?.dayByDay?.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-DARKGRAY mb-3">
                    Daily Eligibility Breakdown
                  </h3>

                  <p className="text-sm text-gray-600 mb-4">
                    Each card summarizes what allowances were available on that day, including meals,
                    accommodation, and supplementary amounts.
                  </p>

                  <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
                    {calculationResult.dayByDay.map((day) => (
                      <div
                        key={`${day.dayNumber}-${day.date}`}
                        className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <div>
                            <p className="text-sm text-gray-500">Day {day.dayNumber}</p>
                            <p className="text-lg font-semibold text-DARKGRAY">
                              {formatDateDisplay(day.date)}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-xs uppercase tracking-wide text-gray-500">
                              {day.status.replace("_", " ")}
                            </p>

                            <p className="text-sm font-medium text-BLUE">{day.location}</p>

                            <p className="text-sm text-gray-600">
                              Daily total:{" "}
                              <span className="font-semibold">
                                US${Number(day.dayTotal || 0).toFixed(2)}
                              </span>
                            </p>
                          </div>
                        </div>

                        {/* Allowances grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                          {Object.entries(day.allowances).map(([key, value]) => (
                            <div
                              key={key}
                              className={`bg-gray-50 rounded p-3 ${
                                key === "representation"
                                  ? "md:col-span-2 lg:col-span-3"
                                  : ""
                              }`}
                            >
                              <p className="text-gray-500 text-xs uppercase mb-1">
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                              </p>
                              <p className="font-medium">{formatAllowance(value)}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-center gap-4 mt-4">
                <Button label="Calculate" onClick={handleCalculate} />
                <Button label="Reset" onClick={handleReset} />
              </div>

              <Pagination step={step} setStep={setStep} />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

// Pagination extracted for cleaner code
const Pagination = ({ step, setStep }) => (
  <div className="flex justify-center items-center gap-4 mt-8 text-lg font-semibold">
    <button
      type="button"
      onClick={() => step > 1 && setStep(step - 1)}
      className={`px-3 py-1 rounded ${
        step > 1 ? "text-BLUE hover:bg-gray-200 cursor-pointer" : "text-gray-300 cursor-not-allowed"
      }`}
    >
      &lt;
    </button>

    {[1, 2, 3, 4].map((num) => (
      <button
        key={num}
        type="button"
        onClick={() => setStep(num)}
        className={`px-3 py-1 rounded transition-all ${
          step === num ? "bg-BLUE text-white scale-110 shadow" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        {num}
      </button>
    ))}

    <button
      type="button"
      onClick={() => step < 4 && setStep(step + 1)}
      className={`px-3 py-1 rounded ${
        step < 4 ? "text-BLUE hover:bg-gray-200 cursor-pointer" : "text-gray-300 cursor-not-allowed"
      }`}
    >
      &gt;
    </button>
  </div>
);

export default JourneyDetails;
