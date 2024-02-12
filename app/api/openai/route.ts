import openai from "@/libs/openai"
import { AxiosResponse } from "axios"
import { NextResponse } from "next/server"
import { ChatCompletion } from "openai/resources/index.mjs"

export type TAPIOpenAI = {
  promt: string
}

export type Response = ChatCompletion

export type TAPIOpenAIResponse = AxiosResponse<Response>

export async function POST(req: Request) {
  const { promt } = (await req.json()) as TAPIOpenAI

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "You are chatting with experienced Next.js 14 + TypeScript + Tailwind developer - you need to provide step by step answers with bullet poins where possible",
      },
      { role: "user", content: promt },
    ],
  })

  console.log(19, "response - ", response)
  return NextResponse.json(response)
}
