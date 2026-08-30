import { useState } from "react";
import { Screen, ScenarioState } from "../../types";

interface Props {
  navigate: (s: Screen) => void;
  scenario: ScenarioState;
  setScenario: (s: Partial<ScenarioState>) => void;
}

export default function UpdatedRoute({ navigate, scenario, setScenario }: Props) {
  const [tripComplete, setTripComplete] = useState(false);

  const handleComplete = () => {
    setTripComplete(true);
  };

  if (tripComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full bg-white px-6 text-center">
        <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mb-5">
          <span className="text-4xl">🏁</span>
        </div>
        <h2 className="font-jakarta font-bold text-gray-900 text-2xl mb-2">Trip Completed</h2>
        <div className="mb-6 w-full max-w-xs">
          <div className="bg-gray-50 rounded-2xl p-4 text-left space-y-3">
            {[
              { label: "Arrival", value: "9:43 AM" },
              { label: "Passengers", value: "3" },
              { label: "Stops", value: "3" },
              { label: "Planned Arrival", value: "9:45 AM" },
              { label: "Actual Arrival", value: "9:43 AM" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-gray-400">{label}</span>
                <span className="font-bold text-gray-900">{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 text-xs text-emerald-700 font-semibold">
            ✓ 2 minutes early · All passengers delivered
          </div>
        </div>
        <div className="w-full space-y-2">
          <button onClick={() => navigate("D01")} className="w-full bg-violet-700 text-white py-4 rounded-2xl font-bold text-base">
            Return to Dashboard
          </button>
        </div>
        <div className="mt-4 text-xs text-gray-400">
          Faculty status → Arrived · Admin notified
        </div>
      </div>
    );
  }

  if (scenario.alternativeApproved) {
    return (
      <div className="flex flex-col min-h-full bg-gray-50">
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center gap-2 mb-0.5">
            <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            <div className="text-xs text-violet-500 uppercase font-semibold">Route Updated</div>
          </div>
          <div className="font-jakarta font-bold text-gray-900 text-xl">Route has been updated</div>
        </div>

        <div className="px-4 py-4 flex-1">
          {/* Alert */}
          <div className="bg-violet-50 border border-violet-200 rounded-2xl p-4 mb-4">
            <div className="font-bold text-violet-900 mb-1">Updated Route</div>
            <div className="text-violet-700 text-sm">Admin approved alternative vehicle plan. Your route has been updated.</div>
            <div className="mt-2 text-xs text-violet-500">Reason: Traffic disruption detected</div>
          </div>

          {/* New route */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-4">
            <div className="text-xs text-gray-400 uppercase font-semibold mb-3">Updated Route</div>
            <div className="space-y-3">
              {[
                { stop: "Pickup Point", time: "8:45 AM", type: "start" },
                { stop: "MIT ADT University", time: "9:42 AM", type: "end" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${s.type === "start" ? "bg-amber-500" : "bg-violet-700"}`} />
                  <span className="text-sm font-semibold text-gray-900 flex-1">{s.stop}</span>
                  <span className="text-sm font-bold text-gray-700">{s.time}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
              <div className="bg-emerald-50 rounded-lg p-2">
                <div className="text-xs text-gray-400">New ETA</div>
                <div className="font-bold text-emerald-600">9:42 AM</div>
              </div>
              <div className="bg-violet-50 rounded-lg p-2">
                <div className="text-xs text-gray-400">Lecture at</div>
                <div className="font-bold text-gray-900">10:00 AM</div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 pb-4 space-y-2.5">
          <button onClick={() => navigate("D03")}
            className="w-full bg-violet-700 hover:bg-violet-800 text-white py-4 rounded-2xl font-jakarta font-bold text-lg">
            Navigate →
          </button>
          <button onClick={handleComplete}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-2xl font-bold text-base">
            Complete Trip
          </button>
        </div>
      </div>
    );
  }

  // No disruption yet — show in-progress state
  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="text-xs text-gray-400 uppercase font-semibold mb-0.5">Trip Status</div>
        <div className="font-jakarta font-bold text-gray-900 text-xl">Trip In Progress</div>
      </div>
      <div className="flex-1 px-4 py-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 text-center">
          <div className="text-4xl mb-3">🚐</div>
          <div className="font-jakarta font-bold text-gray-900 mb-1">En Route</div>
          <div className="text-gray-500 text-sm">Trip is running normally. Estimated arrival 9:20 AM.</div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <button onClick={handleComplete}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-jakarta font-bold text-lg">
          Complete Trip
        </button>
      </div>
    </div>
  );
}
