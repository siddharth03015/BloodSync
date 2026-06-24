'use client';

import { useState } from 'react';
import { supabase } from 'shared';
import { Droplet, Minus, Plus, HeartPulse, Clock, CalendarDays, Search, Navigation } from 'lucide-react';
import Link from 'next/link';

export default function RequestBlood() {
  const [bloodGroup, setBloodGroup] = useState('');
  const [units, setUnits] = useState(1);
  const [urgency, setUrgency] = useState('Critical');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!bloodGroup) { alert('Please select a blood group needed.'); return; }
    setLoading(true);
    // Simulation: Wait 1 second then show success. Real app would insert into a requests table.
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#2a0808] dark:bg-neutral-950 font-sans text-white overflow-hidden relative">
      
      {/* Background Graphic: Hands holding glowing heart */}
      <div className="absolute top-0 right-0 w-full h-[500px] pointer-events-none opacity-40">
        <div className="absolute top-1/2 right-20 -translate-y-1/2 w-64 h-64 bg-red-600/30 rounded-full blur-[100px]"></div>
        <svg viewBox="0 0 800 500" className="absolute right-0 w-full h-full object-cover mix-blend-screen" preserveAspectRatio="xMaxYMid slice">
           {/* Faint Heartbeat Line */}
           <path d="M 0 250 L 300 250 L 350 100 L 400 400 L 450 150 L 500 250 L 800 250" fill="none" stroke="rgba(220, 38, 38, 0.4)" strokeWidth="4" />
           {/* Hands representation */}
           <path d="M 500 400 C 550 300, 650 250, 750 300 C 780 320, 800 400, 750 450 C 650 500, 550 450, 500 400 Z" fill="#991b1b" opacity="0.5" />
           <path d="M 700 400 C 650 300, 550 250, 450 300 C 420 320, 400 400, 450 450 C 550 500, 650 450, 700 400 Z" fill="#991b1b" opacity="0.5" />
           {/* Center Glowing Heart */}
           <path d="M 600 350 C 600 350, 550 300, 550 270 A 30 30 0 0 1 600 240 A 30 30 0 0 1 650 270 C 650 300, 600 350, 600 350 Z" fill="#ef4444" className="drop-shadow-[0_0_30px_rgba(239,68,68,0.8)]" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative z-10">
        
        {/* Header */}
        <div className="mb-10 text-left">
          <h1 className="text-5xl lg:text-6xl font-black tracking-tight mb-4">Request Blood</h1>
          <p className="text-lg text-red-200/80 font-medium max-w-lg">
            Post a blood request and compatible donors nearby will be notified.
          </p>
        </div>

        {/* Main Form Card */}
        {success ? (
           <div className="bg-white dark:bg-neutral-900 rounded-[32px] p-12 text-center shadow-2xl">
             <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
               <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
             </div>
             <h2 className="text-3xl font-black text-neutral-900 dark:text-white mb-4">Request Sent Successfully!</h2>
             <p className="text-neutral-500 mb-8 max-w-md mx-auto">We have notified nearby compatible donors. You will receive a chat notification if someone accepts.</p>
             <button onClick={() => setSuccess(false)} className="px-8 py-3 bg-red-600 text-white rounded-xl font-bold">Make another request</button>
           </div>
        ) : (
          <div className="bg-white dark:bg-neutral-900 rounded-[32px] p-6 md:p-10 shadow-2xl shadow-black/50 border border-white/5">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
              
              {/* Left Column */}
              <div>
                <label className="block text-sm font-black text-neutral-800 dark:text-neutral-200 mb-4 uppercase tracking-wide">Blood Group Needed</label>
                <div className="grid grid-cols-4 gap-3">
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                    <button
                      key={bg}
                      onClick={() => setBloodGroup(bg)}
                      className={`py-3 rounded-xl font-black text-sm transition-all ${
                        bloodGroup === bg 
                          ? 'bg-red-600 text-white shadow-md shadow-red-500/30' 
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                      }`}
                    >
                      {bg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-10">
                <div>
                  <label className="block text-sm font-black text-neutral-800 dark:text-neutral-200 mb-4 uppercase tracking-wide">Units Needed</label>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setUnits(Math.max(1, units - 1))} className="w-12 h-12 rounded-xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                      <Minus className="w-5 h-5" />
                    </button>
                    <div className="text-2xl font-black text-neutral-900 dark:text-white w-8 text-center">{units}</div>
                    <button onClick={() => setUnits(units + 1)} className="w-12 h-12 rounded-xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black text-neutral-800 dark:text-neutral-200 mb-4 uppercase tracking-wide">Urgency Level</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button onClick={() => setUrgency('Critical')} className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${urgency === 'Critical' ? 'border-red-500 bg-red-50 dark:bg-red-500/10' : 'border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 opacity-70'}`}>
                       <HeartPulse className={`w-5 h-5 ${urgency === 'Critical' ? 'text-red-600' : 'text-neutral-400'}`} />
                       <div className="text-center">
                         <div className={`text-xs font-black ${urgency === 'Critical' ? 'text-red-700 dark:text-red-400' : 'text-neutral-600 dark:text-neutral-400'}`}>Critical</div>
                         <div className="text-[9px] text-neutral-400 font-bold uppercase mt-0.5">Need Now</div>
                       </div>
                    </button>
                    <button onClick={() => setUrgency('24 Hours')} className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${urgency === '24 Hours' ? 'border-orange-500 bg-orange-50 dark:bg-orange-500/10' : 'border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 opacity-70'}`}>
                       <Clock className={`w-5 h-5 ${urgency === '24 Hours' ? 'text-orange-600' : 'text-neutral-400'}`} />
                       <div className="text-center">
                         <div className={`text-xs font-black ${urgency === '24 Hours' ? 'text-orange-700 dark:text-orange-400' : 'text-neutral-600 dark:text-neutral-400'}`}>Within 24 Hrs</div>
                         <div className="text-[9px] text-neutral-400 font-bold uppercase mt-0.5">Urgent</div>
                       </div>
                    </button>
                    <button onClick={() => setUrgency('Planned')} className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${urgency === 'Planned' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' : 'border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 opacity-70'}`}>
                       <CalendarDays className={`w-5 h-5 ${urgency === 'Planned' ? 'text-emerald-600' : 'text-neutral-400'}`} />
                       <div className="text-center">
                         <div className={`text-xs font-black ${urgency === 'Planned' ? 'text-emerald-700 dark:text-emerald-400' : 'text-neutral-600 dark:text-neutral-400'}`}>Planned</div>
                         <div className="text-[9px] text-neutral-400 font-bold uppercase mt-0.5">Non-Urgent</div>
                       </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mb-10">
              <label className="block text-sm font-black text-neutral-800 dark:text-neutral-200 mb-3 uppercase tracking-wide">Additional Information (Optional)</label>
              <textarea 
                value={info}
                onChange={(e) => setInfo(e.target.value)}
                placeholder="Hospital name, precise location, patient details..."
                className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white rounded-xl p-4 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-red-500/50 resize-none font-medium"
              ></textarea>
            </div>

            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold shadow-xl shadow-red-600/30 transition-all active:scale-[0.98] flex justify-center items-center gap-2 text-lg disabled:opacity-70"
            >
              {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <><Navigation className="w-5 h-5" /> Submit Request</>}
            </button>
            
          </div>
        )}

        {/* Footer Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Link href="/search" className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-colors group flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center"><Search className="w-5 h-5" /></div>
               <div><div className="font-bold mb-0.5">Find Donors</div><div className="text-sm text-white/60">Search available donors directly.</div></div>
            </div>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-red-900 transition-colors">→</div>
          </Link>
          <Link href="/profile" className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-colors group flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center"><CalendarDays className="w-5 h-5" /></div>
               <div><div className="font-bold mb-0.5">My Requests</div><div className="text-sm text-white/60">View and manage past requests.</div></div>
            </div>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-red-900 transition-colors">→</div>
          </Link>
        </div>

      </div>
    </div>
  );
}
