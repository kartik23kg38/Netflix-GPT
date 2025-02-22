import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/slices/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
    setErrorMsg(null); // clear errors while switching
  };

  // useRef hook for input fields -->
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);

  const handleValidateForm = async () => {
    if (!emailRef.current || !passwordRef.current || !nameRef.current) {
      console.log("Refs are not initialized yet!");
      setErrorMsg("Form not complete. Please complete all fields");
      return;
    }

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const name = nameRef.current.value;

    console.log("Email entered: ", email);
    console.log("Password entered: ", password);
    console.log("Name entered: ", name);

    const anyErrorMsg = checkValidData(email, password);
    setErrorMsg(anyErrorMsg);

    if (anyErrorMsg) return;

    if (isSignIn) {
      /* Sign In (updated) logic */
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        //Updating profile and name

        updateProfile(userCredential.user, {
          displayName: name,
          photoURL:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUNo-mkoj2Xj9uUKhxzRSlijz_JHIS7m9YTgDmEJYol-3Bxa_zyumkXAAWTNjnxCfHQZ4&usqp=CAU",
        })
          .then(() => {
            // Profile updated!
            const { uid, email, displayName, photoURL } = auth.currentUser;
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
            setErrorMsg(error.message);
          });

        console.log("User signed in : ", userCredential.user);
        navigate("/browse");

        setErrorMsg(null);
      } catch (error) {
        console.error("Sign In Error:", error);

        setErrorMsg(`${error.code} : ${error.message}`);
      }
    } else {
      /* Sign Up logic */

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        updateProfile(userCredential.user, {
          displayName: name,
          photoURL:
            "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid",
        })
          .then(() => {
            // Profile updated!
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(
              addUser({
                uid: uid,
                email: email,
                displayName: displayName,
                photoURL: photoURL,
              })
            );
            navigate("/browse");
            setErrorMsg(null);
          })
          .catch((error) => {
            // An error occurred
            setErrorMsg(error.message);
          });

        console.log("User created : ", userCredential.user);
        navigate("/browse");
        setErrorMsg(null);
      } catch (error) {
        console.error("Sign Up Error:", error);
        setErrorMsg(`${error.code} : ${error.message}`);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute w-full h-full">
        <img
          className="object-cover w-full h-full"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f268d374-734d-474f-ad13-af5ba87ef9fc/web/IN-en-20250210-TRIFECTA-perspective_92338d5d-6ccd-4b1a-8536-eb2b0240a55e_large.jpg"
          alt="bg-img"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="px-4 py-4 min-h-[40vh] min-w-[300px] max-w-[90vw] w-[30vw] flex flex-col items-center bg-black/60 absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[-260px]"
      >
        <h3 className="self-start p-2 my-2 mx-6 font-bold text-white text-4xl">
          {isSignIn ? "Sign in U" : "Sign up U"}
        </h3>

        {!isSignIn && (
          <input
            ref={nameRef}
            type="text"
            className="text-white w-full max-w-[75%] rounded-lg border border-white/30 focus:border-2 focus:border-white bg-black/60 mt-5 mx-5 my-1 px-3 py-5 "
            placeholder="Full name"
          />
        )}

        <input
          ref={emailRef}
          type="text"
          className="text-white w-full max-w-[75%] rounded-lg border border-white/30 focus:border-2 focus:border-white bg-black/60 my-1 px-3 py-5"
          placeholder="Email or mobile number"
        />

        <input
          ref={passwordRef}
          type="password"
          className="text-white w-full max-w-[75%] rounded-lg border border-white/30 focus:border-2 focus:border-white bg-black/60 mx-5 my-1 px-3 py-5 "
          placeholder="Password"
        />

        <p className="text-red-600 text-lg font-medium my-2">{errorMsg}</p>

        <button
          className="w-full max-w-[75%] p-2 my-1 font-medium text-white rounded-md bg-red-700 transition-colors duration-300 hover:bg-red-950 hover:text-white"
          ref={nameRef}
          onClick={handleValidateForm}
        >
          {isSignIn ? "Sign in U" : "Sign up U"}
        </button>

        <h1 className="text-white my-1">OR</h1>

        <button className="w-full max-w-[75%] p-2 my-3 font-medium text-white rounded-md bg-white/20">
          Use a sign-in code
        </button>

        <h1 className="text-white my-1">Forgot passsword?</h1>

        <div className="w-full flex items-center justify-start space-x-3 ml-20">
          <input
            type="checkbox"
            className="text-white w-5 h-5 accent-black bg-black/60 border border-white/40 rounded-md focus:ring-2 focus:ring-white cursor-pointer"
          />
          <label className="mx-5 my-3 text-white text-lg cursor-pointer">
            Remember Me
          </label>
        </div>

        <div className="w-full flex items-center justify-start ml-20">
          <h1 onClick={toggleSignIn} className="cursor-pointer text-white">
            {isSignIn
              ? "New to Netflix? Sign up now"
              : "Already a user! Sign in now"}
          </h1>
        </div>
      </form>
    </div>
  );
};

export default Login;
