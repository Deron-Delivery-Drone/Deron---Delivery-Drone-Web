export const ROLE_OPTIONS = ["investor", "partner", "engineer", "operator", "researcher", "other"];

export function validateDownloadRequest(values) {
  const errors = {};

  if (!values.full_name?.trim()) errors.full_name = "Required";
  if (!values.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = "Invalid email";
  if (!values.phone?.trim()) errors.phone = "Required";
  if (!values.company_name?.trim()) errors.company_name = "Required";
  if (!values.industry?.trim()) errors.industry = "Required";
  if (!values.purpose_of_use?.trim()) errors.purpose_of_use = "Required";
  if (!ROLE_OPTIONS.includes(values.role_category)) errors.role_category = "Required";
  if (!values.selected_platform) errors.selected_platform = "Required";

  return errors;
}
