import { useState } from "react";
import { signIn } from "next-auth/react";
import {toast, ToastContainer} from 'react-toastify';
const LoginModal = ({ signIn, onCloseModal, provider }) => {
  const [showRegisterButton, setShowRegisterButton] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleGoogleSignIn = () => {
    // Implement Google sign-in logic using the signIn function
    signIn(provider);
  };
  const handleSignIn = async(e) => {
    e.preventDefault();
    // Implement email/password sign-in logic using the signIn function
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password
    });
    if(res.error) {
      alert(res.error);
    }
    else {
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
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        
        {/* <ToastContainer */}
        
        <label className="block mb-2">
          Email:
          <input type="email" className="w-full border rounded px-3 py-2" 
          onChange={(e) => setEmail(e.target.value)}

          />
        </label>
        <label className="block mb-4">
          Password:
          <input type="password" className="w-full border rounded px-3 py-2" 
          onChange={(e) => setPassword(e.target.value)}

          />
        </label>
        <div className="flex flex-col"  >
       
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleSignIn}
          >
            Login
          </button>
       
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
