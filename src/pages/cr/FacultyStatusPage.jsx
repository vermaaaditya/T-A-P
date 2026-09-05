import React from 'react';
import { useApp } from '../../context/AppContext';
import { TopHeader } from '../../components/TopHeader';
import { UserCheck, MapPin, Flag } from 'lucide-react';

export const FacultyStatusPage = () => {
  const { lectures, flagLectureNoShow } = useApp();

  return (
    <>
      <TopHeader title="Faculty Presence Tracker" />
      <main className="main-content">
        <section className="portal-card">
          <div className="portal-card-header">
            <h2 className="portal-card-title">
              <UserCheck size={20} />
              Real-time Faculty Presence Roster
            </h2>
          </div>

          <div className="lecture-list">
            {lectures.map(lec => (
              <div key={lec.id} className="lecture-row">
                <div className="lecture-main-info">
                  <div className="lecture-details">
                    <span className="lecture-subject">{lec.faculty}</span>
                    <div className="lecture-meta">
                      <span>Subject: {lec.subject}</span>
                      <span>•</span>
                      <span><MapPin size={14} style={{ display: 'inline' }} /> Room: {lec.room}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span className={`status-badge ${
                    lec.status === 'In Class' ? 'in-class' :
                    lec.status === 'Running Late' ? 'late' : 'cancelled'
                  }`}>
                    {lec.status}
                  </span>

                  {!lec.flaggedByCr && (
                    <button className="btn-danger-outline" onClick={() => flagLectureNoShow(lec.id)}>
                      <Flag size={14} /> Flag No-Show
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
