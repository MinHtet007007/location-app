// pages/LoginPage.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const isLoggedIn = !!localStorage.getItem("token");

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        data
      );
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 space-y-4 max-w-md mx-auto"
    >
      <div className="">
        <input
          {...register("username", { required: "Username is required" })}
          placeholder="Username"
          className="border p-2 w-full"
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
        )}
      </div>
      <div className="">
        <input
          {...register("password", { required: "Password is required" })}
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className={`w-full ${
          isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
        } text-white font-medium py-2.5 rounded-lg transition duration-200 flex items-center justify-center gap-2`}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Logging in...
          </>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
};

export default LoginPage;
