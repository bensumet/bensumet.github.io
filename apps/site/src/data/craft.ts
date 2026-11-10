// Craft section content. Captions and alt text come from the portfolio design
// session's Craft doc, with Ben's corrections. All images are © Ben
// Viwatmanitsakul, all rights reserved; logos belong to their organizations.

export const art = (path: string) => `${import.meta.env.BASE_URL}art/${path}`;

export interface Plate { src: string; title: string; caption?: string; alt: string; wide?: boolean; spread?: boolean }
export interface Book { title: string; author: string; year: number; publisher: string; credit: string; note: string; plates: Plate[] }

export const tinfish: Book[] = [
  {
    title: 'from unincorporated territory [hacha]', author: 'Craig Santos Perez', year: 2008, publisher: 'Tinfish Press',
    credit: 'Book design; illustrations on pp. 28, 29, 30 and 85',
    note: 'The four maps and diagrams I drew for the book, set in bracketed serif type on hairline leaders.',
    plates: [
      { src: 'books/hacha-p28.jpg', title: 'Routes of the Spanish galleons', caption: 'Trade winds and currents between Manila, Guam and Acapulco.', alt: 'Book page with a diagram of Spanish galleon routes, arrows for winds and currents between Manila, Guam and Acapulco, labeled in bracketed serif type.' },
      { src: 'books/hacha-p29.jpg', title: 'War in the Pacific Ocean', caption: 'A dotted boundary and curved lines map the war.', alt: 'Map of the Pacific in World War II with a dotted boundary of Japanese control and curved offensive lines.' },
      { src: 'books/hacha-p30.jpg', title: 'Guam: Pacific hub to Asia', caption: 'Flight paths fan out to airport codes.', alt: 'Hairline flight paths radiating from Guam to bracketed airport codes across Asia and the Pacific.' },
      { src: 'books/hacha-p85.jpg', title: 'Guam: military bases', caption: 'Base areas in gray, each named on a hairline leader.', alt: 'Outline map of Guam with military base areas shaded gray and named with leader lines.' },
    ],
  },
  {
    title: 'แล้ว and then entwine', author: 'Jai Arun Ravine', year: 2011, publisher: 'Tinfish Press',
    credit: 'Cover art and book design',
    note: 'Rope is the book’s one image, photographed for the cover and then drawn across the pages until it carries the contents.',
    plates: [
      { src: 'books/entwine-cover.jpg', title: 'Cover', caption: 'Back, spine and front as one photograph of rope.', alt: 'Full cover wrap of coiled rope in green and gold, the title in yellow Thai and English type.', wide: true },
      { src: 'books/entwine-title.jpg', title: 'Title spread', caption: 'The rope ties itself into a knot beside the title, set in Thai and English.', alt: 'Title spread with a knotted rope photograph and the title in Thai and English.', spread: true },
      { src: 'books/entwine-contents.jpg', title: 'Contents', caption: 'Section titles and page numbers set vertically among loops of rope.', alt: 'Contents spread with Thai section titles and page numbers set vertically among loops of rope.', spread: true },
      { src: 'books/entwine-spread-24.jpg', title: 'Scattered lines', caption: 'Short blocks set loose across the spread, so the reader moves through it like a knot.', alt: 'Spread of short text blocks scattered across both pages.', spread: true },
      { src: 'books/entwine-spread-29.jpg', title: 'Figure: pelvis', caption: 'Thai words in circles, laid out as a diagram the poem calls a figure.', alt: 'Spread of Thai words in small circles arranged like a diagram, with a caption bar.', spread: true },
      { src: 'books/entwine-spread-36.jpg', title: 'Lesson plans', caption: 'Lessons set as rotated columns, each labeled Approach, Execution and Result.', alt: 'Spread of lesson plans set in rotated columns with small knot illustrations.', spread: true },
    ],
  },
  {
    title: 'Jammed Transmission', author: 'Paul Naylor', year: 2009, publisher: 'Tinfish Press',
    credit: 'Cover art and book design',
    note: 'An ensō carries the book: brushed on the cover, opened into hairline arcs on the first spreads, scattered as faint rings among the poems, and brushed again at the end.',
    plates: [
      { src: 'books/jammed-cover.jpg', title: 'Cover', caption: 'A brushed ensō over a burnt orange field.', alt: 'Burnt orange and red textured cover with a black brushed ensō circle and the title set vertically.', wide: true },
      { src: 'books/jammed-spread-02.jpg', title: 'Opening spread', caption: 'The ensō opened into hairline arcs that sweep across the gutter.', alt: 'Spread of large thin concentric arcs crossing both pages.', spread: true },
      { src: 'books/jammed-spread-04.jpg', title: 'Title and colophon', caption: 'The arcs carry on behind the press mark and colophon.', alt: 'Spread with the Tinfish press mark and colophon set among thin arcs.', spread: true },
      { src: 'books/jammed-spread-06.jpg', title: 'Preface', caption: 'Two columns of prose under a hairline arc that sweeps across the bottom of the spread.', alt: 'Preface spread set in two columns with a faint arc along the bottom edge.', spread: true },
      { src: 'books/jammed-spread-08.jpg', title: 'Epigraph', caption: 'A small broken circle under a Dōgen epigraph.', alt: 'Spread with a short epigraph, a broken circle and the first poems.', spread: true },
      { src: 'books/jammed-spread-36.jpg', title: 'Closing pages', caption: 'At the end, the arcs come back large, framing the notes on the contributors.', alt: 'Closing spread with large thin arcs on the left and contributor notes on the right.', spread: true },
    ],
  },
  {
    title: 'Thirteen Ways of Looking at TheBus', author: 'Gizelle Gajelonia', year: 2010, publisher: 'Tinfish Press',
    credit: 'Cover art and book design',
    note: 'Honolulu’s bus system as a design system: a route graphic wrapping the cover, a striped bar under the title, and “TheBus” set as a logotype throughout.',
    plates: [
      { src: 'books/thebus-cover.jpg', title: 'Cover', caption: 'Back, spine and front as one bus-route graphic in the bus’s own yellow and orange.', alt: 'Full cover wrap in lime yellow and orange with a curving route line and stops, and the title set in heavy type.', wide: true },
      { src: 'books/thebus-p2.jpg', title: 'Title page', caption: 'A heavy stacked title over a striped bar.', alt: 'Title spread with a heavy stacked title set over a striped bar.', spread: true },
      { src: 'books/thebus-spread-06.jpg', title: 'The title poem', caption: 'Thirteen short sections, with “TheBus” set as its own logotype wherever it appears.', alt: 'Spread of the title poem in numbered sections, with a vertical note in the margin.', spread: true },
      { src: 'books/thebus-spread-11.jpg', title: 'Dear God: a prayer in six parts', caption: 'Pidgin prose set in tight blocks, the heading using the same logotype trick.', alt: 'Spread of prose poems in Hawaiian Pidgin set in narrow blocks.', spread: true },
    ],
  },
];

