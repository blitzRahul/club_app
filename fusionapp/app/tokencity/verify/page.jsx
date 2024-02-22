"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const statusEnum = {
  SUCCESS: "Verified ✅",
  ERROR: "Error ❌",
  LOADING: "Loading ⏳",
  DEFAULT: "",
};

export default function Page() {
  const searchParams = useSearchParams();
  const [code, setCode] = useState(null);
  const [status, setStatus] = useState(statusEnum.DEFAULT);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (searchParams.get("code")) {
      setCode(searchParams.get("code"));
    }
  }, [searchParams]);

  const handleSubmit = async () => {
    setStatus(statusEnum.LOADING);
    setMessage(null);
    if (!code || code?.length !== 8) {
      setStatus(statusEnum.ERROR);
      setMessage("Please enter a verification code");
      return;
    }
    try {
      const response = await fetch("/api/public/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      if (response.ok) {
        setStatus(statusEnum.SUCCESS);
        setMessage(data.message);
      } else {
        setStatus(statusEnum.ERROR);
        setMessage(data.error);
      }
    } catch (error) {
      setStatus(statusEnum.ERROR);
    }
  };

  return (
    <main className="flex text-center flex-col h-screen w-full bg-black text-white items-center justify-center gap-5 p-8">
      <section className="flex flex-col bg-purple-500 h-96 max-h-max w-full max-w-lg rounded-lg p-5 gap-3 items-center justify-around">
        <h1 className="text-3xl font-bold">🔐 Verification</h1>
        <p className="text-lg">Enter the code sent to your email</p>
        <input
          type="text"
          placeholder="Verification Code"
          className="w-3/4 p-2 rounded-lg text-black text-center text-xl outline-purple-500"
          onChange={(e) => setCode(e.target.value)}
          maxLength={8}
          value={code}
        />
        <button
          onClick={handleSubmit}
          className="w-3/4 p-2 rounded-lg text-white bg-violet-700 hover:bg-violet-600 text-xl"
        >
          Verify
        </button>
        <p className="text-center self-center">
          {status} {message}
        </p>
      </section>
      <p>{status === statusEnum.SUCCESS ? 'You will receive your ticket a week before the event!' : 'For support contact fusion@vitbhopal.ac.in'}</p>
    </main>
  );
}
