"use client";
import React, { useEffect, useRef, useState } from "react";
import { connectToUserSocket } from "@/app/components/socketHandler";

const teams = [
  {
    name: "Finance Team",
    value: "finance",
  },
  {
    name: "Stage & Content Team",
    value: "content",
  },
  {
    name: "Tech Team",
    value: "tech",
  },
  {
    name: "Events Team",
    value: "events",
  },
  {
    name: "HR and Operations Team",
    value: "hr",
  },
  {
    name: "PR and Outreach Team",
    value: "pr",
  },
];

const saveEnum = {
  SAVING: "auto saving ⏳",
  SAVED: "saved ✅",
  ERROR: "please retry",
  DEFAULT: "submit",
};

const statusEnum = {
  LOADING: "loading ⏳",
  ERROR: "error",
  SUCCESS: "success",
  BLANK: "Generate 🪄",
};

function ChatPage() {
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [shownTeams, setShownTeams] = useState(teams);
  const [saving, setSaving] = useState(saveEnum.SAVING);
  const [userSocket, setUserSocket] = useState(null);
  const [candidate, setCandidate] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    initializeUserSocket();
  }, []);

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
      userSocket.on("disconnect", (reason) => {
        if (reason === "io server disconnect") userSocket.connect();
      });
      userSocket.on("update-teams-success", () => {
        setTimeout(() => {
          setSaving(saveEnum.SAVED);
        }, 500);
      });
      userSocket.on("update-teams-error", () => {
        setSaving(saveEnum.ERROR);
      });
    } catch (err) {
      console.log("user socket error");
      console.log(err);
    }
  };

  useEffect(() => {
    getCandidate();
  }, []);

  useEffect(() => {
    updateTeams();
    const teamNames = selectedTeams.map((team) => team.name);
    setShownTeams(teams.filter((team) => !teamNames.includes(team.name)));
  }, [selectedTeams]);

  const updateTeams = async () => {
    setSaving(saveEnum.SAVING);
    if (userSocket) {
      userSocket?.emit("update-candidate-teams", selectedTeams);
    }
  };

  const getCandidate = async () => {
    const response = await fetch("/api/protected/candidate", { method: "GET" });
    if (response.status == 200) {
      const candidate = await response.json();
      setCandidate(candidate);
      if (candidate.teams?.length > 0) {
        setSelectedTeams(candidate.teams);
      }
    } else {
      setDisabled(true);
    }
  };

  const addTeam = async (team) => {
    if (disabled) return;
    if (selectedTeams.includes(team)) return;
    if (selectedTeams.length >= 2) return;
    setSelectedTeams([...selectedTeams, team]);
  };

  if (candidate?.completed) {
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
          Team
        </h1>
        <a
          href="/recruitment"
          className="text-white border-b-2 border-transparent duration-75 hover:border-white"
        >
          Return
        </a>
      </header>
      <div className="flex flex-col md:flex-row w-full h-max justify-center items-center gap-10">
        <div className="flex flex-col w-full h-max justify-center items-center gap-5 text-center">
          <p className="text-3xl lg:text-3xl font-bold bg-gradient-to-r from-violet-400 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">
            Fusion AI
          </p>
          <p className="text-base w-10/12">
            Our assistant helps you apply for a team! Use sorting hat after
            filling in your skills and experience.
          </p>
          <div className="flex flex-row flex-wrap w-full h-max items-center justify-center gap-3">
            <ExperienceCard candidate={candidate} />
            <SkillsCard candidate={candidate} />
            <SortingHatCard candidate={candidate} />
          </div>
        </div>
      </div>
      <p className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-violet-400 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">
        Pick Your Team
      </p>
      <p className="text-sm w-full text-center -mt-5">
        Click on any two teams you would like to apply for.
      </p>
      <div className="flex flex-row flex-wrap w-full h-max items-center justify-center gap-3 text-sm">
        {selectedTeams.map((team, index) => (
          <button
            onClick={() =>
              setSelectedTeams(selectedTeams.filter((t) => t != team))
            }
            className="bg-white border-purple-400 border-solid border hover:bg-gray-100 w-max px-2 py-1 rounded-lg text-black text-lg font-bold"
            key={index}
          >
            ✅ {team.name}
          </button>
        ))}
        {shownTeams.map((team, index) => (
          <button
            onClick={() => addTeam(team)}
            className="bg-white border-gray-400 border-solid border hover:bg-gray-100 w-max px-2 py-1 rounded-lg text-black text-lg font-bold"
            key={index}
          >
            {team.name}
          </button>
        ))}
      </div>
      <p className="text-base bg-purple-200 p-1 rounded-full px-3">{saving}</p>
      <a
        href="/recruitment"
        className="text-black border-b-2 border-transparent duration-75 hover:border-black"
      >
        Return
      </a>
    </main>
  );
}

