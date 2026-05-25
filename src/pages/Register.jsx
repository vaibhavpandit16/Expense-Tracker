import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response =
        await axios.post(

          "https://expense-tracker-wjc2.onrender.com",

          formData

        );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.data.user
        )
      );

      alert("Registration Successful");

      navigate("/");

    } catch (error) {

      alert(
        error.response.data.message
      );

    }

  };


  return (

    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="bg-white p-8 rounded-3xl shadow-sm w-full max-w-md">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Register
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-5">

          Already have account?

          <Link
            to="/login"
            className="text-blue-600 ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );
}

export default Register;