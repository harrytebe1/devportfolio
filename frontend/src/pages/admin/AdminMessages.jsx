import React, { useState, useEffect } from 'react';
import AdminToast from '../../components/admin/AdminToast';
import api from '../../lib/axios';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openMsgId, setOpenMsgId] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [msgToDelete, setMsgToDelete] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => setToast({ show: true, message, type });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/messages');
      setMessages(res.data.data);
    } catch (error) {
      showToast('Failed to load messages', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMessage = async (id, isRead) => {
    if (openMsgId === id) {
      setOpenMsgId(null);
    } else {
      setOpenMsgId(id);
      if (!isRead) {
        try {
          await api.put(`/messages/${id}/read`);
          setMessages(messages.map(m => m.id === id ? { ...m, is_read: true } : m));
        } catch (error) {
          console.error('Failed to mark as read');
        }
      }
    }
  };

  const markAsUnread = async (e, id) => {
    e.stopPropagation();
    try {
      await api.put(`/messages/${id}/unread`);
      setMessages(messages.map(m => m.id === id ? { ...m, is_read: false } : m));
      setOpenMsgId(null);
      showToast('Marked as unread.', 'info');
    } catch (error) {
      showToast('Failed to mark as unread.', 'error');
    }
  };

  const confirmDelete = (e, id) => {
    e.stopPropagation();
    setMsgToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/messages/${msgToDelete}`);
      setMessages(messages.filter(m => m.id !== msgToDelete));
      if (openMsgId === msgToDelete) setOpenMsgId(null);
      showToast('Message deleted.');
      setIsConfirmOpen(false);
    } catch (error) {
      showToast('Failed to delete message.', 'error');
    }
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
        {isLoading ? (
          <div style={{textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)'}}>Loading messages...</div>
        ) : messages.map(msg => (
          <div key={msg.id} className={`message-row ${openMsgId === msg.id ? 'open' : ''}`}>
            <div className="message-summary" onClick={() => toggleMessage(msg.id, msg.is_read)}>
              <div className={`unread-dot ${msg.is_read ? 'hidden' : ''}`}></div>
              <div className="msg-from">
                <div className="name">{msg.name}</div>
                <div className="email">{msg.email}</div>
              </div>
              <div className="msg-preview">{msg.message.substring(0, 50)}...</div>
              <div className="msg-date">{new Date(msg.created_at).toLocaleDateString()}</div>
              <svg className="chevron" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            
            <div className="message-detail">
              <div className="message-detail-inner">
                <p style={{ whiteSpace: 'pre-wrap' }}>{msg.message}</p>
                <div className="message-detail-actions">
                  <button className="btn btn-secondary" onClick={(e) => markAsUnread(e, msg.id)}>Mark as Unread</button>
                  <button className="btn btn-danger" onClick={(e) => confirmDelete(e, msg.id)}>Delete Message</button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {!isLoading && messages.length === 0 && (
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
