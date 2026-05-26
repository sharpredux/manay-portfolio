// Base URL for API calls. Empty string in production (same domain), or dev server URL.
const API_BASE = ''; 

function getToken() {
  return sessionStorage.getItem('adminToken');
}

export async function login(password) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  });
  
  if (!res.ok) {
    throw new Error('Invalid password');
  }
  
  const data = await res.json();
  sessionStorage.setItem('adminToken', data.token);
  return data.token;
}

export function logout() {
  sessionStorage.removeItem('adminToken');
}

export function isAuthenticated() {
  return !!getToken();
}

async function fetchWithAuth(url, options = {}) {
  const token = getToken();
  if (!token) throw new Error('Not authenticated');

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...(options.headers || {})
  };

  const res = await fetch(`${API_BASE}${url}`, { ...options, headers });
  if (res.status === 401) {
    logout();
    throw new Error('Unauthorized or session expired');
  }
  return res;
}

// ── Public Getters ──────────────────────────────────────────────────────────

import { DEFAULTS } from './content.js';

export async function loadContent() {
  try {
    const [expRes, projRes, contactRes] = await Promise.all([
      fetch(`${API_BASE}/api/experience`),
      fetch(`${API_BASE}/api/projects`),
      fetch(`${API_BASE}/api/contact`)
    ]);

    const experience = (expRes.ok ? await expRes.json() : DEFAULTS.experience).map(e => ({...e, _saved: true}));
    const projects = (projRes.ok ? await projRes.json() : DEFAULTS.projects).map(p => ({...p, _saved: true}));
    const contact = contactRes.ok ? await contactRes.json() : DEFAULTS.contact;

    return { experience, projects, contact };
  } catch (err) {
    console.error("Failed to load content from API, using defaults:", err);
    return DEFAULTS;
  }
}

// ── Protected Setters (Admin) ────────────────────────────────────────────────

// Experience
export async function createExperience(entry) {
  const res = await fetchWithAuth('/api/experience', {
    method: 'POST',
    body: JSON.stringify(entry)
  });
  return res.json();
}

export async function updateExperience(id, entry) {
  const res = await fetchWithAuth(`/api/experience/${id}`, {
    method: 'PUT',
    body: JSON.stringify(entry)
  });
  return res.json();
}

export async function deleteExperience(id) {
  const res = await fetchWithAuth(`/api/experience/${id}`, {
    method: 'DELETE'
  });
  return res.json();
}

// Projects
export async function createProject(entry) {
  const res = await fetchWithAuth('/api/projects', {
    method: 'POST',
    body: JSON.stringify(entry)
  });
  return res.json();
}

export async function updateProject(id, entry) {
  const res = await fetchWithAuth(`/api/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(entry)
  });
  return res.json();
}

export async function deleteProject(id) {
  const res = await fetchWithAuth(`/api/projects/${id}`, {
    method: 'DELETE'
  });
  return res.json();
}

// Contact
export async function updateContact(entry) {
  const res = await fetchWithAuth('/api/contact', {
    method: 'PUT',
    body: JSON.stringify(entry)
  });
  return res.json();
}
