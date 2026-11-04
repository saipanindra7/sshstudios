# SH Studio — deployment-ready static website

**Brand:** SH Studio  
**Founders:** Saipanindra × Hemanth  
**Positioning:** Thoughtful websites, memorable experiences, smarter digital solutions.  
**Design:** Existing dark premium visual identity, lime and purple accents, Space Grotesk / DM Sans typography, responsive concept previews.

This is a host-neutral static website package. No hosting provider or domain is assumed, and no real contact details have been invented.

## Package contents

- `index.html` — studio homepage, services, concept work, process, founders, FAQs and enquiry form
- `styles.css` — responsive visual system and reduced-motion/accessibility refinements
- `script.js` — mobile navigation, CTA preselection, form validation and contact-mode behavior
- `site-config.js` — the only place to configure the real contact details and form mode
- `thank-you.html` — Netlify Forms confirmation page
- `privacy.html` — privacy-notice starter; **complete it before publishing**
- `assets/` — favicon, concept preview images and generated social-sharing preview
- `demos/` — three fictional concept websites; they are examples, not client case studies
- `_headers`, `netlify.toml`, `vercel.json` — security headers for compatible hosts
- `robots.txt`, `sitemap.xml` — crawler files; sitemap contains a domain placeholder that must be replaced
- `.nojekyll` — avoids GitHub Pages Jekyll processing

## 1. Preview locally

Use Python's built-in server:

```bash
cd SH_Studio_Website
python3 -m http.server 8000
```

Open `http://localhost:8000`.

The enquiry form is configured for **WhatsApp mode**. It opens a pre-filled WhatsApp draft to the supplied SH Studio number; visitors must review and press Send. The email link is also configured as a fallback.

## 2. Configure before launch

Open `site-config.js` and set only details that SH Studio actually controls:

```js
window.SITE_CONFIG = {
  businessName: 'SH Studio',
  shortName: 'SH',
  tagline: 'Thoughtful websites, memorable experiences, smarter digital solutions.',
  whatsappNumber: '916303480824', // configured with India country code
  contactEmail: 'saipanindra1234@gmail.com',
  instagramUrl: 'https://www.instagram.com/your-real-account/',
  location: 'India · Working with clients worldwide',
  formMode: 'whatsapp'
};
```

Choose exactly one form mode:

| Mode | Behavior | Requirement |
|---|---|---|
| `preview` | Does not transmit or store an enquiry; may copy it locally | Safe default |
| `netlify` | Submits the HTML form to Netlify Forms | Deploy on Netlify, enable/detect Forms, verify a real submission |
| `whatsapp` | Opens a prefilled WhatsApp draft | Configure a real WhatsApp number; visitor must press Send |
| `email` | Opens a prefilled email draft | Configure a monitored email address; visitor must press Send |

The supplied package is configured for `whatsapp`, so it works on any static host. Visitors must press Send in WhatsApp; opening the draft alone does not deliver the enquiry. Do not select `netlify` on GitHub Pages or Vercel; their static hosting does not process Netlify Forms.

## 3. Choose a host when ready

### Netlify

1. Create a Netlify site and deploy the contents of this folder (the deployed root must contain `index.html`).
2. Keep `netlify.toml` and `_headers` in the deployed root.
3. Set `formMode: 'netlify'` in `site-config.js`.
4. Confirm Netlify detects the form named `project-enquiry`. Enable Forms if the dashboard prompts you.
5. Configure submission notifications in Netlify's dashboard; no email address is embedded in the public site.
6. Submit a real test enquiry from the deployed URL. Confirm the submission appears in the dashboard and that `thank-you.html` opens.

A successful page load is not proof that form delivery works. Do not advertise the form until the live test passes.

### GitHub Pages

