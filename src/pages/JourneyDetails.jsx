import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import SelectInput from "../components/SelectInput";
import TextArea from "../components/TextAreaInput";
import Button from "../components/Buttons";
import Headers from "../components/Headers";
import countryRates from "../data/Country";
import PerDiemInput from "../components/PerDiemInput";
import Pagination from "../components/Pagination";
import calculateTravelAndSubsistence from "../components/script";

const JourneyDetails = () => {
  const navigate = useNavigate();

  const source = [
    "Government of Zimbabwe",
    "External Entity (Non-Government)",
  ];

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

  const countryOptions = Object.keys(countryRates).sort();

  const [step, setStep] = useState(1);

  const [tripDetails, setTripDetails] = useState({
    name: "",
    ecNumber: "",
    grade: "",
    purpose: "",
    source: "",
  });

  const [outboundRoutes, setOutboundRoutes] = useState([
    {departure: "" ,destination: "", departureDate: "", arrivalDate: "", perDiem: "" },
  ]);

  const [returnRoutes, setReturnRoutes] = useState([
    { departure: "", destination: "", departureDate: "", arrivalDate: "", perDiem: "" },
  ]);

  /* -------------------- HANDLERS -------------------- */

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTripDetails({ ...tripDetails, [name]: value });
  };

  const addOutboundRoute = () => {
    setOutboundRoutes((prev) => [
      ...prev,
      { departure: "", destination: "", departureDate: "", arrivalDate: "", perDiem: "" },
    ]);
  };

  const addReturnRoute = () => {
    setReturnRoutes((prev) => [
      ...prev,
      { departure: "", destination: "", departureDate: "", arrivalDate: "", perDiem: "" },
    ]);
  };

  const updateOutboundRoute = (index, field, value) => {
    setOutboundRoutes((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      if (field === "destination") {
        updated[index].perDiem = countryRates[value] ?? "";
      }
      return updated;
    });
  };

  const updateReturnRoute = (index, field, value) => {
    setReturnRoutes((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      if (field === "destination") {
        updated[index].perDiem = countryRates[value] ?? "";
      }
      return updated;
    });
  };

  const deleteOutboundRoute = (index) =>
    setOutboundRoutes((prev) => prev.filter((_, i) => i !== index));

  const deleteReturnRoute = (index) =>
    setReturnRoutes((prev) => prev.filter((_, i) => i !== index));

  const handleReset = () => {
    setTripDetails({
      name: "",
      ecNumber: "",
      grade: "",
      purpose: "",
      source: "",
    });

    setOutboundRoutes([
      { departure: "", destination: "", departureDate: "", arrivalDate: "", perDiem: "" },
    ]);

    setReturnRoutes([
      { departure: "", destination: "", departureDate: "", arrivalDate: "", perDiem: "" },
    ]);

    setStep(1);
  };

  const handleCalculate = () => {
    try {
      const gradeKey = gradeMap[tripDetails.grade];
      const fundingKey =
        tripDetails.source === "External Entity (Non-Government)"
          ? "external"
          : "government";

      const result = calculateTravelAndSubsistence({
        grade: gradeKey,
        purpose: tripDetails.purpose,
        fundingSource: fundingKey,
        outboundRoutes,
        returnRoutes,
      });

      navigate("/results", {
        state: {
          calculationResult: result,
          calculationError: "",
        },
      });
    } catch (error) {
      navigate("/results", {
        state: {
          calculationResult: null,
          calculationError: error.message,
        },
      });
    }
  };

  const handleOutboundRouteChange = (index, field) => (e) => { 
    updateOutboundRoute(index, field, e.target.value); 
  }; 
  
  const handleReturnRouteChange = (index, field) => (e) => { 
    updateReturnRoute(index, field, e.target.value); 
  };

  /* -------------------- UI -------------------- */

  return (
    <div className="min-h-screen bg-BLUE py-10">
      <div className="flex items-center justify-center">
        <Header />
      </div>
      

      <div className="bg-WHITE mt-4 rounded-lg shadow-lg w-[90%] md:w-[80%] p-8 mx-auto">

        {/* STEP 1: TRIP DETAILS */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Trip Details</h2>

            <div className="md:flex w-full gap-8 mb-4">
              <div className="md:w-1/2">
                <TextInput
                  label="Name"
                  name="name"
                  value={tripDetails.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="md:w-1/2">
                <TextInput
                  label="EC Number"
                  name="ecNumber"
                  value={tripDetails.ecNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="mb-4">
              <SelectInput
                label="Grade"
                options={grades}
                name="grade"
                value={tripDetails.grade}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <TextArea
                label="Purpose of Journey"
                name="purpose"
                value={tripDetails.purpose}
                onChange={handleInputChange}
              />
            </div>

            <Pagination step={step} setStep={setStep} />
          </>
        )}


        {/* STEP 2: OUTBOUND */}
        {step === 2 && (
          <>
            <Headers h3="Outbound Journey" />

            {outboundRoutes.map((route, index) => (
              <div key={index} className="border p-4 rounded mb-4 relative">
                <button
                  type="button"
                  className="absolute top-2 right-2 text-red-600"
                  onClick={() => deleteOutboundRoute(index)}
                >
                  ×
                </button>

                <SelectInput
                  label="Departure Country"
                  options={countryOptions}
                  value={route.departure}
                  onChange={handleOutboundRouteChange(index, "departure")
                  }
                />

                <SelectInput
                  label="Destination Country"
                  options={countryOptions}
                  value={route.destination}
                  onChange={handleOutboundRouteChange(index, "destination")
                  }
                />

                <PerDiemInput value={route.perDiem} />

                <TextInput
                  label="Departure Date & Time"
                  input_type="datetime-local"
                  value={route.departureDate}
                  onChange={handleOutboundRouteChange(index, "departureDate")
                  }
                />

                <TextInput
                  label="Arrival Date & Time"
                  input_type="datetime-local"
                  value={route.arrivalDate}
                  onChange={handleOutboundRouteChange(index, "arrivalDate")
                  }
                />
              </div>
            ))}

            <Button label="Add Another Route" onClick={addOutboundRoute} />
            <Pagination step={step} setStep={setStep} />
          </>
        )}

        {/* STEP 3: RETURN */}
        {step === 3 && (
          <>
            <Headers h3="Return Journey" />

            {returnRoutes.map((route, index) => (
              <div key={index} className="border p-4 rounded mb-4 relative">
                <button
                  type="button"
                  className="absolute top-2 right-2 text-red-600"
                  onClick={() => deleteReturnRoute(index)}
                >
                  ×
                </button>

                <SelectInput
                  label="Departure Country"
                  options={countryOptions}
                  value={route.departure}
                  onChange={(e) =>
                    updateReturnRoute(index, "departure", e.target.value)
                  }
                />

                <SelectInput
                  label="Destination Country"
                  options={countryOptions}
                  value={route.destination}
                  onChange={(e) =>
                    updateReturnRoute(index, "destination", e.target.value)
                  }
                />

                <PerDiemInput value={route.perDiem} />

                <TextInput
                  label="Departure Date & Time"
                  input_type="datetime-local"
                  value={route.departureDate}
                  onChange={handleReturnRouteChange(index, "departureDate")
                  }
                />

                <TextInput
                  label="Arrival Date & Time"
                  input_type="datetime-local"
                  value={route.arrivalDate}
                  onChange={handleReturnRouteChange(index, "arrivalDate")
                  }
                />
              </div>

            ))}

            <Button label="Add Another Route" onClick={addReturnRoute} />

            <Pagination step={step} setStep={setStep} />
          </>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Funding Source</h2>

            <SelectInput
              label="Funding Source"
              options={source}
              name="source"
              value={tripDetails.source}
              onChange={handleInputChange}
            />

            <div className="flex justify-center gap-4 mt-6">
              <Button label="Calculate" onClick={handleCalculate} />
              <Button label="Reset" onClick={handleReset} />
            </div>

            <Pagination step={step} setStep={setStep} />
          </>
        )}
      </div>
    </div>
  );
};

export default JourneyDetails;
