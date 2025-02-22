import React from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/slices/userSlice";

const Header = () => {
  const user = useSelector(store => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.

        // Remove user from redux
        dispatch(removeUser());

        // Redirect to home page
        navigate("/");
      })
      .catch((error) => {
        // An error happened.

        console.error("Sign out error:", error);
        navigate("/error");
      });
  };

  return (
    <div className="flex justify-between absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black z-10">
      <div className="ml-20 pl-16 z-10">
        <img
          className="w-52"
          src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
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
