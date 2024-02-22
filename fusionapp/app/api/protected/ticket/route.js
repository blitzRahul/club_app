// imports
import { NextResponse } from "next/server";
import Ticket from "@/utilities/ticketModel";
import connectToMongoDB from "@/utilities/connectToMongoDB";
import { getServerSession } from "next-auth";
import { OPTIONS } from "../../auth/[...nextauth]/route";
const allowedRoles = ["star", "lead", "core"];

export async function POST(req, res) {
    try {
        // check if user is logged in
        const session = await getServerSession(OPTIONS);
        if(!session)
            return NextResponse.json({ error: "Not authorized" }, { status: 401 });

        // retrieve ticket from database
        await connectToMongoDB();
        const requestData = await req.json();
        const uuid = requestData.uuid;

        // check if user is allowed to view ticket
        if(allowedRoles.includes(session.user.role))
            var ticket = await Ticket.findOne({ uuid: uuid })
        else
            var ticket = await Ticket.findOne({ uuid: uuid, members: session.user.regNum })

        // return ticket if found
        if (ticket)
            return NextResponse.json(ticket, { status: 200 });
        else
            return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    } 
    catch (error) {
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}