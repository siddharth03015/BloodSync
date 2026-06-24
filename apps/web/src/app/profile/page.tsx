'use client';

import { useState, useEffect } from 'react';
import { supabase, getCanDonateTo, type BloodGroup } from 'shared';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Bell, Calendar as CalendarIcon, Users, MessageCircle, LogOut, ChevronRight, Droplet } from 'lucide-react';

export default function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      const { data, error } = await supabase.from('users').select('*').eq('id', user.id).single();
      if (error || !data) { router.push('/register'); } else { setProfile(data); }
      setLoading(false);
    };
    fetchProfile();
  }, [router]);

  const handleUpdate = async () => {
    if (!profile) return;
    setUpdating(true);
    setError('');
    setSuccess('');
    const { error: updateError } = await supabase
      .from('users')
      .update({ is_available_to_donate: profile.is_available_to_donate, last_donated_at: profile.last_donated_at || null })
      .eq('id', profile.id);
    setUpdating(false);
    if (updateError) { setError(updateError.message); } else { setSuccess('Profile updated!'); setTimeout(() => setSuccess(''), 3000); }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdf8f8] dark:bg-neutral-950">
        <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const canDonateTo = profile ? getCanDonateTo(profile.blood_group as BloodGroup) : [];

  return (
    <div className="min-h-screen bg-[#fdf8f8] dark:bg-neutral-950 py-12 px-4 relative overflow-hidden font-sans">
      
      {/* Faint Background Heartbeat Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.02] flex items-center justify-center overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 1000 400" preserveAspectRatio="none">
          <path d="M0,200 L300,200 L350,100 L400,300 L450,50 L500,350 L550,150 L600,200 L1000,200" fill="none" stroke="#dc2626" strokeWidth="3" />
        </svg>
      </div>
      <div className="absolute top-1/4 left-10 pointer-events-none opacity-[0.05]">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
           <path d="M 10 100 Q 50 10 100 100 T 190 100" stroke="#dc2626" strokeWidth="2" strokeDasharray="5,5" fill="none"/>
        </svg>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 animate-scale-in space-y-6">
        
        {/* Top Profile Header Card */}
        <div className="bg-gradient-to-r from-[#de2c2c] to-[#a81c1c] rounded-[32px] p-8 md:p-10 text-white shadow-xl shadow-red-900/10 relative overflow-hidden">
          {/* Faint blood drops in background */}
          <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden opacity-10">
            <Droplet className="absolute top-10 right-20 w-40 h-40" fill="currentColor" />
            <Droplet className="absolute bottom-10 right-10 w-24 h-24" fill="currentColor" />
            <Droplet className="absolute top-20 right-60 w-16 h-16" fill="currentColor" />
          </div>

          <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-center gap-6">
              {/* Avatar Square */}
              <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl border border-white/20 flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-4xl font-black">{profile?.name?.charAt(0)?.toUpperCase()}</span>
              </div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight mb-1">{profile?.name}</h1>
                <p className="text-white/80 font-medium text-sm md:text-base">{profile?.locality}, {profile?.city}</p>
                <p className="text-white/60 text-xs mt-1 font-medium">Member since {new Date(profile?.created_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
              </div>
            </div>
            
            {/* Blood Group Badge */}
            <div className="flex-shrink-0">
              <div className="bg-white text-red-600 font-black text-xl px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2">
                <Droplet className="w-5 h-5 text-red-500" fill="currentColor" />
                {profile?.blood_group}
              </div>
            </div>
          </div>

          {/* Compatibility Pills */}
          <div className="mt-8 pt-6 border-t border-white/10 relative">
            <p className="text-xs font-bold text-white/70 mb-3 uppercase tracking-wider">Can Donate To</p>
            <div className="flex gap-3 flex-wrap">
              {canDonateTo.map(bg => (
                <span key={bg} className="w-12 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors rounded-xl text-sm font-bold border border-white/20 shadow-sm cursor-default">
                  {bg}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Settings Card */}
        <div className="bg-white dark:bg-neutral-900 rounded-[32px] p-6 md:p-10 shadow-xl shadow-red-900/5 border border-red-50 dark:border-neutral-800">
          
          {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm font-bold">{error}</div>}
          {success && <div className="bg-emerald-50 text-emerald-600 px-4 py-3 rounded-xl mb-6 text-sm font-bold">{success}</div>}

          <div className="space-y-6 max-w-3xl">
            {/* Availability Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <div className="w-12 h-12 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center text-red-500">
                  <Bell className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 dark:text-white text-lg">Available to Donate</h3>
                  <p className="text-sm text-neutral-500 font-medium">Toggle when you&apos;re ready to receive requests.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-16 sm:ml-0">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={profile?.is_available_to_donate}
                  onChange={(e) => setProfile({ ...profile, is_available_to_donate: e.target.checked })}
                />
                <div className="w-14 h-8 bg-neutral-200 dark:bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-red-600 shadow-inner border border-black/5"></div>
              </label>
            </div>

            {/* Last Donated */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <div className="w-12 h-12 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center text-red-500">
                  <CalendarIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 dark:text-white text-lg">Last Donated</h3>
                </div>
              </div>
              <div className="ml-16 sm:ml-0 w-full sm:w-auto">
                <input
                  type="date"
                  value={profile?.last_donated_at ? new Date(profile.last_donated_at).toISOString().split('T')[0] : ''}
                  onChange={(e) => setProfile({ ...profile, last_donated_at: e.target.value })}
                  className="w-full sm:w-48 px-4 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all font-bold text-neutral-700 dark:text-neutral-300"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-2">
              <button
                onClick={handleUpdate}
                disabled={updating}
                className="w-full py-4 bg-[#dc2626] hover:bg-[#b91c1c] text-white rounded-2xl font-bold shadow-lg shadow-red-600/20 disabled:opacity-50 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {updating ? 'Saving...' : <>Save Changes</>}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Quick Links Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <Link href="/search" className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-red-50 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all group flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center text-red-500">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-neutral-900 dark:text-white mb-0.5">Find Donors</div>
                <div className="text-xs text-neutral-500 font-medium">Search and connect</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-neutral-300 group-hover:text-red-500 transition-colors" />
          </Link>

          <Link href="/chat" className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-red-50 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all group flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center text-red-500">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-neutral-900 dark:text-white mb-0.5">My Chats</div>
                <div className="text-xs text-neutral-500 font-medium">View conversations</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-neutral-300 group-hover:text-red-500 transition-colors" />
          </Link>

          <button onClick={handleLogout} className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-red-50 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all group flex items-center justify-between text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
                <LogOut className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-neutral-900 dark:text-white mb-0.5">Sign Out</div>
                <div className="text-xs text-neutral-500 font-medium">Logout securely</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-neutral-300 group-hover:text-red-500 transition-colors" />
          </button>

        </div>

      </div>
    </div>
  );
}
