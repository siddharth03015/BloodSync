'use client';

import { Phone, MapPin, Clock } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { supabase } from 'shared';

export default function ContactUsPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.from('contact_messages').insert({
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      message: formData.message
    });

    setLoading(false);
    
    if (error) {
      alert("Failed to send message: " + error.message);
    } else {
      alert("Your message has been sent successfully!");
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] pt-28 pb-24">
      
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-[#333333] inline-block relative pb-4">
          Contact Us
          <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#cc0000]"></div>
        </h1>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row bg-[#ffffff] border border-[#e0e0e0]">
          
          {/* Left Column (Form) */}
          <div className="w-full lg:w-[60%] p-8 md:p-12">
            <h2 className="text-2xl font-bold text-[#333333] mb-3">Get In Touch</h2>
            <p className="text-[#666666] mb-8 text-[1rem] leading-relaxed">
              Please use this form to contact us regarding any questions, comments or concerns you may have.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First name" className="w-full px-4 py-3 bg-[#ffffff] border border-[#e0e0e0] focus:outline-none focus:border-[#cc0000] text-[#333333]" />
                <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last name" className="w-full px-4 py-3 bg-[#ffffff] border border-[#e0e0e0] focus:outline-none focus:border-[#cc0000] text-[#333333]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email address" className="w-full px-4 py-3 bg-[#ffffff] border border-[#e0e0e0] focus:outline-none focus:border-[#cc0000] text-[#333333]" />
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone number" className="w-full px-4 py-3 bg-[#ffffff] border border-[#e0e0e0] focus:outline-none focus:border-[#cc0000] text-[#333333]" />
              </div>
              <div>
                <textarea required name="message" value={formData.message} onChange={handleChange} placeholder="Message" rows={4} className="w-full px-4 py-3 bg-[#ffffff] border border-[#e0e0e0] focus:outline-none focus:border-[#cc0000] text-[#333333] resize-y"></textarea>
              </div>
              <div className="pt-2">
                <button type="submit" disabled={loading} className="w-full md:w-auto px-8 py-3 bg-[#cc0000] hover:bg-[#aa0000] text-white font-bold rounded-[4px] transition-colors disabled:opacity-70">
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column (Info) */}
          <div className="w-full lg:w-[40%] bg-[#cc0000] text-white p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-3">Reach Us</h2>
            <p className="mb-10 text-white leading-relaxed">
              Please call us regarding any questions, comments or concerns you may have.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 mt-1 text-white" />
                <span className="font-bold text-[1.1rem]">+91-7818801293</span>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 mt-1 text-white" />
                <span className="font-bold text-[1.1rem]">Address - IIT Kharagpur</span>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 mt-1 text-white" />
                <span className="font-bold text-[1.1rem]">Mon-Sat: 9:00 AM - 7:00 PM</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
