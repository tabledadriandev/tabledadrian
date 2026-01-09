import OpenAI from 'openai';

let openaiClient: OpenAI | null = null;

export function initializeMCP() {
  if (process.env.OPENAI_API_KEY) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
}

export function getOpenAIClient(): OpenAI | null {
  return openaiClient;
}

initializeMCP();
