"use client";
import CustomButton from "./CustomButton";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import { validateUser } from "../../lib/auth/auth";

export default function SignIn({ isSignUp }) {
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    let values = [];
    for (let i = 0; i < 2; i++) {
      values.push(event.target[i].value);
    }
    fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("aauutthh", data);
        router.push("/dashboard");
      })
      .catch((error) => console.error(error));

    // const result = validateUser(values[0], values[1]);
    // if (result) {
    // } else {
    //   alert("Something went wrong!");
    // }
  }

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };
  return (
    <motion.form
      className="bg-white sm:w-2/6 p-5 rounded-lg items-center justify-center flex flex-col shadow w-full"
      onSubmit={handleSubmit}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <p className="font-semibold text-lg m-5">
        {isSignUp ? "Admin SignUp" : "Admin Login"}
      </p>
      <div className="my-3">
        <label>Email</label>
        <input
          type="email"
          required
          placeholder="Enter your Email"
          className="w-full outline-0 ring-1 rounded ring-slate-400 h-10 p-4 my-3"
        />
        <label>Password</label>
        <input
          type="password"
          required
          placeholder="Enter your Password"
          className="w-full outline-0 ring-1 rounded ring-slate-400 h-10 p-4 my-3"
        />
      </div>
      <motion.button
        type="submit"
        className="w-32 rounded bg-indigo-400 h-10 p-2 flex justify-center items-center m-3 cursor-pointer text-white relative"
        whileHover={{ scale: 0.9 }}
      >
        Sign In
      </motion.button>
      {/* <CustomButton title={isSignUp ? "Sign Up" : "Sign In"} /> */}
      {/* <p className="text-sm m-3">
        {isSignUp ? "Already have an account? " : "Don't have an account? "}
        <a href={isSignUp ? "/signin" : "/signup"} className="text-blue-600">
          {isSignUp ? "Sign In" : "Sign Up"}
        </a>
      </p>
      <div>---------- Or ----------</div>

      <CustomButton
        title={isSignUp ? "Sign Up with Google" : "Login with Google"}
        color="bg-blue-600"
        logo
      /> */}
    </motion.form>
  );
}
