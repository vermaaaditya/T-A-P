import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TopHeader } from '../../components/TopHeader';
import { AlertTriangle, Send, CheckCircle2, ShieldAlert } from 'lucide-react';

export const RaiseDisputePage = () => {
  const { lectures, disputes, submitDispute } = useApp();
  const [subject, setSubject] = useState(lectures[0]?.subject || '');
  const [date, setDate] = useState('2026-09-04');
  const [reason, setReason] = useState('Marked absent when teacher was running late');
  const [comments, setComments] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason.trim()) return;

    submitDispute({
      subject,
      date,
      reason,
      comments
    });

    setComments('');
  };

  return (
    <>
      <TopHeader title="Raise Attendance Dispute" />
      <main className="main-content">
        <div className="dashboard-grid">
          {/* DISPUTE FORM */}
          <section className="portal-card">
            <div className="portal-card-header">
              <h2 className="portal-card-title">
                <AlertTriangle size={20} style={{ color: '#F59E0B' }} />
                Submit Discrepancy Ticket
              </h2>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                  SELECT SUBJECT
                </label>
                <select 
                  value={subject} 
                  onChange={e => setSubject(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}
                >
                  {lectures.map(l => (
                    <option key={l.id} value={l.subject}>{l.subject}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                  LECTURE DATE
                </label>
                <input 
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                  REASON FOR DISPUTE
                </label>
                <select
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}
                >
                  <option value="Marked absent when teacher was running late">Marked absent when teacher was running late</option>
                  <option value="Biometric scanner glitch">Biometric scanner glitch</option>
                  <option value="Official College Duty (NSS / Sports / Event)">Official College Duty (NSS / Sports / Event)</option>
                  <option value="Medical leave submitted to HOD">Medical leave submitted to HOD</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                  ADDITIONAL COMMENTS & DETAILS
                </label>
                <textarea
                  rows={4}
                  value={comments}
                  onChange={e => setComments(e.target.value)}
                  placeholder="Provide any additional context or reference numbers..."
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <button type="submit" className="btn-primary">
                <Send size={16} /> Submit Dispute to HOD & CR
              </button>
            </form>
          </section>

          {/* SUBMITTED DISPUTES HISTORY */}
          <section className="portal-card">
            <div className="portal-card-header">
              <h2 className="portal-card-title">Submitted Dispute Logs</h2>
            </div>

            {disputes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
                <ShieldAlert size={36} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                <p>No active disputes filed for current semester.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {disputes.map(disp => (
                  <div key={disp.id} style={{ padding: '1rem', background: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>{disp.subject}</span>
                      <span className="status-badge late" style={{ fontSize: '0.72rem' }}>{disp.status}</span>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      Date: {disp.date} • Reason: {disp.reason}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
};
