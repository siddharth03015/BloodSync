'use client';

import { useState } from 'react';
import { Search, Building2, MapPin } from 'lucide-react';

export default function BloodBanks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [state, setState] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    setSearched(true);
  };

  return (
    <div className="min-h-screen bg-[#fcfbfe] dark:bg-neutral-950 font-sans text-neutral-900 dark:text-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#4e3aa1] to-[#362180] text-white overflow-hidden pb-32">
        {/* Background cityscape silhouette */}
        <div className="absolute bottom-0 left-0 w-full h-[200px] opacity-20 pointer-events-none">
          <svg viewBox="0 0 1200 200" preserveAspectRatio="none" className="w-full h-full fill-current">
            <path d="M0 200V150h50v-30h40v30h60V80h80v70h40V120h60v30h50v-40h60v40h70V90h60v60h50v-20h60v20h80V60h70v90h50v-50h60v50h50v-30h60v30h50V100h40v50h50v50H0z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Content */}
            <div className="flex-1 text-left">
              <h1 className="text-5xl lg:text-6xl font-black tracking-tight mb-4">
                Blood Bank Directory
              </h1>
              <p className="text-xl text-indigo-100/90 font-medium max-w-lg">
                Find verified blood banks across India.
              </p>
            </div>

            {/* Right Graphic: CSS Hospital */}
            <div className="hidden lg:block flex-1 relative h-[250px] w-full">
              <div className="absolute bottom-0 right-10 flex flex-col items-center">
                {/* Hospital Sign */}
                <div className="w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-[#e8e4f5] z-20 -mb-8">
                  <div className="w-10 h-14 bg-red-600 rounded-t-full rounded-b-3xl relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"></div>
                  </div>
                </div>
                {/* Hospital Building */}
                <div className="w-80 h-48 bg-[#f5f3fa] rounded-t-3xl border-t-[16px] border-[#e8e4f5] relative shadow-2xl flex flex-col items-center">
                   <div className="bg-red-600 text-white text-[10px] font-black tracking-widest px-3 py-1 rounded mb-4 mt-2">BLOOD BANK</div>
                   {/* Windows Grid */}
                   <div className="grid grid-cols-4 gap-4 px-6 w-full">
                     {[...Array(8)].map((_, i) => (
                       <div key={i} className="h-8 bg-[#d8d2ea] rounded shadow-inner"></div>
                     ))}
                   </div>
                   {/* Door */}
                   <div className="absolute bottom-0 w-20 h-16 bg-[#d8d2ea] rounded-t-xl border-4 border-[#e8e4f5]"></div>
                </div>
                {/* Base */}
                <div className="w-[400px] h-4 bg-[#2a1768] rounded-full mt-2 blur-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        
        {/* Search Card */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-3 shadow-2xl shadow-indigo-900/10 border border-neutral-100 dark:border-neutral-800 flex flex-col md:flex-row items-center gap-2 mb-4">
          
          <div className="flex-1 w-full flex items-center px-4 py-2">
            <Search className="w-5 h-5 text-neutral-400 mr-3" />
            <input 
              type="text" 
              placeholder="Search by name, city, or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-neutral-900 dark:text-white font-medium focus:outline-none placeholder-neutral-400"
            />
          </div>

          <div className="hidden md:block w-px h-8 bg-neutral-200 dark:bg-neutral-800"></div>

          <div className="w-full md:w-64 flex items-center px-4 py-2">
            <select 
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full bg-transparent text-neutral-900 dark:text-white font-bold focus:outline-none cursor-pointer"
            >
              <option value="">All States</option>
              {['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Gujarat'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <button 
            onClick={handleSearch}
            className="w-full md:w-auto px-10 py-4 bg-[#5b40c7] hover:bg-[#4e3aa1] text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 transition-all active:scale-[0.98]"
          >
            Search
          </button>
        </div>

        {/* Popular Searches */}
        <div className="flex items-center gap-3 mb-16 overflow-x-auto pb-2">
          <span className="text-sm font-bold text-indigo-700 dark:text-indigo-400 whitespace-nowrap">Popular Searches:</span>
          {['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'].map(city => (
            <button key={city} className="px-4 py-1.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:border-indigo-500 hover:text-indigo-600 transition-colors whitespace-nowrap">
              {city}
            </button>
          ))}
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-500/10 rounded-full flex items-center justify-center text-[#5b40c7] mb-6">
            <Building2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-2">No blood banks found</h2>
          <p className="text-neutral-500">Try searching with a different location or check back later.</p>
        </div>

      </div>
    </div>
  );
}
