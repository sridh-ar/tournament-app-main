"use client";
import Image from "next/image";
import { useState } from "react";
import PlayersCardFull from "./PlayerCardFull";
import { motion } from "framer-motion";
import { CheckCircleIcon, ClockIcon,PhoneIcon,AcademicCapIcon,UserGroupIcon } from "@heroicons/react/24/outline";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";


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
  fromRegisterMenu = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    <div>
      <CardContainer >
        <CardBody className={`bg-white shadow p-3 mx-2 flex h-full items-center  rounded-md ${fromRegisterMenu ? 'w-[100%]' : 'w-[90%]'}`}>
          <CardItem
            translateZ="50"
            className="flex items-center justify-center"
          >
            {isLoading && <img src="/loading.svg" className="absolute rounded-full scale-90" />}
            <Image
              priority
              src={image}
              alt="Rounded avatar"
              width={200}
              height={200}
              className={`w-40 h-40 object-cover mx-5 mr-7 rounded-full col-span-1 ring-1 ring-gray-200 p-0.5 shadow-md `}
              loading="eager"
              onLoadingComplete={() => setIsLoading(false)}
              onClick={() => setIsOpen(true)}
            />
          </CardItem>

          {/* Second Column */}
          <div onClick={() => setIsOpen(true)}>
            {/* Name */}
            <CardItem className="text-lg font-semibold text-gray-600 capitalize mb-2" translateZ="50">
              {name.length > 20 ? name.slice(0, 20) + ".." : name}
            </CardItem>

            {/* Phone */}
            <CardItem className="flex items-center justify-center my-1" translateZ="40">
              <span className=" w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mx-2">
                <PhoneIcon width={20} height={20} />
              </span>

              <div className="text-gray-600 text-sm">
                Phone
                <p className="font-semibold">
                  {contact}
                </p>
              </div>
            </CardItem>

            {/* Role */}
            <CardItem className="flex items-center justify-center my-1" translateZ="50">
              <span className=" w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mx-2">
                <AcademicCapIcon width={20} height={20} />
              </span>

              <div className="text-gray-600 text-sm">
                Role
                <p className="font-semibold">
                  {role}
                </p>
              </div>
            </CardItem>

            {/* Team */}
            <CardItem className="flex items-center justify-center my-1" translateZ="40">
              <span className=" w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mx-2">
                <UserGroupIcon width={20} height={20} />
              </span>

              <div className="text-gray-600 text-sm">
                Team
                <p className="font-semibold">
                  {team}
                </p>
              </div>
            </CardItem>
          </div>
        </CardBody>

        {/* Pending or Approve */}
        {!fromRegisterMenu && (approved ?
          (
            <CardItem className="absolute top-2 right-10" translateZ="40">
              <CheckCircleIcon
                width={25}
                height={25}
                color="green"
              />
            </CardItem>
          )
          : (
            <CardItem className="cursor-pointer absolute top-2 right-10" translateZ="40">
              <ClockIcon
                width={25}
                height={25}
                color="orange"
                onClick={handleApprove}
              />
            </CardItem>

          ))}
      </CardContainer>

       {/* Full Screen */}
       {!fromRegisterMenu && isOpen == true && (
          <PlayersCardFull
            name={name}
            id={id}
            role={role}
            team={team}
            area={area}
            battingStyle={battingStyle}
            bowlingStyle={bowlingStyle}
            image={image}
            closeModal={() => setIsOpen(false)}
          />
        )}
    </div>
  );
}
