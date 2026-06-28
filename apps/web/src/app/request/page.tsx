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
    <div className="min-h-screen bg-[#f9f9f9] text-[#333333] pt-20 pb-24">
      
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Request Blood</h1>
          <p className="text-[#666666] max-w-lg mx-auto">
            Post a blood request and compatible donors nearby will be notified.
          </p>
        </div>

        {/* Main Form Card */}
        {success ? (
           <div className="bg-[#ffffff] rounded-[4px] p-12 text-center border border-[#e0e0e0]">
             <div className="w-24 h-24 bg-[#e8f5e9] rounded-full flex items-center justify-center text-[#2e7d32] mx-auto mb-6">
               <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
             </div>
             <h2 className="text-3xl font-bold text-[#333333] mb-4">Request Sent Successfully!</h2>
             <p className="text-[#666666] mb-8 max-w-md mx-auto">We have notified nearby compatible donors. You will receive a chat notification if someone accepts.</p>
             <button onClick={() => setSuccess(false)} className="px-8 py-3 bg-[#cc0000] hover:bg-[#aa0000] text-white rounded-[4px] font-bold transition-colors">Make another request</button>
           </div>
        ) : (
          <div className="bg-[#ffffff] rounded-[4px] p-6 md:p-10 border border-[#e0e0e0]">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
              
              {/* Left Column */}
              <div>
                <label className="block text-sm font-bold text-[#333333] mb-4">Blood Group Needed</label>
                <div className="grid grid-cols-4 gap-3">
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                    <button
                      key={bg}
                      onClick={() => setBloodGroup(bg)}
                      className={`py-3 rounded-[4px] font-bold text-sm border transition-colors ${
                        bloodGroup === bg 
                          ? 'bg-[#cc0000] border-[#cc0000] text-white' 
                          : 'bg-[#ffffff] border-[#e0e0e0] text-[#333333] hover:bg-[#f4f4f4]'
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
                  <label className="block text-sm font-bold text-[#333333] mb-4">Units Needed</label>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setUnits(Math.max(1, units - 1))} className="w-12 h-12 rounded-[4px] border border-[#e0e0e0] flex items-center justify-center text-[#333333] hover:bg-[#f4f4f4] transition-colors">
                      <Minus className="w-5 h-5" />
                    </button>
                    <div className="text-2xl font-bold text-[#333333] w-8 text-center">{units}</div>
                    <button onClick={() => setUnits(units + 1)} className="w-12 h-12 rounded-[4px] border border-[#e0e0e0] flex items-center justify-center text-[#333333] hover:bg-[#f4f4f4] transition-colors">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#333333] mb-4">Urgency Level</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button onClick={() => setUrgency('Critical')} className={`p-3 rounded-[4px] border-2 flex flex-col items-center justify-center gap-2 transition-colors ${urgency === 'Critical' ? 'border-[#cc0000] bg-[#fff0f0]' : 'border-[#e0e0e0] bg-[#ffffff]'}`}>
                       <HeartPulse className={`w-5 h-5 ${urgency === 'Critical' ? 'text-[#cc0000]' : 'text-[#666666]'}`} />
                       <div className="text-center">
                         <div className={`text-sm font-bold ${urgency === 'Critical' ? 'text-[#cc0000]' : 'text-[#333333]'}`}>Critical</div>
                         <div className="text-[10px] text-[#666666] uppercase mt-1">Need Now</div>
                       </div>
                    </button>
                    <button onClick={() => setUrgency('24 Hours')} className={`p-3 rounded-[4px] border-2 flex flex-col items-center justify-center gap-2 transition-colors ${urgency === '24 Hours' ? 'border-[#f57c00] bg-[#fff3e0]' : 'border-[#e0e0e0] bg-[#ffffff]'}`}>
                       <Clock className={`w-5 h-5 ${urgency === '24 Hours' ? 'text-[#f57c00]' : 'text-[#666666]'}`} />
                       <div className="text-center">
                         <div className={`text-sm font-bold ${urgency === '24 Hours' ? 'text-[#f57c00]' : 'text-[#333333]'}`}>24 Hrs</div>
                         <div className="text-[10px] text-[#666666] uppercase mt-1">Urgent</div>
                       </div>
                    </button>
                    <button onClick={() => setUrgency('Planned')} className={`p-3 rounded-[4px] border-2 flex flex-col items-center justify-center gap-2 transition-colors ${urgency === 'Planned' ? 'border-[#388e3c] bg-[#e8f5e9]' : 'border-[#e0e0e0] bg-[#ffffff]'}`}>
                       <CalendarDays className={`w-5 h-5 ${urgency === 'Planned' ? 'text-[#388e3c]' : 'text-[#666666]'}`} />
                       <div className="text-center">
                         <div className={`text-sm font-bold ${urgency === 'Planned' ? 'text-[#388e3c]' : 'text-[#333333]'}`}>Planned</div>
                         <div className="text-[10px] text-[#666666] uppercase mt-1">Non-Urgent</div>
                       </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mb-10">
              <label className="block text-sm font-bold text-[#333333] mb-3">Additional Information (Optional)</label>
              <textarea 
                value={info}
                onChange={(e) => setInfo(e.target.value)}
                placeholder="Hospital name, precise location, patient details..."
                className="w-full bg-[#ffffff] border border-[#e0e0e0] text-[#333333] rounded-[4px] p-4 min-h-[100px] focus:outline-none focus:border-[#cc0000] resize-y"
              ></textarea>
            </div>

            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 bg-[#cc0000] hover:bg-[#aa0000] text-white rounded-[4px] font-bold transition-colors flex justify-center items-center gap-2 text-lg disabled:opacity-70"
            >
              {loading ? 'Submitting...' : <><Navigation className="w-5 h-5" /> Submit Request</>}
            </button>
            
          </div>
        )}

        {/* Footer Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Link href="/search" className="bg-[#ffffff] rounded-[4px] p-6 border border-[#e0e0e0] hover:bg-[#f4f4f4] transition-colors flex items-center justify-between text-[#333333]">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-[#f4f4f4] rounded-full flex items-center justify-center text-[#cc0000]"><Search className="w-5 h-5" /></div>
               <div><div className="font-bold mb-0.5">Find Donors</div><div className="text-sm text-[#666666]">Search available donors directly.</div></div>
            </div>
            <div className="text-[#cc0000]">→</div>
          </Link>
          <Link href="/profile" className="bg-[#ffffff] rounded-[4px] p-6 border border-[#e0e0e0] hover:bg-[#f4f4f4] transition-colors flex items-center justify-between text-[#333333]">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-[#f4f4f4] rounded-full flex items-center justify-center text-[#cc0000]"><CalendarDays className="w-5 h-5" /></div>
               <div><div className="font-bold mb-0.5">My Requests</div><div className="text-sm text-[#666666]">View and manage past requests.</div></div>
            </div>
            <div className="text-[#cc0000]">→</div>
          </Link>
        </div>

      </div>
    </div>
  );
}
