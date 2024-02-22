"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CandidateDetails } from "../../components/Candidate/CandidateDetails";
import { EvaluationDetails } from "../../components/Candidate/EvaluationDetails";
import { ResponseCard } from "../../components/Candidate/ResponseCard";

const statusEnum = {
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

const CandidatePage = () => {
  const params = useSearchParams();
  const regNum = params.get("regNum");
  const [candidate, setCandidate] = useState(null);
  const [fetchStatus, setFetchStatus] = useState(statusEnum.LOADING);

  useEffect(() => {
    getCandidate();
  }, []);

    const handleRefetch = async () => {
        await fetch(`/api/protected/gpt/refetch?regNum=${regNum}`);
    }

  const handleCopy = (e) => {
    navigator.clipboard.writeText(
      `https://thefusionclub.in/internal/application?regNum=${candidate?.regNum}`
    );
    e.target.textContent = "secret link copied 📋";
    setTimeout(() => {
      e.target.textContent = "copy private link 🔗";
    }, 3000);
  };

  const getCandidate = async () => {
    const response = await fetch(
      `/api/protected/candidate?regNum=${regNum}`
    ).catch(() => setFetchStatus(statusEnum.ERROR));
    if (response?.status === 200) {
      const candidate = await response.json();
      setCandidate(candidate);
      setFetchStatus(statusEnum.SUCCESS);
    } else setFetchStatus(statusEnum.ERROR);
  };

  if (fetchStatus === statusEnum.LOADING) {
    return (
      <main className="flex h-screen w-screen items-center gap-3 justify-center text-center bg-black text-white text-xl">
        <p className="animate-pulse">finding application</p>
        <p className="animate-spin">⏳</p>
      </main>
    );
  } else if (fetchStatus === statusEnum.SUCCESS) {
    return (
      <main className="bg-gray-950 flex flex-col h-max min-h-screen w-screen justify-start gap-10 items-center text-white p-5">
        <div className="bg-fuchsia-400 w-full h-max flex flex-row p-3 rounded-md justify-between items-center">
          <div className="flex flex-row gap-3 items-center">
            <p className="text-lg font-bold">Application</p>
          </div>
          <a
            className="text-sm border-b-2 font-bold border-white"
            href="/internal"
          >
            Dashboard
          </a>
        </div>
        <div className="flex flex-col md:flex-row flex-wrap w-full h-max self-center items-center gap-10 justify-center">
          <CandidateDetails candidate={candidate} />
          <EvaluationDetails candidate={candidate} />
          <div className="flex flex-col gap-3">
            <ResponseCard
              title="Teams"
              response={candidate?.teams}
              AIsummary={candidate?.threads?.sorting}
            />
            <ResponseCard
              title="Links"
              response={candidate?.responses?.links}
              AIsummary={null}
            />
          </div>
          <ResponseCard
            title="Experience"
            response={candidate?.responses?.experience}
            AIsummary={candidate?.threads?.experience}
          />
          <ResponseCard
            title="Skills"
            response={candidate?.responses?.skills}
            AIsummary={candidate?.threads?.skills}
          />
          <ResponseCard
            title="Communication"
            response={candidate?.responses?.communication}
            AIsummary={candidate?.threads?.communication}
          />
        </div>
        <div className="flex flex-row flex-wrap text-sm w-full h-max items-center justify-center text-center gap-3">
            <button onClick={handleRefetch} className="underline">refetch responses</button>
        </div>
        <p
          onClick={handleCopy}
          className="text-gray-300 w-[200px] text-center hover:bg-white rounded-md p-1 hover:text-gray-900 duration-200 hover:scale-[1.02] active:scale-[0.98] text-sm"
        >
          copy private link 🔗
        </p>
        <p className="text-xs text-gray-400 -mt-8">
          private links can only be opened by heads
        </p>
      </main>
    );
  } else
    return (
      <main className="flex flex-col gap-3 h-screen w-screen items-center justify-center text-center bg-black text-white text-xl">
        no application found 🫠
        <a href="/" className="underline text-base">
          Return Home
        </a>
      </main>
    );
};

export default CandidatePage;


