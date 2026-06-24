'use client';

import { 
  Droplet, 
  Trash2, 
  Clock, 
  Users, 
  Scale, 
  MapPin, 
  Heart 
} from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 pt-20">
      
      {/* 1. Header */}
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-white inline-block relative">
          About Us
          <div className="absolute -bottom-4 left-1/4 right-1/4 h-[2px] bg-[#d32f2f]"></div>
        </h1>
      </div>

      {/* 2. Problems Section (Dark Background) */}
      <section className="bg-black text-white py-24 relative overflow-hidden">
        {/* Subtle red accent on the right */}
        <div className="absolute top-0 bottom-0 right-0 w-2 bg-[#990a12] md:w-3"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left: Title */}
            <div className="flex flex-col justify-center">
              <h3 className="text-white font-bold text-xl mb-4 relative inline-block w-max">
                Problems
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#d32f2f]"></div>
              </h3>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mt-2 text-white">
                Blood Donation in numbers
              </h2>
            </div>

            {/* Right: Timeline */}
            <div className="relative border-l-[3px] border-white ml-8 lg:ml-0 py-4">
              
              {/* Shortage */}
              <div className="relative mb-16 pl-12">
                <div className="absolute -left-[1.35rem] top-1 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-[3px] border-black">
                  <Droplet className="w-5 h-5 text-[#990a12] fill-[#990a12]" />
                </div>
                <h4 className="text-2xl font-bold mb-3">Shortage</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Every single day in India, a deficiency in the supply of blood results in over 12,000 individuals not being able to obtain the necessary amount.
                </p>
              </div>

              {/* Wastage */}
              <div className="relative mb-16 pl-12">
                <div className="absolute -left-[1.35rem] top-1 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-[3px] border-black">
                  <Trash2 className="w-4 h-4 text-[#990a12] fill-[#990a12]" />
                </div>
                <h4 className="text-2xl font-bold mb-3">Wastage</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Because of the lack of collaboration between medical facilities and blood donation centers, more than a million units of components of blood were not utilized.
                </p>
              </div>

              {/* Waiting Time */}
              <div className="relative pl-12">
                <div className="absolute -left-[1.35rem] top-1 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-[3px] border-black">
                  <Clock className="w-5 h-5 text-[#990a12] fill-[#990a12]" />
                </div>
                <h4 className="text-2xl font-bold mb-3">Waiting Time</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  It can take longer than 12 hours to complete a blood transfusion after making a request for it, since it can be difficult to locate a compatible donor.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. Solution Section (Light Background) */}
      <section className="bg-white dark:bg-neutral-950 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Title (Span 4) */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <h3 className="text-black dark:text-white font-bold text-xl mb-4 relative inline-block w-max">
                Solution
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#d32f2f]"></div>
              </h3>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mt-2 text-neutral-900 dark:text-white">
                India Blood Connect Advantage
              </h2>
            </div>

            {/* Right: Grid Cards (Span 8) */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1 */}
              <div className="bg-white dark:bg-neutral-900 p-8 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.1)] dark:shadow-none dark:border border-neutral-800 rounded-sm text-center transition-transform hover:-translate-y-1">
                <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-[#990a12] fill-[#990a12]" />
                </div>
                <h4 className="text-[#990a12] font-semibold mb-4 text-lg">Peer-to-Peer Connect</h4>
                <p className="text-neutral-500 dark:text-neutral-400 text-[13px] leading-relaxed">
                  We link up people who provide blood donations with those who need it, so that the donor can witness the positive outcome of their contribution in someone&apos;s life.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white dark:bg-neutral-900 p-8 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.1)] dark:shadow-none dark:border border-neutral-800 rounded-sm text-center transition-transform hover:-translate-y-1">
                <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center">
                  <Scale className="w-12 h-12 text-[#990a12] fill-transparent stroke-[1.5]" />
                </div>
                <h4 className="text-[#990a12] font-semibold mb-4 text-lg">Demand Supply Balance</h4>
                <p className="text-neutral-500 dark:text-neutral-400 text-[13px] leading-relaxed">
                  By directly providing blood to those in need, the donation will be used to fill an existing demand without being wasted.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white dark:bg-neutral-900 p-8 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.1)] dark:shadow-none dark:border border-neutral-800 rounded-sm text-center transition-transform hover:-translate-y-1">
                <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-[#990a12] fill-[#990a12] stroke-white" />
                </div>
                <h4 className="text-[#990a12] font-semibold mb-4 text-lg">Near By</h4>
                <p className="text-neutral-500 dark:text-neutral-400 text-[13px] leading-relaxed">
                  India Blood Connect disseminates blood requests to all potential blood donors who are located within a 5 km radius of where the blood is needed. This enhances the likelihood of a donor going to a medical facility or a blood bank to give blood to a person in need. Additionally, it reduces the time taken to satisfy a request for blood.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white dark:bg-neutral-900 p-8 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.1)] dark:shadow-none dark:border border-neutral-800 rounded-sm text-center transition-transform hover:-translate-y-1">
                <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center bg-[#990a12] rounded-full text-white">
                  <Clock className="w-8 h-8 fill-transparent" />
                </div>
                <h4 className="text-[#990a12] font-semibold mb-4 text-lg">Real Time</h4>
                <p className="text-neutral-500 dark:text-neutral-400 text-[13px] leading-relaxed">
                  Our system links those who provide blood with those who are in need of it quickly, which cuts down the amount of time needed. This saved time can be instrumental in preserving lives during an emergency.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. Join the Cause Section */}
      <section className="bg-[#f9f9f9] dark:bg-neutral-900 py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-800 dark:text-white mb-10 inline-block relative">
            Join the Cause
            <div className="absolute -bottom-4 left-1/4 right-1/4 h-[2px] bg-[#d32f2f]"></div>
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 leading-loose text-sm md:text-base px-4 md:px-12">
            India Blood Connect is a unique system that makes it possible to find a blood bank or hospital in a particular area in real time. The main purpose is to make it easier to find blood banks and hospitals to donate blood and request blood. The India Blood Connect app and web platform allow users to search for blood banks and hospitals online to get blood and donate blood from trustworthy blood banks. It also helps blood banks to accept blood, process blood donations, blood requests and issue blood to people in need through its blood bank management software. The app provides geo-searching, Donation Form & Request Form, appointment scheduling, notifications, and updates to make it easier to find blood banks and hospitals in an emergency. We are reaching out to the community to ask for their help in registering donors for India Blood Connect, which is another step towards creating a better society.
          </p>
        </div>
      </section>

      {/* 5. Vision and Mission Section */}
      <section className="bg-white dark:bg-neutral-950 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-4xl font-normal text-neutral-800 dark:text-neutral-200">
            Our <span className="text-[#d32f2f]">Vision</span> and <span className="text-[#d32f2f]">Mission</span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Vision Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            {/* Vision Image */}
            <div className="bg-white dark:bg-neutral-900 rounded-tr-[5rem] rounded-bl-[5rem] rounded-tl-xl rounded-br-xl relative h-[300px] border-l-[3px] border-t-[3px] border-[#990a12] flex items-center justify-center overflow-hidden shadow-lg">
               <img src="/vision.png" alt="Vision Illustration" className="w-full h-full object-contain p-8" />
            </div>
            
            <div className="text-left md:pl-8">
              <h3 className="text-2xl font-bold text-neutral-800 dark:text-white mb-4">Vision</h3>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
                24x7 availability of blood so that No one should die waiting for Blood, Blood should wait to give a life.
              </p>
            </div>
          </div>

          {/* Mission Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-left md:pr-8 order-2 md:order-1">
              <h3 className="text-2xl font-bold text-neutral-800 dark:text-white mb-4">Mission</h3>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
                Nobody will die waiting for blood after 31st December 2025
              </p>
            </div>

            {/* Mission Image */}
            <div className="bg-white dark:bg-neutral-900 rounded-tl-[5rem] rounded-br-[5rem] rounded-tr-xl rounded-bl-xl relative h-[300px] border-l-[3px] border-t-[3px] border-[#990a12] flex items-center justify-center overflow-hidden order-1 md:order-2 shadow-lg">
               <img src="/mission.png" alt="Mission Illustration" className="w-full h-full object-contain p-8" />
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
