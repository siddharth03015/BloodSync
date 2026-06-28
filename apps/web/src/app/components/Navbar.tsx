'use client';

import { useState, useEffect } from 'react';
import { supabase } from 'shared';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  };

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#e0e0e0]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-3xl text-[#cc0000]">❤</span>
            <span className="font-bold text-xl text-[#333333] tracking-tight">
              B-Sync
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-6">
            <Link href="/search" className={`text-sm font-semibold hover:underline ${isActive('/search') ? 'text-[#cc0000]' : 'text-[#333333]'}`}>Find Donors</Link>
            <Link href="/blood-banks" className={`text-sm font-semibold hover:underline ${isActive('/blood-banks') ? 'text-[#cc0000]' : 'text-[#333333]'}`}>Blood Banks</Link>

            {/* Blood Camps Dropdown */}
            <div className="relative group">
              <button className="text-sm font-semibold flex items-center gap-1 text-[#333333] hover:underline">
                Blood Camps
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className="absolute top-full right-0 mt-1 w-56 bg-white border border-[#e0e0e0] py-2 hidden group-hover:block z-50">
                <Link href="/camps" className="block px-4 py-2 text-sm font-semibold text-[#333333] hover:underline">
                  Find Blood Camps
                </Link>
                <Link href="/camps/register" className="block px-4 py-2 text-sm font-semibold text-[#333333] hover:underline">
                  Register Blood Camps
                </Link>
              </div>
            </div>

            <Link href="/request" className={`text-sm font-semibold hover:underline ${isActive('/request') ? 'text-[#cc0000]' : 'text-[#333333]'}`}>Request Blood</Link>

            {/* Process Dropdown */}
            <div className="relative group">
              <button className="text-sm font-semibold flex items-center gap-1 text-[#333333] hover:underline">
                Blood Donation Process
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className="absolute top-full right-0 mt-1 w-72 bg-white border border-[#e0e0e0] py-2 hidden group-hover:block z-50">
                <Link href="/process" className="block px-4 py-2 text-sm font-medium text-[#333333] hover:underline">
                  The Process Of Blood Donation
                </Link>
                <Link href="/post-donation" className="block px-4 py-2 text-sm font-medium text-[#333333] hover:underline">
                  What Happens To Post You Donate Your Blood
                </Link>
                <Link href="/pursuit" className="block px-4 py-2 text-sm font-medium text-[#333333] hover:underline">
                  Pre And Post Pursuit Of Blood Donation
                </Link>
              </div>
            </div>
          </div>

          {/* Auth Actions */}
          <div className="hidden xl:flex items-center gap-4">
            {user ? (
              <>
                <Link href="/chat" className="text-sm font-semibold text-[#333333] hover:underline">Chats</Link>
                <Link href="/profile" className="text-sm font-semibold text-[#333333] hover:underline">Profile</Link>
                <button onClick={handleLogout} className="text-sm font-semibold text-[#cc0000] hover:underline">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-semibold text-[#333333] hover:underline">Login</Link>
                <Link href="/login?mode=register" className="px-6 py-2 bg-[#cc0000] hover:bg-[#aa0000] text-white rounded-[4px] text-sm font-bold">
                  Register as Donor
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex xl:hidden items-center">
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-[#333333]" aria-label="Toggle menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="xl:hidden bg-white border-t border-[#e0e0e0]">
          <div className="px-4 py-3 space-y-1">
            <Link href="/search" onClick={() => setMenuOpen(false)} className={`block px-4 py-3 text-base font-semibold ${isActive('/search') ? 'text-[#cc0000]' : 'text-[#333333]'}`}>Find Donors</Link>
            <Link href="/blood-banks" onClick={() => setMenuOpen(false)} className={`block px-4 py-3 text-base font-semibold ${isActive('/blood-banks') ? 'text-[#cc0000]' : 'text-[#333333]'}`}>Blood Banks</Link>

            <div className="px-4 py-2 border-b border-[#e0e0e0]">
              <div className="text-sm font-bold text-[#333333] mb-2">Blood Camps</div>
              <div className="flex flex-col space-y-2 pl-2">
                <Link href="/camps" onClick={() => setMenuOpen(false)} className="block text-sm text-[#666666]">Find Blood Camps</Link>
                <Link href="/camps/register" onClick={() => setMenuOpen(false)} className="block text-sm text-[#666666]">Register Blood Camps</Link>
              </div>
            </div>

            <Link href="/request" onClick={() => setMenuOpen(false)} className={`block px-4 py-3 text-base font-semibold ${isActive('/request') ? 'text-[#cc0000]' : 'text-[#333333]'}`}>Request Blood</Link>
            
            <div className="px-4 py-2 border-b border-[#e0e0e0]">
              <div className="text-sm font-bold text-[#333333] mb-2">Blood Donation Process</div>
              <div className="flex flex-col space-y-2 pl-2">
                <Link href="/process" onClick={() => setMenuOpen(false)} className="block text-sm text-[#666666]">The Process Of Blood Donation</Link>
                <Link href="/post-donation" onClick={() => setMenuOpen(false)} className="block text-sm text-[#666666]">What Happens To Post You Donate Your Blood</Link>
                <Link href="/pursuit" onClick={() => setMenuOpen(false)} className="block text-sm text-[#666666]">Pre And Post Pursuit Of Blood Donation</Link>
              </div>
            </div>

            <div className="pt-2">
              {user ? (
                <>
                  <Link href="/chat" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm font-semibold text-[#333333]">Chats</Link>
                  <Link href="/profile" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm font-semibold text-[#333333]">Profile</Link>
                  <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="w-full text-left px-4 py-3 text-sm font-semibold text-[#cc0000]">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm font-semibold text-[#333333]">Login</Link>
                  <Link href="/login?mode=register" onClick={() => setMenuOpen(false)} className="block px-4 py-3 mt-2 text-sm font-bold text-white bg-[#cc0000] text-center rounded-[4px]">Register as Donor</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
