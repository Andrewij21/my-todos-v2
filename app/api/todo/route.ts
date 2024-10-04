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
    userId:string;
    title:string;
    body:string
}
export async function POST(request: Request) {
    try {
        const body:BodyPostProps = await request.json();  
        const newPost = await prisma.post.create({
            data: {
                userId:body.userId,
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