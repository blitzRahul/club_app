"use client";
import { useState } from "react";

export function ResponseCard({ title, response, AIsummary }) {
  const [showAI, setShowAI] = useState(true);

  if (title === "Links") {
    return (
      <>
        <div className="flex flex-col justify-start items-start gap-3 w-full max-w-[400px] h-max p-5 bg-gray-900 text-white rounded-lg duration-100">
          <div className="flex w-full items-center justify-between gap-10 mb-5">
            <h5 className="text-lg font-bold leading-none text-white">
              🔗&nbsp;&nbsp;{title}
            </h5>
          </div>
          <div className="flex flex-row flex-wrap w-full h-max gap-2">
            {Object.keys(response || {}).map((key, index) => {
              return (
                <a
                  key={index}
                  target="_blank"
                  href={response[key]?.trim() || "#"}
                  className={`text-sm bg-fuchsia-400 rounded-full p-1 px-3 ${response[key]?.trim() ? "" : "hidden"} ${response[key]?.trim() ? "hover:text-white" : "text-gray-400"}`}
                >
                  {key}
                </a>
              );
            })}
          </div>
        </div>
      </>
    );
  }

  if (title === "Communication") {
    return (
      <>
        <div className="flex flex-col justify-start items-start gap-3 w-full max-w-[400px] h-max p-5 bg-gray-900 rounded-lg duration-100">
          <div className="flex w-full items-center justify-between gap-10 mb-5">
            <h5 className="text-lg font-bold leading-none text-white">
              ✏️&nbsp;&nbsp;Communication
            </h5>
            <p
              className={`text-xs ${["good", "excellent"].includes(AIsummary?.message?.toLowerCase()) ? "bg-green-500" : "bg-yellow-500"} rounded-full px-3 p-1 text-white text-center`}
            >
              rated {AIsummary?.message?.toLowerCase()}
            </p>
          </div>
          <p className="text-sm text-white">{response}</p>
        </div>
      </>
    );
  }

  if (showAI) {
    return (
      <>
        <div className="flex flex-col justify-start items-start gap-3 w-full max-w-[400px] h-max p-5 bg-white text-black rounded-lg border-fuchsia-400 border-2 duration-100">
          <div className="flex w-full items-center justify-between gap-10 mb-5">
            <h5 className="text-lg font-bold leading-none">
              🪄&nbsp;&nbsp;{title}
            </h5>
            <button
              onClick={() => setShowAI(false)}
              className="text-xs bg-fuchsia-400 rounded-full px-3 p-1 text-white"
            >
              show original
            </button>
          </div>
          {AIsummary?.message?.split("\n").map((line, index) => {
            return (
              <p key={index} className="text-sm">
                {line}
              </p>
            );
          })}
        </div>
      </>
    );
  }

  if (title === "Teams") {
    return (
      <>
        <div className="flex flex-col justify-start items-start gap-3 w-full max-w-[400px] h-max p-5 bg-gray-900 text-white rounded-lg duration-100">
          <div className="flex w-full items-center justify-between gap-10 mb-5">
            <h5 className="text-lg font-bold leading-none text-white">
              ✏️&nbsp;&nbsp;Selected {title}
            </h5>
            <button
              onClick={() => setShowAI(true)}
              className="text-xs bg-fuchsia-400 rounded-full px-3 p-1 text-white"
            >
              view recommended ✨
            </button>
          </div>
          <div className="flex flex-row flex-wrap w-full h-max gap-2">
            {Object.values(response).map((team, index) => {
              return (
                <p
                  key={index}
                  className="text-sm bg-fuchsia-400 rounded-full p-1 px-3"
                >
                  {team.name}
                </p>
              );
            })}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-start items-start gap-3 w-full max-w-[400px] h-max p-5 bg-gray-900 text-white rounded-lg duration-100">
        <div className="flex w-full items-center justify-between gap-10 mb-5">
          <h5 className="text-lg font-bold leading-none text-white">
            ✏️&nbsp;&nbsp;{title}
          </h5>
          <button
            onClick={() => setShowAI(true)}
            className="text-xs bg-fuchsia-400 rounded-full px-3 p-1 text-white"
          >
            {title === "Communication" ? "rate" : "summarise"} with AI ✨
          </button>
        </div>
        <p className="text-sm">{response}</p>
      </div>
    </>
  );
}
