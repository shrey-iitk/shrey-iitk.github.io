(function () {
	const box = document.getElementById("pubs");
	if (!box || !window.PUBS) {
		return;
	}
	const A = window.SCHOLAR_ID;
	const all = box.dataset.mode === "all";
	const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': "&quot;"
	}[c]));
	const fmt = n => n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, "") + "K" : n;
	const btn = (l, u) => u ? `<a href="${esc(u)}" target="_blank" rel="noopener">${l}</a>` : "";
	let hasDoi = false;
	function card(p, i) {
		const sch = p.scholar_id ? `https://scholar.google.com/citations?view_op=view_citation&hl=en&user=${A}&citation_for_view=${A}:${p.scholar_id}` : `https://scholar.google.com/citations?user=${A}`;
		let m = "";
		if (p.doi) {
			hasDoi = true;
			m += `<div class="altmetric-embed" data-badge-type="2" data-badge-popover="right" data-doi="${esc(p.doi)}"></div><span class="__dimensions_badge_embed__" data-doi="${esc(p.doi)}" data-style="small_rectangle" data-hide-zero-citations="true"></span>`;
		}
		if (p.cites != null) {
			m += `<a class="cite scholar" href="${sch}" target="_blank" rel="noopener" title="${p.cites} Google Scholar citations"><span>scholar</span><span>${fmt(p.cites)}</span></a>`;
		}
		const authors = esc(p.authors).split(esc(window.ME || "@@")).join(`<span class="me">${esc(window.ME)}</span>`);
		return `<div class="pub"><span class="badge">${esc(p.badge || "PAPER")}</span><div>
	  <div class="t">${esc(p.title)}</div><div class="a">${authors}</div><div class="v"><i>${esc(p.venue)}</i>, ${esc(p.year)}</div>
	  <div class="links">${p.abstract ? `<a href="#" data-abs="${i}">Abs</a>` : ""}${btn("DOI", p.doi && "https://doi.org/" + p.doi)}${btn("HTML", p.html)}${btn("PDF", p.pdf)}${btn("Code", p.code)}</div>
	  ${p.abstract ? `<div class="abs" id="abs${i}" hidden>${esc(p.abstract)}</div>` : ""}
	  <div class="cites">${m}</div></div></div>`;
	}
	const list = window.PUBS.map((p, i) => [p, i]).filter(([p]) => all || p.selected).sort((a, b) => b[0].year - a[0].year || (b[0].cites || 0) - (a[0].cites || 0));
	let html = "";
	let yr = null;
	list.forEach(([p, i]) => {
		if (all && p.year !== yr) {
			yr = p.year;
			html += `<h2>${yr}</h2>`;
		}
		html += card(p, i);
	});
	box.innerHTML = html || "<p class='sub'>No publications yet.</p>";
	const statBox = document.getElementById("pub-stats");
	if (statBox) {
		const count = k => window.PUBS.filter(p => p.badge === k).length;
		const known = count("JOURNAL") + count("CONFERENCE") + count("BOOK CHAPTER");
		const cards = [
			["Total publications", window.PUBS.length],
			["Journal articles", count("JOURNAL")],
			["Conference papers", count("CONFERENCE")],
			["Books &amp; chapters", count("BOOK CHAPTER")]
		];
		if (window.PUBS.length > known) {
			cards.push(["Other", window.PUBS.length - known]);
		}
		statBox.innerHTML = cards.map(([label, n]) => `<div class="stat"><b data-count="${n}">0</b><span>${label}</span></div>`).join("");
		if (window.animateCounts) {
			window.animateCounts(statBox);
		}
	}
	box.addEventListener("click", e => {
		const a = e.target.closest("[data-abs]");
		if (!a) {
			return;
		}
		e.preventDefault();
		const d = document.getElementById("abs" + a.dataset.abs);
		d.hidden = !d.hidden;
	});
	if (hasDoi) {
		[
			["https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js"],
			["https://badge.dimensions.ai/badge.js"]
		].forEach(([u]) => {
			const s = document.createElement("script");
			s.src = u;
			s.async = true;
			document.body.appendChild(s);
		});
	}
})();
