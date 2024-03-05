"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { ArrowSmallRightIcon, PhoneIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { validateToken } from "@/lib/auth/auth";
import Footer from "./components/Footer";

const ApplicationName = process.env.NEXT_PUBLIC_APPLICATIONNAME || 'FBPL'

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
  const [contactOpened, setcontactOpened] = useState(false);
  const totalSlots = 160

  async function validateUser() {
    const res = await validateToken();
    if (res) setLoggedIn(true);
    else setLoggedIn(false);
  }

  async function getRemainingSlots(){
    const query = `select count(*) as count from player`;
    fetch(`/api/player?query=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setremainingSlots(totalSlots - data[0].count);
        setisLoading(false);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    validateUser();
    getRemainingSlots();
  }, []);

  return (
    <main className="flex items-center flex-col h-full w-full">
      {/* <a
        className="shadow-lg px-2 h-8 rounded-full flex items-center justify-between absolute top-4 right-4"
        href="/support"
      >
        <PhoneIcon width={15} height={15} className="ml-1"  />
        <p className="text-sm font-semibold mx-2 ">Contact</p>
      </a> */}
      <motion.div
        className={styles.center}
        initial="hidden"
        animate="visible"
        variants={container}
      >
        <Link href={loggedIn ? "/dashboard" : "/signin"}>
          <Image
            className={styles.logo}
            src="/leo.png"
            alt="Next.js Logo"
            width={250}
            height={250}
            priority
          />
        </Link>
      </motion.div>
      <motion.div
        className="flex justify-center items-center hover:scale-110 transition-all  "
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.1 }}
        transition={{ ease: "easeIn", duration: 0.01 }}
        variants={itemAnimation}
      >
        <a className="font-medium mr-3 cursor-pointer sm:w-full" href={remainingSlots <= 0 ? '#' : `/playerRegister`}>
          Register for {ApplicationName}
        </a>
        <ArrowSmallRightIcon height={30} width={30} />
      </motion.div >
        <motion.span className="text-xs text-orange-600 mt-3"
          initial="hidden"
          animate="visible"
          transition={{ ease: "easeIn", duration: 0.5 }}
          variants={itemAnimation}
        >
          Remaininig Slots - {remainingSlots}
        </motion.span>
      <Footer />
    </main>
  );
}
