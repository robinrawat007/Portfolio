import React from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

const Certifications = () => {
    return (
        <section id="certifications" className="py-20 relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-100 mb-4 tracking-tight">
                    Certifications
                </h2>
                <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 mx-auto rounded-full mb-6"></div>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    Continuous learning to stay at the forefront of technology.
                </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-8">
                {/* New Certification */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="glass-card p-8 relative overflow-hidden group border-l-4 border-[#7B4FE0]"
                >
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-[#7B4FE0] rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>

                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-[#2DCFCF] text-sm font-semibold tracking-wider uppercase bg-[#2DCFCF]/10 px-3 py-1 rounded-full border border-[#2DCFCF]/20">
                                    2026
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-100 mb-1">
                                AI Accelerator Program
                            </h3>
                            <p className="text-xl text-[#7B4FE0] font-medium mb-3">Outskill</p>
                            <div className="space-y-2">
                                <p className="text-slate-300">
                                    Intensive specialization in AI integration, focusing on LLM orchestration, RAG architectures, and building production-ready AI applications.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Existing Certification */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="glass-card p-8 relative overflow-hidden group"
                >
                    {/* Aesthetic background glow */}
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>

                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-emerald-400 text-sm font-semibold tracking-wider uppercase bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                                    July 2020
                                </span>
                                <span className="text-slate-500 text-sm">216 Hours</span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-100 mb-1">
                                Advance Program in Full Stack Software Engineering
                            </h3>
                            <p className="text-xl text-purple-400 font-medium mb-3">NIIT</p>
                            <div className="space-y-2">
                                <p className="text-slate-300">
                                    Completed a comprehensive 216-hour program covering end-to-end full stack development, including frontend frameworks, backend architecture, and database management.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Certifications;
