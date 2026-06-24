'use client';

import { useState } from 'react';
import { Search, Calendar, CalendarDays, CalendarCheck, CalendarRange } from 'lucide-react';

export default function Camps() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showPast, setShowPast] = useState(false);
  const [filter, setFilter] = useState('All Events');

  return (
    <div className="min-h-screen bg-[#f3f9f5] dark:bg-neutral-950 font-sans text-neutral-900 dark:text-white">
      {/* Hero Section */}
      <div className="relative bg-[#dcf4e4] dark:bg-[#1a3826] overflow-hidden pt-20 pb-32">
        
        {/* Background CSS Graphic: Trees and Park */}
        <div className="absolute bottom-0 right-0 w-full h-[200px] pointer-events-none z-0 flex justify-end items-end opacity-60">
          <div className="w-32 h-48 bg-emerald-700/20 rounded-t-full absolute right-64 -bottom-10 blur-sm"></div>
          <div className="w-40 h-64 bg-emerald-600/20 rounded-t-full absolute right-20 -bottom-20 blur-sm"></div>
          <div className="w-24 h-32 bg-emerald-800/20 rounded-t-full absolute right-96 -bottom-5 blur-sm"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Content */}
            <div className="flex-1 text-left">
              <h1 className="text-5xl lg:text-6xl font-black tracking-tight mb-4 text-[#1b4332] dark:text-emerald-50">
                Donation Camps
              </h1>
              <p className="text-xl text-[#2d6a4f] dark:text-emerald-200/80 font-medium max-w-lg">
                Discover upcoming blood donation camps across India.
              </p>
            </div>

            {/* Right Graphic: CSS Donation Tent */}
            <div className="hidden lg:block flex-1 relative h-[250px] w-full">
              <div className="absolute bottom-0 right-10 flex flex-col items-center">
                {/* Tent Canopy */}
                <div className="relative w-80 h-32 z-20">
                  <div className="absolute bottom-0 w-full h-24 bg-[#2d6a4f] rounded-t-3xl shadow-xl flex justify-center">
                     {/* Banner */}
                     <div className="mt-4 bg-white px-4 py-1.5 shadow-sm border border-emerald-100 flex items-center gap-2">
                       <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                       <span className="text-red-600 font-black text-xs tracking-wider">DONATE BLOOD</span>
                     </div>
                  </div>
                  {/* Tent Roof Peak */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent border-b-[80px] border-b-[#1b4332]"></div>
                </div>
                {/* Tent Legs */}
                <div className="flex justify-between w-[300px] z-10">
                  <div className="w-3 h-20 bg-neutral-300"></div>
                  <div className="w-3 h-20 bg-neutral-300"></div>
                  <div className="w-3 h-20 bg-neutral-300"></div>
                  <div className="w-3 h-20 bg-neutral-300"></div>
                </div>
                {/* Base Shadow */}
                <div className="w-[400px] h-6 bg-[#b7e4c7] dark:bg-emerald-900/50 rounded-full mt-0 blur-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        
        {/* Search & Filters Card */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-2xl shadow-emerald-900/5 border border-neutral-100 dark:border-neutral-800 mb-16">
          
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="flex-1 w-full flex items-center bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 focus-within:ring-2 ring-emerald-500/50 transition-all">
              <Search className="w-5 h-5 text-neutral-400 mr-3" />
              <input 
                type="text" 
                placeholder="Search by title, city, or organizer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-neutral-900 dark:text-white font-medium focus:outline-none placeholder-neutral-400"
              />
            </div>

            <div className="flex items-center gap-2 px-2">
              <input 
                type="checkbox" 
                id="showPast"
                checked={showPast}
                onChange={(e) => setShowPast(e.target.checked)}
                className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 border-neutral-300 cursor-pointer"
              />
              <label htmlFor="showPast" className="text-sm font-bold text-neutral-700 dark:text-neutral-300 cursor-pointer">
                Show past camps
              </label>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {[
              { label: 'All Events', icon: <Calendar className="w-4 h-4 mr-2" /> },
              { label: 'Today', icon: <CalendarDays className="w-4 h-4 mr-2" /> },
              { label: 'This Week', icon: <CalendarCheck className="w-4 h-4 mr-2" /> },
              { label: 'This Month', icon: <CalendarRange className="w-4 h-4 mr-2" /> },
            ].map(f => (
              <button 
                key={f.label}
                onClick={() => setFilter(f.label)}
                className={`flex items-center px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  filter === f.label 
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' 
                    : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                }`}
              >
                {f.icon} {f.label}
              </button>
            ))}
          </div>

        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white/50 dark:bg-neutral-900/50 rounded-3xl backdrop-blur-sm border border-emerald-50 dark:border-neutral-800/50">
          <div className="w-20 h-20 bg-[#dcf4e4] dark:bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-600 mb-6 shadow-inner">
            <Calendar className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-2">No camps found</h2>
          <p className="text-neutral-500">Try a different search or check back later for upcoming events.</p>
        </div>

      </div>
    </div>
  );
}
