import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/slices/userSlice";
import { netflix_LOGO } from "../utils/constants";

const Header = () => {
  const user = useSelector(store => store.user);
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
  

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.

        console.error("Sign out error:", error);
        navigate("/error");
      });
  };

  return (
    <div className="flex justify-between absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black z-10">
      <div className="ml-8 z-10">
        <img
          className="w-52"
          src={netflix_LOGO}
          alt="logo"
        />
      </div>
      {user && (<div className="flex items-center">
        <div>
          <img
            className="text-white w-14 h-14 rounded-full object-cover"
            src={user?.photoURL || "https://img.freepik.com/free-vector/error-alert-button-symbol_24877-83749.jpg"}
            alt="userProfile"
          />
        </div>
        <button
          onClick={handleSignOut}
          className="bg-red-600 text-white m-3 px-4 py-2 font-bold rounded-lg"
        >
          Sign out
        </button>
      </div>)}
    </div>
  );
};

export default Header;
