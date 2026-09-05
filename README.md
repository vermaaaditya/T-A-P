# 🎓 T-A-P — The Accountability Portal

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12.18-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

**T-A-P (The Accountability Portal)** is a state-of-the-art, real-time academic governance and transparency platform designed to bridge communication between **Students**, **Class Representatives (CRs)**, and **Faculty Members**. 

It eliminates attendance ambiguity, enforces faculty lecture punctuality, provides anonymous lecture clarity feedback loops, and enables streamlined dispute escalations to Department Heads (HODs) and Deans.

---

## ✨ Key Features

### 👨‍🎓 Student Portal
* **Visual Attendance Tracker**: SVG circular progress meter displaying real-time attendance percentage against mandatory institutional thresholds (80%).
* **Absence Allowance Calculator**: Calculates exactly how many classes a student can afford to miss before becoming ineligible for examinations.
* **Anonymous Clarity Polls**: Post-lecture 1–5 star rating system for students to anonymously flag unclear lectures without fear of retribution.
* **Dispute Ticket Manager**: Raise formal disputes with proof upload options (e.g., medical certificates or technical glitches) directly to the HOD.

### 🚩 Class Representative (CR) Portal
* **Live Class Monitor**: Real-time overview of current period status across all department lecture halls.
* **One-Click Faculty No-Show Flagging**: Instant escalation to HOD/Dean if a faculty member fails to report to class without prior cancellation.
* **Batch Clarity Oversight**: Track aggregated clarity scores across all subjects for the current semester.

### 👩‍🏫 Faculty & HOD Dashboard
* **Live Lecture Status Broadcast**: Toggle class statuses in real-time (*In Class*, *Running Late*, *Cancelled*).
* **Clarity Analytics & Auto-Scheduling**: Automatic detection when student clarity drops below threshold, allowing teachers to schedule doubt-clearing sessions with one click.
* **Dispute Resolution Hub**: Review and accept/reject student attendance dispute claims.

---

## ⚡ Tech Stack & Architecture

* **Frontend**: React 18, React Router v6, Lucide React Icons
* **Build System**: Vite 5
* **Styling**: Custom CSS Design System featuring Glassmorphism, Dark/Light Mode CSS Variables, and Smooth Micro-animations
* **Database & Backend**: Firebase Cloud Firestore (Real-time snapshot listeners `onSnapshot`)

---

## 📁 Repository Structure

```
The Accountability portal/
├── firestore.rules          # Firebase Cloud Firestore security rules
├── index.html               # Entry HTML document
├── package.json             # NPM dependencies and script configs
├── vite.config.js           # Vite build configuration
└── src/
    ├── App.jsx              # Main App Routing & Shell Layout
    ├── main.jsx             # React DOM Root Entrypoint
    ├── index.css            # Comprehensive CSS Variables & UI Design System
    ├── components/          # Reusable UI components (AttendanceRing, Toast, Sidebar)
    ├── context/             # AppContext (Global State & Firebase Realtime Sync)
    ├── firebase/            # Firebase SDK configuration
    └── pages/               # Multi-role Pages & Dashboards
        ├── LoginPage.jsx    # Role Selector & Login Page
        ├── student/         # Student Dashboard, Attendance, Polls, Disputes
        ├── teacher/         # Faculty Dashboard, My Lectures, Clarity Reports
        └── cr/              # Class Rep Dashboard, Flagging & Status Overseer
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18+) and npm installed on your system.

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/vermaaaditya/T-A-P.git
   cd T-A-P
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup (Optional)**
   Create a `.env` file in the root directory with your Firebase configuration keys:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

---

## 🔒 Firebase Firestore Security Rules

To secure your Cloud Firestore collections (`lectures`, `clarityReports`, `disputes`), deploy the included [`firestore.rules`](file:///c:/Users/Aaditya%20Verma/Desktop/The%20Accountability%20portal/firestore.rules):

```bash
firebase deploy --only firestore:rules
```

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
