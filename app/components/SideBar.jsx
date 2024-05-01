import Image from "next/image";
import { useRouter } from "next/navigation";

// Import icons from heroicons/react package
import {
  HomeModernIcon,
  UserGroupIcon,
  ArrowRightOnRectangleIcon,
  BugAntIcon,
  ChatBubbleOvalLeftEllipsisIcon
} from "@heroicons/react/24/solid";

// SideBarItem component
const SideBarItem = ({ isActive, name, setActiveMenu, playerCount = null}) => {
  return (
    <div
      className={`ml-10 flex cursor-pointer w-full p-2 my-1 text-sm font-medium rounded-l-full relative pl-4 ${isActive ? 'text-black bg-gray-200' : 'text-white'}`}
      onClick={() => setActiveMenu(name)}
    >
      {isActive && (
        <>
          <div className="bg-gray-200 absolute transition-colors duration-300 h-5 w-5 -top-5 z-10 right-0">
            <div className="bg-[#54AAB3] transition-colors duration-300 h-5 w-5 rounded-br-2xl"></div>
          </div>
          <div className="bg-gray-200 absolute transition-colors duration-300 h-5 w-5 -bottom-5 z-10 right-0">
            <div className="bg-[#54AAB3] transition-colors duration-300 h-5 w-5 rounded-tr-2xl"></div>
          </div>
        </>
      )}
      {/* Render icon based on name */}
      {name === "Dashboard" && <HomeModernIcon className="w-4 h-4 mr-2" color={isActive ? "#54AAB3" : ""} />}
      {name === "Players" && <UserGroupIcon className="w-4 h-4 mr-2" color={isActive ? "#54AAB3" : ""}/>}
      {name === "Support" && <ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4 mr-2" color={isActive ? "#54AAB3" : ""}/>}
      {name === "Sign Out" && <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" color={isActive ? "#54AAB3" : ""}/>}
      {`${name} ${playerCount ? `(${playerCount})` : ''}`}
    </div>
  );
};

export default function SideBar({ setActiveMenu ,currentActiveMenu, playerCount }) {
  const router = useRouter();

  function handleLogout() {
    if (confirm("Do you want to Logout?")) {
      localStorage.removeItem("aauutthh");
      router.replace("/");
    }
  }

  return (
    <div className="w-[18%] text-white flex flex-col items-center">
      {/* Logo */}
      {/* <div className="flex items-center justify-center p-1 my-2 bg-white rounded shadow"> */}
        <Image src="/New_Logo.png" alt="Next.js Logo" width={150} height={150} className=" my-4 ml-5"/>
        {/* <p className=" text-sm ml-2">FBLP League</p> */}
      {/* </div> */}

      {/* DIvider */}
      <div className="w-[80%] h-[0.5px] bg-gray-200 mb-5"></div>

      {/* Menus */}
      <SideBarItem
        isActive={currentActiveMenu === "Dashboard"}
        name="Dashboard"
        setActiveMenu={(name) => setActiveMenu(name)}
      />
      <SideBarItem
        isActive={currentActiveMenu === "Players"}
        name="Players"
        setActiveMenu={(name) => setActiveMenu(name)}
        playerCount = {playerCount}
      />

       {/* DIvider */}
       <div className="w-[80%] h-[0.5px] bg-gray-200 my-5"></div>

       <SideBarItem
        isActive={currentActiveMenu === "Support"}
        name="Support"
        setActiveMenu={() => router.push("/support")}
      />
      <SideBarItem
        isActive={currentActiveMenu === "Sign Out"}
        name="Sign Out"
        setActiveMenu={handleLogout}
      />


    </div>
  );
}
