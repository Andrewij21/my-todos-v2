import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaDb";
export async function GET(req:Request){
    try {
        let query={}
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");
        if(email)query={where:{user:{email}}}
        const data = await prisma.post.findMany(query);
        return NextResponse.json(data,{status:200})
    } catch (error) {
        console.log("[GET TODO]"+error)
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

interface BodyPostProps{
    email:string;
    title:string;
    body:string
}
export async function POST(request: Request) {
    try {
        const body:BodyPostProps = await request.json();  
        const isEmailExist = await prisma.user.findUnique({
            where:{
                email:body.email
            }
        })
        console.log({isEmailExist})
        if(!isEmailExist) return NextResponse.json("User not found",{status:404});

        const newPost = await prisma.post.create({
            data: {
                userId:isEmailExist.id,
                title: body.title,
                body: body.body,
            },
        });
        return NextResponse.json(newPost, { status: 200 });
    } catch (error) {
        console.log("[POST TODO] " + error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
    // return new NextResponse("ok",{status:200})
}