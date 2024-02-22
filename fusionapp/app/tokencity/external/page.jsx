"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Instructions = [
  "Make a transfer to the given account",
  "Note your transaction ID",
  "Fill in your details",
  "Click submit",
  "Wait 24 hours for verification mail",
];

const paymentDetails = {
  amount: 350,
  currency: "INR",
  receiver: "FUSION CLUB",
  accountNumber: "7375446492",
  ifsc: "IDIB000V143",
  bank: "Indian Bank",
};

const fields = [
  {
    label: "Name",
    id: "name",
    type: "text",
    placeholder: "your name",
    required: true,
    maxLength: 100,
    autocomplete: "name",
  },
  {
    label: "Email",
    id: "email",
    type: "email",
    placeholder: "your email",
    required: true,
    maxLength: 100,
    autocomplete: "email",
  },
  {
    label: "Phone",
    id: "phone",
    type: "tel",
    placeholder: "10 digit number",
    required: false,
    maxLength: 10,
    autocomplete: "phone",
  },
  {
    label: "UTR",
    id: "utr",
    type: "text",
    placeholder: "transaction ID (UTR)",
    required: true,
    maxLength: 50,
    autocomplete: "none",
  },
  {
    label: "College",
    id: "college",
    type: "text",
    placeholder: "college/university name",
    required: true,
    maxLength: 100,
    autocomplete: "none",
  },
  {
    label: "College ID Card Number",
    id: "regNum",
    type: "text",
    placeholder: "your unique reg number",
    required: true,
    maxLength: 50,
    autocomplete: "none",
  },
  {
    label: "Year",
    id: "year",
    type: "text",
    placeholder: "year of study",
    required: false,
    maxLength: 1,
    autocomplete: "none",
  },
];

const Form = () => {
  const [responses, setResponses] = useState({
    name: "",
    email: "",
    phone: "",
    utr: "",
    college: "",
    year: "",
    regNum: "",
  });
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCopyToClipboard = (text, e) => {
    navigator.clipboard.writeText(text);
    e.target.textContent = "✅";
    setTimeout(() => {
      e.target.textContent = "📋";
    }, 1000);
  };

  const handleSubmit = async () => {
    const { name, email, phone, utr, college, year, regNum } = responses;
    if (!name || !email || !utr || !college || !regNum) {
      setError("Please fill all the required fields");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (phone && phone.length !== 10) {
      setError("Please enter a valid phone number");
      return;
    }
    if (utr.length < 6) {
      setError("Please enter a valid UTR number");
      return;
    }
    if (year && (year < 1 || year > 9)) {
      setError("Please enter a valid year of study");
      return;
    }
    setError("");
    // send data to backend
    const response = await fetch("/api/public/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        utr,
        college,
        year,
        regNum,
      }),
    });
    if (response.status === 200) {
      setLoading(false);
      setStep(1);
      setResponses({
        name: "",
        email: "",
        phone: "",
        utr: "",
        college: "",
        year: "",
        regNum: "",
      });
      router.push("/success/external");
    } else {
      const data = await response.json();
      setError(data.error);
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col h-max min-h-screen w-screen gap-5 p-5 lg:p-10 items-center justify-start">
      <header className="flex w-full h-max p-5 bg-gray-900 rounded-md justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-700 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent">
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
            Step 2 - Payment
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            <p className="text-lg font-bold">Amount</p>
            <p className="flex flex-row items-center justify-between w-max h-max gap-2 text-lg font-bold bg-white text-purple-500 p-1 px-3 pr-1 rounded-lg">
              ₹{paymentDetails.amount}
              <button
                onClick={(e) => handleCopyToClipboard(paymentDetails.amount, e)}
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
            className={`flex flex-col ${error.length > 0 ? "border-red-400 border-2" : ""} bg-purple-600 text-white p-5 w-full h-full rounded-lg gap-5`}
          >
            <h3 className="text-xl font-bold bg-white text-purple-500 w-max px-3 rounded-full">
              Step 3 - Fill Details
            </h3>
            <div className="flex flex-col justify-around h-full w-full gap-2">
              {fields.map((field, index) => (
                <FormField
                  key={index}
                  value={responses[field.id]}
                  field={field}
                  onChange={(e) =>
                    setResponses({
                      ...responses,
                      [field.id]: e.target.value,
                    })
                  }
                />
              ))}
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
      <p className="text-red-400 font-bold italic text-center self-center">
        {error}
      </p>
      <footer className="text-sm text-black flex flex-row w-full items-center justify-center self-end p-3">
        &copy;2024 The&nbsp;Fusion&nbsp;Club
      </footer>
    </main>
  );
};

export default Form;

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

const FormField = ({ field, value, onChange }) => {
  const { placeholder, label, type, required, maxLength } = field;
  return (
    <div className="flex flex-col w-full h-max gap-1">
      <label className="text-lg font-bold" htmlFor={label}>
        {label}
        {required ? "*" : ""}
      </label>
      <input
        className="text-lg p-3 rounded-lg border-2 border-purple-500 text-black"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={field.autocomplete}
        required={required}
        maxLength={maxLength}
      />
    </div>
  );
};
