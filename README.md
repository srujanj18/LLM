# TinyLlama Frontend

React + Vite frontend for a local LLM backend (FastAPI expected).

## Features

- Prompt input with `Ctrl + Enter` submit shortcut
- Generation controls for `max_tokens` and `temperature`
- Backend health status indicator (`/health`)
- Response panel with estimated token usage
- Clear error display for backend/API failures

## Tech Stack

- React 19
- Vite 7
- ESLint 9

## Prerequisites

- Node.js 18+ (Node.js 20+ recommended)
- npm
- Running backend with:
  - `GET /health`
  - `POST /generate`

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Configure backend URL in `.env` (project root):

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

3. Start development server:

```bash
npm run dev
```

4. Open the URL shown by Vite (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev` - start local dev server
- `npm run build` - create production build in `dist/`
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint

## API Contract

### `GET /health`

Expected response shape:

```json
{
  "model": "tinyllama"
}
```

### `POST /generate`

Request body:

```json
{
  "prompt": "Write a short poem about rain.",
  "max_tokens": 256,
  "temperature": 0.7
}
```

Expected response shape:

```json
{
  "result": "...generated text...",
  "token_usage": 123
}
```

## UI Behavior

- Empty prompts are blocked with a validation message.
- `max_tokens` range: `10` to `1024`
- `temperature` range: `0.00` to `1.00`
- Controls are disabled while generation is in progress.

## Troubleshooting

- Backend offline in UI:
  - Verify backend is running and reachable at `VITE_API_BASE_URL`.
  - Confirm CORS is enabled for the frontend origin.
- Requests fail with HTTP errors:
  - Check backend logs and endpoint paths.
  - Ensure response uses JSON and includes `detail` for useful error messages.

## Project Structure

```text
src/
  api/client.js                # API calls and error handling
  components/
    BackendStatus.jsx          # Online/offline indicator
    PromptInput.jsx            # Prompt editor
    GenerationControls.jsx     # Token/temperature sliders and actions
    OutputPanel.jsx            # Result + token display
  App.jsx                      # Main app state and orchestration
```
