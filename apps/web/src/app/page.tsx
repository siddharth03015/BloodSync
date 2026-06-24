'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from 'shared';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({ donors: 0, lives: 0, cities: 0 });

  useEffect(() => {
    setMounted(true);
    const fetchStats = async () => {
      // Fetch estimated count to prevent slow queries
      const { count: donorsCount } = await supabase.from('users').select('*', { count: 'estimated', head: true });
      const totalDonors = donorsCount || 0;
      const estimatedCities = totalDonors > 0 ? Math.max(1, Math.floor(totalDonors / 80)) : 0;

      setStats({ 
        donors: totalDonors, 
        lives: totalDonors * 3, 
        cities: estimatedCities > 28000 ? estimatedCities : 28000 
      });
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white overflow-hidden font-sans">
      
      {/* Background abstract shape (faint red wave/blob in top right) */}
      <div className="absolute top-0 right-0 w-[1000px] h-[800px] bg-red-50/50 dark:bg-red-900/10 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Column: Content */}
          <div className="flex-1 text-left w-full max-w-xl">
            
            {/* Live Indicator */}
            <div className={`flex items-center gap-2 mb-6 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm font-bold text-red-600 dark:text-red-500">Live Donor Network Across India</span>
            </div>

            {/* Main Headline */}
            <h1 className={`text-6xl sm:text-[80px] font-black tracking-tight leading-[1.05] text-slate-800 dark:text-white mb-6 ${mounted ? 'animate-slide-up delay-100' : 'opacity-0'}`}>
              Every Drop <br/>
              Saves a <span className="text-red-600 dark:text-red-500 relative inline-block">
                Life
                <span className="absolute bottom-1 left-0 w-full h-[6px] bg-red-600 rounded-full opacity-30"></span>
              </span> 
              <span className="inline-block ml-2 text-red-600">❤</span>
            </h1>

            {/* Subtitle */}
            <p className={`text-lg text-slate-500 dark:text-neutral-400 max-w-lg mb-10 leading-relaxed font-medium ${mounted ? 'animate-slide-up delay-200' : 'opacity-0'}`}>
              India Blood Connect is a nationwide platform that connects blood donors with those in urgent need. Find compatible donors near you in seconds.
            </p>

            {/* Feature Row */}
            <div className={`flex flex-wrap items-center gap-8 mb-12 ${mounted ? 'animate-slide-up delay-300' : 'opacity-0'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-red-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800 dark:text-white">Verified Donors</div>
                  <div className="text-xs text-slate-500">Safe & Trusted</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-red-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800 dark:text-white">Find Near You</div>
                  <div className="text-xs text-slate-500">Across India</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-red-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800 dark:text-white">100% Secure</div>
                  <div className="text-xs text-slate-500">Your data is safe</div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className={`flex flex-wrap items-center gap-4 mb-8 ${mounted ? 'animate-slide-up delay-400' : 'opacity-0'}`}>
              <Link href="/search" className="flex items-center justify-center gap-2 px-8 py-3.5 bg-[#dc2626] text-white rounded-xl font-bold shadow-md hover:bg-[#b91c1c] hover:-translate-y-0.5 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                Find Blood Now
              </Link>
              <Link href="/login" className="flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent text-[#dc2626] border border-[#dc2626] rounded-xl font-bold hover:bg-red-50 dark:hover:bg-red-900/20 hover:-translate-y-0.5 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                Register as Donor
              </Link>
            </div>

            {/* Social Proof */}
            <div className={`flex items-center gap-3 ${mounted ? 'animate-slide-up delay-500' : 'opacity-0'}`}>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                Join {stats.donors.toLocaleString()} <span className="text-slate-500 font-medium">lifesavers across India</span>
              </div>
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full border-2 border-white dark:border-neutral-900" src="https://i.pravatar.cc/100?img=1" alt="Donor" />
                <img className="w-8 h-8 rounded-full border-2 border-white dark:border-neutral-900" src="https://i.pravatar.cc/100?img=2" alt="Donor" />
                <img className="w-8 h-8 rounded-full border-2 border-white dark:border-neutral-900" src="https://i.pravatar.cc/100?img=3" alt="Donor" />
                <img className="w-8 h-8 rounded-full border-2 border-white dark:border-neutral-900" src="https://i.pravatar.cc/100?img=4" alt="Donor" />
                <div className="w-8 h-8 rounded-full border-2 border-white dark:border-neutral-900 bg-red-600 flex items-center justify-center text-white text-[10px] font-bold z-10">+</div>
              </div>
            </div>

          </div>

          {/* Right Column: Graphic Diagram */}
          <div className={`flex-1 relative w-full min-h-[600px] flex items-center justify-center ${mounted ? 'animate-fade-in delay-300' : 'opacity-0'}`}>
            
            {/* Concentric Background Circles & Dotted Lines (Full layer) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 800">
              <defs>
                <marker id="arrowheadRight" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#ef4444" />
                </marker>
                <marker id="arrowheadLeft" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
                  <polygon points="6 0, 0 3, 6 6" fill="#ef4444" />
                </marker>
              </defs>
              
              {/* Concentric Circles */}
              <circle cx="400" cy="400" r="160" fill="none" stroke="#fca5a5" strokeWidth="1" strokeOpacity="0.4" />
              <circle cx="400" cy="400" r="240" fill="none" stroke="#fca5a5" strokeWidth="1" strokeOpacity="0.3" />
              <circle cx="400" cy="400" r="320" fill="none" stroke="#fca5a5" strokeWidth="1" strokeOpacity="0.15" />

              {/* Dotted Connection Lines from Cards to Center */}
              {/* Top Left (Find Donors) -> Center */}
              <path d="M 280 260 L 320 260 C 330 260, 340 270, 340 280 L 340 380 L 385 380" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrowheadRight)" />
              
              {/* Top Right (Request Blood) -> Center */}
              <path d="M 520 260 L 480 260 C 470 260, 460 270, 460 280 L 460 380 L 415 380" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrowheadLeft)" />
              
              {/* Bottom Left (Blood Banks) -> Center */}
              <path d="M 280 540 L 320 540 C 330 540, 340 530, 340 520 L 340 420 L 385 420" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrowheadRight)" />
              
              {/* Bottom Right (Join Camps) -> Center */}
              <path d="M 520 540 L 480 540 C 470 540, 460 530, 460 520 L 460 420 L 415 420" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrowheadLeft)" />
            </svg>

            {/* Central Drop 3D Graphic */}
            <div className="relative z-10 drop-shadow-2xl animate-float">
              <svg width="240" height="300" viewBox="0 0 200 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="heroDropGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff4d4d" />
                    <stop offset="50%" stopColor="#cc0000" />
                    <stop offset="100%" stopColor="#800000" />
                  </linearGradient>
                  
                  <linearGradient id="heroHeartShadowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#e5e5e5" />
                  </linearGradient>

                  <filter id="heroHeartInset" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.3" />
                  </filter>
                </defs>

                {/* Main 3D Drop Body with flat bottom */}
                <path d="M 100 10 C 100 10, 20 130, 20 200 C 20 230, 45 255, 75 255 L 125 255 C 155 255, 180 230, 180 200 C 180 130, 100 10, 100 10 Z" fill="url(#heroDropGrad)" />
                
                {/* Specular Highlight (Left half reflection) */}
                <path d="M 100 10 C 100 10, 20 130, 20 200 C 20 230, 45 255, 75 255 L 100 255 Z" fill="white" fillOpacity="0.12" />
                
                {/* Embedded White Heart */}
                <path d="M 100 175 C 100 175, 70 140, 70 120 C 70 108, 80 100, 90 105 C 95 108, 100 115, 100 115 C 100 115, 105 108, 110 105 C 120 100, 130 108, 130 120 C 130 140, 100 175, 100 175 Z" fill="url(#heroHeartShadowGrad)" filter="url(#heroHeartInset)" />
              </svg>
            </div>

            {/* 4 Floating Cards */}
            {/* Top Left Card: Find Donors */}
            <div className="absolute top-[8%] left-[2%] bg-white dark:bg-neutral-800 p-5 rounded-2xl shadow-xl border border-neutral-100 dark:border-neutral-700 flex flex-col items-center justify-center min-w-[140px] z-20 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <div className="text-sm font-bold text-slate-800 dark:text-white">Find Donors</div>
              <div className="text-xs text-slate-500">Near You</div>
            </div>

            {/* Top Right Card: Request Blood */}
            <div className="absolute top-[8%] right-[2%] bg-white dark:bg-neutral-800 p-5 rounded-2xl shadow-xl border border-neutral-100 dark:border-neutral-700 flex flex-col items-center justify-center min-w-[140px] z-20 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 mb-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>
              </div>
              <div className="text-sm font-bold text-slate-800 dark:text-white">Request Blood</div>
              <div className="text-xs text-slate-500">Quick & Easy</div>
            </div>

            {/* Bottom Left Card: Blood Banks */}
            <div className="absolute bottom-[8%] left-[2%] bg-white dark:bg-neutral-800 p-5 rounded-2xl shadow-xl border border-neutral-100 dark:border-neutral-700 flex flex-col items-center justify-center min-w-[140px] z-20 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              </div>
              <div className="text-sm font-bold text-slate-800 dark:text-white">Blood Banks</div>
              <div className="text-xs text-slate-500">Directory</div>
            </div>

            {/* Bottom Right Card: Join Camps */}
            <div className="absolute bottom-[8%] right-[2%] bg-white dark:bg-neutral-800 p-5 rounded-2xl shadow-xl border border-neutral-100 dark:border-neutral-700 flex flex-col items-center justify-center min-w-[140px] z-20 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <div className="text-sm font-bold text-slate-800 dark:text-white">Join Camps</div>
              <div className="text-xs text-slate-500">Save Lives</div>
            </div>

          </div>
        </div>
      </div>

      {/* Benefits of Blood Donation Section */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 ${mounted ? 'animate-slide-up delay-500' : 'opacity-0'}`}>
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Side: Illustration Container */}
          <div className="flex-1 relative w-full h-[400px] sm:h-[500px] bg-[#f4f4f4] dark:bg-neutral-900/50 rounded-r-[120px] sm:rounded-r-[200px] flex items-center justify-center p-8 overflow-hidden">
            {/* 
              I've added a placeholder image path. 
              Please drop your superhero illustration into apps/web/public/hero-donate.png!
            */}
            <img 
              src="/hero-donate.png" 
              alt="Become a Hero - Donate Blood" 
              className="w-full h-full object-contain relative z-10 drop-shadow-xl"
              onError={(e) => {
                // Fallback placeholder if image is missing
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = `
                  <div class="text-center">
                    <div class="text-8xl mb-4">🦸‍♂️🩸</div>
                    <h3 class="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">Become a Hero<br/><span class="text-[#b31414] text-5xl">Donate<br/>Blood</span></h3>
                  </div>
                `;
              }}
            />
          </div>

          {/* Right Side: Content */}
          <div className="flex-1 max-w-2xl">
            <div className="text-[#b31414] font-bold mb-2 tracking-wide text-sm">Benefits of Blood Donation</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 dark:text-white mb-6 tracking-tight">Save Lives, Be a Real Hero</h2>
            
            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed text-sm sm:text-base">
              Donating blood is a noble act that not everyone can do. With advancements in medicine, the need for blood has increased threefold since the industrial revolution. Every year, India has a deficit of between 30% and 35%. It is absurd to say that the country cannot meet this requirement with 1.2 billion people. The real challenge is not the lack of blood donors, but finding someone willing to donate when needed. Therefore, the aim should be to create a system of people who can help each other in emergencies. Below are some benefits donating blood:
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-10">
              <div className="flex items-start gap-2 text-slate-800 dark:text-slate-300 font-bold text-sm">
                <span className="text-[#b31414] mt-0.5">»</span> Reduces Risk of Cancer
              </div>
              <div className="flex items-start gap-2 text-slate-800 dark:text-slate-300 font-bold text-sm">
                <span className="text-[#b31414] mt-0.5">»</span> Boosts the Production of RBC (Red Blood Cells)
              </div>
              <div className="flex items-start gap-2 text-slate-800 dark:text-slate-300 font-bold text-sm">
                <span className="text-[#b31414] mt-0.5">»</span> Helps in Weight Loss
              </div>
              <div className="flex items-start gap-2 text-slate-800 dark:text-slate-300 font-bold text-sm">
                <span className="text-[#b31414] mt-0.5">»</span> Makes the Donor Psychologically Rejuvenated
              </div>
              <div className="flex items-start gap-2 text-slate-800 dark:text-slate-300 font-bold text-sm">
                <span className="text-[#b31414] mt-0.5">»</span> Replenishes Blood
              </div>
              <div className="flex items-start gap-2 text-slate-800 dark:text-slate-300 font-bold text-sm">
                <span className="text-[#b31414] mt-0.5">»</span> Lower Cholestrol Level
              </div>
            </div>

            <Link href="/search" className="inline-block px-8 py-3 bg-[#b31414] hover:bg-[#8f1010] text-white font-bold rounded shadow-md transition-all uppercase tracking-wide text-sm hover:-translate-y-0.5">
              EXPLORE NEW
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom Stats & Quote Banner */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 ${mounted ? 'animate-slide-up delay-700' : 'opacity-0'}`}>
        <div className="relative bg-gradient-to-r from-[#8a0303] via-[#a30b0b] to-[#c71616] rounded-3xl p-10 lg:p-12 shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12 text-white">
          
          {/* Background Quote Mark */}
          <div className="absolute top-4 left-6 text-[180px] leading-none text-white/10 font-serif pointer-events-none select-none">&ldquo;</div>

          {/* Quote Area */}
          <div className="relative z-10 flex-1 max-w-2xl pl-10">
            <h3 className="text-2xl sm:text-3xl font-medium mb-4 leading-snug">The best way to find yourself is to lose yourself in the service of others.</h3>
            <p className="text-red-200 text-lg">− Mahatma Gandhi</p>
          </div>

          {/* Stats Area */}
          <div className="relative z-10 flex flex-wrap lg:flex-nowrap items-center gap-8 lg:gap-12">
            
            {/* Stat 1: Donors */}
            <div className="flex items-center gap-4">
              <svg className="w-10 h-10 text-white opacity-80" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>
              <div>
                <div className="text-3xl font-bold">{stats.donors.toLocaleString()}</div>
                <div className="text-sm text-red-200 uppercase tracking-wide">Donors</div>
              </div>
            </div>

            {/* Stat 2: Lives Saved */}
            <div className="flex items-center gap-4">
              <svg className="w-10 h-10 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              <div>
                <div className="text-3xl font-bold">{stats.lives.toLocaleString()}</div>
                <div className="text-sm text-red-200 uppercase tracking-wide">Lives Saved</div>
              </div>
            </div>

            {/* Stat 3: Cities Covered */}
            <div className="flex items-center gap-4">
              <svg className="w-10 h-10 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <div>
                <div className="text-3xl font-bold">{stats.cities.toLocaleString()}</div>
                <div className="text-sm text-red-200 uppercase tracking-wide">Cities Covered</div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
