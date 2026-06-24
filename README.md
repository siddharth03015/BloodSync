<div align="center">
  <img src="https://www.transparenttextures.com/patterns/cubes.png" alt="India Blood Connect Banner" width="100%" height="200" style="object-fit: cover; border-radius: 12px; background: linear-gradient(135deg, #dc2626, #991b1b);">
  <br/>
  <h1>🩸 India Blood Connect</h1>
  <p><strong>A hyper-local, real-time blood donation network connecting donors with receivers instantly.</strong></p>
</div>

<br/>

## 🚀 Overview

**India Blood Connect** is a full-stack, real-time platform designed to eliminate the critical gap between blood donors and recipients. During medical emergencies, finding a matching blood donor nearby can be a matter of life and death. This platform solves that by utilizing geospatial queries to find donors within a 50km radius or in specific cities, and enables instant communication via a real-time messaging system.

This project was engineered with a focus on speed, modern UI/UX, and scalability, utilizing a robust monorepo architecture.

---

## ✨ Core Features

* **📍 Geospatial Donor Search:** Built with PostgreSQL PostGIS. Users can tap "Near Me" to use their device GPS and instantly find donors within a 50km radius, sorted by distance.
* **🏙️ Comprehensive City Search:** Features a custom fuzzy-search autocomplete component loaded with over 750+ major and minor Indian cities, allowing precise location-based filtering.
* **💬 Real-Time Chat System:** Integrated with Supabase Realtime (WebSockets) to facilitate instant, direct communication between the recipient and the donor. Features optimistic UI updates for zero-latency message rendering.
* **🩸 Smart Blood Group Matching:** Visual badges mapping exactly who can donate to whom (e.g., O- universal donor logic).
* **📚 Educational Hub:** Interactive pages detailing the blood donation process, pre/post-donation pursuits, and guidelines, complemented by custom aesthetic doodle illustrations.
* **🏥 Blood Camps & Banks Ecosystem:** Dedicated platform modules for discovering verified blood banks and dynamically registering new blood donation camps across India.
* **🛡️ Trust & Engagement:** Comprehensive and accessible Privacy Policy, Terms of Service, About Us (with vision/mission statements), and Contact platforms fully integrated to build a trustworthy network.
* **🌓 Modern UI/UX:** Stunning, responsive interface built with Tailwind CSS. Includes a premium custom SVG-based branding logo, full Dark Mode support, glassmorphism overlays, and smooth micro-animations for an exceptional user experience.

---

## 🛠️ Technology Stack

This application is built using a modern, scalable tech stack suitable for enterprise-level applications:

### Frontend
* **Next.js 14 (App Router):** Leveraging server-side rendering (SSR) and React Server Components for optimal performance and SEO.
* **React 18:** For dynamic, client-side interactive components.
* **Tailwind CSS:** Utility-first CSS framework used for rapid, fully responsive, and deeply customized styling (including custom themes and animations).
* **TypeScript:** For strict type-checking, reducing runtime errors, and improving code maintainability.

### Backend & Database
* **Supabase:** Open-source Firebase alternative used for the entire backend infrastructure.
* **PostgreSQL:** The core database.
* **PostGIS Extension:** Used to calculate precise distances (in meters) between coordinates (`ST_Distance`, `ST_DWithin`) via an optimized RPC (`search_donors_nearby`).
* **Supabase Realtime:** Powers the live chat system using WebSockets.
* **Supabase Auth:** Handles secure user authentication and session management.
* **Row Level Security (RLS):** Strictly enforced database security rules ensuring users can only edit their own messages and profiles, while safely exposing public profiles for the search ecosystem.

### Architecture
* **Turborepo / NPM Workspaces:** Configured as a monorepo containing `apps/web` (Next.js frontend), `apps/mobile` (React Native/Expo), and `packages/shared` (Database schema, TypeScript interfaces, and shared utility functions).

---

## 🧠 Technical Highlights (For Interviewers)

1. **Complex SQL RPC for Proximity Search:**
   Instead of filtering locations on the client, the backend utilizes a custom PL/pgSQL function that takes the user's latitude/longitude and executes a PostGIS query to return only available, matching donors within the specified radius.
   
2. **Optimistic UI in Live Chat:**
   The chat system applies messages to the DOM *before* confirming the database insertion. This masks network latency, making the chat feel instantaneous. If the server request fails, the UI rolls back gracefully and displays an error state.

3. **Database Security (RLS):**
   Implemented strict Row-Level Security policies. For example, users can only read messages where their `user_id` is the sender or receiver, preventing unauthorized access to private chats.

4. **Monorepo Architecture:**
   The codebase is structured to scale into a cross-platform product. The database client, shared types, and constants (like blood group matching algorithms) are abstracted into a `packages/shared` folder, ensuring 100% logic sync between the Web App and future Mobile App.

---

## 💻 Getting Started (Local Development)

### Prerequisites
- Node.js (v18+)
- Supabase CLI (optional, for local DB)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/siddharth03015/India-Blood-Connect-.git
   cd India-Blood-Connect-
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file inside `apps/web/` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev:web
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 License
This project is licensed under the MIT License.


live link :https://india-blood-connect-web.vercel.app/
