import { useState } from "react";
import { Screen, ScenarioState } from "../../types";

interface Props {
  navigate: (s: Screen) => void;
  scenario: ScenarioState;
  setScenario: (s: Partial<ScenarioState>) => void;
}

export default function TodaysRoute({ navigate, scenario, setScenario }: Props) {
  const [showConfirm, setShowConfirm] = useState(false);

  const stops = scenario.alternativeApproved
    ? [
        { num: "01", location: "Pickup Point", name: "Dr. Anjali Kulkarni", time: "8:45 AM", done: false },
        { num: "02", location: "MIT ADT", name: "Destination", time: "9:42 AM", done: false },
      ]
    : [
        { num: "01", location: "Hinjewadi Phase 1", name: "Dr. Anjali Kulkarni", time: "8:10 AM", done: scenario.tripStarted },
        { num: "02", location: "Wakad", name: "Prof. Deepak Rane", time: "8:25 AM", done: false },
        { num: "03", location: "Baner", name: "Prof. Sneha Joshi", time: "8:40 AM", done: false },
      ];

  const handleStart = () => {
    setShowConfirm(false);
    setScenario({ tripStarted: true });
    navigate("D03");
  };

  return (
    <div className="bg-gray-50 min-h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="text-xs text-gray-400 uppercase font-semibold mb-0.5">Today's Route</div>
        <div className="font-jakarta font-bold text-gray-900 text-xl">18 September 2026</div>
        <div className="text-sm text-gray-500">{scenario.alternativeApproved ? "Updated route" : "Hinjewadi → MIT ADT · 3 stops"}</div>
        {scenario.alternativeApproved && (
          <div className="mt-2 bg-violet-50 border border-violet-200 rounded-lg px-3 py-2 text-xs text-violet-700 font-semibold">
            ✓ Route updated · Alternative pickup assigned
          </div>
        )}
      </div>

      {/* Vehicle info */}
      <div className="mx-4 mt-3 bg-white rounded-xl border border-gray-200 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">🚐</span>
          <div>
            <div className="font-bold text-gray-900 text-sm">MH12 AB 1234</div>
            <div className="text-xs text-gray-400">Toyota Innova · 4 seats</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-400">Depart</div>
          <div className="font-bold text-violet-700">7:55 AM</div>
        </div>
      </div>

      {/* Route timeline */}
      <div className="flex-1 px-4 py-3">
        <div className="font-semibold text-gray-700 text-sm mb-3">Pickup Sequence</div>
        <div className="space-y-0">
          {stops.map((stop, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 font-bold text-sm ${
                  stop.done ? "bg-emerald-500 border-emerald-500 text-white" : "bg-white border-violet-300 text-violet-700"
                }`}>
                  {stop.done ? "✓" : stop.num}
                </div>
                {i < stops.length - 1 && <div className="w-0.5 h-12 bg-gray-200 my-1" />}
              </div>
              <div className="flex-1 pt-2 pb-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-bold text-gray-900">{stop.location}</div>
                    <div className={`text-sm mt-0.5 ${stop.name === "Destination" ? "text-emerald-600 font-semibold" : "text-gray-500"}`}>
                      {stop.name}
                    </div>
                  </div>
                  <div className="font-bold text-gray-700">{stop.time}</div>
                </div>
              </div>
            </div>
          ))}

          {/* Final destination */}
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-violet-700 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">🏫</span>
              </div>
            </div>
            <div className="flex-1 pt-2">
              <div className="font-bold text-gray-900">MIT ADT University</div>
              <div className="text-sm text-emerald-600 font-semibold mt-0.5">Final Destination</div>
              <div className="text-sm text-gray-500">{scenario.alternativeApproved ? "9:42 AM" : "9:20 AM"} ETA</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="px-4 pb-4 space-y-2.5">
        {!scenario.tripStarted ? (
          <button onClick={() => setShowConfirm(true)}
            className="w-full bg-violet-700 hover:bg-violet-800 text-white py-4 rounded-2xl font-jakarta font-bold text-lg transition-colors">
            Start Trip
          </button>
        ) : (
          <button onClick={() => navigate("D03")}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-jakarta font-bold text-lg transition-colors">
            Continue Navigation →
          </button>
        )}
        <div className="grid grid-cols-2 gap-2.5">
          <button onClick={() => navigate("D03")}
            className="bg-white border border-gray-200 text-gray-800 py-3.5 rounded-xl font-semibold text-sm hover:bg-gray-50">
            Navigate 🗺
          </button>
          <button onClick={() => navigate("D05")}
            className="bg-white border border-amber-200 text-amber-700 py-3.5 rounded-xl font-semibold text-sm hover:bg-amber-50">
            Report Issue ⚠
          </button>
        </div>
      </div>

      {/* Confirm modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
          <div className="bg-white w-full rounded-t-3xl p-6 pb-8">
            <div className="w-12 h-1 bg-gray-200 rounded mx-auto mb-5" />
            <h3 className="font-jakarta font-bold text-gray-900 text-xl text-center mb-2">Start today's trip?</h3>
            <p className="text-gray-500 text-sm text-center mb-6">This will notify all passengers and begin live tracking.</p>
            <div className="space-y-2.5">
              <button onClick={handleStart}
                className="w-full bg-violet-700 hover:bg-violet-800 text-white py-4 rounded-2xl font-bold text-base">
                Start Trip
              </button>
              <button onClick={() => setShowConfirm(false)}
                className="w-full border border-gray-200 text-gray-700 py-3.5 rounded-2xl font-semibold text-sm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
