"use client";
export function EvaluationDetails({ candidate }) {
  return (
    <>
      <div className="flex flex-col justify-start items-start gap-3 w-full max-w-[400px] h-max p-5 bg-gray-900 rounded-lg">
        <div className="flex w-full items-center justify-between gap-10 mb-5">
          <h5 className="text-lg font-bold leading-none text-white">
            📝&nbsp;&nbsp;Evaluation Details
          </h5>
        </div>
        <div className="flex flex-row justify-between items-center w-full pb-1 border-b-2 border-dotted border-gray-600">
          <h6 className="text-sm font-bold text-gray-900 dark:text-white">
            Tag
          </h6>
          <p className="text-sm">{candidate?.tag}</p>
        </div>
        <div className="flex flex-row justify-between items-center w-full pb-1 border-b-2 border-dotted border-gray-600">
          <h6 className="text-sm font-bold text-white">Round</h6>
          <p className="text-sm">{candidate?.round}</p>
        </div>
        <div className="flex flex-row justify-between items-center w-full pb-1 border-b-2 border-dotted border-gray-600">
          <h6 className="text-sm font-bold text-white">Hidden</h6>
          <button className="hover:bg-gray-500 text-sm">
            {candidate?.hidden ? "🟢 Yes" : "🔴 No"}
          </button>
        </div>
        <div className="flex flex-row justify-between items-center w-full pb-1 border-b-2 border-dotted border-gray-600">
          <h6 className="text-sm font-bold text-white">Selected</h6>
          <p className="text-sm">
            {candidate?.selected ? "🟢 Yes" : "🔴 No"}
          </p>
        </div>
      </div>
    </>
  );
}
