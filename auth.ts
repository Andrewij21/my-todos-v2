import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { prisma } from "./lib/prismaDb";
import bcrypt from "bcryptjs"
export const {handlers,signIn,signOut,auth} = NextAuth({
    providers:[
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Github({
            //  profile(profile){
            //     console.log("profile",profile)
            //     // return {role:""}
            //     return {...profile,role:""}
            // }
        }),
        Credentials({
            credentials:{
                email:{label:"Email",type:"email",placeholder:"Email"},
                password:{label:"Password",type:"password",placeholder:"Password"},
            },
             async authorize(credentials) {
                // console.log({credentials})
                // Validate user(check if user exist and check if password is correct)
                    // Pastikan email dan password ada di credentials
                if (!credentials?.email || typeof credentials.email !== 'string') {
                    throw new Error("Email is required and must be a string");
                }

                if (!credentials?.password || typeof credentials.password !== 'string') {
                    throw new Error("Password is required and must be a string");
                }
                const user = await prisma.user.findUnique({
                    where:{email:credentials.email},
                    select:{id:true,email:true,password:true}
                })
                

                if(!user){
                    console.log("Invalid credentials")
                    return null;
                } 
                const passwordMatch = await bcrypt.compare(credentials.password,user.password)
                if(passwordMatch) return {id:user.id,email:user.email,role:""};

                return null
            },
        })
    ],
    session:{strategy:"jwt"},
    pages:{
        signIn:"/auth/signin"
    },
    callbacks:{
        // authorized({request:{nextUrl},auth}){
            // const isLoggedIn = !!auth?.user;
            // const {pathname} = nextUrl
            // if(pathname.startsWith("/auth") && isLoggedIn){
            //     return Response.redirect(new URL("/",nextUrl))
            // }
            // // kalau mau check apakah user admin atau bukan bisa di sini
            // return true
        // },
        async signIn({user,account}) {
            if (account?.provider === "google") {
                const existingUser = await prisma.user.findUnique({
                    where: { email: user.email as string }
                  });
              
                  // If the user doesn't exist, create a new user
                  if (!existingUser) {
                    await prisma.user.create({
                      data: {
                        email: user.email as string,
                        password:""
                      }
                    });
                  }
            }
              return true 
        },
        jwt({token,user}) {
            // console.log("jwt",{token,user})
            if(user){
                token.id = user.id as string
                token.role = user.role as string
            } 
            return token
        },
        session({session,token}){
            // console.log("session",{session,token})
            session.user.id = token.id
            session.user.role = token.role
            return session
        }
        
    },

})