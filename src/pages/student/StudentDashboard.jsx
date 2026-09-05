import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { TopHeader } from '../../components/TopHeader';
import { AttendanceRing } from '../../components/AttendanceRing';
import { AlertOctagon, Clock, MapPin, Star, ArrowRight, HelpCircle } from 'lucide-react';

export const StudentDashboard = () => {
  const { lectures, attendance } = useApp();
  const navigate = useNavigate();

  const isLowAttendance = attendance.percentage < attendance.threshold;

  return (
    <>
      <TopHeader title="Student Dashboard" />
      <main className="main-content">

        {/* RISK ALERT BANNER */}
        {isLowAttendance && (
          <div className="risk-banner">
            <div className="risk-banner-content">
              <div className="risk-icon-wrapper">
                <AlertOctagon size={24} />
              </div>
              <div>
                <h3 className="risk-title">ATTENDANCE ELIGIBILITY RISK WARNING</h3>
                <p className="risk-desc">
                  Your attendance is currently <strong>{attendance.percentage}%</strong> (below {attendance.threshold}% requirement). 
                  <strong> {attendance.absencesToIneligible} more absences = ineligible for final end-term exams!</strong>
                </p>
              </div>
            </div>
            <button 
              className="btn-secondary" 
              onClick={() => navigate('/student/attendance')}
              style={{ flexShrink: 0, marginLeft: '1rem' }}
            >
              View Roster
            </button>
          </div>
        )}

        <div className="dashboard-grid">
          {/* CIRCULAR ATTENDANCE CARD */}
          <section className="portal-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="portal-card-header" style={{ width: '100%' }}>
              <h2 className="portal-card-title">Overall Attendance</h2>
              <span className="status-badge cancelled" style={{ fontSize: '0.75rem' }}>
                Risk Warning
              </span>
            </div>

            <AttendanceRing percentage={attendance.percentage} threshold={attendance.threshold} />

            <div style={{ textTransform: 'center', marginTop: '1rem', width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', padding: '0.5rem 0', borderTop: '1px solid var(--border-color)' }}>
                <span>Classes Attended</span>
                <strong style={{ color: 'var(--text-main)' }}>{attendance.attendedClasses} / {attendance.totalClasses}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', padding: '0.5rem 0' }}>
                <span>Required Threshold</span>
                <strong style={{ color: 'var(--status-inclass-text)' }}>{attendance.threshold}% Minimum</strong>
              </div>
            </div>
          </section>

          {/* TODAY'S LECTURES (LIVE SYNC WITH TEACHER STATE) */}
          <section className="portal-card" style={{ gridColumn: 'span 2' }}>
            <div className="portal-card-header">
              <h2 className="portal-card-title">
                <Clock size={20} />
                Today's Lectures & Live Faculty Status
              </h2>
              <span style={{ fontSize: '0.8rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 700 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', display: 'inline-block' }}></span>
                Live Faculty Sync
              </span>
            </div>

            <div className="lecture-list">
              {lectures.map(lec => {
                const getStatusBadge = (st) => {
                  if (st === 'In Class') return <span className="status-badge in-class">In Class</span>;
                  if (st === 'Running Late') return <span className="status-badge late">Running Late</span>;
                  if (st === 'Cancelled') return <span className="status-badge cancelled">Cancelled</span>;
                  return <span className="status-badge flagged">{st}</span>;
                };

                return (
                  <div key={lec.id} className="lecture-row">
                    <div className="lecture-main-info">
                      <div className="lecture-time-badge">
                        <span>{lec.period.split(' ')[0]}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{lec.period.split(' ')[1]}</span>
                      </div>

                      <div className="lecture-details">
                        <span className="lecture-subject">{lec.subject}</span>
                        <div className="lecture-meta">
                          <span>Faculty: <strong>{lec.faculty}</strong></span>
                          <span>•</span>
                          <span><MapPin size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> {lec.room}</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {getStatusBadge(lec.status)}
                      <button 
                        className="btn-secondary" 
                        onClick={() => navigate('/student/poll', { state: { lectureId: lec.id } })}
                        style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
                      >
                        <HelpCircle size={14} /> Rate Understanding
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};
