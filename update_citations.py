"""Pull ALL papers and citation counts from your Google Scholar profile
into publications-data.js.

Usage:
    pip install scholarly
    python update_citations.py

Fields you added by hand (doi, pdf, code, badge, selected, abstract) are kept.
"""
import json
import pathlib
import time

from scholarly import scholarly

ID = "4m9m2JMAAAAJ"
FILE = pathlib.Path("publications-data.js")

# Read the current list (everything after "window.PUBS =" is plain JSON).
head, body = FILE.read_text(encoding="utf-8").split("window.PUBS =", 1)
old = {p["title"].lower(): p for p in json.loads(body.strip().rstrip(";"))}

author = scholarly.fill(scholarly.search_author_id(ID), sections=["publications"])
out = []
for pub in author["publications"]:
    pub = scholarly.fill(pub)
    b = pub["bib"]
    p = old.get(b["title"].lower(), {
        "badge": "PAPER", "selected": False, "doi": "", "pdf": "", "code": "",
        "abstract": b.get("abstract", ""),
    })
    p.update(
        title=b["title"],
        authors=b.get("author", "").replace(" and ", ", "),
        venue=b.get("journal") or b.get("conference") or b.get("citation", ""),
        year=int(b.get("pub_year") or 0),
        cites=pub.get("num_citations", 0),
        scholar_id=pub.get("author_pub_id", "").split(":")[-1],
        html=pub.get("pub_url", ""),
    )
    out.append(p)
    time.sleep(1)

if not out:
    raise SystemExit("No papers returned (Google Scholar may have blocked the request). Keeping existing data.")

out.sort(key=lambda x: (-x["year"], -x["cites"]))
FILE.write_text(head + "window.PUBS = " + json.dumps(out, indent="\t", ensure_ascii=False) + ";\n", encoding="utf-8")
print(f"Saved {len(out)} papers")
