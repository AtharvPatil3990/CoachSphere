// src/App.jsx
import React, { useState } from 'react';
import Landing from './components/Landing.jsx';
import Auth from './components/Auth.jsx';
import DirectorDashboard from './components/Dashboard.jsx';
import TutorDashboard from './components/TutorDashboard.jsx';
import StudentPortal from './components/StudentPortal.jsx';

export default function App() {
  // ⚡️ Set to 'dashboard' and 'student' for testing
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [currentRole, setCurrentRole] = useState('student');

  const handleLoginSuccess = (selectedRole = 'student') => {
    console.log('[App.jsx] Logged in with role:', selectedRole);
    setCurrentRole(selectedRole.toLowerCase().trim());
    setCurrentPage('dashboard');
  };

  const handleRoleSwitch = (newRole) => {
    console.log('[App.jsx] Role switched to:', newRole);
    setCurrentRole(newRole.toLowerCase().trim());
  };

  const handleNavigateToLanding = () => {
    setCurrentPage('landing');
  };

  // Role Normalization checks
  const isTrainerRole =
    currentRole === 'trainer' ||
    currentRole === 'tutor' ||
    currentRole === 'faculty';

  const isStudentRole =
    currentRole === 'student' ||
    currentRole === 'learner';

  return (
    <div className="min-h-screen bg-[#f8f9ff]">
      {/* 🛠️ QUICK DEV ROLE SWITCHER (Floating Top-Right Toolbar) */}
      <div className="fixed top-2 right-4 z-[999] flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-slate-700 shadow-xl text-xs">
        <span className="text-[10px] font-mono text-slate-400 uppercase font-bold mr-1">
          Active:
        </span>
        <button
          type="button"
          onClick={() => handleRoleSwitch('student')}
          className={`px-2 py-0.5 rounded-lg font-semibold transition-all cursor-pointer ${
            isStudentRole
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          Student
        </button>
        <button
          type="button"
          onClick={() => handleRoleSwitch('trainer')}
          className={`px-2 py-0.5 rounded-lg font-semibold transition-all cursor-pointer ${
            isTrainerRole
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          Trainer
        </button>
        <button
          type="button"
          onClick={() => handleRoleSwitch('director')}
          className={`px-2 py-0.5 rounded-lg font-semibold transition-all cursor-pointer ${
            !isTrainerRole && !isStudentRole
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          Director
        </button>
        <div className="w-px h-3 bg-slate-700 mx-0.5" />
        <button
          type="button"
          onClick={() => setCurrentPage(currentPage === 'dashboard' ? 'landing' : 'dashboard')}
          className="text-[10px] text-slate-400 hover:text-slate-200 transition-colors"
          title="Toggle Landing / Dashboard view"
        >
          {currentPage === 'dashboard' ? 'Landing' : 'Dashboard'}
        </button>
      </div>

      {/* 1. Landing View */}
      {currentPage === 'landing' && (
        <Landing
          onNavigateToDashboard={() => setCurrentPage('auth')}
          onDirectLogin={(role) => handleLoginSuccess(role || 'student')}
        />
      )}

      {/* 2. Authentication View */}
      {currentPage === 'auth' && (
        <Auth
          onLoginSuccess={handleLoginSuccess}
          onNavigateToLanding={handleNavigateToLanding}
        />
      )}

      {/* 3. Role-Based Dashboard View */}
      {currentPage === 'dashboard' && (
        <div className="w-full">
          {isStudentRole ? (
            <StudentPortal
              onLogout={handleNavigateToLanding}
              onNavigateToLanding={handleNavigateToLanding}
              onSwitchRole={handleRoleSwitch}
            />
          ) : isTrainerRole ? (
            <TutorDashboard
              onLogout={handleNavigateToLanding}
              onNavigateToLanding={handleNavigateToLanding}
              onSwitchRole={handleRoleSwitch}
            />
          ) : (
            <DirectorDashboard
              initialRole={currentRole}
              onRoleChange={handleRoleSwitch}
              onNavigateToLanding={handleNavigateToLanding}
            />
          )}
        </div>
      )}
    </div>
  );
}