import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const SocialLink3 = ({ href, icon, bg }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className={`w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-slate-300 ${bg} hover:text-white transition-all hover:scale-110 shadow-lg`}
  >
    <div className="text-xl">{icon}</div>
  </a>
);

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
      desc: "Open to Remote",
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
          Let's Build the Future
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#7B4FE0] via-[#5b6ef1] to-[#2DCFCF] mx-auto rounded-full mb-6"></div>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Currently open for AI Integration and Senior Frontend roles. Let's discuss how we can build something intelligent together.
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
            <h3 className="text-2xl font-bold text-slate-100 mb-6">Connect with Me</h3>

            {contactInfo.map((info, idx) => (
              <div key={idx} className="flex items-start gap-4 content-center group">
                <div className="w-12 h-12 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center justify-center text-[#7B4FE0] group-hover:bg-[#7B4FE0]/20 group-hover:text-[#7B4FE0] transition-colors shrink-0">
                  {info.icon}
                </div>
                <div>
                  <p className="text-sm text-slate-400 uppercase tracking-widest font-semibold">{info.label}</p>
                  {info.href ? (
                    <a href={info.href} className="text-lg text-slate-200 hover:text-[#2DCFCF] transition-colors font-medium">
                      {info.value}
                    </a>
                  ) : (
                    <div className="space-y-1 mt-0.5">
                      <p className="text-lg text-slate-200 font-medium leading-none">{info.value}</p>
                      {info.desc && <p className="text-sm text-[#7B4FE0]">{info.desc}</p>}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="pt-8 mt-2 border-t border-slate-700/50 flex flex-wrap gap-4">
              <SocialLink3 href="https://www.linkedin.com/in/robinrawat1" icon={<FaLinkedin />} bg="hover:bg-blue-600" />
              <SocialLink3 href="https://github.com/robinrawat007" icon={<FaGithub />} bg="hover:bg-slate-700" />
              <SocialLink3 href="https://thestackshift.beehiiv.com" icon={<span className="text-xs font-bold">NEWS</span>} bg="hover:bg-[#7B4FE0]" />
              <SocialLink3 href="https://topmate.io/robin_singh_rawat" icon={<span className="text-xs font-bold">BOOK</span>} bg="hover:bg-[#2DCFCF]" />
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
          <div className="glass-card p-1">
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl p-8 h-full min-h-[400px] flex flex-col items-center justify-center text-center relative overflow-hidden border border-slate-800/50">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#2DCFCF]/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#7B4FE0]/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

              <div className="relative z-10 space-y-6">
                <div className="w-20 h-20 bg-slate-800 rounded-2xl mx-auto flex items-center justify-center border border-slate-700 rotate-12 shadow-2xl">
                  <span className="text-4xl">🤖</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Hire an AI-Forward Developer</h3>
                <p className="text-slate-400">
                  I'm ready to bring my 5 years of engineering experience and AI expertise to your next big project. Let's talk about remote opportunities.
                </p>
                <a
                  href="mailto:robinrawat37@gmail.com"
                  className="inline-block mt-4 px-8 py-4 bg-gradient-to-r from-[#7B4FE0] to-[#2DCFCF] text-white rounded-full font-bold shadow-[0_0_20px_rgba(123,79,224,0.4)] hover:shadow-[0_0_30px_rgba(123,79,224,0.6)] hover:-translate-y-1 transition-all"
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
