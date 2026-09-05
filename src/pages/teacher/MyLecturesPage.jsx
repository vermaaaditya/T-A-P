import React from 'react';
import { useApp } from '../../context/AppContext';
import { TopHeader } from '../../components/TopHeader';
import { BookOpen, MapPin, Users, CalendarCheck } from 'lucide-react';

export const MyLecturesPage = () => {
  const { lectures } = useApp();

  return (
    <>
      <TopHeader title="My Lectures Roster" />
      <main className="main-content">
        <section className="portal-card">
          <div className="portal-card-header">
            <h2 className="portal-card-title">
              <BookOpen size={20} />
              Assigned Courses & Lecture Rooms
            </h2>
          </div>

          <div className="lecture-list">
            {lectures.map(lec => (
              <div key={lec.id} className="lecture-row">
                <div className="lecture-main-info">
                  <div className="lecture-time-badge">
                    <span>{lec.period.split(' ')[0]}</span>
                    <span style={{ fontSize: '0.75rem' }}>{lec.period.split(' ')[1]}</span>
                  </div>
                  <div className="lecture-details">
                    <span className="lecture-subject">{lec.subject}</span>
                    <div className="lecture-meta">
                      <span><MapPin size={14} style={{ display: 'inline' }} /> Location: {lec.room}</span>
                      <span>•</span>
                      <span><Users size={14} style={{ display: 'inline' }} /> Roster: {lec.enrolled} Students</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className={`status-badge ${
                    lec.status === 'In Class' ? 'in-class' :
                    lec.status === 'Running Late' ? 'late' : 'cancelled'
                  }`}>
                    {lec.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};
