import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#f4f4f4] text-[#333333] pt-16 pb-8 border-t border-[#e0e0e0]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-4 mb-16">
          
          {/* Column 1: Save Life */}
          <div>
            <h4 className="text-xl font-bold mb-6 tracking-wide text-[#333333]">Save Life</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/request" className="text-[#666666] hover:text-[#333333] hover:underline transition-colors">Request Blood</Link></li>
              <li><Link href="/blood-banks" className="text-[#666666] hover:text-[#333333] hover:underline transition-colors">Find Blood Bank</Link></li>
              <li><Link href="/camps" className="text-[#666666] hover:text-[#333333] hover:underline transition-colors">Find Blood Camp</Link></li>
            </ul>
          </div>

          {/* Column 2: Register */}
          <div>
            <h4 className="text-xl font-bold mb-6 tracking-wide text-[#333333]">Register</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/login" className="text-[#666666] hover:text-[#333333] hover:underline transition-colors">Login</Link></li>
              <li><Link href="/login" className="text-[#666666] hover:text-[#333333] hover:underline transition-colors">Signup</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-xl font-bold mb-6 tracking-wide text-[#333333]">Company</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/about" className="text-[#666666] hover:text-[#333333] hover:underline transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-[#666666] hover:text-[#333333] hover:underline transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="text-[#666666] hover:text-[#333333] hover:underline transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-[#666666] hover:text-[#333333] hover:underline transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Column 4: Brand & Description */}
          <div className="lg:pr-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6 text-[#cc0000] fill-current" />
              </div>
              <h4 className="text-xl font-black tracking-widest uppercase text-[#333333]">B-SYNC</h4>
            </div>
            <p className="text-sm text-[#666666] font-medium leading-relaxed mb-6">
              B-Sync is a platform that helps to streamline blood donation and blood request which puts the power to save a life in the palm of your hand.
            </p>
          </div>
          
        </div>
        
        <div className="text-center text-sm text-[#666666] border-t border-[#e0e0e0] pt-8">
          &copy; {new Date().getFullYear()} B-Sync. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
