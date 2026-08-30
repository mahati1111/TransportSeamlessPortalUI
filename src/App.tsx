import { useState } from "react";
import { Role, Screen, ScenarioState } from "./types";
import Shell from "./components/Shell";

// Faculty screens
import FacultyDashboard from "./screens/faculty/FacultyDashboard";
import CreateVisit from "./screens/faculty/CreateVisit";
import VisitOverview from "./screens/faculty/VisitOverview";
import TransportDetails from "./screens/faculty/TransportDetails";
import LiveTrip from "./screens/faculty/LiveTrip";
import Amenities from "./screens/faculty/Amenities";
import ReturnTransport from "./screens/faculty/ReturnTransport";
import Emergency from "./screens/faculty/Emergency";
import Reimbursement from "./screens/faculty/Reimbursement";

// Admin screens
import CommandCenter from "./screens/admin/CommandCenter";
import FacultyRequests from "./screens/admin/FacultyRequests";
import PlanSchedule from "./screens/admin/PlanSchedule";
import FleetDrivers from "./screens/admin/FleetDrivers";
import LiveOperations from "./screens/admin/LiveOperations";
import InterventionCenter from "./screens/admin/InterventionCenter";
import AlternativePlans from "./screens/admin/AlternativePlans";
import AmenitiesMgmt from "./screens/admin/AmenitiesMgmt";
import ReimbursementReview from "./screens/admin/ReimbursementReview";

// Driver screens
import DriverDashboard from "./screens/driver/DriverDashboard";
import TodaysRoute from "./screens/driver/TodaysRoute";
import Navigation from "./screens/driver/Navigation";
import PickupStatus from "./screens/driver/PickupStatus";
import ReportIssue from "./screens/driver/ReportIssue";
import UpdatedRoute from "./screens/driver/UpdatedRoute";

const DEFAULT_SCREEN: Record<Role, Screen> = {
  faculty: "F01",
  admin: "A01",
  driver: "D01",
};

const NOTIF_COUNT: Record<Role, number> = {
  faculty: 1,
  admin: 2,
  driver: 1,
};

