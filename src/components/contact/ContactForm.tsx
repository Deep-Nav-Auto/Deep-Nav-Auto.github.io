"use client";

import { useState } from "react";

interface ContactFormProps {
  recipientEmail: string;
}

export function ContactForm({ recipientEmail }: ContactFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      form.subject ? `[INML] ${form.subject}` : "[INML] Website contact",
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );

    window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <label className="mb-2.5 block font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">
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
          <label className="mb-2.5 block font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">
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
        <label className="mb-2.5 block font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">
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
        <label className="mb-2.5 block font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">
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
  );
}
