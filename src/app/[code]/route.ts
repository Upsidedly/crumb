import { client } from "@/client";
import { notFound, redirect } from "next/navigation";

export async function GET(req: Request, route: { params: { code: string } }) {
    const link = await client.link.findFirst({ where: { name: route.params.code }})
    if (!link) return notFound()
    return redirect(link.url)
}