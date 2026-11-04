# Improvements in this package

## Preserved
- Existing SH Studio dark premium visual identity, lime/purple accents and typography.
- Existing homepage section order, services, founder presentation and three concept demo pages.
- Clear disclosure that portfolio items are fictional concepts rather than claimed client projects.

## Updated
- Added social-sharing image and Twitter/Open Graph metadata.
- Added crawler files and a sitemap template, with explicit instructions to replace the domain placeholder after purchase.
- Added matching `Business website` enquiry option so the business audience CTA can preselect it.
- Changed the form destination to a relative path for project-subpath hosting compatibility.
- Removed `novalidate` so browser-native form validation is active alongside the custom status messaging.
- Changed the default form mode to safe `preview`; no live delivery is implied until the owner configures a provider.
- Improved mobile menu keyboard handling and focus return on Escape.
- Added real image intrinsic dimensions, async decoding and a reduced-motion override.
- Added Netlify/Vercel response-header configuration and a GitHub Pages limitation note.
- Added a privacy notice starter that must be completed with actual data practices before publication.

## Validation performed
- JavaScript syntax check (`node --check`) passed.
- Static HTML audit passed for one H1 per page, no duplicate IDs and no broken local file links across the homepage, thank-you page, privacy page and three demos.
- Vercel configuration JSON parsed successfully.
- No live hosting deployment, live form submission, Lighthouse run or successful graphical browser session was completed. Those checks require the final hosting provider, domain and configured contact channel.
