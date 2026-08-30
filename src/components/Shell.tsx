import { ReactNode, useState } from "react";
import { Role, Screen } from "../types";

interface NavItem {
  id: Screen;
  label: string;
  icon: ReactNode;
}

interface Props {
  role: Role;
  currentScreen: Screen;
  navigate: (s: Screen) => void;
  children: ReactNode;
  notifCount?: number;
}

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

const facultyNav: NavItem[] = [
  { id: "F01", label: "Overview", icon: <span>⊞</span> },
  { id: "F03", label: "My Visit", icon: <span>📋</span> },
  { id: "F04", label: "Transport", icon: <span>🚐</span> },
  { id: "F06", label: "Amenities", icon: <span>🏠</span> },
  { id: "F09", label: "Reimbursement", icon: <span>💳</span> },
];

const adminNav: NavItem[] = [
  { id: "A01", label: "Command Center", icon: <span>⊞</span> },
  { id: "A02", label: "Faculty Requests", icon: <span>👥</span> },
  { id: "A03", label: "Plan & Schedule", icon: <span>📅</span> },
  { id: "A04", label: "Fleet & Drivers", icon: <span>🚐</span> },
  { id: "A05", label: "Live Operations", icon: <span>📡</span> },
  { id: "A06", label: "Interventions", icon: <span>⚡</span> },
  { id: "A08", label: "Amenities", icon: <span>🏠</span> },
  { id: "A09", label: "Reimbursements", icon: <span>💳</span> },
];

const driverNav: NavItem[] = [
  { id: "D01", label: "Dashboard", icon: <span>⊞</span> },
  { id: "D02", label: "Today's Route", icon: <span>🗺</span> },
  { id: "D03", label: "Navigation", icon: <span>📍</span> },
  { id: "D05", label: "Issues", icon: <span>⚠️</span> },
];

const roleLabels: Record<Role, string> = {
  faculty: "GUEST FACULTY",
  admin: "TRANSPORT ADMIN",
  driver: "DRIVER",
};

const roleNames: Record<Role, string> = {
  faculty: "Dr. Anjali Kulkarni",
  admin: "Priya Sharma",
  driver: "Ramesh Pawar",
};

