"use client";
import { useState, useEffect } from "react";
import Unauthorised from "../components/Unauthorised";
import { CandidateDetails } from "../components/Candidate/CandidateDetails";
import { ResponseCard } from "../components/Candidate/ResponseCard";

const teams = [
  {
    name: "All Teams",
    value: "all",
  },
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

const fields = [
  {
    name: "info",
    id: "info",
  },
  {
    name: "skill",
    id: "skill",
  },
  {
    name: "experience",
    id: "exp",
  },
  {
    name: "communication",
    id: "comm",
  },
];

const statusEnum = {
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

export default function EvaluationPage() {
  const [shownField, setShownField] = useState(fields[0].id);
  const [applications, setApplications] = useState(null);
  const [filteredApplications, setFiltered] = useState([]);
  const [shownTeam, setShownTeam] = useState(teams[0]);
  const [status, setStatus] = useState(statusEnum.LOADING);

  useEffect(() => {
    getCandidates();
  }, []);

  useEffect(() => {
    if (applications) {
      if (shownTeam.value === "all") {
        setFiltered(applications);
        return;
      }
      const filtered = applications?.filter((application) => {
        const teams = application.teams.map((team) => team.value);
        if (teams.includes(shownTeam.value)) return application;
      });
      setFiltered(filtered);
    }
  }, [shownTeam]);

  const getCandidates = async () => {
    try {
      const response = await fetch("/api/protected/candidate/all");
      if (response.status !== 200) {
        setStatus(statusEnum.ERROR);
        return;
      }
      const data = await response.json();
      setApplications(data);
      setFiltered(data);
      setStatus(statusEnum.SUCCESS);
    } catch (error) {
      setStatus(statusEnum.ERROR);
      console.error(error);
    }
  };

  if (status === statusEnum.LOADING) {
    return (
      <>
        <div className="flex flex-col justify-center items-center bg-black text-white w-full h-screen gap-5">
          <h1 className="text-2xl font-bold">Evaluator Dashboard</h1>
          <p className="text-lg">Welcome, dear fusion lead</p>
          <p className="text-sm animate-pulse">loading ⏳</p>
        </div>
      </>
    );
  }

  if (status === statusEnum.ERROR) {
    return <Unauthorised />;
  }

  return (
    <>
      <main className="flex flex-col h-max min-h-screen w-screen bg-purple-300 bg-center p-5 gap-3 items-center justify-start">
        <header className="flex w-full h-max p-5 bg-gray-900 rounded-md justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-700 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent">
            Evaluation
          </h1>
          <a
            href="/internal"
            className="text-white border-b-2 border-transparent duration-75 hover:border-white"
          >
            Return
          </a>
        </header>
        <section className="flex flex-row w-full h- flex-wrap justify-start items-start gap-2 p-3">
          {fields.map((field, index) => {
            return (
              <button
                className={`rounded-full p-1 px-3 ${shownField === field.id ? "bg-fuchsia-500 text-white" : "bg-white"}`}
                onClick={() => setShownField(field.id)}
                key={index}
              >
                {field.name}
              </button>
            );
          })}
        </section>
        <section className="flex flex-row w-full h- flex-wrap justify-start items-start gap-2 p-3">
          {teams.map((team, index) => {
            return (
              <button
                className={`rounded-full p-1 px-3 ${shownTeam === team ? "bg-fuchsia-500 text-white" : "bg-white"}`}
                onClick={() => setShownTeam(team)}
                key={index}
              >
                {team.name}
              </button>
            );
          })}
        </section>
        <section className="flex flex-row flex-wrap w-full h-max gap-8 justify-center items-start">
          {
            // if shownField is all info
            shownField === "info" &&
              filteredApplications.map((application, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center gap-2 w-[400px] h-max"
                  >
                    <ControlBar
                      name={application?.name}
                      link={`/internal/application?regNum=${application?.regNum}`}
                      index={index}
                    />
                    <CandidateDetails candidate={application} />
                  </div>
                );
              })
          }
          {
            // if shownField is skill
            shownField === "skill" &&
              filteredApplications.map((application, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center gap-2 w-[400px] h-max"
                  >
                    <ControlBar
                      name={application?.name}
                      link={`/internal/application?regNum=${application?.regNum}`}
                      index={index}
                    />
                    <ResponseCard
                      title="Skills"
                      response={application?.responses?.skills}
                      AIsummary={application?.threads?.skills}
                    />
                  </div>
                );
              })
          }
          {
            // if shownField is experience
            shownField === "exp" &&
              filteredApplications.map((application, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center gap-2 w-[400px] h-max"
                  >
                    <ControlBar
                      name={application?.name}
                      link={`/internal/application?regNum=${application?.regNum}`}
                      index={index}
                    />
                    <ResponseCard
                      title="Experience"
                      response={application?.responses?.experience}
                      AIsummary={application?.threads?.experience}
                    />
                  </div>
                );
              })
          }
          {
            // if shownField is communication
            shownField === "comm" &&
              filteredApplications.map((application, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center gap-2 w-[400px] h-max"
                  >
                    <ControlBar
                      name={application?.name}
                      link={`/internal/application?regNum=${application?.regNum}`}
                      index={index}
                    />
                    <ResponseCard
                      title="Communication"
                      response={application?.responses?.communication}
                      AIsummary={application?.threads?.communication}
                    />
                  </div>
                );
              })
          }
        </section>
      </main>
    </>
  );
}

function ControlBar({ name, link, index }) {
  return (
    <div className="flex flex-row w-full h-max justify-between items-center bg-gray-900 text-white rounded-full">
      <h5 className="text-lg font-bold flex w-8 h-8 bg-fuchsia-500 justify-center items-center text-white rounded-full">
        {index}
      </h5>
      <h5 className="text-lg font-bold text-white">{name}</h5>
      <a
        href={link}
        target="_blank"
        className="text-sm bg-fuchsia-500 hover:bg-fuchsia-400 rounded-full px-3 p-1 h-full w-max text-white"
      >
        view full
      </a>
    </div>
  );
}
