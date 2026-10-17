# Shrey Verma – personal website

Plain HTML/CSS/JS. No build step. Works on GitHub Pages as-is.

## Deploy on GitHub Pages
1. Create a repo. Name it `<your-username>.github.io` for the URL `https://<your-username>.github.io/`
   (any other name also works; the URL then ends with `/<repo-name>/`).
2. Put the CONTENTS of this folder at the repo root (index.html must be at the top level).
3. Repo -> Settings -> Pages -> Source: "Deploy from a branch" -> Branch `main`, folder `/ (root)` -> Save.
4. Wait 1-2 minutes. Your site is live.

## Contact form
Edit `config.js`. Set `provider: "web3forms"` and paste an access key for each recipient (free at web3forms.com).

## Papers and citations
- Papers live in one file: `publications-data.js` (edit it directly).
- Import all papers/citations: `pip install scholarly && python update_citations.py`.
- Auto-update: Settings -> Actions -> General -> Workflow permissions -> "Read and write", then
  Actions tab -> "Update citations" -> Run workflow. It also runs every Monday.

## Photos
`assets/profile.jpg`. Trek carousels: `assets/hobbies/annapurna-1.jpg`, `annapurna-2.jpg`, ... and `minkiani-1.jpg`, `minkiani-2.jpg`, ... (numbered consecutively, up to 8 each). Other tiles: dhauj, goa, werribee, scuba, art1-3 (.jpg).

## Code style
HTML, CSS, JS and JSON use tab indentation (width 4, set in `.editorconfig` so GitHub shows it correctly).
One tag / statement / declaration per line.

## Projects
All projects are listed in one file: `projects-data.js`. Copy a block, edit it, and add the project's own page (`project-....html`).
- `tag: "latest"` shows the project on the home page under "Latest Work" and on the Projects page.
- `tag: "old"` shows it on the Projects page only.
- `group: "research"` or `"hobby"` picks the section on the Projects page.
Cards are laid out three per row (two on tablets, one on phones).
