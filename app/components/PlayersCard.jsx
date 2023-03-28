"use client";
import Image from "next/image";
import { useState } from "react";
import PlayersCardFull from "./PlayerCardFull";
import { motion } from "framer-motion";

export default function PlayersCard({
  name,
  jerseyname,
  contact,
  role,
  team,
  id,
  area,
  image,
}) {
  const [isOpen, setIsOpen] = useState(false);
  // function handleModel(target) {
  //   if (target == "DIV") {
  //     setIsOpen(false);
  //   }
  // }

  const itemAnimation = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <motion.div
      className="bg-white rounded-md m-5 p-3 items-center shadow grid grid-cols-3"
      variants={itemAnimation}
    >
      <Image
        src={`data:image/*;base64,${image}`}
        alt="Rounded avatar"
        width={200}
        height={200}
        className="w-28 h-32 object-cover ml-5 rounded col-span-1 ring-1 ring-gray-200 p-1 shadow-md"
        onClick={() => setIsOpen(true)}
      />
      <div
        className="text-sm grid grid-cols-2 col-span-2"
        onClick={() => setIsOpen(true)}
      >
        <div className="font-semibold w-24 ml-10">
          <p>Name </p>
          <p>Jersey Name </p>
          <p>Contact No </p>
          <p>Player Role </p>
          <p>Team </p>
        </div>
        <div className="capitalize ">
          <p>
            <b> : </b>
            {name}
          </p>
          <p>
            <b>: </b>
            {jerseyname}
          </p>
          <p>
            <b>: </b>
            {contact}
          </p>
          <p>
            <b>: </b>
            {role}
          </p>
          <p>
            <b>: </b>
            {team}
          </p>
        </div>
      </div>
      {isOpen && (
        <PlayersCardFull
          name={name}
          id={id}
          role={role}
          team={team}
          area={area}
          image={image}
          // isOpen={(target) => handleModel(target)}
          closeModal={() => setIsOpen(false)}
        />
      )}
    </motion.div>
  );
}
