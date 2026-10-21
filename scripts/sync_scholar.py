#!/usr/bin/env python3
"""
Google Scholar -> publications.js sync.

Pulls the publication list from a Google Scholar profile and MERGES it
into publications.js:

  * new papers (title not already present) are APPENDED with
    highlight=False, hidden=False, order=99 — you then curate by hand
  * existing entries are NEVER modified: your links, highlights,
    ordering, hidden flags, edited titles and bibtex all survive a
    re-sync

Setup (once):
    pip install scholarly
    Set SCHOLAR_ID below (the ?user=XXXX part of your profile URL).

Run:
    python scripts/sync_scholar.py

In CI this runs weekly via .github/workflows/sync-scholar.yml.
"""

import json
import re
import sys
from pathlib import Path

SCHOLAR_ID = "j5-vgYYAAAAJ"  # e.g. "AbCdEfGhIjK"

ROOT = Path(__file__).resolve().parent.parent
PUB_FILE = ROOT / "publications.js"
START = "/* SYNC-JSON-START */"
END = "/* SYNC-JSON-END */"


def norm(title: str) -> str:
    """Normalized title for duplicate detection."""
    return re.sub(r"[^a-z0-9]", "", title.lower())


def load_existing():
    text = PUB_FILE.read_text(encoding="utf-8")
    body = text.split(START)[1].split(END)[0]
    return text, json.loads(body)


def save(text: str, pubs: list):
    body = json.dumps(pubs, ensure_ascii=False, indent=2)
    head = text.split(START)[0]
    tail = text.split(END)[1]
    PUB_FILE.write_text(head + START + " " + body + " " + END + tail,
                        encoding="utf-8")


def make_id(authors, year, title):
    first = authors[0].split()[-1].lower() if authors else "unknown"
    word = re.sub(r"[^a-z]", "", title.split()[0].lower()) or "paper"
    return f"{first}{year}{word}"


def make_bibtex(entry_id, title, authors, venue, year):
    author_str = " and ".join(
        f"{a.split()[-1]}, {' '.join(a.split()[:-1])}" for a in authors
    )
    return (
        f"@misc{{{entry_id},\n"
        f"  title  = {{{title}}},\n"
        f"  author = {{{author_str}}},\n"
        f"  note   = {{{venue}}},\n"
        f"  year   = {{{year}}}\n"
        f"}}"
    )


def fetch_scholar():
    from scholarly import scholarly
    author = scholarly.search_author_id(SCHOLAR_ID)
    author = scholarly.fill(author, sections=["publications"])
    results = []
    for pub in author["publications"]:
        pub = scholarly.fill(pub)
        bib = pub.get("bib", {})
        title = bib.get("title", "").strip()
        if not title:
            continue
        year = int(bib.get("pub_year", 0) or 0)
        authors = [a.strip() for a in bib.get("author", "").split(" and ") if a.strip()]
        venue = bib.get("citation", "") or bib.get("journal", "") or bib.get("conference", "")
        url = pub.get("pub_url", "")
        results.append({"title": title, "year": year, "authors": authors,
                        "venue": venue, "url": url})
    return results


def fetch_arxiv_abstract(arxiv_id: str) -> str:
    """Fetch an abstract from the arXiv API (server-side — no CORS here)."""
    import urllib.request
    import xml.etree.ElementTree as ET
    url = f"https://export.arxiv.org/api/query?id_list={arxiv_id}"
    try:
        with urllib.request.urlopen(url, timeout=30) as r:
            root = ET.fromstring(r.read())
        ns = {"a": "http://www.w3.org/2005/Atom"}
        s = root.find("a:entry/a:summary", ns)
        return re.sub(r"\s+", " ", s.text).strip() if s is not None and s.text else ""
    except Exception as e:
        print(f"  ! abstract fetch failed for {arxiv_id}: {e}")
        return ""


def fill_missing_abstracts(pubs: list) -> int:
    filled = 0
    for p in pubs:
        if p.get("arxivId") and not p.get("abstract"):
            abstract = fetch_arxiv_abstract(p["arxivId"])
            if abstract:
                p["abstract"] = abstract
                filled += 1
                print(f"  + abstract filled: {p['title'][:50]}…")
    return filled


def main():
    text, existing = load_existing()
    known = {norm(p["title"]) for p in existing}
    added = 0

    if "TODO" in SCHOLAR_ID:
        print("SCHOLAR_ID not set — skipping Scholar sync, "
              "filling missing abstracts only.")
        if fill_missing_abstracts(existing):
            save(text, existing)
            print("Done — abstracts updated.")
        else:
            print("Done — nothing to fill.")
        return
    for item in fetch_scholar():
        if norm(item["title"]) in known:
            continue
        entry_id = make_id(item["authors"], item["year"], item["title"])
        arxiv_match = re.search(r"arxiv\.org/(?:abs|pdf)/(\d{4}\.\d{4,5})",
                                item.get("url", ""))
        existing.append({
            "id": entry_id,
            **({"arxivId": arxiv_match.group(1)} if arxiv_match else {}),
            "title": item["title"],
            "authors": item["authors"],
            "venue": item["venue"] or "TODO venue",
            "year": item["year"],
            "pages": "",
            "links": {"paper": item["url"]} if item["url"] else {"paper": ""},
            "abstract": "",
            "bibtex": make_bibtex(entry_id, item["title"], item["authors"],
                                  item["venue"], item["year"]),
            "highlight": False,
            "hidden": False,
            "order": 99,
        })
        known.add(norm(item["title"]))
        added += 1
        print(f"  + added: {item['title']}")

    filled = fill_missing_abstracts(existing)

    if added or filled:
        save(text, existing)
        print(f"Done — {added} new paper(s), {filled} abstract(s) updated.")
    else:
        print("Done — nothing new on Scholar.")


if __name__ == "__main__":
    main()