export const a2 = {
  title: 'From Analysis to Action: the A2 approach',
  publisher: 'East-West Center and partners, USAID funded', year: 2009,
  credit: 'A2 logo, cover design, every chart re-created from the researchers’ data, and typesetting of all 600 pages',
  lead: 'To keep a long technical book navigable, every chapter has its own color. It floods the chapter opener, runs down the page edge as a stack of stripes with “Chapter” set vertically, and carries through every chart. Those stripes became a device in Edge, the design system this site is built with.',
  front: [
    { src: 'books/a2-p1.jpg', title: 'Cover', caption: 'Rising epidemic curves, one color per line.', alt: 'White cover with rising red, orange, blue and green curves and the title in light blue.' },
    { src: 'books/a2-tabs.jpg', title: 'Chapter tabs', caption: 'Each chapter’s color introduced as a tab, so the book can be navigated by color.', alt: 'Foreword spread with a column of colored tabs, one per chapter.', spread: true },
    { src: 'books/a2-contents.jpg', title: 'Contents', caption: 'The table of contents grouped by part, each under its chapter color.', alt: 'Contents spread with colored rules heading each group of chapters.', spread: true },
    { src: 'books/a2-back.jpg', title: 'Back cover', caption: 'The curves wrap around to the back, under the A2 logo.', alt: 'Back cover with the rising curves continuing and the A2 and partner logos.' },
  ] as Plate[],
  pages: [
    { src: 'books/a2-preface.jpg', title: 'Preface', caption: 'A full-bleed color flood, with the chapter stripes as a running head.', alt: 'Spread flooded in cyan with a short multicolored stripe and white text.', spread: true },
    { src: 'books/a2-p217.jpg', title: 'Chapter opener', caption: 'The chapter color floods the page; its stripes run down the fore-edge with “Chapter” set vertically.', alt: 'Chapter opener flooded in pink with a stack of pink and red stripes at the edge.', spread: true },
    { src: 'books/a2-chapter1.jpg', title: 'Chapter 1', caption: 'The opening spread: text, the stripe edge and a cycle diagram drawn in the chapter’s color.', alt: 'Spread with chapter text, yellow stripes along the edge and a circular diagram in yellow and brown.', spread: true },
  ] as Plate[],
  charts: [
    { src: 'books/a2-spread-014.jpg', title: 'Projections', caption: 'Line and stacked-area charts in the chapter’s orange range.', alt: 'Spread of line charts and stacked area charts in shades of orange.', spread: true },
    { src: 'books/a2-spread-062.jpg', title: 'Concentric circles', caption: 'Nested-circle diagrams in green.', alt: 'Spread of concentric circle diagrams in green.', spread: true },
    { src: 'books/a2-spread-083.jpg', title: 'Choropleth maps', caption: 'Regions shaded through the orange range.', alt: 'Spread of maps with regions shaded in orange tones.', spread: true },
    { src: 'books/a2-spread-153.jpg', title: 'Grouped bars', caption: 'Grouped bar charts in purple.', alt: 'Spread of grouped bar charts in purple.', spread: true },
    { src: 'books/a2-case-study.jpg', title: 'Case study', caption: 'A country case study with its planning flow drawn in teal.', alt: 'Case study spread with a teal flow chart and timeline.', spread: true },
    { src: 'books/a2-spread-277.jpg', title: 'Flow diagram', caption: 'A program flow in teal.', alt: 'Spread with a flow diagram in teal.', spread: true },
  ] as Plate[],
};

