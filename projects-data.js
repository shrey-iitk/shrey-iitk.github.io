/*
 * Projects shown on projects.html and (those tagged "latest") on the home page.
 *
 * To add a project, copy one block and edit it. Newest first = shown first.
 *   tag:   "latest" -> also appears on the home page under "Latest Work"
 *          "old"    -> appears only on the Projects page
 *   group: "research" or "hobby" (decides the section on the Projects page)
 *   video: optional link, shows a "Video" button on the card
 */
window.PROJECTS = [
	{
		page: "project-ev-charging-impact-iitk.html",
		image: "assets/projects/ev-charging-impact-iitk.svg",
		when: "2026 – 2027",
		title: "Impact Analysis of EV Charging Infrastructure at IIT Kanpur",
		text: "Assessing how EV charging infrastructure affects the IIT Kanpur distribution network.",
		group: "research",
		tag: "latest"
	},
	{
		page: "project-renewable-smart-charging.html",
		image: "assets/projects/renewable-smart-charging.svg",
		when: "2025 – 2026",
		title: "Renewable Energy Integrated Smart Charging Framework",
		text: "A simulation framework combining renewables, storage and EV charging for smart grids.",
		group: "research",
		tag: "latest"
	},
	{
		page: "project-distribution-grid-digital-twin.html",
		image: "assets/projects/distribution-grid-digital-twin.svg",
		when: "2025 – 2026",
		title: "Distribution Grid Digital Twin using OpenDSS",
		text: "An EV charging digital twin on IEEE distribution feeders, studied with Monte Carlo simulation.",
		group: "research",
		tag: "latest"
	},
	{
		page: "project-ai-charging-power-prediction.html",
		image: "assets/projects/ai-charging-power-prediction.svg",
		when: "2024 – 2025",
		title: "AI-Based Charging Power Prediction",
		text: "Deep learning models that predict EV charging power directly from battery State-of-Charge.",
		group: "research",
		tag: "old"
	},
	{
		page: "project-realtime-ev-data-acquisition-upmu.html",
		image: "assets/projects/realtime-ev-data-acquisition-upmu.svg",
		when: "2022 – 2023",
		title: "Real-Time EV Charging Data Acquisition using µPMU",
		text: "An experimental platform that records synchronized charging data for digital twin development.",
		group: "research",
		tag: "old"
	},
	{
		page: "project-life-cycle-assessment-electric-vehicles.html",
		image: "assets/projects/life-cycle-assessment-electric-vehicles.svg",
		when: "2021 – 2022",
		title: "Life Cycle Assessment of Electric Vehicles",
		text: "A GREET-based assessment of greenhouse gas emissions of electric and conventional vehicles in India.",
		group: "research",
		tag: "old"
	},
	{
		page: "project-led-cube-4x4x4.html",
		image: "assets/projects/led-cube-4x4x4.svg",
		when: "Hobby project",
		title: "4 × 4 LED Cube",
		text: "A 64-LED cube driven by an Arduino using multiplexing.",
		video: "https://youtube.com/shorts/q8__fIJEcQc?feature=share",
		group: "hobby",
		tag: "old"
	},
	{
		page: "project-line-follower-robot.html",
		image: "assets/projects/line-follower-robot.svg",
		when: "Hobby project",
		title: "Line Follower Robot",
		text: "A robot that follows a black and white line and can solve a maze.",
		video: "https://youtu.be/yEs9XGaz5qA",
		group: "hobby",
		tag: "old"
	},
	{
		page: "project-amphibian-robot.html",
		image: "assets/projects/amphibian-robot.svg",
		when: "Hobby project",
		title: "Amphibian Robot",
		text: "A robot that works both on land and in water.",
		video: "https://www.youtube.com/watch?v=U-fWGEEQHWo",
		group: "hobby",
		tag: "old"
	}
];
