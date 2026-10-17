import React, { useState } from 'react';
import {
  Lock,
  Building2,
  Mail,
  Key,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Check,
  Sparkles,
  Rocket,
  ShieldAlert,
  Terminal,
  Radio,
  FileCheck,
  MessageSquare,
  Globe,
  User,
  ExternalLink,
  Loader2
} from 'lucide-react';

export default function Auth({ onLoginSuccess, onNavigateToLanding }) {
  // Mode: 'signin' | 'signup'
  const [authMode, setAuthMode] = useState('signin');

  // Role preset in sign-in: 'director' | 'counselor' | 'trainer' | 'bursar'
  const [activeRole, setActiveRole] = useState('trainer');

  // Form states
  const [tenantDomain, setTenantDomain] = useState('techsummit');
  const [workEmail, setWorkEmail] = useState('ananya.sharma@techsummittrainers.com');
  const [password, setPassword] = useState('PrecisionAST#2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [hardwareBound, setHardwareBound] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Sign up fields
  const [academyName, setAcademyName] = useState('');
  const [desiredSubdomain, setDesiredSubdomain] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminTier, setAdminTier] = useState('director');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [scaleTier, setScaleTier] = useState('tier1');
  const [attestation, setAttestation] = useState(false);

  // Status feedback toast
  const [statusToast, setStatusToast] = useState({ show: false, message: '', isSuccess: false });
  const [isLoading, setIsLoading] = useState(false);

  // Role presets info
  const rolePresets = {
    director: {
      email: 'ananya.sharma@techsummittrainers.com',
      indicator: 'Role: Full Executive Sovereignty',
      disclaimer: 'Executive level: Full oversight across batch allocations, financial ledgers, and human override controls.'
    },
    student: {
      email: 'vikram.counselor@techsummittrainers.com',
      indicator: 'Role: Retention & Student CRM (Ledger Blind)',
      disclaimer: 'Counselor sandbox: Access to student attendance and risk scoring. Zero access to trainer compensation rates.'
    },
    trainer: {
      email: 'sarah.trainer@techsummittrainers.com',
      indicator: 'Role: Trainer (Fee details masked at driver level)',
      disclaimer: 'Faculty sandbox: Strict fee-blindness enforced at database query layer. Lab schedule and roster view only.'
    }
  };

  const handleRoleSelect = (roleKey) => {
    setActiveRole(roleKey);
    setWorkEmail(rolePresets[roleKey].email);
  };

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

  const showToast = (message, isSuccess = false) => {
    setStatusToast({ show: true, message, isSuccess });
  };

  // Sign In handler that connects to your Dashboard
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    showToast('Verifying cryptographic token & tenant isolation boundaries...', false);

    setTimeout(() => {
      showToast('Handshake complete! Redirecting to Sovereign Operations Copilot...', true);
      setTimeout(() => {
        setIsLoading(false);
        if (onLoginSuccess) {
          // Pass active role so Dashboard boots into the chosen perspective!
          onLoginSuccess(activeRole);
        }
      }, 1000);
    }, 1200);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    showToast('Provisioning zero-mutation pod & configuring 2FA WhatsApp route...', false);

    setTimeout(() => {
      showToast('Workspace created! Verification code dispatched to WhatsApp.', true);
      setTimeout(() => {
        setIsLoading(false);
        if (onLoginSuccess) {
          onLoginSuccess('director');
        }
      }, 1200);
    }, 1500);
  };

  const handleSSOLogin = (provider) => {
    showToast(`Redirecting to federated ${provider} assertion broker...`, false);
    setTimeout(() => {
      showToast(`Identity provider ${provider} validated. Logging in...`, true);
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess('director');
        }
      }, 900);
    }, 1200);
  };

  if (isLoggedIn) {
    return (
      <Dashboard
        initialRole="director"
        onNavigateToLanding={() => setIsLoggedIn(false)}
      />
    );
  }

  return (
    <div className="bg-[#f8f9ff] font-sans text-[#0b1c30] min-h-screen flex flex-col antialiased selection:bg-[#e2dfff] selection:text-[#0f0069]">
      {/* 1. TOP HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#f8f9ff]/90 backdrop-blur-xl border-b border-[#e5eeff] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 w-full px-6 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={onNavigateToLanding}
              className="flex items-center gap-2 text-left focus:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-[#091426] flex items-center justify-center text-white font-bold text-sm">
                E
              </div>
              <span className="font-bold text-lg text-[#091426] tracking-tight">
                EduPulse<span className="text-[#4b41e1]">.AI</span>
              </span>
              <span className="px-1.5 py-0.5 bg-[#1e293b] text-white text-[10px] font-mono rounded font-bold uppercase">
                OPS COPILOT
              </span>
            </button>
            <div className="hidden md:flex items-center gap-2 text-[#45474c] text-xs font-medium">
              <span className="w-1 h-1 rounded-full bg-[#c5c6cd]"></span>
              <span>Sponsored by</span>
              <span className="text-[#0b1c30] font-semibold">TechSummitTrainers</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-[#eff4ff] rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
            <span className="font-mono text-xs text-[#45474c] font-medium">
              SOC-2 Type II Certified • 256-bit AST Sandbox
            </span>
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
      <main className="w-full pt-16 flex-1 bg-[#f8f9ff]">
        <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-12 py-8 flex-1">
          {/* Top Telemetry Strip */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 bg-[#eff4ff] px-4 py-2 rounded-xl shadow-sm border border-[#e5eeff]">
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

          {/* Grid Split: Left 7 Cols (Auth Form) / Right 5 Cols (Security Proofs) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT 7 COLS: Dual-Mode Auth Workspace */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-[#e5eeff] relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#e2dfff]/40 rounded-full blur-3xl pointer-events-none"></div>

                {/* Form Header & Switcher */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded bg-[#1e293b] text-white font-mono text-[10px] font-bold">
                        GATEWAY V3.8
                      </span>
                      <span className="text-[#4b41e1] text-xs uppercase tracking-wider font-bold">
                        Institutional Access
                      </span>
                    </div>
                    <h2 className="font-bold text-2xl text-[#091426] tracking-tight">
                      {authMode === 'signin' ? 'Enterprise Console Access' : 'Provision Institute Workspace'}
                    </h2>
                  </div>

                  {/* Silky Mode Switcher */}
                  <div className="inline-flex p-1 bg-[#e5eeff] rounded-lg relative self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setAuthMode('signin')}
                      className={`relative z-10 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        authMode === 'signin'
                          ? 'bg-white text-[#091426] shadow-sm'
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
                          ? 'bg-white text-[#091426] shadow-sm'
                          : 'text-[#45474c] hover:text-[#0b1c30]'
                      }`}
                    >
                      Create Academy
                    </button>
                  </div>
                </div>

                {/* MODE 1: SIGN IN */}
                {authMode === 'signin' ? (
                  <div className="flex flex-col space-y-4">
                    {/* Role Presets */}
                    <div className="bg-[#eff4ff] rounded-xl p-3.5 space-y-2 border border-[#e5eeff]">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-[#45474c] text-xs font-bold flex items-center gap-1.5">
                          <ShieldAlert className="w-3.5 h-3.5 text-[#4b41e1]" />
                          Quick Role Security Context Preset:
                        </span>
                        <span className="font-mono text-[11px] text-[#00a472] bg-white px-2 py-0.5 rounded shadow-sm font-semibold">
                          {rolePresets[activeRole].indicator}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { key: 'director', label: 'Director / Head' },
                          { key: 'student', label: 'Student / Educator' },
                          { key: 'trainer', label: 'Faculty Trainer' }
                        ].map((r) => (
                          <button
                            key={r.key}
                            type="button"
                            onClick={() => handleRoleSelect(r.key)}
                            className={`px-2.5 py-2 rounded-lg text-xs text-left transition-all flex items-center justify-between ${
                              activeRole === r.key
                                ? 'bg-white text-[#091426] shadow-sm font-bold border border-[#e5eeff]'
                                : 'bg-[#e5eeff] text-[#45474c] hover:bg-[#dce9ff]'
                            }`}
                          >
                            <span className="truncate">{r.label}</span>
                            {activeRole === r.key && <Check className="w-3.5 h-3.5 text-[#4b41e1]" />}
                          </button>
                        ))}
                      </div>

                      <p className="text-[#45474c] text-xs pt-1 leading-relaxed">
                        {rolePresets[activeRole].disclaimer}
                      </p>
                    </div>

                    <form className="space-y-4 pt-1" onSubmit={handleSignInSubmit}>
                      {/* Tenant Domain */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-[#091426] flex items-center gap-1">
                            Academy Tenant Domain
                            <span className="text-[#ba1a1a]">*</span>
                          </label>
                          <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#00a472] bg-[#e5eeff] px-2 py-0.5 rounded">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00a472]"></span>
                            Verified: TechSummitTrainers
                          </span>
                        </div>
                        <div className="flex items-center bg-[#eff4ff] rounded-lg p-1 border border-[#e5eeff] focus-within:bg-white focus-within:shadow-sm focus-within:border-[#4b41e1] transition-all">
                          <Building2 className="w-4 h-4 text-[#45474c] ml-2 mr-1 shrink-0" />
                          <input
                            className="w-full bg-transparent px-2 py-1.5 font-mono text-xs text-[#091426] placeholder:text-[#75777d] focus:outline-none"
                            type="text"
                            value={tenantDomain}
                            onChange={(e) => setTenantDomain(e.target.value)}
                            placeholder="institution-subdomain"
                            required
                          />
                          <span className="px-2 py-1 font-mono text-xs text-[#45474c] bg-[#e5eeff] rounded select-none mr-1">
                            .edupulse.ai
                          </span>
                        </div>
                      </div>

                      {/* Work Email */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-[#091426]">Institutional Work Email</label>
                          <div className="flex items-center gap-1">
                            <span className="text-[#45474c] text-[10px] uppercase font-bold">Quick-fill:</span>
                            <button
                              type="button"
                              onClick={() => handleDomainQuickFill('@techsummittrainers.com')}
                              className="px-1.5 py-0.5 rounded bg-[#e5eeff] text-[#091426] font-mono text-[10px] hover:bg-[#dce9ff] transition-colors"
                            >
                              @techsummittrainers.com
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDomainQuickFill('@academy.edu')}
                              className="px-1.5 py-0.5 rounded bg-[#e5eeff] text-[#091426] font-mono text-[10px] hover:bg-[#dce9ff] transition-colors"
                            >
                              @academy.edu
                            </button>
                          </div>
                        </div>
                        <div className="relative flex items-center">
                          <Mail className="w-4 h-4 text-[#45474c] absolute left-3 pointer-events-none" />
                          <input
                            className="w-full bg-[#eff4ff] border border-[#e5eeff] rounded-lg pl-9 pr-3 py-2 text-xs text-[#091426] focus:bg-white focus:shadow-sm focus:border-[#4b41e1] focus:outline-none transition-all placeholder:text-[#75777d]"
                            type="email"
                            value={workEmail}
                            onChange={(e) => setWorkEmail(e.target.value)}
                            placeholder="name@organization.edu"
                            required
                          />
                        </div>
                      </div>

                      {/* Password */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-[#091426]">Master Passphrase / Token</label>
                          <a href="#reset" className="text-[#4b41e1] hover:underline text-xs font-semibold">
                            Reset credentials?
                          </a>
                        </div>
                        <div className="relative flex items-center">
                          <Key className="w-4 h-4 text-[#45474c] absolute left-3 pointer-events-none" />
                          <input
                            className="w-full bg-[#eff4ff] border border-[#e5eeff] rounded-lg pl-9 pr-10 py-2 font-mono text-xs text-[#091426] focus:bg-white focus:shadow-sm focus:border-[#4b41e1] focus:outline-none transition-all placeholder:text-[#75777d]"
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

                      {/* Hardware Token & SSO Ready */}
                      <div className="flex items-center justify-between py-1">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={hardwareBound}
                            onChange={(e) => setHardwareBound(e.target.checked)}
                            className="w-4 h-4 rounded text-[#4b41e1] accent-[#4b41e1] cursor-pointer"
                          />
                          <span className="text-xs text-[#091426] font-medium">
                            AST hardware-token bound session (30 Days)
                          </span>
                        </label>
                        <span className="hidden sm:inline-flex items-center gap-1 text-[#00a472] font-mono text-xs font-semibold">
                          <ShieldCheck className="w-3.5 h-3.5" /> Entra SSO Ready
                        </span>
                      </div>

                      {/* Primary Sign In Button */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#091426] text-white hover:bg-[#1e293b] transition-all shadow-md text-sm font-bold group disabled:opacity-75 cursor-pointer"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-[#4edea3]" />
                            <span>Authenticating Handshake...</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 text-[#4edea3]" />
                            <span>Sign In to Operations Copilot</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </form>

                    {/* Federated SSO */}
                    <div className="pt-2 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-[#e5eeff]"></div>
                        <span className="text-[#45474c] text-[10px] font-bold uppercase tracking-wider">
                          Federated Enterprise SSO
                        </span>
                        <div className="h-px flex-1 bg-[#e5eeff]"></div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleSSOLogin('Google Workspace')}
                          className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-[#091426] text-xs font-semibold transition-all border border-[#e5eeff]"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                          </svg>
                          <span>Google SSO</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSSOLogin('Microsoft Entra ID')}
                          className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-[#091426] text-xs font-semibold transition-all border border-[#e5eeff]"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 23 23">
                            <path d="M1 1h10v10H1z" fill="#f35325" />
                            <path d="M12 1h10v10H12z" fill="#81bc06" />
                            <path d="M1 12h10v10H1z" fill="#05a6f0" />
                            <path d="M12 12h10v10H12z" fill="#ffba08" />
                          </svg>
                          <span>Entra ID</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSSOLogin('Okta / SAML 2.0')}
                          className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-[#091426] text-xs font-semibold transition-all border border-[#e5eeff]"
                        >
                          <Key className="w-3.5 h-3.5 text-[#4b41e1]" />
                          <span>SAML / Okta</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* MODE 2: CREATE ACADEMY (SIGN UP) */
                  <div className="flex flex-col space-y-4">
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

                    <form className="space-y-4" onSubmit={handleSignUpSubmit}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
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
                        <div className="space-y-1">
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

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
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
                        <div className="space-y-1">
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

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
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
                        <div className="space-y-1">
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

                      {/* Scale Tier Radio Cards */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#091426]">
                          Operational Scale Tier (Simultaneous Active Students)
                        </label>
                        <div className="grid grid-cols-3 gap-2">
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
                      <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#e5eeff]">
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
                        //disabled={isLoading}
                        onClick={() => setIsLoggedIn(true)}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#4b41e1] text-white hover:bg-[#645efb] transition-all shadow-md text-sm font-bold group disabled:opacity-75 cursor-pointer"
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
                      {statusToast.isSuccess ? (
                        <CheckCircle className="w-4 h-4 text-[#00a472]" />
                      ) : (
                        <Loader2 className="w-4 h-4 animate-spin text-[#4b41e1]" />
                      )}
                      <span>{statusToast.message}</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#45474c]">TLS 1.3</span>
                  </div>
                )}
              </div>

              {/* Compliance Trust Micro-Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
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

            {/* RIGHT 5 COLS: Institutional Security & Proof Showcase */}
            <div className="lg:col-span-5 flex flex-col gap-4">
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
                  “Before EduPulse, a trainer calling sick on Monday morning caused 4 hours of timetable panic across labs and Zoom links. Now, our Ops Copilot simulates replacements and reschedules batches in <strong className="text-[#4b41e1]">1.4 seconds</strong> without human stress.”
                </blockquote>

                <div className="flex items-center gap-3 pt-2 border-t border-[#f0f4ff]">
                  <div className="w-10 h-10 rounded-full bg-[#e2dfff] flex items-center justify-center font-bold text-[#4b41e1] text-xs shrink-0">
                    AS
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-xs text-[#091426]">Ananya Sharma</span>
                    <span className="text-[11px] text-[#45474c]">Operations Director, TechSummitTrainers</span>
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
            <span>© 2026 EduPulse.AI Systems Inc. All rights reserved.</span>
            <a href="#whitepaper" className="hover:text-[#091426] transition-colors">Security Whitepaper</a>
            <a href="#privacy" className="hover:text-[#091426] transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-[#091426] transition-colors">Terms of Operation</a>
          </div>
        </div>
      </footer>
    </div>
  );
}