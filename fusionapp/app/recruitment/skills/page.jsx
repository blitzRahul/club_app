"use client";
import React, { useEffect, useRef, useState } from "react";

const saveEnum = {
  SAVING: "saving ⏳",
  SAVED: "saved ✅",
  ERROR: "please retry...",
  DEFAULT: "submit",
};

function ChatPage() {
  const WORD_LIMIT = 500;
  const [inputValue, setInputValue] = useState("");
  const [charactersLeft, setCharactersLeft] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [saving, setSaving] = useState(saveEnum.DEFAULT);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    getCandidate();
  }, []);

  const getCandidate = async () => {
    const response = await fetch("/api/protected/candidate", { method: "GET" });
    if (response.status == 200) {
      const candidate = await response.json();
      if(candidate?.completed) {
        setCompleted(true);
        return;
      }
      if (candidate?.responses?.skills) {
        setInputValue(candidate.responses.skills);
        setSaving(saveEnum.SAVED);
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    } else {
      setDisabled(true);
    }
  };

  const submitPrompt = async (prompt) => {
    const response = await fetch("/api/protected/gpt/skills", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });
    if (response.status == 200) {
      const data = await response.json();
      setSaving(saveEnum.SAVED);
    } else {
      setDisabled(false);
      setSaving(saveEnum.ERROR);
    }
  };

  const handleInputChange = (e) => {
    setCharactersLeft(e.target.value.length);
    if (e.target.value.length >= WORD_LIMIT) {
      setInputValue(e.target.value.slice(0, WORD_LIMIT - 1));
      return;
    }
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    let promt = inputValue.trim();
    if (!promt) return;
    if (promt.length > WORD_LIMIT) promt = promt.slice(0, WORD_LIMIT);
    setDisabled(true);
    setSaving(saveEnum.SAVING);
    try {
      submitPrompt(promt);
    } catch (e) {
      console.log(e);
      setDisabled(false);
    }
  };

  if (completed) {
    return (
      <main className="flex flex-col h-screen w-screen bg-black text-white items-center justify-center gap-10 text-center">
        <div className="flex flex-col justify-center items-center gap-10 w-10/12 md:w-8/12 lg:w-1/2">
          <img src="/yes.png" alt="tick mark" className="w-16 h-16" />
          <h1 className="text-3xl">Registration</h1>
          <p className="text-lg">
            Thank you for your response. Your application will be reviewed in a week. We will contact you via email.
          </p>
          <div className="flex flex-row gap-5 w-max self-center h-max">
            <a
              href="/dashboard"
              className="text-white border-b-2 border-transparent duration-75 border-white hover:text-fuchsia-400 hover:border-fuchsia-400"
            >
              Return
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col w-screen h-max bg-white p-5 items-center justify-start gap-10">
      <header className="flex w-full h-max p-5 bg-gray-900 rounded-md justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">
          Skills
        </h1>
        <a
          href="/recruitment"
          className="text-white border-b-2 border-transparent duration-75 hover:border-white"
        >
          Return
        </a>
      </header>
      <div className="flex flex-col w-full h-max justify-center items-center gap-10">
        <div className="flex flex-col w-full h-max justify-center items-center gap-10 text-center">
          <p className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-violet-400 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">
            Your Skills
          </p>
          <p className="text-base w-10/12">
            Hi 👋, write about specific things that you are good at doing. This
            is a mandatory question and you cannot edit your response.
          </p>
          <textarea
            disabled={disabled}
            maxLength={WORD_LIMIT}
            type="text"
            className="flex resize-none w-11/12 md:w-10/12 lg:w-8/12 h-72 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="web development, graphic design, writing emails with mailchimp, making banners with Canva, Adobe Lightroom or any other tool or expertise"
          />
          <p className="text-gray-500 text-sm">
            {charactersLeft} used of {WORD_LIMIT} max
          </p>
          <button
            className="bg-fuchsia-500 hover:bg-fuchsia-400 text-white font-bold py-2 px-4 rounded-md"
            onClick={handleSendMessage}
            disabled={disabled}
          >
            {saving}
          </button>
          <a
            href="/recruitment"
            className="text-black border-b-2 border-transparent duration-75 hover:border-black"
          >
            Return
          </a>
        </div>
      </div>
    </main>
  );
}

export default ChatPage;
