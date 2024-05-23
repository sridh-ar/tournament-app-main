"use client";
import styles from "./page.module.css";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { validateToken } from "../lib/auth/auth";
import Footer from "./components/Footer";
import LoadingScreen from "./components/utils/LoadingScreen";
import { useSelector, useDispatch } from 'react-redux';
import { updateConfigStateValue } from "../lib/redux/stateVariables";

const container = {
  hidden: { opacity: 1, scale: 0, y: 300 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
};
const itemAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [remainingSlots, setremainingSlots] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const configValues = useSelector((state) => state.config.value);

  async function validateUser() {
    const res = await validateToken();
    if (res) setLoggedIn(true);
    else setLoggedIn(false);
  }

  async function initialDataRetrival() {
    fetch("/api/dashboard", { method: "GET" })
      .then((response) => response.json())
      .then(result => {
        const configObject = result.reduce((accumulator, current) => {
          accumulator[current.config_name] = current.config_value;
          return accumulator;
        }, {});

        dispatch(updateConfigStateValue(configObject))
      })
  }

  useEffect(() => {
    validateUser();
    initialDataRetrival();

    setTimeout(() => setIsLoading(false),200);

  }, []);
  return (
    isLoading ?
      (
        <div className="w-screen h-screen">
          <LoadingScreen />
        </div>
      )
      :
      (
        <main className="flex items-center flex-col h-full w-full">
          <motion.div
            className={styles.center}
            initial="hidden"
            animate="visible"
            variants={container}
          >
            <Link href={loggedIn ? "/dashboard" : "/signin"}>
              <img
                // className={styles.logo}
                className="relative"
                src="/leo.png"
                alt="Next.js Logo"
                width={250}
                height={250}
                priority
              />
            </Link>
          </motion.div>
          <motion.div
            className="flex justify-center items-center transition-all bg-[#ffffff] shadow px-6 py-1.5 rounded-full "
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.1 }}
            transition={{ ease: "easeIn", duration: 0.01 }}
            variants={itemAnimation}
          >
            <a className="text-sm tracking-wide cursor-pointer mr-1 sm:w-full" href={parseInt(configValues.allowedRegistrationCount) - parseInt(configValues.totalRegisteredPlayers) <= 0 ? '#' : `/playerRegister`}>
              {"Register for "}
              <span className="text-xs">
                {/* Application Name from Redux Store */}
                {configValues.appName}
              </span> 🏆
            </a>

          </motion.div >
          <motion.span className="text-xs tracking-wide text-orange-600 mt-3"
            initial="hidden"
            animate="visible"
            transition={{ ease: "easeIn", duration: 0.5 }}
            variants={itemAnimation}
          >
            Remaininig Slots - {parseInt(configValues.allowedRegistrationCount) - parseInt(configValues.totalRegisteredPlayers)}
          </motion.span>
          <Footer />
        </main>
      )

  );
}
