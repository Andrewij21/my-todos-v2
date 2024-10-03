'use server';

import { signIn,signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function handleSignIn({email,password}:{email:string;password:string}){
    try {
        await signIn('credentials',{email,password,redirectTo:"/"})
    } catch (error) {
        if(error instanceof AuthError){
            switch (error.type){
                case 'CredentialsSignin':
                    return {
                        message:"Invalid Credentials"
                    }
                default: 
                    return {
                        message:"Something went wrong"
                    }
            }
        }    
        throw error    
    }
}

export async function handleGithubSignin(){
    await signIn('github',{redirectTo:"/"})
}
export async function handleSignout(){
    await signOut()
}