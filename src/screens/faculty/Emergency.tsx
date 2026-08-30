import { useState } from "react";
import { Screen } from "../../types";

interface Props { navigate: (s: Screen) => void; }

const ISSUES = [
  { id: "unavailable", icon: "🚫", label: "Vehicle Unavailable", desc: "Assigned vehicle not showing up" },
  { id: "breakdown", icon: "🔧", label: "Vehicle Breakdown", desc: "Vehicle stopped working en route" },
  { id: "driver-delay", icon: "⏱", label: "Driver Delay", desc: "Driver significantly delayed" },
  { id: "schedule", icon: "📅", label: "Schedule Changed", desc: "Lecture time moved earlier" },
  { id: "other", icon: "❗", label: "Other Emergency", desc: "Operational emergency" },
];

export default function Emergency({ navigate }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [phase, setPhase] = useState<"select" | "checking" | "approved">("select");

  const handleRequest = () => {
    if (!selected) return;
    setPhase("checking");
    setTimeout(() => setPhase("approved"), 2000);
  };

  if (phase === "checking") {
    return (
      <div className="p-6 max-w-md mx-auto mt-16 text-center">
        <div className="bg-white rounded-2xl border border-gray-200 p-10 shadow-sm">
          <div className="w-12 h-12 border-2 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <h2 className="font-jakarta text-xl font-bold text-gray-900 mb-2">Checking emergency transport eligibility…</h2>
          <p className="text-gray-500 text-sm">Verifying policy · Finding nearest cab · Calculating fare limit</p>
        </div>
      </div>
    );
  }

  if (phase === "approved") {
    return (
      <div className="p-6 max-w-xl mx-auto mt-8">
        <div className="bg-white rounded-2xl border border-emerald-200 p-8 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
            <span className="text-emerald-600 text-3xl">✓</span>
          </div>
          <h2 className="font-jakarta text-2xl font-bold text-gray-900 text-center mb-1">Emergency Cab Approved</h2>
          <div className="text-center mb-6">
            <div className="font-jakarta text-3xl font-bold text-emerald-600">Max ₹1,000</div>
            <div className="text-sm text-gray-500 mt-1">Reimbursable fare limit</div>
          </div>

          {/* Policy checklist */}
          <div className="bg-gray-50 rounded-xl p-4 mb-5">
            <div className="text-xs text-gray-400 uppercase font-semibold mb-3">Policy Verification</div>
            {[
              "Within teaching engagement",
              "University vehicle unavailable",
              "Lecture deadline at risk",
              "Within reimbursable limit",
              "No prior emergency this visit",
            ].map((check, i) => (
              <div key={i} className="flex items-center gap-2.5 py-1.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-[10px]">✓</span>
                </div>
                <span className="text-sm text-gray-700">{check}</span>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5 text-sm text-amber-800">
            <strong>Important:</strong> Book via Ola, Uber or Rapido. Save your receipt and upload for reimbursement.
          </div>

          <div className="flex gap-3">
            <button onClick={() => navigate("F09")}
              className="flex-1 bg-violet-700 hover:bg-violet-800 text-white py-3 rounded-xl font-semibold text-sm transition-colors">
              Upload Receipt for Reimbursement →
            </button>
            <button onClick={() => setPhase("select")}
              className="px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl">
      <div className="mb-5">
        <div className="text-xs tracking-widest uppercase text-red-500 font-semibold mb-1">Emergency</div>
        <h1 className="font-jakarta text-2xl font-bold text-gray-900">Emergency Transport</h1>
        <p className="text-gray-500 text-sm mt-1">Select the reason to check eligibility for emergency cab</p>
      </div>

      {/* Current trip info */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-5">
        <div className="text-xs text-gray-400 uppercase font-semibold mb-2">Current Assignment</div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <div className="text-xs text-gray-400">Vehicle</div>
            <div className="font-semibold text-gray-900 text-sm">MH12 AB 1234</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Driver</div>
            <div className="font-semibold text-gray-900 text-sm">Ramesh Pawar</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Lecture at</div>
            <div className="font-semibold text-gray-900 text-sm">10:00 AM</div>
          </div>
        </div>
      </div>

      {/* Issue selection */}
      <div className="grid grid-cols-1 gap-3 mb-5">
        {ISSUES.map(issue => (
          <button key={issue.id} onClick={() => setSelected(issue.id)}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${selected === issue.id ? "border-red-400 bg-red-50" : "border-gray-200 bg-white hover:border-gray-300"}`}>
            <span className="text-2xl">{issue.icon}</span>
            <div>
              <div className={`font-semibold text-sm ${selected === issue.id ? "text-red-800" : "text-gray-800"}`}>{issue.label}</div>
              <div className="text-xs text-gray-400 mt-0.5">{issue.desc}</div>
            </div>
            {selected === issue.id && <span className="ml-auto text-red-500">●</span>}
          </button>
        ))}
      </div>

      <button onClick={handleRequest} disabled={!selected}
        className={`w-full py-3.5 rounded-xl font-jakarta font-bold text-base transition-all ${selected ? "bg-red-600 hover:bg-red-700 text-white shadow-sm" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
        Request Emergency Cab
      </button>
    </div>
  );
}
