import React from "react";
import Header from "./Header";
import { BG_URL } from "../utils/constants";
import { useState } from "react";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img alt="bgc-image" src={BG_URL} />
      </div>
      <form className="absolute p-12 bg-black opacity-80 w-3/12 mt-36 mx-auto left-0 right-0 rounded-lg ">
        <h1 className="font-bold text-3xl text-white py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-3 my-3 bg-gray-700 w-full  text-gray-50 rounded-md "
          />
        )}
        <input
          type="text"
          placeholder="Email address"
          className="p-3 my-3 bg-gray-700 w-full  text-gray-50 rounded-md "
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="p-3  my-5 bg-gray-700 w-full text-gray-100 rounded-md"
        />
        <button className="p-4 my-5 bg-red-600 text-white w-full rounded-lg cursor-pointer hover:bg-red-700">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p
          className="text-white my-4 cursor-pointer "
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to Neflix? Sign Up Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
