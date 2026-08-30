import { useState } from "react";
import { Screen } from "../../types";
import StatusBadge from "../../components/StatusBadge";

interface Props { navigate: (s: Screen) => void; }

type PlanPhase = "idle" | "analyzing" | "done";

export default function PlanSchedule({ navigate }: Props) {
  const [phase, setPhase] = useState<PlanPhase>("idle");
  const [approved, setApproved] = useState(false);
  const [locked, setLocked] = useState(false);

  const handlePlan = () => {
    setPhase("analyzing");
    setTimeout(() => setPhase("done"), 2200);
  };

  const routes = [
    {
      id: "ROUTE 01", vehicle: "MH12 AB 1234", driver: "Ramesh Pawar", passengers: 3, capacity: 4,
      pickups: ["Hinjewadi — Dr. Anjali K.", "Wakad — Prof. Rane", "Baner — Prof. Joshi"],
      dest: "MIT ADT", eta: "9:20 AM",
    },
    {
      id: "ROUTE 02", vehicle: "MH12 CD 5678", driver: "Suresh Kumar", passengers: 4, capacity: 6,
      pickups: ["Kharadi — Dr. Mehta", "Viman Nagar — Prof. Sharma"],
      dest: "MIT ADT", eta: "9:35 AM",
    },
    {
      id: "ROUTE 03", vehicle: "MH14 GH 3456", driver: "Vikram Patil", passengers: 2, capacity: 4,
      pickups: ["Pune Airport — Dr. Patil", "Kalyani Nagar — Prof. Desai"],
      dest: "MIT ADT", eta: "9:50 AM",
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <div className="text-xs tracking-widest uppercase text-violet-500 font-semibold mb-1">Plan & Schedule</div>
          <h1 className="font-jakarta text-2xl font-bold text-gray-900">AI Transport Planning</h1>
          <p className="text-gray-500 text-sm mt-1">Optimize routes · Assign vehicles · Schedule departures</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Left: pending requests */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-3">Pending Requests</div>
            {[
              { name: "Dr. Anjali Kulkarni", pickup: "Hinjewadi", time: "10:00 AM" },
              { name: "Prof. Deepak Rane", pickup: "Wakad", time: "11:00 AM" },
              { name: "Dr. Priya Mehta", pickup: "Baner", time: "9:00 AM" },
              { name: "Prof. Sneha Joshi", pickup: "Baner", time: "10:00 AM" },
              { name: "Dr. Sunita Patil", pickup: "Pune Airport", time: "10:30 AM" },
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <div className="text-sm font-semibold text-gray-900">{r.name}</div>
                  <div className="text-xs text-gray-400">{r.pickup}</div>
                </div>
                <div className="text-xs text-gray-500">{r.time}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-3">Fleet Availability</div>
            {[
              { vehicle: "MH12 AB 1234", driver: "Ramesh Pawar", capacity: 4, status: "available" },
              { vehicle: "MH12 CD 5678", driver: "Suresh Kumar", capacity: 6, status: "available" },
              { vehicle: "MH14 GH 3456", driver: "Vikram Patil", capacity: 4, status: "available" },
              { vehicle: "MH14 EF 9012", driver: "—", capacity: 6, status: "maintenance" },
            ].map((v, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <div className="text-xs font-bold text-gray-900">{v.vehicle}</div>
                  <div className="text-[11px] text-gray-400">{v.driver} · {v.capacity} seats</div>
                </div>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${v.status === "available" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                  {v.status}
                </span>
              </div>
            ))}
          </div>

          {phase === "idle" && (
            <button onClick={handlePlan}
              className="w-full bg-violet-700 hover:bg-violet-800 text-white py-3.5 rounded-xl font-jakarta font-bold text-base transition-colors">
              Plan & Schedule →
            </button>
          )}
        </div>

        {/* Right: planning results */}
        <div className="col-span-2">
          {phase === "idle" && (
            <div className="bg-white rounded-xl border border-gray-200 p-10 text-center h-full flex flex-col items-center justify-center">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="font-jakarta font-bold text-gray-900 text-lg mb-2">Ready to Plan</h3>
              <p className="text-gray-500 text-sm max-w-xs">The system will analyze all pending requests, match compatible trips, and generate optimized route cards.</p>
            </div>
          )}

          {phase === "analyzing" && (
            <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
              <div className="w-12 h-12 border-2 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-5" />
              <h3 className="font-jakarta font-bold text-gray-900 mb-4">Analyzing requests…</h3>
              <div className="grid grid-cols-2 gap-3 text-sm max-w-xs mx-auto">
                {[
                  { label: "Requests analyzed", value: "18" },
                  { label: "Vehicles available", value: "6" },
                  { label: "Potential shared trips", value: "5" },
                  { label: "Conflicts detected", value: "2" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-violet-50 rounded-lg p-3 text-left">
                    <div className="text-xs text-gray-400">{label}</div>
                    <div className="font-bold text-violet-700 text-lg">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {phase === "done" && (
            <div className="space-y-4">
              {/* Summary */}
              <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 flex items-center gap-4">
                <div className="text-violet-500 text-2xl">✦</div>
                <div className="flex-1">
                  <div className="font-semibold text-violet-900 text-sm">AI Planning Summary</div>
                  <div className="text-violet-700 text-xs mt-1">18 requests analyzed · 3 routes generated · 5 shared trips · 2 conflicts resolved</div>
                </div>
                <div className="flex gap-2">
                  {!approved ? (
                    <button onClick={() => setApproved(true)}
                      className="px-4 py-2 bg-violet-700 hover:bg-violet-800 text-white rounded-lg text-sm font-semibold">
                      Approve Schedule
                    </button>
                  ) : !locked ? (
                    <button onClick={() => setLocked(true)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold">
                      Lock Schedule
                    </button>
                  ) : (
                    <span className="px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-sm font-semibold">
                      ✓ Schedule Locked
                    </span>
                  )}
                </div>
              </div>

              {/* Route cards */}
              {routes.map((route, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="px-2.5 py-1 bg-violet-700 text-white text-xs font-bold rounded-lg">{route.id}</div>
                      <div>
                        <div className="font-bold text-gray-900 text-sm">{route.vehicle}</div>
                        <div className="text-xs text-gray-400">Driver: {route.driver}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-xs text-gray-400">ETA</div>
                        <div className="font-bold text-gray-900">{route.eta}</div>
                      </div>
                      <StatusBadge status={approved ? "confirmed" : "planning"} size="sm" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-400 mb-1">Passengers</div>
                      <div className="font-bold text-gray-900">{route.passengers} / {route.capacity}</div>
                      <div className="w-full h-1.5 bg-gray-200 rounded mt-1">
                        <div className="h-1.5 bg-violet-500 rounded" style={{ width: `${(route.passengers/route.capacity)*100}%` }} />
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-400 mb-1">Destination</div>
                      <div className="font-bold text-gray-900 text-sm">{route.dest}</div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-xs text-gray-400 mb-1">Pickup Sequence</div>
                    {route.pickups.map((p, j) => (
                      <div key={j} className="flex items-center gap-2 py-1">
                        <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                          {j + 1}
                        </div>
                        <span className="text-xs text-gray-600">{p}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50">Review Route</button>
                    <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50">Edit Assignment</button>
                    <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50">Recalculate</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
