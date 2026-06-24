'use client';

import { useState, useEffect } from 'react';
import { supabase } from 'shared';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from './ThemeProvider';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close theme menu on click outside
  useEffect(() => {
    if (!themeMenuOpen) return;
    const handler = () => setThemeMenuOpen(false);
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [themeMenuOpen]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  };

  const navLinks = [
    { href: '/search', label: 'Find Donors', activeClass: 'bg-red-600 text-white shadow-md shadow-red-500/20' },
    { href: '/blood-banks', label: 'Blood Banks', activeClass: 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' },
    { href: '/camps', label: 'Camps', activeClass: 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20' },
    { href: '/request', label: 'Request Blood', activeClass: 'bg-red-900 text-white shadow-md shadow-red-900/20' },
  ];

  const isActive = (href: string) => pathname === href;

  // Theme icons
  const SunIcon = () => (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );

  const MoonIcon = () => (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );

  const MonitorIcon = () => (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );

  const currentIcon = resolvedTheme === 'dark' ? <MoonIcon /> : <SunIcon />;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'glass-strong shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20 group-hover:shadow-red-500/40 transition-shadow">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <span className="font-bold text-lg text-neutral-900 dark:text-white tracking-tight hidden sm:block">
              India Blood Connect
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive(link.href)
                    ? link.activeClass
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth + Theme Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme Toggle */}
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setThemeMenuOpen(!themeMenuOpen); }}
                className="p-2.5 rounded-xl text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800 transition-all"
                aria-label="Toggle theme"
                title={`Theme: ${theme}`}
              >
                {currentIcon}
              </button>

              {themeMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-neutral-900 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-700 py-1 animate-scale-in z-50" onClick={(e) => e.stopPropagation()}>
                  {[
                    { key: 'light' as const, label: 'Light', icon: <SunIcon /> },
                    { key: 'dark' as const, label: 'Dark', icon: <MoonIcon /> },
                    { key: 'system' as const, label: 'System', icon: <MonitorIcon /> },
                  ].map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => { setTheme(opt.key); setThemeMenuOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition-all ${
                        theme === opt.key
                          ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10'
                          : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                      }`}
                    >
                      <span className="opacity-70">{opt.icon}</span>
                      {opt.label}
                      {theme === opt.key && (
                        <svg className="w-4 h-4 ml-auto text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-700 mx-1"></div>

            {user ? (
              <>
                <Link
                  href="/chat"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800 transition-all"
                >
                  Chats
                </Link>
                <Link
                  href="/profile"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800 transition-all"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800 transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/login"
                  className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-xl text-sm font-bold shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all active:scale-[0.97]"
                >
                  Register as Donor
                </Link>
              </>
            )}
          </div>

          {/* Mobile: Theme + Menu Toggle */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Quick cycle: light → dark → system → light
                const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
                setTheme(next);
              }}
              className="p-2 rounded-xl text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'system' ? <MonitorIcon /> : currentIcon}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-xl text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 transition-all"
              aria-label="Toggle menu"
            >
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
        <div className="md:hidden glass-strong border-t border-neutral-200/50 dark:border-neutral-800/50 animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  isActive(link.href)
                    ? link.activeClass
                    : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Theme Selector */}
            <div className="px-4 py-3">
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Theme</p>
              <div className="flex gap-2">
                {[
                  { key: 'light' as const, label: 'Light', icon: <SunIcon /> },
                  { key: 'dark' as const, label: 'Dark', icon: <MoonIcon /> },
                  { key: 'system' as const, label: 'Auto', icon: <MonitorIcon /> },
                ].map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => setTheme(opt.key)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      theme === opt.key
                        ? 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 border border-red-200 dark:border-red-500/20'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border border-transparent'
                    }`}
                  >
                    {opt.icon}
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-neutral-200 dark:border-neutral-800 my-2" />
            {user ? (
              <>
                <Link href="/chat" onClick={() => setMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-semibold text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800">Chats</Link>
                <Link href="/profile" onClick={() => setMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-semibold text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800">Profile</Link>
                <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-semibold text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800">Login</Link>
                <Link href="/login" onClick={() => setMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-red-600 to-red-500 text-center">Register as Donor</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
