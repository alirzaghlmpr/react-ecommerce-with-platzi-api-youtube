import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import loginApi from "../../../utils/apis/auth/loginApi";
import { toast } from "react-toastify";
import { setCookie } from "../../../utils/helpers/cookie";
import useStore from "../../../store";
import { useNavigate } from "react-router-dom";
import createUserApi from "../../../utils/apis/users/createUserApi";
import { Link } from "react-router-dom";

const loginSchema = z
  .object({
    name: z.string(4, "at least 4 character"),
    email: z.string().min(1, "it cant be empty!").email("enter a valid email"),
    password: z.string().min(4, "at least 4 character"),
    avatar: z.string(),
    gender: z.string(),
  })
  .refine(
    (data) =>
      (data.avatar = `https://avatar.iran.liara.run/public/${data.gender}`)
  );

const LoginForm = () => {
  const navigate = useNavigate();
  const { access_token } = useStore();

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

  const handleSignup = async (data) => {
    const result = await createUserApi(data);
    if (result?.status == 200 || result?.status == 201) {
      toast.success("register successfully , redirecting to login ...");
      setTimeout(() => navigate("/login"), 1000);
    } else toast.error("something goes wrong , try again later");
  };

  return (
    <form
      onSubmit={handleSubmit(async (data) => await handleSignup(data))}
      className="border-2 rounded-xl shadow-md p-4  lg:w-[30%] w-[80%]">
      <fieldset disabled={isSubmitting} className="flex flex-col gap-4">
        <input type="hidden" name="avatar" {...register("avatar")} />
        <input
          {...register("name")}
          className={`${
            errors?.name?.message ? "border-red-400" : "border-slate-400"
          } w-[100%] py-2 px-4 border-2 focus:border-slate-600 rounded-md`}
          type="text"
          name="name"
          id="name"
          placeholder="Enter name"
        />
        {errors?.name?.message && (
          <p className="text-red-600">{errors.name.message}</p>
        )}
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

        <div className="flex flex-col">
          <div className="flex gap-4">
            <input
              {...register("gender")}
              type="radio"
              defaultChecked
              value="boy"
              name="gender"
              id="male"
            />
            <label htmlFor="male">Male</label>
          </div>
          <div className="flex gap-4">
            <input
              {...register("gender")}
              type="radio"
              value="girl"
              name="gender"
              id="female"
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>

        <button
          className="w-[100%] bg-slate-600 text-slate-50 rounded-md py-2 px-4"
          type="submit">
          {isSubmitting ? "Registering..." : "Register"}
        </button>
        <Link className="text-center underline text-xs" to="/login">
          have a account? log in
        </Link>
      </fieldset>
    </form>
  );
};

export default LoginForm;
