'use client';

import { useState, useEffect } from 'react';
import { supabase } from 'shared';
import { Search, Building2, MapPin, CheckCircle2 } from 'lucide-react';

const INDIAN_STATES = [
  'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 
  'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 
  'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 
  'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

export default function BloodBanks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [bloodBanks, setBloodBanks] = useState<any[]>([]);

  useEffect(() => {
    fetchBloodBanks();
  }, []);

  const fetchBloodBanks = async (query = '', selectedState = '') => {
    setLoading(true);
    let request = supabase.from('blood_banks').select('*').order('name');
    
    if (query) {
      request = request.or(`name.ilike.%${query}%,city.ilike.%${query}%`);
    }
    if (selectedState) {
      request = request.eq('state', selectedState);
    }
    
    const { data, error } = await request;
    if (!error && data) {
      setBloodBanks(data);
    }
    setLoading(false);
  };

  const handleSearch = () => {
    fetchBloodBanks(searchQuery, stateFilter);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="min-h-screen bg-[#ffffff] font-sans text-[#333333]">
      {/* Hero Section */}
      <div className="bg-[#f9f9f9] border-b border-[#e0e0e0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 lg:pt-24 lg:pb-16 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#333333] mb-6">
            Blood Bank Directory
          </h1>
          <p className="text-lg text-[#666666] max-w-2xl mx-auto leading-relaxed">
            Find verified blood banks across India.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Search Card */}
        <div className="bg-[#ffffff] rounded-[4px] p-4 border border-[#e0e0e0] flex flex-col md:flex-row items-center gap-4 mb-8 shadow-sm">
          
          <div className="flex-1 w-full flex items-center px-4 py-2">
            <Search className="w-5 h-5 text-[#666666] mr-3" />
            <input 
              type="text" 
              placeholder="Search by name, city, or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-[#333333] font-bold focus:outline-none placeholder-[#aaaaaa]"
            />
          </div>

          <div className="hidden md:block w-px h-8 bg-[#e0e0e0]"></div>

          <div className="w-full md:w-64 flex items-center px-4 py-2">
            <select 
              value={stateFilter}
              onChange={(e) => {
                setStateFilter(e.target.value);
                fetchBloodBanks(searchQuery, e.target.value);
              }}
              className="w-full bg-transparent text-[#333333] font-bold focus:outline-none cursor-pointer"
            >
              <option value="">All States</option>
              {INDIAN_STATES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <button 
            onClick={handleSearch}
            className="w-full md:w-auto px-10 py-3 bg-[#cc0000] hover:bg-[#aa0000] text-white rounded-[4px] font-bold transition-colors"
          >
            Search
          </button>
        </div>

        {/* Popular Searches */}
        <div className="flex items-center gap-3 mb-16 overflow-x-auto pb-2">
          <span className="text-sm font-bold text-[#333333] whitespace-nowrap">Popular Searches:</span>
          {['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'].map(city => (
            <button 
              key={city} 
              onClick={() => { setSearchQuery(city); fetchBloodBanks(city, stateFilter); }}
              className="px-4 py-1.5 bg-[#ffffff] border border-[#e0e0e0] rounded-[4px] text-xs font-bold text-[#666666] hover:bg-[#f4f4f4] hover:text-[#333333] transition-colors whitespace-nowrap"
            >
              {city}
            </button>
          ))}
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
             <div className="text-[#666666] font-bold">Loading blood banks...</div>
          </div>
        ) : bloodBanks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-[#f9f9f9] border border-[#e0e0e0]">
            <div className="w-20 h-20 bg-[#ffffff] border border-[#e0e0e0] rounded-full flex items-center justify-center text-[#cc0000] mb-6">
              <Building2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-[#333333] mb-2">No blood banks found</h2>
            <p className="text-[#666666]">Try searching with a different location or check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {bloodBanks.map(bank => (
              <div key={bank.id} className="bg-[#ffffff] rounded-[4px] p-6 border border-[#e0e0e0] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg text-[#333333]">{bank.name}</h3>
                    {bank.verified && (
                      <span className="flex-shrink-0 flex items-center gap-1 bg-[#e8f5e9] text-[#2e7d32] text-[10px] font-bold uppercase px-2 py-1 rounded-[4px]">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                  <div className="space-y-2 text-sm text-[#666666] mb-6">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 text-[#cc0000]" />
                      <span>{bank.address}<br/><span className="text-[#333333] font-bold">{bank.city}, {bank.state}</span></span>
                    </div>
                  </div>
                </div>
                <button className="w-full py-2 bg-[#ffffff] text-[#cc0000] border border-[#cc0000] hover:bg-[#fff0f0] rounded-[4px] font-bold text-sm transition-colors">
                  Contact
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
