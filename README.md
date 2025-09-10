# AI Powered Portfolio 3D

A modern, immersive, and performant developer portfolio that combines real-time 3D graphics with an AI chat experience. Built to showcase projects, skills, and personality with a delightful UX.

## Table of Contents
- Overview
- Features
- Tech Stack
- Getting Started
- Scripts
- Project Structure
- Configuration
- Development Notes
- AI Integration
- 3D Assets & Performance
- Deployment
- Roadmap
- Contributing
- License
- Contact

## Overview
This project renders interactive 3D scenes in the browser using Three.js while providing an AI-powered chat to answer questions about your work. It’s responsive, accessible, and optimized for performance across devices.

## Features
- Interactive 3D background with particles, lighting, and subtle camera motion
- AI chat widget for Q&A about projects, stack, and experience
- Smooth, GPU-accelerated animations (GSAP)
- Mobile-first, responsive layout
- Accessible semantics and keyboard-friendly interactions
- Production-ready build with fast dev server

## Tech Stack
- Three.js (WebGL 3D)
- GSAP + ScrollTrigger (animations)
- Vite (dev server and build)
- HTML5, CSS3 (custom properties), JavaScript (ES6+)

## Getting Started
Prerequisites:
- Node.js 18+ and npm 9+

Installation:
- Clone: git clone https://github.com/Ajaydodiya7773/AIpowerdPortfolio3D.git
- Install: npm install
- Run dev: npm run dev

## Scripts
- npm run dev: Start local dev server (Vite)
- npm run build: Production build
- npm run preview: Preview the production build locally

## Project Structure
- src/
  - css/
    - style.css              Main stylesheet and theme tokens
  - js/
    - main.js                Three.js setup and scene loop
    - animations.js          GSAP timelines and scroll interactions
    - ai-chat.js             Chat UI and integration points
- assets/
  - images/                  Static imagery
  - models/                  3D models and textures
- public/                    Static assets served at root
- index.html                 App entry
- package.json               Dependencies and scripts

## Configuration
- App settings: Add any site-wide configuration to a new file at src/js/config.js
- Environment variables (if using external AI APIs): Create a .env file
  - VITE_AI_API_URL=
  - VITE_AI_API_KEY=
  Never commit real secrets; use local .env and deployment secrets.

## Development Notes
- Code style: Prefer small, focused modules and descriptive names
- Accessibility: Ensure focus states, color contrast, and semantic HTML
- Performance: Keep geometries, textures, and shader work lightweight

## AI Integration
The default ai-chat.js is structured for a pluggable backend. To integrate a real model/provider:
- Read VITE_AI_API_URL and VITE_AI_API_KEY from process.env via import.meta.env
- Send user prompts and render responses progressively
- Implement basic safety and rate limiting

## 3D Assets & Performance
- Use compressed textures (e.g., WebP/AVIF) and efficient models (GLTF/GLB)
- Consider Draco/KTX2 for model/texture compression
- Limit draw calls; batch where possible
- Prefer baked lighting for static scenes

## Deployment
- Static hosting: npm run build then deploy dist/ to Netlify, Vercel, GitHub Pages, or any static host
- GitHub Pages quick start:
  - Build: npm run build
  - Deploy: push dist/ via your chosen workflow or use a GitHub Action

## Roadmap
- WebXR (VR/AR) support
- Real AI backend integration
- Content Management (headless CMS)
- More advanced post-processing effects

## Contributing
- Fork the repo
- Create a feature branch: git checkout -b feature/awesome
- Commit changes: git commit -m "feat: add awesome"
- Push: git push origin feature/awesome
- Open a Pull Request

## License
MIT. See LICENSE for details.

## Contact
- Email: ajaysinghdodiya@gmail.com
- LinkedIn: https://www.linkedin.com/in/ajay-singh-dodiya-68a147231/
- GitHub: Ajaydodiya7773
- Website:https://a-ipowerd-portfolio3-d.vercel.app/

—
Built with ❤️ using Three.js, GSAP, and Vite.
