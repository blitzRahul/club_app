"use client";

import { useState, useEffect } from "react";

function CandidateDetails({ user }) {
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    getCandidate();
  }, []);

  const getCandidate = async () => {
    const res = await fetch(`/api/protected/candidate?regNum=${user.regNum}`);
    if (res.ok) {
      const data = await res.json();
      setCandidate(data);
    } else {
      setCandidate(null);
    }
  };

  if (!candidate) {
    return <></>;
  }

  return (
    <>
      <div className="flex flex-col justify-start items-start gap-2 w-full max-w-[400px] h-max p-5 bg-gray-900 text-white rounded-lg">
        <div className="flex w-full items-center justify-between gap-10 mb-5">
          <h5 className="text-lg font-bold leading-none">
            📝&nbsp;&nbsp;Candidate
          </h5>
        </div>
        <p className="text-sm">{candidate.isECA ? "🟢" : "🔴"}&nbsp;ECA</p>
        <p className="text-sm">
          {candidate.completed ? "🟢" : "🔴"}&nbsp;form completed
        </p>
        <div className="flex flex-row flex-wrap h-max w-full p-2 gap-1 text-sm">
          <p className="text-sm bg-purple-600 rounded-full px-2 p-1">
            {candidate.threads?.communication?.message}&nbsp;communication
          </p>
          {candidate.teams?.map((team, index) => {
            return (
              <p className="bg-fuchsia-400 p-1 rounded-full px-2" key={index}>
                {team.name}
              </p>
            );
          })}
        </div>
        <a className="bg-white text-black rounded-lg px-3 p-1" href={`/internal/application?regNum=${user.regNum}`}>View Application</a>
      </div>
    </>
  );
}

export default CandidateDetails;
