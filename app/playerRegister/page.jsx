"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import PaymentPage from "../components/PaymentPage";
import { uploadBytes, ref, getStorage, getDownloadURL } from "firebase/storage";
import { firebaseApp } from "@/lib/firebase";

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
  const [isLoading, setisLoading] = useState(false);
  const [isTermAccepted, setisTermAccepted] = useState(false);
  const [id, setId] = useState("");
  const router = useRouter();

  async function handleSubmit(event) {
    setisLoading(true);

    event.preventDefault();
    let values = [];
    let imageResult = "";
    for (let i = 0; i < 13; i++) {
      //storing the image
      if (i == 9) {
        //Storing it in Firebase
        imageResult = event.target[i].files[0];
        const storage = getStorage(firebaseApp);
        const imageRef = ref(
          storage,
          `kpl/Player_${Math.floor(Math.random() * 90000) + 10000}`
        );
        await uploadBytes(imageRef, imageResult).then(async (res) => {
          await getDownloadURL(res.ref).then((res) => {
            values.push(res);
          });
        });
      } else {
        values.push(event.target[i].value);
      }
    }
    values.push(false);
    console.log("Values for the player - ", values);
    // settempData(values);
    //Payment calling
    // if (imageResult) {
    //   const result = await makePayment(values[0], "", values[3], 111);
    //   if (result) {
    //     //insert into table
    fetch("/api/player", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        setId(data.insertId);
        setisLoading(false);
      })
      .catch((error) => console.error(error));

    //     setisPaid(true);
    //     setTimeout(() => {
    //       router.push("/");
    //     }, 5000);
    //   } else {
    //     alert("Something went wrong, please contact Admin");
    //   }
    // }
  }

  if (id && !isPaid) {
    return (
      <PaymentPage
        submit={() => {
          setisPaid(true);
          setTimeout(() => {
            router.push("./");
          }, 10000);
        }}
        id={id}
      />
    );
  } else if (isPaid) {
    return (
      <motion.div
        className="flex flex-col justify-center items-center h-screen bg-white "
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <CheckCircleIcon width={100} height={100} color="green" />
        <p className="font-bold mt-4 text-xl text-center">
          Thanks for Registering! <br />{" "}
          {
            "Once your payment is verified by Admin Team, then you will be Elligble for the Tournament"
          }
        </p>
        <p className="font-bold mt-4">
          Admin Support:{" "}
          <span className="font-semibold text-gray-500">8682021651</span>{" "}
        </p>
      </motion.div>
    );
  } else if (isLoading) {
    return (
      <motion.div className="flex flex-col justify-center items-center h-screen  ">
        <img src="/loader.gif" alt="loader" class="w-52 h-52" />
      </motion.div>
    );
  } else {
    return (
      <form
        className="flex flex-col justify-between items-center h-full p-5"
        onSubmit={handleSubmit}
      >
        <motion.div
          className="bg-white w-full p-5 rounded-lg items-center justify-center flex flex-col shadow-md"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <p className="font-semibold text-lg m-5">Player Register Form</p>
          {/* <Pagination third /> */}

          <>
            <div className="grid grid-cols-2 gap-5 w-full p-5 text-sm">
              {inputNames.map((item) => (
                <div key={item.id}>
                  <motion.label variants={itemAnimation}>
                    {item.title}
                    {item.required && <span className="text-red-600"> *</span>}
                  </motion.label>
                  {item.type != "select" && (
                    <motion.input
                      id={item.id}
                      variants={itemAnimation}
                      type={item.type}
                      required={item.required}
                      placeholder={`${item.title}`}
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
                <li>Players Should be available for the whole tournament</li>
                <li>
                  If the players not available with out any valid reason, player
                  cannot participate the tournament for next 2 seasons
                </li>
                <li>
                  If the player Gets caught for chucking he cannot bowl for the
                  Rest of the tournament
                </li>
              </ol>
              {/* Terms */}
              <div class="flex items-start mb-5">
                <div class="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    value={isTermAccepted}
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                    required
                    onChange={() => setisTermAccepted(!isTermAccepted)}
                  />
                </div>
                <label
                  for="terms"
                  class="ms-2 text-sm font-medium text-gray-900 ml-2"
                >
                  I agree with the{" "}
                  <a
                    href="/terms"
                    class="text-blue-600 hover:underline"
                  >
                    terms and conditions
                  </a>
                </label>
              </div>
            </div>
          </>

          <motion.button
            type="submit"
            variants={itemAnimation}
            className={`w-40 rounded ${isTermAccepted ? 'bg-indigo-400' :'bg-indigo-200'} h-10 p-2 flex justify-center items-center m-3 cursor-pointer text-white relative`}
            whileHover={{ scale: 1.1 }}
            disabled ={!isTermAccepted}
          >
            Pay to Register
          </motion.button>
        </motion.div>
      </form>
    );
  }
}
