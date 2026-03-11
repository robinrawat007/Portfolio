import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  const contactInfo = [
    {
      icon: <FaEnvelope className="text-xl" />,
      label: "Email",
      value: "robinrawat37@gmail.com",
      href: "mailto:robinrawat37@gmail.com"
    },
    {
      icon: <FaPhoneAlt className="text-xl" />,
      label: "Phone",
      value: "+91-9416149624",
      href: "tel:+919416149624"
    },
    {
      icon: <FaMapMarkerAlt className="text-xl" />,
      label: "Location",
      value: "Sonipat, Haryana, India",
      desc: "Open to Remote/Hybrid/Relocation",
      href: null
    }
  ];

  return (
    <section id="contact" className="py-24 relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-100 mb-4 tracking-tight">
          Get In Touch
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 mx-auto rounded-full mb-6"></div>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Currently open for new opportunities. Let's discuss how my skills can benefit your team.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="space-y-8 glass-card p-8">
            <h3 className="text-2xl font-bold text-slate-100 mb-6">Contact Information</h3>

            {contactInfo.map((info, idx) => (
              <div key={idx} className="flex items-start gap-4 content-center group">
                <div className="w-12 h-12 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-colors shrink-0">
                  {info.icon}
                </div>
                <div>
                  <p className="text-sm text-slate-400 uppercase tracking-widest font-semibold">{info.label}</p>
                  {info.href ? (
                    <a href={info.href} className="text-lg text-slate-200 hover:text-emerald-400 transition-colors font-medium">
                      {info.value}
                    </a>
                  ) : (
                    <div className="space-y-1 mt-0.5">
                      <p className="text-lg text-slate-200 font-medium leading-none">{info.value}</p>
                      {info.desc && <p className="text-sm text-purple-400">{info.desc}</p>}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="pt-8 mt-2 border-t border-slate-700/50 flex gap-4">
              <a
                href="https://www.linkedin.com/in/robinrawat1"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:text-white transition-all hover:scale-110 shadow-lg"
              >
                <FaLinkedin className="text-xl" />
              </a>
              <a
                href="https://github.com/robinrawat007"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-slate-300 hover:bg-slate-700 hover:text-white transition-all hover:scale-110 shadow-lg"
              >
                <FaGithub className="text-xl" />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Aesthetic geometric shape block for contrast, instead of a functional form since the site is static */}
          <div className="glass-card p-1">
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl p-8 h-full min-h-[400px] flex flex-col items-center justify-center text-center relative overflow-hidden border border-slate-800/50">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

              <div className="relative z-10 space-y-6">
                <div className="w-20 h-20 bg-slate-800 rounded-2xl mx-auto flex items-center justify-center border border-slate-700 rotate-12 shadow-2xl">
                  <span className="text-4xl">🚀</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Let's build something extraordinary</h3>
                <p className="text-slate-400">
                  I'm currently looking for a full-time role where I can contribute to cutting-edge projects and collaborate with talented individuals.
                </p>
                <a
                  href="mailto:robinrawat37@gmail.com"
                  className="inline-block mt-4 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:-translate-y-1 transition-all"
                >
                  Send a Message
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
