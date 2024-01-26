"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { ArrowSmallRightIcon, PhoneIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { validateToken } from "@/lib/auth/auth";

const ApplicationName = process.env.APPLICATIONNAME || 'Demo'

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
  const [contactOpened, setcontactOpened] = useState(false);

  async function validateUser() {
    const res = await validateToken();
    if (res) setLoggedIn(true);
    else setLoggedIn(false);
  }

  useEffect(() => {
    validateUser();
  }, []);

  return (
    <main className="flex items-center flex-col h-screen">
      <a
        className="shadow-lg px-2 h-8 rounded-full flex items-center justify-between absolute top-4 right-4"
        href="/support"
      >
        <PhoneIcon width={15} height={15} className="ml-1"  />
        <p className="text-sm font-semibold mx-2 ">Contact</p>
        {/* <div className="w-0.5 h-4 bg-gray-400"  />
        <p className="text-sm font-semibold mx-2">Terms & Conditions</p>
        <div className="w-0.5 h-4 bg-gray-400"  />
        <p className="text-sm font-semibold mx-2">Privacy Policy</p> */}
      </a>
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
        <a className="font-medium mr-3 cursor-pointer sm:w-full " href="/">
          Register for {ApplicationName}
        </a>
        <ArrowSmallRightIcon height={30} width={30} />
      </motion.div>
    </main>
  );
}
