"use client";

import { useState, useEffect, useCallback } from 'react';

const EMPTY_FORM = {
  title: '',
  subtitle: '',
  period: '',
  images: [''],        // array of screenshot URLs; first becomes image_url (cover)
  visit_url: '',
  tech: '',
  s0_title: 'Problem',
  s0_content: '',
  s1_title: 'Solution',
  s1_content: '',
  s2_title: 'Impact',
  s2_content: '',
  published: false,
  display_order: 0,
};

function formToProject(form) {
  const sections = [
    { title: form.s0_title, content: form.s0_content },
    { title: form.s1_title, content: form.s1_content },
    { title: form.s2_title, content: form.s2_content },
  ].filter(s => s.content.trim());

  const imageList = form.images.map(u => u.trim()).filter(Boolean);

  return {
    title: form.title.trim(),
    subtitle: form.subtitle.trim(),
    period: form.period.trim(),
    image_url: imageList[0] || '',   // cover / fallback
    images: imageList,
    visit_url: form.visit_url.trim() || null,
    tech: form.tech ? form.tech.split(',').map(t => t.trim()).filter(Boolean) : [],
    case_study: sections.length ? { sections } : null,
    published: form.published,
    display_order: parseInt(form.display_order, 10) || 0,
  };
}

function projectToForm(proj) {
  const imgs = proj.images?.length > 0
    ? proj.images
    : proj.image_url ? [proj.image_url] : [''];

  return {
    title: proj.title || '',
    subtitle: proj.subtitle || '',
    period: proj.period || '',
    images: imgs,
    visit_url: proj.visit_url || '',
    tech: Array.isArray(proj.tech) ? proj.tech.join(', ') : (proj.tech || ''),
    s0_title: proj.case_study?.sections?.[0]?.title || 'Problem',
    s0_content: proj.case_study?.sections?.[0]?.content || '',
    s1_title: proj.case_study?.sections?.[1]?.title || 'Solution',
    s1_content: proj.case_study?.sections?.[1]?.content || '',
    s2_title: proj.case_study?.sections?.[2]?.title || 'Impact',
    s2_content: proj.case_study?.sections?.[2]?.content || '',
    published: proj.published || false,
    display_order: proj.display_order ?? 0,
  };
}

