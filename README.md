# SSH Studios — Creative Web & Digital Studio

<p align="center">
  <strong>Make them look twice. Stay for more.</strong><br>
  Thoughtful websites, memorable experiences, smarter digital solutions.
</p>

<p align="center">
  <a href="https://sshstudios.netlify.app/"><strong>Visit the live website ↗</strong></a>
</p>

---

## About

**SSH Studios** is a creative web and digital solutions studio founded by **Saipanindra and Hemanth**. We design and develop thoughtful digital experiences for businesses, startups, creators and growing brands in India and worldwide.

## Services

- Website design and development
- Business websites and startup landing pages
- E-commerce website design
- Website redesign and portfolio websites
- AI chatbot and automation solutions
- Website maintenance

*This repository contains the studio's marketing website, not the implementation of every service listed above.*

## Live website

**Production URL:** https://sshstudios.netlify.app/

The site is hosted on Netlify. A custom domain has not yet been connected.

## Website features

- Responsive homepage and navigation
- Services, process, studio and FAQ sections
- Three fictional portfolio concept projects with individual demo pages
- Project enquiry form configured to open a pre-filled WhatsApp draft
- Email contact fallback
- Privacy notice
- SEO metadata and social-sharing preview
- `robots.txt` and sitemap template
- Keyboard-focus and reduced-motion accessibility refinements
- Hosting configuration for Netlify and Vercel

## Portfolio concepts

- **North01** — fictional brand / business website concept
- **Bloom Cafe** — fictional restaurant website concept
- **Peak Fitness** — fictional fitness website concept

These are design demonstrations, not paid client projects or claims of previous client work.

## Tech stack

- HTML5, CSS3 and vanilla JavaScript
- WebP images and SVG favicon
- Netlify static hosting

No frontend framework or build step is required.

## Project structure

```text
SH_Studio_Website/
├── index.html
├── styles.css
├── script.js
├── site-config.js
├── thank-you.html
├── privacy.html
├── robots.txt
├── sitemap.xml
├── netlify.toml
├── vercel.json
├── _headers
├── assets/
└── demos/
    ├── north01.html
    ├── bloom-cafe.html
    └── peak-fitness.html
```

## Run locally

```bash
cd SH_Studio_Website
python -m http.server 8000
```

Open http://localhost:8000.

## Contact configuration

The current `site-config.js` configuration is:

- **WhatsApp:** +91 63034 80824
- **Email:** saipanindra1234@gmail.com
- **Form mode:** `whatsapp`

When a visitor submits the enquiry form, the site opens WhatsApp with a pre-filled message. The visitor must review the message and press **Send**. The website does not send the message automatically or store the enquiry in a website database.

The email link opens an email draft; the visitor must press **Send** in their email application.

To update contact settings, edit `site-config.js`:

```js
window.SITE_CONFIG = {
  businessName: 'SSH Studios',
  shortName: 'SSH',
  tagline: 'Thoughtful websites, memorable experiences, smarter digital solutions.',
  whatsappNumber: '916303480824',
  contactEmail: 'saipanindra1234@gmail.com',
  instagramUrl: '',
  location: 'India · Working with clients worldwide',
  formMode: 'whatsapp'
};
```

Add a social profile URL only after creating and verifying that profile.

### Form modes

| Mode | Behavior |
|---|---|
| `whatsapp` | Opens a pre-filled WhatsApp draft; visitor presses Send |
| `email` | Opens an email draft; visitor presses Send |
| `preview` | Does not deliver or store an enquiry; intended for local preview |
| `netlify` | Uses Netlify Forms; requires form detection and a successful live submission test |

The current live site is configured for WhatsApp mode. Do not switch to `netlify` unless you intentionally configure and test Netlify Forms.

## Deployment

### Netlify

The live website is already deployed at https://sshstudios.netlify.app/.

To publish an update:

1. Make the required changes.
2. Test the website locally.
3. Deploy the folder whose root contains `index.html` to the existing Netlify site, or connect the GitHub repository to Netlify for automatic deployments.
4. Verify the production URL, pages, assets and contact links.
5. Test the WhatsApp enquiry flow on a device with WhatsApp available.

Keep `netlify.toml` and `_headers` at the deployed root.

### GitHub Pages

1. Upload the contents of the website folder to the repository root, so `index.html` is at the root.
2. Open **Settings → Pages**.
3. Select deployment from the `main` branch and `/ (root)`.
4. Save and wait for deployment.
5. Keep the form in `whatsapp` or `email` mode. GitHub Pages does not process Netlify Forms.

GitHub Pages does not apply arbitrary HTTP response headers from `_headers`.

### Vercel

1. Import the repository.
2. Configure it as a static site with the project root as the output directory.
3. No build command is required.
4. Keep `vercel.json` at the project root.
5. Use WhatsApp or email mode unless a separate form provider is integrated and tested.

## SEO and custom domain

The current production address is the Netlify subdomain above. When a custom domain is purchased and connected:

1. Update the canonical URL in the homepage metadata.
2. Replace placeholder URLs in `sitemap.xml` with the final HTTPS domain.
3. Set the Open Graph image metadata to the absolute HTTPS image URL on the final domain.
4. Verify `robots.txt` and `sitemap.xml`.
5. Add the site to Google Search Console and submit the sitemap.
6. Check page titles, descriptions, social previews and mobile layout.

Do not add a made-up domain or unverified social profile.

## Privacy and security

- The static website does not maintain a lead database.
- WhatsApp and email messages are sent only after the visitor confirms them in the relevant app.
- WhatsApp and email providers process messages under their own terms and privacy policies.
- Review `privacy.html` whenever the contact flow, hosting provider, analytics or data handling changes.
- Never commit passwords, API keys, private customer information or credentials to this public repository.
- Security response headers are included for compatible hosts; GitHub Pages does not support arbitrary custom response headers through repository files.

## Update checklist

- [ ] Confirm the deployed homepage loads.
- [ ] Check navigation and internal links.
- [ ] Test all three portfolio concept demos.
- [ ] Test the WhatsApp enquiry form and contact link.
- [ ] Test the email contact link.
- [ ] Check mobile layout and navigation.
- [ ] Check keyboard navigation and visible focus.
- [ ] Review `privacy.html` if data handling changes.
- [ ] Update sitemap and canonical URL after connecting a custom domain.
- [ ] Run Lighthouse or PageSpeed Insights after significant changes.

## Scope and limitations

This repository contains a static marketing website. It is not a CMS, e-commerce backend, booking system, CRM or lead database. E-commerce, AI automation and maintenance are services offered by the studio; they are not fully implemented as products inside this website.

Hosting accounts, domain purchase, business email administration, analytics and third-party form-provider accounts are managed separately.

## Contact

**SSH Studios**  
Founders: Saipanindra × Hemanth

- Website: https://sshstudios.netlify.app/
- Email: [saipanindra1234@gmail.com](mailto:saipanindra1234@gmail.com)
- WhatsApp: [+91 63034 80824](https://wa.me/916303480824)

---

<p align="center">
  <strong>SSH Studios — Make them look twice. Stay for more.</strong>
</p>
