import { supabase } from './supabase'

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
).replace(/\/$/, '')

/**
 * Calls the Placement Officer API (/api/placement-officer/...) with the signed-in
 * user's Supabase token. Returns the parsed JSON body ({ success, data, ... }).
 * Throws an Error with a readable message on failure.
 */
export async function officerApi(path, { method = 'GET', body, query } = {}) {
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession()
  if (sessionError) throw sessionError

  const token = sessionData?.session?.access_token
  if (!token) throw new Error('Your session has expired. Please sign in again.')

  const params = new URLSearchParams()
  Object.entries(query || {}).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') params.set(k, v)
  })
  const qs = params.toString() ? `?${params}` : ''

  let response
  try {
    response = await fetch(`${API_BASE_URL}/placement-officer/${path}${qs}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    })
  } catch {
    throw new Error('Cannot reach the server. Is the backend running?')
  }

  const result = await response.json().catch(() => ({}))
  if (!response.ok || result.success === false) {
    const detail = Array.isArray(result.errors) ? ` ${result.errors.join(' ')}` : ''
    throw new Error(
      (result.message || `Request failed (${response.status}).`) + detail
    )
  }
  return result
}
