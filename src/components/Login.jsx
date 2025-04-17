import React from "react";
import Header from "./Header";
import { BG_URL } from "../utils/constants";
import { useState, useRef } from "react";
import { checkValidData, validateName } from "../utils/validate";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const Login = () => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const checkValidData = (email, password) => {
    if (!email.includes("@")) return "Invalid email";
    if (password.length < 6) return "Password must be at least 6 characters";
    return null;
  };

  const handleButtonClick = () => {
    console.log("--- New Signup Attempt ---");
    console.log("Form state:", { isSignInForm });
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const nameValue = name.current ? name.current.value : "N/A";

    const errMsg = checkValidData(emailValue, passwordValue);
    setErrMsg(errMsg);
    if (errMsg) {
      console.log("Validation failed:", errMsg);
      return;
    }

    if (!isSignInForm) {
      console.log("Signup inputs:", {
        email: emailValue,
        password: passwordValue,
        name: nameValue,
      });

      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User created:", {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          });

          if (!nameValue) {
            console.warn("Name input is empty or undefined!");
          }

          return updateProfile(user, {
            displayName: nameValue || "Default User",
            photoURL: "https://avatars.githubusercontent.com/u/20208296?v=4",
          });
        })
        .then(() => {
          console.log("Profile update requested");
          return auth.currentUser.reload();
        })
        .then(() => {
          const updatedUser = auth.currentUser;
          console.log("Updated user after reload:", {
            uid: updatedUser.uid,
            email: updatedUser.email,
            displayName: updatedUser.displayName,
            photoURL: updatedUser.photoURL,
          });

          dispatch(
            addUser({
              uid: updatedUser.uid,
              email: updatedUser.email,
              displayName: updatedUser.displayName,
              photoURL: updatedUser.photoURL,
            })
          );
        })
        .catch((error) => {
          console.error(
            "Error during signup or profile update:",
            error.code,
            error.message
          );
          setErrMsg(`${error.code} - ${error.message}`);
        });
    } else {
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          console.log("Sign-in successful:", userCredential.user.email);
        })
        .catch((error) => {
          console.error("Sign-in error:", error.code, error.message);
          setErrMsg(`${error.code} - ${error.message}`);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="absolute w-full h-full -z-10">
        <img
          alt="bgc-image"
          src={BG_URL}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Flex container to center the form */}
      <div className="flex justify-center items-center min-h-screen">
        <form
          className="p-8 sm:p-12 bg-black bg-opacity-80 w-11/12 sm:w-8/12 md:w-5/12 lg:w-3/12 rounded-lg"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="font-bold text-2xl sm:text-3xl text-white py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="p-3 my-2 bg-gray-700 w-full text-gray-50 rounded-md"
            />
          )}

          <input
            ref={email}
            type="text"
            placeholder="Email address"
            className="p-3 my-2 bg-gray-700 w-full text-gray-50 rounded-md"
          />
          <input
            ref={password}
            type="password"
            placeholder="Enter your password"
            className="p-3 my-2 bg-gray-700 w-full text-gray-100 rounded-md"
          />

          {errMsg && (
            <p className="text-red-500 py-2 font-bold text-sm sm:text-lg">
              {errMsg}
            </p>
          )}

          <button
            className="p-3 sm:p-4 my-4 bg-red-600 text-white w-full rounded-lg hover:bg-red-700"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p
            className="text-white my-4 text-center cursor-pointer text-sm sm:text-base"
            onClick={toggleSignInForm}
          >
            {isSignInForm
              ? "New to Genix? Sign Up Now"
              : "Already registered? Sign In Now"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
