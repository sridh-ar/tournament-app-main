"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import NewTeam from "./NewTeam";
import NewTeamPlayer from "./NewTeamPlayer";
import { motion } from "framer-motion";

export default function Table({ selectedTeamModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddOpen, setisAddOpen] = useState(false);
  const [teamData, setTeamData] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState({});
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    fetch(
      "/api/team?query=select *,CONVERT(team_photo USING utf8) as teamphoto from team"
    )
      .then((response) => response.json())
      .then((data) => {
        setTeamData(data);
        setisLoading(false);
      })
      .catch((error) => console.error(error));
  }, [isOpen]);

  async function handleSubmit(event) {
    event.preventDefault();
    let values = [];
    let imageResult = "";
    for (let i = 0; i < 10; i++) {
      if (i == 7 || i == 8 || i == 9) {
        imageResult = await handleImageChange(event.target[i].files[0]);
        // console.log("imageResult", imageResult);
        // values.push(base64Image);
        values.push(imageResult);
      } else {
        values.push(event.target[i].value);
      }
    }
    console.log("Values for the player - ", values);
    fetch("/api/team", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsOpen(false);
        setisLoading(true);
      })
      .catch((error) => console.error(error));
  }

  async function handleImageChange(event) {
    return new Promise(async (resolve) => {
      const file = event;
      if (file) {
        if (file.size > 1097152) {
          // setBase64Image("");
          alert("File size should be less than 1Mb.");
        } else {
          const reader = new FileReader();

          reader.addEventListener("load", () => {
            const base64String = reader.result.split(",")[1];
            // setBase64Image(base64String);
            // console.log("base64String", base64String);
            return resolve(base64String);
          });

          reader.readAsDataURL(file);
        }
      }
    });
  }

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.05,
      },
    },
  };

  const itemAnimation = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="bg-white rounded shadow m-5 overflow-y-auto p-1 w-full">
      {!isLoading && (
        <motion.table
          className="table-auto w-full divide-y text-center"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <tr className="bg-slate-100 h-10 text-sm divide-x rounded ">
            <th>Team Name</th>
            <th>Captain</th>
            <th>Owner</th>
            <th>Slots</th>
            <th>Remaining Slots</th>
            <th>Total Points</th>
            <th>Remaining Pts</th>
          </tr>

          {teamData.map((item) => (
            <motion.tr
              className="p-2 h-12 text-sm"
              key={item.id}
              variants={itemAnimation}
            >
              <td>
                <div className="grid grid-cols-3 items-center justify-items-center gap-0">
                  <Image
                    src={`data:image/*;base64,${item.teamphoto}`}
                    alt="Rounded avatar"
                    width={30}
                    height={30}
                    className="mr-3 ml-5 col-span-1 object-cover ounded ring-1 ring-gray-200 shadow-md"
                  />
                  <button
                    href=""
                    className="capitalize text-start col-span-2"
                    onClick={() => selectedTeamModal([item.id, item.team_name])}
                  >
                    {item.team_name.length > 15
                      ? `${item.team_name.slice(0, 15)}...`
                      : item.team_name}
                  </button>
                </div>
              </td>
              <td className="capitalize">
                {item.captain.length > 15
                  ? `${item.captain.slice(0, 15)}...`
                  : item.captain}
              </td>
              <td className="capitalize">
                {item.owner.length > 10
                  ? `${item.owner.slice(0, 10)}...`
                  : item.owner}
              </td>
              <td>{item.slots}</td>
              <td className="flex justify-center items-center h-12">
                {item.remaining_slots}
                {item.remaining_slots && (
                  <div
                    className="bg-slate-50 rounded-lg w-16 text-xs ring-1 ml-5 ring-gray-200 cursor-pointer"
                    onClick={() => {
                      setisAddOpen(true);
                      setSelectedTeam({
                        team_name: item.team_name,
                        team_id: item.id,
                        remaining_points: item.remaining_points_available,
                      });
                    }}
                  >
                    Add
                  </div>
                )}
              </td>
              <td>{item.total_points_available}</td>
              <td>{item.remaining_points_available}</td>
            </motion.tr>
          ))}
        </motion.table>
      )}
      {isLoading && (
        <div class="flex items-center justify-center w-full h-full bg-gray-100 ">
          <img src="/loader.gif" alt="loader" class="w-52 h-52" />
          {/* <svg
            aria-hidden="true"
            class="w-16 h-16 mr-2 text-gray-200 animate-spin fill-indigo-400"
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
          </svg> */}
        </div>
      )}
      {!isLoading && (
        <button
          className="w-10 rounded-full bg-indigo-400 h-10 p-2 z-2 flex justify-center shadow items-center m-3 cursor-pointer text-white text-lg fixed bottom-8 right-14"
          onClick={() => setIsOpen(true)}
        >
          +
        </button>
      )}
      {isOpen && (
        <NewTeam
          closeFunction={() => setIsOpen(false)}
          submitFunction={(event) => handleSubmit(event)}
        />
      )}
      {isAddOpen && (
        <NewTeamPlayer
          closeFunction={() => setisAddOpen(false)}
          selectedTeam={selectedTeam}
        />
      )}
    </div>
  );
}

// w-28 rounded bg-indigo-400 h-8 p-2 flex justify-center items-center m-3 cursor-pointer text-white text-sm fixed bottom-5 right-5"
