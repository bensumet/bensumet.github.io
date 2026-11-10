// The site's sections, in reading order. Home is the root and isn't listed.
export const sections = [
  { id: 'work', label: 'Work', blurb: 'Two products I designed and built: an insurance platform used by about 25 carriers, and a new AI platform.' },
  { id: 'system', label: 'Design system', blurb: 'Edge, the design system this site is built with, readable by people and by AI agents.' },
  { id: 'ai', label: 'Prototypes', blurb: 'Working mockups I designed with an AI assistant, and the measured decisions behind them.' },
  { id: 'craft', label: 'Craft', blurb: 'Type, books, logos and wall art from my print training.' },
  { id: 'about', label: 'About', blurb: 'Who I am, how I work, and how to reach me.' },
] as const;

export type SectionId = (typeof sections)[number]['id'];
