export function validateDownloadRequest(values) {
  const errors = {};

  if (!values.full_name?.trim()) errors.full_name = "Required";
  if (!values.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = "Invalid email";
  if (!values.phone?.trim()) errors.phone = "Required";
  if (!values.company_name?.trim()) errors.company_name = "Required";
  if (!values.job_title?.trim()) errors.job_title = "Required";
  if (!values.industry?.trim()) errors.industry = "Required";
  if (!values.country?.trim()) errors.country = "Required";
  if (!values.selected_platform) errors.selected_platform = "Required";

  return errors;
}
