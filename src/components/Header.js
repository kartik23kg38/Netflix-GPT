import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/slices/userSlice";
import { netflix_LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { gptSearchToggler } from "../utils/slices/gptSlice";
import { changeLanguage } from "../utils/slices/configSlice";

const Header = () => {
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

    return () => {
      // console.log("🔴 Listener removed");
      unsubscribe();
    }; // Clean up the listener on unmount
  }, [dispatch, navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(removeUser()); // ✅ Ensure user is removed from store
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
    <div className="flex justify-between absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black z-20">
      <div className="ml-8 z-10">
        <img className="w-52" src={netflix_LOGO} alt="logo" />
      </div>
      {user && (
        <div className="flex items-center">
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
font-medium rounded-lg text-sm ml-2 px-6 py-2 text-center me-2 mb-2"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>

          <div>
            <img
              className="text-white w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
              src={
                user?.photoURL ||
                "https://img.freepik.com/free-vector/error-alert-button-symbol_24877-83749.jpg"
              }
              alt="userProfile"
            />
          </div>
          <button
            onClick={handleSignOut}
            className="bg-red-600 text-white m-3 px-4 py-2 font-bold rounded-lg"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
