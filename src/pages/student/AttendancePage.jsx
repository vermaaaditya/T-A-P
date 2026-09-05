import React from 'react';
import { useApp } from '../../context/AppContext';
import { TopHeader } from '../../components/TopHeader';
import { AttendanceRing } from '../../components/AttendanceRing';
import { PieChart, CheckCircle2, XCircle } from 'lucide-react';

export const AttendancePage = () => {
  const { attendance } = useApp();

  return (
    <>
      <TopHeader title="Detailed Attendance Roster" />
      <main className="main-content">
        <div className="dashboard-grid" style={{ marginBottom: '2rem' }}>
          <div className="portal-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <AttendanceRing percentage={attendance.percentage} threshold={attendance.threshold} />
          </div>

          <div className="portal-card" style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 className="portal-card-title" style={{ marginBottom: '1rem' }}>
              <PieChart size={20} />
              Eligibility Summary & Warning Calculation
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ padding: '1rem', background: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>MANDATORY REQUIREMENT</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>80% Class Attendance Needed for Examination Clearance</div>
              </div>
              <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#F87171' }}>
                <strong>Critical Notice:</strong> You are currently at 78%. Missing 2 more classes will automatically trigger a De-registration Ticket sent to HOD office.
              </div>
            </div>
          </div>
        </div>

        {/* SUBJECT-WISE BREAKDOWN */}
        <section className="portal-card">
          <div className="portal-card-header">
            <h2 className="portal-card-title">Subject-wise Attendance Breakdown</h2>
          </div>

          <table className="timetable-table">
            <thead>
              <tr>
                <th>Subject Code</th>
                <th>Subject Name</th>
                <th>Attended / Total</th>
                <th>Percentage</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.subjects.map(sub => (
                <tr key={sub.code}>
                  <td><strong style={{ fontFamily: 'var(--font-mono)' }}>{sub.code}</strong></td>
                  <td>{sub.name}</td>
                  <td>{sub.attended} / {sub.total}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ flex: 1, height: 8, background: 'var(--bg-card-subtle)', borderRadius: 4, overflow: 'hidden' }}>
                        <div 
                          style={{ 
                            height: '100%', 
                            width: `${sub.pct}%`, 
                            background: sub.pct >= 80 ? 'var(--status-inclass-text)' : 'var(--status-cancelled-text)' 
                          }} 
                        />
                      </div>
                      <span style={{ fontWeight: 800, fontFamily: 'var(--font-mono)', minWidth: '40px' }}>{sub.pct}%</span>
                    </div>
                  </td>
                  <td>
                    {sub.pct >= 80 ? (
                      <span className="status-badge in-class"><CheckCircle2 size={14} /> Clear</span>
                    ) : (
                      <span className="status-badge cancelled"><XCircle size={14} /> Below Threshold</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
};
