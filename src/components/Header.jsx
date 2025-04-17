import React from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { Rocket } from "lucide-react";
import { toggleGptSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGpt = useSelector((store) => store.gpt.showGptSearch);
  const navigate = useNavigate();
  const [photo, setPhoto] = useState();
  const [showProfileDropDown, setShowProfileDropDown] = useState(false);
  const handleGptSearch = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  const signOutBtnHandler = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  const profilePicHandler = () => {
    setShowProfileDropDown(!showProfileDropDown);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        console.log(displayName);
        setPhoto(photoURL);
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/");
      }

      return () => unsubscribe();
    });
  }, []);
  return (
    <div className="fixed px-4 sm:px-8 py-2 bg-black z-50 w-screen flex justify-between items-center">
      <img alt="logo" src="logo3.png" className="w-24 sm:w-28 md:w-32" />
      {user && (
        <div className="flex items-center gap-4">
          {showGpt && (
            <select
              className="bg-gray-900 text-white px-2 py-1 rounded"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full text-white hover:opacity-80"
            onClick={handleGptSearch}
          >
            <Rocket />
          </button>
          <div className="relative" onClick={profilePicHandler}>
            <img
              src="https://occ-0-3973-3662.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXz4LMjJFidX8MxhZ6qro8PBTjmHbxlaLAbk45W1DXbKsAIOwyHQPiMAuUnF1G24CLi7InJHK4Ge4jkXul1xIW49Dr5S7fc.png?r=e6e"
              className="w-10 h-10 rounded-full cursor-pointer"
              alt="user-img"
            />
            {showProfileDropDown && (
              <div className="absolute top-12 right-0 bg-black/90 rounded p-4 shadow-lg z-50 min-w-[160px] text-white text-sm">
                <div className="mb-2">Hey, {user.displayName}!</div>
                <div
                  className="cursor-pointer hover:text-red-300"
                  onClick={signOutBtnHandler}
                >
                  Sign Out
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

//absolute top-12 right-0 bg-black/90 rounded p-4 shadow-lg z-[1000] min-w-[200px] text-white font-sans
