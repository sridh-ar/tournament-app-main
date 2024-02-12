"use client";
import { validateToken } from "@/lib/auth/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PlayerDashboard from "../components/PlayerDashboard";
import SideBar from "../components/SideBar";
import Table from "../components/Table";
import TeamTable from "../components/TeamTable";
import FileUpload from "../components/FileUpload";

export default function Page() {
  const [category, setCategory] = useState("dashboard");
  const [loggedIn, setLoggedIn] = useState(false);
  const [playerCount, setplayerCount] = useState(0);
  const [selectedTeam, setselectedTeam] = useState([]);
  const router = useRouter();

  async function validateUser() {
    const res = await validateToken();
    if (res) {
      setLoggedIn(true);
      fetch("/api/player?query=select count(*) as playercount from player")
        .then((response) => response.json())
        .then((data) => setplayerCount(data[0].playercount))
        .catch((error) => console.error(error));
    } else {
      setLoggedIn(false);
      router.replace("/");
    }
  }

  useEffect(() => {
    validateUser();
  }, []);

  if (loggedIn) {
    return (
      <div className="flex w-full h-screen bg-gray-100">
        <SideBar
          whichOne={(category) => {
            setCategory(category);
            setselectedTeam([]);
          }}
          active={category}
          playerCount={playerCount}
        />
        {selectedTeam.length === 0 && category == "dashboard" && (
          <Table selectedTeamModal={(team) => setselectedTeam(team)} />
        )}
        {category == "players" && <PlayerDashboard />}
        {category == "logoUpload" && <FileUpload />}
        {selectedTeam.length > 0 && <TeamTable team_detail={selectedTeam} />}
      </div>
    );
  }
}
