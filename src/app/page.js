"use client"
import { useEffect, useState } from "react";

// const data = {
//   "is_success": true,
//   "user_id": "john_doe_17091999",
//   "email": "john@xyz.com",
//   "roll_number": "ABCD123",
//   "numbers": ["1", "334", "4"],
//   "alphabets": ["M", "B"],
//   "highest_alphabet": ["M"]
// }

export default function Home() {
  const [enteredText, setEnteredText] = useState("");
  const [message, setMessage] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [responseDataDisplay, setResponseDataDisplay] = useState("numbers");

  const handleTextSubmit = () => {
    console.log(enteredText);
    try {
      setMessage(null);
      const parsedJson = JSON.parse(enteredText);
      console.log("Valid JSON:", parsedJson);
      fetch("https://bajaj-finserv-backend-ivory.vercel.app/bfhl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(parsedJson)
      })
        .then(response => response.json())
        .then(data => {
          setResponseData(data);
          console.log("Response:", data);
        })
        .catch(error => {
          console.log("Error:", error);
        });
    } catch (error) {
      setMessage(error.message);
      console.log("Invalid JSON:", error);
    }
  }

  const handleDisplayChange = (e) => {
    setResponseDataDisplay(e.target.value);
  }

  useEffect(() => {
    console.log("Response Data display:", responseDataDisplay);
  }, [responseDataDisplay]);
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-10 mt-36">
        <h1 className="text-5xl">Text Filter</h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          <input type="text" className="bg-black border-2 p-2 rounded-md" onChange={e => setEnteredText(e.target.value)} placeholder="Enter your text" />
          <button onClick={handleTextSubmit} className="bg-slate-100 text-black p-2 rounded-md font-semibold">Submit</button>
        </div>
          {message && <p className="text-red-500">{message}</p>}
        {responseData && <select className="text-black p-2 rounded-md" onChange={handleDisplayChange}>
          {responseData.numbers && <option onClick={() => setResponseDataDisplay("numbers")}>Numbers</option>}
          {responseData.alphabets && <option onClick={() => setResponseDataDisplay("alphabets")}>Alphabets</option>}
          {responseData.highest_alphabet && <option onClick={() => setResponseDataDisplay("hi_al")}>Highest Alphabet</option>}
        </select>}
        {responseData && (responseDataDisplay === "Numbers" ? responseData.numbers.map((number, index) => <p key={index}>{number}</p>) : 
        responseDataDisplay === "Alphabets" ? responseData.alphabets.map((alphabet, index) => <p key={index}>{alphabet}</p>) : 
        responseData.highest_alphabet.map((alphabet, index) => <p key={index}>{alphabet}</p>))}
      </div>
    </>
  );
}
