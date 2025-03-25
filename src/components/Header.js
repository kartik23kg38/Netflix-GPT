import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/slices/userSlice";
import { netflix_LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { gptSearchToggler } from "../utils/slices/gptSlice";
import { changeLanguage } from "../utils/slices/configSlice";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for Hamburger and Cross

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, [dispatch, navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(removeUser());
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleGptSearchClick = () => {
    dispatch(gptSearchToggler());
  };

  const handleChangeLanguage = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  return (
    <div className="fixed top-0 left-0 w-full bg-gradient-to-b from-black z-20 h-16 flex justify-between items-center px-4">
      <div className="ml-1 mt-2">
        <img className="w-28" src={netflix_LOGO} alt="logo" />
      </div>

      {/* Hamburger Icon for Mobile */}
      <div
        className="absolute top-4 right-6 text-white text-2xl cursor-pointer md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Menu Items */}
      <div
        className={`flex-col md:flex-row items-center bg-black md:bg-transparent absolute md:static top-16 left-0 w-full md:w-auto p-4 md:p-0 space-y-4 md:space-y-0 md:space-x-4 transition-all duration-300 ${
          isMenuOpen ? "flex" : "hidden md:flex"
        }`}
      >
        {showGptSearch && (
          <select
            onChange={handleChangeLanguage}
            className="bg-gray-800 rounded-full py-2 px-3 text-white"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
        )}

        <button
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
          focus:outline-none shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 
          font-medium rounded-lg text-sm px-6 py-2 text-center"
          onClick={handleGptSearchClick}
        >
          {showGptSearch ? "Homepage" : "GPT Search"}
        </button>

        <div>
          <img
            className="text-white w-12 h-12 rounded-full object-cover"
            src={
              user?.photoURL ||
              "https://img.freepik.com/free-vector/error-alert-button-symbol_24877-83749.jpg"
            }
            alt="userProfile"
          />
        </div>

        <button
          onClick={handleSignOut}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Header;
