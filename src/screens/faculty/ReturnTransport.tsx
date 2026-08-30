import { useState } from "react";
import { Screen } from "../../types";
import StatusBadge from "../../components/StatusBadge";

interface Props { navigate: (s: Screen) => void; }

export default function ReturnTransport({ navigate }: Props) {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="p-6 max-w-2xl">
      <div className="mb-5">
        <div className="text-xs tracking-widest uppercase text-violet-500 font-semibold mb-1">Return Transport</div>
        <h1 className="font-jakarta text-2xl font-bold text-gray-900">Return Journey</h1>
        <p className="text-gray-500 text-sm mt-1">Shared vehicle recommended for return · 18 September 2026</p>
      </div>

      {/* AI Recommendation */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 mb-5">
        <span className="text-amber-500 text-lg mt-0.5">✦</span>
        <div>
          <div className="text-xs text-amber-600 font-semibold uppercase tracking-wide mb-1">Recommended</div>
          <div className="font-semibold text-amber-900">Shared route available for your destination</div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {["Shared route available", "2 other faculty", "Cost optimized", "On-time departure"].map(r => (
              <span key={r} className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">{r}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Return trip card */}
        <div className={`bg-white rounded-xl border-2 p-5 transition-all ${confirmed ? "border-emerald-400" : "border-violet-300"}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-jakarta font-bold text-gray-900 text-lg">12:30 PM Departure</div>
              <div className="text-sm text-gray-500">MIT ADT → Wakad → Hinjewadi</div>
            </div>
            <StatusBadge status={confirmed ? "confirmed" : "recommended"} />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Vehicle</div>
              <div className="font-bold text-gray-900 text-sm">MH12 AB 1234</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Driver</div>
              <div className="font-bold text-gray-900 text-sm">Ramesh Pawar</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Passengers</div>
              <div className="font-bold text-gray-900 text-sm">2 / 4</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">ETA at Hinjewadi</div>
              <div className="font-bold text-gray-900 text-sm">1:45 PM</div>
            </div>
          </div>

          {/* Route */}
          <div className="mb-4">
            <div className="text-xs text-gray-400 uppercase font-semibold mb-2">Route</div>
            <div className="flex items-center gap-2 flex-wrap">
              {["MIT ADT", "Baner", "Wakad", "Hinjewadi"].map((stop, i, arr) => (
                <div key={stop} className="flex items-center gap-2">
                  <div className="flex flex-col items-center">
                    <div className={`w-2.5 h-2.5 rounded-full ${i === 0 ? "bg-emerald-500" : i === arr.length - 1 ? "bg-violet-600" : "bg-gray-300"}`} />
                    <span className="text-xs text-gray-600 mt-1 whitespace-nowrap">{stop}</span>
                  </div>
                  {i < arr.length - 1 && <div className="w-6 h-0.5 bg-gray-200 mb-4" />}
                </div>
              ))}
            </div>
          </div>

          {!confirmed ? (
            <div className="flex gap-3">
              <button onClick={() => setConfirmed(true)}
                className="flex-1 bg-violet-700 hover:bg-violet-800 text-white py-2.5 rounded-xl text-sm font-bold transition-colors">
                Confirm Return
              </button>
              <button className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50">
                Change Destination
              </button>
              <button className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50">
                View Route
              </button>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl py-3 text-center">
              <div className="text-emerald-700 font-semibold text-sm">✓ Return transport confirmed</div>
              <div className="text-emerald-600 text-xs mt-0.5">Driver will be at MIT ADT main gate at 12:30 PM</div>
            </div>
          )}
        </div>

        {/* Alternative options */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="text-xs text-gray-400 uppercase font-semibold mb-3">Other Options</div>
          {[
            { time: "1:00 PM", route: "MIT ADT → Kharadi → Viman Nagar", passengers: "1/6", type: "Shared" },
            { time: "2:00 PM", route: "MIT ADT → Baner → Hinjewadi", passengers: "0/4", type: "University" },
          ].map((opt, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
              <div>
                <div className="font-semibold text-gray-900 text-sm">{opt.time} · {opt.type}</div>
                <div className="text-xs text-gray-400 mt-0.5">{opt.route}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">{opt.passengers} seats</div>
                <button className="text-xs text-violet-600 font-semibold hover:text-violet-700 mt-1">Select →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
