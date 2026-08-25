# Midnight Shift — midnightshift.sg

Production-ready static marketing site for **Midnight Shift**, a property lead
conversion system (telemarketing + CRM + qualification + appointment setting)
for Singapore property agents. A Midnight Strategies SG service.

## Stack

Pure static HTML/CSS/JS — no build step, no dependencies, no framework.
Fast by default and deployable to any static host.

```
index.html                  Homepage (primary acquisition page)
how-it-works.html           Full operational workflow
telemarketing.html          Calling service
crm.html                    Integrated CRM
lead-qualification.html     Qualification framework
appointment-setting.html    Handoff process
faq.html                    FAQ (with FAQPage JSON-LD)
book-demo.html              Demo request form (primary CTA target)
privacy-policy.html         PDPA privacy policy (noindex)
terms.html                  Terms & service info (noindex)
data-handling.html          DNC & data handling practices
404.html                    Not-found page
robots.txt / sitemap.xml    SEO support
assets/css/styles.css       Design system (mobile-first)
assets/js/main.js           Nav, sticky CTA, calculator, form, reveal
assets/favicon.svg          Favicon
```

## Key behaviours

- **Mobile-first** with a sticky bottom CTA bar (Book a Demo + WhatsApp) that
  appears after scrolling past the hero. Hidden on desktop.
- **Time calculator** on the homepage (`data-calc`) — illustrative only,
  disclaimered; makes no income/appointment claims.
- **Demo form** (`book-demo.html`) validates client-side, then opens a
  pre-filled WhatsApp chat to `+65 8089 3527`. Nothing is stored server-side.
  To switch to a backend/CRM endpoint later, replace the submit handler in
  `assets/js/main.js` (`data-demo-form` section).
- **WhatsApp number** lives in `WHATSAPP_NUMBER` in `assets/js/main.js` and in
  the hard-coded `wa.me` links across pages — change both if the number changes.
- CRM visuals are hand-built HTML mockups (illustrative UI, no stock photos).

## Local preview

```bash
python -m http.server 8940
```

Then open http://localhost:8940. (`.claude/launch.json` is configured for this.)

## Deploy

Hosted on **GitHub Pages**, served straight from `main` at the repository root.
Every push to `main` republishes automatically — there is no build step.

Three files support this and should not be deleted:

- `CNAME` — holds `midnightshift.sg`; GitHub reads it to bind the custom domain
- `.nojekyll` — skips Jekyll processing so files are served verbatim
- `google0f55c35ab4f8965c.html` — Google Search Console ownership proof;
  Google re-checks it periodically, so it has to stay reachable at the root

Live at **https://midnightshift.sg** with Enforce HTTPS on. The certificate
covers both the apex and `www` and renews automatically.

### DNS (at GoDaddy)

Apex `midnightshift.sg` → four `A` records:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Plus `www` → `CNAME` → `jeral-midnightstrategies.github.io`

Once DNS resolves, turn on **Enforce HTTPS** in the repo's Settings → Pages
(GitHub issues the certificate automatically, usually within the hour).

Note: GitHub Pages requires a **public** repository on the free plan. The repo
is public for this reason; it contains no secrets.

Post-launch checklist:

- [ ] Add an `og:image` (1200×630) and reference it in each page's meta tags
- [ ] Wire the demo form to your CRM/webhook if you want submissions logged
      in addition to WhatsApp
- [ ] Add analytics (and update `privacy-policy.html` cookie section if so)
- [ ] Submit `sitemap.xml` in Google Search Console

## Positioning guardrails (do not undo)

- Positioned as a **Property Lead Conversion System**, not a call centre.
- **No guaranteed income / appointment / conversion / sales claims** anywhere —
  the terms page and footer state this explicitly. Keep it that way.
- All dashboard numbers shown in mockups are illustrative UI, not results claims.
