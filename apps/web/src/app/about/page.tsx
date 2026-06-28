'use client';

import { 
  Droplet, 
  Trash2, 
  Clock, 
  Users, 
  Scale, 
  MapPin 
} from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#ffffff] pt-20">
      
      {/* 1. Header */}
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold text-[#333333] inline-block relative pb-4">
          About Us
          <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#cc0000]"></div>
        </h1>
      </div>

      {/* 2. Problems Section */}
      <section className="bg-[#f9f9f9] py-24 border-y border-[#e0e0e0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left: Title */}
            <div className="flex flex-col justify-center">
              <h3 className="text-[#cc0000] font-bold text-xl mb-4">Problems</h3>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#333333] leading-tight">
                Blood Donation in numbers
              </h2>
            </div>

            {/* Right: Timeline */}
            <div className="border-l-[3px] border-[#cc0000] ml-4 lg:ml-0 py-4 pl-8 space-y-12">
              
              {/* Shortage */}
              <div>
                <h4 className="text-2xl font-bold mb-3 text-[#333333] flex items-center gap-2">
                  <Droplet className="w-6 h-6 text-[#cc0000]" />
                  Shortage
                </h4>
                <p className="text-[#666666] leading-relaxed">
                  Every single day in India, a deficiency in the supply of blood results in over 12,000 individuals not being able to obtain the necessary amount.
                </p>
              </div>

              {/* Wastage */}
              <div>
                <h4 className="text-2xl font-bold mb-3 text-[#333333] flex items-center gap-2">
                  <Trash2 className="w-6 h-6 text-[#cc0000]" />
                  Wastage
                </h4>
                <p className="text-[#666666] leading-relaxed">
                  Because of the lack of collaboration between medical facilities and blood donation centers, more than a million units of components of blood were not utilized.
                </p>
              </div>

              {/* Waiting Time */}
              <div>
                <h4 className="text-2xl font-bold mb-3 text-[#333333] flex items-center gap-2">
                  <Clock className="w-6 h-6 text-[#cc0000]" />
                  Waiting Time
                </h4>
                <p className="text-[#666666] leading-relaxed">
                  It can take longer than 12 hours to complete a blood transfusion after making a request for it, since it can be difficult to locate a compatible donor.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. Solution Section */}
      <section className="bg-[#ffffff] py-24 border-b border-[#e0e0e0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Title (Span 4) */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <h3 className="text-[#cc0000] font-bold text-xl mb-4">Solution</h3>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#333333] leading-tight">
                B-Sync Advantage
              </h2>
            </div>

            {/* Right: Grid Cards (Span 8) */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1 */}
              <div className="bg-[#ffffff] p-8 border border-[#e0e0e0]">
                <Users className="w-8 h-8 text-[#cc0000] mb-4" />
                <h4 className="text-[#333333] font-bold mb-3 text-lg">Peer-to-Peer Connect</h4>
                <p className="text-[#666666] leading-relaxed">
                  We link up people who provide blood donations with those who need it, so that the donor can witness the positive outcome of their contribution in someone's life.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-[#ffffff] p-8 border border-[#e0e0e0]">
                <Scale className="w-8 h-8 text-[#cc0000] mb-4" />
                <h4 className="text-[#333333] font-bold mb-3 text-lg">Demand Supply Balance</h4>
                <p className="text-[#666666] leading-relaxed">
                  By directly providing blood to those in need, the donation will be used to fill an existing demand without being wasted.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-[#ffffff] p-8 border border-[#e0e0e0]">
                <MapPin className="w-8 h-8 text-[#cc0000] mb-4" />
                <h4 className="text-[#333333] font-bold mb-3 text-lg">Near By</h4>
                <p className="text-[#666666] leading-relaxed">
                  B-Sync disseminates blood requests to all potential blood donors who are located within a 5 km radius of where the blood is needed. This enhances the likelihood of a donor going to a medical facility or a blood bank to give blood to a person in need.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-[#ffffff] p-8 border border-[#e0e0e0]">
                <Clock className="w-8 h-8 text-[#cc0000] mb-4" />
                <h4 className="text-[#333333] font-bold mb-3 text-lg">Real Time</h4>
                <p className="text-[#666666] leading-relaxed">
                  Our system links those who provide blood with those who are in need of it quickly, which cuts down the amount of time needed. This saved time can be instrumental in preserving lives during an emergency.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. Join the Cause Section */}
      <section className="bg-[#f9f9f9] py-24 border-b border-[#e0e0e0]">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#333333] mb-8">
            Join the Cause
          </h2>
          <p className="text-[#666666] leading-[1.8] text-[1rem]">
            B-Sync is a unique system that makes it possible to find a blood bank or hospital in a particular area in real time. The main purpose is to make it easier to find blood banks and hospitals to donate blood and request blood. The B-Sync app and web platform allow users to search for blood banks and hospitals online to get blood and donate blood from trustworthy blood banks. It also helps blood banks to accept blood, process blood donations, blood requests and issue blood to people in need through its blood bank management software. The app provides geo-searching, Donation Form & Request Form, appointment scheduling, notifications, and updates to make it easier to find blood banks and hospitals in an emergency. We are reaching out to the community to ask for their help in registering donors for B-Sync, which is another step towards creating a better society.
          </p>
        </div>
      </section>

      {/* 5. Vision and Mission Section */}
      <section className="bg-[#ffffff] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-4xl font-bold text-[#333333]">
            Our <span className="text-[#cc0000]">Vision</span> and <span className="text-[#cc0000]">Mission</span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
            <div className="border border-[#e0e0e0] p-4 bg-[#f9f9f9]">
               <img src="/vision.png" alt="Vision" className="w-full h-auto" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#333333] mb-4">Vision</h3>
              <p className="text-[#666666] leading-relaxed">
                24x7 availability of blood so that No one should die waiting for Blood, Blood should wait to give a life.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold text-[#333333] mb-4">Mission</h3>
              <p className="text-[#666666] leading-relaxed">
                Nobody will die waiting for blood after 31st December 2025
              </p>
            </div>
            <div className="order-1 md:order-2 border border-[#e0e0e0] p-4 bg-[#f9f9f9]">
               <img src="/mission.png" alt="Mission" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
