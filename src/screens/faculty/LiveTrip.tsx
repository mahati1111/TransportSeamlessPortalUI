import { useState } from "react";
import { Screen, ScenarioState } from "../../types";
import MapView from "../../components/MapView";
import StatusBadge from "../../components/StatusBadge";

interface Props {
  navigate: (s: Screen) => void;
  scenario: ScenarioState;
  setScenario: (s: Partial<ScenarioState>) => void;
}

export default function LiveTrip({ navigate, scenario, setScenario }: Props) {
  const [showDisruptedDemo, setShowDisruptedDemo] = useState(false);

  const disrupted = scenario.tripDisrupted || showDisruptedDemo;
  const approved = scenario.alternativeApproved;

  const status = approved ? "executing" : disrupted ? "exception" : "monitoring";
  const statusLabel = approved ? "Alternative Vehicle Assigned" : disrupted ? "Delay Detected · Rerouting" : "On Schedule";
  const eta = approved ? "9:42 AM" : disrupted ? "10:18 AM" : "9:20 AM";
  const vehicle = approved ? "MH12 CD 5678" : "MH12 AB 1234";
  const driver = approved ? "Suresh Kumar" : "Ramesh Pawar";
  const vx = disrupted && !approved ? 140 : 160;
  const vy = disrupted && !approved ? 130 : 125;

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <div className="text-xs tracking-widest uppercase text-violet-500 font-semibold mb-1">Transport</div>
          <h1 className="font-jakarta text-2xl font-bold text-gray-900">Live Trip</h1>
          <p className="text-gray-500 text-sm mt-1">Real-time vehicle tracking · 18 Sep 2026</p>
        </div>
        <StatusBadge status={status} label={statusLabel} />
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2">
          {/* Map */}
          <MapView
            showVehicle
            vehiclePosition={{ x: vx, y: vy }}
            disrupted={disrupted && !approved}
            alternative={approved}
            className="h-72 mb-4"
          />

          {/* Status banners */}
          {!disrupted && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-3 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <div className="font-semibold text-emerald-800 text-sm">On schedule</div>
                <div className="text-emerald-600 text-xs">Arriving at Wakad · 8:25 AM · Next pickup in 3 min</div>
              </div>
            </div>
          )}
          {disrupted && !approved && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-red-500 text-xl">⚠</span>
                <div className="font-semibold text-red-800">Traffic detected ahead</div>
              </div>
              <div className="text-red-700 text-sm mb-3">ETA recalculated — 10:18 AM. May miss 10:00 AM lecture.</div>
              <div className="text-red-600 text-xs">Admin is evaluating alternatives. You will be notified automatically.</div>
            </div>
          )}
          {approved && (
            <div className="bg-violet-50 border border-violet-200 rounded-xl px-5 py-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-violet-600 text-xl">✓</span>
                <div className="font-semibold text-violet-800">Transport plan updated</div>
              </div>
              <div className="text-violet-700 text-sm">Alternative vehicle MH12 CD 5678 assigned. New ETA: 9:42 AM.</div>
              <div className="text-violet-600 text-xs mt-1">Your lecture at 10:00 AM is protected.</div>
            </div>
          )}

          {/* Demo controls */}
          {!scenario.tripDisrupted && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <div className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wide">Scenario Demo</div>
              <div className="flex gap-2">
                <button onClick={() => { setShowDisruptedDemo(true); setScenario({ tripDisrupted: true }); }}
                  className="px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg text-xs font-semibold hover:bg-amber-100 transition-colors">
                  Simulate Traffic Delay
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-3">Driver</div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">{driver.split(" ").map(n=>n[0]).join("")}</span>
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm">{driver}</div>
                <div className="text-xs text-gray-400">+91 98765 43210</div>
              </div>
            </div>
            <div className="text-xs text-gray-500">{vehicle}</div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-2">ETA at MIT ADT</div>
            <div className={`font-jakarta text-2xl font-bold ${approved || !disrupted ? "text-emerald-600" : "text-red-600"}`}>{eta}</div>
            <div className="text-xs text-gray-500 mt-1">Lecture: 10:00 AM</div>
            {disrupted && !approved && (
              <div className="mt-2 text-xs text-red-500 font-semibold">⚠ 18 min after lecture start</div>
            )}
            {approved && (
              <div className="mt-2 text-xs text-emerald-600 font-semibold">✓ 18 min before lecture</div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-3">Passengers</div>
            {["Dr. Anjali Kulkarni", "Prof. Deepak Rane", "Prof. Sneha Joshi"].map((p, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center">
                  <span className="text-violet-600 text-[10px] font-bold">{p.split(" ").map(n=>n[0]).join("").slice(0,2)}</span>
                </div>
                <span className="text-xs text-gray-700">{p}</span>
              </div>
            ))}
          </div>

          {/* Journey stops */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-3">Stops</div>
            {[
              { label: "Hinjewadi", time: "8:10", done: true },
              { label: "Wakad", time: "8:25", done: true },
              { label: "Baner", time: "8:40", done: false, active: !disrupted },
              { label: "MIT ADT", time: eta, done: false },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2 mb-1.5">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${s.done ? "bg-emerald-500" : s.active ? "bg-violet-600" : "bg-gray-300"}`} />
                <span className={`text-xs flex-1 ${s.done ? "text-gray-400 line-through" : "text-gray-700 font-medium"}`}>{s.label}</span>
                <span className="text-xs text-gray-400">{s.time}</span>
              </div>
            ))}
          </div>

          <button onClick={() => navigate("F08")}
            className="w-full border border-red-200 text-red-600 hover:bg-red-50 py-2.5 rounded-xl text-sm font-semibold transition-colors">
            Emergency Transport
          </button>
        </div>
      </div>
    </div>
  );
}
