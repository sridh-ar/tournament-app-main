"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { ArrowSmallRightIcon, PhoneIcon } from "@heroicons/react/24/outline";
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
    <main className={styles.main}>
      <div
        className="shadow-lg p-2 rounded-full flex justify-center items-center absolute top-4 left-4 hover:scale-110 transition-all"
        onClick={() => setcontactOpened(true)}
      >
        <PhoneIcon width={15} height={15} className="mx-2" />
        {contactOpened && (
          <motion.p
            className="text-sm font-semibold mr-1"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            8682021651
          </motion.p>
        )}
      </div>
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
        <a
          className="font-medium mr-3 cursor-pointer sm:w-full "
          href="/playerRegister"
        >
          {/* {window.innerWidth < 500
            ? "Register for FBPL"
            : "Click here to Register for the FBPL"} */}
          Register for FBPL
        </a>
        <ArrowSmallRightIcon height={30} width={30} />
      </motion.div>
    </main>
  );
}
