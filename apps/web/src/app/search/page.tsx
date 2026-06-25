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
        // Fetch donors and unique cities using the RPC to bypass RLS for unauthenticated users
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
        console.error('Error fetching realtime stats:', err);
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
    <div className="min-h-screen bg-[#fcfafb] dark:bg-neutral-950 font-sans text-neutral-900 dark:text-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 lg:pt-24 lg:pb-16 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Hero Content */}
          <div className="flex-1 text-left relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-neutral-800 rounded-full border border-red-100 dark:border-red-900 shadow-sm mb-6">
              <span className="relative flex h-2 w-2 ml-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm font-bold text-red-600 dark:text-red-400">Live Donor Network Across India</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-slate-800 dark:text-white mb-6">
              Find a <span className="text-red-600 dark:text-red-500">Hero</span> <br/>
              Near You <span className="inline-block text-red-600 animate-pulse-soft">❤</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-slate-500 dark:text-neutral-400 max-w-lg leading-relaxed font-medium">
              Connect with verified blood donors in your area in seconds. Every drop counts.
            </p>
          </div>

          {/* Right Hero Graphic */}
          <div className="flex-1 relative w-full h-[400px] flex items-center justify-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-100/50 dark:bg-red-900/10 rounded-full blur-[80px]"></div>
            
            {/* Central Drop */}
            <div className="relative z-10 animate-float drop-shadow-2xl">
              <svg width="240" height="280" viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="dropGradientHero" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#ff4b4b" />
                    <stop offset="40%" stopColor="#dc2626" />
                    <stop offset="100%" stopColor="#7f1d1d" />
                  </radialGradient>
                  <linearGradient id="glossGradientHero" x1="20%" y1="0%" x2="50%" y2="80%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M100 10 C100 10, 20 130, 20 190 A80 80 0 0 0 180 190 C180 130, 100 10, 100 10 Z" fill="url(#dropGradientHero)" />
                <path d="M100 20 C100 20, 35 125, 35 180 A65 70 0 0 0 80 245 C95 245, 95 20, 95 20 Z" fill="url(#glossGradientHero)" />
                <path d="M100 180 C100 180, 75 155, 75 140 A15 15 0 0 1 100 125 A15 15 0 0 1 125 140 C125 155, 100 180, 100 180 Z" fill="white" className="drop-shadow-md" />
              </svg>
            </div>
            
            {/* Hands framing the drop (SVG representation) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[380px] h-[280px] opacity-80 mix-blend-multiply dark:mix-blend-screen pointer-events-none">
              <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Left Hand Silhouette */}
                <path d="M 50 250 C 70 200, 120 160, 160 180 C 180 190, 190 220, 170 250 C 140 290, 90 290, 50 250 Z" fill="#fca5a5" opacity="0.4" />
                {/* Right Hand Silhouette */}
                <path d="M 350 250 C 330 200, 280 160, 240 180 C 220 190, 210 220, 230 250 C 260 290, 310 290, 350 250 Z" fill="#fca5a5" opacity="0.4" />
              </svg>
            </div>
            
            {/* Floating medical icons */}
            <div className="absolute top-12 left-12 w-10 h-10 bg-white dark:bg-neutral-800 rounded-full shadow-lg flex items-center justify-center text-red-500 animate-[float_3s_ease-in-out_infinite_0s]">
              <Droplet className="w-5 h-5" />
            </div>
            <div className="absolute top-24 right-16 w-12 h-12 bg-white dark:bg-neutral-800 rounded-full shadow-lg flex items-center justify-center text-red-500 animate-[float_4s_ease-in-out_infinite_1s]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 13l2 2 4-4" /></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-20">
        
        {/* Horizontal Search Bar Component */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-3 sm:p-4 shadow-xl shadow-red-900/5 border border-red-50 dark:border-neutral-800 flex flex-col md:flex-row items-center gap-4 relative -mt-8 mb-8">
          
          <div className="flex-1 w-full flex flex-col px-4">
            <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-400 mb-1">Blood Group</span>
            <div className="flex items-center">
              <Droplet className="w-5 h-5 text-red-500 mr-2" />
              <select 
                value={bloodGroup} 
                onChange={(e) => setBloodGroup(e.target.value)} 
                className="w-full bg-transparent text-neutral-900 dark:text-white font-bold text-lg focus:outline-none cursor-pointer"
              >
                <option value="">Any Blood Group</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-neutral-100 dark:bg-neutral-800"></div>

          <div className="flex-1 w-full flex flex-col px-4">
            <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-400 mb-1">Location</span>
            <div className="flex items-center">
              <CityAutocomplete
                value={city}
                onChange={setCity}
                placeholder="Search city, area..."
                className="w-full bg-transparent text-neutral-900 dark:text-white font-bold text-lg focus:outline-none placeholder-neutral-300"
              />
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-neutral-100 dark:bg-neutral-800"></div>

          <button onClick={() => handleSearch(true)} className="p-3 text-neutral-400 hover:text-red-500 transition-colors bg-neutral-50 dark:bg-neutral-800 rounded-xl" title="Use GPS">
            <Navigation className="w-5 h-5" />
          </button>

          <button 
            onClick={() => handleSearch(false)}
            disabled={loading}
            className="w-full md:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-500/30 transition-all active:scale-[0.98] disabled:opacity-70"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <><Search className="w-5 h-5" /> Find Donors</>}
          </button>

        </div>

        {/* 4 Feature Items */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 dark:bg-red-500/10 rounded-xl flex items-center justify-center text-red-500"><Shield className="w-5 h-5" /></div>
            <div><div className="text-sm font-bold text-neutral-900 dark:text-white">Verified Donors</div><div className="text-xs text-neutral-400">Safe & Trusted</div></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 dark:bg-red-500/10 rounded-xl flex items-center justify-center text-red-500"><Search className="w-5 h-5" /></div>
            <div><div className="text-sm font-bold text-neutral-900 dark:text-white">Real-time Search</div><div className="text-xs text-neutral-400">Live donor updates</div></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 dark:bg-red-500/10 rounded-xl flex items-center justify-center text-red-500"><MapPin className="w-5 h-5" /></div>
            <div><div className="text-sm font-bold text-neutral-900 dark:text-white">Nearby Donors</div><div className="text-xs text-neutral-400">Close to you</div></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 dark:bg-red-500/10 rounded-xl flex items-center justify-center text-red-500"><Lock className="w-5 h-5" /></div>
            <div><div className="text-sm font-bold text-neutral-900 dark:text-white">100% Secure</div><div className="text-xs text-neutral-400">Your data is safe</div></div>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="bg-gradient-to-r from-[#5e0a0a] via-[#851111] to-[#5e0a0a] rounded-3xl p-8 mb-16 shadow-xl flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-white">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center"><Droplet className="w-6 h-6" fill="currentColor" /></div>
            <div><div className="text-2xl font-black">{statsLoaded ? formatStat(stats.donors) : '...'}</div><div className="text-sm text-white/80">Registered Donors</div></div>
          </div>
          <div className="flex items-center gap-4 text-white">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 13l2 2 4-4" /></svg></div>
            <div><div className="text-2xl font-black">{statsLoaded ? formatStat(stats.lives) : '...'}</div><div className="text-sm text-white/80">Lives Saved</div></div>
          </div>
          <div className="flex items-center gap-4 text-white">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center"><MapPin className="w-6 h-6" /></div>
            <div><div className="text-2xl font-black">{statsLoaded ? formatStat(stats.cities) : '...'}</div><div className="text-sm text-white/80">Cities Covered</div></div>
          </div>
          <div className="flex items-center gap-4 text-white">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center"><Building2 className="w-6 h-6" /></div>
            <div><div className="text-2xl font-black">{statsLoaded ? formatStat(stats.banks) : '...'}</div><div className="text-sm text-white/80">Blood Banks</div></div>
          </div>
        </div>

        {/* Results Section */}
        {searched && (
          <div className="animate-fade-in border-t border-neutral-200 dark:border-neutral-800 pt-12">
            <h2 className="text-2xl font-bold mb-6">Search Results</h2>
            {results.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800">
                <Search className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">No donors found</h3>
                <p className="text-neutral-500">Try adjusting your location or blood group.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((donor) => (
                  <div key={donor.id} className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-100 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold">{donor.name}</h3>
                          <div className="flex items-center text-neutral-500 text-sm mt-1 gap-1"><MapPin className="w-3.5 h-3.5" /> {donor.locality || donor.city}</div>
                        </div>
                        <span className="bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 font-black text-lg px-3 py-1 rounded-lg">{donor.blood_group}</span>
                      </div>
                      {donor.distance_meters !== null && (
                        <div className="text-sm text-neutral-500 mb-4">~{(donor.distance_meters / 1000).toFixed(1)} km away</div>
                      )}
                    </div>
                    <button onClick={() => router.push(`/chat/${donor.id}`)} className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 rounded-xl font-bold transition-all mt-4">
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
