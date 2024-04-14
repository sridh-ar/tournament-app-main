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
  battingStyle,
  bowlingStyle,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
                handleApproved();
              })
              .catch((error) => console.error(error));
          }
        } else {
          if (confirm(`No Payment Data Found. Do you still want to approve?`)) {
            fetch(
              `/api/player?query=update player set approved = true where id ='${id}'`
            )
              .then((response) => response.json())
              .then((data) => {
                handleApproved();
              })
              .catch((error) => console.error(error));
          } else {
            if (confirm(`Do you want to Delete this Player?`)) {
              fetch(`/api/player?query=delete from player where id ='${id}'`)
                .then((response) => response.json())
                .then((data) => {
                  handleApproved();
                })
                .catch((error) => console.error(error));
            }
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
        // src={`/uploads/${image}`}
        src={image}
        alt="Rounded avatar"
        width={200}
        height={200}
        className={`w-28 h-32 object-cover ml-5 rounded col-span-1 ring-1 ring-gray-200 p-1 shadow-md `}
        loading="eager"
        onLoadingComplete={() => setIsLoading(false)}
        hidden={isLoading}
      />
      {isLoading && (
        <div
          className={`w-28 h-32 object-cover ml-5 flex items-center justify-center rounded col-span-1 ring-1 ring-gray-200 p-1 shadow-md`}
        >
          <svg
            aria-hidden="true"
            class="w-10 h-10 mr-2 text-gray-200 animate-spin fill-indigo-400"
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
      <div
        className="text-sm grid grid-cols-3 col-span-2 ml-5"
        onClick={() => setIsOpen(true)}
      >
        <div className="font-semibold col-span-1">
          <p>Name </p>
          <p>Jersey Name </p>
          <p>Contact No </p>
          <p>Player Role </p>
          <p>Team </p>
        </div>
        <div className="capitalize col-span-2">
          <p>
            <b> : </b>
            {name.length > 12 ? name.slice(0, 12) + "..." : name}
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
          battingStyle={battingStyle}
          bowlingStyle={bowlingStyle}
          image={image}
          // isOpen={(target) => handleModel(target)}
          closeModal={() => setIsOpen(false)}
        />
      )}
    </motion.div>
  );
}
