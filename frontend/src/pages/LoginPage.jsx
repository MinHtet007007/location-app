// pages/LoginPage.jsx
import { useForm } from "react-hook-form";
import axios from "axios";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
    const isLoggedIn = !!localStorage.getItem("token");


  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        data
      );
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    //   alert("Login failed");
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
      <input
        {...register("username")}
        placeholder="Username"
        className="border p-2 w-full"
      />
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="border p-2 w-full"
      />
      <button
        type="submit"
        className="bg-green-500 text-white p-2 w-full rounded"
      >
        Login
      </button>
    </form>
  );
};

export default LoginPage;
