import { useState } from "react";
import { Screen, ScenarioState } from "../../types";

interface Props {
  navigate: (s: Screen) => void;
  scenario: ScenarioState;
  setScenario: (s: Partial<ScenarioState>) => void;
}

export default function Navigation({ navigate, scenario, setScenario }: Props) {
  const [trafficAlert, setTrafficAlert] = useState(scenario.tripDisrupted);

  const showTraffic = () => {
    setTrafficAlert(true);
    setScenario({ tripDisrupted: true });
  };

  const eta = scenario.alternativeApproved ? "9:42" : scenario.tripDisrupted ? "10:18" : "9:20";
  const dist = "2.4 km";
  const nextStop = "Wakad";
  const nextTime = "6 min";

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Map area */}
      <div className="flex-1 relative bg-slate-800 overflow-hidden">
        {/* Simulated map */}
        <svg viewBox="0 0 390 500" className="w-full h-full">
          <rect width="390" height="500" fill="#1e293b" />
          {/* Roads */}
          <path d="M 0 250 Q 150 240 390 255" stroke="#334155" strokeWidth="20" fill="none" strokeLinecap="round" />
          <path d="M 0 250 Q 150 240 390 255" stroke="#475569" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M 140 0 Q 145 250 150 500" stroke="#334155" strokeWidth="12" fill="none" />
          <path d="M 300 0 Q 310 250 320 500" stroke="#334155" strokeWidth="10" fill="none" />
          <path d="M 50 100 Q 200 95 390 105" stroke="#374151" strokeWidth="8" fill="none" />

          {/* Route line */}
          <path d="M 60 248 Q 195 243 390 252" stroke="#7C3AED" strokeWidth="5" fill="none" strokeLinecap="round" />

          {/* Stop markers */}
          <circle cx={60} cy={248} r="10" fill="#F59E0B" />
          <text x={60} y={235} textAnchor="middle" fill="#F59E0B" fontSize="9">Hinjewadi</text>

          <circle cx={195} cy={244} r="8" fill="#8B5CF6" />
          <text x={195} y={232} textAnchor="middle" fill="#C4B5FD" fontSize="9">Wakad</text>

          <circle cx={310} cy={249} r="8" fill="#4ADE80" />
          <text x={310} y={237} textAnchor="middle" fill="#4ADE80" fontSize="9">MIT ADT</text>

          {/* Current vehicle */}
          <circle cx={120} cy={246} r="18" fill="#7C3AED" opacity={0.3} />
          <circle cx={120} cy={246} r="10" fill="#7C3AED" />
          <circle cx={120} cy={246} r="5" fill="white" />

          {/* Traffic zone */}
          {trafficAlert && (
            <>
              <ellipse cx={170} cy={244} rx="25" ry="12" fill="#EF4444" opacity="0.3" />
              <text x={170} y={248} textAnchor="middle" fill="#FCA5A5" fontSize="10" fontWeight="bold">SLOW</text>
            </>
          )}

          {/* Labels */}
          <text x={15} y={20} fill="#6B7280" fontSize="10">MIT ADT · Navigation</text>
          {trafficAlert && (
            <rect x={10} y={280} width={180} height={36} rx={8} fill="#EF4444" opacity={0.9} />
          )}
          {trafficAlert && (
            <text x={100} y={301} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">⚠ Traffic ahead · ETA updated</text>
          )}
        </svg>

        {/* ETA overlay */}
        <div className="absolute top-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center justify-between">
          <div>
            <div className="text-white/60 text-xs">Arrive at Wakad</div>
            <div className="text-white font-jakarta font-bold text-2xl">{nextTime}</div>
          </div>
          <div className="text-center">
            <div className="text-white/60 text-xs">Distance</div>
            <div className="text-white font-bold text-lg">{dist}</div>
          </div>
          <div className="text-right">
            <div className="text-white/60 text-xs">Final ETA</div>
            <div className={`font-bold text-lg ${trafficAlert && !scenario.alternativeApproved ? "text-red-400" : "text-emerald-400"}`}>{eta} AM</div>
          </div>
        </div>

        {trafficAlert && !scenario.alternativeApproved && (
          <div className="absolute top-20 left-4 right-4 bg-red-600/90 backdrop-blur-sm rounded-xl px-4 py-2.5 text-white">
            <div className="font-bold text-sm">Traffic detected ahead</div>
            <div className="text-red-200 text-xs">ETA recalculated to {eta} AM</div>
          </div>
        )}
      </div>

      {/* Bottom sheet */}
      <div className="bg-white rounded-t-3xl shadow-2xl px-4 pt-4 pb-4">
        <div className="w-12 h-1 bg-gray-200 rounded mx-auto mb-4" />
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs text-gray-400 uppercase font-semibold">Next Stop</div>
            <div className="font-jakarta font-bold text-gray-900 text-xl">{nextStop}</div>
            <div className="text-gray-500 text-sm">{dist} · {nextTime}</div>
          </div>
          <button onClick={() => navigate("D04")}
            className="bg-violet-700 hover:bg-violet-800 text-white px-6 py-3 rounded-xl font-semibold text-sm">
            Arrived →
          </button>
        </div>
        <div className="flex gap-2">
          {!trafficAlert && (
            <button onClick={showTraffic}
              className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl text-sm font-semibold hover:bg-gray-200">
              Simulate Traffic
            </button>
          )}
          <button onClick={() => navigate("D05")}
            className="flex-1 bg-amber-50 border border-amber-200 text-amber-700 py-3 rounded-xl text-sm font-semibold">
            Report Issue ⚠
          </button>
        </div>
      </div>
    </div>
  );
}
