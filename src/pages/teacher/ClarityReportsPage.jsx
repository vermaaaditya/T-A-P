import React from 'react';
import { useApp } from '../../context/AppContext';
import { TopHeader } from '../../components/TopHeader';
import { HelpCircle, CheckCircle2, AlertCircle } from 'lucide-react';

export const ClarityReportsPage = () => {
  const { clarityReports, scheduleDoubtSession } = useApp();

  return (
    <>
      <TopHeader title="Student Clarity Analytics" />
      <main className="main-content">
        <section className="portal-card">
          <div className="portal-card-header">
            <h2 className="portal-card-title">
              <HelpCircle size={20} />
              All Lecture Feedback & Flagged Doubt Sessions
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {clarityReports.map(rep => (
              <div key={rep.id} className="portal-card" style={{ backgroundColor: 'var(--bg-card-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{rep.subject}</h3>
                  <span className="status-badge late">{rep.unclearPct}% Unclear Feedback</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  Course Lead: {rep.faculty} • Current Status: <strong>{rep.status}</strong>
                </p>

                {rep.scheduledTime ? (
                  <div style={{ padding: '0.75rem', background: 'var(--status-inclass-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--status-inclass-border)', color: 'var(--status-inclass-text)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.9rem' }}>
                    <CheckCircle2 size={18} /> Doubt Session Confirmed for: {rep.scheduledTime}
                  </div>
                ) : (
                  <button className="btn-primary" onClick={() => scheduleDoubtSession(rep.id)}>
                    Schedule Remedial / Doubt Session
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};
