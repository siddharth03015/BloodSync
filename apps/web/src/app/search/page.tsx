'use client';

import { useState, useEffect } from 'react';
import { supabase, getCanDonateTo, type BloodGroup } from 'shared';
import { useRouter } from 'next/navigation';
import { MapPin, Search, Navigation, Droplet, Shield, Clock, Lock, Building2 } from 'lucide-react';
import CityAutocomplete from '../components/CityAutocomplete';

export default function SearchDonors() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [bloodGroup, setBloodGroup] = useState('');
  const [city, setCity] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);
  const [stats, setStats] = useState({ donors: 0, lives: 0, cities: 0, banks: 0 });
  const [statsLoaded, setStatsLoaded] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: donorsData } = await supabase.rpc('search_donors_nearby', {
          search_lat: null,
          search_lng: null,
          radius_meters: 0
        });
        
        const totalDonors = donorsData?.length || 0;
        const uniqueCities = new Set(donorsData?.map((d: any) => d.city).filter(Boolean));
        
        const { count: banksCount } = await supabase
          .from('blood_banks')
          .select('*', { count: 'exact', head: true })
          .eq('verified', true);

        const { count: fulfilledCount } = await supabase
          .from('blood_requests')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'fulfilled');

        setStats({ 
          donors: totalDonors, 
          lives: (fulfilledCount || 0) * 3, 
          cities: uniqueCities.size,
          banks: banksCount || 0
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setStatsLoaded(true);
      }
    };
    fetchStats();
  }, []);

  const formatStat = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M+';
    if (num >= 100000) return (num / 100000).toFixed(1).replace(/\.0$/, '') + 'L+';
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K+';
    return num.toLocaleString();
  };

  const handleSearch = async (useLocation: boolean = false) => {
    setLoading(true);
    let lat = null;
    let lng = null;
    const radius = 50000;

    if (useLocation && navigator.geolocation) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        lat = position.coords.latitude;
        lng = position.coords.longitude;
      } catch {
        alert('Could not get location. Please enter a city name instead.');
        setLoading(false);
        return;
      }
    }

    if (!useLocation && !city.trim()) {
      alert('Please enter a city name to search for donors.');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.rpc('search_donors_nearby', {
      search_lat: lat,
      search_lng: lng,
      radius_meters: radius,
      filter_blood_group: bloodGroup || null,
      filter_city: useLocation ? null : (city.trim() || null)
    });

    setLoading(false);
    setSearched(true);
    if (error) alert(error.message);
    else setResults(data || []);
  };

  return (
    <div className="min-h-screen bg-[#ffffff] font-sans text-[#333333]">
      {/* Hero Section */}
      <div className="bg-[#f9f9f9] border-b border-[#e0e0e0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 lg:pt-24 lg:pb-16 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#333333] mb-6">
            Find a <span className="text-[#cc0000]">Hero</span> <br/>
            Near You
          </h1>
          <p className="text-lg text-[#666666] max-w-2xl mx-auto leading-relaxed">
            Connect with verified blood donors in your area in seconds. Every drop counts.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Horizontal Search Bar Component */}
        <div className="bg-[#ffffff] rounded-[4px] p-4 border border-[#e0e0e0] flex flex-col md:flex-row items-center gap-4 mb-12 shadow-sm">
          
          <div className="flex-1 w-full flex flex-col px-4">
            <span className="text-[12px] uppercase font-bold text-[#666666] mb-1">Blood Group</span>
            <div className="flex items-center">
              <Droplet className="w-5 h-5 text-[#cc0000] mr-2" />
              <select 
                value={bloodGroup} 
                onChange={(e) => setBloodGroup(e.target.value)} 
                className="w-full bg-transparent text-[#333333] font-bold text-lg focus:outline-none cursor-pointer"
              >
                <option value="">Any Blood Group</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-[#e0e0e0]"></div>

          <div className="flex-1 w-full flex flex-col px-4">
            <span className="text-[12px] uppercase font-bold text-[#666666] mb-1">Location</span>
            <div className="flex items-center">
              <CityAutocomplete
                value={city}
                onChange={setCity}
                placeholder="Search city, area..."
                className="w-full bg-transparent text-[#333333] font-bold text-lg focus:outline-none placeholder-[#aaaaaa]"
              />
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-[#e0e0e0]"></div>

          <button onClick={() => handleSearch(true)} className="p-3 text-[#666666] hover:text-[#cc0000] transition-colors bg-[#f4f4f4] rounded-[4px]" title="Use GPS">
            <Navigation className="w-5 h-5" />
          </button>

          <button 
            onClick={() => handleSearch(false)}
            disabled={loading}
            className="w-full md:w-auto px-8 py-3 bg-[#cc0000] hover:bg-[#aa0000] text-white rounded-[4px] font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
          >
            {loading ? 'Searching...' : <><Search className="w-5 h-5" /> Find Donors</>}
          </button>

        </div>

        {/* 4 Feature Items */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#f4f4f4] rounded-[4px] flex items-center justify-center text-[#cc0000]"><Shield className="w-5 h-5" /></div>
            <div><div className="text-sm font-bold text-[#333333]">Verified Donors</div><div className="text-xs text-[#666666]">Safe & Trusted</div></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#f4f4f4] rounded-[4px] flex items-center justify-center text-[#cc0000]"><Search className="w-5 h-5" /></div>
            <div><div className="text-sm font-bold text-[#333333]">Real-time Search</div><div className="text-xs text-[#666666]">Live donor updates</div></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#f4f4f4] rounded-[4px] flex items-center justify-center text-[#cc0000]"><MapPin className="w-5 h-5" /></div>
            <div><div className="text-sm font-bold text-[#333333]">Nearby Donors</div><div className="text-xs text-[#666666]">Close to you</div></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#f4f4f4] rounded-[4px] flex items-center justify-center text-[#cc0000]"><Lock className="w-5 h-5" /></div>
            <div><div className="text-sm font-bold text-[#333333]">100% Secure</div><div className="text-xs text-[#666666]">Your data is safe</div></div>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="bg-[#f9f9f9] border border-[#e0e0e0] rounded-[4px] p-8 mb-16 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-[#333333]">
            <div className="w-12 h-12 bg-[#ffffff] border border-[#e0e0e0] rounded-full flex items-center justify-center text-[#cc0000]"><Droplet className="w-6 h-6" fill="currentColor" /></div>
            <div><div className="text-2xl font-bold">{statsLoaded ? formatStat(stats.donors) : '...'}</div><div className="text-sm text-[#666666]">Registered Donors</div></div>
          </div>
          <div className="flex items-center gap-4 text-[#333333]">
            <div className="w-12 h-12 bg-[#ffffff] border border-[#e0e0e0] rounded-full flex items-center justify-center text-[#cc0000]"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 13l2 2 4-4" /></svg></div>
            <div><div className="text-2xl font-bold">{statsLoaded ? formatStat(stats.lives) : '...'}</div><div className="text-sm text-[#666666]">Lives Saved</div></div>
          </div>
          <div className="flex items-center gap-4 text-[#333333]">
            <div className="w-12 h-12 bg-[#ffffff] border border-[#e0e0e0] rounded-full flex items-center justify-center text-[#cc0000]"><MapPin className="w-6 h-6" /></div>
            <div><div className="text-2xl font-bold">{statsLoaded ? formatStat(stats.cities) : '...'}</div><div className="text-sm text-[#666666]">Cities Covered</div></div>
          </div>
          <div className="flex items-center gap-4 text-[#333333]">
            <div className="w-12 h-12 bg-[#ffffff] border border-[#e0e0e0] rounded-full flex items-center justify-center text-[#cc0000]"><Building2 className="w-6 h-6" /></div>
            <div><div className="text-2xl font-bold">{statsLoaded ? formatStat(stats.banks) : '...'}</div><div className="text-sm text-[#666666]">Blood Banks</div></div>
          </div>
        </div>

        {/* Results Section */}
        {searched && (
          <div className="border-t border-[#e0e0e0] pt-12">
            <h2 className="text-2xl font-bold mb-6 text-[#333333]">Search Results</h2>
            {results.length === 0 ? (
              <div className="text-center py-20 bg-[#f9f9f9] border border-[#e0e0e0]">
                <Search className="w-12 h-12 text-[#aaaaaa] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#333333] mb-2">No donors found</h3>
                <p className="text-[#666666]">Try adjusting your location or blood group.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((donor) => (
                  <div key={donor.id} className="bg-[#ffffff] border border-[#e0e0e0] p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-[#333333]">{donor.name}</h3>
                          <div className="flex items-center text-[#666666] text-sm mt-1 gap-1"><MapPin className="w-3.5 h-3.5" /> {donor.locality || donor.city}</div>
                        </div>
                        <span className="bg-[#fff0f0] text-[#cc0000] font-bold text-sm border border-[#cc0000] px-3 py-1">{donor.blood_group}</span>
                      </div>
                      {donor.distance_meters !== null && (
                        <div className="text-sm text-[#666666] mb-4">~{(donor.distance_meters / 1000).toFixed(1)} km away</div>
                      )}
                    </div>
                    <button onClick={() => router.push(`/chat/${donor.id}`)} className="w-full py-2 bg-[#ffffff] border border-[#cc0000] text-[#cc0000] hover:bg-[#fff0f0] font-bold transition-colors mt-4">
                      Request Blood
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
