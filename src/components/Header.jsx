import React from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  const signOutBtnHandler = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.

        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between align-middle">
      <img alt="logo" src="logo3.png" className="w-26" />
      <div className="flex">
        <img
          src="https://occ-0-3973-3662.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXz4LMjJFidX8MxhZ6qro8PBTjmHbxlaLAbk45W1DXbKsAIOwyHQPiMAuUnF1G24CLi7InJHK4Ge4jkXul1xIW49Dr5S7fc.png?r=e6e"
          alt="user-img"
          className="mt-3 cursor-pointer"
        />
        <button
          className="font-bold text-white p-3 "
          onClick={signOutBtnHandler}
        >
          (Sign Out)
        </button>
      </div>
    </div>
  );
};

export default Header;
