# Agentic Game Builder

An **AI-powered game prototyping system** that automatically generates **playable browser games** from a simple idea using a multi-agent pipeline.

The system takes a user’s idea, asks clarification questions, designs the game mechanics, and then generates the **actual HTML, CSS, and JavaScript files** needed to run the game in a browser.

---

# Overview

Game development usually requires multiple steps:

* Understanding the game idea
* Designing gameplay mechanics
* Planning controls and architecture
* Writing code
* Testing the playable prototype

This project demonstrates how **AI agents can collaborate to automate this workflow**.

The system acts like a **small team of developers**:

| Agent           | Role                                            |
| --------------- | ----------------------------------------------- |
| Clarifier Agent | Asks follow-up questions to understand the idea |
| Planner Agent   | Designs the full game architecture              |
| Builder Agent   | Generates the playable game code                |

The result is a **fully playable browser game generated automatically from a prompt**.

---

# System Architecture

The pipeline is designed as a sequence of specialized agents.

```
User Idea
   ↓
Clarifier Agent
   ↓
Planner Agent
   ↓
Builder Agent
   ↓
Generated Game Files
```

Each agent performs a single task, making the system easier to extend and maintain.

---

# Agent Pipeline

## 1. Clarifier Agent

The Clarifier Agent analyzes the initial idea and asks **3-5 clarification questions** before generating the game.

Example input:

```
snake game
```

Example questions generated:

```
1. What platform should the game run on?
2. Should the game include power-ups or special mechanics?
3. What visual style do you prefer?
4. Should the game include scoring or progression?
```

This step ensures the system **fully understands the intended gameplay**.

---

## 2. Planner Agent

Once the user answers the questions, the Planner Agent generates a **complete game design document**.

The generated plan typically includes:

* Framework choice
* Core mechanics
* Player controls
* Game loop design
* File structure
* Implementation checklist

Example sections produced by the planner:

* Framework decision (Vanilla JS or Phaser)
* Snake movement mechanics
* Collision detection
* Food spawning logic
* Rendering strategy using HTML5 Canvas
* Modular project structure

This stage acts like a **game design document created automatically by AI**.

---

## 3. Builder Agent

The Builder Agent converts the design plan into **actual game files**.

It instructs the LLM to return code in a structured format:

```
FILE:index.html
<html code>

FILE:style.css
<css code>

FILE:game.js
<javascript code>

PLAN:
<game design summary>
```

The builder then parses the response and writes files into the `output/` directory.

Generated files:

```
output/
 ├ index.html
 ├ style.css
 ├ game.js
 └ gameplan.txt
```

These files form a **fully playable browser game**.

Opening `index.html` launches the game instantly.

---

# Technologies Used

## Node.js

The application is built with Node.js and runs as a command-line program.

Node handles:

* agent orchestration
* file generation
* API communication

---

## Groq LLM API

The system uses **Groq's OpenAI-compatible API** to generate text and code.

Example request:

```javascript
POST https://api.groq.com/openai/v1/chat/completions
```

Current model used in the project:

```
groq/compound-mini
```

Groq models are extremely fast and work well for code generation tasks.

---

## Important Note

The provider system is designed to be **LLM-agnostic**.

You are **not required to use Groq**.

You can easily replace the model with your preferred LLM.

Examples:

* OpenAI GPT-4 / GPT-4o
* Claude
* DeepSeek
* Mistral
* Llama
* Local LLMs via Ollama

Only the `provider.js` file needs modification.

---

# Project Structure

```
agentic-game-builder
│
├ agents
│  ├ clarifier.js
│  ├ planner.js
│  └ builder.js
│
├ llm
│  └ provider.js
│
├ output
│  ├ index.html
│  ├ style.css
│  ├ game.js
│  └ gameplan.txt
│
├ index.js
├ package.json
└ README.md
```

---

# File Explanations

## index.js

Main entry point of the application.

Responsibilities:

* Collect user input
* Run agents sequentially
* Display results in the terminal

Flow:

```
User Idea
 → Clarifier
 → Planner
 → Builder
```

---

## clarifier.js

Generates clarification questions using the LLM.

Example prompt:

```
Ask 3-5 clarification questions about the game idea.
```

The goal is to refine the user's idea before generating code.

---

## planner.js

Creates a **structured game design plan**.

The plan includes:

* gameplay mechanics
* controls
* rendering approach
* architecture decisions

---

## builder.js

Generates the actual game code.

Responsibilities:

* Request game files from the LLM
* Parse structured output
* Write files to disk

It extracts sections using regex:

```
FILE:index.html
FILE:style.css
FILE:game.js
PLAN:
```

---

## provider.js

Handles communication with the LLM.

Example configuration:

```javascript
model: "groq/compound-mini"
```

To use a different LLM, modify this file.

---

# Installation

Clone the repository:

```
git clone <repository>
cd agentic-game-builder
```

Install dependencies:

```
npm install
```
```
npm install axios
```

```
npm install dotenv
```
---

# Environment Setup

Create a `.env` file.

Go to Grok Ai models and generate your api key and paste it here

```
GROQ_API_KEY=your_api_key_here
```

---

# Running the Project

Start the program:

```
npm start
```

Example interaction:

```
Enter your game idea:
snake game
```

The system will:

1. Ask clarification questions
2. Generate a design plan
3. Generate the game code

---

# Running the Generated Game

After generation completes, open:

```
output/index.html
```

The game runs directly in the browser.

No build step is required.

---

# Example Generated Games

The system can generate simple browser games such as:

* Snake
* Flappy Bird
* Breakout
* Typing speed games
* Simple platformers
* Endless runners

Each run generates a new playable prototype.

---

# Docker Support

The project can also be run inside a container.

Build the container:

```
docker build -t game-agent .
```

Run the container:

```
docker run -it --env-file .env game-agent
```

This allows the system to run in a reproducible environment.

---

# Design Goals

This project was designed to demonstrate:

* Multi-agent AI systems
* Automated code generation
* Rapid game prototyping
* LLM-driven software pipelines

---

# Future Improvements

Potential extensions include:

* Web UI for the builder
* Multiplayer game generation
* Asset generation using image models
* Automatic game hosting
* Improved code validation

---

# Summary

Agentic Game Builder demonstrates how **AI agents can collaborate to transform a simple idea into a playable game prototype**.

Pipeline summary:

```
Idea → Clarification → Design → Code → Playable Game
```

This showcases the potential of **LLM-driven development workflows** for rapid prototyping and creative experimentation.

---


