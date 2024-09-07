import React from "react";
import SignupForm from "../../components/forms/SignupForm";

const Signup = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-slate-100 flex flex-col items-center justify-center gap-4">
      <h1 className="font-bold text-xl">Signup</h1>
      <SignupForm />
    </div>
  );
};

export default Signup;
