import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  HelpCircle, 
  PieChart, 
  AlertTriangle, 
  CheckCircle2, 
  LogOut, 
  UserCheck, 
  Award, 
  SlidersHorizontal 
} from 'lucide-react';

export const Sidebar = () => {
  const { userRole, userProfile, logout } = useApp();
  const navigate = useNavigate();

  if (!userRole) return null;

  const handleLogoutClick = () => {
    logout();
    navigate('/login');
  };

  const navConfigs = {
    teacher: [
      { path: '/teacher/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/teacher/lectures', label: 'My Lectures', icon: BookOpen },
      { path: '/teacher/clarity', label: 'Clarity Reports', icon: HelpCircle }
    ],
    student: [
      { path: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/student/attendance', label: 'Attendance', icon: PieChart },
      { path: '/student/dispute', label: 'Raise Dispute', icon: AlertTriangle },
      { path: '/student/poll', label: 'Clarity Poll', icon: HelpCircle }
    ],
    cr: [
      { path: '/cr/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/cr/status', label: 'Faculty Status', icon: UserCheck },
      { path: '/cr/flag', label: 'Flag Issue', icon: SlidersHorizontal }
    ]
  };

  const currentNav = navConfigs[userRole] || [];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="brand-icon-box">
          <Award size={22} />
        </div>
        <div className="brand-info">
          <span className="brand-title">Accountability</span>
          <span className="brand-subtitle">Portal • Admin</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {currentNav.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Icon className="icon" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="user-badge-card">
          <div className="user-avatar">{userProfile?.avatar || 'U'}</div>
          <div className="user-details">
            <span className="user-name">{userProfile?.name}</span>
            <span className="user-role-tag">{userProfile?.roleLabel}</span>
          </div>
        </div>

        <button className="btn-logout" onClick={handleLogoutClick} title="Logout of current session">
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
