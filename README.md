#  Data Visualization Platform 

A modern, interactive data visualization platform built with **React 18**, **TypeScript**, **Redux Toolkit**, and **Tailwind CSS**, designed as part of a take-home assignment for AnswersAI. This project demonstrates pixel-perfect design implementation, smooth interactive behavior, data flow and robust state management.

---

## Setup Instructions

1. **Clone the repository**

```bash
git clone git@github.com:jiyakeshwani/Data-Visualisation.git
cd Data-Visualisation
Install dependencies
npm install

Environment Variables

VITE_FIREBASE_API_KEY=AIzaSyDfCnqClp9qRiVMNM82aMo1EK2kX3XkE18
VITE_FIREBASE_AUTH_DOMAIN=datavizauth.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=datavizauth
VITE_FIREBASE_APP_ID=1:466322505035:web:1635362711f12b343b3cce
VITE_MEASUREMENT_ID=G-E9QQQ8F66Z
VITE_MESSAGING_SENDER_ID=466322505035
VITE_STORAGE_BUCKET=datavizauth.firebasestorage.app

Start development server
npm run dev

```
---
✅ Features Implemented

1. 🧭 Dashboard Screen
A multi-layered interface broken into modular components:

Sidebar (Left-aligned):

Vertical icon-based navigation for quick access and future expansion.

Top Navigation Bar:

Search bar for instant lookups

Module selector with options:

Charging Station

Parking

Fleet Sizing

Active Module Window:

Displays:

Best Scenarios for the selected module

Interactive graph/visualization

Active/selected variables list

Graph Visualization:

Plots data based on selected variables

Hovering on points reveals a Details Card

Smooth fade-in animations on hover

Key Performance Indicators Panel:

Shows key metrics affected by selected variables

2. ✏️ Edit Variables — Slide-Over Panel
An interactive right-side panel that enables real-time variable configuration.

Key Functionalities:
Search Input:

Top-positioned, case-insensitive filtering

Category-wise Listing:

Variables grouped by category

Chip-style toggle UI for selection

Hover Interaction (1.5s delay):

Contextual popup showing:

Variable name

Description

Edit button

Edit Flow:

Inline form with:

Monthly cost inputs

Description update

Category selection

Selection toggle

3. 📊 Graph & Performance Integration
Selected variables:

Appear in the graph dropdown

First four also shown as KPIs

Visualization:

Dynamic updates on variable selection

Smooth, responsive UI interaction

4. 🔐 Authentication
Firebase authentication via:

Email/Password

Google OAuth

🛠 Tech Stack
Framework: React 18 + Vite

Language: TypeScript

State Management: Redux Toolkit

Routing: React Router DOM

Styling: Tailwind CSS

Auth: Firebase Authentication

Icons: Lucide React

Enhancements: MagicUI (micro-interactions)

🧠 Technical Decisions & Trade-offs
Decision	Reasoning
Vite	Fast dev server & optimized build times
Redux Toolkit	Global syncing of variables & module state
Tailwind CSS	Rapid UI development with precision from Figma
Local Form State	Prevents partial updates until confirmed
Firebase Auth	Quick, secure setup with built-in OAuth options

⚠️ Known Limitations
No persistent backend (data lives in Redux store)

Minimal form validation

No unit/integration tests (low complexity due to dummy data)

Basic error/loading state handling

⏱️ Time Spent
Task	Time Spent
Requirement gathering & understanding	1 hr
High-level data & user flow design	1 hr
Firebase Auth setup	1 hr
Redux & Types setup	30 min
Dashboard + Graph + Variable Panel	2 hrs
Slide-Over Edit Panel	1 hr
Edit Variable Form & State Syncing	1 hr
Hover Card Interaction	30 min
Code refactoring & documentation	45 min
Total	9 hrs

📝 Final Notes
All interactions follow Figma’s UX guidelines

Slight variations may exist due to gaps in Figma specs

UI is optimized for clarity, performance, and responsiveness


Built with ❤️ by Jiya!

Looking forward to hear back!
