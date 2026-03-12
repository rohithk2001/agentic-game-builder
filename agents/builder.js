import { generate } from "../llm/provider.js";
import fs from "fs";
import path from "path";

export async function buildGame(idea) {

  const prompt = `
Create a simple playable browser game.

Game idea:
${idea}

Return output EXACTLY in this format.
Do NOT wrap code in markdown blocks like \`\`\`html or \`\`\`js.

FILE:index.html
<html code>

FILE:style.css
<css code>

FILE:game.js
<javascript code>

PLAN:
<complete game design and explanation>
`;

  try {

    const response = await generate(prompt);

    const outputDir = path.join(process.cwd(), "output");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // Extract files
    const htmlMatch = response.match(/FILE:index\.html([\s\S]*?)FILE:style\.css/);
    const cssMatch = response.match(/FILE:style\.css([\s\S]*?)FILE:game\.js/);
    const jsMatch = response.match(/FILE:game\.js([\s\S]*?)PLAN:/);
    const planMatch = response.match(/PLAN:([\s\S]*)/);

    let html = htmlMatch ? htmlMatch[1].trim() : "";
    let css = cssMatch ? cssMatch[1].trim() : "";
    let js = jsMatch ? jsMatch[1].trim() : "";
    const plan = planMatch ? planMatch[1].trim() : "";

    // -------- CLEAN MARKDOWN CODE BLOCKS --------
    const cleanCode = (code) => {
      return code
        .replace(/```html/g, "")
        .replace(/```css/g, "")
        .replace(/```javascript/g, "")
        .replace(/```js/g, "")
        .replace(/```/g, "")
        .replace(/'''/g, "")
        .trim();
    };

    html = cleanCode(html);
    css = cleanCode(css);
    js = cleanCode(js);
    // --------------------------------------------

    // Write files
    fs.writeFileSync(path.join(outputDir, "index.html"), html);
    fs.writeFileSync(path.join(outputDir, "style.css"), css);
    fs.writeFileSync(path.join(outputDir, "game.js"), js);

    // Save full AI output
    fs.writeFileSync(
      path.join(outputDir, "gameplan.txt"),
      response
    );

    console.log("Files successfully generated (replaced if existed).");

  } catch (err) {

    console.error("Builder error:", err.message);

  }
}