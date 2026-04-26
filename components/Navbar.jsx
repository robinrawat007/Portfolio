"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { DripEffect } from '@/components/motion';

const navLinks = [
    { name: 'Home', href: '#hero', color: '#D9FF00' },
    { name: 'About', href: '#about', color: '#00FF85' },
    { name: 'Skills', href: '#skills', color: '#FF0080' },
    { name: 'Projects', href: '#projects', color: '#7B4FE0' },
    { name: 'Contact', href: '#contact', color: '#80FF00' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const menuRef = useRef(null);
    const hamburgerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape' && mobileMenuOpen) {
                setMobileMenuOpen(false);
                hamburgerRef.current?.focus();
            }
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [mobileMenuOpen]);

    // Focus trap for mobile menu
    useEffect(() => {
        if (!mobileMenuOpen || !menuRef.current) return;
        const menu = menuRef.current;
        const focusables = menu.querySelectorAll('a[href], button:not([disabled])');
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        first?.focus();

        const handleTab = (e) => {
            if (e.key !== 'Tab') return;
            if (e.shiftKey) {
                if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
            } else {
                if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
            }
        };
        document.addEventListener('keydown', handleTab);
        return () => document.removeEventListener('keydown', handleTab);
    }, [mobileMenuOpen]);

    useEffect(() => {
        const observers = [];
        navLinks.forEach(({ href }) => {
            const id = href.replace('#', '');
            const el = document.getElementById(id);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
                { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
            );
            obs.observe(el);
            observers.push(obs);
        });
        return () => observers.forEach((o) => o.disconnect());
    }, []);

    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <>
            <nav
                role="navigation"
                aria-label="Main navigation"
                className={`animate-nav-enter fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'border-b py-2'
                    : 'bg-transparent py-2'
                    }`}
                style={scrolled ? {
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    background: 'rgba(10,10,10,0.7)',
                    borderColor: 'var(--border)',
                } : {}}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    {/* Logo */}
                    <a
                        href="#hero"
                        className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg"
                        style={{ '--tw-ring-color': 'var(--neon-yellow)' }}
                        aria-label="Robin Singh Rawat - Home"
                    >
                        <div className="relative z-10 w-32 h-10 md:w-36 md:h-12 flex items-center justify-start group-hover:scale-105 transition-transform origin-left">
                            <Image
                                src="/Logo.png"
                                alt="Robin logo"
                                fill
                                sizes="(max-width: 768px) 128px, 144px"
                                className="object-contain object-left scale-[1.3] md:scale-[1.5]"
                                priority
                            />
                        </div>
                    </a>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.replace('#', '');
                            return (
                                <DripEffect key={link.name} color={link.color}>
                                    <a
                                        href={link.href}
                                        aria-current={isActive ? 'page' : undefined}
                                        className="group relative px-4 py-3 min-h-[44px] text-sm font-medium rounded-full transition-colors flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                                        style={{
                                            color: isActive ? link.color : 'var(--fg-muted)',
                                            '--tw-ring-color': link.color,
                                        }}
                                        onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = link.color; }}
                                        onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--fg-muted)'; }}
                                    >
                                        {link.name}
                                        <span
                                            className={`absolute bottom-1.5 left-4 right-4 h-[2px] origin-left transition-transform duration-300 ease-out ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                                            style={{ background: link.color }}
                                            aria-hidden="true"
                                        />
                                    </a>
                                </DripEffect>
                            );
                        })}
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        ref={hamburgerRef}
                        type="button"
                        className="md:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg transition-colors"
                        style={{ color: 'var(--fg-muted)', '--tw-ring-color': 'var(--neon-yellow)' }}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-expanded={mobileMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--fg)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-muted)'; }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6" aria-hidden="true">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile menu — CSS max-height transition, no Framer */}
            <div
                id="mobile-menu"
                ref={menuRef}
                aria-hidden={!mobileMenuOpen}
                className={`fixed inset-x-0 top-[72px] z-40 border-b md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? 'max-h-80 opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'
                }`}
                style={{
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    background: 'rgba(10,10,10,0.95)',
                    borderColor: 'var(--border)',
                }}
            >
                <div className="px-4 pt-2 pb-6 space-y-1">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.replace('#', '');
                        return (
                            <a
                                key={link.name}
                                href={link.href}
                                aria-current={isActive ? 'page' : undefined}
                                onClick={closeMobileMenu}
                                className="block px-4 py-3 text-base font-medium rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                                style={{
                                    color: isActive ? link.color : 'var(--fg-muted)',
                                    background: isActive ? `${link.color}10` : 'transparent',
                                    '--tw-ring-color': link.color,
                                }}
                            >
                                {link.name}
                            </a>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
