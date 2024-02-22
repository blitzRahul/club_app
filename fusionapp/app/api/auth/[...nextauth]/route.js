// setting up next-auth with Google Provider
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectToMongoDB from "@/utilities/connectToMongoDB";
import User from "@/utilities/userModel";
import { v4 as uuidv4 } from "uuid";

// these options will be passed to next-auth
export const OPTIONS = {
  // auth provider - Google
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      name: "Credentials",
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async session({ session, token }) {
      // add role and regNum to session.user
      session.user = {
        regNum: token.regNum,
        role: token.role,
        firstName: token.firstName,
        ...session.user,
      };
      return session;
    },

    async jwt({ token, user }) {
      // if google gives us a user
      if (user) {
        // calculate regNum
        const regnumRegex = /\d{2}[a-zA-Z]{3}\d{5}/;
        let match = user.name.match(regnumRegex);
        let regNum;
        if(match?.length) regNum = match[0]?.toUpperCase();
        else regNum = uuidv4().slice(-10)?.toUpperCase();
        // find user in database
        await connectToMongoDB();
        let userData = await User.findOne({ regNum: regNum });

        // if user not found, create a new user
        if (!userData) {
          userData = await User.create({
            name: user?.name,
            regNum: regNum,
            email: user?.email,
            slots: [],
            role: "user",
            phone: "none",
          });
        }

        // if user details are incorrect, update them
        if (userData?.name !== user?.name || userData?.email !== user?.email) {
          userData.name = user?.name;
          userData.email = user?.email;
          userData.role = "user";
          userData.save();
        }

        // add role and regNum to token
        token.regNum = userData.regNum;
        token.role = userData.role;
        token.firstName = userData.name
          .charAt(0)
          .concat(userData.name.split(" ")[0].slice(1).toLowerCase());
      }
      return token;
    },
  },

  pages: {
    signIn: "/signin",
    signOut: "/",
    error: "/error",
    newUser: "/dashboard",
  },
  debug: false,
};

// export handler for this api route
const handler = NextAuth(OPTIONS);
export { handler as GET, handler as POST };
