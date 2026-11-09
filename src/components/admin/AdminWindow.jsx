import { useState } from 'react'
import FoldersPanel from './FoldersPanel.jsx'
import ProjectsPanel from './ProjectsPanel.jsx'
import PublishingPanel from './PublishingPanel.jsx'
import UsersPanel from './UsersPanel.jsx'
import FilesPanel from './FilesPanel.jsx'
import ActivityPanel from './ActivityPanel.jsx'
import SettingsPanel from './SettingsPanel.jsx'

const TABS = [
  { id: 'folders', label: 'فولدرها' },
  { id: 'projects', label: 'نمونه‌کارها' },
  { id: 'publish', label: 'انتشار' },
  { id: 'users', label: 'کاربران' },
  { id: 'files', label: 'فایل‌ها' },
  { id: 'activity', label: 'فعالیت‌ها' },
  { id: 'settings', label: 'تنظیمات' },
]

export default function AdminWindow({ user, refreshKey, notify, onChanged, onOpenProject, onEditProject }) {
  const [tab, setTab] = useState('folders')

  const common = { refreshKey, notify, onChanged }

  return (
    <div className="admin">
      <div className="admin-tabs" role="tablist">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            className={`admin-tab ${tab === item.id ? 'active' : ''}`}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="admin-body">
        {tab === 'folders' ? <FoldersPanel {...common} /> : null}
        {tab === 'projects' ? (
          <ProjectsPanel {...common} onOpenProject={onOpenProject} onEditProject={onEditProject} user={user} />
        ) : null}
        {tab === 'publish' ? <PublishingPanel {...common} /> : null}
        {tab === 'users' ? <UsersPanel {...common} user={user} /> : null}
        {tab === 'files' ? <FilesPanel {...common} /> : null}
        {tab === 'activity' ? <ActivityPanel refreshKey={refreshKey} /> : null}
        {tab === 'settings' ? <SettingsPanel {...common} /> : null}
      </div>
    </div>
  )
}
