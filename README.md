# laurihanninen.com

Personal website and professional profile for Lauri Hänninen, Product Marketing Lead at Trezor. Built with React, Vite, and Tailwind CSS. Deployed to GitHub Pages.

## Stack

- **React 18** + TypeScript + Vite
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Embla Carousel** for image/product carousels
- **SSR prerender** at build time for fast first paint and crawler visibility
- **GitHub Pages** with custom domain

## Project structure

```
src/
├── components/     # All page sections (Hero, About, Experience, etc.)
├── hooks/          # useDarkMode, useIsMobile
├── pages/          # Index, NotFound, Secret
├── entry-server.tsx  # SSR entry point for prerender
├── main.tsx        # Client entry point
└── index.css       # Tailwind config + custom utilities
public/
├── llms.txt        # AI-readable profile summary
├── llms-full.txt   # Full career context for LLM crawlers
├── robots.txt      # Crawler permissions (AI + search engines)
├── sitemap.xml     # Search engine sitemap
├── humans.txt      # humans.txt standard
└── .well-known/    # security.txt
```

## Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

This runs `vite build` followed by `node prerender.mjs`, which renders the homepage to static HTML and injects it into `dist/index.html`. The CSS is also inlined at build time to eliminate render-blocking requests.

## AI / LLM files

The site includes files optimized for AI crawlers and LLM retrieval:

- `/llms.txt` — concise professional summary with JSON-LD entity data
- `/llms-full.txt` — full career history, technical depth, FAQ, structured data
- `robots.txt` — allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.), blocks llms files from Google search indexing
- `index.html` — contains Person, FAQPage, WebSite, WebPage, and BreadcrumbList JSON-LD schemas

## License

MIT — see [LICENSE](LICENSE). Use it, fork it, make it yours.