export default function App() {
  const [role, setRole] = useState<Role | null>(null);
  const [screen, setScreen] = useState<Screen>("LOGIN");
  const [loginStep, setLoginStep] = useState<"role" | "credentials">("role");
  const [loginRole, setLoginRole] = useState<Role | null>(null);
  const [scenario, setScenarioState] = useState<ScenarioState>({
    tripDisrupted: false,
    alternativeApproved: false,
    tripStarted: false,
    visitSubmitted: false,
    reimbursementAmount: 720,
  });

  const setScenario = (partial: Partial<ScenarioState>) => {
    setScenarioState(prev => ({ ...prev, ...partial }));
  };

  const navigate = (s: Screen) => setScreen(s);

  const handleRoleSelect = (r: Role) => {
    setLoginRole(r);
    setLoginStep("credentials");
  };

  const handleLogin = () => {
    if (!loginRole) return;
    setRole(loginRole);
    setScreen(DEFAULT_SCREEN[loginRole]);
  };

  const handleLogout = () => {
    setRole(null);
    setScreen("LOGIN");
    setLoginStep("role");
    setLoginRole(null);
    setScenarioState({
      tripDisrupted: false,
      alternativeApproved: false,
      tripStarted: false,
      visitSubmitted: false,
      reimbursementAmount: 720,
    });
  };

  // LOGIN SCREEN
  if (!role || screen === "LOGIN") {
    return (
      <div
        className="h-full flex items-center justify-center relative"
        style={{
          background: "linear-gradient(135deg, #1C0F4A 0%, #2D1B69 40%, #6B21A8 100%)",
        }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Campus image overlay effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C0F4A] via-[#1C0F4A]/60 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-sm mx-4">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center border border-white/30">
              <span className="text-white font-jakarta font-black text-xl">M</span>
            </div>
            <div>
              <div className="font-jakarta font-bold text-white text-lg">MIT-ADT University</div>
              <div className="text-violet-300 text-xs tracking-widest">Art, Design &amp; Technology</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-7">
            {loginStep === "role" ? (
              <>
                <h2 className="font-jakarta font-bold text-gray-900 text-2xl mb-1.5">Welcome to MIT ADT</h2>
                <p className="text-gray-500 text-sm mb-6">Sign in with your institutional credentials</p>
                <div className="space-y-3">
                  {[
                    { role: "admin" as const, label: "Login as Admin", icon: "🏛", desc: "Transport Head · Control Tower" },
                    { role: "faculty" as const, label: "Login as In-house / Guest Faculty", icon: "🎓", desc: "Teaching Staff · Visiting Faculty" },
                    { role: "driver" as const, label: "Login as Driver", icon: "🚐", desc: "Vehicle Operator · MIT ADT Fleet" },
                  ].map(opt => (
                    <button key={opt.role} onClick={() => handleRoleSelect(opt.role)}
                      className="w-full bg-[#1C0F4A] hover:bg-[#2D1B69] text-white py-3.5 px-4 rounded-xl font-semibold text-sm transition-all flex items-center gap-3">
                      <span className="text-lg">{opt.icon}</span>
                      <div className="text-left">
                        <div>{opt.label}</div>
                        <div className="text-violet-300 text-xs font-normal">{opt.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mt-5 text-center">
                  <button className="text-xs text-violet-600 hover:text-violet-700 font-semibold">Need help? Contact Administration</button>
                </div>
              </>
            ) : (
              <>
                <button onClick={() => setLoginStep("role")} className="text-xs text-gray-400 hover:text-gray-600 mb-4 flex items-center gap-1">
                  ← Back
                </button>
                <h2 className="font-jakarta font-bold text-gray-900 text-xl mb-1.5">Welcome to MIT ADT</h2>
                <p className="text-gray-500 text-sm mb-5">Sign in with your institutional credentials</p>
                <div className="space-y-3 mb-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Enter Email</label>
                    <input
                      type="email"
                      defaultValue={loginRole === "faculty" ? "anjali.kulkarni@mitadt.edu.in" : loginRole === "admin" ? "priya.sharma@mitadt.edu.in" : "ramesh.pawar@mitadt.edu.in"}
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Password</label>
                    <input
                      type="password"
                      defaultValue="••••••••"
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-xs text-gray-500">
                      <input type="checkbox" defaultChecked className="rounded" /> Remember me
                    </label>
                    <button className="text-xs text-violet-600 font-semibold hover:text-violet-700">Forgot password?</button>
                  </div>
                </div>
                <button onClick={handleLogin}
                  className="w-full bg-[#1C0F4A] hover:bg-[#2D1B69] text-white py-3 rounded-xl font-jakarta font-bold text-base transition-colors">
                  Sign in to Portal
                </button>
                <div className="mt-4 text-center">
                  <button className="text-xs text-violet-600 hover:text-violet-700 font-semibold">Need help? Contact Administration</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Render content for current screen
  const renderContent = () => {
    if (role === "faculty") {
      switch (screen) {
        case "F01": return <FacultyDashboard navigate={navigate} scenario={scenario} />;
        case "F02": return <CreateVisit navigate={navigate} setScenario={setScenario} />;
        case "F03": return <VisitOverview navigate={navigate} scenario={scenario} />;
        case "F04": return <TransportDetails navigate={navigate} scenario={scenario} />;
        case "F05": return <LiveTrip navigate={navigate} scenario={scenario} setScenario={setScenario} />;
        case "F06": return <Amenities navigate={navigate} />;
        case "F07": return <ReturnTransport navigate={navigate} />;
        case "F08": return <Emergency navigate={navigate} />;
        case "F09": return <Reimbursement navigate={navigate} scenario={scenario} />;
        default: return <FacultyDashboard navigate={navigate} scenario={scenario} />;
      }
    }

    if (role === "admin") {
      switch (screen) {
        case "A01": return <CommandCenter navigate={navigate} scenario={scenario} />;
        case "A02": return <FacultyRequests navigate={navigate} />;
        case "A03": return <PlanSchedule navigate={navigate} />;
        case "A04": return <FleetDrivers navigate={navigate} />;
        case "A05": return <LiveOperations navigate={navigate} scenario={scenario} />;
        case "A06": return <InterventionCenter navigate={navigate} scenario={scenario} setScenario={setScenario} />;
        case "A07": return <AlternativePlans navigate={navigate} scenario={scenario} setScenario={setScenario} />;
        case "A08": return <AmenitiesMgmt navigate={navigate} />;
        case "A09": return <ReimbursementReview navigate={navigate} />;
        default: return <CommandCenter navigate={navigate} scenario={scenario} />;
      }
    }

    if (role === "driver") {
      switch (screen) {
        case "D01": return <DriverDashboard navigate={navigate} scenario={scenario} />;
        case "D02": return <TodaysRoute navigate={navigate} scenario={scenario} setScenario={setScenario} />;
        case "D03": return <Navigation navigate={navigate} scenario={scenario} setScenario={setScenario} />;
        case "D04": return <PickupStatus navigate={navigate} />;
        case "D05": return <ReportIssue navigate={navigate} setScenario={setScenario} />;
        case "D06": return <UpdatedRoute navigate={navigate} scenario={scenario} setScenario={setScenario} />;
        default: return <DriverDashboard navigate={navigate} scenario={scenario} />;
      }
    }

    return null;
  };

  return (
    <Shell role={role} currentScreen={screen} navigate={navigate} notifCount={NOTIF_COUNT[role]}>
      {renderContent()}
    </Shell>
  );
}
