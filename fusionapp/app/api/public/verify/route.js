import connectToMongoDB from "@/utilities/connectToMongoDB";
import Mail from "@/utilities/mailModel";
import { v4 as uuidv4 } from "uuid";
import Ticket from "@/utilities/ticketModel";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        // get request data
        await connectToMongoDB();
        const requestData = await req.json();
        const { code } = requestData;

        // create mail
        const mail = await Mail.findOne({ code: code });

        if (!mail)
            return NextResponse.json({ error: "Invalid code" }, { status: 404 });

        // create ticket
        const ticket = await Ticket.findOne({ email: mail.email, event: 'tokencity' });
        if (!ticket)
            return NextResponse.json({ error: "No ticket found" }, { status: 404 });
        if (ticket.uuid)
            return NextResponse.json({ message: mail.email }, { status: 200 });

        // add uuid and send response
        const uuid = uuidv4();
        await Ticket.findOneAndUpdate({ email: mail.email, event: 'tokencity' }, { uuid: uuid });
        return NextResponse.json({ message: mail.email }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}