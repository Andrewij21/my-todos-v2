import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Github from "next-auth/providers/github"
import { SignInSchema } from "./lib/zod";

export const {handlers,signIn,signOut,auth} = NextAuth({
    providers:[
        Github({
            // profile(){
            //     return {role:""}
            // }
        }),
        Credentials({
            credentials:{
                email:{label:"Email",type:"email",placeholder:"Email"},
                password:{label:"Password",type:"password",placeholder:"Password"},
            },
             async authorize(credentials) {
                let user = null;
                console.log({credentials})
                // Validate user(check if user exist and check if password is correct)
                const parsedCredentials = SignInSchema.safeParse(credentials);
                if(parsedCredentials.error){
                    console.error("Invalid credentials", parsedCredentials.error.errors);
                    return null
                }

                user ={
                    id:"1",
                    name:"bob",
                    email:"bob@gmail.com",
                    role:"admin"
                }

                if(!user){
                    console.log("Invalid credentials")
                    return null;
                }

                return user
            },
        })
    ],
    session:{strategy:"jwt"},
    pages:{
        signIn:"/auth/signin"
    },
    callbacks:{
        authorized({request:{nextUrl},auth}){
            const isLoggedIn = !!auth?.user;
            const {pathname} = nextUrl
            if(pathname.startsWith("/auth") && isLoggedIn){
                return Response.redirect(new URL("/",nextUrl))
            }
            // kalau mau check apakah user admin atau bukan bisa di sini
            return !!auth
        },
        jwt({token,user}) {
            if(user){
                token.id = user.id as string
                token.role = user.role as string
            } 
            return token
        },
        session({session,token}){
            session.user.id = token.id
            session.user.role = token.role
            return session
        }
        
    }
})