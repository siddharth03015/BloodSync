'use client';

import { FormEvent, useState } from 'react';
import { supabase } from 'shared';
import { useRouter } from 'next/navigation';

export default function RegisterCampPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    campCode: 'Festival',
    date_start: '',
    date_end: '',
    venue: '',
    organizer_name: '',
    address: '',
    contact_phone: '',
    lat: '',
    lng: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const fullTitle = `[${formData.campCode}] ${formData.title}`;
    
    const startDate = new Date(formData.date_start).toISOString();
    const endDate = new Date(formData.date_end).toISOString();

    const { error } = await supabase.from('donation_camps').insert({
      title: fullTitle,
      organizer_name: formData.organizer_name,
      address: formData.venue + ', ' + formData.address,
      city: formData.address,
      lat: parseFloat(formData.lat),
      lng: parseFloat(formData.lng),
      date_start: startDate,
      date_end: endDate,
      contact_phone: formData.contact_phone,
      status: 'upcoming'
    });

    setLoading(false);
    
    if (error) {
      alert('Failed to register camp: ' + error.message);
    } else {
      alert('Blood Camp Registration request submitted successfully!');
      router.push('/camps');
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] pt-28 pb-20 font-sans text-[#333333]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-[#333333] mb-4">Register Blood Camp</h1>
          <p className="text-lg text-[#666666]">Fill out the details below to register a new blood donation camp.</p>
        </div>

        <div className="bg-[#ffffff] border border-[#e0e0e0] rounded-[4px] p-6 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Blood Camp Name */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <label className="md:w-1/3 text-sm font-bold text-[#333333]">
                Blood Camp Name <span className="text-[#cc0000]">*</span>
              </label>
              <div className="md:w-2/3">
                <input required type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Blood Camp Name" className="w-full px-4 py-3 rounded-[4px] border border-[#e0e0e0] bg-[#ffffff] text-[#333333] placeholder-[#aaaaaa] focus:outline-none focus:border-[#cc0000] transition-colors" />
              </div>
            </div>

            {/* Camp Code */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <label className="md:w-1/3 text-sm font-bold text-[#333333]">
                Camp Code <span className="text-[#cc0000]">*</span>
              </label>
              <div className="md:w-2/3 relative">
                <select required name="campCode" value={formData.campCode} onChange={handleChange} className="w-full px-4 py-3 rounded-[4px] border border-[#e0e0e0] bg-[#ffffff] text-[#333333] focus:outline-none focus:border-[#cc0000] transition-colors appearance-none cursor-pointer">
                  <option value="Festival">Festival</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Community">Community</option>
                  <option value="College">College</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-[#666666]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            {/* Start Date */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <label className="md:w-1/3 text-sm font-bold text-[#333333]">
                Start Date <span className="text-[#cc0000]">*</span>
              </label>
              <div className="md:w-2/3">
                <input required type="datetime-local" name="date_start" value={formData.date_start} onChange={handleChange} className="w-full px-4 py-3 rounded-[4px] border border-[#e0e0e0] bg-[#ffffff] text-[#333333] focus:outline-none focus:border-[#cc0000] transition-colors cursor-pointer" />
              </div>
            </div>

            {/* End Date */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <label className="md:w-1/3 text-sm font-bold text-[#333333]">
                End Date <span className="text-[#cc0000]">*</span>
              </label>
              <div className="md:w-2/3">
                <input required type="datetime-local" name="date_end" value={formData.date_end} onChange={handleChange} className="w-full px-4 py-3 rounded-[4px] border border-[#e0e0e0] bg-[#ffffff] text-[#333333] focus:outline-none focus:border-[#cc0000] transition-colors cursor-pointer" />
              </div>
            </div>

            {/* Venue */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <label className="md:w-1/3 text-sm font-bold text-[#333333]">
                Venue <span className="text-[#cc0000]">*</span>
              </label>
              <div className="md:w-2/3">
                <input required type="text" name="venue" value={formData.venue} onChange={handleChange} placeholder="Enter Venue" className="w-full px-4 py-3 rounded-[4px] border border-[#e0e0e0] bg-[#ffffff] text-[#333333] placeholder-[#aaaaaa] focus:outline-none focus:border-[#cc0000] transition-colors" />
              </div>
            </div>

            {/* Sponsored By */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <label className="md:w-1/3 text-sm font-bold text-[#333333]">
                Sponsored By <span className="text-[#cc0000]">*</span>
              </label>
              <div className="md:w-2/3">
                <input required type="text" name="organizer_name" value={formData.organizer_name} onChange={handleChange} placeholder="Enter Sponsored By" className="w-full px-4 py-3 rounded-[4px] border border-[#e0e0e0] bg-[#ffffff] text-[#333333] placeholder-[#aaaaaa] focus:outline-none focus:border-[#cc0000] transition-colors" />
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <label className="md:w-1/3 text-sm font-bold text-[#333333]">
                Address (City) <span className="text-[#cc0000]">*</span>
              </label>
              <div className="md:w-2/3">
                <input required type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter Address (City)" className="w-full px-4 py-3 rounded-[4px] border border-[#e0e0e0] bg-[#ffffff] text-[#333333] placeholder-[#aaaaaa] focus:outline-none focus:border-[#cc0000] transition-colors" />
              </div>
            </div>

            {/* Contact No. */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <label className="md:w-1/3 text-sm font-bold text-[#333333]">
                Contact No. <span className="text-[#cc0000]">*</span>
              </label>
              <div className="md:w-2/3">
                <input required type="tel" name="contact_phone" value={formData.contact_phone} onChange={handleChange} placeholder="Enter Contact No." className="w-full px-4 py-3 rounded-[4px] border border-[#e0e0e0] bg-[#ffffff] text-[#333333] placeholder-[#aaaaaa] focus:outline-none focus:border-[#cc0000] transition-colors" />
              </div>
            </div>

            {/* Latitude */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <label className="md:w-1/3 text-sm font-bold text-[#333333]">
                Latitude <span className="text-[#cc0000]">*</span>
              </label>
              <div className="md:w-2/3">
                <input required type="number" step="any" name="lat" value={formData.lat} onChange={handleChange} placeholder="Enter Latitude" className="w-full px-4 py-3 rounded-[4px] border border-[#e0e0e0] bg-[#ffffff] text-[#333333] placeholder-[#aaaaaa] focus:outline-none focus:border-[#cc0000] transition-colors" />
              </div>
            </div>

            {/* Longitude */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <label className="md:w-1/3 text-sm font-bold text-[#333333]">
                Longitude <span className="text-[#cc0000]">*</span>
              </label>
              <div className="md:w-2/3">
                <input required type="number" step="any" name="lng" value={formData.lng} onChange={handleChange} placeholder="Enter Longitude" className="w-full px-4 py-3 rounded-[4px] border border-[#e0e0e0] bg-[#ffffff] text-[#333333] placeholder-[#aaaaaa] focus:outline-none focus:border-[#cc0000] transition-colors" />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 md:pl-[33.33%] md:ml-8">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full md:w-auto px-8 py-3 bg-[#cc0000] hover:bg-[#aa0000] disabled:opacity-70 text-white font-bold rounded-[4px] transition-colors"
              >
                {loading ? 'Submitting...' : 'Register Camp'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
