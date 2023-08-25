"use client";
import React, { useState } from "react";
import MultiSelectDropdown from "./MultiSelectDropdown";
import Axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
const Register2 = ({ handleStep }) => {
  //   const [email, setEmail] = useState(localStorage.getItem("email") || "");
  //   const [name, setName] = useState(localStorage.getItem("name") || "");
  const router = useRouter();
  const email = localStorage.getItem("email") || "";
  const name = localStorage.getItem("name") || "";
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);

  const handleSubmit = async (e) => {  // 1. Declare the function as async
    e.preventDefault();
    console.log(email, name);

    if (!day || !month || !year) {
      toast.error("Please fill all the fields");
      return;
    } else if (selectedCountries.length < 5) {
      toast.error("Please select 5 countries");
      return;
    } else if (selectedLocation.length < 1) {
      toast.error("Please select your current location");
      return;
    }

    const date = new Date(year, month - 1, day); // month in JavaScript is 0-indexed
    const dateOfBirth = date.toISOString().split("T")[0];
    const countries = selectedCountries.map((country) => country.label);
    const location = selectedLocation.label;

    try {
        const res = await fetch('/api/users/register', {  // 2. Assign the fetch result to res
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            dateOfBirth,
            password: "123456",
            interestedCountries: countries,
            currentCountry: location,
          })
        });
        
        if (res.status === 201) {
          toast.success("Registration Successful");
          router.push("/");
        } else {
          toast.error("Registration Failed");
        }
    } catch (error) {  // 3. Add error handling
        console.error("Error during registration:", error);
        toast.error("Registration Failed due to a network error.");
    }

    console.log("Form submitted");
};

  return (
    <div
      className="register  justify-center items-center w-full h-full"
      style={{ padding: "10rem" }}
    >
      <ToastContainer />
      <div className="flex flex-col justify-center items-center w-full mb-4">
        <h1 className="loginTitle">Join Community</h1>
        <img src="/plane.svg" alt="community" className="registerImg" />
        <h2>Where do you want to live?</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between items-center w-full mb-4"
      >
        <div
          style={{
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
            Select Countries you are interested in going
          </label>
          <MultiSelectDropdown
            check={true}
            setSelectedValues={setSelectedCountries}
          />
          <p style={{ fontSize: "0.8rem" }}>
            Please add 5 Countries you are interested in
          </p>
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
            // htmlFor="yourCountry"
            // style={{
            //   width: "35%",
            //   padding: "0.5rem",
            // }}
          >
            Date of Birth:
          </label>
          <div
            className="flex flex-row justify-between align-center"
          >
          <input
            type="text"
            placeholder="DD"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            style={{ width: "13%", margin: "1rem" }}
          />
          <input
            type="text"
            placeholder="MM"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            style={{ width: "13%", margin: "1rem" }}
          />
          <input
            type="text"
            placeholder="YYYY"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            style={{ width: "15%", margin: "1rem" }}
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
        <div className="flex flex-row justify-between w-1/2">
          <button type="button" className="outline_btn" onClick={handleStep}>
            Back
          </button>

          <button type="submit" className="black_btn">
            Lets Start Exploring
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register2;
