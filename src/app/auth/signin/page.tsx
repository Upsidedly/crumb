"use client";

import { signIn } from "next-auth/react"

export default function SignIn() {
    async function onSubmit() {
        await signIn("credentials", { username: document.forms[0].username.value, password: document.forms[0].password.value})
        document.forms[0].username.value
    }

    // method="post" action="/api/auth/callback/credentials"

    return <div className="grid place-items-center h-screen">
        <div className="w-[max-content] bg-slate-900 flex items-center flex-col p-10 gap-3 h-[max-content]">
            <h1 className="mb-5 text-3xl font-semibold">crumb - sign in</h1>

            <form onSubmit={onSubmit} name="signIn" className="flex flex-col gap-3">
                <label className="flex gap-2">
                    Username
                    <input name="username" type="text" className="bg-slate-700 p-1" />
                </label>
                <label className="flex gap-2">
                    Password
                    <input name="password" type="password" className="bg-slate-700 p-1" />
                </label>
                <button type="submit" className="bg-slate-700 p-4 hover:bg-slate-800 active:bg-slate-600">Sign in</button>
            </form>
        </div>
    </div>
}