/* ============ CONTACT FORM CONTROL FILE ============
   Edit this file to control where messages go.

   provider:
     "mailto"     -> works immediately, opens the visitor's email app (no signup).
     "web3forms"  -> sends real emails straight from the form (free). Steps:
                     1) Go to https://web3forms.com and enter the recipient email.
                     2) They email you an Access Key. Paste it as web3formsKey below.
                     3) Set provider to "web3forms".
     "formspree"  -> https://formspree.io : create a form, paste its URL as formspreeEndpoint.

   Each recipient has its own key/endpoint, because the key decides which inbox receives the mail.
   Visitors choose a recipient from the "Send to" list (hidden if you keep only one recipient). */
window.CONTACT_CONFIG = {
	provider: "mailto",
	siteName: "Shrey Verma Website",
	subjectPrefix: "[Website] ",
	successMessage: "Thank you! Your message has been sent. I will reply soon.",
	recipients: [
		{
			label: "IIT Kanpur",
			email: "shreyverma21@iitk.ac.in",
			web3formsKey: "PASTE_KEY_HERE",
			formspreeEndpoint: "https://formspree.io/f/PASTE_ID"
		},
		{
			label: "La Trobe University",
			email: "shrey.verma@latrobe.edu.au",
			web3formsKey: "PASTE_KEY_HERE",
			formspreeEndpoint: "https://formspree.io/f/PASTE_ID"
		},
		{
			label: "Personal (Gmail)",
			email: "vermashrey786@gmail.com",
			web3formsKey: "PASTE_KEY_HERE",
			formspreeEndpoint: "https://formspree.io/f/PASTE_ID"
		}
	]
};
