declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PRODUCTION_URL: string

      ORGANIZATION_ID: string
      OPENAI_KEY: string
    }
  }
}

export {}
