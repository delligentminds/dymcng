# DYMCnG — Diligent Young Minds Counsel & Guidance

> **"Clarity today. Confidence tomorrow."**

Official website for DYMCnG, a career and education counselling practice founded by Dr (h.c.) Yazdi G. Mehta, serving students in Grades 7–12 and their families.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [React 18](https://react.dev) | UI framework |
| [Vite 5](https://vitejs.dev) | Build tool and dev server |
| [Tailwind CSS 3](https://tailwindcss.com) | Utility-first styling |
| [lucide-react](https://lucide.dev) | Icons |
| [Formspree](https://formspree.io) | Contact form email delivery |
| [GitHub Actions](https://github.com/features/actions) | CI/CD |
| [GitHub Pages](https://pages.github.com) | Hosting |

---

## Quick Start (local development)

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/dymcng-website.git
cd dymcng-website

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
# Opens at http://localhost:5173
```

---

## Project Structure

```
dymcng-website/
├── .github/
│   └── workflows/
│       └── deploy.yml        ← Auto-deploy to GitHub Pages on push to main
├── public/
│   └── images/
│       └── og-preview.jpg    ← Replace with 1200×630 branded image for social previews
├── src/
│   ├── App.jsx               ← Entire website (single-file component)
│   ├── main.jsx              ← React entry point
│   └── index.css             ← Tailwind directives + global resets
├── .eslintrc.cjs
├── .gitignore
├── index.html                ← HTML shell with SEO meta tags
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## Configuration Checklist

All editable content is in `src/App.jsx`. Open it and update these items:

### 1. Formspree (contact form emails)
```js
// Line ~45 in App.jsx
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
```
1. Go to [formspree.io](https://formspree.io) → create free account
2. Create a new form → set notification email to `yazdigodrej66@gmail.com`
3. Copy the endpoint URL and replace `YOUR_FORM_ID`

### 2. Booking link
```js
const contact = {
  bookingLink: "#contact",   // replace with Calendly or booking tool URL
};
```

### 3. Social media links
```js
const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "#" },  // replace with real URL
  { icon: Facebook,  label: "Facebook",  href: "#" },
  { icon: Linkedin,  label: "LinkedIn",  href: "#" },
];
```

### 4. Student photos (optional)
To use your own photos instead of Unsplash:
```js
const STUDENT_IMGS = {
  hero:      "/images/your-hero-photo.jpg",
  guidance:  "/images/your-guidance-photo.jpg",
  classroom: "/images/your-classroom-photo.jpg",
  parents:   "/images/your-parents-photo.jpg",
  workshop:  "/images/your-workshop-photo.jpg",
};
```
Place the files in `public/images/`.

### 5. OG preview image
Replace `public/images/og-preview.jpg` with a 1200×630px branded image for WhatsApp/Facebook link previews.

### 6. GitHub Pages subdirectory (if needed)
If the site will live at `https://username.github.io/dymcng-website/` (not a custom domain), uncomment this line in `vite.config.js`:
```js
base: "/dymcng-website/",
```

---

## Deploy to GitHub Pages

### Automatic (recommended)

Every push to the `main` branch automatically builds and deploys via GitHub Actions.

**First-time setup:**
1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Under **Source**, select **GitHub Actions**
4. Push any commit to `main` — the site will deploy automatically

### Manual build
```bash
npm run build
# Output is in /dist — upload this folder to any static host
```

---

## Custom Domain (optional)

To use `www.dymcng.com`:
1. Add a `CNAME` file to the `public/` folder:
   ```
   www.dymcng.com
   ```
2. In your domain registrar, add a CNAME DNS record pointing `www` → `YOUR_USERNAME.github.io`
3. In GitHub: **Settings → Pages → Custom domain** → enter `www.dymcng.com`
4. Check **Enforce HTTPS**

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server at `localhost:5173` |
| `npm run build` | Build production bundle to `/dist` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## Privacy & Security Notes

- No private credentials, API keys, or passwords are stored in this codebase
- The Formspree endpoint is a public-facing URL (safe to commit)
- Assessment and enquiry data is handled by Formspree and emailed directly to the counsellor
- No analytics or tracking scripts are included by default

---

## License

All rights reserved © DYMCnG — Diligent Young Minds Counsel & Guidance.  
Website code may not be reused or redistributed without permission.
