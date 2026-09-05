import React from 'react';
import { useApp } from '../context/AppContext';
import { Sun, Moon, ShieldCheck } from 'lucide-react';

export const TopHeader = ({ title }) => {
  const { userRole, userProfile, theme, toggleTheme } = useApp();

  return (
    <header className="top-header">
      <div className="header-title-area">
        <h1 className="page-title">{title}</h1>
        {userRole && (
          <span className={`role-pill ${userRole}`}>
            {userRole === 'teacher' ? 'Faculty Portal' : userRole === 'student' ? 'Student Portal' : 'CR Portal'}
          </span>
        )}
      </div>

      <div className="header-actions">
        <button 
          className="theme-toggle-btn" 
          onClick={toggleTheme}
          aria-label="Toggle theme mode"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          <span>{theme === 'dark' ? 'Light Theme' : 'Dark Theme'}</span>
        </button>
      </div>
    </header>
  );
};
