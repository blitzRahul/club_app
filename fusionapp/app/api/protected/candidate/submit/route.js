// imports
import { NextResponse } from "next/server";
import Candidate from "@/utilities/candidateModel";
import connectToMongoDB from "@/utilities/connectToMongoDB";
import { getServerSession } from "next-auth";
import { OPTIONS } from "../../../auth/[...nextauth]/route";

// connect to database
await connectToMongoDB();

export async function GET(req, res) {
    try {
        const session = await getServerSession(OPTIONS);

        if(!session)
            return NextResponse.json({ error: "Not authorised" }, { status: 403 });

        let candidate = await Candidate.findOne({ regNum: session.user.regNum })

        if(!candidate)
            return NextResponse.json({ error: "Not found" }, { status: 404 });

        // update candidate
        const response = await Candidate.findOneAndUpdate(
            { regNum: session.user.regNum },
            { $set: { completed: true } }
        );

        return NextResponse.json({ success: true }, { status: 200 });
    } 
    catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}