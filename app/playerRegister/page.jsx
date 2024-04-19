"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import PaymentPage from "../components/PaymentPage";
import { uploadBytes, ref, getStorage, getDownloadURL } from "firebase/storage";
import { firebaseApp } from "../../lib/firebase";
import makePayment from "../../lib/payment/razor_paymentGateway";

export default function Page() {
  // const [base64Image, setBase64Image] = useState("");
  const [isPaid, setisPaid] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isTermAccepted, setisTermAccepted] = useState(false);
  const [id, setId] = useState("");
  const router = useRouter();

  const [playerData, setPlayerData] = useState({
    name: '',
    dob: '',
    age: '',
    contact: '',
    team: '',
    area: '',
    jersey: '',
    jerseyno: '',
    jerseysize: '',
    playerphoto: '',
    playerrole: 'All Rounder',
    battingstyle: '',
    bowlingstyle: '',
    istermaccepted: false,
  });

  // Function to handle changes in input fields
  const handleInputChange = async (e) => {
    let { name, value } = e.target;

    // handle file for upload
    if(name == 'playerphoto'){
      let imageResult = value.files[0];
      const storage = getStorage(firebaseApp);
      const imageRef = ref(
        storage,
        `kpl/Player_${Math.floor(Math.random() * 90000) + 10000}`
      );
      await uploadBytes(imageRef, imageResult).then(async (res) => {
        await getDownloadURL(res.ref).then((res) => {
          value = res;
        });
      });
    }
    

    setPlayerData({
      ...playerData,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setisLoading(true);

    //insert into table
    fetch("/api/player", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playerData),
    })
      .then((response) => response.json())
      .then((data) => {
        setId(data.insertId);
        setisLoading(false);
      })
      .catch((error) => console.error(error));

    setisPaid(true);
    setTimeout(() => {
      router.push("/");
    }, 5000);

    console.log('Form submitted');
    console.log(playerData);
  };


  async function handleSubmit1(event) {
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

        //Storing it on local:
        // const formData = new FormData();
        // formData.append('image', imageResult);
        // // formData.append('path', 'uploads');

        // try {
        //   axios.post('http://195.35.21.236:3001/upload', formData)
        //   .then(response => {
        //     alert(response.data)
        //     console.log('API Response:', response.data);
        //   })
        //   .catch(error => {
        //     alert(error.message)
        //     console.error('Error:', error.message);
        //   });
        // const response = await fetch("http://localhost:3001/upload", {
        //   method: "POST",
        //   headers: {
        //     // Add this line to specify that you are sending a form with multipart/form-data
        //     "Content-Type": "multipart/form-data",
        //   },
        //   body: formData,
        // });

        // if(!response.ok) throw new Error(await response.text())

        // console.log('File uploaded successfully');
        // values.push(imageResult.name);

        // } catch (error) {
        //   console.error('Error during file upload:', error);
        //   alert(JSON.stringify(error.message))
        //   window.location.replace('/')
        // }
      } else {
        values.push(event.target[i].value);
      }
    }
    values.push(false);
    console.log("Values for the player - ", values);
    // settempData(values);
    //Payment calling
    if (imageResult) {
      const result = await makePayment(values[0], "", values[3], 111);
      console.log(result)
      if (result) {
        //making payment status approved
        values[values.length - 1] = true

        //insert into table
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
    <div className="bg-gray-200 p-3">
      <div className="bg-white rounded-xl flex flex-col items-center w-full p-2 py-4">
        <p className="font-semibold">Player Register Form</p>

        <form className="grid grid-cols-2 gap-3 p-5 w-full">
          {/* Inputs */}
          {[
            { label: 'Player Name', type: 'text', name: 'name', required: true },
            { label: 'Date of Birth', type: 'date', name: 'dob', required: true },
            { label: 'Age', type: 'text', name: 'age', required: true },
            { label: 'Contact Number', type: 'text', name: 'contact', required: true },
            { label: 'Team Name', type: 'text', name: 'team', required: true },
            { label: 'Area', type: 'text', name: 'area', required: true },
            { label: 'Jersey Name', type: 'text', name: 'jersey', required: true },
            { label: 'Jersey No', type: 'text', name: 'jerseyno', required: true },
            { label: 'Player Photo', type: 'file', name: 'playerphoto', required: true },
          ].map((input, index) => (
            <div key={index} className="flex flex-col justify-center w-full gap-1 text-sm">
              <label>{input.required ? `${input.label}*`: `${input.label}`}</label>
              <input
                className="outline-none ring-1 ring-indigo-100 my-2 p-2 px-4 rounded-full bg-gray-200 file:rounded-full"
                type={input.type}
                name={input.name}
                value={playerData[input.name]}
                placeholder={input.label}
                onChange={handleInputChange}
                required={input.required}
              />
            </div>
          ))}

          {/* Selects */}
          {[
            { label: 'Jersey Size', name: 'jerseysize', options: ['Small', 'Medium', 'Large', 'Extra Large(XL)', 'XXL', 'XXXL'], required: true },
            { label: 'Player Role', name: 'playerrole', options: ['All Rounder', 'Batsman', 'Bowler'], required: true },
            { label: 'Batting Style', name: 'battingstyle', options: ['','Right', 'Left'] },
            { label: 'Bowling Style', name: 'bowlingstyle', options: ['','Fast', 'Medium', 'Spin'] },
          ].map((select, index) => (
            <div key={index} 
              className={`flex flex-col justify-center w-full gap-1 text-sm 
                ${select.name == 'battingstyle' && !['All Rounder', 'Batsman'].includes(playerData['playerrole']) ? 'hidden' : ''}
                ${select.name == 'bowlingstyle' && !['All Rounder', 'Bowler'].includes(playerData['playerrole']) ? 'hidden' : ''}
            `}>
             <label>{select.required ? `${select.label}*`: `${select.label}`}</label>
              <select 
                className="outline-none p-2 px-4 ring-1 ring-indigo-100 my-2 rounded-full bg-gray-200" 
                required={select.required}
                name={select.name}
                value={playerData[select.name]}
                onChange={handleInputChange}
              >
                {select.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {/* Terms & Conditions */}
          <div className="w-full flex flex-col text-sm col-span-2">
            <h3 className="font-bold">Terms & Conditions:</h3>
            <ol className="list-disc relative left-10 my-3 w-[90%] sm:w-full break-words">
              <li>Player Registration Amount is Rs.111/-</li>
              <li>Players Should be available for the whole tournament</li>
              <li>If the players not available without any valid reason, player cannot participate in the tournament for the next 2 seasons</li>
              <li>If the player Gets caught for chucking he cannot bowl for the Rest of the tournament</li>
            </ol>
            {/* Terms Checkbox */}
            <div className="flex items-start mb-5">
              <input
                id="terms"
                type="checkbox"
                checked={isTermAccepted}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                required
                onChange={() => setisTermAccepted(!isTermAccepted)}
              />
              <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 ml-2">
                I agree with the{' '}
                <a href="/terms" className="text-blue-600 hover:underline">
                  terms and conditions
                </a>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 flex items-center justify-center">
            <motion.button
              type="submit"
              className={`w-40 rounded ${isTermAccepted ? 'bg-indigo-400' : 'bg-indigo-200'} h-10 p-2 flex justify-center items-center m-3 cursor-pointer text-white`}
              whileHover={{ scale: 1.1 }}
              disabled={!isTermAccepted}
            >
              Pay to Register
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}
