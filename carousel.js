/* Image carousels. Put photos in assets/hobbies/ named  <name>-1.jpg, <name>-2.jpg, ... (consecutive; jpg/jpeg/png/webp). */
(function () {
	const EX = ["jpg", "jpeg", "png", "webp"];
	const tryLoad = (b, i) => new Promise(res => {
		let k = 0;
		(function n() {
			if (k >= EX.length) {
				return res(null);
			}
			const u = `${b}-${i}.${EX[k++]}`;
			const im = new Image();
			im.onload = () => res(u);
			im.onerror = n;
			im.src = u;
		})();
	});
	async function findAll(b, max) {
		const out = [];
		for (let i = 1; i <= max; i++) {
			const u = await tryLoad(b, i);
			if (!u) {
				break;
			}
			out.push(u);
		}
		return out;
	}
	document.querySelectorAll(".car").forEach(async (car) => {
		const b = car.dataset.base;
		const track = car.querySelector(".car-track");
		const urls = await findAll(b, +car.dataset.max || 8);
		if (!urls.length) {
			track.innerHTML = `<div class="slide ph"><span>${car.dataset.icon || "📷"}</span><small>Add photos: ${b}-1.jpg, ${b}-2.jpg ...</small></div>`;
			return;
		}
		track.innerHTML = urls.map(u => `<div class="slide"><img src="${u}" alt="${car.dataset.alt || ""}"></div>`).join("");
		if (urls.length < 2) {
			return;
		}
		car.insertAdjacentHTML("beforeend", `<button class="cb prev" aria-label="Previous photo">‹</button><button class="cb next" aria-label="Next photo">›</button><div class="dots">${urls.map(() => "<i></i>").join("")}</div>`);
		const dots = [...car.querySelectorAll(".dots i")];
		const calm = matchMedia("(prefers-reduced-motion:reduce)").matches;
		let i = 0;
		let t;
		const go = n => {
			i = (n + urls.length) % urls.length;
			track.style.transform = `translateX(-${i * 100}%)`;
			dots.forEach((d, k) => d.classList.toggle("on", k === i));
		};
		const auto = () => {
			clearInterval(t);
			if (!calm) {
				t = setInterval(() => go(i + 1), 4000);
			}
		};
		car.querySelector(".prev").onclick = () => {
			go(i - 1);
			auto();
		};
		car.querySelector(".next").onclick = () => {
			go(i + 1);
			auto();
		};
		dots.forEach((d, k) => d.onclick = () => {
			go(k);
			auto();
		});
		car.onmouseenter = () => clearInterval(t);
		car.onmouseleave = auto;
		let x0 = null;
		car.addEventListener("touchstart", e => {
			x0 = e.touches[0].clientX;
		}, { passive: true });
		car.addEventListener("touchend", e => {
			if (x0 == null) {
				return;
			}
			const dx = e.changedTouches[0].clientX - x0;
			if (Math.abs(dx) > 40) {
				go(i + (dx < 0 ? 1 : -1));
				auto();
			}
			x0 = null;
		});
		car.tabIndex = 0;
		car.onkeydown = e => {
			if (e.key === "ArrowRight") {
				go(i + 1);
			}
			if (e.key === "ArrowLeft") {
				go(i - 1);
			}
		};
		go(0);
		auto();
	});
})();
