import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  updateDoc, 
  addDoc 
} from 'firebase/firestore';

const AppContext = createContext();

const initialLectures = [
  { 
    id: 'LEC-101', 
    period: 'Period 1 (09:00 - 10:00 AM)', 
    subject: 'CS-302 Data Structures & Algorithms', 
    faculty: 'Dr. Robert Vance', 
    room: 'Hall 301', 
    status: 'In Class', 
    enrolled: 65, 
    clarityScore: 78,
    flaggedByCr: false 
  },
  { 
    id: 'LEC-102', 
    period: 'Period 2 (10:15 - 11:15 AM)', 
    subject: 'CS-304 Database Management Systems', 
    faculty: 'Prof. Anita Sharma', 
    room: 'Lab 2B', 
    status: 'Running Late', 
    enrolled: 60, 
    clarityScore: 82,
    flaggedByCr: false 
  },
  { 
    id: 'LEC-103', 
    period: 'Period 3 (11:30 - 12:30 PM)', 
    subject: 'CS-306 Computer Networks', 
    faculty: 'Dr. Alan Turing', 
    room: 'Hall 204', 
    status: 'In Class', 
    enrolled: 62, 
    clarityScore: 90,
    flaggedByCr: false 
  },
  { 
    id: 'LEC-104', 
    period: 'Period 4 (01:30 - 02:30 PM)', 
    subject: 'CS-308 Operating Systems', 
    faculty: 'Dr. Robert Vance', 
    room: 'Lab 1A', 
    status: 'In Class', 
    enrolled: 64, 
    clarityScore: 32, 
    flaggedByCr: false 
  },
  { 
    id: 'LEC-105', 
    period: 'Period 5 (02:45 - 03:45 PM)', 
    subject: 'CS-310 Software Engineering', 
    faculty: 'Prof. Marcus Brody', 
    room: 'Hall 102', 
    status: 'Cancelled', 
    enrolled: 58, 
    clarityScore: 75,
    flaggedByCr: false 
  }
];

const initialClarityReports = [
  {
    id: 'CR-01',
    lectureId: 'LEC-104',
    subject: 'CS-308 Operating Systems',
    faculty: 'Dr. Robert Vance',
    unclearPct: 68,
    status: 'Needs Doubt Session',
    scheduledTime: null
  }
];

