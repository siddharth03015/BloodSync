'use client';

import { useState } from 'react';

export default function BloodBankClient({ initialBanks }: { initialBanks: any[] }) {
  const [search, setSearch] = useState('');
  const [stateFilter, setStateFilter] = useState('');

  const states = Array.from(new Set(initialBanks.map(b => b.state).filter(Boolean))).sort();

  const filtered = initialBanks.filter(bank => {
    const matchesSearch = !search ||
      bank.name.toLowerCase().includes(search.toLowerCase()) ||
      bank.city.toLowerCase().includes(search.toLowerCase()) ||
      (bank.address && bank.address.toLowerCase().includes(search.toLowerCase()));
    const matchesState = !stateFilter || bank.state === stateFilter;
    return matchesSearch && matchesState;
  });

  return (
    <div className="min-h-screen bg-[#ffffff] font-sans text-[#333333]">
      {/* Header */}
      <div className="bg-[#f9f9f9] border-b border-[#e0e0e0] py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">Blood Bank Directory</h1>
          <p className="text-[#666666] text-lg max-w-2xl mx-auto">Find verified blood banks across India</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Filters */}
        <div className="bg-[#ffffff] rounded-[4px] p-6 border border-[#e0e0e0] mb-8 flex flex-col sm:flex-row gap-4 shadow-sm">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, city, or address..."
            className="flex-1 px-4 py-3 bg-[#ffffff] border border-[#e0e0e0] rounded-[4px] focus:outline-none focus:border-[#cc0000] font-bold text-[#333333] placeholder-[#aaaaaa]"
          />
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="px-4 py-3 bg-[#ffffff] border border-[#e0e0e0] rounded-[4px] focus:outline-none focus:border-[#cc0000] font-bold text-[#333333] min-w-[180px]"
          >
            <option value="">All States</option>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Results */}
        <p className="text-sm font-bold text-[#666666] mb-4">{filtered.length} blood bank{filtered.length !== 1 ? 's' : ''} found</p>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-[#f9f9f9] border border-[#e0e0e0]">
            <h3 className="text-xl font-bold text-[#333333] mb-2">No blood banks found</h3>
            <p className="text-[#666666]">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((bank, idx) => (
              <div
                key={bank.id}
                className="bg-[#ffffff] rounded-[4px] p-6 border border-[#e0e0e0] flex flex-col justify-between"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-[#333333] leading-tight">{bank.name}</h3>
                  {bank.verified && (
                    <span className="flex-shrink-0 ml-2 inline-flex items-center gap-1 px-2 py-1 bg-[#e8f5e9] text-[#2e7d32] text-xs font-bold rounded-[4px]">
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#666666] mb-1 flex items-start gap-2">
                  {bank.address}
                </p>
                <p className="text-sm font-bold text-[#333333] mb-3">{bank.city}{bank.state ? `, ${bank.state}` : ''}</p>
                {bank.phone && (
                  <div className="text-sm text-[#cc0000] font-bold mt-2">
                    {bank.phone}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
