import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { ToastContainer } from './components/ToastContainer';
import { LoginPage } from './pages/LoginPage';

// Teacher Pages
import { TeacherDashboard } from './pages/teacher/TeacherDashboard';
import { MyLecturesPage } from './pages/teacher/MyLecturesPage';
import { ClarityReportsPage } from './pages/teacher/ClarityReportsPage';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { AttendancePage } from './pages/student/AttendancePage';
import { RaiseDisputePage } from './pages/student/RaiseDisputePage';
import { ClarityPollPage } from './pages/student/ClarityPollPage';

// CR Pages
import { CrDashboard } from './pages/cr/CrDashboard';
import { FacultyStatusPage } from './pages/cr/FacultyStatusPage';
import { FlagIssuePage } from './pages/cr/FlagIssuePage';

export function App() {
  const { userRole } = useApp();
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';

  return (
    <div className="app-container">
      {userRole && !isLoginPage && <Sidebar />}
      <div className={userRole && !isLoginPage ? 'main-wrapper' : 'login-wrapper'} style={{ flex: 1, width: '100%' }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* Teacher Routes */}
          <Route 
            path="/teacher/dashboard" 
            element={userRole === 'teacher' ? <TeacherDashboard /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/teacher/lectures" 
            element={userRole === 'teacher' ? <MyLecturesPage /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/teacher/clarity" 
            element={userRole === 'teacher' ? <ClarityReportsPage /> : <Navigate to="/login" replace />} 
          />

          {/* Student Routes */}
          <Route 
            path="/student/dashboard" 
            element={userRole === 'student' ? <StudentDashboard /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/student/attendance" 
            element={userRole === 'student' ? <AttendancePage /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/student/dispute" 
            element={userRole === 'student' ? <RaiseDisputePage /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/student/poll" 
            element={userRole === 'student' ? <ClarityPollPage /> : <Navigate to="/login" replace />} 
          />

          {/* CR Routes */}
          <Route 
            path="/cr/dashboard" 
            element={userRole === 'cr' ? <CrDashboard /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/cr/status" 
            element={userRole === 'cr' ? <FacultyStatusPage /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/cr/flag" 
            element={userRole === 'cr' ? <FlagIssuePage /> : <Navigate to="/login" replace />} 
          />

          {/* Fallback */}
          <Route 
            path="*" 
            element={
              userRole === 'teacher' ? <Navigate to="/teacher/dashboard" replace /> :
              userRole === 'student' ? <Navigate to="/student/dashboard" replace /> :
              userRole === 'cr' ? <Navigate to="/cr/dashboard" replace /> :
              <Navigate to="/login" replace />
            } 
          />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}
