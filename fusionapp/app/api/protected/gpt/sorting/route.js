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

// session
await connectToMongoDB();

export async function POST(req, res) {
    try {
        const session = await getServerSession(OPTIONS);
        const candidate = await Candidate.findOne({ regNum: session.user.regNum })

        if(candidate?.responses?.sorting)
            return NextResponse.json({ error: "Already submitted" }, { status: 400 });

        if(!candidate?.responses?.skills || !candidate?.responses?.experience)
            return NextResponse.json({ error: "Incomplete" }, { status: 400 });

        const prompt = candidate.responses.skills + candidate.responses.experience;

        // get response from sorting hat assistant
        const assistant = await openai.beta.assistants.retrieve('asst_n0glEXJWczM4w9FvS25EQ2vE')
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

        candidate.threads.sorting = {
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

        if(!candidate?.threads?.sorting)
            return NextResponse.json({ error: "Not found" }, { status: 404 });

        if(candidate.threads?.sorting?.message)
            return NextResponse.json({ message: candidate.threads.sorting.message }, { status: 200 });

        const threadID = candidate.threads.sorting.id;
        const thread = await openai.beta.threads.messages.list(threadID);

        const text = thread.data[0].content[0].text.value
        await Candidate.updateOne({ regNum: session.user.regNum }, { $set: { "threads.sorting.message": text }})

        return NextResponse.json({ message: text }, { status: 200 });
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}