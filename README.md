# 🏙️ SheharFix – Civic Issue Reporting Platform

A **role-based civic engagement platform** that empowers **citizens** to report issues via a **mobile-first app** and enables **administrators** to track, manage, and resolve issues through a **web dashboard**.

---

## 🚀 Features

### 👤 Citizen Mobile App (Responsive, Mobile-first)
- 📍 Report civic issues with **photo/video + GPS location**
- 🎙️ Voice + text description (**multilingual support**)
- 📊 Track issue status: *Submitted → Acknowledged → In Progress → Resolved*
- 🏆 **Gamification**: earn points, badges, and leaderboard rankings
- 🌐 **Offline mode**: save reports & auto-upload when online
- 🔒 **Anonymous reporting** option for sensitive issues
- 🗺️ View **nearby issues** on an interactive map

### 🏢 Administrator Web Portal (Desktop-first)
- 📊 Dashboard with **summary statistics** of open / in-progress / resolved issues
- 🗂️ Assigned issues management: resolve, upload proof photos
- 🗺️ **Heatmap visualization** for ward/zone issue clustering
- 🤖 **AI-powered categorization & priority tagging**
- 👥 **User management**: monitor citizens and staff activity
- 📑 Export reports (**PDF / Excel**) for transparency & accountability

### 🔑 Authentication & Role-based Access
- Unified login system
- Role selection: **Citizen (mobile app)** or **Administrator (web portal)**

---

## 🛠️ Tech Stack
- **Frontend Framework:** Vite + React + TypeScript  
- **UI & Styling:** Tailwind CSS, Shadcn UI  
- **Backend:** Node.js (Express) or Python Flask *(choose based on your implementation)*  
- **Database:** MongoDB or MySQL / PostgreSQL  
- **Maps:** Google Maps API / OpenStreetMap  
- **AI Enhancements:** NLP for auto-categorization, ML for priority prediction  

---

# ⚡ Installation & Setup

## 1) Clone the repository
```bash
git clone https://github.com/<your-username>/SheharFix.git
cd SheharFix
```

## 2) Frontend (Vite + React + TS)
```bash
# from project root
npm install
npm run dev
```
- Opens at: http://localhost:5173
- API base URL default: `http://localhost:3001/api` as defined in `src/services/api.ts`.
  - To change it quickly, edit `src/services/api.ts` and update `API_BASE_URL`.
  - Alternatively, align the backend port to 3001 (see Backend section) to match the default.

## 3) Backend API (Express)
The backend lives in `backend/` and by default listens on port 4000 (configurable via `backend/.env` -> `PORT`).

```bash
cd backend
npm install
npm run dev   # or: npm start
```
- Default API URL: `http://localhost:4000/api`
- To match the frontend default (`http://localhost:3001/api`), either:
  - Set `PORT=3001` in `backend/.env`, or
  - Change the frontend `API_BASE_URL` in `src/services/api.ts`.

## 4) Machine Learning Service (FastAPI)
The ML service lives in `ML/` and runs on port 8000.

```bash
cd ML

# 1) Create virtual environment (Windows PowerShell)
python -m venv .venv
. .venv\Scripts\Activate.ps1

# 2) Install dependencies
pip install -r requirements.txt

# 3) Start ML API
uvicorn app:app --host 127.0.0.1 --port 8000 --log-level info
# or
python app.py
```

## 5) Build frontend for production
```bash
npm run build
```

## 6) Pull the latest changes
```bash
git pull origin main
```

---

## 🔧 Environment Variables
Create the following environment files as needed (do not commit them):

- `backend/.env`
  - `PORT=4000` (or `3001` to match frontend default)
  - `MONGODB_URI=<your-connection-string>`
  - `JWT_SECRET=<your-secret>`
  - Optional: Cloudinary keys if you enable cloud uploads

- Frontend API base URL is hardcoded by default in `src/services/api.ts` to `http://localhost:3001/api`.
  - Option A: Change the backend `PORT` to `3001`.
  - Option B: Edit `API_BASE_URL` in `src/services/api.ts` to point to your backend (e.g., `http://localhost:4000/api`).

---

## 🚀 Quick Start (Ports & Commands)

| Service   | Path         | Port  | Start Command                         |
|-----------|--------------|-------|----------------------------------------|
| Frontend  | `/`          | 5173  | `npm run dev`                          |
| Backend   | `backend/`   | 4000* | `cd backend && npm run dev`            |
| ML API    | `ML/`        | 8000  | `cd ML && uvicorn app:app --port 8000` |

`*` Set `PORT=3001` in `backend/.env` if you want to match the frontend default API base URL.


---

## 🛡️ Roadmap
- ✅ Role-based login
- ✅ Mobile-first citizen app
- ✅ Admin dashboard with analytics
- 🔲 AI-powered categorization
- 🔲 Push notifications (issue updates)
- 🔲 QR code-based ward entry
- 🔲 PDF/Excel exports and scheduled reports

---

## 🤝 Contributing
1. Fork the repo
2. Create a new branch
```bash
git checkout -b feature/new-feature
```
3. Commit your changes
```bash
git commit -m "feat: add new feature"
```
4. Push and open a Pull Request

---

## 🧰 Troubleshooting
- If the frontend can’t reach the API:
  - Ensure the backend is running and the port matches `API_BASE_URL` in `src/services/api.ts`.
  - Check CORS errors and confirm the backend allows requests from `http://localhost:5173`.
- Port already in use:
  - Change the port (backend via `backend/.env`, ML via the `--port` flag) or stop the conflicting process.
- ML model file missing:
  - Ensure `ML/garbage_pothole_streetlight.keras` exists. See logs printed by `app.py` when loading the model.

---
## Contributions by Kiyara
- Conducted research on civic engagement platforms and feature prioritization.
- Developed minor frontend components and UI enhancements using **React + Tailwind CSS**.
- Prepared presentation materials and showcased the project for **internal hackathon selection**.

**Live Demo:** [SheharFix Demo](https://lovable.dev/projects/604cbf6f-d9cd-4104-b6d0-ea6bb8259679)

------
## 📜 License
MIT License 2025 [Janhvi/CivicCrew]
