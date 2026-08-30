import { useState } from "react";
import { Screen, ScenarioState } from "../../types";

interface Props {
  navigate: (s: Screen) => void;
  setScenario: (s: Partial<ScenarioState>) => void;
}

const ISSUES = [
  { id: "traffic", icon: "🚦", label: "Traffic", desc: "Heavy congestion on route" },
  { id: "breakdown", icon: "🔧", label: "Vehicle Problem", desc: "Technical issue with vehicle" },
  { id: "passenger", icon: "👤", label: "Passenger Issue", desc: "Passenger-related problem" },
  { id: "road", icon: "🚧", label: "Road Blocked", desc: "Road closure or blockage" },
  { id: "pickup", icon: "📍", label: "Wrong Pickup", desc: "Incorrect pickup location" },
  { id: "other", icon: "❗", label: "Other Issue", desc: "Other operational issue" },
];

const SEVERITIES = [
  { id: "low", label: "Low", color: "bg-blue-50 border-blue-200 text-blue-700" },
  { id: "medium", label: "Medium", color: "bg-amber-50 border-amber-200 text-amber-700" },
  { id: "critical", label: "Critical", color: "bg-red-50 border-red-200 text-red-700" },
];

export default function ReportIssue({ navigate, setScenario }: Props) {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [severity, setSeverity] = useState<string>("medium");
  const [phase, setPhase] = useState<"select" | "submitting" | "done">("select");

  const handleSubmit = () => {
    if (!selectedIssue) return;
    setPhase("submitting");
    if (selectedIssue === "traffic" || selectedIssue === "breakdown") {
      setScenario({ tripDisrupted: true });
    }
    setTimeout(() => setPhase("done"), 1800);
  };

  if (phase === "submitting") {
    return (
      <div className="flex flex-col items-center justify-center min-h-full bg-white px-6 text-center">
        <div className="w-12 h-12 border-2 border-violet-600 border-t-transparent rounded-full animate-spin mb-5" />
        <div className="font-jakarta font-bold text-gray-900 text-lg mb-1">Evaluating route impact…</div>
        <div className="text-gray-500 text-sm">Notifying transport operations</div>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="flex flex-col items-center justify-center min-h-full bg-white px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-5">
          <span className="text-3xl">✓</span>
        </div>
        <h2 className="font-jakarta font-bold text-gray-900 text-xl mb-2">Issue Submitted</h2>
        <p className="text-gray-500 text-sm mb-2">Transport operations notified.</p>
        <p className="text-gray-400 text-xs mb-8">Admin is evaluating alternatives.</p>
        <div className="w-full space-y-2.5">
          <button onClick={() => navigate("D06")}
            className="w-full bg-violet-700 text-white py-4 rounded-2xl font-bold text-base">
            View Route Update →
          </button>
          <button onClick={() => navigate("D03")}
            className="w-full border border-gray-200 text-gray-700 py-3.5 rounded-2xl font-semibold text-sm">
            Back to Navigation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="text-xs text-amber-500 uppercase font-semibold mb-0.5">Report Issue</div>
        <div className="font-jakarta font-bold text-gray-900 text-xl">What's happening?</div>
      </div>

      <div className="flex-1 px-4 py-4">
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          {ISSUES.map(issue => (
            <button key={issue.id} onClick={() => setSelectedIssue(issue.id)}
              className={`p-3.5 rounded-2xl border-2 text-left transition-all ${selectedIssue === issue.id ? "border-amber-400 bg-amber-50" : "border-gray-200 bg-white hover:border-gray-300"}`}>
              <div className="text-2xl mb-1.5">{issue.icon}</div>
              <div className={`font-bold text-sm ${selectedIssue === issue.id ? "text-amber-800" : "text-gray-800"}`}>{issue.label}</div>
              <div className="text-xs text-gray-400 mt-0.5">{issue.desc}</div>
            </button>
          ))}
        </div>

        {selectedIssue && (
          <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-4">
            <div className="text-xs text-gray-400 uppercase font-semibold mb-3">Severity</div>
            <div className="flex gap-2">
              {SEVERITIES.map(s => (
                <button key={s.id} onClick={() => setSeverity(s.id)}
                  className={`flex-1 py-2.5 rounded-xl border-2 font-bold text-sm transition-all ${severity === s.id ? s.color : "border-gray-200 text-gray-500 bg-white"}`}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="px-4 pb-4">
        <button onClick={handleSubmit} disabled={!selectedIssue}
          className={`w-full py-4 rounded-2xl font-jakarta font-bold text-lg transition-all ${selectedIssue ? "bg-amber-500 hover:bg-amber-600 text-white" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
          Submit Issue
        </button>
      </div>
    </div>
  );
}
