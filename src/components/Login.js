import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [signIn, setSignIn] = useState(true);
  const toggleSignIn = () => {
    setSignIn(!signIn);
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
      <form className="px-4 py-4 min-h-[40vh] min-w-[300px] max-w-[90vw] w-[30vw] flex flex-col items-center bg-black/60 absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[-260px]">
        <h3 className="self-start p-2 my-2 mx-6 font-bold text-white text-4xl">
          {signIn ? "Sign up" : "Sign in"}
        </h3>

        {signIn && (
          <input
            type="text"
            className="text-white w-full max-w-[75%] rounded-lg border border-white/30 focus:border-2 focus:border-white bg-black/60 mt-5 mx-5 my-1 px-3 py-5 "
            placeholder="Full name"
          />
        )}

        <input
          type="text"
          className="text-white w-full max-w-[75%] rounded-lg border border-white/30 focus:border-2 focus:border-white bg-black/60 my-1 px-3 py-5"
          placeholder="Email or mobile number"
        />

        <input
          type="password"
          className="text-white w-full max-w-[75%] rounded-lg border border-white/30 focus:border-2 focus:border-white bg-black/60 mx-5 my-1 px-3 py-5 "
          placeholder="Password"
        />

        <button className="w-full max-w-[75%] p-2 my-1 font-medium text-white rounded-md bg-red-700">
          {signIn ? "Sign up" : "Sign in"}
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
            {signIn
              ? "Already a user! Sign in now"
              : "New to Netflix? Sign up now"}
          </h1>
        </div>
      </form>
    </div>
  );
};

export default Login;
