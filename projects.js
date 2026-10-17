(function () {
	if (!window.PROJECTS) {
		return;
	}
	const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': "&quot;"
	}[c]));
	function card(p) {
		const video = p.video ? `<a class="btn vid" href="${esc(p.video)}" target="_blank" rel="noopener">▶ Video</a>` : "";
		return `<article class="work reveal">
	<div class="work-img"><img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy"></div>
	<div class="work-body">
		<span class="pill">${esc(p.when)}</span>
		<h3>${esc(p.title)}</h3>
		<p>${esc(p.text)}</p>
		${video}
		<a class="more" href="${esc(p.page)}">Read more ›</a>
	</div>
</article>`;
	}
	// <div class="work-grid" data-projects data-tag="latest" data-group="research"></div>
	// data-tag and data-group are optional filters; leave both out to list everything.
	document.querySelectorAll("[data-projects]").forEach(box => {
		const tag = box.dataset.tag;
		const group = box.dataset.group;
		const list = window.PROJECTS.filter(p => (!tag || p.tag === tag) && (!group || p.group === group));
		box.innerHTML = list.map(card).join("") || "<p class='sub'>No projects yet.</p>";
	});
})();
