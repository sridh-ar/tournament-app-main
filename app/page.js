"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { validateToken } from "@/lib/auth/auth";

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

  async function validateUser() {
    const res = await validateToken();
    if (res) setLoggedIn(true);
    else setLoggedIn(false);
  }

  useEffect(() => {
    validateUser();
  }, []);

  return (
    <main className={styles.main}>
      <motion.div
        className={styles.center}
        initial="hidden"
        animate="visible"
        variants={container}
      >
        <Link
          href={
            window.innerWidth < 500 ? "/" : loggedIn ? "/dashboard" : "/signin"
          }
        >
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
        <a
          className="font-medium mr-3 cursor-pointer sm:w-full "
          href="/playerRegister"
        >
          {window.innerWidth < 500
            ? "Register for FBPL"
            : "Click here to Register for the FBPL"}
        </a>
        <ArrowSmallRightIcon
          height={window.innerWidth < 500 ? 20 : 30}
          width={30}
        />
      </motion.div>
    </main>
  );
}
