import { useState } from "react";
import { Screen, ScenarioState } from "../../types";

interface Props {
  navigate: (s: Screen) => void;
  setScenario: (s: Partial<ScenarioState>) => void;
}

const PLANNING_STEPS = [
  "Checking schedule",
  "Finding transport",
  "Checking fleet",
  "Matching existing trips",
  "Planning amenities",
  "Confirming visit",
];

export default function CreateVisit({ navigate, setScenario }: Props) {
  const [step, setStep] = useState(0); // 0=form, 1=planning, 2=done
  const [planStep, setPlanStep] = useState(0);
  const [requirements, setRequirements] = useState({
    transport: true,
    accommodation: false,
    food: true,
    returnTransport: true,
  });
  const [preference, setPreference] = useState("university");
  const [passengers, setPassengers] = useState(3);

  const handleSubmit = () => {
    setStep(1);
    setPlanStep(0);
    const interval = setInterval(() => {
      setPlanStep(prev => {
        if (prev >= PLANNING_STEPS.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setScenario({ visitSubmitted: true });
            setStep(2);
            setTimeout(() => navigate("F03"), 1200);
          }, 600);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
  };

  const toggle = (key: keyof typeof requirements) => {
    setRequirements(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (step === 1 || step === 2) {
    return (
      <div className="p-6 max-w-lg mx-auto mt-16 text-center">
        <div className="bg-white rounded-2xl border border-gray-200 p-10 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center mx-auto mb-6">
            <div className={`w-8 h-8 border-2 border-violet-600 rounded-full ${step === 1 && planStep < PLANNING_STEPS.length - 1 ? "animate-spin border-t-transparent" : ""}`} />
          </div>
          {step === 1 && (
            <>
              <h2 className="font-jakarta text-xl font-bold text-gray-900 mb-2">Planning your transport</h2>
              <p className="text-gray-500 text-sm mb-8">The system is coordinating your visit requirements</p>
              <div className="space-y-3 text-left">
                {PLANNING_STEPS.map((s, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-lg transition-all ${i <= planStep ? "bg-violet-50" : "bg-gray-50"}`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${i < planStep ? "bg-emerald-500" : i === planStep ? "bg-violet-600 animate-pulse" : "bg-gray-200"}`}>
                      {i < planStep && <span className="text-white text-xs">✓</span>}
                    </div>
                    <span className={`text-sm font-medium ${i <= planStep ? "text-gray-900" : "text-gray-400"}`}>{s}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-emerald-600 text-3xl">✓</span>
              </div>
              <h2 className="font-jakarta text-xl font-bold text-gray-900 mb-2">Visit Confirmed!</h2>
              <p className="text-gray-500 text-sm">Transport and amenities have been planned. Redirecting to visit overview…</p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl">
      <div className="mb-6">
        <div className="text-xs tracking-widest uppercase text-violet-500 font-semibold mb-1">Faculty Workspace</div>
        <h1 className="font-jakarta text-2xl font-bold text-gray-900">Create Visit Request</h1>
        <p className="text-gray-500 text-sm mt-1">Submit your requirements and the system will plan the logistics.</p>
      </div>

      <div className="space-y-5">
        {/* Visit Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-jakarta font-bold text-gray-900 mb-4">Visit Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Visit Date</label>
              <input type="date" defaultValue="2026-09-18"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-200" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Lecture Time</label>
              <input type="time" defaultValue="10:00"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-200" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Duration</label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-violet-400 bg-white">
                <option>2 hours</option>
                <option>3 hours</option>
                <option>4 hours</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Campus</label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-violet-400 bg-white">
                <option>MIT ADT · Loni Kalbhor</option>
                <option>MIT ADT · Rajbaug</option>
                <option>MIT ADT · Pune</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pickup Location */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-jakarta font-bold text-gray-900 mb-4">Pickup Location</h2>
          <div className="flex gap-2 mb-3">
            <div className="flex-1 relative">
              <input type="text" defaultValue="Hinjewadi Phase 1, Pune" placeholder="Search location"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-200 pr-10" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            </div>
            <button className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 whitespace-nowrap">📍 Use current</button>
          </div>
          {/* Map placeholder */}
          <div className="bg-slate-50 rounded-lg border border-gray-200 h-40 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <svg viewBox="0 0 400 160" className="w-full h-full">
                {[20,40,60,80,100,120,140].map(y => <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#CBD5E1" strokeWidth="1"/>)}
                {[40,80,120,160,200,240,280,320,360].map(x => <line key={x} x1={x} y1="0" x2={x} y2="160" stroke="#CBD5E1" strokeWidth="1"/>)}
                <path d="M 0 80 Q 100 75 200 78 Q 300 81 400 77" stroke="#94A3B8" strokeWidth="4" fill="none"/>
                <path d="M 100 0 Q 105 80 110 160" stroke="#CBD5E1" strokeWidth="3" fill="none"/>
              </svg>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 bg-amber-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                <span className="text-white text-sm">📍</span>
              </div>
              <div className="mt-2 bg-white rounded-lg px-3 py-1 shadow text-xs font-semibold text-gray-700">Hinjewadi Phase 1</div>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            {["Hinjewadi", "Baner", "Kharadi"].map(loc => (
              <button key={loc} className="px-3 py-1.5 bg-violet-50 hover:bg-violet-100 text-violet-700 rounded-lg text-xs font-medium transition-colors">
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-jakarta font-bold text-gray-900 mb-4">Requirements</h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {([
              { key: "transport" as const, icon: "🚐", label: "Transport", desc: "Pickup & drop" },
              { key: "accommodation" as const, icon: "🏠", label: "Accommodation", desc: "Guest house" },
              { key: "food" as const, icon: "🍽", label: "Food", desc: "Lunch included" },
              { key: "returnTransport" as const, icon: "↩", label: "Return Transport", desc: "Drop after lecture" },
            ]).map(({ key, icon, label, desc }) => (
              <button key={key} onClick={() => toggle(key)}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${requirements[key] ? "border-violet-400 bg-violet-50" : "border-gray-200 bg-white hover:border-gray-300"}`}>
                <span className="text-xl">{icon}</span>
                <div>
                  <div className={`text-sm font-semibold ${requirements[key] ? "text-violet-800" : "text-gray-700"}`}>{label}</div>
                  <div className="text-xs text-gray-400">{desc}</div>
                </div>
                {requirements[key] && <span className="ml-auto text-violet-600 text-sm">✓</span>}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-semibold text-gray-700">Passenger Count</label>
            <div className="flex items-center gap-3">
              <button onClick={() => setPassengers(Math.max(1, passengers - 1))}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold">–</button>
              <span className="font-jakarta font-bold text-gray-900 w-4 text-center">{passengers}</span>
              <button onClick={() => setPassengers(Math.min(8, passengers + 1))}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold">+</button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Transport Preference</label>
            <div className="flex gap-3">
              {[
                { value: "university", label: "University Vehicle" },
                { value: "shared", label: "Shared Vehicle" },
                { value: "cab", label: "Cab if Required" },
              ].map(opt => (
                <button key={opt.value} onClick={() => setPreference(opt.value)}
                  className={`flex-1 py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${preference === opt.value ? "border-violet-500 bg-violet-50 text-violet-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button onClick={handleSubmit}
          className="w-full bg-violet-700 hover:bg-violet-800 text-white py-3.5 rounded-xl font-jakarta font-bold text-base transition-colors shadow-sm hover:shadow-md">
          Submit Visit Request →
        </button>
      </div>
    </div>
  );
}
