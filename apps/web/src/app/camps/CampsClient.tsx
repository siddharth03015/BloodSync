'use client';

import { useState } from 'react';

export default function CampsClient({ initialCamps }: { initialCamps: any[] }) {
  const [search, setSearch] = useState('');
  const [showPast, setShowPast] = useState(false);

  const now = new Date();

  const filtered = initialCamps.filter(camp => {
    const matchesSearch = !search ||
      camp.title.toLowerCase().includes(search.toLowerCase()) ||
      camp.city.toLowerCase().includes(search.toLowerCase()) ||
      (camp.organizer_name && camp.organizer_name.toLowerCase().includes(search.toLowerCase()));
    const campEnd = new Date(camp.date_end);
    const isUpcoming = campEnd >= now;
    return matchesSearch && (showPast || isUpcoming);
  });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  const getStatusBadge = (camp: any) => {
    const campEnd = new Date(camp.date_end);
    const campStart = new Date(camp.date_start);
    if (campEnd < now) return { text: 'Completed', color: 'bg-[#f4f4f4] text-[#666666] border-[#e0e0e0]' };
    if (campStart <= now && campEnd >= now) return { text: 'Happening Now', color: 'bg-[#e8f5e9] text-[#2e7d32] border-[#2e7d32]' };
    return { text: 'Upcoming', color: 'bg-[#fff0f0] text-[#cc0000] border-[#cc0000]' };
  };

  return (
    <div className="min-h-screen bg-[#ffffff] font-sans text-[#333333]">
      {/* Header */}
      <div className="bg-[#f9f9f9] border-b border-[#e0e0e0] py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">Donation Camps</h1>
          <p className="text-[#666666] text-lg max-w-2xl mx-auto">Discover upcoming blood donation camps across India</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Filters */}
        <div className="bg-[#ffffff] rounded-[4px] p-6 border border-[#e0e0e0] mb-8 flex flex-col sm:flex-row gap-4 items-center shadow-sm">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, city, or organizer..."
            className="flex-1 px-4 py-3 bg-[#ffffff] border border-[#e0e0e0] rounded-[4px] focus:outline-none focus:border-[#cc0000] font-bold text-[#333333] placeholder-[#aaaaaa]"
          />
          <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-[#333333] whitespace-nowrap">
            <input
              type="checkbox"
              checked={showPast}
              onChange={(e) => setShowPast(e.target.checked)}
              className="w-4 h-4 rounded text-[#cc0000] focus:ring-[#cc0000] border-[#e0e0e0]"
            />
            Show past camps
          </label>
        </div>

        <p className="text-sm font-bold text-[#666666] mb-4">{filtered.length} camp{filtered.length !== 1 ? 's' : ''} found</p>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-[#f9f9f9] border border-[#e0e0e0]">
            <h3 className="text-xl font-bold text-[#333333] mb-2">No camps found</h3>
            <p className="text-[#666666]">Check back later or try a different search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((camp, idx) => {
              const badge = getStatusBadge(camp);
              return (
                <div
                  key={camp.id}
                  className="bg-[#ffffff] rounded-[4px] p-6 border border-[#e0e0e0]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-[#333333]">{camp.title}</h3>
                    <span className={`flex-shrink-0 ml-2 px-2.5 py-1 text-xs font-bold rounded-[4px] border ${badge.color}`}>
                      {badge.text}
                    </span>
                  </div>

                  <p className="text-sm font-bold text-[#666666] mb-1">
                    Organized by: {camp.organizer_name}
                  </p>

                  <div className="space-y-2 mt-3 text-sm text-[#666666]">
                    <div className="flex items-center gap-2">
                      {camp.address}, {camp.city}
                    </div>
                    <div className="flex items-center gap-2">
                      {formatDate(camp.date_start)} — {formatDate(camp.date_end)}
                    </div>
                    {camp.contact_phone && (
                      <div className="flex items-center gap-2 text-[#cc0000] font-bold">
                        {camp.contact_phone}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
