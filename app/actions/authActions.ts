'use server';

import { signIn,signOut } from "@/auth";
import { prisma } from "@/lib/prismaDb";
import { Prisma } from "@prisma/client";
import { SignInSchema, SignUpSchema } from "@/lib/zod";
import { z } from "zod";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs"
import { AuthError } from "next-auth";

export async function handleSignIn(values:z.infer<typeof SignInSchema>){
    const valudatedFields = SignInSchema.safeParse(values);
    if(valudatedFields.error){
        console.error("Invalid credentials", valudatedFields.error.errors);
        throw  valudatedFields.error.errors
    }
    try {
        await signIn('credentials',{email:values.email,password:values.password,redirectTo:"/"})
    } catch (error) {
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                  throw Error("Credentials is invalid")
                default:
                    console.log("error")
                }
            } 
        console.error("Internal server error 500")

       throw error
    }
}

export async function handleGithubSignin(){
    await signIn('github',{redirectTo:"/"})
}
export async function handleGoogleSignin(){
    await signIn('google',{redirectTo:"/"})
}
export async function handleSignup(values:z.infer<typeof SignUpSchema>){
    const valudatedFields = SignUpSchema.safeParse(values);
    if(valudatedFields.error){ 
        console.error("Invalid credentials", valudatedFields.error.errors);
        throw valudatedFields.error.errors
    }
    const hashPassword = await bcrypt.hash(values.password,10);

    try {
        await prisma.user.create({
            data:{
                email:values.email,
                password:hashPassword
            }
        })
        return redirect("/auth/signin");
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (error.code === 'P2002') {
              console.log(
                'There is a unique constraint violation, a new user cannot be created with this email'
              )
              throw Error("Email already used")
            }   
        }else{
            console.error("Internal server error 500")
        }
        throw error
    }
}
export async function handleSignout(){
   return await signOut()
}