// imports
import { NextResponse } from "next/server";
import Ticket from "@/utilities/ticketModel";
import connectToMongoDB from "@/utilities/connectToMongoDB";
import { getServerSession } from "next-auth";
import { OPTIONS } from "../../auth/[...nextauth]/route";
import { v4 as uuidv4 } from "uuid";

export async function POST(req, res) {
    try {
        // check if user is logged in
        const session = await getServerSession(OPTIONS);
        if(!session.user)
            return NextResponse.json({ error: "Not authorized" }, { status: 401 });

        // get request data
        await connectToMongoDB();
        const requestData = await req.json();
        const utr = requestData.utr;

        let ticket = await Ticket.findOne({ regNum: session.user.regNum, event: 'tokencity' });
        if(ticket)
            return NextResponse.json({ error: "Already registered!" }, { status: 400 });

        // create ticket
        ticket = new Ticket({
            email: session.user.email,
            regNum: session.user.regNum,
            phone: session.user.phone,
            members: [session.user.regNum],
            uuid: uuidv4(),
            utr: utr,
            event: 'tokencity',
            amount: '350',
            verified: false,
            used: false,
            created: new Date().toLocaleString(),
        });

        // save ticket
        await ticket.save();
        return NextResponse.json({ message: "Registration successful ✅" }, { status: 200 });
    } 
    catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}