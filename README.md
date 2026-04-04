# Deron Public Web

Public marketing website for Deron, built with React + Tailwind (CRA).

## Scripts

- `npm start` — run locally in development.
- `npm run build` — create production build.
- `npm test -- --watchAll=false` — run tests once.

## Content & translation source of truth

All public-web copy and translations are maintained in `src/App.js` and component-local React modules.
There is no separate `window.T` translation runtime in `public/`.
