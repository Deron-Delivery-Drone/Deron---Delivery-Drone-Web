import React, { useState } from "react";
import { Mail, Phone, Globe } from "lucide-react";

export default function ContactSection({ t }) {
  const [activeTab, setActiveTab] = useState("investor");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // Send via mailto as fallback (no backend endpoint yet)
      const subject = encodeURIComponent(
        `[${activeTab === "investor" ? "Investor" : "Partner"}] ${formData.name} — ${formData.company || "N/A"}`
      );
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nType: ${activeTab}\n\n${formData.message}`
      );
      window.location.href = `mailto:${t.contact.email}?subject=${subject}&body=${body}`;
      setStatus("success");
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const tabs = [
    {
      id: "investor",
      label: t.contact.investorFormTitle,
      desc: t.contact.investorFormDesc,
    },
    {
      id: "partner",
      label: t.contact.partnerFormTitle,
      desc: t.contact.partnerFormDesc,
    },
  ];

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <p className="text-xs uppercase tracking-[0.25em] text-red-600 dark:text-red-400 mb-2 text-center">
          {t.contact.sectionLabel}
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold mb-12 text-center text-gray-900 dark:text-white">
          {t.contact.title}
        </h2>

        <div className="grid md:grid-cols-5 gap-10">
          {/* Left: Founder info */}
          <div className="md:col-span-2">
            <div className="bg-gray-50 dark:bg-gray-900/70 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-xl shadow-black/5 dark:shadow-black/40">
              <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">
                {t.contact.founderName}
              </h3>
              <p className="text-sm text-red-600 dark:text-red-400 mb-6">
                {t.contact.founderRole}
              </p>
              <div className="space-y-4">
                <a
                  href={`mailto:${t.contact.email}`}
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  <Mail className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{t.contact.email}</span>
                </a>
                <a
                  href={`tel:${t.contact.phone}`}
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  <Phone className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{t.contact.phone}</span>
                </a>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                  <Globe className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{t.contact.website}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form with tabs */}
          <div className="md:col-span-3">
            {/* Tab switcher */}
            <div className="flex gap-2 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setStatus(null);
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-red-600 text-white shadow-md shadow-red-500/20"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
              {tabs.find((tab) => tab.id === activeTab)?.desc}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                required
                placeholder={t.contact.form.name}
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
              <input
                type="email"
                name="email"
                required
                placeholder={t.contact.form.email}
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
              <input
                type="text"
                name="company"
                placeholder={t.contact.form.company}
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
              <textarea
                name="message"
                required
                rows={4}
                placeholder={
                  activeTab === "investor"
                    ? t.contact.form.investorPlaceholder
                    : t.contact.form.partnerPlaceholder
                }
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm resize-none"
              />

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-3 bg-gray-900 text-white rounded-xl hover:bg-black dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-colors shadow-lg shadow-red-500/10 text-sm font-medium disabled:opacity-60"
              >
                {status === "sending"
                  ? t.contact.form.sending
                  : t.contact.form.submit}
              </button>

              {status === "success" && (
                <p className="text-green-600 dark:text-green-400 text-sm text-center">
                  {t.contact.form.success}
                </p>
              )}
              {status === "error" && (
                <p className="text-red-600 dark:text-red-400 text-sm text-center">
                  {t.contact.form.error}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
