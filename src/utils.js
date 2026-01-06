function normalizeBase(base, defaultPath = "/auth") {
  if (base == null) return defaultPath;
  const trimmed = String(base).trim();
  if (!trimmed) return defaultPath;
  return trimmed.endsWith("/") ? trimmed.slice(0, -1) : trimmed;
}