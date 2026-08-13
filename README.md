# JSON Parser

A free, open-source, front-only web app to format, validate, and explore JSON — directly in your browser.

**Live demo:** https://jonathanrsx.github.io/json-parser/

## Why this project?

Everything runs 100% locally in the browser: no backend, no database, no account, and no data is ever sent to a server. Paste your JSON, and it stays on your machine.

## Features

- Paste or type JSON with syntax highlighting (CodeMirror 6)
- Real-time validation with clear error messages (line/column when available)
- Format (pretty-print) and copy the result with one click
- Fold/unfold objects and arrays, with element counts (`Array[4]`, `Object{2}`)
- Search with match highlighting and next/previous navigation
- Document stats: root type, element count, size

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) — dev server and build tool
- [CodeMirror 6](https://codemirror.net/) — the code editor
- [jsonc-parser](https://github.com/microsoft/node-jsonc-parser) — JSON structure analysis
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [Vitest](https://vitest.dev/) — unit tests
- [ESLint](https://eslint.org/) — linting

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 20 or newer
- npm (comes with Node.js)

### Clone and install

```bash
git clone https://github.com/JonathanRsx/json-parser.git
cd json-parser
npm install
```

### Run locally

```bash
npm run dev
```

Open the URL printed in the terminal (usually http://localhost:5173).

### Other commands

```bash
npm run build     # type-check and build for production (output in dist/)
npm run preview   # preview the production build locally
npm test          # run the unit tests (Vitest)
npm run lint      # run ESLint
```

## Project structure

```text
src/
├── components/       # UI: Editor, SearchPanel, ValidationStatus, ui/ (Button, Input, Checkbox)
├── features/json/    # framework-agnostic JSON logic (parse, format, validate, analyze, search)
├── hooks/            # React hooks wiring the editor, search, and document state together
├── App.tsx
└── main.tsx
```

The `features/json` folder has no dependency on React, so the JSON logic can be tested and reused on its own (see the `*.test.ts` files next to each module).

## Contributing

This is an open-source project and contributions are welcome!

1. Fork the repository and create a branch for your change.
2. Make your changes, keeping the code simple and readable.
3. Make sure everything passes before opening a pull request:
   ```bash
   npm run lint
   npm test -- run
   npm run build
   ```
4. Open a pull request describing what you changed and why.

Feel free to open an issue first if you want to discuss a feature or bug before working on it.

## Deployment

The app is automatically built and deployed to GitHub Pages on every push to `main` (see `.github/workflows/deploy.yml`).
