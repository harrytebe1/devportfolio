import React, { useState, useEffect } from 'react';
import AdminToast from '../../components/admin/AdminToast';
import api from '../../lib/axios';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({ title: '', description: '', techStack: '', demoUrl: '', repoUrl: '' });
  const [formError, setFormError] = useState('');
  
  // Toast State
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => setToast({ show: true, message, type });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/projects');
      setProjects(res.data.data);
    } catch (error) {
      showToast('Failed to load projects', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const openForm = (project = null) => {
    if (project) {
      setCurrentProject(project);
      setFormData({
        title: project.title || '',
        description: project.description || '',
        techStack: project.technologies ? project.technologies.join(', ') : '',
        demoUrl: project.live_url || '',
        repoUrl: project.repo_url || ''
      });
    } else {
      setCurrentProject(null);
      setFormData({ title: '', description: '', techStack: '', demoUrl: '', repoUrl: '' });
    }
    setFormError('');
    setIsFormOpen(true);
  };

  const closeForm = () => setIsFormOpen(false);

  const openConfirm = (project) => {
    setCurrentProject(project);
    setIsConfirmOpen(true);
  };

  const closeConfirm = () => setIsConfirmOpen(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setFormError('Title is required.');
      return;
    }

    const apiPayload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      technologies: formData.techStack.split(',').map(s => s.trim()).filter(Boolean),
      live_url: formData.demoUrl.trim(),
      repo_url: formData.repoUrl.trim(),
      image_url: currentProject?.image_url || 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80', // default image
      is_featured: currentProject?.is_featured || false
    };

    try {
      if (currentProject) {
        await api.put(`/projects/${currentProject.id}`, apiPayload);
        showToast('Project updated.');
      } else {
        await api.post('/projects', apiPayload);
        showToast('Project added.');
      }
      fetchProjects();
      closeForm();
    } catch (error) {
      showToast('Failed to save project.', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/projects/${currentProject.id}`);
      showToast('Project deleted.');
      fetchProjects();
      closeConfirm();
    } catch (error) {
      showToast('Failed to delete project.', 'error');
    }
  };

  return (
    <div className="admin-content">
      <div className="content-header">
        <div>
          <h1>Manage Projects</h1>
          <p>Projects shown here appear on the public Projects page.</p>
        </div>
        <button className="btn btn-primary" onClick={() => openForm(null)}>+ Add Project</button>
      </div>

      <div className="data-table-wrap">
        <table>
          <thead>
            <tr><th>Project</th><th>Tech Stack</th><th>Links</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="4" style={{textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)'}}>Loading projects...</td></tr>
            ) : projects.map(p => (
              <tr key={p.id}>
                <td>
                  <div className="proj-cell">
                    <div className="proj-thumb" style={{ backgroundImage: p.image_url ? `url(${p.image_url})` : 'none' }}></div>
                    <span className="proj-title">{p.title}</span>
                  </div>
                </td>
                <td>
                  <div className="tech-row">
                    {p.technologies && p.technologies.map((t, i) => <span key={i} className="pill">{t}</span>)}
                  </div>
                </td>
                <td>
                  <div className="tech-row">
                    {p.live_url && <a href={p.live_url} className="pill" target="_blank" rel="noreferrer">Demo</a>}
                    {p.repo_url && <a href={p.repo_url} className="pill" target="_blank" rel="noreferrer">Repo</a>}
                  </div>
                </td>
                <td>
                  <div className="row-actions">
                    <button className="icon-btn" onClick={() => openForm(p)} aria-label="Edit">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button className="icon-btn danger" onClick={() => openConfirm(p)} aria-label="Delete">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!isLoading && projects.length === 0 && (
          <div className="empty-state">No projects yet — click "Add Project" to create your first one.</div>
        )}
      </div>

      {/* Form Modal */}
      <div className={`modal-overlay ${isFormOpen ? 'open' : ''}`} onClick={(e) => { if(e.target.classList.contains('modal-overlay')) closeForm(); }}>
        <div className="modal">
          <div className="modal-header">
            <h3>{currentProject ? 'Edit Project' : 'Add Project'}</h3>
            <button className="modal-close" onClick={closeForm}>
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <form onSubmit={handleSave} noValidate>
            <div className={`field ${formError ? 'has-error' : ''}`}>
              <label htmlFor="title">Title</label>
              <input type="text" id="title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Nexus Analytics" />
              <span className="field-error">{formError}</span>
            </div>
            <div className="field">
              <label htmlFor="description">Description</label>
              <textarea id="description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="One or two sentences about this project"></textarea>
            </div>
            <div className="field">
              <label htmlFor="techStack">Tech Stack</label>
              <input type="text" id="techStack" value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} placeholder="React, TypeScript, WebGL" />
              <span className="field-hint">Comma-separated.</span>
            </div>
            <div className="field">
              <label htmlFor="demoUrl">Demo URL</label>
              <input type="text" id="demoUrl" value={formData.demoUrl} onChange={e => setFormData({...formData, demoUrl: e.target.value})} placeholder="https://..." />
            </div>
            <div className="field">
              <label htmlFor="repoUrl">Repo URL</label>
              <input type="text" id="repoUrl" value={formData.repoUrl} onChange={e => setFormData({...formData, repoUrl: e.target.value})} placeholder="https://github.com/..." />
            </div>
            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={closeForm}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save Project</button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirm Modal */}
      <div className={`modal-overlay confirm-modal ${isConfirmOpen ? 'open' : ''}`} onClick={(e) => { if(e.target.classList.contains('modal-overlay')) closeConfirm(); }}>
        <div className="modal">
          <div className="confirm-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>
          </div>
          <h3>Delete project?</h3>
          <p>Are you sure you want to delete "{currentProject?.title}"? This cannot be undone.</p>
          <div className="modal-actions">
            <button className="btn btn-secondary" onClick={closeConfirm}>Cancel</button>
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>

      <AdminToast show={toast.show} type={toast.type} message={toast.message} onClose={() => setToast({...toast, show: false})} />
    </div>
  );
};

export default AdminProjects;
