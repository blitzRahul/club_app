"use client";
export function CandidateDetails({ candidate }) {
  return (
    <>
      <div className="flex flex-col justify-start items-start gap-3 w-full max-w-[400px] h-max p-5 bg-gray-900 rounded-lg">
        <div className="flex w-full items-center justify-between gap-10 mb-5">
          <h5 className="text-lg font-bold leading-none text-white">
            👤&nbsp;&nbsp;Application Details
          </h5>
        </div>
        <div className="flex flex-row justify-between items-center w-full pb-1 border-b-2 border-dotted border-gray-600">
          <h6 className="text-sm font-bold text-gray-900 dark:text-white">
            Name
          </h6>
          <p className="text-sm text-white">{candidate?.name}</p>
        </div>
        <div className="flex flex-row justify-between items-center w-full pb-1 border-b-2 border-dotted border-gray-600">
          <h6 className="text-sm font-bold text-white">Regnum</h6>
          <p className="text-sm text-white">{candidate?.regNum}</p>
        </div>
        <div className="flex flex-row justify-between items-center w-full pb-1 border-b-2 border-dotted border-gray-600">
          <h6 className="text-sm font-bold text-white">Email</h6>
          <p className="text-xs text-white">{candidate?.email}</p>
        </div>
        <div className="flex flex-row justify-between items-center w-full pb-1 border-b-2 border-dotted border-gray-600">
          <h6 className="text-sm font-bold text-white">ECA</h6>
          <p className="text-sm text-white">
            {candidate?.isECA ? "🟢 Yes" : "🔴 No"}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center w-full pb-1 border-b-2 border-dotted border-gray-600">
          <h6 className="text-sm font-bold text-white">Completed</h6>
          <p className="text-sm text-white">
            {candidate?.completed ? "🟢 Yes" : "🔴 No"}
          </p>
        </div>
      </div>
    </>
  );
}
