// imports
import { NextResponse } from "next/server";
import Ticket from "@/utilities/ticketModel";
import connectToMongoDB from "@/utilities/connectToMongoDB";

export async function POST(req, res) {
    try {
        // get request data
        await connectToMongoDB();
        const requestData = await req.json();
        const { name, email, regNum, phone, utr, college, year } = requestData;

        const info = {
            name: name,
            college: college,
            year: year,
        }

        // create ticket
        const ticket = new Ticket({
            email: email,
            regNum: regNum,
            phone: phone,
            members: [regNum],
            utr: utr,
            event: 'tokencity',
            amount: '350',
            type: 'external',
            verified: false,
            used: false,
            created: new Date().toLocaleString(),
            info: info,
        });

        // save ticket
        await ticket.save();
        return NextResponse.json({ message: "Ticket created" }, { status: 200 });
    } 
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}