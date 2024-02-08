"use client";

import { useSession } from "next-auth/react";
import { useState } from "react"

const cache: Record<string, string> = {}

export default function Create() {
    const data = useSession({ required: true })
    const [crumb, setCrumb] = useState<string>()
    const [error, setError] = useState<string>('')

    const [name, setName] = useState<string>('')
    const [url, setUrl] = useState<string>('')

    async function submit() {
      const cacheHit = cache[name + ', ' + url]
      if (cacheHit) {
        const invalid = `invalid request: ${cacheHit}`
        setError(invalid)
        return setTimeout(() => error === invalid && setError(''))
      }
      const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
      const errors = []
      if (!name) errors.push('name not defined')
      if (!url) errors.push('url not defined')
      if (!urlRegex.test(url)) errors.push('url not valid')

      if (errors.length > 0) {
        const joined = errors.join(', ')
        setError(joined)
        return setTimeout(() => error === joined && setError(''), 3000)
      }

      const res = await fetch('/api/addCrumb', { method: 'POST', body: JSON.stringify({ name, url }) })
      
      if (res.ok) {
        setCrumb(url)
      } else {
        const errorMessage = `invalid request: ${res.statusText}`
        cache[name + ', ' + url] = errorMessage
        setError(errorMessage)
      }
    }

    return <div className="grid place-items-center h-screen">
        <div className="w-[400px] bg-slate-900 flex items-center flex-col p-10 gap-3 h-[max-content]">
            {data.status !== 'authenticated' ? <p>You need to sign in!</p> : <><h1 className="text-3xl font-semibold">crumb</h1>
                <p className="text-slate-300 mb-5">Authenticated as <b>{data.data.user?.name!}</b></p>

                <div className="flex gap-3 w-full justify-between">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" className="bg-slate-700 p-1" onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="flex gap-3 w-full justify-between">
                    <label htmlFor="url">Url</label>
                    <input type="text" name="url" id="url" className="bg-slate-700 p-1" onChange={(e) => setUrl(e.target.value)} />
                </div>

                <button className="bg-slate-700 p-4 hover:bg-slate-800 active:bg-slate-600 w-full mt-10" onClick={submit}>Make crumb!</button>

                <p className="text-red-500">{error}</p>
                {crumb && <a className="text-green-300" href={crumb}>{crumb}</a>}</>}
        </div>
    </div>
}