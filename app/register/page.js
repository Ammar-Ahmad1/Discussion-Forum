"use client"
import {useState} from "react";
import RegisterComponent from "@components/RegisterComponent";
import Register2 from "@components/Register2";
const Register = () => {
    const [step,setStep]=useState(false);

    const handleStep = () => {
        setStep(!step);
    }



  return (  
    <div className="w-full h-full flex justify-center items-center">
        {!step?(
            <RegisterComponent
            handleStep={handleStep}
            />
        ):(
            <Register2
                handleStep={handleStep}
            />
            
        )
        }
        
    </div>
  );
};

export default Register;
