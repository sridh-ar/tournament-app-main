"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Pagination from "../components/Pagination";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { makePayment } from "@/lib/payment/paymentGateway";

const inputNames = [
  {
    id: 1,
    title: "Player Name",
    type: "text",
    required: true,
  },
  {
    id: 2,
    title: "Date of Birth",
    type: "date",
    required: true,
  },
  {
    id: 3,
    title: "Age",
    type: "number",
    required: true,
  },
  {
    id: 4,
    title: "Contact number",
    type: "text",
    required: true,
  },
  {
    id: 5,
    title: "Team Name",
    type: "text",
    required: true,
  },
  {
    id: 6,
    title: "Name in Jersey",
    type: "text",
    required: true,
  },
  {
    id: 7,
    title: "Jersey Size",
    type: "select",
    required: false,
    options: [
      {
        id: 1,
        value: "",
      },
      {
        id: 2,
        value: "Small",
      },
      {
        id: 3,
        value: "Medium",
      },
      {
        id: 4,
        value: "Large",
      },
      {
        id: 5,
        value: "Extra Large (XL)",
      },
      {
        id: 6,
        value: "XXL",
      },
      {
        id: 7,
        value: "XXXL",
      },
    ],
  },
  {
    id: 8,
    title: "Jersey No",
    type: "number",
    required: true,
  },
  {
    id: 9,
    title: "Area",
    type: "text",
    required: true,
  },
  {
    id: 10,
    title: "Player Photo",
    type: "file",
    required: true,
  },
  {
    id: 11,
    title: "Player Role",
    type: "select",
    required: true,
    options: [
      {
        id: 1,
        value: "",
      },
      {
        id: 2,
        value: "All Rounder",
      },
      {
        id: 3,
        value: "Batsman",
      },
      {
        id: 4,
        value: "Bowler",
      },
    ],
  },
  {
    id: 12,
    title: "Batting Style",
    type: "select",
    required: false,
    options: [
      {
        id: 1,
        value: "",
      },
      {
        id: 2,
        value: "Right",
      },
      {
        id: 3,
        value: "Left",
      },
    ],
  },
  // {
  //   id: 13,
  //   title: "Bowler",
  //   type: "select",
  //   required: true,
  //   options: [
  //     {
  //       id: 1,
  //       value: "",
  //     },
  //     {
  //       id: 2,
  //       value: "Right-Arm",
  //     },
  //     {
  //       id: 3,
  //       value: "Left-Arm",
  //     },
  //   ],
  // },
  {
    id: 14,
    title: "Bowling Style",
    type: "select",
    required: false,
    options: [
      {
        id: 1,
        value: "",
      },
      {
        id: 2,
        value: "Fast",
      },
      {
        id: 3,
        value: "Medium",
      },
      {
        id: 4,
        value: "Spin",
      },
    ],
  },
  // {
  //   id: 15,
  //   title: "Wicket Keeper",
  //   type: "select",
  //   required: true,
  //   options: [
  //     {
  //       id: 1,
  //       value: "",
  //     },
  //     {
  //       id: 2,
  //       value: "true",
  //     },
  //     {
  //       id: 3,
  //       value: "false",
  //     },
  //   ],
  // },
];

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.05,
    },
  },
};

