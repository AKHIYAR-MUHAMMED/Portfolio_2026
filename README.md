# 🌟 Akhiyaar Muhammed — Personal Portfolio 2026

Welcome to the repository of **Akhiyaar Muhammed's Personal Portfolio**. This project is a modern, high-performance, and visually stunning web application designed to showcase professional roles, data science projects, educational qualifications, full-stack achievements, community leadership, and certifications. 

The application is split into a highly interactive, responsive **React + Vite** frontend and a light-weight, asynchronous **FastAPI + MongoDB** backend to handle contact form submissions and status tracking.

---

## 🎨 Design & Aesthetic Highlights

- **Sleek Minimalist Dark Theme:** Immersive dark styling (`#0A0A0A` and pure blacks) with contrasting vibrant accents (`#FF6B00`).
- **Modern Typography:** Styled with standard display fonts (e.g., *Playfair Display*) and body text (*Inter*) for professional, premium readability.
- **Glassmorphic Elements:** Micro-interactions, blurred navigation panels, and hovering panels for a tactile, responsive feel.
- **Smooth Animations:** Powered by `framer-motion` for subtle transitions, viewport reveals, and section headers.
- **Fluid Layouts:** Highly mobile-responsive layouts adapting gracefully across devices.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** [React 18](https://react.dev/) (Functional components, hooks)
- **Bundler & Dev Server:** [Vite 5](https://vitejs.dev/) (Instant HMR, fast production builds)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with custom `@theme` variables for colors, fonts, and borders.
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** [Sonner](https://sonner.dev/) (Clean, modern toast alerts)
- **Networking:** Standard `fetch` API connecting to custom endpoints.

### Backend (API Server)
- **Framework:** [FastAPI](https://fastapi.tiangolo.com/) (Asynchronous, high-performance Python web framework)
- **Database client:** [Motor](https://motor.readthedocs.io/) (Asynchronous Python driver for MongoDB)
- **Database:** [MongoDB](https://www.mongodb.com/) (Document storage for contact forms and status checks)
- **Validation:** [Pydantic v2](https://docs.pydantic.dev/) for data schemas and validation.
- **SMTP Service:** Standard Python `smtplib` for email alerts to the site owner upon new messages.

---

## 📁 Repository Structure

```filepath
portfolio_2026/
├── .env                     # Local environment configurations (MongoDB, SMTP, CORS)
├── .gitignore               # Ignored files (node_modules, pycache, .env, builds)
├── index.html               # Main entry HTML document containing Google Fonts & Root Div
├── package.json             # Frontend dependencies, dev tools, and dev/build scripts
├── tailwind.config.js       # Custom Tailwind CSS rules (if required by loaders)
├── postcss.config.js        # PostCSS configuration for styling processors
├── vite.config.js           # Vite bundle settings & server configuration
├── portfolio.js             # Centralized profile data, education, projects, certifications
├── server.py                # FastAPI server (Routes, MongoDB client, Mail templates)
│
├── src/ (or root components)
│   ├── App.jsx              # App entry point, registers Toaster & Portfolio root
│   ├── Portfolio.jsx        # Parent layout composition linking all sub-sections
│   ├── Nav.jsx              # Responsive header navigation with active section highlighting
│   ├── Hero.jsx             # Splash intro featuring profile summary and interactive CTAs
│   ├── About.jsx            # Detailed professional bio, values, and location
│   ├── Skills.jsx           # Tabulated grid categorizing skills (Data Science, Full Stack, etc.)
│   ├── Experience.jsx       # Interactive timelines highlighting internships and analytical roles
│   ├── Projects.jsx         # Card-based showcase of ML, IoT, and Web dev applications
│   ├── Community.jsx        # Summary of leadership positions (CSI, Hack Club, IEDC)
│   ├── Writing.jsx          # Highlights of articles, blogs, and notebooks (Coming soon)
│   ├── Contact.jsx          # Interactive contact form checking validation, POSTing to server
│   ├── SectionHeader.jsx    # Standardized typography header for sections (kicker, title, index)
│   ├── Footer.jsx           # Copyright info, resume links, and quick-links
│   └── index.css            # Base stylesheet importing Tailwind and setting root styles
└── dist/                    # Compiled production assets (created after building)
```

---

## ⚙️ Configuration & Environment Variables

Create a `.env` file in the root directory to customize the FastAPI server and database behaviors.

```env
# MongoDB Credentials
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net
DB_NAME=portfolio

# Allowed CORS Origins (comma-separated, use '*' to allow all)
CORS_ORIGINS=*

# SMTP Credentials for Email Notifications
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
OWNER_EMAIL=recipient_email@gmail.com
```

---

## 🚀 Running the Project Locally

### 1. Prerequisite Setup

- Install [Node.js](https://nodejs.org/) (v18 or higher recommended).
- Install [Python 3.10+](https://www.python.org/) with `pip`.
- Access to a running MongoDB instance (either local or MongoDB Atlas).

### 2. Frontend Development

1. Navigate to the root directory and install node packages:
   ```bash
   npm install
   ```
2. Launch the Vite development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to the address shown (usually `http://localhost:5173`).

### 3. Backend Development

1. Create a Python virtual environment and activate it:
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```
2. Install the required python packages:
   ```bash
   pip install fastapi uvicorn motor motor-asyncio pydantic email-validator python-dotenv
   ```
3. Launch the FastAPI server using `uvicorn`:
   ```bash
   uvicorn server:app --reload --port 8000
   ```
4. Access the API documentation at `http://localhost:8000/docs` (Swagger UI) or `http://localhost:8000/redoc`.

---

## 📦 Production Deployment

### Frontend Build
To package and optimize the frontend for static hosting (e.g., Vercel, Netlify, GitHub Pages):
```bash
npm run build
```
This generates optimized HTML, JS, and CSS files inside the `/dist` directory.

### Backend Hosting
Deploy `server.py` to cloud platforms like Render, Railway, Heroku, or a VPS.
Ensure to set up the necessary Environment Variables on your hosting provider's dashboard.

---

## 👤 Author

**Akhiyaar Muhammed**
* Data Science Engineer & Full-Stack Developer
* Email: [akhiyaarmuhammed123@gmail.com](mailto:akhiyaarmuhammed123@gmail.com)
* LinkedIn: [Akhiyaar Muhammed](https://www.linkedin.com/)
* GitHub: [Akhiyaar](https://github.com/)

---
*Created with 💙 by Antigravity.*
