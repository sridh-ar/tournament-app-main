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
          alert("Player already part of another team or Not Available");
        } else if (data.approved?.toString() == "false") {
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