const itemAnimation = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function Page() {
  // const [base64Image, setBase64Image] = useState("");
  const [isPaid, setisPaid] = useState(false);
  const [id, setId] = useState("");
  const router = useRouter();

  async function handleImageChange(event) {
    return new Promise(async (resolve) => {
      const file = event;
      if (file) {
        if (file.size > 1097152) {
          // setBase64Image("");
          alert("File size should be less than 1Mb.");
        } else {
          const reader = new FileReader();

          reader.addEventListener("load", () => {
            const base64String = reader.result.split(",")[1];
            // setBase64Image(base64String);
            // console.log("base64String", base64String);
            return resolve(base64String);
          });

          reader.readAsDataURL(file);
        }
      }
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let values = [];
    let imageResult = "";
    for (let i = 0; i < 13; i++) {
      //storing the image
      if (i == 9) {
        imageResult = await handleImageChange(event.target[i].files[0]);
        // console.log("imageResult", imageResult);
        // values.push(base64Image);
        values.push(imageResult);
      } else {
        values.push(event.target[i].value);
      }
    }
    console.log("Values for the player - ", values);
    //Payment calling
    if (imageResult) {
      const result = await makePayment(values[0], "", values[3], 111);
      if (result) {
        //insert into table
        fetch("/api/player", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((response) => response.json())
          .then((data) => setId(data.insertId))
          .catch((error) => console.error(error));

        setisPaid(true);
        setTimeout(() => {
          router.push("/");
        }, 5000);
      } else {
        alert("Something went wrong, please contact Admin");
      }
    }
  }

  return (
    <form
      className="flex flex-col justify-between items-center p-5 h-screen"
      onSubmit={handleSubmit}
    >
      <motion.div
        className="bg-white w-full p-5 rounded-lg items-center justify-center flex flex-col shadow"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <p className="font-semibold text-lg m-5">Player Register Form</p>
        {/* <Pagination third /> */}
        {!isPaid && (
          <>
            <div className="grid grid-cols-2 gap-5 w-full p-5 ">
              {inputNames.map((item) => (
                <div key={item.id}>
                  <motion.label className="text-sm" variants={itemAnimation}>
                    {item.title}
                    {item.required && <span className="text-red-600"> *</span>}
                  </motion.label>
                  {item.type != "select" && (
                    <motion.input
                      id={item.id}
                      variants={itemAnimation}
                      type={item.type}
                      required={item.required}
                      placeholder={`Enter your ${item.title}`}
                      className={
                        item.type == "file"
                          ? "w-full outline-0  h-8 text-sm p-1 m-1"
                          : "w-full outline-0 ring-1 rounded ring-slate-400 h-8 text-sm p-4 m-1"
                      }
                    />
                  )}
                  {item.type == "select" && (
                    <motion.select
                      variants={itemAnimation}
                      className="w-full outline-0 ring-1 rounded ring-slate-400 h-8 text-sm pl-3 m-1"
                      id={item.id}
                    >
                      {item.options.map((item) => (
                        <option key={item.id} value={item.value}>
                          {item.value == "true"
                            ? "Yes"
                            : item.value == "false"
                            ? "No"
                            : item.value}
                        </option>
                      ))}
                    </motion.select>
                  )}
                </div>
              ))}
            </div>
            <div className="w-full flex flex-col text-sm">
              <h3 className="font-bold">Terms & Conditons:</h3>
              <ol className="list-disc relative left-10 my-3 w-[90%] sm:w-full break-words">
                <li>Player Registration Amount is Rs.111/-</li>
                <li className="break-words">
                  Players Should be available for the whole tournament{" "}
                </li>
                <li>
                  If the players not available with out any valid reason, player
                  cannot participate the tournament for next 2 seasons
                </li>
                <li>
                  If the player Gets caught for chucking he cannot bowl for the
                  Rest of the tournament
                </li>
              </ol>
            </div>
          </>
        )}
        {isPaid && (
          <div className="flex flex-col justify-center items-center m-10">
            <CheckCircleIcon width={100} height={100} color="green" />
            <p className="font-bold mt-4 text-xl">Thanks for Registering!</p>
          </div>
        )}

        {!isPaid && (
          <motion.button
            type="submit"
            variants={itemAnimation}
            className="w-48 rounded bg-indigo-400 h-10 p-2 flex justify-center items-center m-3 cursor-pointer text-white relative"
            whileHover={{ scale: 1.1 }}
          >
            Click & Pay to Register
          </motion.button>
        )}
      </motion.div>
    </form>
  );
}