const ExperienceCard = ({ candidate }) => {
  const [experience, setExperience] = useState([]);
  const [status, setStatus] = useState(statusEnum.LOADING);

  useEffect(() => {
    if (candidate?.threads?.experience?.message) {
      const lines = candidate.threads.experience.message.split("\n");
      setExperience(lines);
      setStatus(statusEnum.SUCCESS);
    } else {
      getResponse(false);
    }
  }, [candidate]);

  const getResponse = async (userTriggered) => {
    if (userTriggered) if (status === statusEnum.LOADING) return;
    if (status === statusEnum.SUCCESS) return;
    const response = await fetch(`/api/protected/gpt/experience`, {
      method: "GET",
    });
    if (response.status == 200) {
      const data = await response.json();
      if (!data.message) return;
      const lines = data.message.split("\n");
      setExperience(lines);
      setStatus(statusEnum.SUCCESS);
    } else {
      console.log("error");
      setStatus(statusEnum.BLANK);
    }
  };

  return (
    <div className="flex flex-col w-full md:w-96 h-max hover:border-blue-400 duration-100 bg-white shadow-md shadow-gray-400 border-fuchsia-400 border-[1px] rounded-md p-5 justify-start gap-5 items-center text-center">
      <h1 className="text-lg font-bold bg-purple-500 px-3 p-1 rounded-full text-white">
        ✨ Experience Summary
      </h1>
      <div className="flex flex-col items-start justify-center w-full gap-3 text-center text-sm">
        {experience.map((item, index) => {
          return <p key={index}>•{item}</p>;
        })}
      </div>
      {!experience.length && (
        <button
          onClick={() => getResponse(true)}
          className="bg-blue-100 hover:bg-blue-200 w-max px-3 py-1 rounded-lg text-black text-base font-bold"
        >
          {status}
        </button>
      )}
    </div>
  );
};

const SkillsCard = ({ candidate }) => {
  const [skills, setSkills] = useState([]);
  const [status, setStatus] = useState(statusEnum.LOADING);

  useEffect(() => {
    if (candidate?.threads?.skills?.message) {
      const lines = candidate.threads.skills.message.split("\n");
      setSkills(lines);
      setStatus(statusEnum.SUCCESS);
    } else {
      getResponse(false);
    }
  }, [candidate]);

  const getResponse = async (userTriggered) => {
    if (userTriggered) if (status === statusEnum.LOADING) return;
    if (status === statusEnum.SUCCESS) return;
    const response = await fetch(`/api/protected/gpt/skills`, {
      method: "GET",
    });
    if (response.status == 200) {
      const data = await response.json();
      if (!data.message) return;
      const lines = data.message.split("\n");
      setSkills(lines);
      setStatus(statusEnum.SUCCESS);
    } else {
      setStatus(statusEnum.BLANK);
    }
  };

  return (
    <div className="flex flex-col w-full md:w-96 h-max hover:border-blue-400 duration-100 bg-white shadow-md shadow-gray-400 border-fuchsia-400 border-[1px] rounded-md p-5 justify-start gap-5 items-center text-center">
      <h1 className="text-lg font-bold bg-purple-500 px-3 p-1 rounded-full text-white">
        <span className="text-xl">✨</span> Skill Summary
      </h1>
      <div className="flex flex-col items-start justify-center w-full gap-3 text-center text-sm">
        {skills.map((item, index) => {
          return <p key={index}>•{item}</p>;
        })}
      </div>
      {!skills.length && (
        <button
          onClick={() => getResponse(false)}
          className="bg-blue-100 hover:bg-blue-200 w-max px-3 py-1 rounded-lg text-black text-base font-bold"
        >
          {status}
        </button>
      )}
    </div>
  );
};

const SortingHatCard = ({ candidate }) => {
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(statusEnum.LOADING);
  const interval = useRef(null);

  useEffect(() => {
    if (candidate?.threads?.sorting?.message) {
      setMessage(candidate.threads.sorting.message);
    } else {
      getResponse();
    }
  }, [candidate]);

  useEffect(() => {
    if (message) {
      clearInterval(interval.current);
    }
    return () => {
      clearInterval(interval.current);
    };
  }, [message]);

  const getResponse = async () => {
    const response = await fetch(`/api/protected/gpt/sorting`, {
      method: "GET",
    });
    if (response.status == 200) {
      const data = await response.json();
      setMessage(data.message);
      setStatus(statusEnum.SUCCESS);
    } else {
      console.log("error");
      setStatus(statusEnum.BLANK);
    }
  };

  const submitPrompt = async () => {
    const response = await fetch("/api/protected/gpt/sorting", {
      method: "POST",
    });
    if (response.status == 200) {
      setStatus(statusEnum.LOADING);
      interval.current = setInterval(() => {
        getResponse();
      }, 3000);
      setTimeout(() => {
        clearInterval(interval.current);
      }, 15000);
    } else {
      setStatus(statusEnum.ERROR);
    }
  };

  return (
    <div className="flex flex-col w-full md:w-96 h-max hover:border-blue-400 duration-100 bg-white shadow-md shadow-gray-400 border-fuchsia-400 border-[1px] rounded-md p-5 justify-start gap-5 items-center text-center">
      <h1 className="text-lg font-bold bg-purple-500 px-3 p-1 rounded-full text-white">
        🎩 Sorting Hat
      </h1>
      <div className="flex flex-col items-start justify-center w-full gap-3 text-center text-base">
        {<p>{message}</p>}
      </div>
      {!message && (
        <button
          onClick={submitPrompt}
          className="bg-blue-100 hover:bg-blue-200 w-max px-3 py-1 rounded-lg text-black text-base font-bold"
        >
          {status}
        </button>
      )}
    </div>
  );
};

export default ChatPage;
