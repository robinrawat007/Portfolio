"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { DripEffect, GlowText } from '@/components/motion';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const RESUME_URL = process.env.NEXT_PUBLIC_RESUME_URL;
const navLinks = [
    { name: 'Home',       href: '#hero',       color: '#D9FF00' }, // neon-yellow
    { name: 'About',      href: '#about',      color: '#00FF85' }, // neon-green
    { name: 'Experience', href: '#experience', color: '#2DCFCF' }, // neon-cyan
    { name: 'Projects',   href: '#projects',   color: '#7B4FE0' }, // neon-purple
    { name: 'Skills',     href: '#skills',     color: '#FF0080' }, // neon-pink
    { name: 'Education',  href: '#education',  color: '#0080FF' }, // neon-azure
    { name: 'Services',   href: '#services',   color: '#FF8000' }, // neon-orange
    { name: 'Contact',    href: '#contact',    color: '#80FF00' }, // neon-lime
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const menuRef = useRef(null);
    const logoRef = useRef(null);

    useGSAP(() => {
        if (!logoRef.current) return;
        
        // Revolving animation on hover
        const logo = logoRef.current;
        let animation;
        
        const enterAnim = () => {
            animation = gsap.to(logo, {
                rotationY: "+=360",
                duration: 1.5,
                repeat: -1,
                ease: "none",
                overwrite: "auto"
            });
        };

        const leaveAnim = () => {
            if (animation) animation.kill();
            gsap.to(logo, {
                rotationY: 0,
                duration: 0.8,
                ease: "power2.out",
                overwrite: "auto"
            });
        };

        logo.addEventListener('mouseenter', enterAnim);
        logo.addEventListener('mouseleave', leaveAnim);
        
        return () => {
            logo.removeEventListener('mouseenter', enterAnim);
            logo.removeEventListener('mouseleave', leaveAnim);
        };
    }, { scope: logoRef });

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape' && mobileMenuOpen) setMobileMenuOpen(false);
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
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
            <motion.nav
                role="navigation"
                aria-label="Main navigation"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
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
                        className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-full"
                        style={{ '--tw-ring-color': 'var(--neon-yellow)' }}
                        aria-label="Robin Singh Rawat - Home"
                    >
                        <div
                            ref={logoRef}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full p-0.5 shadow-lg group-hover:scale-110 transition-transform flex items-center justify-center overflow-hidden"
                            style={{ 
                                background: 'linear-gradient(135deg, var(--neon-yellow), var(--neon-green))',
                                perspective: '1000px'
                            }}
                        >
                            <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden relative" style={{ background: 'var(--bg)' }}>
                                <Image 
                                    src="/Logo.png"
                                    alt="Robin logo"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <GlowText>
                          <span className="font-heading font-bold text-lg hidden sm:block tracking-wide">
                              Robin Singh Rawat
                          </span>
                        </GlowText>
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
                                        {/* Dynamic link color underline */}
                                        <span
                                            className={`absolute bottom-1.5 left-4 right-4 h-[2px] origin-left transition-transform duration-300 ease-out ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                                            style={{ background: link.color }}
                                            aria-hidden="true"
                                        />
                                    </a>
                                </DripEffect>
                            );
                        })}

                        {RESUME_URL && (
                            <a
                                href={RESUME_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-4 px-5 py-3 min-h-[44px] text-sm font-semibold rounded-full transition-all flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                                style={{
                                    background: 'transparent',
                                    border: '1px solid rgba(217,255,0,0.35)',
                                    color: 'var(--neon-yellow)',
                                    '--tw-ring-color': 'var(--neon-yellow)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'var(--neon-yellow)';
                                    e.currentTarget.style.color = '#000';
                                    e.currentTarget.style.boxShadow = '0 0 15px rgba(217,255,0,0.4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = 'var(--neon-yellow)';
                                    e.currentTarget.style.boxShadow = '';
                                }}
                            >
                                Resume
                            </a>
                        )}
                    </div>

                    {/* Mobile hamburger */}
                    <button
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
            </motion.nav>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        ref={menuRef}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="fixed inset-x-0 top-[72px] z-40 border-b md:hidden"
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
                                            background: isActive ? `${link.color}10` : 'transparent', // added 10 for opacity
                                            '--tw-ring-color': link.color,
                                        }}
                                    >
                                        {link.name}
                                    </a>
                                );
                            })}
                            {RESUME_URL && (
                                <div className="pt-4 px-4">
                                    <a
                                        href={RESUME_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex justify-center w-full px-5 py-3 text-base font-semibold rounded-xl focus:outline-none"
                                        style={{ background: 'var(--neon-yellow)', color: '#000' }}
                                    >
                                        Download Resume
                                    </a>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