export const typeStudy: Plate[] = [
  { src: 'type/type-study-114.jpg', title: 'The rule, wide', caption: 'Columns hung from one rule.', alt: 'Type study plate: the customer information guide arranged as columns hung from one rule.' },
  { src: 'type/type-study-119.jpg', title: 'Diagonal', caption: 'The whole guide tilted on one line.', alt: 'Type study plate: the customer information guide arranged on a diagonal.' },
  { src: 'type/type-study-112.jpg', title: 'Title at the foot', caption: 'A large title anchors the bottom; the data hangs above.', alt: 'Type study plate: the customer information guide with a large title at the foot.' },
];

export const placeSpace: Plate[] = [
  { src: 'type/exhibit-4.jpg', title: 'You are here', caption: 'The hanging paper forms a path through the show, and lines up into words along the way.', alt: 'Exhibition view: hanging paper strips forming a path, lining up to read You are here.' },
  { src: 'type/exhibit-2.jpg', title: 'Place, space', caption: 'One word on each door, with its definition.', alt: 'Gallery doors with the words Place and Space and their definitions.' },
  { src: 'type/exhibit-6.jpg', title: 'Walking through', caption: 'Each stop on the path is one designer’s place, its name set on the floor.', alt: 'Visitors walking the path between hanging paper strips, with place names on the floor.' },
];

export const placeSpaceBooks: Plate[] = [
  { src: 'type/space-1.jpg', title: 'Space, opening page', caption: 'Promotion: how business and government both survive on Bishop Street. The word overprinted in two colors.', alt: 'Book page with the word PROMOTION overprinted in two colors.' },
  { src: 'type/place-1.jpg', title: 'Place, opening page', caption: 'Contention: business and government sharing one street. Two plates fighting for one space.', alt: 'Book page with the word CONTENTION printed in two overlapping plates.' },
  { src: 'type/space-7.jpg', title: 'Space, spread', caption: 'POST, repeated as a pale ground under the columns.', alt: 'Book spread with the word POST repeated in pale type under text columns.', spread: true },
  { src: 'type/place-4.jpg', title: 'Place, spread', caption: 'CAPITOL across the gutter, with a bold quotation.', alt: 'Book spread with CAPITOL across the gutter and a bold quotation.', spread: true },
  { src: 'type/space-3.jpg', title: 'Space, rules', caption: 'Thin rules branch to small labels. Edge’s branching rule comes from this page.', alt: 'Book spread with thin rules that branch to small labels.', spread: true },
];

