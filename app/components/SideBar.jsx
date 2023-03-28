"use client";
import Image from "next/image";
import {
  HomeModernIcon,
  UserGroupIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function SideBar({ whichOne, active, playerCount }) {
  const router = useRouter();
  function handleLogout() {
    if (confirm("Do you want to Logout?")) {
      localStorage.removeItem("aauutthh");
      router.replace("/");
    }
  }
  return (
    <div className="bg-white w-3/12 p-5 shadow-md">
      <div className="flex  items-center justify-between pt-5 p-1">
        <Image src="/leo.png" alt="Next.js Logo" width={35} height={35} />
        <p className="font-semibold">FireBoys Premier League</p>
      </div>
      <div className=" h-px m-3 bg-gray-400" />

      {/* DashBoard Items */}
      <div
        className={`flex items-center m-5 cursor-pointer hover:bg-indigo-200 p-2 px-3 rounded ${
          active == "dashboard" ? "bg-indigo-200 bg-opacity-30" : ""
        } `}
        onClick={() => whichOne("dashboard")}
      >
        <HomeModernIcon height={20} width={20} />
        <p className="text-sm ml-3 font-semibold">Dashboard</p>
      </div>

      <div
        className={`flex items-center m-5 cursor-pointer hover:bg-indigo-200 p-2 px-3 rounded ${
          active == "players" ? "bg-indigo-200 bg-opacity-30" : ""
        } `}
        onClick={() => whichOne("players")}
      >
        <UserGroupIcon height={20} width={20} />
        <p className="text-sm ml-3 font-semibold">Players ({playerCount})</p>
      </div>

      <div
        className="flex items-center m-5 cursor-pointer hover:bg-indigo-200 p-2 px-3 rounded"
        onClick={handleLogout}
      >
        <ArrowRightOnRectangleIcon height={20} width={20} />
        <p className="text-sm ml-3 font-semibold">Logout</p>
      </div>
    </div>
  );
}
