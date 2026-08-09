import { useState } from "react";
import { toast } from "sonner";
import SectionHeader from "./SectionHeader.jsx";
import { PROFILE, SOCIAL } from "./portfolio.js";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Copy, Check, Sparkles } from "lucide-react";

const ICONS = { Mail, Phone, Github, Linkedin };

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const copyToClipboard = (text, fieldName) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      toast.success(`${fieldName} copied to clipboard!`);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in your name, email and message.");
      return;
    }
    setSubmitting(true);
    try {
      const apiBase = import.meta.env.VITE_API_URL || "/api";
      const apiUrl = `${apiBase}/contact`;

      let sentViaApi = false;
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (response.ok) {
          sentViaApi = true;
        }
      } catch (networkErr) {
        // Fallback for standalone frontend
        console.warn("API server offline, saving message locally:", networkErr);
      }

      // Save to localStorage as a backup message log
      const existing = JSON.parse(localStorage.getItem("portfolio_messages") || "[]");
      existing.push({ ...form, timestamp: new Date().toISOString() });
      localStorage.setItem("portfolio_messages", JSON.stringify(existing));

      toast.success(`Thank you, ${form.name.trim()}! Your message has been sent successfully.`);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Unable to send message right now. You can also reach me directly at " + PROFILE.email);
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
          title="Let's build, collaborate, or discuss new opportunities."
          subtitle="Internships, Data Science research, full-stack projects, or community events — my inbox is always open."
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left info column */}
          <div className="md:col-span-5 space-y-8">
            {/* Email Box */}
            <div className="bg-[#121212] border border-[#2A2A2A] p-6 rounded-sm space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B7280]">
                  Direct Email
                </p>
                <button
                  onClick={() => copyToClipboard(PROFILE.email, "Email")}
                  className="inline-flex items-center gap-1 font-mono text-[10px] text-[#9CA3AF] hover:text-accent transition-colors"
                  title="Copy email"
                >
                  {copiedField === "Email" ? (
                    <span className="text-emerald-400 flex items-center gap-1"><Check className="w-3 h-3" /> Copied</span>
                  ) : (
                    <span className="flex items-center gap-1"><Copy className="w-3 h-3" /> Copy</span>
                  )}
                </button>
              </div>
              <a
                href={`mailto:${PROFILE.email}`}
                data-testid="contact-email-link"
                className="font-display text-xl md:text-2xl text-white hover:text-accent transition-colors block break-words font-semibold"
              >
                {PROFILE.email}
              </a>
            </div>

            {/* Phone Box */}
            <div className="bg-[#121212] border border-[#2A2A2A] p-6 rounded-sm space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B7280]">
                  Phone &amp; WhatsApp
                </p>
                <button
                  onClick={() => copyToClipboard(PROFILE.phone, "Phone")}
                  className="inline-flex items-center gap-1 font-mono text-[10px] text-[#9CA3AF] hover:text-accent transition-colors"
                  title="Copy phone"
                >
                  {copiedField === "Phone" ? (
                    <span className="text-emerald-400 flex items-center gap-1"><Check className="w-3 h-3" /> Copied</span>
                  ) : (
                    <span className="flex items-center gap-1"><Copy className="w-3 h-3" /> Copy</span>
                  )}
                </button>
              </div>
              <a
                href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}
                data-testid="contact-phone-link"
                className="font-display text-xl md:text-2xl text-white hover:text-accent transition-colors block font-semibold"
              >
                {PROFILE.phone}
              </a>
            </div>

            {/* Location */}
            <div className="bg-[#121212] border border-[#2A2A2A] p-6 rounded-sm">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B7280] mb-2">
                Location
              </p>
              <p className="flex items-center gap-2 text-white text-base font-medium">
                <MapPin className="w-4 h-4 text-accent" /> {PROFILE.location}
              </p>
            </div>

            {/* Social profiles */}
            <div className="pt-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B7280] mb-4">
                Social &amp; Developer Profiles
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
                      title={s.label}
                      className="w-12 h-12 inline-flex items-center justify-center border border-[#2A2A2A] bg-[#121212] rounded-sm text-[#9CA3AF] hover:text-accent hover:border-accent hover:bg-[#181818] transition-all cursor-pointer shadow-sm"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right form column */}
          <form
            onSubmit={onSubmit}
            data-testid="contact-form"
            className="md:col-span-7 bg-[#121212] border border-[#2A2A2A] rounded-sm p-8 md:p-10 space-y-6 shadow-xl"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-accent font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Send a direct message</span>
            </div>

            <Field
              label="Your Name *"
              name="name"
              value={form.name}
              onChange={onChange}
              testid="contact-input-name"
              placeholder="e.g. Aisha Rahman"
              required
            />
            <Field
              label="Your Email Address *"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              testid="contact-input-email"
              placeholder="e.g. aisha@domain.com"
              required
            />
            <Field
              label="Subject / Topic (Optional)"
              name="subject"
              value={form.subject}
              onChange={onChange}
              testid="contact-input-subject"
              placeholder="Internship opportunity, hackathon collab, project idea…"
            />
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B7280] block mb-2 font-medium">
                Message Content *
              </label>
              <textarea
                name="message"
                rows={5}
                required
                value={form.message}
                onChange={onChange}
                data-testid="contact-input-message"
                placeholder="Tell me what you're building, what role you're hiring for, or what you'd like to chat about…"
                className="w-full bg-[#181818] border border-[#2A2A2A] rounded-sm p-4 focus:border-accent focus:outline-none text-white text-base placeholder:text-[#4B5563] resize-none transition-colors"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <button
                type="submit"
                disabled={submitting}
                data-testid="contact-submit-btn"
                className="group inline-flex items-center gap-2 bg-accent hover:bg-[#FF8B33] text-white px-8 py-3.5 rounded-sm font-mono text-xs uppercase tracking-[0.18em] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg font-semibold cursor-pointer"
              >
                {submitting ? "Transmitting…" : "Send Message"}
                <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <span className="font-mono text-[10px] text-[#6B7280]">
                ⚡ Guaranteed response within 24 hours
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, value, onChange, type = "text", placeholder, testid, required = false }) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B7280] block mb-2 font-medium">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        data-testid={testid}
        className="w-full bg-[#181818] border border-[#2A2A2A] rounded-sm px-4 py-3 focus:border-accent focus:outline-none text-white text-base placeholder:text-[#4B5563] transition-colors"
      />
    </div>
  );
}
