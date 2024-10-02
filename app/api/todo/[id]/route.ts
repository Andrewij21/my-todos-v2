import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaDb";
export async function GET(req:Request,{ params }: { params: { id: string } }){
    try {
        const todo = await prisma.post.findUnique({
            where: { id: params.id } });
        
        if (!todo) {
            return new NextResponse("Todo not found", { status: 404 });
            }
            return NextResponse.json(todo, { status: 200 });
    } catch (error) {
        console.log("[GET TODO [ID]]"+error)
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const todo = await prisma.post.delete({
            where: { id: params.id },
        });

        return NextResponse.json(todo, { status: 200 }); 
    } catch (error) {
        console.log("[DELETE TODO [ID]] " + error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const body = await req.json(); 

        const todo = await prisma.post.update({
            where: { id: params.id },
            data: body, 
        });

        return NextResponse.json(todo, { status: 200 }); // Kembalikan todo yang telah diupdate
    } catch (error) {
        console.log("[PUT TODO [ID]] " + error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}