const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')

const buildUrl = (path) => `${API_BASE_URL}${path}`

async function request(path, options = {}) {
  const response = await fetch(buildUrl(path), {
    headers: { 'Content-Type': 'application/json' },
    ...options
  })

  if (!response.ok) {
    let message = `Request failed (${response.status})`

    try {
      const body = await response.json()
      if (body?.detail) {
        message = body.detail
      }
    } catch {
      // Ignore parse errors and keep fallback message.
    }

    throw new Error(message)
  }

  return response.json()
}

export function checkHealth() {
  return request('/health', { method: 'GET' })
}

export function generateText(payload) {
  return request('/generate', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}
