import { generate } from "../llm/provider.js";

export async function createPlan(idea, answers) {

  const prompt = `
Create a structured plan for a browser game.

Game Idea:
${idea}

User Clarifications:
${answers}

Include:
- Framework choice (Vanilla JS or Phaser)
- Game mechanics
- Controls
- Game loop
- File structure
`;

  const plan = await generate(prompt);

  return plan;
}