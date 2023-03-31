"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const inputNames = [
  {
    id: 1,
    title: "Team Name",
    type: "text",
    required: true,
  },
  {
    id: 2,
    title: "Captain",
    type: "text",
    required: true,
  },
  {
    id: 3,
    title: "Owner",
    type: "text",
    required: true,
  },
  {
    id: 4,
    title: "Slots",
    type: "disabled",
    value: 14,
  },
  {
    id: 5,
    title: "Remaining Slots",
    type: "disabled",
    value: 14,
  },
  {
    id: 6,
    title: "Total Points Available",
    type: "disabled",
    value: 6000,
  },
  {
    id: 7,
    title: "Remaining Points Available",
    type: "disabled",
    value: 6000,
  },
  {
    id: 8,
    title: "Team Photo",
    type: "file",
    required: true,
  },
  {
    id: 9,
    title: "Owner Photo",
    type: "file",
    required: true,
  },
  {
    id: 10,
    title: "Captain Photo",
    type: "file",
    required: true,
  },
];

export default function NewTeam({ closeFunction, submitFunction }) {
  const [isLoading, setLoading] = useState(false);
  return (
    <>
      <motion.div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            ease: "easeOut",
            duration: 0.15,
          },
        }}
      >
        {!isLoading && (
          <form
            className="relative w-auto my-6 mx-auto max-w-3xl bg-white rounded flex flex-col items-center"
            onSubmit={(event) => {
              setLoading(true);
              submitFunction(event);
            }}
          >
            <p className="font-semibold text-lg mt-5 w-full text-center">
              Team Register
            </p>
            <div className="relative bg-white grid grid-cols-2 gap-5 w-full p-5 rounded-xl">
              {inputNames.map((item) => (
                <div key={item.id}>
                  <label className="text-sm">
                    {item.title}
                    {item.required && <span className="text-red-600"> *</span>}
                  </label>
                  <input
                    id={item.id}
                    type={item.type}
                    required={item.required}
                    placeholder={`Enter your ${item.title}`}
                    className={
                      item.type == "file"
                        ? "w-full outline-0  h-8 text-sm p-1 m-1"
                        : "w-full outline-0 ring-1 rounded ring-slate-400 h-8 text-sm p-4 m-1"
                    }
                    disabled={item.type == "disabled" ? true : false}
                    value={item.value}
                  />
                </div>
              ))}
            </div>
            <div className="flex mb-3 mt-2">
              <button
                type="submit"
                className="w-32 rounded bg-slate-300 h-8 p-2 flex justify-center items-center m-3 cursor-pointer object-center"
                onClick={closeFunction}
              >
                Close
              </button>
              <button
                type="submit"
                className="w-32 rounded bg-indigo-400 h-8 p-2 flex justify-center items-center m-3 cursor-pointer text-white object-center"
              >
                Submit
              </button>
            </div>
          </form>
        )}
        {isLoading && (
          <div
            className={`w-[30%] h-[90%] object-cover rounded col-span-1 flex justify-center items-center`}
          >
            <svg
              aria-hidden="true"
              class="w-14 h-14 mr-2 text-gray-200 animate-spin fill-indigo-400"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        )}
      </motion.div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
