/**
 * Optional features the build ships (landing-and-site-shell design, REQ-6). `search` turns on
 * with T-sr-3; the assistant stays off until its experiment lands.
 */
export const features = {
  search: false,
  assistant: false,
} as const;
