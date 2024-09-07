import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import loginApi from "../../../utils/apis/auth/loginApi";
import { toast } from "react-toastify";
import { setCookie } from "../../../utils/helpers/cookie";
import useStore from "../../../store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().min(1, "it cant be empty!").email("enter a valid email"),
  password: z.string().min(1, "it cant be empty!"),
});

const LoginForm = () => {
  const { setState, access_token } = useStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    if (access_token != null && access_token != undefined) {
      toast.warn("you are already logged in!");
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = async (data) => {
    const result = await loginApi(data);
    if (result?.status == 200 || result?.status == 201) {
      const access_token = result?.data?.access_token;
      const refresh_token = result?.data?.refresh_token;

      await setCookie("credential", {
        access_token: access_token,
        refresh_token: refresh_token,
      });
      setState({ access_token: access_token, refresh_token: refresh_token });

      toast.success("logged in successfully , redirecting to dashboard...");
      setTimeout(() => navigate("/dashboard"), 1000);
    } else toast.error("invalid username password!");
  };

  return (
    <form
      onSubmit={handleSubmit(async (data) => await handleLogin(data))}
      className="border-2 rounded-xl shadow-md p-4  lg:w-[30%] w-[80%]">
      <fieldset disabled={isSubmitting} className="flex flex-col gap-4">
        <input
          {...register("email")}
          className={`${
            errors?.email?.message ? "border-red-400" : "border-slate-400"
          } w-[100%] py-2 px-4 border-2 focus:border-slate-600 rounded-md`}
          type="text"
          name="email"
          id="email"
          placeholder="Enter email"
        />
        {errors?.email?.message && (
          <p className="text-red-600">{errors.email.message}</p>
        )}
        <input
          {...register("password")}
          className={`${
            errors?.password?.message ? "border-red-400" : "border-slate-400"
          } w-[100%] py-2 px-4 border-2 focus:border-slate-600 rounded-md`}
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
        />
        {errors?.password?.message && (
          <p className="text-red-600">{errors.password.message}</p>
        )}
        <button
          className="w-[100%] bg-slate-600 text-slate-50 rounded-md py-2 px-4"
          type="submit">
          {isSubmitting ? "Logginig..." : "Login"}
        </button>
        <Link className="text-center underline text-xs" to="/signup">
          dont have a account? signup{" "}
        </Link>
      </fieldset>
    </form>
  );
};

export default LoginForm;