export default function Shell({ role, currentScreen, navigate, children, notifCount = 1 }: Props) {
  const [notifOpen, setNotifOpen] = useState(false);
  const nav = role === "faculty" ? facultyNav : role === "admin" ? adminNav : driverNav;

  const notifications = role === "faculty"
    ? [{ id: 1, type: "success", msg: "Transport confirmed. Pickup at 8:10 AM from Hinjewadi.", time: "08:05", screen: "F04" as Screen }]
    : role === "admin"
    ? [{ id: 1, type: "intervention", msg: "Alternative vehicle identified for Trip #104.", time: "08:19", screen: "A06" as Screen },
       { id: 2, type: "attention", msg: "Dr. Anjali Kulkarni's trip may miss lecture deadline.", time: "08:18", screen: "A06" as Screen }]
    : [{ id: 1, type: "info", msg: "New route assigned for 8:10 AM.", time: "08:00", screen: "D02" as Screen }];

  const notifColors: Record<string, string> = {
    success: "bg-emerald-50 border-emerald-200 text-emerald-700",
    intervention: "bg-violet-50 border-violet-200 text-violet-700",
    attention: "bg-amber-50 border-amber-200 text-amber-700",
    info: "bg-blue-50 border-blue-200 text-blue-700",
  };

  if (role === "driver") {
    return (
      <div className="flex flex-col h-full bg-gray-50" style={{ maxWidth: 430, margin: "0 auto" }}>
        {/* Driver mobile header */}
        <header className="bg-[#1C0F4A] text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
              <span className="text-white font-jakarta font-bold text-xs">M</span>
            </div>
            <div>
              <div className="font-jakarta font-bold text-sm">MIT ADT</div>
              <div className="text-violet-300 text-xs">SMART TRANSPORT</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative text-white/70 hover:text-white" onClick={() => setNotifOpen(!notifOpen)}>
              <BellIcon />
              {notifCount > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full" />}
            </button>
            <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">RP</span>
            </div>
          </div>
        </header>
        {notifOpen && (
          <div className="absolute top-14 right-4 z-40 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <span className="font-jakarta font-bold text-sm text-gray-900">Notifications</span>
              <button onClick={() => setNotifOpen(false)} className="text-gray-400 hover:text-gray-600 text-xs">✕</button>
            </div>
            {notifications.map(n => (
              <button key={n.id} onClick={() => { navigate(n.screen); setNotifOpen(false); }}
                className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 ${notifColors[n.type]}`}>
                <div className="text-xs font-semibold">{n.time}</div>
                <div className="text-sm mt-0.5">{n.msg}</div>
              </button>
            ))}
          </div>
        )}
        <main className="flex-1 overflow-y-auto">{children}</main>
        <nav className="bg-white border-t border-gray-200 flex">
          {nav.map(item => {
            const active = currentScreen === item.id;
            return (
              <button key={item.id} onClick={() => navigate(item.id)}
                className={`flex-1 flex flex-col items-center py-2 gap-0.5 text-xs font-medium transition-colors ${active ? "text-violet-700" : "text-gray-400 hover:text-gray-600"}`}>
                <span className="text-lg leading-none">{item.icon}</span>
                <span className="text-[10px]">{item.label}</span>
                {active && <span className="w-1 h-1 rounded-full bg-violet-600" />}
              </button>
            );
          })}
        </nav>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-[#F8F7FF]">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-[#1C0F4A] flex flex-col">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-jakarta font-bold text-sm">M</span>
            </div>
            <div>
              <div className="font-jakarta font-bold text-white text-sm leading-tight">MIT-ADT</div>
              <div className="text-violet-400 text-[10px] tracking-widest uppercase leading-tight">Smart Transport</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="text-violet-500 text-[10px] tracking-widest uppercase font-semibold px-3 mb-2">Navigate</div>
          <div className="space-y-0.5">
            {nav.map(item => {
              const active = currentScreen === item.id;
              return (
                <button key={item.id} onClick={() => navigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-left ${
                    active
                      ? "bg-amber-400 text-gray-900"
                      : "text-violet-200 hover:bg-white/10 hover:text-white"
                  }`}>
                  <span className="text-base leading-none">{item.icon}</span>
                  <span className="font-open">{item.label}</span>
                  {active && item.id === "A06" && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {role === "faculty" && (
            <>
              <div className="text-violet-500 text-[10px] tracking-widest uppercase font-semibold px-3 mb-2 mt-5">Workspace</div>
              <div className="space-y-0.5">
                {[
                  { id: "F02" as Screen, label: "New Visit" },
                  { id: "F07" as Screen, label: "Return Transport" },
                  { id: "F08" as Screen, label: "Emergency" },
                ].map(item => (
                  <button key={item.id} onClick={() => navigate(item.id)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-violet-300 hover:bg-white/10 hover:text-white transition-all text-left">
                    <span className="text-base leading-none">→</span>
                    <span className="font-open">{item.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </nav>

        {/* User card */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">
                {role === "faculty" ? "AK" : role === "admin" ? "PS" : "RP"}
              </span>
            </div>
            <div className="min-w-0">
              <div className="text-white text-xs font-semibold truncate">{roleNames[role]}</div>
              <div className="text-violet-400 text-[10px] tracking-wider uppercase">{roleLabels[role]}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2 text-sm text-gray-400 tracking-widest uppercase font-semibold">
            <span>CAMPUS MOBILITY</span>
            <span>/</span>
            <span>2026</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setNotifOpen(!notifOpen)}
                className="relative text-gray-500 hover:text-gray-700 transition-colors">
                <BellIcon />
                {notifCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center text-[9px] font-bold text-white">
                    {notifCount}
                  </span>
                )}
              </button>
              {notifOpen && (
                <div className="absolute top-8 right-0 z-50 w-88 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden" style={{ width: 340 }}>
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <span className="font-jakarta font-bold text-sm text-gray-900">Notifications</span>
                    <button onClick={() => setNotifOpen(false)} className="text-gray-400 hover:text-gray-600 text-xs">✕</button>
                  </div>
                  {notifications.map(n => (
                    <button key={n.id} onClick={() => { navigate(n.screen); setNotifOpen(false); }}
                      className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 border-l-4 ${notifColors[n.type]}`}>
                      <div className="text-xs font-semibold opacity-70">{n.time}</div>
                      <div className="text-sm mt-0.5">{n.msg}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
                <span className="text-violet-700 text-xs font-bold">
                  {role === "faculty" ? "AK" : role === "admin" ? "PS" : "RP"}
                </span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">{roleNames[role]}</div>
                <div className="text-[10px] tracking-widest uppercase text-gray-400">{roleLabels[role]}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
