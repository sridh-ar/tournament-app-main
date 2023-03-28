"use client";
import { motion } from "framer-motion";

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
        <form
          className="relative w-auto my-6 mx-auto max-w-3xl bg-white rounded flex flex-col items-center"
          onSubmit={(event) => submitFunction(event)}
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
      </motion.div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