// ── Styles ──────────────────────────────────────────────────────────────────
const s = {
  page: { minHeight: '100vh', background: '#050505', color: '#e0e0e0', fontFamily: 'ui-monospace, monospace', padding: '24px', boxSizing: 'border-box' },
  wrap: { maxWidth: '960px', margin: '0 auto' },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  h1: { fontSize: '18px', color: '#D9FF00', margin: 0 },
  btnRow: { display: 'flex', gap: '10px' },
  btn: (bg, fg, pad = '8px 16px') => ({ background: bg, color: fg, padding: pad, borderRadius: '5px', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '12px', fontWeight: 700 }),
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '13px' },
  th: { padding: '8px 12px', textAlign: 'left', color: '#666', fontWeight: 'normal', borderBottom: '1px solid #1c1c1c' },
  td: { padding: '10px 12px', borderBottom: '1px solid #111', verticalAlign: 'middle' },
  pill: (live) => ({ display: 'inline-block', padding: '3px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, background: live ? '#00FF85' : '#222', color: live ? '#000' : '#888', cursor: 'pointer', border: 'none', fontFamily: 'inherit' }),
  formWrap: { marginTop: '32px', borderTop: '1px solid #1c1c1c', paddingTop: '28px' },
  h2: { fontSize: '15px', color: '#D9FF00', margin: '0 0 20px' },
  field: { display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '14px' },
  label: { fontSize: '10px', color: '#555', textTransform: 'uppercase', letterSpacing: '0.12em' },
  input: { padding: '8px 10px', background: '#0e0e0e', border: '1px solid #222', color: '#e0e0e0', borderRadius: '4px', fontFamily: 'inherit', fontSize: '13px', outline: 'none', width: '100%', boxSizing: 'border-box' },
  textarea: { padding: '8px 10px', background: '#0e0e0e', border: '1px solid #222', color: '#e0e0e0', borderRadius: '4px', fontFamily: 'inherit', fontSize: '13px', outline: 'none', width: '100%', boxSizing: 'border-box', resize: 'vertical' },
  sectionBox: { border: '1px solid #1a1a1a', borderRadius: '5px', padding: '14px', marginBottom: '12px' },
  sectionLabel: { fontSize: '11px', color: '#444', marginBottom: '10px' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' },
  inlineRow: { display: 'flex', gap: '20px', alignItems: 'flex-end', flexWrap: 'wrap' },
  checkLabel: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', userSelect: 'none' },
  error: { color: '#ff5555', fontSize: '13px', marginBottom: '12px' },
};

function Field({ label, hint, children }) {
  return (
    <div style={s.field}>
      <label style={s.label}>{label}{hint && <span style={{ color: '#333', marginLeft: 6 }}>{hint}</span>}</label>
      {children}
    </div>
  );
}

export default function AdminPage() {
  const [token, setToken] = useState(null);
  const [password, setPassword] = useState('');
  const [loginErr, setLoginErr] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_token');
    if (saved) setToken(saved);
  }, []);

  const headers = useCallback((tok) => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tok}`,
  }), []);

  const load = useCallback(async (tok) => {
    setLoading(true);
    setErr('');
    try {
      const res = await fetch('/api/admin/projects', { headers: headers(tok) });
      if (res.status === 401) {
        setToken(null);
        sessionStorage.removeItem('admin_token');
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setProjects(data);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }, [headers]);

  useEffect(() => {
    if (token) load(token);
  }, [token, load]);

  async function login(e) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginErr('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      sessionStorage.setItem('admin_token', data.token);
      setToken(data.token);
    } catch (e) {
      setLoginErr(e.message);
    } finally {
      setLoginLoading(false);
    }
  }

  function startAdd() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setFormVisible(true);
    setTimeout(() => document.getElementById('admin-form')?.scrollIntoView({ behavior: 'smooth' }), 50);
  }

  function startEdit(proj) {
    setForm(projectToForm(proj));
    setEditingId(proj.id);
    setFormVisible(true);
    setTimeout(() => document.getElementById('admin-form')?.scrollIntoView({ behavior: 'smooth' }), 50);
  }

  function cancelForm() {
    setFormVisible(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  function set(key) {
    return (e) => setForm(f => ({ ...f, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  }

  async function submit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      const payload = formToProject(form);
      const url = editingId ? `/api/admin/projects/${editingId}` : '/api/admin/projects';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: headers(token), body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      await load(token);
      cancelForm();
    } catch (e) {
      alert(`Save failed: ${e.message}`);
    } finally {
      setSaving(false);
    }
  }

  async function del(id, title) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE', headers: headers(token) });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error); }
      await load(token);
      if (editingId === id) cancelForm();
    } catch (e) {
      alert(`Delete failed: ${e.message}`);
    }
  }

  async function togglePublished(proj) {
    try {
      const res = await fetch(`/api/admin/projects/${proj.id}`, {
        method: 'PUT',
        headers: headers(token),
        body: JSON.stringify({ published: !proj.published }),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error); }
      await load(token);
    } catch (e) {
      alert(`Toggle failed: ${e.message}`);
    }
  }

  // ── Login screen ────────────────────────────────────────────────────────
  if (!token) {
    return (
      <div style={{ ...s.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <form onSubmit={login} style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '280px' }}>
          <h1 style={{ ...s.h1, marginBottom: '4px' }}>Portfolio Admin</h1>
          <p style={{ fontSize: '12px', color: '#444', margin: '0 0 8px' }}>Projects management</p>
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoFocus
            style={s.input}
          />
          {loginErr && <span style={s.error}>{loginErr}</span>}
          <button type="submit" disabled={loginLoading} style={s.btn('#D9FF00', '#000')}>
            {loginLoading ? 'Checking…' : 'Login'}
          </button>
        </form>
      </div>
    );
  }

  // ── Dashboard ────────────────────────────────────────────────────────────
  return (
    <div style={s.page}>
      <div style={s.wrap}>
        <div style={s.row}>
          <h1 style={s.h1}>Projects Admin</h1>
          <div style={s.btnRow}>
            <button onClick={startAdd} style={s.btn('#D9FF00', '#000')}>+ Add Project</button>
            <button onClick={() => { setToken(null); sessionStorage.removeItem('admin_token'); }} style={s.btn('#1a1a1a', '#888')}>Logout</button>
          </div>
        </div>

        {err && <p style={s.error}>{err}</p>}

        {loading ? (
          <p style={{ color: '#444' }}>Loading…</p>
        ) : (
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>#</th>
                <th style={s.th}>Title</th>
                <th style={s.th}>Subtitle</th>
                <th style={s.th}>Period</th>
                <th style={s.th}>Status</th>
                <th style={s.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 && (
                <tr><td colSpan={6} style={{ ...s.td, color: '#444', textAlign: 'center', padding: '32px' }}>No projects yet — add one below.</td></tr>
              )}
              {projects.map(proj => (
                <tr key={proj.id}>
                  <td style={s.td}>{proj.display_order}</td>
                  <td style={{ ...s.td, fontWeight: 600, color: '#fff' }}>{proj.title}</td>
                  <td style={{ ...s.td, color: '#888' }}>{proj.subtitle}</td>
                  <td style={{ ...s.td, color: '#555' }}>{proj.period}</td>
                  <td style={s.td}>
                    <button onClick={() => togglePublished(proj)} style={s.pill(proj.published)}>
                      {proj.published ? 'Live' : 'Draft'}
                    </button>
                  </td>
                  <td style={{ ...s.td, whiteSpace: 'nowrap' }}>
                    <button onClick={() => startEdit(proj)} style={s.btn('#2DCFCF', '#000', '5px 12px')}>Edit</button>
                    {' '}
                    <button onClick={() => del(proj.id, proj.title)} style={s.btn('#2a0a0a', '#ff5555', '5px 12px')}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* ── Form ─────────────────────────────────────────────────────── */}
        {formVisible && (
          <form id="admin-form" onSubmit={submit} style={s.formWrap}>
            <h2 style={s.h2}>{editingId ? 'Edit Project' : 'New Project'}</h2>

            <div style={s.grid2}>
              <Field label="Title *">
                <input required value={form.title} onChange={set('title')} style={s.input} placeholder="My Project" />
              </Field>
              <Field label="Subtitle">
                <input value={form.subtitle} onChange={set('subtitle')} style={s.input} placeholder="Short tagline" />
              </Field>
            </div>

            <div style={s.grid2}>
              <Field label="Period">
                <input value={form.period} onChange={set('period')} style={s.input} placeholder="2024 · 3 months" />
              </Field>
              <Field label="Visit URL">
                <input value={form.visit_url} onChange={set('visit_url')} style={s.input} placeholder="https://example.com" />
              </Field>
            </div>

            <Field label="Project Screenshots" hint="(first = cover · add multiple for the in-card gallery)">
              {form.images.map((url, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                  <input
                    value={url}
                    onChange={e => setForm(f => { const imgs = [...f.images]; imgs[i] = e.target.value; return { ...f, images: imgs }; })}
                    style={{ ...s.input, flex: 1 }}
                    placeholder={`https://... (screenshot ${i + 1})`}
                  />
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, images: f.images.filter((_, j) => j !== i) }))}
                    disabled={form.images.length === 1}
                    style={s.btn('#2a0a0a', form.images.length === 1 ? '#555' : '#ff5555', '8px 12px')}
                  >✕</button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setForm(f => ({ ...f, images: [...f.images, ''] }))}
                style={{ ...s.btn('#1a1a1a', '#888', '6px 14px'), marginTop: '4px' }}
              >+ Add Screenshot</button>
            </Field>

            <Field label="Tech Stack" hint="(comma-separated)">
              <input value={form.tech} onChange={set('tech')} style={s.input} placeholder="React, Next.js, Supabase, TypeScript" />
            </Field>

            <p style={{ ...s.sectionLabel, marginBottom: '8px', marginTop: '8px' }}>Case Study Sections</p>

            {[['s0', 'Section 1'], ['s1', 'Section 2'], ['s2', 'Section 3']].map(([key, label]) => (
              <div key={key} style={s.sectionBox}>
                <p style={s.sectionLabel}>{label}</p>
                <div style={s.grid2}>
                  <Field label="Title">
                    <input value={form[`${key}_title`]} onChange={set(`${key}_title`)} style={s.input} />
                  </Field>
                  <div />
                </div>
                <Field label="Content">
                  <textarea value={form[`${key}_content`]} onChange={set(`${key}_content`)} rows={3} style={s.textarea} placeholder="Leave blank to omit this section." />
                </Field>
              </div>
            ))}

            <div style={s.inlineRow}>
              <div style={{ width: '100px' }}>
                <Field label="Display Order">
                  <input type="number" value={form.display_order} onChange={set('display_order')} style={s.input} />
                </Field>
              </div>
              <label style={s.checkLabel}>
                <input type="checkbox" checked={form.published} onChange={set('published')} />
                Published
              </label>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <button type="submit" disabled={saving} style={s.btn('#D9FF00', '#000')}>
                {saving ? 'Saving…' : editingId ? 'Update Project' : 'Add Project'}
              </button>
              <button type="button" onClick={cancelForm} style={s.btn('#1a1a1a', '#888')}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
