const DEFAULT_BASE = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE
  ? import.meta.env.VITE_API_BASE
  : 'http://localhost/CRM_API/backend';

function getToken() {
  return localStorage.getItem('jwt_token');
}

async function request(url, { method = 'GET', headers = {}, body = undefined } = {}) {
  // If url looks relative to backend (starts with /), prepend base
  const fullUrl = url.startsWith('http') ? url : `${DEFAULT_BASE}${url}`;

  const token = getToken();
  const finalHeaders = { ...headers };
  if (token) finalHeaders['Authorization'] = `Bearer ${token}`;

  const opts = { method, headers: finalHeaders };
  if (body !== undefined) {
    // If body is FormData, let fetch set the content-type
    if (body instanceof FormData) {
      opts.body = body;
    } else {
      finalHeaders['Content-Type'] = finalHeaders['Content-Type'] || 'application/json';
      opts.body = typeof body === 'string' ? body : JSON.stringify(body);
    }
  }

  const res = await fetch(fullUrl, opts);
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  }
  // fallback to text
  const text = await res.text();
  if (!res.ok) throw text;
  return text;
}

export default {
  request,
  get: (url, opts) => request(url, { ...opts, method: 'GET' }),
  post: (url, body, opts = {}) => request(url, { ...opts, method: 'POST', body }),
  postForm: (url, formData, opts = {}) => request(url, { ...opts, method: 'POST', body: formData }),
};
