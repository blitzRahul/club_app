// imports
import { NextResponse } from "next/server";
import Ticket from "@/utilities/ticketModel";
import connectToMongoDB from "@/utilities/connectToMongoDB";

export async function POST(req, res) {
    try {
        // retrieve ticket from database
        await connectToMongoDB();
        const requestData = await req.json();
        const uuid = requestData.uuid;
        const ticket = await Ticket.findOne({ uuid: uuid }).select(["-__v", "-_id", "-phone", "-email", "-utr"]);

        // return redacted ticket if found
        if (ticket) {
            return NextResponse.json(ticket, { status: 200 });
        }
        else
            return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    } 
    catch (error) {
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}