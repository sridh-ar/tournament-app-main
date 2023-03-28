import Image from "next/image";
import { motion } from "framer-motion";
import { XCircleIcon } from "@heroicons/react/24/solid";
export default function PlayersCardFull({
  name,
  id,
  role,
  team,
  area,
  image,
  isOpen,
  closeModal,
}) {
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
        // onClick={() => isOpen(event.target.tagName)}
      >
        <Image
          src="/bgimage.jpg"
          alt="Rounded avatar"
          width={2000}
          height={2000}
          className="w-screen rounded col-span-1 absolute z-1 "
        />
        <form className="relative w-screen h-screen rounded-md flex items-center p-10 z-100">
          <Image
            src={`data:image/*;base64,${image}`}
            alt="Rounded avatar"
            width={1000}
            height={1000}
            className="w-[30%] h-[90%] object-cover rounded col-span-1 ring-1 ring-gray-300 shadow"
          />

          <div className="text-2xl grid grid-cols-2 col-span-2  bg-white opacity-50 rounded-lg p-6 ml-5">
            <div className="font-semibold w-40 ml-10">
              <p>Player Name </p>
              <p>Serial No </p>
              <p>Player Role </p>
              <p>Team </p>
              <p>Area </p>
            </div>
            <div className="capitalize font-semibold ">
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
