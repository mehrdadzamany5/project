async function request(path, { method = 'GET', body, form } = {}) {
  const options = { method, credentials: 'same-origin', headers: {} }
  if (form) {
    options.body = form
  } else if (body !== undefined) {
    options.headers['Content-Type'] = 'application/json'
    options.body = JSON.stringify(body)
  }

  const response = await fetch(path, options)
  const type = response.headers.get('content-type') || ''
  const payload = type.includes('application/json') ? await response.json() : await response.text()
  if (!response.ok) {
    const error = new Error(payload?.error || 'ارتباط با سرور برقرار نشد.')
    error.status = response.status
    throw error
  }
  return payload
}

export const api = {
  me: () => request('/api/auth/me'),
  login: (username, password) => request('/api/auth/login', { method: 'POST', body: { username, password } }),
  guest: () => request('/api/auth/guest', { method: 'POST' }),
  logout: () => request('/api/auth/logout', { method: 'POST' }),
  changePassword: (currentPassword, newPassword) =>
    request('/api/auth/password', { method: 'POST', body: { currentPassword, newPassword } }),

  folders: () => request('/api/folders'),
  createFolder: (name) => request('/api/folders', { method: 'POST', body: { name } }),
  updateFolder: (id, body) => request(`/api/folders/${id}`, { method: 'PATCH', body }),
  deleteFolder: (id) => request(`/api/folders/${id}`, { method: 'DELETE' }),

  projects: (folderId) => request(`/api/projects${folderId ? `?folderId=${folderId}` : ''}`),
  project: (id) => request(`/api/projects/${id}`),
  createProject: (body) => request('/api/projects', { method: 'POST', body }),
  updateProject: (id, body) => request(`/api/projects/${id}`, { method: 'PATCH', body }),
  deleteProject: (id) => request(`/api/projects/${id}`, { method: 'DELETE' }),
  publishProject: (id, isPublished) =>
    request(`/api/projects/${id}/publish`, { method: 'PATCH', body: { isPublished } }),
  attachFile: (id, file) => request(`/api/projects/${id}/files`, { method: 'POST', body: file }),

  users: () => request('/api/users'),
  createUser: (body) => request('/api/users', { method: 'POST', body }),
  updateUser: (id, body) => request(`/api/users/${id}`, { method: 'PATCH', body }),
  deleteUser: (id) => request(`/api/users/${id}`, { method: 'DELETE' }),

  activity: () => request('/api/activity'),
  settings: () => request('/api/settings'),
  saveSettings: (settings) => request('/api/settings', { method: 'PUT', body: { settings } }),
  library: () => request('/api/uploads/library'),
  deleteLibraryFile: (id) => request(`/api/uploads/library/${id}`, { method: 'DELETE' }),

  upload: (file) => {
    const form = new FormData()
    form.append('file', file)
    return request('/api/uploads', { method: 'POST', form })
  },
}

export function formatDate(value) {
  if (!value) return '—'
  try {
    return new Intl.DateTimeFormat('fa-IR', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'UTC',
    }).format(new Date(value))
  } catch {
    return '—'
  }
}

export const KIND_LABEL = {
  image: 'تصویر',
  video: 'ویدئو',
  pdf: 'PDF',
  website: 'وب‌سایت',
  other: 'فایل',
}
