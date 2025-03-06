import { useState } from "react";
import Navbar from "../components/Navbar";
import { Services } from "wasp/client/crud";
import SelectService from "./SelectService";
import SelectDateTime from "./SelectDateTime";

const steps = [
  "Select Service",
  "Choose Date & Time",
  "Enter Details",
  "Review & Confirm",
];

const ScheduleAppointment = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedServices, setSelectedServices] = useState([]);

  const { data: services, isLoading, error } = Services.getAll.useQuery();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex h-screen">
        <div className="w-1/8 bg-pink-300 p-6 border-r-2 border-white">
          <h2 className="text-lg font-bold mb-4">Schedule Appointment</h2>
          <ul>
            {steps.map((step, index) => (
              <li
                key={index}
                className={`py-2 px-4 rounded-md mb-2 ${
                  index === currentStep ? "bg-pink-500 text-white" : "bg-white"
                }`}
              >
                {step}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 bg-pink-200">
          <h1 className="text-2xl font-bold mb-4">{steps[currentStep]}</h1>

          {/* Step 1: Select Service */}
          {currentStep === 0 && (
            <SelectService
              selectedServices={selectedServices}
              setSelectedServices={setSelectedServices}
            />
          )}

          {currentStep === 1 && (
            <div className="border p-4 rounded-md bg-white shadow-md">
              <SelectDateTime />
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-4 flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`px-4 py-2 rounded-md ${
                currentStep === 0
                  ? "bg-pink-200 cursor-not-allowed"
                  : "bg-pink-500 text-white"
              }`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={currentStep === 0 && selectedServices.length === 0}
              className={`px-4 py-2 rounded-md ${
                currentStep === 0 && selectedServices.length === 0
                  ? "bg-pink-300 cursor-not-allowed"
                  : "bg-pink-500 text-white"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {/* Side Panel */}
    </div>
  );
};

export default ScheduleAppointment;
