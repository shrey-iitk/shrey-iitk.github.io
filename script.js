const ICONS = {
	insta: '<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="17.5" cy="6.5" r="1.4" fill="currentColor"/></svg>',
	rg: '<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="currentColor"/><text x="12" y="16.500" text-anchor="middle" font-size="11" font-weight="800" fill="var(--bg)" font-family="Arial">RG</text></svg>',
	cv: '<svg viewBox="0 0 48 24"><text x="24" y="19" text-anchor="middle" font-size="22" font-weight="800" fill="currentColor" font-family="Arial">CV</text></svg>',
	mail: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M2 4h20v16H2z"/><path d="M2 5l10 8 10-8" fill="none" stroke="var(--bg)" stroke-width="2"/></svg>',
	linkedin: '<svg viewBox="0 0 24 24"><rect width="24" height="24" fill="currentColor"/><text x="12" y="18" text-anchor="middle" font-size="16" font-weight="800" fill="var(--bg)" font-family="Arial">in</text></svg>',
	rss: '<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="currentColor"/><circle cx="7" cy="17" r="2" fill="var(--bg)"/><path d="M5 11a8 8 0 0 1 8 8M5 5a14 14 0 0 1 14 14" fill="none" stroke="var(--bg)" stroke-width="2.4"/></svg>',
	scholar: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 3 1 9l11 6 9-4.900V17h2V9L12 3zM5 13.200V17l7 4 7-4v-3.800l-7 3.800-7-3.800z"/></svg>'
};
const SOCIAL = [
	["cv", "https://drive.google.com/file/d/1o4HS_UjXaBu4cITaUUF_eF8q7wkf1MR4/view?usp=drive_link", "CV"],
	["mail", "mailto:vermashrey786@gmail.com", "Email"],
	["linkedin", "https://www.linkedin.com/in/shrey-verma-04b563126/", "LinkedIn"],
	["scholar", "https://scholar.google.com/citations?hl=en&user=4m9m2JMAAAAJ", "Google Scholar"],
	["rg", "https://www.researchgate.net/profile/Shrey-Verma-5", "ResearchGate"],
	["insta", "https://www.instagram.com/shrey_verma____aman/", "Instagram"]
];
const SITE = {
	first: "Shrey",
	last: "Verma",
	pages: [
		["index.html", "Home"],
		["about.html", "About"],
		["publications.html", "Publications"],
		["experience.html", "Experience"],
		["projects.html", "Projects"],
		["hobbies.html", "Hobbies"],
		["cv.html", "CV"],
		["contact.html", "Contact"]
	]
};
(function () {
	const saved = localStorage.getItem("theme") || (matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light");
	document.documentElement.dataset.theme = saved;
	const cur = location.pathname.split("/").pop() || "index.html";
	const section = cur.startsWith("project-") ? "projects.html" : cur;
	document.body.insertAdjacentHTML("afterbegin", `<nav><div class="wrap"><a class="brand" href="index.html"><b>${SITE.first}</b> ${SITE.last}</a><ul>` +
		SITE.pages.map(([h, n]) => `<li><a href="${h}" class="${h === section ? "active" : ""}">${n}</a></li>`).join("") +
		`<li><button id="theme" title="Toggle theme">${saved === "dark" ? "☀️" : "🌙"}</button></li></ul></div></nav>`);
	document.body.insertAdjacentHTML("beforeend", `<footer><div class="social-foot">${SOCIAL.map(([k, u, t]) => `<a href="${u}" title="${t}" target="_blank" rel="noopener">${ICONS[k]}</a>`).join("")}<a class="av" href="index.html" title="Home">SV<img src="assets/profile.jpg" alt="" onerror="this.remove()"></a></div>© ${new Date().getFullYear()} ${SITE.first} ${SITE.last}. Built with HTML, CSS &amp; JavaScript.</footer>`);
	document.getElementById("theme").onclick = e => {
		const t = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
		document.documentElement.dataset.theme = t;
		localStorage.setItem("theme", t);
		e.target.textContent = t === "dark" ? "☀️" : "🌙";
	};
})();
(function () {
	const links = [...document.querySelectorAll(".toc a")];
	if (!links.length) {
		return;
	}
	const secs = links.map(a => document.querySelector(a.getAttribute("href")));
	function spy() {
		let i = 0;
		secs.forEach((s, k) => {
			if (s.getBoundingClientRect().top <= 140) {
				i = k;
			}
		});
		if (innerHeight + scrollY >= document.body.scrollHeight - 4) {
			i = secs.length - 1;
		}
		links.forEach((a, k) => a.classList.toggle("active", k === i));
	}
	addEventListener("scroll", spy, { passive: true });
	addEventListener("load", spy);
	spy();
})();
(function () {
	const els = document.querySelectorAll(".reveal");
	if (!els.length) {
		return;
	}
	if (!("IntersectionObserver" in window)) {
		els.forEach(e => e.classList.add("in"));
		return;
	}
	const io = new IntersectionObserver(es => es.forEach(e => {
		if (e.isIntersecting) {
			e.target.classList.add("in");
			io.unobserve(e.target);
		}
	}), { threshold: .12 });
	els.forEach(e => io.observe(e));
})();
(function () {
	const l = document.createElement("link");
	l.rel = "stylesheet";
	l.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";
	document.head.appendChild(l);
	document.body.insertAdjacentHTML("afterbegin", '<div id="bar"></div>');
	document.body.insertAdjacentHTML("beforeend", '<button id="top" title="Back to top">↑</button>');
	const bar = document.getElementById("bar");
	const top = document.getElementById("top");
	addEventListener("scroll", () => {
		const h = document.documentElement;
		bar.style.width = (scrollY / (h.scrollHeight - innerHeight || 1) * 100) + "%";
		top.classList.toggle("show", scrollY > 400);
	}, { passive: true });
	top.onclick = () => scrollTo({
		top: 0,
		behavior: "smooth"
	});
	const r = document.querySelector("[data-rotate]");
	if (r) {
		const w = r.dataset.rotate.split("|");
		let i = 0;
		setInterval(() => {
			r.classList.add("out");
			setTimeout(() => {
				i = (i + 1) % w.length;
				r.textContent = w[i];
				r.classList.remove("out");
			}, 300);
		}, 2200);
	}
	window.animateCounts = (root) => {
		root.querySelectorAll("[data-count]").forEach(el => {
			const n = +el.dataset.count;
			const io = new IntersectionObserver(([e]) => {
				if (!e.isIntersecting) {
					return;
				}
				io.disconnect();
				const t0 = performance.now();
				(function f(t) {
					const p = Math.min((t - t0) / 1200, 1);
					el.textContent = Math.round(n * p).toLocaleString("en-US");
					if (p < 1) {
						requestAnimationFrame(f);
					}
				})(t0);
			});
			io.observe(el);
		});
	};
	window.animateCounts(document);
})();
(function () {
	if (document.querySelector("link[rel=icon]")) {
		return;
	}
	const l = document.createElement("link");
	l.rel = "icon";
	l.href = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="#4f46e5"/><text x="50" y="68" font-size="52" font-weight="700" text-anchor="middle" fill="#fff" font-family="Arial">SV</text></svg>');
	document.head.appendChild(l);
})();
