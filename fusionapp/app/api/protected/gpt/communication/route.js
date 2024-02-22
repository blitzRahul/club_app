// nextjs parameters
export const runtime = 'nodejs'

// imports
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { getServerSession } from "next-auth";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";
import Candidate from "@/utilities/candidateModel";
import connectToMongoDB from "@/utilities/connectToMongoDB";

// openai setup
const OPENAI_KEY = process.env.OPENAI_KEY;
const openai = new OpenAI({ apiKey: OPENAI_KEY });
const WORD_LIMIT = 500;

// session
await connectToMongoDB();

export async function POST(req, res) {
    try {
        const session = await getServerSession(OPTIONS);
        const candidate = await Candidate.findOne({ regNum: session.user.regNum })

        if(!candidate)
            return NextResponse.json({ error: "Not found" }, { status: 404 });

        if(candidate?.responses?.communication)
            return NextResponse.json({ error: "Already submitted" }, { status: 400 });

        // get user input
        const data = await req.json();
        if(!data.prompt)
            return NextResponse.json({ error: "Incomplete" }, { status: 400 });
        let prompt;
        if(data.prompt.trim().length > WORD_LIMIT)
            prompt = data.prompt.slice(0, WORD_LIMIT);
        else
            prompt = data.prompt;
        candidate.responses.communication = prompt;

        // get response from assistant
        const assistant = await openai.beta.assistants.retrieve('asst_O8Ofs2P2O8L6IKPdaCuWvAvY')
        const thread = await openai.beta.threads.create()

        const message = await openai.beta.threads.messages.create(
            thread.id,
            {
                role: "user",
                content: prompt,
            }
        );

        const run = await openai.beta.threads.runs.create(
            thread.id,
            {
                assistant_id: assistant.id,
            }
        );

        candidate.threads.communication = {
            id: thread.id,
            message: '',
        }

        await Candidate.updateOne({ regNum: session.user.regNum }, candidate, { upsert: false })
        return NextResponse.json({ status: 200 });
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}

export async function GET(req, res) {
    try {
        const session = await getServerSession(OPTIONS);
        const candidate = await Candidate.findOne({ regNum: session.user.regNum })

        if(!candidate?.threads?.communication)
            return NextResponse.json({ error: "Not found" }, { status: 404 });

        if(candidate.threads?.communication?.message)
            return NextResponse.json({ message: candidate.threads.communication.message }, { status: 200 });

        const threadID = candidate.threads.communication.id;
        const thread = await openai.beta.threads.messages.list(threadID);

        const text = thread.data[0].content[0].text.value
        await Candidate.updateOne({ regNum: session.user.regNum }, { $set: { "threads.communication.message": text }})

        return NextResponse.json({ message: text }, { status: 200 });
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}