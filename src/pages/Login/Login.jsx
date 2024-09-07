import React from "react";
import LoginForm from "../../components/forms/LoginForm";

const Login = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-slate-100 flex flex-col items-center justify-center gap-4">
      <h1 className="font-bold text-xl">Login</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
