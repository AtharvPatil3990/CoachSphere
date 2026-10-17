import React, { useState } from 'react';
import {
  Brain,
  Sparkles,
  ShieldCheck,
  Database,
  Activity,
  Info,
  Check,
  X,
  Send,
  MessageSquare,
  AlertTriangle,
  Clock,
  TerminalSquare
} from 'lucide-react';

import SqlAstModal from '../modal/SqlAstModal';

export default function Dashboardcontent({
  role = 'director',
  isTrainer = false,
  onRoleChange = () => {},
  prompt = '',
  setPrompt = () => {},
  cards = {
    rahul: { visible: true, approved: false },
    trainerSub: { visible: true, approved: false },
    batchWa: { visible: true, approved: false },
  },
  approvedCount = 0,
  onApprove = () => {},
  onDismiss = () => {},
  onInspectCard = () => {},
  onShowToast = () => {}
}) {
  // Toggle for inspecting the Sovereign Runtime SQL AST query
  const [showSql, setShowSql] = useState(false);
  const [isQuerying, setIsQuerying] = useState(false);
  const [isSqlModalOpen, setIsSqlModalOpen] = useState(false);

  const handleRunCopilot = () => {
    if (!prompt.trim()) return;
    setIsQuerying(true);
    setTimeout(() => {
      setIsQuerying(false);
      onShowToast('Query evaluated. Staged 3 actions for Human-in-the-Loop review.');
    }, 800);
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-6">
      
      {/* 1. COPILOT HERO COMMAND CENTER */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-indigo-200">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">Operations Copilot</h2>
              <span className="text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AI Active
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Ask multi-domain questions across attendance, fees, and syllabus progression.
            </p>
          </div>
        </div>

        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Which students in Java Full Stack have missed 3 classes and have EMIs due?"
            className="w-full h-24 p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none transition-all"
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsSqlModalOpen(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                showSql ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>{showSql ? 'Hide SQL AST' : 'Inspect SQL AST'}</span>
            </button>
            <button
              onClick={handleRunCopilot}
              disabled={isQuerying}
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-xs cursor-pointer disabled:opacity-75"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isQuerying ? 'animate-spin' : ''}`} />
              <span>{isQuerying ? 'Analyzing...' : 'Generate Actions'}</span>
            </button>
          </div>
        </div>

        {/* Sovereign Runtime SQL Inspection Panel */}
        {showSql && (
          <div className="mt-2 p-4 rounded-xl bg-[#091426] text-white space-y-3">
            <div className="flex items-center justify-between border-b border-slate-700 pb-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">Sovereign Runtime Execution</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Time: 42ms</span>
            </div>
            <pre className="text-[11px] font-mono text-emerald-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
{`SELECT s.id, s.name, s.phone 
FROM students s
JOIN attendance a ON s.id = a.student_id
JOIN fee_ledgers f ON s.id = f.student_id
WHERE a.absences >= 3 
  AND f.status = 'overdue' 
  AND s.batch_id = 'JFS-04';`}
            </pre>
          </div>
        )}
      </section>

      {/* 2. HUMAN-IN-THE-LOOP (HITL) APPROVAL CARDS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">Staged Actions (Human-in-the-Loop)</h3>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
            {approvedCount} / 3 Approved
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Card 1: Student Nudge */}
          {cards.rahul.visible && (
            <div id="card-rahul" className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                    <AlertTriangle className="w-3 h-3" /> High Risk
                  </span>
                  {cards.rahul.approved && <Check className="w-4 h-4 text-emerald-500" />}
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-tight">WhatsApp Reminder: Rahul Verma</h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Rahul has missed 3 consecutive classes and has a ₹12,500 EMI overdue by 2 days. Drafted supportive payment link & catch-up nudge.
                </p>
              </div>
              
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onDismiss('rahul')}
                  className="text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  Dismiss
                </button>
                <button
                  disabled={cards.rahul.approved}
                  onClick={() => onApprove('rahul', 'WhatsApp reminder dispatched to Rahul Verma.')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    cards.rahul.approved ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{cards.rahul.approved ? 'Dispatched' : 'Approve Send'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Card 2: Trainer / Hardware Swap */}
          {cards.trainerSub.visible && (
            <div id="card-trainer" className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                    <Clock className="w-3 h-3" /> Schedule Shift
                  </span>
                  {cards.trainerSub.approved && <Check className="w-4 h-4 text-emerald-500" />}
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-tight">Extend Lab 03 for JFS-04</h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Trainer Rajiv Kumar requested a 30-minute extension for the current lab. Hardware allocation permits this shift without clashes.
                </p>
              </div>
              
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onDismiss('trainerSub')}
                  className="text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  Dismiss
                </button>
                <button
                  disabled={cards.trainerSub.approved}
                  onClick={() => onApprove('trainerSub', 'Lab 03 schedule formally extended in calendar.')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    cards.trainerSub.approved ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{cards.trainerSub.approved ? 'Updated' : 'Approve Shift'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Card 3: Batch Update */}
          {cards.batchWa.visible && (
            <div id="card-batch" className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                    <Info className="w-3 h-3" /> Broadcast
                  </span>
                  {cards.batchWa.approved && <Check className="w-4 h-4 text-emerald-500" />}
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-tight">Alert Batch JFS-04</h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Drafted general WhatsApp broadcast to notify the rest of the batch about the revised project deadline dates.
                </p>
              </div>
              
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onDismiss('batchWa')}
                  className="text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  Dismiss
                </button>
                <button
                  disabled={cards.batchWa.approved}
                  onClick={() => onApprove('batchWa', 'Batch broadcast sent successfully.')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    cards.batchWa.approved ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{cards.batchWa.approved ? 'Sent' : 'Approve Broadcast'}</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </section>
      {/* SQL AST Popup Modal */}
<SqlAstModal
  isOpen={isSqlModalOpen}
  onClose={() => setIsSqlModalOpen(false)}
  onShowToast={onShowToast}
/>
    </div>
  );
}