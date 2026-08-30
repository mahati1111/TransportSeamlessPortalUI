import { useState } from "react";
import { Screen, ScenarioState } from "../../types";

interface Props {
  navigate: (s: Screen) => void;
  scenario: ScenarioState;
  setScenario: (s: Partial<ScenarioState>) => void;
}

const PLANS = [
  {
    id: "A", label: "Plan A", title: "Current Vehicle", desc: "Keep MH12 AB 1234",
    vehicle: "MH12 AB 1234", driver: "Ramesh Pawar", eta: "10:18",
    impact: "Lecture missed — 18 min late", impactType: "bad" as const,
    cost: "₹0", costType: "neutral" as const,
    recommended: false,
  },
  {
    id: "B", label: "Plan B", title: "Alternative University Vehicle", desc: "Switch to MH12 CD 5678",
    vehicle: "MH12 CD 5678", driver: "Suresh Kumar", eta: "9:42",
    impact: "Lecture protected — 18 min early", impactType: "good" as const,
    cost: "₹0", costType: "good" as const,
    recommended: true,
  },
  {
    id: "C", label: "Plan C", title: "Emergency Cab", desc: "Book OLA/Uber cab",
    vehicle: "Cab (OLA/Uber)", driver: "To be assigned", eta: "9:35",
    impact: "Lecture protected — 25 min early", impactType: "good" as const,
    cost: "₹600–800 est.", costType: "bad" as const,
    recommended: false,
  },
];

export default function AlternativePlans({ navigate, setScenario }: Props) {
  const [selected, setSelected] = useState("B");

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-5">
        <div className="text-xs tracking-widest uppercase text-violet-500 font-semibold mb-1">Alternative Plans</div>
        <h1 className="font-jakarta text-2xl font-bold text-gray-900">Intervention Options</h1>
        <p className="text-gray-500 text-sm mt-1">Compare available plans for Trip #104 · Dr. Anjali Kulkarni</p>
      </div>

      {/* Context */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 mb-5 grid grid-cols-4 gap-4">
        {[
          { label: "Current ETA", value: "10:18 AM", color: "text-red-600" },
          { label: "Lecture Time", value: "10:00 AM", color: "text-gray-900" },
          { label: "Gap", value: "−18 min", color: "text-red-600" },
          { label: "Impact", value: "Lecture missed", color: "text-red-600" },
        ].map(({ label, value, color }) => (
          <div key={label}>
            <div className="text-xs text-gray-400">{label}</div>
            <div className={`font-bold text-sm mt-0.5 ${color}`}>{value}</div>
          </div>
        ))}
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {PLANS.map(plan => {
          const isSelected = selected === plan.id;
          return (
            <button key={plan.id} onClick={() => setSelected(plan.id)}
              className={`text-left bg-white rounded-xl border-2 p-5 transition-all ${isSelected ? "border-violet-500 ring-2 ring-violet-200" : "border-gray-200 hover:border-gray-300"}`}>
              {plan.recommended && (
                <div className="mb-3">
                  <span className="px-2.5 py-1 bg-amber-400 text-gray-900 text-xs font-bold rounded-full">✦ AI Recommended</span>
                </div>
              )}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-bold">{plan.label}</span>
                {isSelected && <span className="text-violet-600">●</span>}
              </div>
              <div className="font-jakarta font-bold text-gray-900 text-base mb-0.5">{plan.title}</div>
              <div className="text-xs text-gray-400 mb-4">{plan.desc}</div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Vehicle</span>
                  <span className="font-semibold text-gray-900 text-right text-xs">{plan.vehicle}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Driver</span>
                  <span className="font-semibold text-gray-900 text-xs">{plan.driver}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">ETA</span>
                  <span className={`font-bold ${plan.id === "A" ? "text-red-600" : "text-emerald-600"}`}>{plan.eta} AM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Cost</span>
                  <span className={`font-semibold text-xs ${plan.costType === "bad" ? "text-red-600" : "text-emerald-600"}`}>{plan.cost}</span>
                </div>
              </div>

              <div className={`mt-3 pt-3 border-t border-gray-100 text-xs font-semibold ${plan.impactType === "bad" ? "text-red-600" : "text-emerald-600"}`}>
                {plan.impactType === "bad" ? "✕" : "✓"} {plan.impact}
              </div>
            </button>
          );
        })}
      </div>

      {/* Reason chips for selected */}
      {selected === "B" && (
        <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 mb-4">
          <div className="text-xs text-violet-500 font-semibold uppercase mb-2">Why Plan B is recommended</div>
          <div className="flex gap-2 flex-wrap">
            {["Protects lecture deadline", "Zero additional cost", "University vehicle (policy compliant)", "Driver nearby", "Passengers can be grouped"].map(r => (
              <span key={r} className="px-2.5 py-1 bg-white border border-violet-200 text-violet-700 rounded-full text-xs font-medium">{r}</span>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={() => navigate("A06")}
          className="flex-1 bg-violet-700 hover:bg-violet-800 text-white py-3 rounded-xl font-semibold text-sm transition-colors">
          Select Plan {selected} & Review →
        </button>
        <button onClick={() => navigate("A06")}
          className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50">
          Back to Intervention
        </button>
      </div>
    </div>
  );
}
