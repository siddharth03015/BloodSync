'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from 'shared';

export default function Home() {
  const [stats, setStats] = useState({ donors: 0, lives: 0, cities: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: donorsData } = await supabase.rpc('search_donors_nearby', {
          search_lat: null,
          search_lng: null,
          radius_meters: 0
        });
        
        const totalDonors = donorsData?.length || 0;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const uniqueCities = new Set(donorsData?.map((d: any) => d.city).filter(Boolean));
        
        const { count: fulfilledCount } = await supabase
          .from('blood_requests')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'fulfilled');

        setStats({ 
          donors: totalDonors, 
          lives: (fulfilledCount || 0) * 3, 
          cities: uniqueCities.size
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="bg-[#ffffff] text-[#333333] font-sans">
      
      {/* Hero Section */}
      <div className="max-w-[1100px] mx-auto px-5 py-[60px] flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex-1 text-left w-full">
          <h1 className="text-[2rem] font-bold text-[#333333] mb-4">
            Together, We Keep <br/>
            <span className="text-[#cc0000]">Hope Alive.</span>
          </h1>
          <p className="text-[1rem] text-[#666666] leading-[1.7] mb-8">
            Connect with verified blood donors in your area. Every drop counts.
          </p>
          <Link href="/search" className="inline-block px-6 py-2.5 bg-[#cc0000] text-white rounded-[4px] hover:bg-[#aa0000]">
            Find Donors
          </Link>
        </div>
        <div className="flex-1 w-full text-center">
          <img src="/hands-blood-drop.png" alt="Donate Blood" className="w-full max-w-[400px] mx-auto object-contain" />
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-[#f9f9f9]">
        <div className="max-w-[1100px] mx-auto px-5 py-[60px] flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 w-full text-center">
            <img 
              src="/hero-donate.png" 
              alt="Become a Hero - Donate Blood" 
              className="w-full max-w-[400px] mx-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = `
                  <div>
                    <h3 class="text-[1.5rem] font-bold text-[#333333]">Become a Hero<br/>Donate Blood</h3>
                  </div>
                `;
              }}
            />
          </div>
          <div className="flex-1 w-full">
            <h2 className="text-[1.5rem] font-bold text-[#333333] mb-4">Save Lives, Be a Real Hero</h2>
            <p className="text-[1rem] text-[#666666] leading-[1.7] mb-6">
              Donating blood is a noble act that not everyone can do. With advancements in medicine, the need for blood has increased threefold since the industrial revolution. Every year, India has a deficit of between 30% and 35%. It is absurd to say that the country cannot meet this requirement with 1.2 billion people. The real challenge is not the lack of blood donors, but finding someone willing to donate when needed. Therefore, the aim should be to create a system of people who can help each other in emergencies. Below are some benefits donating blood:
            </p>
            <ul className="list-disc pl-5 mb-8 text-[#333333] text-[1rem] leading-[1.7]">
              <li>Reduces Risk of Cancer</li>
              <li>Boosts the Production of RBC (Red Blood Cells)</li>
              <li>Helps in Weight Loss</li>
              <li>Makes the Donor Psychologically Rejuvenated</li>
              <li>Replenishes Blood</li>
              <li>Lower Cholestrol Level</li>
            </ul>
            <Link href="/search" className="text-[#cc0000] underline hover:text-[#aa0000]">
              EXPLORE NEW
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-[1100px] mx-auto px-5 py-[60px]">
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-b border-[#e0e0e0] py-8">
          <div className="flex-1 text-center border-b md:border-b-0 md:border-r border-[#e0e0e0] pb-6 md:pb-0">
            <div className="text-[2rem] font-bold text-[#cc0000]">{stats.donors.toLocaleString()}</div>
            <div className="text-[#666666] text-sm uppercase">Donors</div>
          </div>
          <div className="flex-1 text-center border-b md:border-b-0 md:border-r border-[#e0e0e0] py-6 md:py-0">
            <div className="text-[2rem] font-bold text-[#cc0000]">{stats.lives.toLocaleString()}</div>
            <div className="text-[#666666] text-sm uppercase">Lives Saved</div>
          </div>
          <div className="flex-1 text-center pt-6 md:pt-0">
            <div className="text-[2rem] font-bold text-[#cc0000]">{stats.cities.toLocaleString()}</div>
            <div className="text-[#666666] text-sm uppercase">Cities Covered</div>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="max-w-[1100px] mx-auto px-5 py-[60px]">
        <blockquote className="border-l-4 border-[#cc0000] pl-6 py-2 my-4">
          <p className="text-[1.2rem] italic text-[#333333] mb-2">
            The best way to find yourself is to lose yourself in the service of others.
          </p>
          <footer className="text-[#666666]">
            &minus; Mahatma Gandhi
          </footer>
        </blockquote>
      </div>

    </div>
  );
}
