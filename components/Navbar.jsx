"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RESUME_URL = process.env.NEXT_PUBLIC_RESUME_URL;
const navLinks = [
    { name: 'Home',       href: '#hero' },
    { name: 'About',      href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects',   href: '#projects' },
    { name: 'Skills',     href: '#skills' },
    { name: 'Education',  href: '#education' },
    { name: 'Services',   href: '#services' },
    { name: 'Contact',    href: '#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const menuRef = useRef(null);

    // Backdrop blur on scroll
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Escape key closes mobile menu
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape' && mobileMenuOpen) setMobileMenuOpen(false);
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [mobileMenuOpen]);

    // IntersectionObserver tracks which section is on-screen
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
            <motion.nav
                role="navigation"
                aria-label="Main navigation"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl py-2'
                    : 'bg-transparent py-2'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <a
                        href="#hero"
                        className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-full"
                        aria-label="Robin Singh Rawat - Home"
                    >
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-tr from-purple-500 to-emerald-400 p-0.5 shadow-lg group-hover:scale-110 transition-transform">
                            <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center overflow-hidden">
                                <span className="font-heading font-extrabold text-slate-100 tracking-tight text-lg">
                                    RR
                                </span>
                            </div>
                        </div>
                        <span className="font-heading font-bold text-lg text-slate-100 hidden sm:block tracking-wide">
                            Robin Singh Rawat
                        </span>
                    </a>

                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.replace('#', '');
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={`px-4 py-3 min-h-[44px] text-sm font-medium rounded-full transition-colors flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                                        isActive
                                            ? 'text-emerald-400 bg-emerald-500/10'
                                            : 'text-slate-300 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {link.name}
                                </a>
                            );
                        })}

                        {RESUME_URL && (
                            <a
                                href={RESUME_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-4 px-5 py-3 min-h-[44px] text-sm font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full hover:bg-emerald-500 hover:text-white hover:shadow-[0_0_15px_rgba(52,211,153,0.4)] transition-all flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                            >
                                Resume
                            </a>
                        )}
                    </div>

                    <button
                        type="button"
                        className="md:hidden text-slate-300 hover:text-white p-3 min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-lg"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-expanded={mobileMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
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
            </motion.nav>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        ref={menuRef}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="fixed inset-x-0 top-[72px] z-40 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 md:hidden"
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
                                        className={`block px-4 py-3 text-base font-medium rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                                            isActive
                                                ? 'text-emerald-400 bg-emerald-500/10'
                                                : 'text-slate-300 hover:text-white hover:bg-slate-800'
                                        }`}
                                    >
                                        {link.name}
                                    </a>
                                );
                            })}
                            <div className="pt-4 px-4">
                                {RESUME_URL && (
                                    <a
                                        href={RESUME_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex justify-center w-full px-5 py-3 text-base font-semibold bg-emerald-500 text-white shadow-lg rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                                    >
                                        Download Resume
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
