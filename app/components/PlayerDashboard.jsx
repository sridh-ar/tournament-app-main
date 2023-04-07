"use client";
import { useEffect, useState } from "react";
import PlayersCard from "../components/PlayersCard";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 5,
      staggerChildren: 0.05,
    },
  },
};

export default function PlayerDashboard() {
  const [teamData, setTeamData] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [isGenerating, setisGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/player?query=select * from player")
      .then((response) => response.json())
      .then((data) => {
        setTeamData(data);
        setfilteredData(data);
        setisLoading(false);
      })
      .catch((error) => console.error(error));
  }, [isLoading]);

  function handleSearch(value) {
    if (value.length > 0) {
      setfilteredData(teamData.filter((item) => item.id == value));
    } else {
      setfilteredData(teamData);
    }
  }
  async function handleDownload() {
    setisGenerating(true);
    const element = document.getElementById("playersListPdf");
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const url = canvas.toDataURL();
      setImageUrl(url);
      setisGenerating(false);
    });
  }
  return (
    <div className="m-5 overflow-y-auto p-1 w-full flex flex-col items-center ">
      <div class="w-1/3 h-10 fixed z-20">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          class="w-full h-10 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none pr-14"
          placeholder="Search for a player..."
          onChange={(input) => handleSearch(input.target.value)}
        />
        {imageUrl == "" && (
          <button
            class="absolute right-3 bg-indigo-400 rounded text-xs cursor-pointer px-2 py-1 font-semibold text-white top-2"
            onClick={handleDownload}
          >
            Generate
          </button>
        )}
        {imageUrl != "" && (
          <a
            className="absolute right-3 bg-indigo-400 rounded text-xs cursor-pointer px-2 py-1 font-semibold text-white top-2"
            download="Players.jpg"
            href={imageUrl}
          >
            Download
          </a>
        )}
      </div>

      <motion.div
        className={isGenerating ? "" : "grid grid-cols-2 w-full mt-10"}
        variants={container}
        initial="hidden"
        animate="visible"
        id="playersListPdf"
      >
        {!isLoading &&
          filteredData.map((item) => (
            <PlayersCard
              key={item.id}
              name={item.name}
              jerseyname={item.jersey_name}
              contact={item.contact_number}
              role={item.player_role}
              team={item.team_name}
              id={item.id}
              area={item.area}
              image={item.player_photo}
              approved={item.approved}
              handleApproved={() => setisLoading(true)}
              battingStyle={item.batting_style}
              bowlingStyle={item.bowling_style}
            />
          ))}
      </motion.div>
      {(isLoading || isGenerating) && (
        <div class="flex items-center justify-center w-full h-[95%] bg-gray-100 absolute z-10">
          <svg
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
          </svg>
        </div>
      )}
    </div>
  );
}
