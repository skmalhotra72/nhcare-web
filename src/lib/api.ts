const BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.uat.medibridge24x7.com/api';

export async function apiFetch(path: string, opts?: RequestInit) {
  const res = await fetch(`${BASE}${path}`, {
    ...opts,
    headers: { 'Content-Type': 'application/json', ...opts?.headers },
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

export const api = {
  tests: {
    list: (q = '', limit = 20, offset = 0) =>
      apiFetch(`/v1/niramaya/tests?q=${encodeURIComponent(q)}&limit=${limit}&offset=${offset}`),
    get: (id: number) => apiFetch(`/v1/niramaya/tests/${id}`),
    bySymptom: (id: string) => apiFetch(`/v1/niramaya/tests/by-symptom/${id}`),
    byCondition: (id: string) => apiFetch(`/v1/niramaya/tests/by-condition/${id}`),
    diseases: () => apiFetch('/v1/niramaya/tests/diseases'),
    symptoms: () => apiFetch('/v1/niramaya/tests/symptoms'),
    specialities: () => apiFetch('/v1/niramaya/tests/specialities'),
  },
  packages: {
    list: (q = '', limit = 20) =>
      apiFetch(`/v1/niramaya/packages?q=${encodeURIComponent(q)}&limit=${limit}`),
    get: (id: number) => apiFetch(`/v1/niramaya/packages/${id}`),
  },
  profiles: { list: (limit = 20) => apiFetch(`/v1/niramaya/profiles?limit=${limit}`) },
  labs: {
    byPincode: (pin: string) => apiFetch(`/v1/niramaya/labs/by-pincode/${pin}`),
    pincodeCheck: (pin: string) => apiFetch(`/v1/niramaya/pincode/${pin}/check`),
  },
  auth: {
    sendOtp: (mobile: string) =>
      apiFetch('/v1/auth/send-otp', { method: 'POST', body: JSON.stringify({ mobile }), next: undefined }),
    verifyOtp: (mobile: string, otp: string) =>
      apiFetch('/v1/auth/verify-otp', { method: 'POST', body: JSON.stringify({ mobile, otp }), next: undefined }),
    profile: (token: string) =>
      apiFetch('/v1/auth/profile', { headers: { Authorization: `Bearer ${token}` }, next: undefined }),
  },
  bookings: {
    list: (token: string) =>
      apiFetch('/v1/niramaya/bookings', { headers: { Authorization: `Bearer ${token}` }, next: undefined }),
    get: (id: number, token: string) =>
      apiFetch(`/v1/niramaya/bookings/${id}`, { headers: { Authorization: `Bearer ${token}` }, next: undefined }),
  },
  reports: {
    list: (token: string) =>
      apiFetch('/v1/niramaya/reports', { headers: { Authorization: `Bearer ${token}` }, next: undefined }),
    get: (id: number, token: string) =>
      apiFetch(`/v1/niramaya/reports/${id}`, { headers: { Authorization: `Bearer ${token}` }, next: undefined }),
    aiSummary: (id: number, token: string) =>
      apiFetch(`/v1/niramaya/reports/${id}/ai-summary`, { headers: { Authorization: `Bearer ${token}` }, next: undefined }),
  },
};
