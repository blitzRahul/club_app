"use client";
import { useState, useEffect } from "react";

const enumStatus = {
  LOADING: "LOADING",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
};

const submitEnum = {
  SAVING: "saving ⏳",
  SAVED: "saved ✅",
  DEFAULT: "SUBMIT",
  ERROR: "ERROR, retry",
};

const challenges = [
  {
    name: "Personality",
    description: "Let us get to know you.",
    icon: "👤",
    link: "/recruitment/personality",
    buttonText: "Take quiz",
  },
  {
    name: "Experience",
    description: "Tell us about your achievements.",
    icon: "🏅",
    link: "/recruitment/experience",
    buttonText: "Add experience",
  },
  {
    name: "Skills",
    description: "Tell us what you're good at.",
    icon: "🔧",
    link: "/recruitment/skills",
    buttonText: "Add skills",
  },
  {
    name: "Links",
    description: "Share your work.",
    icon: "🔗",
    link: "/recruitment/links",
    buttonText: "Add links",
  },
];

const NO_OF_CHALLENGES = 5;

const RecruitmentPage = () => {
  const [status, setStatus] = useState(enumStatus.LOADING);
  const [candidate, setCandidate] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [finalSubmit, setFinalSubmit] = useState(submitEnum.DEFAULT);

  useEffect(() => {
    getCandidate();
  }, []);

  const getCandidate = async () => {
    const response = await fetch("/api/protected/candidate", { method: "GET" });
    if (response.status == 200) {
      const data = await response.json();
      if (data) {
        setCandidate(data);
        setStatus(enumStatus.SUCCESS);
        if (data.responses) {
          const keys = Object.keys(data.responses);
          if (keys.length === NO_OF_CHALLENGES) {
            setCompleted(true);
          }
        }
      }
    } else {
      setStatus(enumStatus.ERROR);
    }
  };

  const saveRegistration = async () => {
    const response = await fetch("/api/protected/candidate", {
      method: "POST",
    });
    if (response.status === 200) {
      setStatus(enumStatus.SUCCESS);
    }
  };

  if (status === enumStatus.LOADING) {
    return (
      <main className="flex flex-col h-screen w-screen bg-black text-white items-center justify-center gap-10">
        <h1 className="text-3xl">Registration</h1>
        <span className="text-lg animate-pulse">finding application ⏳</span>
        <a
          href="/dashboard"
          className="bg-gray-200 hover:bg-gray-300 w-max px-2 py-1 rounded-lg text-black text-lg"
        >
          return
        </a>
      </main>
    );
  }

  const handleSubmit = async () => {
    setFinalSubmit(submitEnum.SAVING);
    try {
      await fetch("/api/protected/gpt/communication")
      const response = await fetch("/api/protected/candidate/submit", {
        method: "GET",
      });
      if (response.status === 200) {
        setFinalSubmit(submitEnum.SAVED);
      } else {
        setFinalSubmit(submitEnum.ERROR);
      }
    } catch (error) {
      console.log(error);
      setFinalSubmit(submitEnum.ERROR);
    }
  };

  if (status === enumStatus.ERROR) {
    return (
      <main className="flex flex-col h-screen w-screen bg-black text-white items-center justify-center gap-10 text-center">
        <div className="flex flex-col gap-10 w-10/12 md:w-8/12 lg:w-1/2">
          <h1 className="text-3xl">Registration</h1>
          <p className="text-lg">
            By clicking{" "}
            <span className="bg-lime-400 px-1 text-black text-base font-bold">
              Accept
            </span>{" "}
            below you confirm that your name will be added to the candidate
            pool, and &copy; The Fusion Club and any of its members can contact
            you regarding membership.
          </p>
          <div className="flex flex-row gap-5 w-max self-center h-max">
            <button
              className="bg-lime-400 hover:bg-lime-500 w-max px-2 py-1 rounded-lg text-black text-lg font-bold"
              onClick={saveRegistration}
            >
              Accept
            </button>
            <a
              href="/dashboard"
              className="bg-red-500 hover:bg-red-600 w-max px-2 py-1 rounded-lg text-black text-lg font-bold"
            >
              Decline
            </a>
          </div>
        </div>
      </main>
    );
  }

  if (candidate?.completed) {
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
    <>
      <main className="flex flex-col w-screen h-max min-h-screen bg-white p-5 items-center justify-start gap-10">
        <header className="flex w-full h-max p-5 bg-gray-900 rounded-md justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-700 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent">
            Recruitment
          </h1>
          <a
            href="/dashboard"
            className="text-white border-b-2 border-transparent duration-75 hover:border-white"
          >
            Return
          </a>
        </header>
        <p className="text-base self-center text-center">
          Hi 👋, once you complete all the items and hit submit, your
          application will be reviewed in a week.
        </p>
        <div className="flex flex-col md:flex-row flex-wrap w-full h-max self-center items-center gap-10 justify-center">
          {completed && (
            <div className="flex flex-col w-full md:w-96 h-72 border-green-400 duration-100 bg-white shadow-md shadow-gray-400 border-2 rounded-md p-5 justify-center gap-5 items-center text-center">
              <img src="/yes.png" alt="" className="w-16 h-16" />
              <h1 className="text-xl font-bold">
                Your application is complete
              </h1>
              <button
                onClick={handleSubmit}
                className="hover:bg-white animate-pulse border-green-400 border-solid border bg-green-400 duration-100 w-max px-2 py-1 rounded-lg text-black text-xl font-bold"
              >
                {finalSubmit}
              </button>
              <p className="text-sm text-red-400 italic">
                * clicking submit is final and cannot be undone
              </p>
            </div>
          )}
          {!completed && (
            <div className="flex flex-col w-full md:w-96 h-72 hover:border-blue-400 duration-100 bg-white shadow-md shadow-gray-400 border-fuchsia-400 border-[1px] rounded-md p-5 justify-start gap-3 items-center text-center">
              <h1 className="text-2xl font-bold">Your Checklist</h1>
              <div className="flex flex-col items-start justify-start w-full p-5 gap-1 text-sm md:text-base">
                <TaskItem
                  task="take a personality quiz"
                  status={candidate?.responses?.personality ? true : false}
                />
                <TaskItem
                  task="submit your experience"
                  status={candidate?.responses?.experience ? true : false}
                />
                <TaskItem
                  task="add your skills"
                  status={candidate?.responses?.skills ? true : false}
                />
                <TaskItem
                  task="add relevant links"
                  status={candidate?.responses?.links ? true : false}
                />
                <TaskItem
                  task="select a team"
                  status={candidate?.teams?.length ? true : false}
                />
                <TaskItem
                  task="final step - motivation"
                  status={candidate?.responses?.communication ? true : false}
                />
              </div>
            </div>
          )}
          {candidate?.responses?.experience && candidate?.responses?.skills && (
            <TaskCard
              task={{
                name: "FusionAI Sorting Hat",
                description: "Let's find the right team for you.",
                icon: "🎩",
                link: "/recruitment/teams",
                buttonText: "Sort Me",
              }}
            />
          )}
          {candidate?.teams?.length > 0 && (
            <TaskCard
              task={{
                name: "Your Motivation",
                description: "Give us some additional details",
                icon: "💡",
                link: "/recruitment/communication",
                buttonText: "final step",
              }}
            />
          )}
        </div>
        <div className="flex flex-col md:flex-row flex-wrap w-full h-max self-center items-center gap-10 justify-center">
          {challenges.map((challenge, index) => (
            <TaskCard task={challenge} key={index} />
          ))}
        </div>
      </main>
      <footer className="text-xs p-1 w-full text-center">
        &copy;2024 The Fusion Club
      </footer>
    </>
  );
};

const TaskCard = ({ task }) => {
  return (
    <div className="flex flex-col w-full md:w-96 h-72 hover:border-blue-400 duration-100 bg-white shadow-md shadow-gray-400 border-fuchsia-400 border-[1px] rounded-md p-5 justify-around items-center text-center">
      <h1 className="text-2xl font-bold">{task.name}</h1>
      <span className="text-8xl">{task.icon}</span>
      <p className="text-base">{task.description}</p>
      <a
        href={task.link}
        className="bg-blue-100 hover:bg-blue-200 w-max px-3 py-1 rounded-lg text-black text-base font-bold"
      >
        {task.buttonText}
      </a>
    </div>
  );
};

const TaskItem = ({ task, status }) => {
  return (
    <div className="flex flex-row w-full h-max justify-start gap-3 items-start text-left">
      <span>{status ? "🟢" : "⭕️"}</span>
      <p>{task}</p>
    </div>
  );
};

export default RecruitmentPage;
