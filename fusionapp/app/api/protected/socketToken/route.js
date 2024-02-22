// nextjs parameters
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'
export const fetchCache = 'only-no-store'

// imports
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { OPTIONS } from "../../auth/[...nextauth]/route";
import { sign } from "jsonwebtoken";

// jwt signing key
const JWT_KEY = process.env.JWT_SECRET;

export async function GET() {
    try {
        const session = await getServerSession(OPTIONS);
        // return a token to logged in users
        if (session) {
            const token = sign(session.user, JWT_KEY, { expiresIn: "10s" });
            return NextResponse.json({ token: token }, { status: 200 });
        }
        // return an error to unauthenticated users
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    } 
    catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}