'use client';

import { useState } from 'react';
import { Search, Calendar, CalendarDays, CalendarCheck, CalendarRange } from 'lucide-react';

export default function Camps() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showPast, setShowPast] = useState(false);
  const [filter, setFilter] = useState('All Events');

  return (
    <div className="min-h-screen bg-[#ffffff] font-sans text-[#333333]">
      {/* Hero Section */}
      <div className="bg-[#f9f9f9] border-b border-[#e0e0e0] pt-16 pb-12 lg:pt-24 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#333333] mb-4">
            Donation Camps
          </h1>
          <p className="text-lg text-[#666666] max-w-2xl mx-auto">
            Discover upcoming blood donation camps across India.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Search & Filters Card */}
        <div className="bg-[#ffffff] rounded-[4px] p-6 border border-[#e0e0e0] mb-16 shadow-sm">
          
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="flex-1 w-full flex items-center bg-[#ffffff] border border-[#e0e0e0] rounded-[4px] px-4 py-3 focus-within:border-[#cc0000] transition-colors">
              <Search className="w-5 h-5 text-[#666666] mr-3" />
              <input 
                type="text" 
                placeholder="Search by title, city, or organizer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-[#333333] font-bold focus:outline-none placeholder-[#aaaaaa]"
              />
            </div>

            <div className="flex items-center gap-2 px-2">
              <input 
                type="checkbox" 
                id="showPast"
                checked={showPast}
                onChange={(e) => setShowPast(e.target.checked)}
                className="w-5 h-5 rounded text-[#cc0000] focus:ring-[#cc0000] border-[#e0e0e0] cursor-pointer"
              />
              <label htmlFor="showPast" className="text-sm font-bold text-[#333333] cursor-pointer">
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
                className={`flex items-center px-4 py-2 rounded-[4px] text-sm font-bold transition-colors whitespace-nowrap border ${
                  filter === f.label 
                    ? 'bg-[#cc0000] text-white border-[#cc0000]' 
                    : 'bg-[#ffffff] text-[#333333] border-[#e0e0e0] hover:bg-[#f4f4f4]'
                }`}
              >
                {f.icon} {f.label}
              </button>
            ))}
          </div>

        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-20 text-center bg-[#f9f9f9] border border-[#e0e0e0]">
          <div className="w-20 h-20 bg-[#ffffff] border border-[#e0e0e0] rounded-full flex items-center justify-center text-[#cc0000] mb-6">
            <Calendar className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-[#333333] mb-2">No camps found</h2>
          <p className="text-[#666666]">Try a different search or check back later for upcoming events.</p>
        </div>

      </div>
    </div>
  );
}