export const AppProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null); // 'teacher', 'student', 'cr'
  const [theme, setTheme] = useState('dark');
  const [lectures, setLectures] = useState(initialLectures);
  const [clarityReports, setClarityReports] = useState(initialClarityReports);
  const [disputes, setDisputes] = useState([]);
  const [toasts, setToasts] = useState([]);

  // Attendance state for student
  const [attendance, setAttendance] = useState({
    totalClasses: 40,
    attendedClasses: 31,
    percentage: 78,
    threshold: 80,
    absencesToIneligible: 2,
    subjects: [
      { code: 'CS-302', name: 'Data Structures', attended: 8, total: 10, pct: 80 },
      { code: 'CS-304', name: 'Database Systems', attended: 9, total: 10, pct: 90 },
      { code: 'CS-306', name: 'Computer Networks', attended: 7, total: 10, pct: 70 },
      { code: 'CS-308', name: 'Operating Systems', attended: 7, total: 10, pct: 70 }
    ]
  });

  const profiles = {
    teacher: {
      name: 'Dr. Robert Vance',
      title: 'Professor & HOD',
      dept: 'Computer Science',
      avatar: 'RV',
      roleLabel: 'Faculty Member'
    },
    student: {
      name: 'Alex Morgan',
      title: 'B.Tech CS 3rd Year',
      roll: '2024-CS-042',
      avatar: 'AM',
      roleLabel: 'Student'
    },
    cr: {
      name: 'Sarah Jenkins',
      title: 'Class Representative (CS-3B)',
      roll: '2024-CS-001',
      avatar: 'SJ',
      roleLabel: 'Class Rep (CR)'
    }
  };

  const userProfile = userRole ? profiles[userRole] : null;

  // Toggle Dark/Light mode DOM root attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // FIRESTORE REALTIME SYNC LISTENERS
  useEffect(() => {
    let unsubscribeLectures = () => {};
    let unsubscribeReports = () => {};
    let unsubscribeDisputes = () => {};

    try {
      // 1. Subscribe to Lectures Collection
      const lecturesRef = collection(db, 'lectures');
      unsubscribeLectures = onSnapshot(lecturesRef, (snapshot) => {
        if (snapshot.empty) {
          // Seed initial data if collection is empty
          initialLectures.forEach(async (lec) => {
            await setDoc(doc(db, 'lectures', lec.id), lec);
          });
        } else {
          const docsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          // Maintain original period sorting order
          docsData.sort((a, b) => a.id.localeCompare(b.id));
          setLectures(docsData);
        }
      }, (err) => console.warn('Firestore lectures snapshot fallback:', err));

      // 2. Subscribe to Clarity Reports Collection
      const reportsRef = collection(db, 'clarityReports');
      unsubscribeReports = onSnapshot(reportsRef, (snapshot) => {
        if (snapshot.empty) {
          initialClarityReports.forEach(async (rep) => {
            await setDoc(doc(db, 'clarityReports', rep.id), rep);
          });
        } else {
          const docsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setClarityReports(docsData);
        }
      }, (err) => console.warn('Firestore clarity reports snapshot fallback:', err));

      // 3. Subscribe to Disputes Collection
      const disputesRef = collection(db, 'disputes');
      unsubscribeDisputes = onSnapshot(disputesRef, (snapshot) => {
        if (!snapshot.empty) {
          const docsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setDisputes(docsData);
        }
      }, (err) => console.warn('Firestore disputes snapshot fallback:', err));

    } catch (e) {
      console.warn('Firebase sync initialization fallback to local state:', e);
    }

    return () => {
      unsubscribeLectures();
      unsubscribeReports();
      unsubscribeDisputes();
    };
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    addToast(`Switched to ${theme === 'dark' ? 'Light' : 'Dark'} mode`, 'info');
  };

  const login = (role) => {
    setUserRole(role);
    addToast(`Logged in as ${profiles[role].name} (${profiles[role].roleLabel})`, 'success');
  };

  const logout = () => {
    setUserRole(null);
    addToast('Logged out safely. Session state reset.', 'info');
  };

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type, time: new Date().toLocaleTimeString() }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Real-Time Lecture Status Update (Teacher action)
  const updateLectureStatus = async (lectureId, newStatus) => {
    // Optimistic local update
    setLectures(prev =>
      prev.map(lec => (lec.id === lectureId ? { ...lec, status: newStatus } : lec))
    );

    try {
      const lecRef = doc(db, 'lectures', lectureId);
      await updateDoc(lecRef, { status: newStatus });
    } catch (err) {
      // If doc doesn't exist yet, setDoc
      try {
        const target = lectures.find(l => l.id === lectureId);
        if (target) {
          await setDoc(doc(db, 'lectures', lectureId), { ...target, status: newStatus });
        }
      } catch (e) {
        console.warn('Firestore write error:', e);
      }
    }

    const target = lectures.find(l => l.id === lectureId);
    addToast(`Updated ${target ? target.subject : 'lecture'} status to "${newStatus}"`, 'success');
  };

  // Real-Time CR Flag No-Show (CR action)
  const flagLectureNoShow = async (lectureId) => {
    setLectures(prev =>
      prev.map(lec =>
        lec.id === lectureId
          ? { ...lec, status: 'Flagged No-Show', flaggedByCr: true }
          : lec
      )
    );

    try {
      const lecRef = doc(db, 'lectures', lectureId);
      await updateDoc(lecRef, { status: 'Flagged No-Show', flaggedByCr: true });
    } catch (e) {
      console.warn('Firestore flag error:', e);
    }

    const target = lectures.find(l => l.id === lectureId);
    addToast(`CR Flagged No-Show for ${target ? target.subject : 'lecture'}. Escalated to HOD!`, 'warning');
  };

  // Real-Time Schedule Doubt clearing session (Teacher action)
  const scheduleDoubtSession = async (reportId) => {
    const timeStr = 'Tomorrow 4:00 PM (Hall 301)';
    setClarityReports(prev =>
      prev.map(rep =>
        rep.id === reportId
          ? { ...rep, status: 'Session Scheduled', scheduledTime: timeStr }
          : rep
      )
    );

    try {
      const repRef = doc(db, 'clarityReports', reportId);
      await updateDoc(repRef, { status: 'Session Scheduled', scheduledTime: timeStr });
    } catch (e) {
      console.warn('Firestore schedule doubt session error:', e);
    }

    addToast(`Doubt-Clearing Session scheduled for ${timeStr}`, 'success');
  };

  // Real-Time Submit Clarity Poll rating (Student action)
  const submitClarityPoll = async (lectureId, rating) => {
    const isLowRating = rating <= 3;
    const targetLec = lectures.find(l => l.id === lectureId) || lectures[3];

    if (isLowRating) {
      const existingReport = clarityReports.find(r => r.lectureId === targetLec.id);
      if (!existingReport) {
        const newReport = {
          id: `CR-${Date.now().toString().slice(-4)}`,
          lectureId: targetLec.id,
          subject: targetLec.subject,
          faculty: targetLec.faculty,
          unclearPct: 68,
          status: 'Needs Doubt Session',
          scheduledTime: null
        };
        setClarityReports(prev => [...prev, newReport]);
        try {
          await setDoc(doc(db, 'clarityReports', newReport.id), newReport);
        } catch (e) {
          console.warn('Firestore poll submit error:', e);
        }
      }
    }

    addToast(`Submitted rating (${rating}/5) for ${targetLec.subject}`, isLowRating ? 'warning' : 'success');
  };

  // Real-Time Submit Dispute (Student action)
  const submitDispute = async (disputeData) => {
    const newDispute = {
      id: `DISP-${Date.now().toString().slice(-4)}`,
      date: new Date().toLocaleDateString(),
      status: 'Pending HOD Review',
      ...disputeData
    };
    setDisputes(prev => [newDispute, ...prev]);

    try {
      await setDoc(doc(db, 'disputes', newDispute.id), newDispute);
    } catch (e) {
      console.warn('Firestore dispute submit error:', e);
    }

    addToast('Dispute ticket raised successfully! Sent to Dean & HOD.', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        userProfile,
        theme,
        lectures,
        clarityReports,
        attendance,
        disputes,
        toasts,
        login,
        logout,
        toggleTheme,
        updateLectureStatus,
        flagLectureNoShow,
        scheduleDoubtSession,
        submitClarityPoll,
        submitDispute,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
