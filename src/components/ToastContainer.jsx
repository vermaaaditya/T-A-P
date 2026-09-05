import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  if (!toasts || toasts.length === 0) return null;

  const iconMap = {
    success: <CheckCircle2 className="toast-icon" style={{ color: '#10B981' }} />,
    warning: <AlertTriangle className="toast-icon" style={{ color: '#F59E0B' }} />,
    error: <XCircle className="toast-icon" style={{ color: '#EF4444' }} />,
    info: <Info className="toast-icon" style={{ color: '#6366F1' }} />
  };

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          {iconMap[toast.type] || iconMap.info}
          <div className="toast-info">
            <span className="toast-message">{toast.message}</span>
            <span className="toast-time">{toast.time}</span>
          </div>
          <button 
            onClick={() => removeToast(toast.id)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              marginLeft: 'auto'
            }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
