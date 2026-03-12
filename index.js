import readline from "readline";
import { clarifyIdea } from "./agents/clarifier.js";
import { createPlan } from "./agents/planner.js";
import { buildGame } from "./agents/builder.js";
import { clear } from "console";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter your game idea: ", async (idea) => {

  const questions = await clarifyIdea(idea);

  console.log("\nClarification Questions:\n");
  console.log(questions);

  rl.question("\nEnter your answers:\n", async (answers) => {

    const plan = await createPlan(idea, answers);

    console.log("\nGame Plan:\n");
    console.log(plan);

    await buildGame(idea);

    rl.close();

  });

});