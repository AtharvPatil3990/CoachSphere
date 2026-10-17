import React, { useState } from 'react';
import {
  Lock,
  Mail,
  Key,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Sparkles,
  Rocket,
  Terminal,
  Radio,
  FileCheck,
  MessageSquare,
  Globe,
  User,
  ExternalLink,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { apiRequest, getAuthToken, saveSession } from '../api/client';

export default function Auth({ onLoginSuccess, onNavigateToLanding, initialMessage = '' }) {
  // Mode: 'signin' | 'signup'
  const [authMode, setAuthMode] = useState('signin');

  // Form states
  const [workEmail, setWorkEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Sign up fields
  const [academyName, setAcademyName] = useState('');
  const [desiredSubdomain, setDesiredSubdomain] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminTier, setAdminTier] = useState('director');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [scaleTier, setScaleTier] = useState('tier1');
  const [attestation, setAttestation] = useState(false);

  // Status feedback toast
  const [statusToast, setStatusToast] = useState({
    show: Boolean(initialMessage),
    message: initialMessage,
    isSuccess: false,
    isLoading: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleDomainQuickFill = (domain) => {
    const atIndex = workEmail.indexOf('@');
    if (atIndex !== -1) {
      setWorkEmail(workEmail.substring(0, atIndex) + domain);
    } else {
      setWorkEmail(workEmail + domain);
    }
  };

  const handleAcademyNameChange = (val) => {
    setAcademyName(val);
    const clean = val.toLowerCase().replace(/[^a-z0-9]/g, '');
    setDesiredSubdomain(clean.substring(0, 15));
  };

  const showToast = (message, isSuccess = false, isLoading = false) => {
    setStatusToast({ show: true, message, isSuccess, isLoading });
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    showToast('Signing in...', false, true);

    try {
      const result = await apiRequest('/api/auth/signin', {
        method: 'POST',
        body: JSON.stringify({
          email: workEmail.trim(),
          password,
        }),
      });
      const token = getAuthToken(result);

      if (!token) {
        throw new Error('Sign-in succeeded but the server did not return an access token.');
      }

      localStorage.setItem('access_token', token);
      const user = await apiRequest('/api/auth/me');
      saveSession(token, user);
      onLoginSuccess(user, 'Signed in successfully.');
    } catch (error) {
      showToast(error.message || 'Sign-in failed.', false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    showToast('Creating your institute account...', false, true);

    try {
      const result = await apiRequest('/api/auth/signup/admin', {
        method: 'POST',
        body: JSON.stringify({
          email: adminEmail.trim(),
          password: signupPassword,
          full_name: adminName.trim(),
          phone: adminPhone.trim(),
          institute_name: academyName.trim(),
          institute_address: null,
          institute_phone: null,
          institute_email: adminEmail.trim(),
        }),
      });
      const token = getAuthToken(result);

      if (token) {
        localStorage.setItem('access_token', token);
        const user = await apiRequest('/api/auth/me');
        saveSession(token, user);
        onLoginSuccess(user, 'Institute account created successfully.');
      } else {
        showToast('Account created. Sign in to continue.', true);
        setAuthMode('signin');
        setWorkEmail(adminEmail);
      }
    } catch (error) {
      showToast(error.message || 'Registration failed.', false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[radial-gradient(circle_at_top,#eef2ff_0%,#f8f9ff_42%,#f8f9ff_100%)] font-sans text-[#0b1c30] min-h-screen flex flex-col antialiased selection:bg-[#e2dfff] selection:text-[#0f0069]">
      {/* 1. TOP HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#f8f9ff]/90 backdrop-blur-xl border-b border-[#e5eeff] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-[72px] w-full px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={onNavigateToLanding}
              className="flex items-center gap-2 text-left focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-[#091426] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-slate-300/40">
                C
              </div>
              <span className="font-bold text-lg text-[#091426] tracking-tight">
                Coach Spear
              </span>
              <span className="px-1.5 py-0.5 bg-[#1e293b] text-white text-[10px] font-mono rounded font-bold uppercase">
                ACADEMY PLATFORM
              </span>
            </button>
            <div className="hidden md:flex items-center gap-2 text-[#45474c] text-xs font-medium">
              <span className="w-1 h-1 rounded-full bg-[#c5c6cd]"></span>
              <span className="text-[#0b1c30] font-semibold">Secure learning operations</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden sm:flex items-center gap-1">
              <button
                onClick={() => setAuthMode('signin')}
                className={`px-3 py-1.5 rounded text-xs transition-colors font-semibold ${
                  authMode === 'signin'
                    ? 'bg-[#e5eeff] text-[#091426]'
                    : 'text-[#45474c] hover:text-[#0b1c30]'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthMode('signup')}
                className={`px-3 py-1.5 rounded text-xs transition-colors font-semibold ${
                  authMode === 'signup'
                    ? 'bg-[#e5eeff] text-[#091426]'
                    : 'text-[#45474c] hover:text-[#0b1c30]'
                }`}
              >
                Institutional Access
              </button>
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#eff4ff] text-[#45474c] hover:text-[#0b1c30] text-xs font-semibold"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>EN-US</span>
              </button>
              <div className="w-8 h-8 rounded-full bg-[#091426] flex items-center justify-center text-white">
                <User className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTAINER */}
      <main className="w-full pt-[72px] flex-1">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-14 flex-1">
          {/* Top Telemetry Strip */}
          <div className="hidden">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#00301e] text-[#4edea3] font-mono text-[11px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6ffbbe] animate-ping"></span>
                AUTH-GATEWAY: READY
              </span>
              <span className="text-[#45474c] text-xs hidden sm:inline">
                Tenant Cluster: us-east-sovereign-04
              </span>
              <span className="text-[#c5c6cd] hidden sm:inline">•</span>
              <span className="text-[#45474c] font-mono text-xs">SHA-256 AST Shield Active</span>
            </div>

            <div className="flex items-center gap-4 text-[#45474c] text-xs">
              <span className="flex items-center gap-1 text-[#00a472] font-semibold">
                <Lock className="w-3.5 h-3.5" /> Zero Data Mutation Gate
              </span>
              <span className="hidden md:inline font-mono">Latency: 14ms</span>
            </div>
          </div>

          <div className="flex justify-center">
            
            {/* LEFT 7 COLS: Dual-Mode Auth Workspace */}
            <div className="w-full max-w-2xl flex flex-col gap-6">
              <div className="bg-white/95 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_24px_70px_rgba(44,54,100,0.12)] border border-white relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#e2dfff]/30 rounded-full blur-3xl pointer-events-none"></div>

                {/* Form Header & Switcher */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-9 relative z-10">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded bg-[#1e293b] text-white font-mono text-[10px] font-bold">
                        COACH SPHERE
                      </span>
                      <span className="text-[#4b41e1] text-xs uppercase tracking-wider font-bold">
                        Secure access
                      </span>
                    </div>
                    <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                      Sign in to manage your academy, or create a new workspace for your team.
                    </p>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#091426]">
                      {authMode === 'signin' ? 'Welcome back' : 'Create your academy'}
                    </h2>
                  </div>

                  {/* Silky Mode Switcher */}
                  <div className="inline-flex p-1.5 bg-slate-100 rounded-xl relative self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setAuthMode('signin')}
                      className={`relative z-10 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        authMode === 'signin'
                          ? 'bg-white text-[#091426] shadow-sm ring-1 ring-slate-200'
                          : 'text-[#45474c] hover:text-[#0b1c30]'
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthMode('signup')}
                      className={`relative z-10 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        authMode === 'signup'
                          ? 'bg-white text-[#091426] shadow-sm ring-1 ring-slate-200'
                          : 'text-[#45474c] hover:text-[#0b1c30]'
                      }`}
                    >
                      Create Academy
                    </button>
                  </div>
                </div>

                {/* MODE 1: SIGN IN */}
                {authMode === 'signin' ? (
                  <div className="flex flex-col space-y-6">
                    <form className="space-y-6 pt-1" onSubmit={handleSignInSubmit}>
                      {/* Work Email */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-[#091426]">Institutional Work Email</label>
                          <div className="hidden sm:flex items-center gap-1">
                            <span className="text-[#45474c] text-[10px] uppercase font-bold">Quick-fill:</span>
                            <button
                              type="button"
                              onClick={() => handleDomainQuickFill('@techsummittrainers.com')}
                              className="px-2 py-1 rounded-lg bg-[#e5eeff] text-[#091426] font-mono text-[10px] hover:bg-[#dce9ff] transition-colors"
                            >
                              @techsummittrainers.com
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDomainQuickFill('@academy.edu')}
                              className="px-2 py-1 rounded-lg bg-[#e5eeff] text-[#091426] font-mono text-[10px] hover:bg-[#dce9ff] transition-colors"
                            >
                              @academy.edu
                            </button>
                          </div>
                        </div>
                        <div className="relative flex items-center">
                          <Mail className="w-4 h-4 text-[#45474c] absolute left-3 pointer-events-none" />
                          <input
                            className="w-full bg-[#f8faff] border border-[#dfe6f3] rounded-xl pl-10 pr-3 py-3 text-sm text-[#091426] focus:bg-white focus:shadow-sm focus:border-[#4b41e1] focus:outline-none transition-all placeholder:text-[#9aa3b5]"
                            type="email"
                            value={workEmail}
                            onChange={(e) => setWorkEmail(e.target.value)}
                            placeholder="name@organization.edu"
                            required
                          />
                        </div>
                      </div>

                      {/* Password */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-[#091426]">Master Passphrase / Token</label>
                          <a href="#reset" className="text-[#4b41e1] hover:underline text-xs font-semibold">
                            Reset credentials?
                          </a>
                        </div>
                        <div className="relative flex items-center">
                          <Key className="w-4 h-4 text-[#45474c] absolute left-3 pointer-events-none" />
                          <input
                            className="w-full bg-[#f8faff] border border-[#dfe6f3] rounded-xl pl-10 pr-10 py-3 text-sm font-mono text-[#091426] focus:bg-white focus:shadow-sm focus:border-[#4b41e1] focus:outline-none transition-all placeholder:text-[#9aa3b5]"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••••••••••"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 text-[#45474c] hover:text-[#091426]"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Primary Sign In Button */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#091426] text-white hover:bg-[#1e293b] transition-all shadow-lg shadow-slate-300/40 text-sm font-bold group disabled:opacity-75 cursor-pointer"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-[#4edea3]" />
                            <span>Authenticating Handshake...</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 text-[#4edea3]" />
                            <span>Sign in to Coach Sphere</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </form>

                  </div>
                ) : (
                  /* MODE 2: CREATE ACADEMY (SIGN UP) */
                  <div className="flex flex-col space-y-7">
                    <div className="bg-[#eff4ff] rounded-xl p-3 flex items-center justify-between border border-[#e5eeff]">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#4b41e1]"></span>
                        <span className="text-xs font-bold text-[#091426]">
                          14-Day Full Capability Enterprise Sandbox
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-[#4b41e1] bg-[#e2dfff] px-2 py-0.5 rounded font-bold">
                        NO CARD REQUIRED
                      </span>
                    </div>

                    <form className="space-y-6" onSubmit={handleSignUpSubmit}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-[#091426]">Institute / Academy Name</label>
                          <input
                            className="w-full bg-[#eff4ff] border border-[#e5eeff] rounded-lg px-3 py-2 text-xs text-[#091426] focus:bg-white focus:outline-none focus:border-[#4b41e1]"
                            placeholder="e.g. Apex Tech Institute"
                            value={academyName}
                            onChange={(e) => handleAcademyNameChange(e.target.value)}
                            required
                            type="text"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-[#091426]">Desired Workspace Pod</label>
                          <div className="flex items-center bg-[#eff4ff] border border-[#e5eeff] rounded-lg p-0.5 focus-within:bg-white">
                            <input
                              className="w-full bg-transparent px-2.5 py-1.5 font-mono text-xs text-[#091426] focus:outline-none"
                              placeholder="apextech"
                              value={desiredSubdomain}
                              onChange={(e) => setDesiredSubdomain(e.target.value)}
                              required
                              type="text"
                            />
                            <span className="text-[#45474c] font-mono text-xs pr-2 select-none">.edupulse.ai</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-[#091426]">Administrator Legal Name</label>
                          <input
                            className="w-full bg-[#eff4ff] border border-[#e5eeff] rounded-lg px-3 py-2 text-xs text-[#091426] focus:bg-white focus:outline-none focus:border-[#4b41e1]"
                            placeholder="Dr. Rajesh Mehra"
                            value={adminName}
                            onChange={(e) => setAdminName(e.target.value)}
                            required
                            type="text"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-[#091426]">Clearance Tier</label>
                          <select
                            value={adminTier}
                            onChange={(e) => setAdminTier(e.target.value)}
                            className="w-full bg-[#eff4ff] border border-[#e5eeff] rounded-lg px-3 py-2 text-xs text-[#091426] focus:bg-white focus:outline-none focus:border-[#4b41e1]"
                          >
                            <option value="director">Director / Managing Trustee (Level 0)</option>
                            <option value="dean">Academic Dean / Vice Chancellor</option>
                            <option value="coo">Chief Operations Officer</option>
                            <option value="head_trainer">Lead Trainer Coordinator</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-[#091426]">Enterprise Work Email</label>
                          <input
                            className="w-full bg-[#eff4ff] border border-[#e5eeff] rounded-lg px-3 py-2 text-xs text-[#091426] focus:bg-white focus:outline-none focus:border-[#4b41e1]"
                            placeholder="dean@apextech.ac.in"
                            value={adminEmail}
                            onChange={(e) => setAdminEmail(e.target.value)}
                            required
                            type="email"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-[#091426]">Emergency Phone</label>
                            <span className="inline-flex items-center gap-1 text-[10px] text-[#00a472] font-semibold">
                              <MessageSquare className="w-3 h-3" /> WhatsApp 2FA
                            </span>
                          </div>
                          <input
                            className="w-full bg-[#eff4ff] border border-[#e5eeff] rounded-lg px-3 py-2 text-xs text-[#091426] focus:bg-white focus:outline-none focus:border-[#4b41e1]"
                            placeholder="+91 98450 12345"
                            value={adminPhone}
                            onChange={(e) => setAdminPhone(e.target.value)}
                            required
                            type="tel"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#091426]">Administrator Password</label>
                        <input
                          className="w-full bg-[#eff4ff] border border-[#e5eeff] rounded-lg px-3 py-2 font-mono text-xs text-[#091426] focus:bg-white focus:outline-none focus:border-[#4b41e1]"
                          type="password"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          placeholder="Create a secure password"
                          minLength={8}
                          required
                        />
                      </div>

                      {/* Scale Tier Radio Cards */}
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-[#091426]">
                          Operational Scale Tier (Simultaneous Active Students)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {[
                            { id: 'tier1', range: '1 - 500', desc: 'Single Campus / 10 Labs' },
                            { id: 'tier2', range: '500 - 3,500', desc: 'Multi-Branch Hub' },
                            { id: 'tier3', range: '3,500+', desc: 'Autonomous Sovereign' }
                          ].map((t) => (
                            <label
                              key={t.id}
                              className={`flex flex-col p-2.5 rounded-lg border cursor-pointer transition-all ${
                                scaleTier === t.id
                                  ? 'bg-[#e5eeff] border-[#4b41e1] shadow-sm'
                                  : 'bg-[#eff4ff] border-transparent hover:bg-[#e5eeff]'
                              }`}
                            >
                              <input
                                type="radio"
                                name="scale_tier"
                                value={t.id}
                                checked={scaleTier === t.id}
                                onChange={() => setScaleTier(t.id)}
                                className="sr-only"
                              />
                              <span className="font-bold text-sm text-[#091426]">{t.range}</span>
                              <span className="text-[11px] text-[#45474c] mt-0.5">{t.desc}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Security Attestation */}
                      <div className="p-4 rounded-2xl bg-[#f5f7ff] border border-[#e1e7f5]">
                        <label className="flex items-start gap-2.5 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={attestation}
                            onChange={(e) => setAttestation(e.target.checked)}
                            required
                            className="mt-0.5 w-4 h-4 rounded text-[#4b41e1] accent-[#4b41e1] cursor-pointer"
                          />
                          <span className="text-xs text-[#091426] leading-relaxed">
                            I attest authority to bind this institution. All queries execute strictly through the{' '}
                            <strong>Zero-Mutation AST Sandbox</strong> with DPDP & FERPA data anonymization enforced.
                          </span>
                        </label>
                      </div>

                      {/* Provision Submit */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#4b41e1] text-white hover:bg-[#645efb] transition-all shadow-lg shadow-indigo-200/50 text-sm font-bold group disabled:opacity-75 cursor-pointer"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                            <span>Configuring Workspace Pod...</span>
                          </>
                        ) : (
                          <>
                            <Rocket className="w-4 h-4 text-white" />
                            <span>Provision 14-Day Pilot Academy Workspace</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                )}

                {/* Live Dynamic Status Toast */}
                {statusToast.show && (
                  <div className="mt-4 p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-[#091426]">
                      {statusToast.isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin text-[#4b41e1]" />
                      ) : statusToast.isSuccess ? (
                        <CheckCircle className="w-4 h-4 text-[#00a472]" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-[#ba1a1a]" />
                      )}
                      <span>{statusToast.message}</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#45474c]">TLS 1.3</span>
                  </div>
                )}
              </div>

              {/* Compliance Trust Micro-Bar */}
              <div className="hidden">
                {[
                  { icon: ShieldCheck, title: 'SOC-2 Type II', sub: 'Continuous Audit' },
                  { icon: EyeOff, title: 'Fee Blindness', sub: 'Trainer Partition' },
                  { icon: Terminal, title: 'Dedicated Pods', sub: 'Zero Multi-Tenancy' },
                  { icon: Sparkles, title: '1.4s Dispatch', sub: 'Conflict Solver' }
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-2 p-3 bg-white rounded-xl shadow-sm border border-[#e5eeff]">
                      <Icon className="w-4 h-4 text-[#4b41e1] shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-[#091426] leading-tight">{item.title}</span>
                        <span className="font-mono text-[10px] text-[#45474c]">{item.sub}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Institutional security showcase is intentionally omitted from the focused auth screen. */}
            <div className="hidden">
              {/* Operations Stat Ticker */}
              <div className="bg-[#091426] text-white rounded-2xl p-4 shadow-md flex items-center justify-between border border-[#1e293b]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3] animate-ping"></span>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#bcc7de] font-bold">
                    Live Academic Operations Network
                  </span>
                </div>
                <span className="font-mono text-xs text-[#4edea3] bg-[#1e293b] px-2 py-0.5 rounded font-bold">
                  99.8% SYNC
                </span>
              </div>

              {/* Metric Pulse Bento Grid */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e5eeff] flex flex-col">
                  <span className="font-mono text-[10px] font-bold text-[#45474c]">INSTITUTES</span>
                  <span className="font-extrabold text-2xl text-[#091426] mt-0.5">120+</span>
                  <span className="text-[10px] text-[#00a472] font-semibold mt-1">Multi-campus hubs</span>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e5eeff] flex flex-col">
                  <span className="font-mono text-[10px] font-bold text-[#45474c]">ENROLLED</span>
                  <span className="font-extrabold text-2xl text-[#4b41e1] mt-0.5">45.2k</span>
                  <span className="text-[10px] text-[#45474c] font-semibold mt-1">Students tracked</span>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e5eeff] flex flex-col">
                  <span className="font-mono text-[10px] font-bold text-[#45474c]">SPEED</span>
                  <span className="font-extrabold text-2xl text-[#00a472] mt-0.5">1.4s</span>
                  <span className="text-[10px] text-[#45474c] font-semibold mt-1">Avg clash repair</span>
                </div>
              </div>

              {/* Flagship Testimonial Card */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-[#e5eeff] space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#4b41e1]" />
                    <span className="text-xs font-bold text-[#091426]">Flagship Implementation</span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-[#45474c] bg-[#eff4ff] px-2 py-0.5 rounded">
                    CASE STUDY #84
                  </span>
                </div>

                <blockquote className="text-sm text-[#091426] italic leading-relaxed">
                  “Before Coach Sphere, a trainer calling sick on Monday morning caused hours of timetable panic. Now, our operations platform helps teams coordinate schedules without human stress.”
                </blockquote>

                <div className="flex items-center gap-3 pt-2 border-t border-[#f0f4ff]">
                  <div className="w-10 h-10 rounded-full bg-[#e2dfff] flex items-center justify-center font-bold text-[#4b41e1] text-xs shrink-0">
                    AS
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-xs text-[#091426]">Ananya Sharma</span>
                    <span className="text-[11px] text-[#45474c]">Operations Director, Coach Sphere</span>
                    <span className="font-mono text-[10px] text-[#4b41e1] font-semibold">8 Campuses • 4,200 Active Trainees</span>
                  </div>
                </div>
              </div>

              {/* Three Pillars of Security */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-[#e5eeff] space-y-3">
                <h3 className="font-bold text-sm text-[#091426] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#4b41e1]" />
                  Zero-Trust Academic Governance
                </h3>

                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#eff4ff]">
                    <div className="p-1.5 rounded-lg bg-white text-[#4b41e1] shadow-sm shrink-0">
                      <EyeOff className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#091426]">Role-Based Fee Blindness</span>
                      <span className="text-[11px] text-[#45474c] leading-relaxed mt-0.5">
                        Trainers and coordinators cannot view fee collection tables, EMI default states, or bursar ledgers.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#eff4ff]">
                    <div className="p-1.5 rounded-lg bg-white text-[#00a472] shadow-sm shrink-0">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#091426]">Zero-Mutation AST SQL Sandbox</span>
                      <span className="text-[11px] text-[#45474c] leading-relaxed mt-0.5">
                        AI suggestions compile into read-only AST parse trees. System tables can never be mutated by prompts.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#eff4ff]">
                    <div className="p-1.5 rounded-lg bg-white text-[#ba1a1a] shadow-sm shrink-0">
                      <Radio className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#091426]">1-Click WhatsApp Gatekeeper</span>
                      <span className="text-[11px] text-[#45474c] leading-relaxed mt-0.5">
                        Batch cancellations or faculty changes require instant two-way SMS/WhatsApp approval from the head.
                      </span>
                    </div>
                  </div>
                </div>

                {/* AST Live Trace */}
                <div className="rounded-xl bg-[#091426] text-white p-3 space-y-1 font-mono text-[11px] border border-[#1e293b]">
                  <div className="flex items-center justify-between text-[#8590a6]">
                    <span>AST_INSPECT_PARSER // LIVE TRACE</span>
                    <span className="text-[#4edea3] font-bold">SAFE (READ_ONLY)</span>
                  </div>
                  <p className="text-[#c3c0ff] truncate font-mono text-xs">
                    SELECT batch_id, room_code, trainer_id FROM timetable WHERE day = CURRENT_DATE
                  </p>
                  <div className="flex items-center justify-between pt-1 text-[#8590a6] text-[10px]">
                    <span>Cost: 0.002ms</span>
                    <span>Sanitization: 100% Deterministic</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* 3. FOOTER */}
      <footer className="w-full bg-white border-t border-[#e5eeff]">
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#45474c]">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 bg-[#eff4ff] px-2.5 py-1 rounded text-[#00a472] font-semibold">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>ISO 27001</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#eff4ff] px-2.5 py-1 rounded font-semibold text-[#091426]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DPDP Compliant</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#eff4ff] px-2.5 py-1 rounded font-semibold text-[#091426]">
              <Lock className="w-3.5 h-3.5" />
              <span>Encrypted Sovereign Engine</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span>© 2026 Coach Sphere. All rights reserved.</span>
            <a href="#whitepaper" className="hover:text-[#091426] transition-colors">Security Whitepaper</a>
            <a href="#privacy" className="hover:text-[#091426] transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-[#091426] transition-colors">Terms of Operation</a>
          </div>
        </div>
      </footer>
    </div>
  );
}