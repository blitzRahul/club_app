// imports
import { NextResponse } from "next/server";
import Candidate from "@/utilities/candidateModel";
import connectToMongoDB from "@/utilities/connectToMongoDB";
import { getServerSession } from "next-auth";
import { OPTIONS } from "../../../auth/[...nextauth]/route";
const allowedRoles = ["star", "lead"];

export async function GET(req, res) {
    try {
        // check if user is a club head
        const session = await getServerSession(OPTIONS);
        if(!session || !allowedRoles.includes(session?.user?.role))
            return NextResponse.json({ error: "Not authorized" }, { status: 401 });

        // retrieve completed applications from database
        await connectToMongoDB();
        const candidates = await Candidate.find({ completed: true })

        // return candidates if found
        if (candidates.length > 0)
            return NextResponse.json(candidates, { status: 200 });
        else
            return NextResponse.json({ error: "no candidates found" }, { status: 404 });
    } 
    catch (error) {
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}