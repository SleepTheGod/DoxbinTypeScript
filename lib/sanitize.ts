export function sanitizeString(input: string, maxLength?: number): string {
  let sanitized = input
    .trim()
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "") // Remove control characters
    .replace(/\uFEFF/g, "") // Remove zero-width no-break space

  if (maxLength && sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength)
  }

  return sanitized
}

export function sanitizeTitle(title: string): string {
  return sanitizeString(title, 255)
}

export function sanitizeContent(content: string): string {
  // Remove dangerous content but preserve formatting
  return sanitizeString(content, 1000000)
}

export function isValidId(id: string): boolean {
  // Check if ID matches expected format (8 alphanumeric characters)
  return /^[A-Za-z0-9]{8}$/.test(id)
}

export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return text.replace(/[&<>"']/g, (char) => map[char])
}
