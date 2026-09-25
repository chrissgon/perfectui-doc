/**
 * Optional features the build ships (landing-and-site-shell design, REQ-6). `search` is on since T-sr-3;
 * the assistant stays off until its experiment lands.
 */
export const features = {
  search: true,
  assistant: false,
} as const;
