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

Features Implemented

1:Dashboard Screen
The Dashboard screen includes a multi-layered interface broken into the following components:

Sidebar (Left-aligned)
A vertical sidebar with icons, providing quick navigation or future module access.

Top Navigation Bar
Contains:
A search bar for quick access
A module selector with options like:
Charging Station
Parking
Fleet Sizing

Active Module Window
Displays content based on the selected module:
Shows the Best Scenarios for that module
Includes a graph/visualization area
Lists the currently active/selected variables

Graph Visualization
Graph renders data points based on selected variables
Hovering on a data point reveals the Details Card with contextual info
Smooth fade-in animation for hover interaction

Key Performance Indicators/Variables Panel
Helps users understand which parameters are affecting the graph


2: Edit Variables – Slide-Over Panel Functionality
The Edit Variables Panel is an interactive, right-side slide-over card that allows users to explore and modify variables influencing the graph.

Features of the Edit Panel

Search Input
Positioned at the top for real-time filtering of variables by name.
Case-insensitive search for smooth UX.
Category-wise Variable Listing
Variables are grouped and rendered by their category.
Each variable displays a selectable chip-like UI to toggle selection.
Hover Interaction for Contextual Details
On hover (1.5 seconds delay) over any variable:
A contextual window appears below showing:
The variable's name
Its description
An Edit button to modify it

Edit Functionality
On clicking the Edit button:
A form opens inline, allowing the user to:
Edit monthly cost values
Update description
Change the category
Toggle selected state


3: Graph & Performance Integration
Selected Variables:
Appear in the main Graph dropdown
Data points is visualized of selected dropdown item
The first four selected variables are also displayed as performance indicators


4: Authentication
Firebase-based login (Email/Password and Google OAuth).


Tech Stack
React 18 + Vite
TypeScript
Redux Toolkit (state management)
React Router DOM (navigation)
Tailwind CSS (UI styling)
Firebase Authentication (login)
Lucide React Icons (icons)
MagicUi (for those little UI enhancements)



Technical Decisions & Trade-offs
Used Vite for fast build
Redux Toolkit	For global variable and module state syncing
Tailwind CSS	Rapid UI development with design accuracy
Custom form state	Local state within form until saved avoids partial/incomplete updates
Firebase Auth	Quick, secure setup with built-in providers


Known Limitations
Data is not persisted to a backend (stored only in Redux store).
No unit or integration tests because edge case scenario is minimal due to dummy data.
Validation is basic and assumes correct usage.
error and loading states are minimal since dummy data is used


Time Spent
Requirement Gathering and understanding: 1hr
High level data and user flow design: 1hr
Firebase Auth Setup: 1 hr
Redux & Types Setup: 30min
Dashboard + Graph + Variables Panel: 2 hrs
Slide-Over Edit Panel: 1hrs
Edit Variable Form + Cost Handling + State Sync: 1hrs
Hover Card Interaction: 30min
Code refactoring and documentation: 45min;
Total: 9 hours


Final Notes
All interactions follow Figma’s UX guidance.
Product Level user flow may have a slight difference since figma was very unclear.
UI and interactions are optimized for clarity, speed, and responsiveness.

Built with ❤️ by Jiya!
Looking forward to hear back!