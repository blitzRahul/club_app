"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const paymentDetails = {
  amount: 350,
  currency: "INR",
  receiver: "FUSION CLUB",
  accountNumber: "7375446492",
  ifsc: "IDIB000V143",
  bank: "Indian Bank",
};

const Instructions = [
  "Make a transfer to the given account",
  "Enter transaction ID / UTR number",
  "Click submit, ensure successful registration",
  "Access your ticket in your dashboard",
];

export default function Page() {
  const [step, setStep] = useState(1);
  const [utr, setUTR] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleCopyToClipboard = (text, e) => {
    navigator.clipboard.writeText(text);
    e.target.textContent = "✅";
    setTimeout(() => {
      e.target.textContent = "📋";
    }, 1000);
  };

  const handleSubmit = async () => {
    if (!utr) {
      setMessage("Transaction ID is required");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/protected/register", {
        method: "POST",
        body: JSON.stringify({ utr }),
      });
      if (response.status === 200) {
        setLoading(false);
        const data = await response.json();
        setMessage(data.message);
        setUTR("");
        setTimeout(() => {
          router.push("/success/internal");
        }, 1000);
      } else {
        const data = await response.json();
        setMessage(data?.error);
      }
    } catch (error) {
      setMessage("An error occurred, please try again");
    }
    setLoading(false);
  };

  return (
    <>
      <main className="flex flex-col h-screen w-screen bg-black text-white justify-start items-center p-8 gap-5">
        <header className="flex w-full h-max p-5 bg-purple-600 rounded-md justify-between items-center">
          <h1 className="text-2xl font-bold text-white">
            ♥️♦️ Token City ♣️♠️
          </h1>
          <a
            href="/"
            className="text-white border-b-2 border-transparent duration-75 hover:border-white"
          >
            Home
          </a>
        </header>
        <div className="flex flex-row w-full justify-center items-center gap-5">
          <button
            onClick={() => setStep(step === 1 ? 1 : step - 1)}
            className="flex flex-row bg-purple-500 px-3 p-1 text-white rounded-full hover:bg-gray-300 hover:text-purple-500"
          >
            👈&nbsp;&nbsp;prev
          </button>
          <button
            onClick={() => setStep(step === 3 ? 3 : step + 1)}
            className="flex flex-row bg-purple-500 px-3 p-1 text-white rounded-full hover:bg-gray-300 hover:text-purple-500"
          >
            next&nbsp;&nbsp;👉
          </button>
        </div>
        {step === 1 && (
          <section className="flex flex-col bg-purple-600 text-white p-5 w-full max-w-lg h-max rounded-lg gap-5">
            <h3 className="text-xl font-bold bg-white text-purple-500 w-max px-3 rounded-full">
              Step 1 - Instructions
            </h3>
            <div className="flex flex-col justify-around h-full w-full gap-2">
              {Instructions.map((instruction, index) => {
                return (
                  <InstructionPoint
                    key={index}
                    number={index + 1}
                    s
                    text={instruction}
                  />
                );
              })}
            </div>
          </section>
        )}
        {step === 2 && (
          <section className="flex flex-col bg-purple-600 text-white p-5 w-full max-w-lg h-max rounded-lg gap-5">
            <h3 className="text-xl font-bold bg-white text-purple-500 w-max px-3 rounded-full">
              Step 2 - Payment Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              <p className="text-lg font-bold">Amount</p>
              <p className="flex flex-row items-center justify-between w-max h-max gap-2 text-lg font-bold bg-white text-purple-500 p-1 px-3 pr-1 rounded-lg">
                ₹{paymentDetails.amount}
                <button
                  onClick={(e) =>
                    handleCopyToClipboard(paymentDetails.amount, e)
                  }
                  className="bg-gray-300 p-1 flex w-8 h-8 items-center justify-center self-end rounded-lg"
                >
                  📋
                </button>
              </p>
              <p className="text-lg font-bold">Beneficiary</p>
              <p className="flex flex-row items-center justify-between w-max h-max gap-2 text-lg font-bold bg-white text-purple-500 p-1 px-3 pr-1 rounded-lg">
                {paymentDetails.receiver}
                <button
                  onClick={(e) =>
                    handleCopyToClipboard(paymentDetails.receiver, e)
                  }
                  className="bg-gray-300 p-1 flex w-8 h-8 items-center justify-center self-end rounded-lg"
                >
                  📋
                </button>
              </p>
              <p className="text-lg font-bold">Bank</p>
              <p className="flex flex-row items-center justify-between w-max h-max gap-2 text-lg font-bold bg-white text-purple-500 p-1 px-3 pr-1 rounded-lg">
                {paymentDetails.bank}
                <button
                  onClick={(e) => handleCopyToClipboard(paymentDetails.bank, e)}
                  className="bg-gray-300 p-1 flex w-8 h-8 items-center justify-center self-end rounded-lg"
                >
                  📋
                </button>
              </p>
              <p className="text-lg font-bold">Account</p>
              <p className="flex flex-row items-center justify-between w-max h-max gap-2 text-lg font-bold bg-white text-purple-500 p-1 px-3 pr-1 rounded-lg">
                {paymentDetails.accountNumber}
                <button
                  onClick={(e) =>
                    handleCopyToClipboard(paymentDetails.accountNumber, e)
                  }
                  className="bg-gray-300 p-1 flex w-8 h-8 items-center justify-center self-end rounded-lg"
                >
                  📋
                </button>
              </p>
              <p className="text-lg font-bold">IFSC</p>
              <p className="flex flex-row items-center justify-between w-max h-max gap-2 text-lg font-bold bg-white text-purple-500 p-1 px-3 pr-1 rounded-lg">
                {paymentDetails.ifsc}
                <button
                  onClick={(e) => handleCopyToClipboard(paymentDetails.ifsc, e)}
                  className="bg-gray-300 p-1 flex w-8 h-8 items-center justify-center self-end rounded-lg"
                >
                  📋
                </button>
              </p>
            </div>
          </section>
        )}
        {step === 3 && (
          <section className="flex w-full max-w-lg h-max gap-3">
            <section
              className={`flex flex-col bg-purple-600 text-white p-5 w-full h-full rounded-lg gap-5`}
            >
              <h3 className="text-xl font-bold bg-white text-purple-500 w-max px-3 rounded-full">
                Step 3 - Fill Details
              </h3>
              <div className="flex flex-col w-full h-max gap-1">
                <label className="text-lg font-bold">Transaction ID*</label>
                <input
                  className="text-lg p-3 rounded-lg border-2 border-purple-500 text-black"
                  type={"text"}
                  placeholder={"unique transaction reference number"}
                  value={utr}
                  onChange={(e) => setUTR(e.target.value)}
                  autoComplete={"none"}
                  required={true}
                  maxLength={50}
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex flex-row bg-white text-purple-500 rounded-md w-max self-center p-2 font-bold hover:border-white border-transparent border-2 hover:bg-purple-500 hover:text-white"
              >
                {loading ? "sending ⏳" : "Submit"}
              </button>
            </section>
          </section>
        )}
        <p className="font-bold italic text-center text-lg self-center">
          {message}
        </p>
        <footer className="text-sm text-white flex flex-row w-full items-center justify-center absolute bottom-0 p-3">
          &copy;2024 The&nbsp;Fusion&nbsp;Club
        </footer>
      </main>
    </>
  );
}

const InstructionPoint = ({ number, text }) => {
  return (
    <div className="text-lg flex flex-row w-full h-max items-center gap-2 justify-start">
      <p className="flex items-center justify-center bg-white w-8 h-8 rounded-full text-purple-500 p-2 font-bold">
        {number}
      </p>
      {text}
    </div>
  );
};
