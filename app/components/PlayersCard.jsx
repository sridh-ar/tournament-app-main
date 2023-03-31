"use client";
import Image from "next/image";
import { useState } from "react";
import PlayersCardFull from "./PlayerCardFull";
import { motion } from "framer-motion";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline";

export default function PlayersCard({
  name,
  jerseyname,
  contact,
  role,
  team,
  id,
  area,
  image,
  approved,
  handleApproved,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const itemAnimation = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  function handleApprove() {
    fetch(
      `/api/player?query=select gpay_no,transaction_id from payment_details where player_no ='${id}'`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          if (
            confirm(
              `Do you want to Approve this Player?\nGpay No: ${data[0].gpay_no} \nTransID: ${data[0].transaction_id}`
            )
          ) {
            fetch(
              `/api/player?query=update player set approved = true where id ='${id}'`
            )
              .then((response) => response.json())
              .then((data) => {
                // approved = true;
                handleApproved();
              })
              .catch((error) => console.error(error));
          }
        } else {
          if (
            confirm(`No Payment Data Found. Do you want to delete this Player?`)
          ) {
            fetch(`/api/player?query=delete from player where id ='${id}'`)
              .then((response) => response.json())
              .then((data) => {
                handleApproved();
              })
              .catch((error) => console.error(error));
          }
        }
      })
      .catch((error) => console.error(error));
  }
  return (
    <motion.div
      className="bg-white rounded-md m-5 p-3 items-center shadow grid grid-cols-3 relative"
      variants={itemAnimation}
    >
      <Image
        priority
        src={image}
        alt="Rounded avatar"
        width={200}
        height={200}
        className={`w-28 h-32 object-cover ml-5 rounded col-span-1 ring-1 ring-gray-200 p-1 shadow-md `}
        loading="eager"
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
      {/* Pending or Approve Image */}
      {approved == true && (
        <CheckCircleIcon
          width={25}
          height={25}
          color="green"
          className="absolute top-2 right-2"
        />
      )}
      {!approved && (
        <ClockIcon
          width={25}
          height={25}
          color="orange"
          className="absolute top-2 right-2 cursor-pointer"
          onClick={handleApprove}
        />
      )}

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
