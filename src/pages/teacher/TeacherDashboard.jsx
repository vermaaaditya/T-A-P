import React from 'react';
import { useApp } from '../../context/AppContext';
import { TopHeader } from '../../components/TopHeader';
import { Clock, MapPin, Users, HelpCircle, CheckCircle2, Calendar } from 'lucide-react';

export const TeacherDashboard = () => {
  const { lectures, clarityReports, updateLectureStatus, scheduleDoubtSession } = useApp();

  return (
    <>
      <TopHeader title="Teacher Dashboard" />
      <main className="main-content">
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <Calendar size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-label">Today's Lectures</span>
              <span className="stat-value">5 Classes</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ color: '#10B981', background: 'rgba(16, 185, 129, 0.15)' }}>
              <Users size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-label">Students Enrolled</span>
              <span className="stat-value">309</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ color: '#F59E0B', background: 'rgba(245, 158, 11, 0.15)' }}>
              <HelpCircle size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-label">Pending Doubt Flags</span>
              <span className="stat-value">{clarityReports.filter(r => r.status !== 'Resolved').length}</span>
            </div>
          </div>
        </div>

        {/* TODAY'S LECTURE SCHEDULE LIST */}
        <section className="portal-card" style={{ marginBottom: '2rem' }}>
          <div className="portal-card-header">
            <h2 className="portal-card-title">
              <Clock size={20} />
              Today's Lecture Schedule & Status Control
            </h2>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Updates reflect live on Student & CR Dashboards
            </span>
          </div>

          <div className="lecture-list">
            {lectures.map(lec => (
              <div key={lec.id} className="lecture-row">
                <div className="lecture-main-info">
                  <div className="lecture-time-badge">
                    <span>{lec.period.split(' ')[0]} {lec.period.split(' ')[1]}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {lec.period.substring(lec.period.indexOf('(') + 1, lec.period.indexOf(')'))}
                    </span>
                  </div>

                  <div className="lecture-details">
                    <span className="lecture-subject">{lec.subject}</span>
                    <div className="lecture-meta">
                      <span><MapPin size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> {lec.room}</span>
                      <span>•</span>
                      <span><Users size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> {lec.enrolled} Students</span>
                      <span>•</span>
                      <span>Faculty: <strong>{lec.faculty}</strong></span>
                    </div>
                  </div>
                </div>

                {/* STATUS TOGGLE CONTROL */}
                <div className="status-toggle-group">
                  <button
                    className={`btn-status-toggle ${lec.status === 'In Class' ? 'active in-class' : ''}`}
                    onClick={() => updateLectureStatus(lec.id, 'In Class')}
                  >
                    In Class
                  </button>

                  <button
                    className={`btn-status-toggle ${lec.status === 'Running Late' ? 'active late' : ''}`}
                    onClick={() => updateLectureStatus(lec.id, 'Running Late')}
                  >
                    Running Late
                  </button>

                  <button
                    className={`btn-status-toggle ${lec.status === 'Cancelled' ? 'active cancelled' : ''}`}
                    onClick={() => updateLectureStatus(lec.id, 'Cancelled')}
                  >
                    Cancelled
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CLARITY REPORTS SUMMARY CARD */}
        <section className="portal-card">
          <div className="portal-card-header">
            <h2 className="portal-card-title">
              <HelpCircle size={20} style={{ color: '#F59E0B' }} />
              Student Clarity Reports Summary
            </h2>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Feedback aggregated from post-lecture student polls
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {clarityReports.map(rep => (
              <div 
                key={rep.id} 
                className="portal-card" 
                style={{ 
                  backgroundColor: 'var(--bg-card-subtle)', 
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.05rem', fontWeight: 800 }}>{rep.subject}</span>
                    <span className="status-badge late">
                      {rep.unclearPct}% Class Unclear Flag
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
                    Faculty: <strong>{rep.faculty}</strong> • Status: {rep.scheduledTime ? <strong>{rep.scheduledTime}</strong> : rep.status}
                  </p>
                </div>

                <div>
                  {rep.scheduledTime ? (
                    <span className="status-badge in-class" style={{ gap: '0.5rem' }}>
                      <CheckCircle2 size={16} /> Scheduled: {rep.scheduledTime}
                    </span>
                  ) : (
                    <button 
                      className="btn-primary" 
                      onClick={() => scheduleDoubtSession(rep.id)}
                    >
                      Schedule Doubt-Clearing Session
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};