1. Create a public GitHub repository and upload the **contents** of this folder to the repository root.
2. In repository Settings → Pages, select deployment from the `main` branch and `/ (root)`.
3. Wait for the Pages deployment to finish.
4. Set `formMode` to `whatsapp` or `email` and add the corresponding real contact detail. `preview` is also safe, but will not receive enquiries.
5. GitHub Pages does not apply `_headers` as HTTP security headers. The website still includes good HTML/JS practices, but configure a host/CDN that supports response headers if you require the included CSP and other headers.
6. If using a project URL such as `https://username.github.io/repository/`, check every relative link after deployment. The form action is intentionally relative (`thank-you.html`) to support subpath hosting.

### Vercel

1. Import the repository or upload the project using Vercel's supported Git workflow.
2. Keep `vercel.json` in the project root; it configures response security headers.
3. Deploy as a static site (no build command is required; output directory is the project root).
4. Set `formMode` to `whatsapp` or `email` unless you separately integrate a form provider. Vercel static hosting does not process Netlify Forms.
5. Submit a test enquiry using the selected contact method.

## 4. Domain and SEO launch steps

The domain has not been purchased, so the project intentionally does not claim a canonical production URL.

After choosing and connecting your domain:

1. Replace `https://YOUR-DOMAIN.example/` in `sitemap.xml` with the final HTTPS homepage URL. Add any future public pages to the sitemap.
2. Change `assets/og-sh-studio.png` in the `og:image` metadata to an absolute HTTPS URL in `index.html` (for example, `https://your-domain.example/assets/og-sh-studio.png`). Social crawlers generally need an absolute image URL.
3. Add a canonical link in the homepage `<head>` using the final URL:
   ```html
   <link rel="canonical" href="https://your-domain.example/">
   ```
4. Submit `https://your-domain.example/sitemap.xml` in Google Search Console after the site is live.
5. Check the final page title, description, Open Graph preview, mobile layout and indexed URL.
6. `privacy.html` describes the configured WhatsApp/email draft flow. Review it if you change hosting, add tracking or adopt a hosted form provider. It is marked `noindex`, which is appropriate for a privacy notice. Keep it linked in the footer.
7. Add only real social profile links, contact details, project outcomes and client testimonials. The three current portfolio projects are clearly fictional concept demos; do not relabel them as paid client work.

## 5. Security and privacy notes

- External scripts and trackers are not included.
- Security response headers are provided for Netlify and Vercel. GitHub Pages cannot set arbitrary response headers from repository files.
- The CSP permits the Google Fonts stylesheet/font hosts already used by the design, blocks objects and framing, and restricts scripts to same-origin files.
- The contact form does not store data in this static project. Delivery depends on the mode and provider configured by the site owner.
- Complete `privacy.html` based on the actual provider, data access, retention and contact process before launch.
- Never commit API keys, passwords, private customer data or credentials to this public static repository.

## 6. Pre-launch verification checklist

- [ ] Configure the real email and/or WhatsApp number.
- [ ] Select the intended `formMode`; do not leave `preview` if you expect leads.
- [ ] Complete and review the privacy notice.
- [ ] Connect the final domain and update the sitemap, canonical and absolute social image URL.
- [ ] Test the mobile menu with keyboard and touch.
- [ ] Test all service and audience CTAs; the Business website CTA now maps to a matching form option.
- [ ] Test required fields and invalid email validation.
- [ ] Submit a real enquiry on the live host and verify delivery end-to-end.
- [ ] Check all three concept demos and all internal links.
- [ ] Test at narrow mobile, tablet and desktop widths.
- [ ] Run Lighthouse / PageSpeed Insights on the deployed site and review any remaining issues.
- [ ] Verify the deployed response headers on a host that supports them.

## Scope and limitations

This package is a static marketing website, not a CMS, store backend, booking system or lead database. E-commerce, AI automation and maintenance are service offerings described on the site; they are not implemented as functional products inside this static website. Hosting, domain purchase, email inbox setup, analytics and form-provider accounts remain owner decisions.
#   s s h s t u d i o s  
 