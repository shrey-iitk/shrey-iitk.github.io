(function () {
	const f = document.getElementById("cform");
	if (!f) {
		return;
	}
	const C = window.CONTACT_CONFIG || {};
	const R = C.recipients || [];
	const sel = f.querySelector("#to");
	const st = document.getElementById("fstatus");
	const btn = f.querySelector("button");
	R.forEach((r, i) => sel.insertAdjacentHTML("beforeend", `<option value="${i}">${r.label} (${r.email})</option>`));
	if (R.length < 2) {
		sel.closest("label").style.display = "none";
	}
	const say = (m, ok) => {
		st.textContent = m;
		st.className = ok ? "ok" : "err";
	};
	const ready = v => v && !/PASTE/i.test(v);
	f.addEventListener("submit", async (e) => {
		e.preventDefault();
		const d = Object.fromEntries(new FormData(f));
		if (d.botcheck) {
			return;
		}
		if (!d.name.trim() || !/^\S+@\S+\.\S+$/.test(d.email) || d.message.trim().length < 5) {
			say("Please enter your name, a valid email and a message.", false);
			return;
		}
		const r = R[+d.to || 0] || {};
		const subject = (C.subjectPrefix || "") + (d.subject || "New message");
		btn.disabled = true;
		btn.textContent = "Sending…";
		try {
			if (C.provider === "web3forms") {
				if (!ready(r.web3formsKey)) {
					throw new Error("config");
				}
				const res = await fetch("https://api.web3forms.com/submit", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json"
					},
					body: JSON.stringify({
						access_key: r.web3formsKey,
						name: d.name,
						email: d.email,
						subject,
						message: d.message,
						from_name: C.siteName || "Website"
					})
				});
				const j = await res.json();
				if (!j.success) {
					throw new Error("fail");
				}
			} else if (C.provider === "formspree") {
				if (!ready(r.formspreeEndpoint)) {
					throw new Error("config");
				}
				const res = await fetch(r.formspreeEndpoint, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json"
					},
					body: JSON.stringify({
						name: d.name,
						email: d.email,
						subject,
						message: d.message
					})
				});
				if (!res.ok) {
					throw new Error("fail");
				}
			} else {
				location.href = `mailto:${r.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(d.message + "\n\n— " + d.name + " <" + d.email + ">")}`;
				say("Opening your email app. If nothing opens, write to " + r.email + ".", true);
				btn.disabled = false;
				btn.textContent = "Send message";
				return;
			}
			say(C.successMessage || "Message sent.", true);
			f.reset();
		} catch (err) {
			say(err.message === "config" ? "The form is not set up yet: add your key in config.js." : "Sorry, sending failed. Please email " + (r.email || "me") + " directly.", false);
		}
		btn.disabled = false;
		btn.textContent = "Send message";
	});
})();
