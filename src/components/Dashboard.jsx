import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboardcontent from './Dashboardcontent';
import TimetableRescheduler from './TimetableRescheduler';
import Attendance from './Attendance';
import FeeReconcile from './FeeReconcile'
import RiskRadarCertificate from './RiskRadarCertificate'
import TutorDashboard from './TutorDashboard'

export default function Dashboard({ initialRole = 'trainer', onNavigateToLanding }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [role, setRole] = useState(initialRole);
  
  // 1. Tab state: matches the 'id' in Sidebar.jsx navItems
  const [activeTab, setActiveTab] = useState('copilot');
    if (role === 'trainer') {
    return (
      <TutorDashboard
        onNavigateToLanding={onNavigateToLanding}
        onSwitchRole={(newRole) => setRole(newRole)}
      />
    );
  }
  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30]">
      <Header
        role={role}
        onRoleChange={setRole}
        onNavigateToLanding={onNavigateToLanding}
      />

      {/* 2. Pass activeTab and onSelectTab to Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
        activeTab={activeTab}
        onSelectTab={(tabId) => setActiveTab(tabId)}
      />

      {/* 3. Main dynamic viewport with responsive padding */}
      <div className={`w-full transition-all duration-300 ${sidebarOpen ? 'lg:pl-72' : 'lg:pl-20'}`}>
        <main className="w-full min-h-screen pt-20 px-4 sm:px-8 py-6">
          
          {/* TAB 1: Copilot Center */}
          {activeTab === 'copilot' && (
            <Dashboardcontent
              role={role}
              isTrainer={role === 'trainer'}
              onRoleChange={setRole}
            />
          )}

          {/* TAB 2: Timetable & Rescheduler */}
          {activeTab === 'timetable' && (
            <TimetableRescheduler
              onShowToast={(msg) => console.log(msg)}
            />
          )}

          {/* TAB 3: Batches & Attendance */}
          {activeTab === 'attendance' && (
            <Attendance 
                onShowToast={(msg) => console.log(msg)} />
            )}

          {/* TAB 4: Fees & Auto-Reconcile */}
          {activeTab === 'fees' && (
            <FeeReconcile 
                onShowToast={(msg) => console.log(msg)} />
            )}

          {/* TAB 5: Risk Radar & Certificates */}
          {activeTab === 'risk' && (
            <RiskRadarCertificate 
                onShowToast={(msg) => console.log(msg)} />
            )}

        </main>
      </div>
    </div>
  );
}