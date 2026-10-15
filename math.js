/* Renders LaTeX equations on project pages (KaTeX is bundled in assets/katex, so it works offline).
   Write display equations as $$ ... $$ and inline symbols as \( ... \). */
document.addEventListener("DOMContentLoaded", () => {
	if (!window.renderMathInElement) {
		return;
	}
	renderMathInElement(document.body, {
		delimiters: [
			{ left: "$$", right: "$$", display: true },
			{ left: "\\(", right: "\\)", display: false }
		],
		throwOnError: false
	});
});
