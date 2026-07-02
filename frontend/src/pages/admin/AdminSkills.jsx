import React, { useState } from 'react';
import AdminToast from '../../components/admin/AdminToast';

// Dummy data
const initialSkills = [
  { id:1, name:'TypeScript', category:'language', level:'advanced' },
  { id:2, name:'React', category:'framework', level:'advanced' },
  { id:3, name:'Docker', category:'tool', level:'intermediate' },
  { id:4, name:'Python', category:'language', level:'intermediate' },
];

const categoryLabel = { language:'Language', framework:'Framework', tool:'Tool' };

const AdminSkills = () => {
  const [skills, setSkills] = useState(initialSkills);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({ name: '', category: 'language', level: 'advanced' });
  const [formError, setFormError] = useState('');
  
  // Toast State
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => setToast({ show: true, message, type });

  const openForm = (skill = null) => {
    if (skill) {
      setCurrentSkill(skill);
      setFormData({ name: skill.name, category: skill.category, level: skill.level });
    } else {
      setCurrentSkill(null);
      setFormData({ name: '', category: 'language', level: 'advanced' });
    }
    setFormError('');
    setIsFormOpen(true);
  };

  const closeForm = () => setIsFormOpen(false);

  const openConfirm = (skill) => {
    setCurrentSkill(skill);
    setIsConfirmOpen(true);
  };

  const closeConfirm = () => setIsConfirmOpen(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError('Name is required.');
      return;
    }

    const newSkillData = {
      name: formData.name.trim(),
      category: formData.category,
      level: formData.level
    };

    if (currentSkill) {
      setSkills(skills.map(s => s.id === currentSkill.id ? { ...s, ...newSkillData } : s));
      showToast('Skill updated.');
    } else {
      setSkills([...skills, { id: Date.now(), ...newSkillData }]);
      showToast('Skill added.');
    }
    closeForm();
  };

  const handleDelete = () => {
    setSkills(skills.filter(s => s.id !== currentSkill.id));
    showToast('Skill deleted.');
    closeConfirm();
  };

  return (
    <div className="admin-content">
      <div className="content-header">
        <div>
          <h1>Manage Skills</h1>
          <p>These power the Languages / Frameworks / Tools cards on the public Skills page.</p>
        </div>
        <button className="btn btn-primary" onClick={() => openForm(null)}>+ Add Skill</button>
      </div>

      <div className="data-table-wrap">
        <table>
          <thead>
            <tr><th>Name</th><th>Category</th><th>Level</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {skills.map(s => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td><span className="pill">{categoryLabel[s.category]}</span></td>
                <td><span className={`pill level-${s.level}`}>{s.level.charAt(0).toUpperCase() + s.level.slice(1)}</span></td>
                <td>
                  <div className="row-actions">
                    <button className="icon-btn" onClick={() => openForm(s)} aria-label="Edit">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button className="icon-btn danger" onClick={() => openConfirm(s)} aria-label="Delete">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {skills.length === 0 && (
          <div className="empty-state">No skills yet — click "Add Skill" to create your first one.</div>
        )}
      </div>

      {/* Form Modal */}
      <div className={`modal-overlay ${isFormOpen ? 'open' : ''}`} onClick={(e) => { if(e.target.classList.contains('modal-overlay')) closeForm(); }}>
        <div className="modal">
          <div className="modal-header">
            <h3>{currentSkill ? 'Edit Skill' : 'Add Skill'}</h3>
            <button className="modal-close" onClick={closeForm}>
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <form onSubmit={handleSave} noValidate>
            <div className={`field ${formError ? 'has-error' : ''}`}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. TypeScript" />
              <span className="field-error">{formError}</span>
            </div>
            <div className="field">
              <label htmlFor="category">Category</label>
              <select id="category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                <option value="language">Language</option>
                <option value="framework">Framework</option>
                <option value="tool">Tool</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="level">Level</label>
              <select id="level" value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})}>
                <option value="basic">Basic</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={closeForm}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save Skill</button>
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
          <h3>Delete skill?</h3>
          <p>Are you sure you want to delete "{currentSkill?.name}"? This cannot be undone.</p>
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

export default AdminSkills;
