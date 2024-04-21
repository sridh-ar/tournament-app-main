"use client";
import { validateToken } from "../../lib/auth/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PlayerDashboard from "../components/PlayerDashboard";
import SideBar from "../components/SideBar";
import Table from "../components/Table";
import TeamTable from "../components/TeamTable";

export default function Page() {
  const [category, setCategory] = useState("Dashboard");
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
      <div className="flex w-full h-screen bg-[#54AAB3]">
        <SideBar
          setActiveMenu={(category) => {
            setCategory(category);
            setselectedTeam([]);
          }}
          currentActiveMenu={category}
          playerCount={playerCount}
        />
        {selectedTeam.length === 0 && category == "Dashboard" && (
          <Table selectedTeamModal={(team) => setselectedTeam(team)} />
        )}
        {category == "Players" && <PlayerDashboard />}
        {selectedTeam.length > 0 && <TeamTable team_detail={selectedTeam} />}
      </div>
    );
  }
}
