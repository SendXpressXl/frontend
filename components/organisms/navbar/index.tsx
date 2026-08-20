import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NAV_LINKS = [
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'My Deals', href: '/deals' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'For Suppliers', href: '/sell' },
];

export function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-sm'
          : 'bg-white border-b border-zinc-100'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">

          {/* Brand */}
          <Link href="/" onClick={close} className="flex items-center gap-2 shrink-0">
            <div className="w-6 h-6 rounded-md bg-emerald-600 flex items-center justify-center">
              <span className="text-[11px] font-black text-white">S</span>
            </div>
            <span className="text-sm font-bold text-zinc-900 tracking-tight">SendXpress</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-0.5 list-none m-0 p-0">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    router.pathname === href
                      ? 'text-zinc-900 bg-zinc-100'
                      : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors px-2"
            >
              Sign in
            </Link>
            <Link
              href="/marketplace"
              className="px-4 py-1.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(v => !v)}
            className="flex md:hidden w-8 h-8 items-center justify-center flex-col gap-[5px] rounded-md hover:bg-zinc-100 transition-colors"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span className={`block w-4 h-[1.5px] bg-zinc-900 rounded transition-all duration-200 ${open ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-4 h-[1.5px] bg-zinc-900 rounded transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-4 h-[1.5px] bg-zinc-900 rounded transition-all duration-200 ${open ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        onClick={close}
        className={`fixed inset-0 z-40 bg-black/20 md:hidden transition-opacity duration-200 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Mobile drawer */}
      <div className={`fixed top-14 left-0 right-0 z-50 md:hidden bg-white border-b border-zinc-200 shadow-lg transition-all duration-200 ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'}`}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={close}
              className="flex items-center px-3 py-2.5 rounded-md text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-colors min-h-[44px]"
            >
              {label}
            </Link>
          ))}
          <div className="pt-3 border-t border-zinc-100 flex flex-col gap-2 mt-1">
            <Link
              href="/marketplace"
              onClick={close}
              className="w-full py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md text-center transition-colors min-h-[44px] flex items-center justify-center"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
