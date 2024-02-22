"use client";
import { useState, useEffect } from "react";
import { connectToUserSocket } from "@/app/components/socketHandler";

const saveEnum = {
  SAVING: "saving ⏳",
  SAVED: "saved ✅",
  ERROR: "please retry",
  DEFAULT: "submit",
};

const acceptedLinks = [
  {
    name: "LinkedIn",
    description: "your LinkedIn profile URL",
    id: "linkedin",
  },
  {
    name: "GitHub",
    description: "your GitHub profile URL",
    id: "github",
  },
  {
    name: "Portfolio",
    description: "your portfolio site or linktree URL",
    id: "portfolio",
  },
  {
    name: "Drive",
    description: "google drive or any other link",
    id: "other",
  },
];

export default function LinksPage() {
  const [status, setStatus] = useState(saveEnum.DEFAULT);
  const [links, setLinks] = useState({
    linkedin: " ",
    github: " ",
    portfolio: " ",
    other: " ",
  });
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    getCandidate();
  }, []);

  const getCandidate = async () => {
    try {
      const response = await fetch("/api/protected/candidate", {
        method: "GET",
      });
      if (response.status == 200) {
        const candidate = await response.json();
        if (candidate?.completed) {
          setCompleted(true);
          return;
        }
        if (candidate?.responses?.links) {
          setLinks(candidate?.responses?.links);
        }
      } else {
        setStatus(saveEnum.ERROR);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    setStatus(saveEnum.SAVING);
    try {
      const response = await fetch("/api/protected/candidate/links", {
        method: "POST",
        body: JSON.stringify({ links }),
      });
      if (response.status == 200) {
        setStatus(saveEnum.SAVED);
      } else {
        setStatus(saveEnum.ERROR);
      }
    } catch (error) {
      console.log(error);
      setStatus(saveEnum.ERROR);
    }
  };

  if (completed) {
    return (
      <main className="flex flex-col h-screen w-screen bg-black text-white items-center justify-center gap-10 text-center">
        <div className="flex flex-col justify-center items-center gap-10 w-10/12 md:w-8/12 lg:w-1/2">
          <img src="/yes.png" alt="tick mark" className="w-16 h-16" />
          <h1 className="text-3xl">Registration</h1>
          <p className="text-lg">
            Thank you for your response. Your application will be reviewed in a
            week. We will contact you via email.
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
          Links
        </h1>
        <a
          href="/recruitment"
          className="text-white border-b-2 border-transparent duration-75 hover:border-white"
        >
          Return
        </a>
      </header>
      <div className="flex flex-col w-full h-max justify-center items-center gap-10">
        <div className="flex flex-col w-full h-max justify-center items-center gap-5">
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-violet-400 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">
            Your Links
          </h1>
          <p className="text-base text-center">
            At least one link is mandatory. GitHub is preferred for Tech Team.
          </p>
        </div>
        <div className="flex flex-row flex-wrap w-full h-max justify-center items-center gap-10">
          {acceptedLinks.map((field, index) => {
            return (
              <Question
                key={index}
                field={field}
                links={links}
                setLinks={setLinks}
              />
            );
          })}
        </div>
        <button
          className="bg-fuchsia-500 hover:bg-fuchsia-400 text-white font-bold py-2 px-4 rounded-md"
          onClick={handleSubmit}
          disabled={status === saveEnum.SAVING}
        >
          {status}
        </button>
        <a
          href="/recruitment"
          className="text-black border-b-2 border-transparent duration-75 hover:border-black"
        >
          Return
        </a>
      </div>
    </main>
  );
}

const Question = ({ field, links, setLinks }) => {
  const { id, description, name } = field;
  return (
    <div className="flex flex-col w-full md:w-[500px] lg:w-[600px] h-48 hover:border-blue-400 duration-100 bg-white shadow-md shadow-gray-400 border-fuchsia-400 border-[1px] rounded-md p-5 justify-around items-center text-center">
      <p className="text-lg font-bold">{name}</p>
      <div className="flex flex-row flex-wrap w-full h-max gap-3 text-sm md:text-base">
        <input
          placeholder={description}
          value={links[id] || " "}
          onChange={(e) => setLinks({ ...links, [id]: e.target.value })}
          maxLength={100}
          className="p-3 border-fuchsia-400 border focus:outline-blue-400 rounded-lg w-full"
          type="text"
        />
      </div>
    </div>
  );
};
