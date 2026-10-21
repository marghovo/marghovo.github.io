# hovhannes-margaryan.github.io

Personal academic website. Static, no build step — deployable as-is on GitHub Pages.

## Files

| File | Purpose |
|---|---|
| `index.html` | The whole site (styles + markup + rendering) |
| `publications.js` | **Single source of truth for papers.** Edit this, never the HTML |
| `scripts/sync_scholar.py` | Pulls new papers from Google Scholar into `publications.js` |
| `.github/workflows/sync-scholar.yml` | Runs the sync every Monday + on demand |

## Managing publications

All papers live in `publications.js` as JSON between the `SYNC-JSON-START/END` markers.

- **Add a paper by hand** — copy an existing entry, change the fields.
- **Feature a paper** — `"highlight": true`.
- **Hide a paper** — `"hidden": true` (survives re-sync; the sync never re-adds or un-hides).
- **Reorder** — set `"order"` (lower = first).
- **Links** — `website` / `paper` / `code`. Omit a key to hide that link; `""` shows a dimmed "coming soon".
- **Abstracts** — stored in `"abstract"`. For entries with an `"arxivId"`, the sync script fills missing abstracts automatically from the arXiv API (the API has no CORS, so this happens at build time, not in the visitor's browser). A Semantic Scholar live fetch exists as a browser-side fallback for entries that somehow lack a stored abstract.

## Google Scholar sync

Scholar has no official API and blocks browser-side scraping, so sync happens
at repo level, not in the visitor's browser:

1. Put your Scholar ID (the `user=…` part of your profile URL) in `scripts/sync_scholar.py`.
2. The GitHub Action runs weekly (or trigger it manually under Actions → "Sync publications from Google Scholar").
3. New papers are **appended** with `highlight: false, order: 99` for you to curate.
   Existing entries are **never touched** — your edits, ordering, highlights, and
   hidden flags always survive a re-sync.

Run locally instead: `pip install scholarly && python scripts/sync_scholar.py`

## Still to fill in

- Scholar profile URL (hero + sync script)
- CV PDF link (hero)
- Talk links: IMAGINE ENPC slides, PyData Yerevan recording
