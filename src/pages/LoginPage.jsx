import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { GraduationCap, UserCheck, Shield, Award, Sun, Moon } from 'lucide-react';

export const LoginPage = () => {
  const { login, theme, toggleTheme } = useApp();
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    login(role);
    if (role === 'teacher') navigate('/teacher/dashboard');
    else if (role === 'student') navigate('/student/dashboard');
    else if (role === 'cr') navigate('/cr/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-theme-header">
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          <span>{theme === 'dark' ? 'Light Theme' : 'Dark Theme'}</span>
        </button>
      </div>

      <div className="login-card">
        <div className="login-brand-header">
          <div className="login-logo-box">
            <Award size={32} />
          </div>
          <h1 className="login-portal-title">Accountability Portal</h1>
          <p className="login-portal-subtitle">
            Institutional Academic Transparency & Faculty Lecture Accountability Platform
          </p>
        </div>

        <div className="role-selector-group">
          <button 
            className="role-select-btn"
            onClick={() => handleRoleSelect('teacher')}
          >
            <div className="role-btn-info">
              <div className="role-icon-wrapper teacher-icon">
                <GraduationCap size={22} />
              </div>
              <div>
                <div className="role-btn-title">Login as Teacher</div>
                <div className="role-btn-desc">Dr. Robert Vance • Faculty / HOD</div>
              </div>
            </div>
            <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>→</span>
          </button>

          <button 
            className="role-select-btn"
            onClick={() => handleRoleSelect('student')}
          >
            <div className="role-btn-info">
              <div className="role-icon-wrapper student-icon">
                <UserCheck size={22} />
              </div>
              <div>
                <div className="role-btn-title">Login as Student</div>
                <div className="role-btn-desc">Alex Morgan • B.Tech CS 3rd Year</div>
              </div>
            </div>
            <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>→</span>
          </button>

          <button 
            className="role-select-btn"
            onClick={() => handleRoleSelect('cr')}
          >
            <div className="role-btn-info">
              <div className="role-icon-wrapper cr-icon">
                <Shield size={22} />
              </div>
              <div>
                <div className="role-btn-title">Login as Class Rep (CR)</div>
                <div className="role-btn-desc">Sarah Jenkins • Timetable & Escalation</div>
              </div>
            </div>
            <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>→</span>
          </button>
        </div>

        <div style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Session Demo Mode • No password required
        </div>
      </div>
    </div>
  );
};
