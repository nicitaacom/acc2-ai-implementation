"use client"

import { useState } from "react"
import axios, { AxiosError } from "axios"
import { TAPIOpenAI, TAPIOpenAIResponse } from "@/api/openai/route"
import { twMerge } from "tailwind-merge"

export function ChatForm() {
  const [promt, setPromt] = useState("")
  const [response, setResponse] = useState<string | null>("")
  const [isLoading, setIsLoading] = useState(false)

  async function sendRequest(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response: TAPIOpenAIResponse = await axios.post("/api/openai", { promt } as TAPIOpenAI)
      setResponse(response.data.choices[0].message.content)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(20, "error - ", error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className="w-full flex flex-col gap-2 justify-center items-center " onSubmit={sendRequest}>
      <textarea
        className="w-1/2 min-h-[64px] h-[220px] max-h-[90vh] px-4 py-2 bg-foreground rounded outline-none"
        value={promt}
        onChange={e => setPromt(e.target.value)}
        placeholder="Enter promt"
      />
      <button
        className={twMerge(
          "w-1/2 x-4 py-2 rounded bg-success text-lg text-black",
          isLoading && "opacity-50 cursor-default pointer-events-none",
        )}
        type="submit">
        Submit
      </button>
      <p className="w-1/2 whitespace-pre-line pb-4">Response: {response}</p>
    </form>
  )
}
