import { generate } from "../llm/provider.js";

export async function clarifyIdea(idea) {

  const prompt = `
You are a game designer.

The user gave this game idea:

"${idea}"

Ask 3-5 clarification questions before implementation.
Keep questions simple.
`;

  const questions = await generate(prompt);

  return questions;
}