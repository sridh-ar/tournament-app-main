import Image from "next/image";
import { motion } from "framer-motion";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
export default function PlayersCardFull({
  name,
  id,
  role,
  team,
  battingStyle,
  bowlingStyle,
  area,
  image,
  isOpen,
  closeModal,
}) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      <motion.div
        className="justify-center items-center flex overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none"
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
        <Image
          src="/bgimage.jpg"
          alt="Rounded avatar"
          width={1000}
          height={1000}
          className="w-screen rounded col-span-1 absolute z-1 "
        />
        <form className="relative w-screen h-screen rounded-md flex items-center p-10 z-100">
          <Image
            priority
            src={image}
            alt="Rounded avatar"
            width={1000}
            height={1000}
            className={`w-[30%] h-[90%] object-cover rounded col-span-1 ring-1 ring-gray-300 shadow ${
              isLoading ? "hidden" : ""
            }`}
            onLoad={() => setIsLoading(false)}
          />
          {isLoading && (
            <div
              className={`w-[30%] h-[90%] object-cover rounded col-span-1 ring-1 ring-gray-300 shadow flex justify-center items-center`}
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

          <div className="text-3xl grid grid-cols-2 w-[50%] bg-white opacity-70 rounded-lg p-6 ml-5 font-bold">
            <div className=" ml-10">
              <p>Player Name </p>
              <p>Serial No </p>
              <p>Player Role </p>
              <p>Batting Style </p>
              <p>Bowling Style </p>
              <p>Team </p>
              <p>Area </p>
            </div>
            <div className="capitalize ">
              <p>
                <b> : </b>
                {name}
              </p>
              <p>
                <b>: </b>
                {id}
              </p>
              <p>
                <b>: </b>
                {role}
              </p>
              <p>
                <b>: </b>
                {battingStyle}
              </p>
              <p>
                <b>: </b>
                {bowlingStyle}
              </p>
              <p>
                <b>: </b>
                {team}
              </p>
              <p>
                <b>: </b>
                {area}
              </p>
            </div>
            <div className="absolute top-8 right-8 cursor-pointer">
              <XCircleIcon
                width={50}
                height={50}
                color="gray"
                onClick={() => closeModal()}
              />
            </div>
          </div>
        </form>
      </motion.div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
