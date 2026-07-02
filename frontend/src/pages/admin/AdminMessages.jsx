import React, { useState } from 'react';
import AdminToast from '../../components/admin/AdminToast';

const initialMessages = [
  { id:1, name:'Sarah Jenkins', email:'sarah.j@example.com', date:'Oct 24, 2023', subject:'Freelance Opportunity', message:"Hi, I saw your portfolio and was really impressed by your recent projects. We are currently looking for a frontend developer to help us revamp our company website. Would you be open to discussing a potential freelance engagement?\n\nLooking forward to hearing from you,\nSarah", read:false },
  { id:2, name:'David Chen', email:'d.chen@startup.io', date:'Oct 22, 2023', subject:'Question about your React architecture', message:"Hello! I was browsing through your open-source repositories and had a quick question about how you structured the state management in the E-commerce project. Did you use Redux or just Context API? It looks very clean.\n\nThanks,\nDavid", read:false },
  { id:3, name:'Emma Wilson', email:'ewilson@agency.com', date:'Oct 18, 2023', subject:'Collaboration on upcoming project', message:"Hey there, our agency is looking for a technical partner for an upcoming client project involving WebGL and React. Your portfolio seems like a perfect fit. Let me know if you have bandwidth next month for a quick chat.\n\nBest,\nEmma", read:true },
];

const AdminMessages = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [openMsgId, setOpenMsgId] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [msgToDelete, setMsgToDelete] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => setToast({ show: true, message, type });

  const toggleMessage = (id) => {
    if (openMsgId === id) {
      setOpenMsgId(null);
    } else {
      setOpenMsgId(id);
      setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
    }
  };

  const markAsUnread = (e, id) => {
    e.stopPropagation();
    setMessages(messages.map(m => m.id === id ? { ...m, read: false } : m));
    setOpenMsgId(null);
    showToast('Marked as unread.', 'info');
  };

  const confirmDelete = (e, id) => {
    e.stopPropagation();
    setMsgToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleDelete = () => {
    setMessages(messages.filter(m => m.id !== msgToDelete));
    if (openMsgId === msgToDelete) setOpenMsgId(null);
    showToast('Message deleted.');
    setIsConfirmOpen(false);
  };

  return (
    <div className="admin-content">
      <div className="content-header">
        <div>
          <h1>Messages</h1>
          <p>Messages submitted through the contact form.</p>
        </div>
      </div>

      <div className="message-list">
        {messages.map(msg => (
          <div key={msg.id} className={`message-row ${openMsgId === msg.id ? 'open' : ''}`}>
            <div className="message-summary" onClick={() => toggleMessage(msg.id)}>
              <div className={`unread-dot ${msg.read ? 'hidden' : ''}`}></div>
              <div className="msg-from">
                <div className="name">{msg.name}</div>
                <div className="email">{msg.email}</div>
              </div>
              <div className="msg-preview">{msg.subject}</div>
              <div className="msg-date">{msg.date}</div>
              <svg className="chevron" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            
            <div className="message-detail">
              <div className="message-detail-inner">
                <p>{msg.message}</p>
                <div className="message-detail-actions">
                  <button className="btn btn-secondary" onClick={(e) => markAsUnread(e, msg.id)}>Mark as Unread</button>
                  <button className="btn btn-danger" onClick={(e) => confirmDelete(e, msg.id)}>Delete Message</button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="empty-state">No messages right now. Inbox zero!</div>
        )}
      </div>

      {/* Confirm Modal */}
      <div className={`modal-overlay confirm-modal ${isConfirmOpen ? 'open' : ''}`} onClick={(e) => { if(e.target.classList.contains('modal-overlay')) setIsConfirmOpen(false); }}>
        <div className="modal">
          <div className="confirm-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>
          </div>
          <h3>Delete message?</h3>
          <p>Are you sure you want to delete this message? This cannot be undone.</p>
          <div className="modal-actions">
            <button className="btn btn-secondary" onClick={() => setIsConfirmOpen(false)}>Cancel</button>
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>

      <AdminToast show={toast.show} type={toast.type} message={toast.message} onClose={() => setToast({...toast, show: false})} />
    </div>
  );
};

export default AdminMessages;
