import { useState } from "react";
import MultiSelectDropdown from "@components/MultiSelectDropdown";
const RegisterModal = ({ onCloseModal }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const handleContinue = () => {
    if (step === 1) {
      setStep(2);
    } else {
      // Handle registration submission
      // You can use the captured fields to submit the registration data
      // For example, you can send this data to your backend API for processing
      const date = new Date(year, month, day);
      const dateOfBirth = date.toISOString().split("T")[0];
      const countries = selectedCountries.map((country) => country.label);
      const location = selectedLocation.label;
      console.log("Registration submitted:", {
        name,
        email,
        countries,
        dateOfBirth,
        location,
      });

      // Close the modal
      onCloseModal();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-gray-700 bg-opacity-75"
        onClick={onCloseModal}
      ></div>
      <div className="bg-white rounded-lg p-6 relative z-10">
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={onCloseModal}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-4">
              Step 1: Personal Information
            </h2>
            <label className="block mb-2">
              Name:
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="block mb-2">
              Email:
              <input
                type="email"
                className="w-full border rounded px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
              onClick={handleContinue}
            >
              Continue
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-4">
              Where do you want to live?
            </h2>
            <form
              //   onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginBottom: "2rem",
              }}
            >

            <div
                className="form-group"
                style={{
                  display: "flex",
                    flexDirection: "column",
                  justifyContent: "space-between",
                  //   alignItems: "center",
                  width: "35%",
                  marginBottom: "2rem",
                }}
              >
                <label
                  htmlFor="yourCountry"
                  style={{
                    width: "100%",
                    // padding: "0.5rem",
                    fontSize: "0.8rem",
                  }}
                >
                  Select Countries you are interested in going
                </label>
                <MultiSelectDropdown
                  check={true}
                  setSelectedValues={setSelectedCountries}
                />
                <p style={{ fontSize: "0.6rem", color: "red" }}>
                  *Please add 5 Countries you are interested in
                </p>
            </div>

              <div
                className="form-group flex-start"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  //   alignItems: "center",
                  width: "35%",
                  marginBottom: "2rem",
                }}
              >
                <label
                  // htmlFor="yourCountry"
                  className="flex-start"
                  style={{
                    width: "50%",
                  }}
                >
                  Date of Birth:
                </label>
                <div className="flex flex-row">
                  <input
                    type="text"
                    placeholder="DD"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    style={{
                      width: "20%",
                      margin: "1rem",
                      border: "1px solid #000",
                      borderRadius: "5px",
                      padding: "0.5rem",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="MM"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    style={{
                      width: "20%",
                      margin: "1rem",
                      border: "1px solid #000",
                      borderRadius: "5px",
                      padding: "0.5rem",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="YYYY"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    style={{
                      width: "25%",
                      margin: "1rem",
                      border: "1px solid #000",
                      borderRadius: "5px",
                      padding: "0.5rem",
                    }}
                  />
                </div>
              </div>
              <div
                className="form-group"
                style={{
                  // display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "35%",
                  marginBottom: "2rem",
                }}
              >
                <label
                  htmlFor="yourCountry"
                  style={{
                    width: "50%",
                  }}
                >
                  Where are you currently Located?
                </label>
                <MultiSelectDropdown
                  check={false}
                  setSelectedValues={setSelectedLocation}
                />
                {/* Dropdown component here */}
              </div>

              <button
                onClick={handleContinue}
                className="registerBtn"
                style={{
                  backgroundColor: "#674188",
                  color: "white",
                  border: "1px solid #000",
                  marginTop: "1rem",
                  width: "25%",
                }}
              >
                Lets Start Exploring
              </button>
            </form>

            {/* <button className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600" onClick={handleContinue}>Register</button> */}
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterModal;
