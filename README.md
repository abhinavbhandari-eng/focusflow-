# 🌊 FocusFlow — ADHD Study Companion

FocusFlow is a beautiful, interactive web application designed to help students with ADHD study smarter. It implements proven ADHD-friendly study methodologies like active recall, chunking, spaced repetition, color cues, and focus timers (Pomodoro).

---

## 🚀 Key Features

*   **🧩 Bite-Sized Chunks**: Converts long reading materials into small, digestible paragraphs to prevent focus overload.
*   **🃏 Interactive Flashcards**: Employs active recall to lock in terms and definitions.
*   **❓ Quick Self-Quizzes**: Fill-in-the-blank practice to strengthen memory retrieval.
*   **📅 Spaced Repetition Tracker**: Automatically calculates and tracks optimal review cycles (1, 3, 7, and 14 days) saved directly to your browser's local storage.
*   **⏱️ Focus Timer (Pomodoro)**: Customizable focus and break session timers with interactive progress tracking.
*   **🌙 Dark / Light Mode**: Seamless transition between dark and light themes (which respects your system preference by default).
*   **🤖 Universal AI Integration**: Option to connect any LLM provider (Anthropic, OpenRouter, OpenAI, or local servers like Ollama/LM Studio) to produce extremely smart, context-aware summaries. Falls back silently to a high-quality offline rules-based converter if no key is supplied.
*   **📱 Installable PWA**: Can be installed on mobile devices or desktops as a standalone app when served over HTTPS or localhost.

---

## 🛠️ Installation & Setup

Since FocusFlow is a static single-page application (SPA), setting it up is incredibly easy:

### 1. Run Locally (Direct)
Simply double-click the [focusflow.html](focusflow.html) file to open it in any web browser.

### 2. Run Locally (Local Server)
To enable the Progressive Web App (PWA) installation features, the browser requires the app to be served over `http://localhost` or `https`. You can spin up a quick local server using Python, Node, or VS Code:
*   **Python**:
    ```bash
    python -m http.server 8000
    ```
*   **Node.js**:
    ```bash
    npx http-server
    ```
Once running, open `http://localhost:8000` (or the respective port) in your browser.

---

## 🤖 Configuring AI Settings

Open the **🤖 AI Settings** drawer at the top of the application to configure your preferred model provider:

### Option A: OpenRouter (Recommended for browsers)
OpenRouter supports browser CORS requests directly and hosts hundreds of models.
*   **API Endpoint URL**: `https://openrouter.ai/api/v1/chat/completions`
*   **Model Name**: `anthropic/claude-sonnet-5` (or any other OpenRouter model ID like `meta-llama/llama-3-8b-instruct:free`)
*   **API Key**: Paste your OpenRouter API key (`sk-or-...`)

### Option B: Local Models (Ollama / LM Studio)
Run your own local models for 100% private, offline parsing with no API costs:
*   **Ollama setup**:
    1. Run Ollama with CORS origins enabled:
       ```bash
       # Windows Command Prompt/PowerShell
       $env:OLLAMA_ORIGINS="*"
       ollama serve
       ```
    2. Set the **API Endpoint URL** in the app to: `http://localhost:11434/v1/chat/completions`
    3. Set the **Model Name** to your downloaded model (e.g. `llama3`).
    4. Leave the **API Key** blank.
*   **LM Studio setup**:
    1. Turn on the local server in LM Studio.
    2. Check the **Cross-Origin Resource Sharing (CORS)** box to enable it.
    3. Set the **API Endpoint URL** in the app to: `http://localhost:1234/v1/chat/completions` (or your LM Studio port).
    4. Leave the **API Key** blank.

---

## ☁️ Deploying to Vercel

FocusFlow can be instantly deployed to the cloud via Vercel:

1. Install the Vercel CLI locally (or run via npx):
   ```bash
   npx vercel
   ```
2. Log in to your Vercel account when prompted.
3. Link the project and deploy it.
4. Vercel will provide an `https://` production URL. You can then open this URL on your mobile browser, tap "Share" or "Menu", and click **Add to Home Screen** to install it as an app!

---

## 📁 File Structure

*   [focusflow.html](focusflow.html) — Core application code containing HTML structure, Vanilla CSS styling, and Javascript application logic.
*   [manifest.json](manifest.json) — PWA configuration specifying app colors, start URL, and icons.
*   [sw.js](sw.js) — A lightweight service worker enabling PWA installation.
*   [README.md](README.md) — Documentation and guide.
