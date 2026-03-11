import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 shadow-lg py-4' : 'bg-transparent py-6'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    {/* Logo element */}
                    <a href="#hero" className="flex items-center gap-3 group">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-purple-500 to-emerald-400 p-0.5 shadow-lg group-hover:scale-110 transition-transform">
                            <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center overflow-hidden">
                                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain p-1" />
                            </div>
                        </div>
                        <span className="font-heading font-bold text-xl text-slate-100 hidden sm:block tracking-wide">
                            Robin Singh Rawat
                        </span>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}

                        <a
                            href="/resume.pdf"
                            target="_blank"
                            download
                            className="ml-4 px-5 py-2 text-sm font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full hover:bg-emerald-500 hover:text-white hover:shadow-[0_0_15px_rgba(52,211,153,0.4)] transition-all"
                        >
                            Resume
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-slate-300 hover:text-white p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />
                            )}
                        </svg>
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="fixed inset-x-0 top-[72px] z-40 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 md:hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block px-4 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="pt-4 px-4">
                                <a
                                    href="/resume.pdf"
                                    target="_blank"
                                    download
                                    className="flex justify-center w-full px-5 py-3 text-base font-semibold bg-emerald-500 text-white shadow-lg rounded-xl"
                                >
                                    Download Resume
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
