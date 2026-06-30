import { useState } from "react";
import { toast } from "sonner";
import SectionHeader from "./SectionHeader.jsx";
import { PROFILE, SOCIAL } from "./portfolio.js";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";

const ICONS = { Mail, Phone, Github, Linkedin };

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in name, email and message.");
      return;
    }
    setSubmitting(true);
    try {
        const apiUrl = "http://localhost:8001/api/contact";
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
      if (!response.ok) throw new Error("Failed to send message");
      toast.success("Message sent — I'll get back to you soon!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Unable to send message. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="relative px-6 md:px-12 py-24 md:py-32">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          index="07"
          kicker="Get in touch"
          title="Let's build, collaborate, or just say hello."
          subtitle="Internships, hackathons, freelance gigs, or a coffee chat about data, design or community — my inbox is open."
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left — info */}
          <div className="md:col-span-5 space-y-8">
            <a
              href={`mailto:${PROFILE.email}`}
              data-testid="contact-email-link"
              className="block group"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B7280] mb-2">
                Email
              </p>
              <p className="font-display text-2xl md:text-3xl text-white group-hover:text-accent transition-colors break-words">
                {PROFILE.email}
              </p>
            </a>

            <a
              href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}
              data-testid="contact-phone-link"
              className="block group"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B7280] mb-2">
                Phone
              </p>
              <p className="font-display text-2xl md:text-3xl text-white group-hover:text-accent transition-colors">
                {PROFILE.phone}
              </p>
            </a>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B7280] mb-2">
                Location
              </p>
              <p className="flex items-center gap-2 text-white text-lg">
                <MapPin className="w-4 h-4 text-accent" /> {PROFILE.location}
              </p>
            </div>

            <div className="pt-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B7280] mb-4">
                Elsewhere
              </p>
              <div className="flex items-center gap-3">
                {SOCIAL.map((s) => {
                  const Icon = ICONS[s.icon] || Mail;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      data-testid={`social-${s.label.toLowerCase()}`}
                      aria-label={s.label}
                      className="w-11 h-11 inline-flex items-center justify-center border border-[#2A2A2A] rounded-sm text-[#9CA3AF] hover:text-accent hover:border-accent transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <form
            onSubmit={onSubmit}
            data-testid="contact-form"
            className="md:col-span-7 bg-[#121212] border border-[#2A2A2A] rounded-sm p-8 md:p-10 space-y-6"
          >
            <Field
              label="Your name"
              name="name"
              value={form.name}
              onChange={onChange}
              testid="contact-input-name"
              placeholder="Aisha Rahman"
            />
            <Field
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              testid="contact-input-email"
              placeholder="you@domain.com"
            />
            <Field
              label="Subject (optional)"
              name="subject"
              value={form.subject}
              onChange={onChange}
              testid="contact-input-subject"
              placeholder="Internship opportunity, collab idea…"
            />
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B7280] block mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={onChange}
                data-testid="contact-input-message"
                placeholder="Tell me what you're building or what you'd like to chat about…"
                className="w-full bg-transparent border-b border-[#2A2A2A] focus:border-accent focus:outline-none text-white text-base py-3 placeholder:text-[#4B5563] resize-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              data-testid="contact-submit-btn"
              className="group inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-sm font-mono text-xs uppercase tracking-[0.18em] hover:bg-[#FF6B00] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Sending…" : "Send message"}
              <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, value, onChange, type = "text", placeholder, testid }) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B7280] block mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        data-testid={testid}
        className="w-full bg-transparent border-b border-[#2A2A2A] focus:border-accent focus:outline-none text-white text-base py-3 placeholder:text-[#4B5563] transition-colors"
      />
    </div>
  );
}


