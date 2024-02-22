import { NextResponse, NextRequest } from "next/server";
import Candidate from "@/utilities/candidateModel";
import connectToMongoDB from "@/utilities/connectToMongoDB";
import { getServerSession } from "next-auth";
import { OPTIONS } from "../../../auth/[...nextauth]/route";
import OpenAI from "openai";

const ALLOWED_ROLES = ["star", "lead"];

export async function GET(req, res) {
    try {
        const session = await getServerSession(OPTIONS);

        // authorisation by role
        if (!ALLOWED_ROLES.includes(session.user.role)) {
            return NextResponse.json({ error: "Not authorized" }, { status: 401 });
        }

        // find requested candidate
        await connectToMongoDB();
        const regNum = req.nextUrl.searchParams.get("regNum")
        const candidate = await Candidate.findOne({ regNum: regNum })
        if (!candidate) {
            return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
        }

        // get all threads and their messages
        const keys = Object.keys(candidate?.threads)
        const OPENAI_KEY = process.env.OPENAI_KEY;
        const openai = new OpenAI({ apiKey: OPENAI_KEY });

        for(const key of keys) {
            const threadID = candidate?.threads[key].id
            const thread = await openai.beta.threads.messages.list(threadID);
            const text = thread.data[0].content[0].text.value
            candidate.threads[key].message = text
        }

        console.log(candidate.threads)

        await Candidate.updateOne({ regNum: regNum }, { $set: { threads: candidate.threads } })

        return NextResponse.json({ status: 200 });
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}