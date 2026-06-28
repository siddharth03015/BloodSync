<div align="center">
  <img src="https://www.transparenttextures.com/patterns/cubes.png" alt="B-Sync Banner" width="100%" height="200" style="object-fit: cover; border-radius: 12px; background: linear-gradient(135deg, #dc2626, #991b1b);">
  <br/>
  <h1>🩸 B-Sync</h1>
  <p><strong>A hyper-local, real-time blood donation network connecting donors with receivers instantly.</strong></p>
</div>

<br/>

## 🚀 Overview

**B-Sync** is a full-stack, real-time platform designed to eliminate the critical gap between blood donors and recipients. During medical emergencies, finding a matching blood donor nearby can be a matter of life and death. This platform solves that by utilizing geospatial queries to find donors within a 50km radius or in specific cities, and enables instant communication via a real-time messaging system.

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

## 🧠 Data Structures & Algorithms (DSA)

1. **Geospatial Proximity Algorithm (R-Tree / GiST Indexing & Haversine Formula)**
   - **Where:** Database via PostGIS (`search_donors_nearby` RPC).
   - **How it works:** When a user taps "Near Me", finding donors within a 50km radius utilizes `ST_DWithin` and `ST_Distance`. Under the hood, PostgreSQL uses **GiST (Generalized Search Tree)** indexes (similar to **R-Trees**) to quickly filter out coordinates that are far away using bounding boxes, and then applies a distance formula (like Haversine on a sphere) to calculate precise distances in meters for the remaining results.

2. **Directed Graph / Hash Map for Blood Compatibility**
   - **Where:** Shared logic utility (`packages/shared/src/index.ts`).
   - **How it works:** The blood compatibility logic is structured as a **Hash Map / Dictionary** acting as an **Adjacency List** for a directed graph. Finding who can donate to `A+` is an O(1) lookup in the Hash Map. The `getCanDonateTo` function uses an inverted lookup algorithm (iterating through the graph) to find all recipient nodes that a donor (e.g., `O-`) can donate to.

3. **Substring Matching & Array Slicing (City Autocomplete)**
   - **Where:** City search component (`CityAutocomplete.tsx`).
   - **How it works:** To search through 750+ Indian cities, the app uses a **Case-Insensitive Substring Matching** algorithm (`String.includes()`). To prevent DOM rendering bottlenecks, it uses an **Array Slicing** algorithmic approach (`.slice(0, 30)`), guaranteeing that the frontend only processes and renders the top 30 matches.

4. **Eventual Consistency State Management (Optimistic UI)**
   - **Where:** Real-time chat system.
   - **How it works:** When a user sends a message, the algorithm updates the local state array immediately (O(1) append) to show the message on the screen, assuming the server request will succeed. If the WebSocket connection drops or fails, it gracefully rolls back the local state.

---

## 🌟 Brilliant Engineering Features (Selling Points)

1. **Offloading Heavy Computation to the Database:** Instead of downloading thousands of user coordinates to the browser to find nearby donors, the project uses a custom **PL/pgSQL Remote Procedure Call (RPC)**. The database handles the heavy geographic math using PostGIS and only returns the final, exact list of matching donors. This is how enterprise apps like Uber or Tinder handle location scaling.
2. **Shared Monorepo Architecture:** By using Turborepo, the web application and the mobile application share the exact same database types and utility functions (in `packages/shared`). If the blood group matching logic changes, it's updated in one place, and both the website and the iOS/Android apps inherit the update instantly.
3. **Zero-Latency Chat Experience:** By combining Supabase Realtime WebSockets with Optimistic UI updates, messages appear on the screen instantly without waiting for a server round-trip, making the app feel incredibly responsive (critical for medical emergencies).
4. **Strict Row-Level Security (RLS):** Because medical data and locations are sensitive, the database is locked down with RLS. The PostgreSQL database itself enforces the rules—meaning even if an attacker bypassed the frontend, the database would mathematically prevent them from reading private chats or editing someone else's donor profile.
5. **Aesthetic, Frictionless UX:** With dynamic micro-animations, a comprehensive 750+ city dropdown, visual blood-matching badges, and full Dark Mode support built via Tailwind CSS, it provides a premium experience that encourages user trust and engagement.

---

## 💻 Getting Started (Local Development)

### Prerequisites
- Node.js (v18+)
- Supabase CLI (optional, for local DB)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/siddharth03015/B-Sync-.git
   cd B-Sync-
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


live link :https://bloodsync-web.vercel.app/
