// imports
import { NextResponse } from "next/server";
import Candidate from "@/utilities/candidateModel";
import connectToMongoDB from "@/utilities/connectToMongoDB";
import { getServerSession } from "next-auth";
import { OPTIONS } from "../../../auth/[...nextauth]/route";

// connect to database
await connectToMongoDB();

export async function POST(req, res) {
    try {
        const session = await getServerSession(OPTIONS);
        const candidate = await Candidate.findOne({ regNum: session.user.regNum })

        if(!candidate)
            return NextResponse.json({ error: "Not found" }, { status: 404 });

        if(candidate.completed)
            return NextResponse.json({ error: "Already submitted" }, { status: 400 });

        // get user input
        const data = await req.json();
        if(!data.links)
            return NextResponse.json({ error: "Incomplete" }, { status: 400 });

            const links = data.links;
            candidate.responses.links = links;

        // update candidate
        const response = await Candidate.findOneAndUpdate(
            { regNum: session.user.regNum },
            { $set: candidate }
        );

        if(!response)
            return NextResponse.json({ error: "Server Error" }, { status: 500 });
        else
            return NextResponse.json({ success: true }, { status: 200 });
    } 
    catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}