// imports
import { NextResponse, NextRequest } from "next/server";
import Candidate from "@/utilities/candidateModel";
import connectToMongoDB from "@/utilities/connectToMongoDB";
import { getServerSession } from "next-auth";
import { OPTIONS } from "../../auth/[...nextauth]/route";

const ALLOWED_ROLES = ["star", "lead"];

async function GET(req, res) {
    try {
        // check if user is logged in
        const session = await getServerSession(OPTIONS);
        if(!session)
            return NextResponse.json({ error: "Not authorized" }, { status: 401 });

        // retrieve candidate from database
        const regNum = req.nextUrl.searchParams.get("regNum")
        await connectToMongoDB();
        let candidate;
        if (ALLOWED_ROLES.includes(session.user.role) && regNum)
            candidate = await Candidate.findOne({ regNum: regNum })
        else
            candidate = await Candidate.findOne({ regNum: session.user.regNum })

        // return candidate if found
        if(candidate)
            return NextResponse.json(candidate, { status: 200 });
        else
            return NextResponse.json({ error: "candidate not found" }, { status: 404 });
    } 
    catch (error) {
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}

async function POST(req, res) {
    try {
        // check if user is logged in
        const session = await getServerSession(OPTIONS);
        if(!session)
            return NextResponse.json({ error: "Not authorized" }, { status: 401 });

        // retrieve candidate from database
        await connectToMongoDB();
        const candidate = new Candidate({
            regNum: session.user.regNum,
            email: session.user.email,
            name: session.user.firstName,
        })
        await candidate.save()

        const result = await Candidate.findOne({ regNum: session.user.regNum })

        // return candidate
        if (result.regNum === session.user.regNum)
            return NextResponse.json({ status: 200 });
        else
            return NextResponse.json({ error: "candidate not saved" }, { status: 500 });
    } 
    catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}

export {
    GET,
    POST
}