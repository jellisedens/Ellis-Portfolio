import { useState } from "react";
import { postMessage } from "../services/api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await postMessage(form);
      if (res.success) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 bg-charcoal">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-3 text-white">Get in Touch</h2>
        <p className="text-center text-white/50 mb-10">Have a project in mind? I'd love to hear about it.</p>

        {status === "sent" ? (
          <div className="border border-green-500/20 bg-green-500/10 text-green-300 rounded-lg p-6 text-center">
            <p className="text-lg font-medium">Message sent!</p>
            <p className="text-sm mt-1 text-green-300/70">Thanks for reaching out. I'll get back to you soon.</p>
            <button onClick={() => setStatus("idle")} className="mt-4 text-sm text-primary hover:underline">
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-white/70 mb-1">Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder-white/30" />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-1">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder-white/30" />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-1">Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder-white/30"></textarea>
            </div>
            {status === "error" && <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>}
            <button type="submit" disabled={status === "sending"}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 font-medium">
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}