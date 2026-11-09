import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { api } from '../api.js'
import XpWindow from './XpWindow.jsx'
import ContextMenu from './ContextMenu.jsx'
import ExplorerWindow from './ExplorerWindow.jsx'
import InternetExplorer from './InternetExplorer.jsx'
import AdminWindow from './admin/AdminWindow.jsx'
import WorkspaceWindow from './WorkspaceWindow.jsx'
import ProjectEditor from './ProjectEditor.jsx'
import PasswordWindow from './PasswordWindow.jsx'
import { FolderIcon, UserTileIcon, WindowGlyph } from './icons.jsx'
import { isMuted, setMuted, unlockAudio } from '../lib/sound.js'

const ROLE_LABEL = { admin: 'مدیر اصلی', user: 'کاربر', guest: 'مهمان' }

function isSmallScreen() {
  return typeof window !== 'undefined' && window.innerWidth <= 760
}

export default function Desktop({ user, onLogout }) {
  const [folders, setFolders] = useState([])
  const [settings, setSettings] = useState({ site_name: 'GALLERY', site_subtitle: 'نمایشگاه', footer_note: '' })
  const [windows, setWindows] = useState([])
  const [startOpen, setStartOpen] = useState(false)
  const [menu, setMenu] = useState(null)
  const [toast, setToast] = useState(null)
  const [muted, setMutedState] = useState(isMuted())
  const [refresh, setRefresh] = useState(0)
  const [selected, setSelected] = useState(null)
  const [now, setNow] = useState(new Date())
  const [positions, setPositions] = useState({})

  const zRef = useRef(10)
  const toastTimer = useRef(0)
  const storageKey = `gallery.desktop.positions.${user.id}`

  const notify = useCallback((message, type = 'info') => {
    clearTimeout(toastTimer.current)
    setToast({ message, type })
    toastTimer.current = setTimeout(() => setToast(null), 3200)
  }, [])

  const nextZ = () => {
    zRef.current += 1
    return zRef.current
  }

  const loadFolders = useCallback(async () => {
    try {
      const data = await api.folders()
      setFolders(data.folders)
    } catch (error) {
      notify(error.message, 'error')
    }
  }, [notify])

  useEffect(() => {
    loadFolders()
    api
      .settings()
      .then((data) => setSettings(data.settings))
      .catch(() => {})
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || '{}')
      setPositions(stored && typeof stored === 'object' ? stored : {})
    } catch {
      setPositions({})
    }
  }, [loadFolders, storageKey])

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const bump = useCallback(() => setRefresh((value) => value + 1), [])

  const desktopItems = useMemo(() => {
    const items = folders.map((folder) => ({
      key: `folder-${folder.id}`,
      type: 'folder',
      label: folder.name,
      folderId: folder.id,
      count: folder.project_count,
    }))
    if (user.role !== 'guest') {
      items.push({ key: 'workspace', type: 'workspace', label: 'محل کار من' })
    }
    if (user.role === 'admin') {
      items.push({ key: 'admin', type: 'admin', label: 'پنل مدیریت' })
    }
    items.push({ key: 'about', type: 'about', label: 'درباره GALLERY' })
    return items
  }, [folders, user.role])

  const positionFor = useCallback(
    (key, index) => {
      if (positions[key]) return positions[key]
      const column = Math.floor(index / 6)
      const row = index % 6
      const x = Math.max(8, window.innerWidth - 108 - column * 100)
      return { x, y: 14 + row * 98 }
    },
    [positions],
  )

  const openWindow = useCallback(
    (spec) => {
      setWindows((previous) => {
        if (spec.key) {
          const existing = previous.find((item) => item.key === spec.key)
          if (existing) {
            return previous.map((item) =>
              item.id === existing.id
                ? { ...item, minimized: false, z: nextZ(), props: { ...item.props, ...(spec.props || {}) } }
                : item,
            )
          }
        }
        const areaHeight = window.innerHeight - (isSmallScreen() ? 46 : 44)
        const width = Math.min(900, Math.max(320, window.innerWidth - 80))
        const height = Math.min(580, Math.max(260, areaHeight - 56))
        const offset = previous.length % 6
        const window_ = {
          id: `w-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          key: spec.key,
          type: spec.type,
          title: spec.title,
          props: spec.props || {},
          x: Math.max(12, Math.round((window.innerWidth - width) / 2) + offset * 22),
          y: Math.max(10, Math.round((areaHeight - height) / 2) + offset * 18),
          w: width,
          h: height,
          minimized: false,
          maximized: isSmallScreen(),
          z: nextZ(),
        }
        return [...previous, window_]
      })
    },
    [],
  )

  const openItem = useCallback(
    (item) => {
      unlockAudio()
      if (item.type === 'folder') {
        openWindow({
          key: `explorer-${item.folderId}`,
          type: 'explorer',
          title: item.label,
          props: { folderId: item.folderId, folderName: item.label },
        })
        return
      }
      if (item.type === 'workspace') {
        openWindow({ key: 'workspace', type: 'workspace', title: 'محل کار من' })
        return
      }
      if (item.type === 'admin') {
        openWindow({ key: 'admin', type: 'admin', title: 'پنل مدیریت GALLERY' })
        return
      }
      if (item.type === 'about') {
        openWindow({ key: 'about', type: 'about', title: 'درباره GALLERY' })
      }
    },
    [openWindow],
  )

  const openProjectWindow = useCallback(
    (project) => {
      unlockAudio()
      openWindow({
        type: 'ie',
        title: `${project.title} — Internet Explorer`,
        props: { projectId: project.id, projectTitle: project.title },
      })
    },
    [openWindow],
  )

  const openEditor = useCallback(
    (spec) => {
      openWindow({
        key: `editor-${spec.projectId || 'new'}`,
        type: 'editor',
        title: spec.projectId ? 'ویرایش نمونه‌کار' : 'نمونه‌کار جدید',
        props: spec,
      })
    },
    [openWindow],
  )

  const focusWindow = useCallback((id) => {
    setWindows((previous) => {
      const target = previous.find((item) => item.id === id)
      if (!target || target.z === zRef.current) return previous
      return previous.map((item) => (item.id === id ? { ...item, z: nextZ(), minimized: false } : item))
    })
  }, [])

  const closeWindow = useCallback((id) => {
    setWindows((previous) => previous.filter((item) => item.id !== id))
  }, [])

  const patchWindow = useCallback((id, patch) => {
    setWindows((previous) => previous.map((item) => (item.id === id ? { ...item, ...patch } : item)))
  }, [])

  const topZ = windows.reduce((max, item) => (item.minimized ? max : Math.max(max, item.z)), -1)

  const startIconDrag = (event, item, index) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    event.stopPropagation()
    unlockAudio()
    const origin = positionFor(item.key, index)
    const startX = event.clientX
    const startY = event.clientY
    let moved = false
    const areaHeight = window.innerHeight - 44
    const move = (moveEvent) => {
      const dx = moveEvent.clientX - startX
      const dy = moveEvent.clientY - startY
      if (!moved && Math.hypot(dx, dy) < 5) return
      moved = true
      const next = {
        x: Math.min(Math.max(0, origin.x + dx), window.innerWidth - 96),
        y: Math.min(Math.max(0, origin.y + dy), areaHeight - 90),
      }
      setPositions((previous) => ({ ...previous, [item.key]: next }))
    }
    const up = (upEvent) => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
      if (!moved) {
        setSelected(item.key)
        if (upEvent.pointerType !== 'mouse') openItem(item)
        return
      }
      setPositions((previous) => {
        try {
          localStorage.setItem(storageKey, JSON.stringify(previous))
        } catch {
          /* storage unavailable */
        }
        return previous
      })
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
  }

  const desktopMenu = (event) => {
    event.preventDefault()
    setStartOpen(false)
    const items = [
      { label: 'تازه‌سازی', glyph: '⟳', onClick: () => { loadFolders(); bump() } },
      {
        label: 'فولدر جدید',
        glyph: '+',
        disabled: user.role !== 'admin',
        onClick: async () => {
          try {
            await api.createFolder('New Folder')
            await loadFolders()
            notify('فولدر جدید ساخته شد.')
          } catch (error) {
            notify(error.message, 'error')
          }
        },
      },
      { divider: true },
      {
        label: 'چیدمان خودکار آیکون‌ها',
        glyph: '▦',
        onClick: () => {
          setPositions({})
          try {
            localStorage.removeItem(storageKey)
          } catch {
            /* storage unavailable */
          }
        },
      },
      {
        label: 'پنل مدیریت',
        glyph: '⚙',
        disabled: user.role !== 'admin',
        onClick: () => openWindow({ key: 'admin', type: 'admin', title: 'پنل مدیریت GALLERY' }),
      },
      { label: 'درباره GALLERY', glyph: 'i', onClick: () => openItem({ type: 'about' }) },
    ]
    setMenu({ x: event.clientX, y: event.clientY, items })
  }

  const iconMenu = (event, item) => {
    event.preventDefault()
    event.stopPropagation()
    setSelected(item.key)
    const items = [{ label: 'باز کردن', glyph: '▶', onClick: () => openItem(item) }]
    if (item.type === 'folder' && user.role === 'admin') {
      items.push({ divider: true })
      items.push({
        label: 'حذف فولدر',
        glyph: '✕',
        onClick: async () => {
          try {
            await api.deleteFolder(item.folderId)
            await loadFolders()
            bump()
            notify('فولدر حذف شد؛ نمونه‌کارهای آن بدون دسته‌بندی ماندند.')
          } catch (error) {
            notify(error.message, 'error')
          }
        },
      })
    }
    setMenu({ x: event.clientX, y: event.clientY, items })
  }

  const toggleMute = () => {
    const next = !muted
    setMuted(next)
    setMutedState(next)
    if (!next) unlockAudio()
  }

  const startMenuItems = [
    user.role !== 'guest'
      ? { label: 'محل کار من', glyph: '▣', onClick: () => openItem({ type: 'workspace' }) }
      : null,
    user.role === 'admin'
      ? { label: 'پنل مدیریت', glyph: '⚙', onClick: () => openItem({ type: 'admin' }) }
      : null,
    { label: 'درباره GALLERY', glyph: 'i', onClick: () => openItem({ type: 'about' }) },
    user.role !== 'guest'
      ? {
          label: 'تغییر رمز عبور',
          glyph: '⚿',
          onClick: () => openWindow({ key: 'password', type: 'password', title: 'تغییر رمز عبور' }),
        }
      : null,
    { label: muted ? 'روشن‌کردن صدا' : 'قطع صدا', glyph: muted ? '🔇' : '🔊', onClick: toggleMute },
  ].filter(Boolean)

  const clock = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(now)

  return (
    <div
      className="desktop"
      onPointerDown={() => {
        setStartOpen(false)
        setSelected(null)
      }}
      onContextMenu={desktopMenu}
    >
      <div className="desktop-center" aria-hidden="true">
        <p className="desktop-brand">{settings.site_name || 'GALLERY'}</p>
        <p className="desktop-brand-sub">{settings.site_subtitle || 'نمایشگاه'}</p>
      </div>

      <div className="desktop-icons">
        {desktopItems.map((item, index) => {
          const position = positionFor(item.key, index)
          return (
            <button
              key={item.key}
              type="button"
              className={`desktop-icon ${selected === item.key ? 'selected' : ''}`}
              style={{ left: position.x, top: position.y }}
              onPointerDown={(event) => startIconDrag(event, item, index)}
              onDoubleClick={() => openItem(item)}
              onContextMenu={(event) => iconMenu(event, item)}
              onFocus={() => setSelected(item.key)}
            >
              {item.type === 'folder' ? (
                <FolderIcon size={46} />
              ) : item.type === 'workspace' ? (
                <UserTileIcon size={44} />
              ) : item.type === 'admin' ? (
                <span
                  className="icon-art"
                  style={{
                    width: 42,
                    height: 42,
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: 7,
                    background: 'linear-gradient(160deg,#f7d97a,#c99a1d)',
                    border: '1px solid #8e6b12',
                    fontSize: 22,
                  }}
                  aria-hidden="true"
                >
                  ⚙
                </span>
              ) : (
                <span
                  className="icon-art"
                  style={{
                    width: 42,
                    height: 42,
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: 7,
                    background: 'linear-gradient(160deg,#9ed0ff,#2f7fd4)',
                    border: '1px solid #1f4f88',
                    color: '#fff',
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                  aria-hidden="true"
                >
                  G
                </span>
              )}
              <span className="desktop-icon-label">{item.label}</span>
            </button>
          )
        })}
      </div>

      {windows.map((window_) => (
        <XpWindow
          key={window_.id}
          win={{ ...window_, maximized: window_.maximized }}
          active={window_.z === topZ && !window_.minimized}
          onFocus={() => focusWindow(window_.id)}
          onClose={closeWindow}
          onMinimize={(id) => patchWindow(id, { minimized: true })}
          onToggleMax={(id) => {
            const target = windows.find((item) => item.id === id)
            patchWindow(id, { maximized: !target?.maximized })
          }}
          onMove={(id, geometry) => patchWindow(id, geometry)}
          onResize={(id, geometry) => patchWindow(id, geometry)}
        >
          {window_.minimized ? null : window_.type === 'explorer' ? (
            <ExplorerWindow
              folderId={window_.props.folderId}
              folderName={window_.props.folderName}
              user={user}
              refreshKey={refresh}
              onOpenProject={openProjectWindow}
              onNewProject={(folderId) => openEditor({ folderId })}
              onEditProject={(projectId) => openEditor({ projectId })}
              onFoldersChanged={() => {
                loadFolders()
                bump()
              }}
              notify={notify}
            />
          ) : window_.type === 'ie' ? (
            <InternetExplorer
              initialProjectId={window_.props.projectId}
              user={user}
              onOpenProject={openProjectWindow}
            />
          ) : window_.type === 'admin' ? (
            <AdminWindow
              user={user}
              refreshKey={refresh}
              notify={notify}
              onChanged={() => {
                loadFolders()
                bump()
              }}
              onOpenProject={openProjectWindow}
              onEditProject={(projectId) => openEditor({ projectId })}
            />
          ) : window_.type === 'workspace' ? (
            <WorkspaceWindow
              user={user}
              refreshKey={refresh}
              notify={notify}
              onOpenProject={openProjectWindow}
              onNewProject={() => openEditor({})}
              onEditProject={(projectId) => openEditor({ projectId })}
              onChanged={bump}
            />
          ) : window_.type === 'editor' ? (
            <ProjectEditor
              projectId={window_.props.projectId}
              defaultFolderId={window_.props.folderId}
              user={user}
              folders={folders}
              notify={notify}
              onCancel={() => closeWindow(window_.id)}
              onSaved={() => {
                closeWindow(window_.id)
                bump()
              }}
            />
          ) : window_.type === 'password' ? (
            <PasswordWindow notify={notify} onClose={() => closeWindow(window_.id)} />
          ) : (
            <AboutWindow settings={settings} user={user} />
          )}
        </XpWindow>
      ))}

      <nav className="taskbar" onPointerDown={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="taskbar-start"
          aria-expanded={startOpen}
          onClick={() => setStartOpen((open) => !open)}
        >
          <span className="start-dot" aria-hidden="true" />
          start
        </button>

        <div className="taskbar-windows">
          {windows.map((window_) => (
            <button
              key={window_.id}
              type="button"
              className={`taskbar-item ${window_.z === topZ && !window_.minimized ? 'active' : ''}`}
              onClick={() => {
                if (window_.minimized || window_.z !== topZ) focusWindow(window_.id)
                else patchWindow(window_.id, { minimized: true })
              }}
              title={window_.title}
            >
              <WindowGlyph type={window_.type} />
              <span>{window_.title}</span>
            </button>
          ))}
        </div>

        <div className="taskbar-tray">
          <button type="button" className="tray-btn" onClick={toggleMute} title={muted ? 'صدا قطع است' : 'صدا روشن است'}>
            {muted ? '🔇' : '🔊'}
          </button>
          <span className="taskbar-clock">{clock}</span>
        </div>
      </nav>

      {startOpen ? (
        <div className="start-menu" onPointerDown={(event) => event.stopPropagation()}>
          <div className="start-menu-header">
            <span className="avatar">{user.displayName.slice(0, 1)}</span>
            <div>
              {user.displayName}
              <small>
                {ROLE_LABEL[user.role]} · {settings.site_name || 'GALLERY'}
              </small>
            </div>
          </div>
          <div className="start-menu-items">
            {startMenuItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className="start-menu-item"
                onClick={() => {
                  setStartOpen(false)
                  item.onClick()
                }}
              >
                <span className="menu-icon" aria-hidden="true">
                  {item.glyph}
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          <div className="start-menu-footer">
            <button
              type="button"
              onClick={() => {
                setStartOpen(false)
                onLogout()
              }}
            >
              <span aria-hidden="true">⏻</span> خروج از حساب
            </button>
          </div>
        </div>
      ) : null}

      {menu ? <ContextMenu x={menu.x} y={menu.y} items={menu.items} onClose={() => setMenu(null)} /> : null}
      {toast ? <div className={`toast ${toast.type === 'error' ? 'error' : ''}`}>{toast.message}</div> : null}
      <span className="loading-line" style={{ display: 'none' }}>
        {settings.footer_note}
      </span>
    </div>
  )
}

function AboutWindow({ settings, user }) {
  return (
    <div style={{ padding: 16, overflow: 'auto', fontSize: 12.5, lineHeight: 2 }}>
      <h2 style={{ margin: '0 0 6px', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.2em' }}>
        {settings.site_name || 'GALLERY'}
      </h2>
      <p style={{ margin: '0 0 12px', color: '#5d5b52' }}>{settings.site_subtitle || 'نمایشگاه نمونه‌کار'}</p>
      <p style={{ margin: 0 }}>
        نمایشگاه GALLERY محیطی تعاملی برای ارائه نمونه‌کارها است: فولدرهای دسکتاپ دسته‌بندی‌ها را نشان
        می‌دهند و هر نمونه‌کار در پنجره‌ای شبیه Internet Explorer باز می‌شود.
      </p>
      <p style={{ margin: '10px 0 0', color: '#5d5b52' }}>
        حساب فعلی: {user.displayName} ({ROLE_LABEL[user.role]})
      </p>
      <p style={{ marginTop: 14, fontSize: 11, color: '#85837a' }}>{settings.footer_note}</p>
    </div>
  )
}
