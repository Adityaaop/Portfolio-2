"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Loader2, CheckCircle2, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from "./ui/Icons";
import GlassCard from "./GlassCard";
import { useToast } from "./ui/Toast";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { showToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "fc1176d2-fba6-44c4-b0f2-63e0b429ae21";

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: `[Portfolio Contact] ${formData.subject.trim()}`,
          message: formData.message.trim(),
          from_name: `${formData.name.trim()} (Portfolio Contact)`
        })
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to send message.");
      }
      
      setIsSuccess(true);
      showToast("Message sent successfully! Aditya will get back to you shortly.", "success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error: any) {
      showToast(error.message || "Failed to send message. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative w-full py-24 px-6 flex flex-col items-center">
      <div className="max-w-4xl w-full flex flex-col items-center gap-12 z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide uppercase"
          >
            LET'S CONNECT
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-body text-zinc-400 text-sm sm:text-base max-w-lg mx-auto"
          >
            Got a project in mind or just want to say hi? I'm always open to new opportunities and collaborations.
          </motion.p>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-8">
          
          {/* Contact Form */}
          <GlassCard className="flex-1" delay={0.2} hoverEffect={false}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-body text-sm text-zinc-300">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    suppressHydrationWarning={true}
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-tag text-base focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-zinc-600"
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-body text-sm text-zinc-300">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    suppressHydrationWarning={true}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-tag text-base focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-zinc-600"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="font-body text-sm text-zinc-300">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  suppressHydrationWarning={true}
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-tag text-base focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-zinc-600"
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-body text-sm text-zinc-300">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  suppressHydrationWarning={true}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-body text-sm sm:text-base focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all resize-none placeholder:text-zinc-600"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className={`mt-2 flex items-center justify-center gap-2 w-full py-4 rounded-xl font-tag text-base font-bold text-white transition-all duration-300 ${
                  isSuccess 
                    ? "bg-white/10 border-white text-white" 
                    : "bg-white/5 border border-white/10 hover:border-white hover:bg-white/10 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                } border disabled:opacity-70`}
              >
                {isSubmitting ? (
                  <><Loader2 size={18} className="animate-spin" /> Sending...</>
                ) : isSuccess ? (
                  <><CheckCircle2 size={18} /> Message Sent!</>
                ) : (
                  <><Send size={18} /> Send Message</>
                )}
              </button>
            </form>
          </GlassCard>

          {/* Social Links Panel */}
          <div className="flex flex-col gap-4 w-full md:w-64">
            <h3 className="font-tag text-lg font-bold text-white mb-2 text-center md:text-left tracking-wide uppercase">Reach out directly</h3>
            
            <a href="mailto:adityamishra0578@gmail.com" className="group">
              <GlassCard delay={0.3} className="!p-4 flex items-center gap-4 hover:border-white hover:bg-white/10 transition-colors cursor-pointer">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/20 text-zinc-400 group-hover:text-white transition-colors">
                  <Mail size={20} />
                </div>
                <span className="font-tag text-base text-zinc-300 group-hover:text-white transition-colors tracking-wider">Email</span>
              </GlassCard>
            </a>

            <a href="https://www.linkedin.com/in/aditya-ranjan-a52344248" target="_blank" rel="noopener noreferrer" className="group">
              <GlassCard delay={0.4} className="!p-4 flex items-center gap-4 hover:border-white hover:bg-white/10 transition-colors cursor-pointer">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/20 text-zinc-400 group-hover:text-white transition-colors">
                  <LinkedinIcon size={20} />
                </div>
                <span className="font-tag text-base text-zinc-300 group-hover:text-white transition-colors tracking-wider">LinkedIn</span>
              </GlassCard>
            </a>

            <a href="https://github.com/Adityaaop" target="_blank" rel="noopener noreferrer" className="group">
              <GlassCard delay={0.5} className="!p-4 flex items-center gap-4 hover:border-white hover:bg-white/10 transition-colors cursor-pointer">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/20 text-zinc-400 group-hover:text-white transition-colors">
                  <GithubIcon size={20} />
                </div>
                <span className="font-tag text-base text-zinc-300 group-hover:text-white transition-colors tracking-wider">GitHub</span>
              </GlassCard>
            </a>

            <a href="https://leetcode.com/u/Aditya_1901/" target="_blank" rel="noopener noreferrer" className="group">
              <GlassCard delay={0.6} className="!p-4 flex items-center gap-4 hover:border-white hover:bg-white/10 transition-colors cursor-pointer">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/20 text-zinc-400 group-hover:text-white transition-colors">
                  <LeetCodeIcon size={20} />
                </div>
                <span className="font-tag text-base text-zinc-300 group-hover:text-white transition-colors tracking-wider">LeetCode</span>
              </GlassCard>
            </a>

            <a href="tel:+916205834084" className="group">
              <GlassCard delay={0.7} className="!p-4 flex items-center gap-4 hover:border-white hover:bg-white/10 transition-colors cursor-pointer">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/20 text-zinc-400 group-hover:text-white transition-colors">
                  <Phone size={20} />
                </div>
                <span className="font-tag text-base text-zinc-300 group-hover:text-white transition-colors tracking-wider">Phone</span>
              </GlassCard>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
