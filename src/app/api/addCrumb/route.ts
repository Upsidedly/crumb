import { client } from "@/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { name, url } = await req.json() as { name: string, url: string }
    if (!name || !(typeof name === 'string')) return new NextResponse(undefined, { status: 422, statusText: 'No name' })
    if (!url || !(typeof url === 'string')) return new NextResponse(undefined, { status: 422, statusText: 'No URL' })
    await client.link.upsert({ update: { url }, create: { name, url }, where: { name }});
    return new NextResponse(undefined, {
        status: 200,
        statusText: 'Crumb added successfully'
    })
}