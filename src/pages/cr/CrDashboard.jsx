import React from 'react';
import { useApp } from '../../context/AppContext';
import { TopHeader } from '../../components/TopHeader';
import { Calendar, Flag, ShieldAlert, CheckCircle2, Clock } from 'lucide-react';

export const CrDashboard = () => {
  const { lectures, flagLectureNoShow } = useApp();

  return (
    <>
      <TopHeader title="Class Representative (CR) Dashboard" />
      <main className="main-content">
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ color: '#F59E0B', background: 'rgba(245, 158, 11, 0.15)' }}>
              <Calendar size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-label">Daily Period Slots</span>
              <span className="stat-value">5 Periods</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ color: '#EF4444', background: 'rgba(239, 68, 68, 0.15)' }}>
              <Flag size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-label">Flagged No-Shows</span>
              <span className="stat-value">{lectures.filter(l => l.flaggedByCr).length}</span>
            </div>
          </div>
        </div>

        {/* FULL TIMETABLE VIEW */}
        <section className="portal-card">
          <div className="portal-card-header">
            <h2 className="portal-card-title">
              <Clock size={20} />
              Full Period Timetable & Faculty Accountability Matrix
            </h2>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              CR Audit Control • Escalates instantly to HOD
            </span>
          </div>

          <table className="timetable-table">
            <thead>
              <tr>
                <th>Period & Time</th>
                <th>Subject & Code</th>
                <th>Faculty Name</th>
                <th>Room</th>
                <th>Current Status</th>
                <th>CR Action</th>
              </tr>
            </thead>
            <tbody>
              {lectures.map(lec => (
                <tr key={lec.id}>
                  <td>
                    <strong style={{ fontFamily: 'var(--font-mono)' }}>{lec.period.split(' ')[0]} {lec.period.split(' ')[1]}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {lec.period.substring(lec.period.indexOf('(') + 1, lec.period.indexOf(')'))}
                    </div>
                  </td>
                  <td><strong style={{ fontSize: '0.95rem' }}>{lec.subject}</strong></td>
                  <td>{lec.faculty}</td>
                  <td><span style={{ fontFamily: 'var(--font-mono)' }}>{lec.room}</span></td>
                  <td>
                    <span className={`status-badge ${
                      lec.status === 'In Class' ? 'in-class' :
                      lec.status === 'Running Late' ? 'late' :
                      lec.status === 'Cancelled' ? 'cancelled' : 'flagged'
                    }`}>
                      {lec.status}
                    </span>
                  </td>
                  <td>
                    {lec.flaggedByCr ? (
                      <span style={{ fontSize: '0.8rem', color: '#F87171', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <ShieldAlert size={14} /> Flagged to HOD
                      </span>
                    ) : (
                      <button 
                        className="btn-danger-outline" 
                        onClick={() => flagLectureNoShow(lec.id)}
                      >
                        <Flag size={14} /> Flag No-Show
                      </button>
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
