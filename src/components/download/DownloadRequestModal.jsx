import React, { useMemo, useState } from "react";
import { PLATFORM_OPTIONS } from "../../constants/platforms";
import { validateDownloadRequest } from "../../utils/validation";
import { submitDownloadRequest } from "../../lib/downloadRequests";
import { DOWNLOAD_BUILDS } from "../../config/downloadBuilds";

const INITIAL = {
  full_name: "",
  email: "",
  phone: "",
  company_name: "",
  job_title: "",
  industry: "",
  country: "",
  message: "",
};

export default function DownloadRequestModal({ open, onClose, language, t, detectedPlatform }) {
  const [form, setForm] = useState(INITIAL);
  const [selectedPlatform, setSelectedPlatform] = useState(detectedPlatform === "unknown" ? "" : detectedPlatform);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const platformOptions = useMemo(
    () => PLATFORM_OPTIONS.map((p) => ({ ...p, available: DOWNLOAD_BUILDS[p.key]?.available })),
    []
  );

  if (!open) return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      detected_platform: detectedPlatform,
      selected_platform: selectedPlatform,
      user_agent: navigator.userAgent,
      locale: navigator.language,
      referrer: document.referrer || "direct",
    };

    const nextErrors = validateDownloadRequest(payload);
    setErrors(nextErrors);
    setServerError("");

    if (Object.keys(nextErrors).length) return;

    try {
      setSubmitting(true);
      await submitDownloadRequest(payload);
      setSuccess(true);
      setForm(INITIAL);
    } catch (error) {
      setServerError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/60 p-4 flex items-center justify-center">
      <div className="w-full max-w-3xl rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 shadow-2xl max-h-[92vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t.requestTitle}</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{t.requestSubtitle}</p>
          </div>
          <button onClick={onClose} className="text-sm text-gray-500">Close</button>
        </div>

        {success ? (
          <div className="mt-8 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-300 dark:border-emerald-700 p-4">
            <p className="font-medium text-emerald-900 dark:text-emerald-200">{t.success1}</p>
            <p className="mt-1 text-sm text-emerald-800 dark:text-emerald-300">{t.success2}</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ["full_name", t.form.fullName],
              ["email", t.form.email],
              ["phone", t.form.phone],
              ["company_name", t.form.companyName],
              ["job_title", t.form.jobTitle],
              ["industry", t.form.industry],
              ["country", t.form.country],
            ].map(([key, label]) => (
              <label key={key} className="text-sm text-gray-700 dark:text-gray-200">
                {label}
                <input
                  value={form[key]}
                  onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2.5"
                />
                {errors[key] && <span className="text-xs text-red-500">{errors[key]}</span>}
              </label>
            ))}

            <label className="text-sm text-gray-700 dark:text-gray-200 md:col-span-2">
              {t.form.useCase}
              <textarea
                value={form.message}
                onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2.5"
                rows={3}
              />
            </label>

            <label className="text-sm text-gray-700 dark:text-gray-200 md:col-span-2">
              {t.form.selectedPlatform}
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2.5"
              >
                <option value="">--</option>
                {platformOptions.map((platform) => (
                  <option key={platform.key} value={platform.key}>
                    {platform.label[language]}
                    {platform.available ? "" : " · coming soon"}
                  </option>
                ))}
              </select>
              {errors.selected_platform && <span className="text-xs text-red-500">{errors.selected_platform}</span>}
            </label>

            <div className="md:col-span-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40 p-3 text-sm text-gray-700 dark:text-gray-200">
              <p>
                <strong>{t.form.recommendation}:</strong> {detectedPlatform}
              </p>
              <p className="text-xs mt-1 text-gray-500 dark:text-gray-300">{t.form.manual}</p>
            </div>

            {serverError && <p className="md:col-span-2 text-sm text-red-500">{serverError}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="md:col-span-2 rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 py-3 font-medium"
            >
              {submitting ? t.form.submitting : t.form.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
