import React from "react";
import Header from "./Header";
import { BG_URL } from "../utils/constants";
import { useState, useRef } from "react";
import { checkValidData, validateName } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [nameValidErr, setNameValid] = useState("");
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  //const auth = getAuth();
  const handleButtonClick = () => {
    const errMsg = checkValidData(email.current.value, password.current.value);
    setErrMsg(errMsg);
    if (!isSignInForm) {
      //const isNameValid = validateName(name.current.value);  /fix this
      //console.log("Name is", isNameValid);
      //setNameValid(isNameValid);
      if (errMsg) return;

      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          //const auth = getAuth();
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/20208296?v=4",
          })
            .then(() => {
              // Profile updated!
              // ...
              const { uid, email, displayName, photoURL } = user;
              console.log(user.displayName);
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              // ...
              setErrMsg(error);
            });
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMsg(errorCode + "-" + errorMessage);
          // ..
        });
      setIsSignInForm(!isSignInForm);
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Successful sign in");
          navigate("/browse");

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMsg(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img alt="bgc-image" src={BG_URL} />
      </div>
      <form
        className="absolute p-12 bg-black opacity-80 w-3/12 mt-36 mx-auto left-0 right-0 rounded-lg "
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-bold text-3xl text-white py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-3 my-3 bg-gray-700 w-full  text-gray-50 rounded-md "
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email address"
          className="p-3 my-3 bg-gray-700 w-full  text-gray-50 rounded-md "
        />
        <input
          ref={password}
          type="password"
          placeholder="Enter your password"
          className="p-3  my-5 bg-gray-700 w-full text-gray-100 rounded-md"
        />
        {errMsg && (
          <p className="text-red-500 py-2 font-bold text-lg">{errMsg}</p>
        )}
        {!isSignInForm && (
          <p className="text-red-500 py-2 font-bold text-lg">{nameValidErr}</p>
        )}
        <button
          className="p-4 my-5 bg-red-600 text-white w-full rounded-lg cursor-pointer hover:bg-red-700"
          onClick={handleButtonClick}
        >
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
