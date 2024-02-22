"use client";
import { useState, useEffect } from "react";
import { connectToUserSocket } from "@/app/components/socketHandler";

const defaultResponses = {
  color: "#b4ff42",
  animal: "",
  teamsize: "",
  availability: "",
};
const statusEnum = {
  LOADING: "auto saving ⏳",
  ERROR: "please retry...",
  SUCCESS: "saved ✅",
};

const questions = [
  {
    text: "🧑‍💻 Your working style",
    tag: "teamsize",
    options: [
      "alone/online",
      "with team/online",
      "with team/offline",
      "flexible",
    ],
  },
  {
    text: "🕔 Time commitment",
    tag: "availability",
    options: ["most days", "few hours a week", "weekends only", "events only"],
  },
  {
    text: "🎵 Favourite genre",
    tag: "music",
    options: [
      "pop",
      "rock",
      "edm",
      "classical",
      "metal",
      "hip-hop",
      "folk",
      "soul",
    ],
  },
  {
    text: "⚽️ Daily Activity",
    tag: "sport",
    options: ["walk/run/jog", "gym", "sports", "cycling", "others", "none"],
  },
];

export default function RecruitmentQuizPage() {
  const [userSocket, setUserSocket] = useState(null);
  const [responses, setResponses] = useState(defaultResponses);
  const [status, setStatus] = useState(statusEnum.LOADING);
  const [blocked, setBlock] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    getCandidate();
    initializeUserSocket();
  }, [userSocket]);

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
        if (candidate?.responses?.personality) {
          setResponses(candidate?.responses?.personality);
          setStatus(statusEnum.SUCCESS);
        }
        setBlock(false);
      } else {
        setBlock(true);
        setStatus(statusEnum.ERROR);
      }
    } catch (error) {
      console.log(error);
      setBlock(false);
    }
  };

  const initializeUserSocket = async () => {
    try {
      const token = await fetch("/api/protected/socketToken")
        .then((res) => res.json())
        .then((data) => data.token);
      const userSocket = connectToUserSocket(token);
      userSocket.on("connect", () => {
        console.log("Connected to user socket");
        setUserSocket(userSocket);
      });
      userSocket.on("update-quiz-success", () => {
        setTimeout(() => {
          setStatus(statusEnum.SUCCESS);
        }, 3000);
      });
      userSocket.on("update-quiz-error", () => {
        setStatus(statusEnum.ERROR);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setStatus(statusEnum.LOADING);
    updateResponses();
  }, [responses]);

  const updateResponses = async () => {
    if (blocked) return;
    if (userSocket) {
      userSocket?.emit("update-candidate-quiz", responses);
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
          Personality
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
            Personality Quiz
          </h1>
          <p className="text-sm text-center">
            There are no right or wrong answers. We just want to know your
            preferences ❤️
          </p>
          <p className="text-sm bg-purple-200 p-1 rounded-full px-3">
            {status}
          </p>
        </div>
        <div className="flex flex-row flex-wrap w-full h-max justify-center items-center gap-10">
          <div className="flex flex-col w-full md:w-96 h-48 hover:border-blue-400 duration-100 bg-white shadow-md shadow-gray-400 border-fuchsia-400 border-[1px] rounded-md p-5 justify-around items-center text-center">
            <p className="text-lg font-bold">🐾 Are you a cat person?</p>
            <div className="flex flex-row flex-wrap w-full h-max gap-3">
              <button
                onClick={() => setResponses({ ...responses, animal: "cats" })}
                className="p-1 px-3 border-purple-400 border rounded-lg"
              >
                cats
              </button>
              <button
                onClick={() => setResponses({ ...responses, animal: "dogs" })}
                className="p-1 px-3 border-purple-400 border rounded-lg"
              >
                dogs
              </button>
              <input
                placeholder="any other animal"
                value={responses.animal}
                onChange={(e) =>
                  setResponses({ ...responses, animal: e.target.value })
                }
                maxLength={25}
                className="p-1 px-3 border-fuchsia-400 border-2 focus-within:outline-fuchsia-400 rounded-lg"
                type="text"
                name=""
                id=""
              />
            </div>
          </div>
          <div className="flex flex-col w-full md:w-96 h-48 hover:border-blue-400 duration-100 bg-white shadow-md shadow-gray-400 border-fuchsia-400 border-[1px] rounded-md p-5 justify-around items-center text-center">
            <p className="text-lg font-bold">🌈 Pick your favourite color!</p>
            <div className="flex flex-row w-full flex-wrap h-max gap-3">
              <button
                onClick={() => setResponses({ ...responses, color: "#33ff99" })}
                className="p-1 px-3 border-purple-400 border rounded-lg"
              >
                green
              </button>
              <button
                onClick={() => setResponses({ ...responses, color: "#000000" })}
                className="p-1 px-3 border-purple-400 border rounded-lg"
              >
                black
              </button>
              <p className="p-1 px-3 border-purple-400 border rounded-lg">
                select →
              </p>
              <label
                style={{ backgroundColor: responses.color }}
                htmlFor="pick-color"
                className="bg-black border-black border h-8 w-8 rounded-full"
              >
                <input
                  style={{ backgroundColor: responses.color }}
                  onChange={(e) =>
                    setResponses({ ...responses, color: e.target.value })
                  }
                  id="pick-color"
                  type="color"
                  className="w-[0.5px] h-[0.5px] bg-black -z-10 relative"
                />
              </label>
            </div>
          </div>
          {questions.map((question, index) => {
            return (
              <Question
                key={index}
                question={question}
                responses={responses}
                setResponses={setResponses}
              />
            );
          })}
        </div>
        <a
          href="/recruitment"
          className="text-black border-b-2 border-transparent duration-75 hover:border-black"
        >
          Return
        </a>
      </div>
      <section
        id="loading-screen"
        className={`${blocked ? "flex" : "hidden"} h-screen w-screen absolute top-0 left-0 bg-gray-300 bg-opacity-50 animate-pulse`}
      ></section>
    </main>
  );
}

const Question = ({ question, responses, setResponses }) => {
  const { tag, options, text } = question;
  return (
    <div className="flex flex-col w-full md:w-96 h-48 hover:border-blue-400 duration-100 bg-white shadow-md shadow-gray-400 border-fuchsia-400 border-[1px] rounded-md p-5 justify-around items-center text-center">
      <p className="text-lg font-bold">{text}</p>
      <div className="flex flex-row flex-wrap w-full h-max gap-3 text-sm md:text-base">
        {options.map((option, index) => {
          return (
            <button
              key={index}
              onClick={() => setResponses({ ...responses, [tag]: option })}
              className="p-1 border-purple-400 border rounded-lg"
            >
              {responses[tag] === option ? "🟢" : ""} {option}
            </button>
          );
        })}
      </div>
      {tag == "availability" && (
        <p className="text-xs text-left self-start italic">
          *we expect greater time commitment during events
        </p>
      )}
    </div>
  );
};
