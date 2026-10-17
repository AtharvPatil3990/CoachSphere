import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Users,
  Building2,
  RefreshCw,
  ArrowRightLeft,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Video,
  Laptop,
  Check,
  X
} from 'lucide-react';

export default function TimetableRescheduler({ onShowToast = () => {} }) {
  // Active viewing day filter
  const [selectedDay, setSelectedDay] = useState('Tomorrow (Saturday)');
  const [isSolving, setIsSolving] = useState(false);
  const [solverResult, setSolverResult] = useState(null);

  // Facility rooms & schedule slots state
  const [scheduleData, setScheduleData] = useState([
    {
      id: 'slot-1',
      batch: 'Java Full Stack (JFS-04)',
      trainer: 'Rajiv Kumar',
      status: 'normal', // 'normal' | 'conflict' | 'reallocated'
      room: 'Lab 03 Core (High Spec)',
      time: '09:00 - 11:30 AM',
      students: 34,
      isHybrid: true,
      conflictNote: ''
    },
    {
      id: 'slot-2',
      batch: 'DevOps & Cloud (DO-08)',
      trainer: 'Vikram Mehta',
      status: 'normal',
      room: 'Lab 01 (Cloud Cluster)',
      time: '11:45 - 01:45 PM',
      students: 28,
      isHybrid: false,
      conflictNote: ''
    },
    {
      id: 'slot-3',
      batch: 'React & Frontend (RF-14)',
      trainer: 'Priya Sharma',
      status: 'normal',
      room: 'Lab 02 (Frontend Bay)',
      time: '02:00 - 04:30 PM',
      students: 32,
      isHybrid: true,
      conflictNote: ''
    },
    {
      id: 'slot-4',
      batch: 'Data Science & Python (DS-02)',
      trainer: 'Amit Deshmukh',
      status: 'normal',
      room: 'Lab 03 Core (High Spec)',
      time: '05:00 - 07:30 PM',
      students: 25,
      isHybrid: false,
      conflictNote: ''
    }
  ]);

  // Simulate an Emergency Sick Leave & trigger the 1.4s Conflict Solver
  const handleTriggerEmergencySick = () => {
    setIsSolving(true);
    setSolverResult(null);

    // 1. Immediately flag Rajiv Kumar as absent / clashed
    setScheduleData((prev) =>
      prev.map((slot) =>
        slot.trainer === 'Rajiv Kumar'
          ? {
              ...slot,
              status: 'conflict',
              conflictNote: 'Trainer Rajiv Kumar marked SICK. Unattended cohort in Lab 03!'
            }
          : slot
      )
    );

    // 2. Simulate 1.4 second constraint solving
    setTimeout(() => {
      setIsSolving(false);
      setSolverResult({
        timeTaken: '1.38s',
        overlapsAvoided: 3,
        substituteAssigned: 'Priya Sharma',
        loadBalanced: '4.8h total trainer load (within 6.0h daily safe limit)'
      });

      // Update slot with resolved schedule
      setScheduleData((prev) =>
        prev.map((slot) =>
          slot.trainer === 'Rajiv Kumar'
            ? {
                ...slot,
                trainer: 'Priya Sharma (Substitute)',
                status: 'reallocated',
                conflictNote: 'Auto-resolved by EduPulse Solver: Zero room or zoom link overlap.'
              }
            : slot
        )
      );

      onShowToast('Timetable recomputed in 1.4s! 0 overlaps found across 18 active cohorts.');
    }, 1400);
  };

  const handleResetSchedule = () => {
    setSolverResult(null);
    setScheduleData([
      {
        id: 'slot-1',
        batch: 'Java Full Stack (JFS-04)',
        trainer: 'Rajiv Kumar',
        status: 'normal',
        room: 'Lab 03 Core (High Spec)',
        time: '09:00 - 11:30 AM',
        students: 34,
        isHybrid: true,
        conflictNote: ''
      },
      {
        id: 'slot-2',
        batch: 'DevOps & Cloud (DO-08)',
        trainer: 'Vikram Mehta',
        status: 'normal',
        room: 'Lab 01 (Cloud Cluster)',
        time: '11:45 - 01:45 PM',
        students: 28,
        isHybrid: false,
        conflictNote: ''
      },
      {
        id: 'slot-3',
        batch: 'React & Frontend (RF-14)',
        trainer: 'Priya Sharma',
        status: 'normal',
        room: 'Lab 02 (Frontend Bay)',
        time: '02:00 - 04:30 PM',
        students: 32,
        isHybrid: true,
        conflictNote: ''
      },
      {
        id: 'slot-4',
        batch: 'Data Science & Python (DS-02)',
        trainer: 'Amit Deshmukh',
        status: 'normal',
        room: 'Lab 03 Core (High Spec)',
        time: '05:00 - 07:30 PM',
        students: 25,
        isHybrid: false,
        conflictNote: ''
      }
    ]);
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-6">
      {/* 1. Header & Emergency Solver Trigger Card */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">1.4s Clash-Free Timetable Re-Planner</h2>
              <span className="text-[11px] font-mono font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
                Constraint Solver v3.2
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Re-plans instructors, physical lab seats, and Zoom credentials in under 1.4 seconds with zero overlaps.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleTriggerEmergencySick}
            disabled={isSolving}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer disabled:opacity-75"
          >
            {isSolving ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Re-planning (1.4s)...</span>
              </>
            ) : (
              <>
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>Simulate Sick Leave & Auto-Resolve</span>
              </>
            )}
          </button>
          <button
            onClick={handleResetSchedule}
            className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors cursor-pointer"
          >
            Reset
          </button>
        </div>
      </section>

      {/* 2. Solver Intelligence Feedback Banner (Appears when solver completes) */}
      {solverResult && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-900">Constraint Solver Succeeded</span>
                <span className="text-[10px] font-mono font-bold bg-white text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full">
                  Execution: {solverResult.timeTaken}
                </span>
              </div>
              <p className="text-xs text-emerald-800 mt-0.5">
                Assigned <strong className="font-bold">{solverResult.substituteAssigned}</strong> • {solverResult.loadBalanced}. Student calendar webhooks staged.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-800 bg-white border border-emerald-200 px-3 py-1 rounded-lg">
              0 Overlaps Found
            </span>
          </div>
        </div>
      )}

      {/* 3. Facility Utilization KPI Blocks */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Lab Seat Capacity</span>
            <Building2 className="w-4 h-4 text-slate-400" />
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-slate-900">120 / 140</span>
            <span className="text-xs text-indigo-600 font-semibold">85.7% Occupied</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-indigo-600 h-full w-[85.7%]" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Trainer Fatigue Guard</span>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-emerald-600">4.8h Max</span>
            <span className="text-xs text-slate-500">Cap: 6.0h/day</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-500 h-full w-[80%]" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Zoom WebRTC Clusters</span>
            <Video className="w-4 h-4 text-slate-400" />
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-slate-900">6 Active</span>
            <span className="text-xs text-emerald-600 font-semibold">Synced</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Dual webhook listeners ready</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Schedule Integrity</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-emerald-600">100%</span>
            <span className="text-xs text-slate-500">Deterministic</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">AST Sandbox validated</p>
        </div>
      </section>

      {/* 4. Interactive Timetable Matrix Grid */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
        {/* Day Selector & Quick Calendar Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900">Campus Schedule Grid</span>
            <span className="text-xs text-slate-400">({selectedDay})</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            {['Today (Friday)', 'Tomorrow (Saturday)', 'Monday'].map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedDay === day
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Timetable Cards Grid */}
        <div className="space-y-3">
          {scheduleData.map((slot) => {
            const isClash = slot.status === 'conflict';
            const isReallocated = slot.status === 'reallocated';

            return (
              <div
                key={slot.id}
                className={`p-4 rounded-xl border transition-all ${
                  isClash
                    ? 'bg-rose-50/70 border-rose-300 shadow-sm'
                    : isReallocated
                    ? 'bg-emerald-50/60 border-emerald-300 shadow-xs'
                    : 'bg-slate-50/60 border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  {/* Left: Timing & Batch Info */}
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center shrink-0 shadow-2xs">
                      <Clock className="w-4 h-4 text-slate-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-slate-900">{slot.batch}</span>
                        {slot.isHybrid && (
                          <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <Video className="w-3 h-3" /> Hybrid Stream
                          </span>
                        )}
                        {isClash && (
                          <span className="text-[10px] font-bold text-rose-700 bg-rose-100 border border-rose-200 px-2 py-0.5 rounded-md flex items-center gap-1 animate-pulse">
                            <AlertTriangle className="w-3 h-3" /> Instructor Clash
                          </span>
                        )}
                        {isReallocated && (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <Check className="w-3 h-3" /> Solver Resolved
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 mt-1 flex items-center gap-3 flex-wrap">
                        <span className="font-semibold text-slate-700">{slot.time}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-slate-600">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" /> {slot.room}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-slate-600">
                          <Users className="w-3.5 h-3.5 text-slate-400" /> {slot.students} Enrolled
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Assigned Trainer & State */}
                  <div className="flex items-center gap-4 self-end md:self-auto">
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 block uppercase font-bold tracking-wider">
                        Assigned Trainer
                      </span>
                      <span className={`text-xs font-bold ${isClash ? 'text-rose-600 line-through' : 'text-slate-900'}`}>
                        {slot.trainer}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onShowToast(`Slot details opened for ${slot.batch}`)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                      >
                        Adjust Room
                      </button>
                    </div>
                  </div>
                </div>

                {/* Subtext warning if conflict exists */}
                {slot.conflictNote && (
                  <div className={`mt-2.5 pt-2.5 border-t text-xs font-medium ${
                    isClash ? 'border-rose-200 text-rose-700' : 'border-emerald-200 text-emerald-800'
                  }`}>
                    {slot.conflictNote}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}