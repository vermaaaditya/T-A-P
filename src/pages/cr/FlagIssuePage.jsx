import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TopHeader } from '../../components/TopHeader';
import { SlidersHorizontal, AlertOctagon, Send } from 'lucide-react';

export const FlagIssuePage = () => {
  const { lectures, addToast } = useApp();
  const [selectedLecture, setSelectedLecture] = useState(lectures[0]?.id || '');
  const [issueType, setIssueType] = useState('Faculty Unannounced Absence');
  const [note, setNote] = useState('');

  const handleEscalationSubmit = (e) => {
    e.preventDefault();
    const target = lectures.find(l => l.id === selectedLecture);
    addToast(`Escalation ticket for ${target ? target.subject : 'lecture'} dispatched to Dean of Academics & HOD!`, 'warning');
    setNote('');
  };

  return (
    <>
      <TopHeader title="CR Emergency Escalation Panel" />
      <main className="main-content">
        <section className="portal-card" style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div className="portal-card-header">
            <h2 className="portal-card-title">
              <SlidersHorizontal size={20} />
              Flag Classroom Accountability Issue
            </h2>
          </div>

          <form onSubmit={handleEscalationSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                SELECT AFFECTED LECTURE PERIOD
              </label>
              <select
                value={selectedLecture}
                onChange={e => setSelectedLecture(e.target.value)}
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
                  <option key={l.id} value={l.id}>{l.period} — {l.subject} ({l.faculty})</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                ISSUE CATEGORY
              </label>
              <select
                value={issueType}
                onChange={e => setIssueType(e.target.value)}
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
                <option value="Faculty Unannounced Absence">Faculty Unannounced Absence (&gt;20 mins late)</option>
                <option value="Classroom Equipment Failure (Projector / AC / Mic)">Classroom Equipment Failure (Projector / AC / Mic)</option>
                <option value="Lecture Hall Double Booking Conflict">Lecture Hall Double Booking Conflict</option>
                <option value="Syllabus Pacing Discrepancy">Syllabus Pacing Discrepancy</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                CR INCIDENT NOTES & EVIDENCE
              </label>
              <textarea
                rows={5}
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Describe the classroom situation, timestamp, and student attendance presence..."
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

            <button type="submit" className="btn-primary" style={{ background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)' }}>
              <AlertOctagon size={18} /> Escalate Urgently to HOD & Academic Audit
            </button>
          </form>
        </section>
      </main>
    </>
  );
};