export const logos: Plate[] = [
  { src: 'identity/kai-market-logo.svg', title: 'Kai Market, Sheraton Waikiki', caption: 'A light geometric lowercase in lime green, the dot of the i opened into a fan of mango-orange petals.', alt: 'Kai Market logo: lowercase lime green wordmark with an orange fan of petals over the i, and MARKET spaced beneath.', wide: true },
  { src: 'identity/logo-designing-with-light.png', title: 'Designing With Light', caption: 'The i becomes a light fixture inside a doorway, casting its beam.', alt: 'Designing With Light logo: a doorway with a light fixture casting a beam.' },
  { src: 'identity/logo-a2.png', title: 'Analysis and Advocacy (A2)', caption: 'A lowercase a squared, set between the two words it joins.', alt: 'A2 logo: a lowercase a with a superscript 2 between the words Analysis and Advocacy.' },
  { src: 'identity/logo-connect-pta.png', title: 'Connect PTA', caption: 'A faceted circle of connected points: a network of parents.', alt: 'Connect PTA logo: a faceted circle of connected points.' },
  { src: 'identity/logo-just-chicken.png', title: 'Just Chicken by Kal', caption: 'Script lettering over an engraved rooster, in a badge.', alt: 'Just Chicken logo: script lettering over an engraved rooster in a circular badge.' },
  { src: 'identity/logo-forge-ahead.png', title: 'Forge Ahead by Kal', caption: 'A sister badge: a dapper figure stepping out of the circle.', alt: 'Forge Ahead logo: a figure stepping out of a circular badge.' },
  { src: 'identity/logo-nakayoshi.png', title: 'Nakayoshi Japanese Class', caption: 'A friendly hand-drawn wordmark; the o becomes a smiling flower.', alt: 'Nakayoshi logo: hand-drawn wordmark with a smiling flower for the o.' },
];

export const wallArt: Plate[] = [
  { src: 'wall/wall-nine-two-illusion.jpg', title: 'Nine–Two Illusion', alt: 'Nine twisted rings in a three-by-three grid on a warm gradient.' },
  { src: 'wall/wall-planets.jpg', title: 'Planets', alt: 'Circles of different weights balanced on one line.' },
  { src: 'wall/wall-three-verticals-one-circle.jpg', title: 'Three Verticals, One Circle', alt: 'Three colored bars crossing one dark disc.' },
];

export const paintings: Plate[] = [
  { src: 'paintings/painting-0867-rose-in-a-glass-bottle.jpg', title: 'Rose in a glass bottle', alt: 'A pink rose in a clear glass bottle, with a diagonal band of light across a mauve wall.' },
  { src: 'paintings/painting-0860-red-wine.jpg', title: 'Red wine', alt: 'Red wine pouring into a wine glass against a deep red ground.' },
  { src: 'paintings/painting-0857-magnolia.jpg', title: 'Magnolia', alt: 'A single purple magnolia bud on a branch against a soft pink ground.' },
  { src: 'paintings/painting-0862-latte.jpg', title: 'Latte', alt: 'A latte with heart latte art in a blue cup and saucer on a dark blue surface.' },
  { src: 'paintings/painting-0855-orange-rose.jpg', title: 'Rose study', alt: 'A close-up orange rose on a pale pink mat.' },
];

export const recognition: [string, string][] = [
  ['Award', 'One of the outstanding design students of my class.'],
  ['Featured', 'Place / Space featured in the book Design School Confidential and on the website for James Craig’s Designing with Type.'],
  ['Books', 'Five books designed for Tinfish Press, 2008–2011, one used as course material at the University of Hawaiʻi; and a 600-page guide for the East-West Center.'],
  ['Identity', 'Logos for businesses and community groups, including Kai Market at the Sheraton Waikiki.'],
  ['Information', 'Data visualizations and an AIDS modeling guide for the East-West Center, adopted by 13 countries.'],
];
