# Personal Developer Portfolio & Project Showcase

A modern, responsive developer portfolio built with **pure HTML5, CSS3 and JavaScript (ES6+)** — no frameworks. DecodeLabs Project 1, Batch 2026.

**Live demo:** _add your Vercel / Netlify / GitHub Pages URL here_

## Features
- Semantic HTML5 (`header`, `nav`, `main`, `section`, `article`, `footer`)
- Mobile-first layout with CSS Grid + Flexbox, breakpoints at 768px and 1024px, `clamp()` fluid typography
- Dark / Light theme toggle (remembers choice, respects system preference)
- Responsive hamburger menu, smooth scrolling, active-link highlighting
- Project cards with an accessible modal popup (`<dialog>`)
- Contact form with JavaScript validation and accessible error messages
- Palette: Mocha Mousse, Ethereal Blue, Moonlit Grey · Fonts: Montserrat + Open Sans (3 weights)
- Accessibility: skip link, keyboard support, focus styles, alt text, reduced-motion support

## Project structure
```
├── index.html
├── css/style.css
├── js/script.js
├── assets/ (avatar.svg, project-*.svg, cv.pdf)
└── README.md
```

## Customise
1. Replace "Your Full Name", email, LinkedIn and GitHub links in `index.html`.
2. Replace `assets/avatar.svg` with your photo (e.g. `profile.webp`, update the `<img>`).
3. Put your CV at `assets/cv.pdf`.
4. Edit the `projects` array in `js/script.js` and the project cards in `index.html` (real screenshots, demo and repo links).
5. Add screenshots of the site to this README.

## Deploy
- **GitHub Pages:** Settings → Pages → Deploy from branch `main` / root.
- **Netlify / Vercel:** import the repo, no build command, publish directory `/`.

## Contact form
The form validates on the client only. To receive messages, connect Formspree, Netlify Forms or EmailJS in `js/script.js`.
