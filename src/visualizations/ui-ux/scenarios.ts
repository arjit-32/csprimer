import type { UIUXScenario } from './types';

export const uiuxScenarios: Record<string, UIUXScenario> = {
  // 1. Laws of UX
  'ux-laws': {
    id: 'ux-laws',
    title: 'Laws of UX & Mental Models',
    category: 'laws',
    steps: [
      {
        id: 'jakobs-law',
        title: "Jakob's Law (Mental Models & Familiarity)",
        badge: 'Familiarity Principle',
        badgeType: 'info',
        description: 'Users spend most of their time on other sites. They expect your website to behave according to existing conventions. Placing critical navigation in unexpected locations forces users to re-learn basic interactions.',
        code: `<!-- Standard Header Convention: Logo left, Nav center/right, Action far right -->
<header class="flex items-center justify-between px-6 py-4 border-b">
  <div class="font-bold text-lg">AcmeCorp</div>
  <nav class="flex gap-6 text-sm text-gray-600">
    <a href="#" class="hover:text-black">Features</a>
    <a href="#" class="hover:text-black">Pricing</a>
    <a href="#" class="hover:text-black">Docs</a>
  </nav>
  <button class="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
    Get Started
  </button>
</header>`,
        codeLang: 'html',
        previewHtml: `
<div class="w-full max-w-lg mx-auto bg-white dark:bg-[#1e1e1e] rounded-xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
  <div class="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3 mb-4">
    <div class="flex items-center gap-2">
      <div class="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">A</div>
      <span class="font-bold text-sm text-gray-900 dark:text-gray-100">Acme App</span>
    </div>
    <div class="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-300">
      <span class="cursor-pointer hover:text-indigo-600">Docs</span>
      <span class="cursor-pointer hover:text-indigo-600">Pricing</span>
      <span class="px-2.5 py-1 bg-indigo-600 text-white rounded-md text-[11px] font-semibold">Sign In</span>
    </div>
  </div>
  <p class="text-xs text-gray-500 dark:text-gray-400 m-0">
    Convention breeds confidence: Users instantly recognize where to find home, search, and authentication without instruction manuals.
  </p>
</div>`,
      },
      {
        id: 'fittss-law',
        title: "Fitts's Law (Target Size & Distance)",
        badge: 'Interaction Speed',
        badgeType: 'success',
        description: "The time to acquire a target is a function of the target's distance and size. Make high-frequency actions large and close to the natural hand/thumb position, while keeping destructive actions separated.",
        code: `/* Fitts's Law in CSS: Accessible touch targets */
.primary-cta {
  min-height: 48px;       /* Easy to tap on mobile */
  padding: 12px 24px;
  font-size: 1rem;
  border-radius: 8px;
}
.destructive-action {
  margin-top: 16px;      /* Spatially separated to prevent accidental clicks */
  color: #ef4444;
}`,
        codeLang: 'css',
        previewHtml: `
<div class="w-full max-w-lg mx-auto grid grid-cols-2 gap-4">
  <div class="bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 rounded-xl p-4 flex flex-col justify-between">
    <div class="text-[11px] font-bold text-rose-700 dark:text-rose-400 mb-2 uppercase tracking-wider">Too Small (Hard to hit)</div>
    <div class="flex items-center gap-2 my-2">
      <button class="px-2 py-0.5 text-[10px] bg-rose-600 text-white rounded-sm">Save</button>
      <button class="px-2 py-0.5 text-[10px] bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-sm">Cancel</button>
    </div>
    <span class="text-[10px] text-rose-600 dark:text-rose-400">Target size: 18px height (prone to misclicks)</span>
  </div>
  <div class="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-xl p-4 flex flex-col justify-between">
    <div class="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 mb-2 uppercase tracking-wider">Fitts Optimized (48px)</div>
    <div class="flex items-center gap-2 my-2">
      <button class="px-4 py-2.5 text-xs font-semibold bg-emerald-600 text-white rounded-lg shadow-sm">Save Changes</button>
      <button class="px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-300">Cancel</button>
    </div>
    <span class="text-[10px] text-emerald-600 dark:text-emerald-400">Target size: 44px+ height (rapid acquisition)</span>
  </div>
</div>`,
      },
      {
        id: 'hicks-law',
        title: "Hick's Law (Decision Complexity)",
        badge: 'Cognitive Load',
        badgeType: 'warning',
        description: 'The time it takes to make a decision increases logarithmically with the number and complexity of choices. Reduce friction by grouping choices, providing recommended defaults, or using progressive disclosure.',
        code: `<!-- Progressive Disclosure: Show essential first, reveal advanced on demand -->
<div class="space-y-4">
  <button class="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold">
    One-Click Quick Export (Recommended)
  </button>
  
  <details class="text-xs text-gray-500">
    <summary class="cursor-pointer hover:underline">Advanced formatting options...</summary>
    <div class="mt-2 pl-4 border-l-2 space-y-2">
      <label><input type="checkbox" /> Include raw timestamps</label>
      <label><input type="checkbox" /> Compress JSON payload</label>
    </div>
  </details>
</div>`,
        codeLang: 'html',
        previewHtml: `
<div class="w-full max-w-lg mx-auto bg-white dark:bg-[#1e1e1e] rounded-xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
  <div class="text-xs font-bold text-gray-900 dark:text-gray-100 mb-2">Deploy Application</div>
  <div class="p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 rounded-lg flex items-center justify-between mb-3">
    <div>
      <div class="text-xs font-bold text-indigo-900 dark:text-indigo-200">Standard Production (Recommended)</div>
      <div class="text-[11px] text-indigo-700 dark:text-indigo-300">Auto-scaling, SSL, global CDN enabled</div>
    </div>
    <button class="px-3 py-1.5 bg-indigo-600 text-white rounded-md text-xs font-semibold">Deploy</button>
  </div>
  <div class="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1 cursor-pointer hover:text-indigo-600">
    <span>▸ Show 14 advanced cluster & VPC configurations</span>
  </div>
</div>`,
      },
      {
        id: 'millers-law',
        title: "Miller's Law (Chunking & Working Memory)",
        badge: 'Information Chunking',
        badgeType: 'info',
        description: 'The average person can hold only 7 (± 2) items in their active working memory. Chunk complex data into bite-sized, visually grouped modules (like credit card 4-digit groups or staged checkout forms).',
        code: `<!-- Formatting phone and card inputs with chunked visual spaces -->
<input 
  type="text" 
  inputmode="numeric" 
  placeholder="4242 •••• •••• 4242"
  class="font-mono tracking-widest text-base px-4 py-2 border rounded-lg"
/>`,
        codeLang: 'html',
        previewHtml: `
<div class="w-full max-w-lg mx-auto bg-white dark:bg-[#1e1e1e] rounded-xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
  <div class="text-xs font-bold text-gray-900 dark:text-gray-100 mb-3">Comparing Cognitive Load</div>
  <div class="space-y-3">
    <div class="p-2.5 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-900/50">
      <div class="text-[11px] font-bold text-rose-700 dark:text-rose-400">Unchunked (High Mental Effort)</div>
      <div class="font-mono text-xs text-rose-900 dark:text-rose-200 mt-1">4532987104398210</div>
    </div>
    <div class="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-900/50">
      <div class="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">Chunked (Instant Pattern Recognition)</div>
      <div class="font-mono text-xs text-emerald-900 dark:text-emerald-200 mt-1 font-bold">4532 &nbsp; 9871 &nbsp; 0439 &nbsp; 8210</div>
    </div>
  </div>
</div>`,
      },
      {
        id: 'doherty-threshold',
        title: "Doherty Threshold (Perceived Performance)",
        badge: 'Response Time < 400ms',
        badgeType: 'success',
        description: 'Productivity soars when computer and user interact at a pace under 400ms. If an API request takes longer, use optimistic UI updates and skeleton screens rather than blank freezing screens to keep perception instant.',
        code: `/* Tailwind Skeleton Pulse Animation */
.skeleton-card {
  @apply animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg;
}`,
        codeLang: 'css',
        previewHtml: `
<div class="w-full max-w-lg mx-auto bg-white dark:bg-[#1e1e1e] rounded-xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
  <div class="flex items-center justify-between mb-3">
    <span class="text-xs font-bold text-gray-900 dark:text-gray-100">Live Skeleton State</span>
    <span class="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono">Perceived < 200ms</span>
  </div>
  <div class="flex items-center gap-3">
    <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse shrink-0"></div>
    <div class="flex-1 space-y-2">
      <div class="h-3 bg-gray-200 dark:bg-gray-800 rounded w-3/4 animate-pulse"></div>
      <div class="h-2.5 bg-gray-100 dark:bg-gray-800/60 rounded w-1/2 animate-pulse"></div>
    </div>
  </div>
</div>`,
      },
      {
        id: 'postels-law',
        title: "Postel's Law (Robustness Principle)",
        badge: 'Forgiving Inputs',
        badgeType: 'info',
        description: '"Be conservative in what you do, be liberal in what you accept from others." Forgive diverse user inputs (e.g., spaces or dashes in credit cards or phone numbers) and clean them programmatically on the backend.',
        code: `// Accept input gracefully regardless of user format:
function sanitizePhone(input: string): string {
  // Strip parentheses, spaces, dots, dashes
  return input.replace(/\\D/g, '');
}`,
        codeLang: 'typescript',
        previewHtml: `
<div class="w-full max-w-lg mx-auto bg-white dark:bg-[#1e1e1e] rounded-xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
  <div class="text-xs font-bold text-gray-900 dark:text-gray-100 mb-2">Input Sanitization in Action</div>
  <div class="grid grid-cols-2 gap-3 text-xs">
    <div class="p-2.5 bg-gray-50 dark:bg-gray-800/40 rounded-lg border border-gray-200 dark:border-gray-700">
      <div class="text-[10px] text-gray-500 font-semibold mb-1">User Types (Any Style):</div>
      <div class="font-mono text-gray-800 dark:text-gray-200 text-[11px]">(555) 123-4567</div>
    </div>
    <div class="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800">
      <div class="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mb-1">Clean System Storage:</div>
      <div class="font-mono text-emerald-700 dark:text-emerald-300 text-[11px] font-bold">+15551234567</div>
    </div>
  </div>
</div>`,
      },
    ],
  },

  // 2. Visual Hierarchy
  'visual-hierarchy': {
    id: 'visual-hierarchy',
    title: 'Visual Hierarchy & Information Flow',
    category: 'hierarchy',
    steps: [
      {
        id: 'anti-pattern',
        title: 'Anti-Pattern: Flat & Cluttered (No Hierarchy)',
        badge: 'Anti-Pattern',
        badgeType: 'error',
        description: 'When every element has equal weight, identical font size, and uniform contrast, the user cannot scan the interface. The eyes bounce erratically without discovering the core action.',
        code: `<!-- Problem: No weight distinction, no contrast, unclear CTA -->
<div class="card">
  <div class="title">Product Pro Plan</div>
  <div class="desc">Includes 50 seats, premium database backups, and custom domains for teams.</div>
  <div class="price">$49 per month</div>
  <button>Purchase</button>
  <button>Learn More</button>
</div>`,
        codeLang: 'html',
        previewHtml: `
<div class="w-full max-w-sm mx-auto bg-white dark:bg-[#181818] border border-gray-300 dark:border-gray-700 rounded-lg p-4 space-y-2">
  <div class="text-sm font-normal text-gray-900 dark:text-gray-100">Product Pro Plan</div>
  <div class="text-sm font-normal text-gray-900 dark:text-gray-100">Includes 50 seats, premium database backups, and custom domains for teams.</div>
  <div class="text-sm font-normal text-gray-900 dark:text-gray-100">$49 per month</div>
  <div class="flex gap-2 pt-2">
    <button class="px-3 py-1.5 bg-gray-200 text-gray-900 rounded text-xs">Purchase</button>
    <button class="px-3 py-1.5 bg-gray-200 text-gray-900 rounded text-xs">Learn More</button>
  </div>
</div>`,
      },
      {
        id: 'best-practice',
        title: 'Best Practice: Clear Visual Hierarchy',
        badge: 'Production Grade',
        badgeType: 'success',
        description: 'Clear hierarchy uses distinct font sizes, font weights, muted secondary text, intentional whitespace, and a high-contrast primary call-to-action button.',
        code: `<!-- Solution: Size scale, color de-emphasis, prominent CTA -->
<div class="rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
  <div class="flex justify-between items-baseline">
    <h3 class="text-xl font-bold text-gray-900">Pro Plan</h3>
    <span class="text-2xl font-extrabold text-indigo-600">$49<span class="text-xs font-normal text-gray-500">/mo</span></span>
  </div>
  <p class="text-sm text-gray-600 leading-relaxed">
    Includes 50 seats, automated daily backups, and custom domains.
  </p>
  <button class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-sm shadow-sm transition-all">
    Upgrade to Pro
  </button>
</div>`,
        codeLang: 'html',
        previewHtml: `
<div class="w-full max-w-sm mx-auto bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm space-y-3">
  <div class="flex justify-between items-baseline">
    <h3 class="text-base font-bold text-gray-900 dark:text-gray-100 m-0">Pro Plan</h3>
    <span class="text-xl font-black text-indigo-600 dark:text-indigo-400">$49<span class="text-xs font-normal text-gray-400 dark:text-gray-500">/mo</span></span>
  </div>
  <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed m-0">
    Includes 50 team seats, automated database backups, and custom domains.
  </p>
  <div class="pt-2">
    <button class="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all cursor-pointer">
      Upgrade to Pro
    </button>
  </div>
</div>`,
      },
    ],
  },

  // 3. Spacing Grid
  'spacing-grid': {
    id: 'spacing-grid',
    title: 'The 8pt Spatial Grid System',
    category: 'spacing',
    steps: [
      {
        id: 'arbitrary-spacing',
        title: 'Arbitrary Spacing (Chaotic Rhythm)',
        badge: 'Anti-Pattern',
        badgeType: 'error',
        description: 'Using random values like 7px, 13px, 21px, and 29px creates subtle visual friction. The eye detects asymmetry and lack of alignment even if the developer cannot immediately pinpoint why.',
        code: `/* Chaotic spacing */
.card { margin: 13px; padding: 21px; }
.title { margin-bottom: 7px; }
.button { margin-top: 19px; }`,
        codeLang: 'css',
        previewHtml: `
<div class="w-full max-w-sm mx-auto bg-rose-50/50 dark:bg-rose-950/20 border border-rose-300 dark:border-rose-900/40 rounded-xl p-[21px]">
  <div class="text-xs font-bold text-rose-900 dark:text-rose-200 mb-[7px]">Arbitrary Spacing</div>
  <div class="text-[11px] text-rose-700 dark:text-rose-400 mb-[13px] leading-tight">Every element uses arbitrary pixel offsets (7px, 13px, 21px).</div>
  <button class="px-[15px] py-[7px] bg-rose-600 text-white text-[11px] rounded-sm">Save</button>
</div>`,
      },
      {
        id: 'eight-pt-system',
        title: 'Harmonious 8pt Spatial Grid',
        badge: 'Standard Best Practice',
        badgeType: 'success',
        description: 'Using multiples of 8 (8px, 16px, 24px, 32px, 48px) with a 4px half-step for micro-elements brings automatic mathematical harmony. Every component aligns effortlessly across screen resolutions.',
        code: `/* 8pt Grid System (Tailwind Scale) */
.card   { @apply p-6 space-y-4; }   /* 24px padding, 16px gap */
.title  { @apply text-base font-bold mb-2; } /* 8px margin */
.button { @apply px-4 py-2 text-sm; }        /* 16px horizontal, 8px vertical */`,
        codeLang: 'css',
        previewHtml: `
<div class="w-full max-w-sm mx-auto bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-900/40 rounded-xl p-6 relative">
  <div class="text-xs font-bold text-emerald-900 dark:text-emerald-200 mb-2">8pt Spatial System</div>
  <div class="text-[11px] text-emerald-700 dark:text-emerald-400 mb-4 leading-relaxed">
    Padding is 24px (p-6), margins are 8px (mb-2) and 16px (mb-4). Natural visual cadence.
  </div>
  <button class="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg shadow-sm">
    Save Changes
  </button>
</div>`,
      },
    ],
  },

  // 4. Type Scale
  'type-scale': {
    id: 'type-scale',
    title: 'Modular Type Scale & Typography',
    category: 'typography',
    steps: [
      {
        id: 'modular-scale',
        title: 'Modular Type Scale (Major Third 1.25x)',
        badge: 'Scale Architecture',
        badgeType: 'info',
        description: 'A modular type scale multiplies a base size (e.g. 16px) by a harmonious ratio (such as 1.25). This ensures headings and body text maintain consistent visual proportions.',
        code: `/* Tailwind Font Size Scale */
text-xs:   12px (0.75rem)  - Metadata & Badges
text-sm:   14px (0.875rem) - Secondary Copy
text-base: 16px (1.0rem)   - Body Default
text-lg:   18px (1.125rem) - Subheaders
text-xl:   20px (1.25rem)  - Card Titles
text-2xl:  24px (1.5rem)   - Section Headers
text-3xl:  30px (1.875rem) - Page Headers
text-4xl:  36px (2.25rem)  - Hero Headlines`,
        codeLang: 'css',
        previewHtml: `
<div class="w-full max-w-lg mx-auto bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-800 rounded-xl p-4 space-y-2">
  <div class="flex items-baseline justify-between border-b border-gray-100 dark:border-gray-800 pb-1">
    <span class="text-2xl font-black text-gray-900 dark:text-white">24px Headline</span>
    <span class="text-[10px] font-mono text-gray-400">text-2xl / font-black</span>
  </div>
  <div class="flex items-baseline justify-between border-b border-gray-100 dark:border-gray-800 pb-1">
    <span class="text-lg font-bold text-gray-900 dark:text-white">18px Subheading</span>
    <span class="text-[10px] font-mono text-gray-400">text-lg / font-bold</span>
  </div>
  <div class="flex items-baseline justify-between border-b border-gray-100 dark:border-gray-800 pb-1">
    <span class="text-sm font-normal text-gray-800 dark:text-gray-200">14px Body Paragraph text</span>
    <span class="text-[10px] font-mono text-gray-400">text-sm / font-normal</span>
  </div>
  <div class="flex items-baseline justify-between">
    <span class="text-xs text-gray-500 dark:text-gray-400">12px Caption and metadata badge</span>
    <span class="text-[10px] font-mono text-gray-400">text-xs / text-gray-500</span>
  </div>
</div>`,
      },
      {
        id: 'tabular-nums',
        title: 'Tabular Numbers (Alignment in Data Tables)',
        badge: 'Developer Secret',
        badgeType: 'success',
        description: 'Proportional numbers cause jagged columns because digit "1" is narrower than digit "8". Applying `font-variant-numeric: tabular-nums` gives every numeral identical width for clean vertical alignment.',
        code: `/* Prevents layout shifts in countdowns and data tables */
.numeric-data {
  font-variant-numeric: tabular-nums;
  /* Tailwind utility: */
  @apply tabular-nums;
}`,
        codeLang: 'css',
        previewHtml: `
<div class="w-full max-w-lg mx-auto grid grid-cols-2 gap-4">
  <div class="p-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 rounded-xl">
    <div class="text-[10px] font-bold text-rose-700 dark:text-rose-400 uppercase mb-2">Proportional (Jittery)</div>
    <div class="space-y-1 text-xs text-rose-900 dark:text-rose-200">
      <div class="flex justify-between font-sans"><span>Latency:</span><span>11.1 ms</span></div>
      <div class="flex justify-between font-sans"><span>Latency:</span><span>88.8 ms</span></div>
      <div class="flex justify-between font-sans"><span>Latency:</span><span>18.1 ms</span></div>
    </div>
  </div>
  <div class="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-xl">
    <div class="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase mb-2">Tabular Nums (Aligned)</div>
    <div class="space-y-1 text-xs text-emerald-900 dark:text-emerald-200">
      <div class="flex justify-between tabular-nums font-mono"><span>Latency:</span><span>11.1 ms</span></div>
      <div class="flex justify-between tabular-nums font-mono"><span>Latency:</span><span>88.8 ms</span></div>
      <div class="flex justify-between tabular-nums font-mono"><span>Latency:</span><span>18.1 ms</span></div>
    </div>
  </div>
</div>`,
      },
    ],
  },

  // 5. Color Palette 60-30-10
  'color-palette-60-30-10': {
    id: 'color-palette-60-30-10',
    title: 'The 60-30-10 Color Balance Rule',
    category: 'color',
    steps: [
      {
        id: 'rule-breakdown',
        title: '60% Base / 30% Surface / 10% Accent',
        badge: 'Color Harmony',
        badgeType: 'info',
        description: 'An interior design classic adapted to UI: 60% dominant neutral background, 30% secondary structure (cards, navigation, borders), and 10% high-intent accent for primary CTA buttons and active indicators.',
        code: `/* 60-30-10 Architecture */
:root {
  --bg-dominant: #f8fafc;   /* 60% - Light neutral background */
  --surface-struct: #ffffff; /* 30% - Cards, headers, sidebars */
  --accent-intent: #6366f1;  /* 10% - High-contrast CTA action */
}`,
        codeLang: 'css',
        previewHtml: `
<div class="w-full max-w-lg mx-auto bg-slate-100 dark:bg-[#121212] p-4 rounded-xl border border-gray-200 dark:border-gray-800">
  <div class="w-full h-3 rounded-full flex overflow-hidden mb-4 border border-gray-300 dark:border-gray-700">
    <div class="w-[60%] bg-slate-300 dark:bg-gray-800 text-[9px] flex items-center justify-center font-mono font-bold text-gray-700 dark:text-gray-300">60% Base</div>
    <div class="w-[30%] bg-white dark:bg-[#1f1f1f] text-[9px] flex items-center justify-center font-mono font-bold text-gray-700 dark:text-gray-300">30% Surface</div>
    <div class="w-[10%] bg-indigo-600 text-[9px] flex items-center justify-center font-mono font-bold text-white">10%</div>
  </div>
  <div class="bg-white dark:bg-[#1e1e1e] p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
    <div>
      <div class="text-xs font-bold text-gray-900 dark:text-gray-100">Enterprise Workspace</div>
      <div class="text-[11px] text-gray-500">Surface card (30%) sitting on neutral base (60%)</div>
    </div>
    <button class="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold shadow-xs">
      Connect (10%)
    </button>
  </div>
</div>`,
      },
      {
        id: 'dark-mode-elevation',
        title: 'Dark Mode Elevation Principles',
        badge: 'Dark Theme Rule',
        badgeType: 'warning',
        description: 'Never use pure black (#000000) for UI backgrounds. In dark mode, depth is expressed by lightness: higher elevation surfaces (modals, dropdowns) are slightly lighter shades of gray, not darker.',
        code: `/* Dark Mode Surface Elevation */
--surface-bg:    #121212; /* Base canvas */
--surface-card:  #1e1e1e; /* Level 1 card */
--surface-modal: #282828; /* Level 2 overlay */`,
        codeLang: 'css',
        previewHtml: `
<div class="w-full max-w-lg mx-auto bg-[#121212] p-4 rounded-xl border border-neutral-800 space-y-3">
  <div class="text-[11px] font-mono text-neutral-400">Base Canvas (#121212)</div>
  <div class="bg-[#1e1e1e] p-3 rounded-lg border border-neutral-700/60 shadow-sm flex items-center justify-between">
    <span class="text-xs text-neutral-200 font-medium">Level 1 Card (#1e1e1e)</span>
    <div class="bg-[#2a2a2a] px-3 py-1.5 rounded border border-neutral-600 text-[11px] text-white font-semibold">
      Level 2 Modal / Dropdown (#2a2a2a)
    </div>
  </div>
</div>`,
      },
    ],
  },

  // 6. Contrast Checker
  'contrast-checker': {
    id: 'contrast-checker',
    title: 'WCAG Accessibility & Color Contrast',
    category: 'color',
    steps: [
      {
        id: 'wcag-fail',
        title: 'Failing Contrast Ratio (< 3:1)',
        badge: 'WCAG Fail',
        badgeType: 'error',
        description: 'Light gray text on white backgrounds or pastel buttons with white text fail WCAG standards. Users with low vision, color blindness, or using phones under bright sunlight cannot read this content.',
        code: `/* FAIL: 1.8:1 Contrast Ratio (WCAG Violation) */
.low-contrast-text {
  color: #94a3b8; /* Light slate text */
  background-color: #ffffff;
}`,
        codeLang: 'css',
        previewHtml: `
<div class="w-full max-w-sm mx-auto bg-white rounded-xl border border-gray-200 p-5 shadow-sm text-center">
  <div class="text-xs font-bold text-rose-600 mb-2">Contrast Ratio: 1.8:1 (FAILED)</div>
  <p class="text-slate-300 text-sm font-medium my-2">
    Can you comfortably read this text in direct sunlight?
  </p>
  <button class="px-4 py-2 bg-indigo-200 text-white rounded-lg text-xs font-semibold cursor-not-allowed">
    Unreadable Button
  </button>
</div>`,
      },
      {
        id: 'wcag-aa',
        title: 'WCAG AA Compliant (4.5:1 Body / 3:1 Large)',
        badge: 'WCAG AA Pass',
        badgeType: 'success',
        description: 'WCAG AA requires a minimum contrast ratio of 4.5:1 for standard body text (below 18pt/24px) and 3:1 for large text or critical UI interactive borders.',
        code: `/* PASS: 4.8:1 Contrast Ratio (WCAG AA Compliant) */
.accessible-body-text {
  color: #475569; /* Slate 600 */
  background-color: #ffffff;
}`,
        codeLang: 'css',
        previewHtml: `
<div class="w-full max-w-sm mx-auto bg-white dark:bg-[#1e1e1e] rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm text-center">
  <div class="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-2">Contrast Ratio: 5.2:1 (WCAG AA PASS)</div>
  <p class="text-slate-600 dark:text-slate-300 text-sm font-medium my-2">
    Crisp, legible copy meeting legal accessibility benchmarks.
  </p>
  <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold shadow-xs">
    Accessible Action
  </button>
</div>`,
      },
      {
        id: 'wcag-aaa',
        title: 'WCAG AAA Gold Standard (7.0:1+)',
        badge: 'WCAG AAA Gold',
        badgeType: 'success',
        description: 'For maximum accessibility in government, healthcare, or high-compliance applications, WCAG AAA requires a 7.0:1 contrast ratio for body text.',
        code: `/* PASS: 8.5:1 Contrast Ratio (WCAG AAA Gold Standard) */
.high-contrast-text {
  color: #0f172a; /* Slate 900 on white */
  background-color: #ffffff;
}`,
        codeLang: 'css',
        previewHtml: `
<div class="w-full max-w-sm mx-auto bg-white dark:bg-[#121212] rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm text-center">
  <div class="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-2">Contrast Ratio: 11.2:1 (WCAG AAA PASS)</div>
  <p class="text-slate-950 dark:text-slate-100 text-sm font-bold my-2">
    Ultra-high clarity for all users in any environmental condition.
  </p>
  <button class="px-4 py-2 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-lg text-xs font-black shadow-xs">
    Maximum Legibility
  </button>
</div>`,
      },
    ],
  },

  // 7. Component States
  'component-states': {
    id: 'component-states',
    title: 'Interactive Component State Machine',
    category: 'components',
    steps: [
      {
        id: 'state-default',
        title: 'Default (Rest) State',
        badge: 'State: Default',
        badgeType: 'neutral',
        description: 'The idle, baseline visual representation of the component before user interaction begins.',
        code: `<button class="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium text-sm shadow-sm">
  Confirm Order
</button>`,
        codeLang: 'html',
        previewHtml: `
<div class="flex items-center justify-center p-6 bg-gray-50 dark:bg-[#1c1c1c] rounded-xl border border-gray-200 dark:border-gray-800">
  <button class="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold shadow-sm">
    Confirm Order
  </button>
</div>`,
      },
      {
        id: 'state-hover',
        title: 'Hover State',
        badge: 'State: Hover (:hover)',
        badgeType: 'info',
        description: 'Provides immediate visual feedback when a pointer hovers over the interactive area. Typically brightens/darkens background by 5-10% or increases elevation.',
        code: `<button class="px-4 py-2 bg-indigo-700 text-white rounded-lg font-medium text-sm shadow-md">
  Confirm Order
</button>`,
        codeLang: 'html',
        previewHtml: `
<div class="flex items-center justify-center p-6 bg-gray-50 dark:bg-[#1c1c1c] rounded-xl border border-gray-200 dark:border-gray-800">
  <button class="px-5 py-2.5 bg-indigo-700 text-white rounded-lg text-sm font-semibold shadow-md ring-2 ring-indigo-400/30">
    Confirm Order
  </button>
</div>`,
      },
      {
        id: 'state-focus-visible',
        title: 'Focus-Visible State (Keyboard Navigation)',
        badge: 'State: :focus-visible',
        badgeType: 'success',
        description: 'Crucial for keyboard accessibility! When users navigate with the Tab key, a high-contrast 2px focus ring with 2px offset must clearly identify active focus.',
        code: `/* Never write "outline: none" without an accessible replacement! */
button:focus-visible {
  outline: 2px solid #6366f1;
  outline-offset: 2px;
}`,
        codeLang: 'css',
        previewHtml: `
<div class="flex items-center justify-center p-6 bg-gray-50 dark:bg-[#1c1c1c] rounded-xl border border-gray-200 dark:border-gray-800">
  <button class="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold outline-2 outline-indigo-500 outline-offset-2 ring-2 ring-indigo-300">
    Confirm Order
  </button>
</div>`,
      },
      {
        id: 'state-loading',
        title: 'Loading State (Asynchronous Action)',
        badge: 'State: Loading / Pending',
        badgeType: 'warning',
        description: 'Prevents double submissions by disabling interactions, maintaining button dimensions, and replacing the label with a clean spinner or progress cue.',
        code: `<button disabled class="px-4 py-2 bg-indigo-500 text-white rounded-lg font-medium text-sm opacity-90 cursor-wait flex items-center gap-2">
  <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">...</svg>
  <span>Processing...</span>
</button>`,
        codeLang: 'html',
        previewHtml: `
<div class="flex items-center justify-center p-6 bg-gray-50 dark:bg-[#1c1c1c] rounded-xl border border-gray-200 dark:border-gray-800">
  <button disabled class="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold opacity-90 cursor-wait flex items-center gap-2">
    <svg class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
    </svg>
    <span>Processing...</span>
  </button>
</div>`,
      },
      {
        id: 'state-disabled',
        title: 'Disabled State',
        badge: 'State: Disabled',
        badgeType: 'neutral',
        description: 'Indicates the action cannot be performed until prerequisites are satisfied. Set `aria-disabled="true"` so screen readers convey state.',
        code: `<button disabled aria-disabled="true" class="px-4 py-2 bg-gray-200 text-gray-400 rounded-lg font-medium text-sm cursor-not-allowed">
  Confirm Order
</button>`,
        codeLang: 'html',
        previewHtml: `
<div class="flex items-center justify-center p-6 bg-gray-50 dark:bg-[#1c1c1c] rounded-xl border border-gray-200 dark:border-gray-800">
  <button disabled class="px-5 py-2.5 bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 rounded-lg text-sm font-semibold cursor-not-allowed">
    Confirm Order
  </button>
</div>`,
      },
    ],
  },

  // 8. Form UX
  'form-ux': {
    id: 'form-ux',
    title: 'Form UX & Validation Patterns',
    category: 'forms',
    steps: [
      {
        id: 'aggressive-errors',
        title: 'Anti-Pattern: Aggressive Instant Errors',
        badge: 'Anti-Pattern',
        badgeType: 'error',
        description: 'Validating and screaming red error messages while the user is still actively typing creates user frustration. Missing labels and placeholder-only inputs destroy accessibility.',
        code: `<!-- Bad: Using placeholder as label, instant angry red border -->
<input 
  type="email" 
  placeholder="Email address" 
  class="border-red-500 text-red-500" 
/>
<span class="text-red-500 text-xs">Invalid format!</span>`,
        codeLang: 'html',
        previewHtml: `
<div class="w-full max-w-sm mx-auto bg-white dark:bg-[#1e1e1e] p-4 rounded-xl border border-gray-200 dark:border-gray-800 space-y-2">
  <input 
    type="text" 
    value="arjit@" 
    class="w-full px-3 py-2 border-2 border-rose-500 text-rose-600 rounded-lg text-xs outline-hidden bg-rose-50/20"
  />
  <div class="text-[11px] text-rose-600 font-medium">Invalid email address! (User hasn't finished typing)</div>
</div>`,
      },
      {
        id: 'forgiving-validation',
        title: 'Best Practice: Forgiving Inline Validation',
        badge: 'Best Practice',
        badgeType: 'success',
        description: '"Reward early, punish late." Validate on blur (when focus leaves the field) or on submit, provide explicit persistent labels, and show helpful resolution guidance.',
        code: `<!-- Best Practice: Explicit label, helper text, validate on blur -->
<label for="work-email" class="block text-sm font-semibold text-gray-700">
  Work Email
</label>
<div class="relative mt-1">
  <input 
    id="work-email" 
    type="email" 
    autocomplete="email"
    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
  />
</div>
<span class="text-xs text-gray-500 mt-1 block">We'll send your invite token here.</span>`,
        codeLang: 'html',
        previewHtml: `
<div class="w-full max-w-sm mx-auto bg-white dark:bg-[#1e1e1e] p-4 rounded-xl border border-gray-200 dark:border-gray-800 space-y-1.5">
  <label class="block text-xs font-bold text-gray-800 dark:text-gray-200">Work Email</label>
  <div class="relative">
    <input 
      type="text" 
      value="arjit@company.com" 
      class="w-full px-3 py-2 border border-emerald-500 dark:border-emerald-600 rounded-lg text-xs outline-hidden pr-8 bg-emerald-50/10 dark:bg-emerald-950/10 text-gray-900 dark:text-gray-100 font-medium"
    />
    <span class="absolute right-2.5 top-2.5 text-emerald-600 text-xs font-bold">✓</span>
  </div>
  <div class="text-[10px] text-gray-500 dark:text-gray-400">Validated successfully. Ready to proceed.</div>
</div>`,
      },
    ],
  },

  // 9. Touch Targets
  'touch-targets': {
    id: 'touch-targets',
    title: 'Touch Targets & Thumb Zones (Fitts)',
    category: 'components',
    steps: [
      {
        id: 'small-target',
        title: 'Inaccessible Touch Target (24px)',
        badge: 'Touch Failure',
        badgeType: 'error',
        description: 'A 24px icon or text link on mobile screens causes frequent missed taps and frustration, particularly for users with tremor or on bumpy commutes.',
        code: `<button class="p-1 text-xs">Edit</button>`,
        codeLang: 'html',
        previewHtml: `
<div class="flex items-center justify-center p-6 bg-rose-50/40 dark:bg-rose-950/20 rounded-xl border border-rose-200 dark:border-rose-900/40">
  <div class="border border-dashed border-rose-500 p-0.5 rounded text-center">
    <button class="px-2 py-0.5 bg-rose-600 text-white rounded text-[10px]">24px Hitbox</button>
  </div>
</div>`,
      },
      {
        id: 'accessible-target',
        title: 'Accessible 48px Hit Area (WCAG / HIG)',
        badge: 'HIG / Material Compliant',
        badgeType: 'success',
        description: 'Apple HIG recommends minimum 44x44pt; Android Material Design recommends 48x48dp. Even if the icon is 20px, use padding or invisible bounding boxes to preserve the 48px hit area.',
        code: `/* Visual icon is 20px, but touch hitbox is 48px */
.accessible-icon-button {
  min-width: 48px;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}`,
        codeLang: 'css',
        previewHtml: `
<div class="flex items-center justify-center p-6 bg-emerald-50/40 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-900/40">
  <div class="border border-dashed border-emerald-500 p-3 rounded-lg text-center">
    <button class="px-4 py-2 bg-emerald-600 text-white rounded-md text-xs font-bold">48px Hitbox</button>
  </div>
</div>`,
      },
    ],
  },

  // 10. Figma to Code
  'figma-to-code': {
    id: 'figma-to-code',
    title: 'Figma Auto Layout to CSS Flexbox',
    category: 'workflow',
    steps: [
      {
        id: 'figma-autolayout-horizontal',
        title: 'Horizontal Auto Layout -> flex-row',
        badge: 'Figma -> CSS',
        badgeType: 'info',
        description: 'Figma Auto Layout with Horizontal direction directly maps to CSS `display: flex; flex-direction: row; gap: 16px; align-items: center;`.',
        code: `/* Figma Auto Layout Properties */
Direction: Horizontal (→)   ==> flex-direction: row
Item Spacing: 16px          ==> gap: 1rem (gap-4)
Padding: 24px               ==> padding: 1.5rem (p-6)
Align: Center               ==> align-items: center`,
        codeLang: 'css',
        previewHtml: `
<div class="w-full max-w-lg mx-auto bg-white dark:bg-[#1e1e1e] p-4 rounded-xl border border-gray-200 dark:border-gray-800">
  <div class="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-bold mb-2">flex flex-row items-center gap-4 p-4</div>
  <div class="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800/40 rounded-lg border border-dashed border-indigo-400">
    <div class="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">1</div>
    <div class="flex-1 text-xs text-gray-800 dark:text-gray-200 font-medium">Auto-Layout Item (Fill Container)</div>
    <div class="px-2.5 py-1 bg-gray-200 dark:bg-gray-700 rounded text-[11px] font-mono">Action</div>
  </div>
</div>`,
      },
      {
        id: 'figma-constraints-fill',
        title: 'Resizing: Fill Container vs Hug Contents',
        badge: 'Layout Engine',
        badgeType: 'success',
        description: 'In Figma, "Hug contents" equals `width: fit-content;`. "Fill container" equals `flex: 1 1 0%; width: 100%;`. Knowing this allows developers to write pixel-perfect responsive code instantly.',
        code: `/* Figma Resizing Rules in Tailwind */
Hug Contents   ==> w-fit
Fill Container ==> flex-1 w-full
Fixed Size     ==> w-[320px]`,
        codeLang: 'css',
        previewHtml: `
<div class="w-full max-w-lg mx-auto bg-white dark:bg-[#1e1e1e] p-4 rounded-xl border border-gray-200 dark:border-gray-800 space-y-2">
  <div class="flex items-center gap-2">
    <div class="px-3 py-1.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded text-xs font-mono font-bold">
      Hug (w-fit)
    </div>
    <div class="flex-1 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded text-xs font-mono font-bold text-center">
      Fill Container (flex-1)
    </div>
  </div>
</div>`,
      },
    ],
  },

  // 11. Generative UI
  'generative-ui': {
    id: 'generative-ui',
    title: 'Generative UI vs The Chatbot Trap',
    category: 'workflow',
    steps: [
      {
        id: 'chatbot-trap',
        title: 'The Chatbot Trap: Wall of Text',
        badge: 'Anti-Pattern',
        badgeType: 'error',
        description: 'Dumping dense paragraphs of prose into conversational bubbles forces users to read through text to extract basic structured facts. It eliminates direct manipulation.',
        code: `// Anti-pattern: LLM outputs plain markdown prose
const response = "Here is your flight: United UA 837 departs SFO at 11:20 AM and arrives at NRT at 3:15 PM (+1 day). The price is $842 for Economy. Would you like me to book it?";`,
        codeLang: 'typescript',
        previewHtml: `
<div class="w-full max-w-md mx-auto bg-white dark:bg-[#181818] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs text-xs text-gray-700 dark:text-gray-300 space-y-2">
  <div class="flex items-center gap-2 mb-1">
    <div class="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">AI</div>
    <span class="font-bold text-gray-900 dark:text-gray-100 text-xs">Assistant:</span>
  </div>
  <p class="m-0 leading-relaxed">
    Here is your flight from San Francisco to Tokyo: United Airlines flight UA 837 departs SFO at 11:20 AM and arrives at NRT at 3:15 PM (+1 day). Price is $842. Baggage includes 1 carry-on. Would you like me to book it?
  </p>
</div>`,
      },
      {
        id: 'structured-tool-call',
        title: 'Structured Tool Call (JSON Schema)',
        badge: 'Data Layer',
        badgeType: 'info',
        description: 'Rather than outputting conversational fluff, the LLM calls a structured tool function returning typed JSON parameters.',
        code: `// LLM tool_call payload:
{
  "tool": "showFlightOption",
  "flightNumber": "UA 837",
  "from": "SFO",
  "to": "NRT",
  "departure": "11:20 AM",
  "arrival": "3:15 PM",
  "price": 842,
  "currency": "USD"
}`,
        codeLang: 'json',
        previewHtml: `
<div class="w-full max-w-md mx-auto bg-gray-950 border border-gray-800 rounded-xl p-4 font-mono text-xs text-emerald-400 space-y-1">
  <div class="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-2">tool_call: showFlightOption</div>
  <div>{</div>
  <div class="pl-4">"flight": <span class="text-amber-300">"UA 837"</span>,</div>
  <div class="pl-4">"route": <span class="text-amber-300">"SFO ➔ NRT"</span>,</div>
  <div class="pl-4">"price": <span class="text-sky-300">842</span>,</div>
  <div class="pl-4">"stops": <span class="text-sky-300">0</span></div>
  <div>}</div>
</div>`,
      },
      {
        id: 'generative-widget',
        title: 'Interactive Generative UI Widget',
        badge: 'Generative UI',
        badgeType: 'success',
        description: 'The frontend translates the structured JSON payload into an interactive, scannable component with immediate booking actions and hover micro-interactions.',
        code: `// Render typed React/Tailwind component:
export function FlightWidget({ flight, price, from, to }) {
  return (
    <div className="rounded-xl border p-4 shadow-sm flex flex-col gap-3">
      <FlightSummary flight={flight} price={price} />
      <Button onClick={bookFlight}>Select & Book Flight</Button>
    </div>
  );
}`,
        codeLang: 'tsx',
        previewHtml: `
<div class="w-full max-w-md mx-auto bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm space-y-3 transition-all hover:shadow-md">
  <div class="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2.5">
    <div class="flex items-center gap-2">
      <span class="px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-bold rounded">UA 837</span>
      <span class="text-xs font-bold text-gray-800 dark:text-gray-200">Nonstop (11h 55m)</span>
    </div>
    <span class="text-sm font-black text-emerald-600 dark:text-emerald-400">$842</span>
  </div>
  <div class="flex items-center justify-between text-xs px-2">
    <div>
      <div class="font-bold text-gray-900 dark:text-gray-100 text-sm">11:20 AM</div>
      <div class="text-[11px] text-gray-400 font-mono">SFO</div>
    </div>
    <div class="text-gray-300 dark:text-gray-600 font-mono text-xs">────────▶</div>
    <div class="text-right">
      <div class="font-bold text-gray-900 dark:text-gray-100 text-sm">3:15 PM <span class="text-[10px] text-rose-500 font-normal">+1</span></div>
      <div class="text-[11px] text-gray-400 font-mono">NRT</div>
    </div>
  </div>
  <button class="w-full py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer">
    Select & Book Flight
  </button>
</div>`,
      },
    ],
  },
};

export function getUIUXScenario(id: string): UIUXScenario | undefined {
  return uiuxScenarios[id];
}
