"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      form.subject ? `[INML] ${form.subject}` : "[INML] Website contact",
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );

    window.location.href = `mailto:honyang@ucalgary.ca?subject=${subject}&body=${body}`;
  };

  return (
    <div className="nm-page-enter nm-page-shell">
      <div className="nm-label">Get in Touch</div>
      <h1 className="nm-page-title mb-10 sm:mb-16">Contact Us</h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        {/* Left Column (Info) */}
        <div className="flex flex-col gap-10">
          <div>
            <div className="font-mono text-[10px] text-white/30 uppercase tracking-[0.15em] mb-3">
              Location
            </div>
            <p className="font-sans font-light text-[14px] leading-[1.9] text-white/45">
              Intelligent Navigation and Mapping Lab<br />
              Dept. of Geomatics Engineering<br />
              University of Calgary<br />
              2500 University Dr NW<br />
              Calgary, AB T2N 1N4, Canada
            </p>
          </div>

          <div>
            <div className="font-mono text-[10px] text-white/30 uppercase tracking-[0.15em] mb-3">
              Director
            </div>
            <p className="font-sans font-light text-[14px] text-white/45">
              Dr. Hongzhou Yang<br />
              <a
                href="mailto:honyang@ucalgary.ca"
                className="text-white/45 hover:text-white transition-colors duration-150"
              >
                honyang@ucalgary.ca
              </a>
            </p>
          </div>

          <div>
            <div className="font-mono text-[10px] text-white/30 uppercase tracking-[0.15em] mb-3">
              Prospective Students
            </div>
            <p className="font-sans font-light text-[14px] leading-[1.75] text-white/45">
              We are always looking for motivated graduate students with strong backgrounds in engineering, mathematics, or computer science. Please include your CV, transcripts, and a brief research statement when reaching out about graduate positions.
            </p>
          </div>
        </div>

        {/* Right Column (Form) */}
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30 mb-2.5 block">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="nm-input"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30 mb-2.5 block">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="nm-input"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30 mb-2.5 block">
                Subject
              </label>
              <input
                type="text"
                required
                placeholder="What is this about?"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="nm-input"
              />
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30 mb-2.5 block">
                Message
              </label>
              <textarea
                required
                rows={5}
                placeholder="Your message..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="nm-input resize-none"
              />
            </div>

            <div className="pt-4">
              <button type="submit" className="nm-btn-primary">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
