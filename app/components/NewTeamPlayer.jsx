"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function NewTeamPlayer({ closeFunction, selectedTeam }) {
  const [inputNames, setinputNames] = useState([
    {
      id: 1,
      title: "Team Name",
      type: "disabled",
      value: selectedTeam.team_name,
    },
    {
      id: 2,
      title: "Player No",
      type: "text",
      required: true,
    },
    {
      id: 3,
      title: "Player Name",
      type: "text",
      required: true,
    },
    {
      id: 4,
      title: "Points",
      type: "number",
    },
  ]);
  const [playerData, setPlayerData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  function handleChange(target) {
    if (target.placeholder.includes("Player No")) {
      const query = `select name,player_role from player where approved = true and id = ${
        parseInt(target.value) || 0
      }`;
      fetch(`/api/player?query=${query}`)
        .then((response) => response.json())
        .then((data) => setPlayerData(data))
        .catch((err) => console.log(err));
    }
  }
  function handleSubmit(event) {
    setLoading(true);
    event.preventDefault();
    const query = `select player_no from team_players where player_no = ${parseInt(
      event.target[1].value
    )}`;

    fetch(`/api/player?query=${query}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.length > 0) {
          setLoading(false);
          alert("Player already part of another team or Not Available");
        } else if (data.approved?.toString() == "false") {
          setLoading(false);
          alert("Player is Not Approved by Admin");
        } else {
          let values = [];
          for (let i = 0; i < 4; i++) {
            values.push(event.target[i].value);
          }
          values.push(selectedTeam.team_id);
          console.log("Values for the New Team Player - ", values);
          fetch("/api/teamplayers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          })
            .then((response) => response.json())
            .then((data) => closeFunction())
            .catch((error) => console.error(error));
        }
      })
      .catch((err) => console.log(err));
  }
  function handleOnClick(name) {
    const index = inputNames.findIndex((input) => input.id === 3);

    let updatedInputNames = [...inputNames];
    updatedInputNames[index] = {
      ...updatedInputNames[index],
      value: name,
    };
    setinputNames(updatedInputNames);
    setPlayerData([]);
  }

  function PlayerCard({ name, role, image }) {
    return (
      <motion.div
        className="flex bg-white rounded p-2 shadow-md ring-1 ring-gray-200 absolute right-4 top-[85px] cursor-pointer w-[45%]"
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
        {/* <Image
          src={`data:image/*;base64,${image}`}
          alt="Rounded avatar"
          width={40}
          height={40}
          className="rounded bg-red-300 w-12 h-12 object-cover"
          onClick={() => handleOnClick(name)}
        /> */}
        <div
          className="text-sm grid grid-cols-2 col-span-2"
          onClick={() => handleOnClick(name)}
        >
          <div className="font-semibold w-[90px] ml-5">
            <p>Name </p>
            <p>Player Role </p>
          </div>
          <div className="capitalize ">
            <p>
              <b> : </b>
              {name}
            </p>
            <p>
              <b>: </b>
              {role}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

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
            onSubmit={(event) => handleSubmit(event)}
          >
            <p className="font-semibold text-lg mt-5 w-full text-center">
              New Player
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
                    onChange={(event) => handleChange(event.target)}
                    max={item.id === 4 ? selectedTeam.remaining_points : 99999}
                  />
                </div>
              ))}
              {playerData.length > 0 && (
                <PlayerCard
                  name={playerData[0]?.name}
                  role={playerData[0]?.player_role}
                />
              )}
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
          <motion.div className="flex flex-col justify-center items-center h-screen  ">
            <img src="/loading2.svg" alt="loader" class="w-52 h-52" />
          </motion.div>
        )}
      </motion.div>

      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
