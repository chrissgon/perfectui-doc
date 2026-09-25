// The generated site the tests read: `.output/public` after a local `bun run generate`, or the
// folder CI deploys (`SITE_DIR=dist`, built with the Netlify preset), so CI tests the files it ships.
export const SITE_DIR = process.env.SITE_DIR ?? ".output/public";
