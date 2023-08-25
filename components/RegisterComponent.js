"use client";
import React, { useState } from "react";
// import { FaGoogle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
const RegisterComponent = ({handleStep}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailPattern.test(email);
  };
  const signUp = () => {
    if (!email || !name) {
      // alert("Please fill all the fields");
      toast.error("Please fill all the fields");

      return;
    } else if (!isValidEmail(email)) {
      // alert("Please enter a valid email");
      toast.error("Please enter a valid email");
      return;
    }
    localStorage.setItem("email", email);
    localStorage.setItem("name", name);
    // navigate("/register2");
    handleStep();
    toast.success("Loading...");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp();
    setEmail("");
    setName("");
  };
  const handleGoogleLogin = async () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // console.log("TOKEN", token);
        localStorage.setItem("emial", user.email);
        localStorage.setItem("name", user);
        navigate("/register2");
        toast.success("Loading...");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        // alert(error.message);
        toast.error(error.message);
      });
  };
  return (
    <main
      className="register  justify-center items-center w-full h-full"
      style={{ padding: "10rem" }}
    >
      <div className="flex flex-col justify-center items-center w-full mb-4">
        <h1>Join Community</h1>
        <img src="/plane.svg" alt="community" className="registerImg" />
        <h1 className="registerTitle">Create an account</h1>
        <p className="registerSubtitle">Register with ZindaBhag</p>
      </div>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label htmlFor="password" style={{ width: "30%" }}>
          Your Name
        </label>
        <input
          className="form_input"
          placeholder="Full Name"
          type="text"
          name="name"
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "30%" }}
        />
        <label
          htmlFor="email"
          style={{
            width: "30%",
          }}
        >
          Email
        </label>
        <input
          className="form_input"
          placeholder="Enter your Email"
          type="text"
          name="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "30%" }}
        />
        <button
          className="mt-5 registerBtn"
          style={{
            width: "25%",
            backgroundColor: 'Gradient("#FF416C", "#FF4B2B")',
          }}
        >
          Get Started
        </button>
        <p>OR</p>
        <button
          className="registerBtn"
          style={{
            backgroundColor: "#fff",
            color: "#000",
            border: "1px solid #000",
            marginTop: "1rem",
            width: "25%",
          }}
          //   onClick={handleGoogleLogin}
        >
          {/* <FaGoogle
            className="googleIcon"
            style={{
              fontSize: "1.5rem",
              marginRight: "0.5rem",
            }}
          /> */}
          SignUp with Google
        </button>
        <p>
          Have an account?
          {/* <Link to="/">Sign in</Link> */}
            <Link href="/">Sign in</Link>
        </p>
      </form>
      <ToastContainer />
    </main>
  );
};

export default RegisterComponent;
