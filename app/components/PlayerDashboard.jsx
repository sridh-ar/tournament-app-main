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
    <div className="bg-gray-200 rounded shadow mx-5 my-3 overflow-y-auto p-1 w-full">
      <motion.div
        className={isGenerating ? "" : "grid grid-cols-2 w-full mt-10 p-0"}
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
    </div>


  );
}
