# English Buddy – Grade 7

A browser-only English learning app for Grade 7 students: **Introducing & Meeting New People**.

## GitHub Pages / No API

This version is deliberately **API-free**:

- No Gemini API key
- No Express server
- No `.env`
- Conversation practice uses a local rule-based tutor engine in the browser.
- Text-to-speech uses the browser's built-in Web Speech API.
- Vocabulary, grammar, learning materials, and quizzes remain local/static.
- Suitable for free access through GitHub Pages.

> Important: without an AI API, the chatbot is not a generative AI model. It is an AI-like/deterministic local tutor engine. This is intentional so student requests never need to be sent to a paid/exposed API.

## Run locally

Requirements: Node.js 20+

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Build

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`.

## Deploy to GitHub Pages

The repository includes `.github/workflows/deploy.yml`.

1. Create a GitHub repository and upload these files to the `main` branch.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, select **GitHub Actions**.
4. Push to `main` (or run the workflow manually).
5. GitHub will publish the `dist` build automatically.

The Vite configuration uses `base: './'`, so the app can work under a GitHub Pages project URL without hard-coding your repository name.

## Student privacy

The address practice is explicitly fictional. Students should not enter real home addresses, phone numbers, passwords, or identification information.
