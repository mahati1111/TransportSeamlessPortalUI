import { Screen, ScenarioState } from "../../types";
import StatusBadge from "../../components/StatusBadge";
import MapView from "../../components/MapView";

interface Props {
  navigate: (s: Screen) => void;
  scenario: ScenarioState;
}

const FEED = [
  { time: "08:05", msg: "12 trips successfully planned for today", type: "success" },
  { time: "08:18", msg: "Trip #104 — predicted 18 min delay via Wakad", type: "attention" },
  { time: "08:19", msg: "Alternative vehicle MH12 CD 5678 identified", type: "intervention" },
  { time: "08:20", msg: "Admin approval required — intervention pending", type: "action" },
  { time: "08:22", msg: "MH14 EF 9012 scheduled maintenance complete", type: "success" },
  { time: "08:25", msg: "Return transport grouped for 5 faculty members", type: "success" },
];

export default function CommandCenter({ navigate, scenario }: Props) {
  const kpis = [
    { label: "Active Trips", value: "12", sub: "In progress", color: "border-violet-400", textColor: "text-violet-700" },
    { label: "Vehicles Running", value: "8", sub: "of 10 fleet", color: "border-emerald-400", textColor: "text-emerald-700" },
    { label: "Delayed Trips", value: scenario.tripDisrupted && !scenario.alternativeApproved ? "2" : "0", sub: "Need attention", color: "border-amber-400", textColor: "text-amber-700" },
    { label: "Pending Approvals", value: scenario.tripDisrupted && !scenario.alternativeApproved ? "1" : "0", sub: "Action required", color: "border-red-400", textColor: "text-red-600" },
    { label: "Faculty Requests", value: "18", sub: "Today", color: "border-blue-400", textColor: "text-blue-700" },
  ];

  return (
    <div className="p-6">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <div className="text-xs tracking-widest uppercase text-violet-500 font-semibold mb-1">Command Center</div>
          <h1 className="font-jakarta text-2xl font-bold text-gray-900">Operations Overview</h1>
          <p className="text-gray-500 text-sm mt-1">18 September 2026 · Live system status</p>
        </div>
        {scenario.tripDisrupted && !scenario.alternativeApproved && (
          <button onClick={() => navigate("A06")}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors animate-pulse">
            ⚡ Intervention Required
          </button>
        )}
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-5 gap-4 mb-5">
        {kpis.map(kpi => (
          <div key={kpi.label} className={`bg-white rounded-xl border-t-2 ${kpi.color} border-l border-r border-b border-gray-200 p-4`}>
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">{kpi.label}</div>
            <div className={`font-jakarta text-3xl font-bold ${kpi.textColor}`}>{kpi.value}</div>
            <div className="text-xs text-gray-400 mt-0.5">{kpi.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Map */}
        <div className="col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <div className="font-semibold text-gray-900 text-sm">Live Fleet Map</div>
              <div className="flex items-center gap-3">
                {[
                  { label: "On Time", color: "bg-emerald-500" },
                  { label: "At Risk", color: "bg-amber-500" },
                  { label: "Delayed", color: "bg-red-500" },
                  { label: "Offline", color: "bg-gray-400" },
                ].map(s => (
                  <div key={s.label} className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${s.color}`} />
                    <span className="text-xs text-gray-500">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <MapView
              showVehicle
              disrupted={scenario.tripDisrupted && !scenario.alternativeApproved}
              alternative={scenario.alternativeApproved}
              className="h-64"
            />
            {/* Trip table */}
            <div className="px-4 py-3">
              <div className="text-xs text-gray-400 uppercase font-semibold mb-2">Active Trips</div>
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-gray-400 uppercase tracking-wide">
                    <th className="text-left pb-2 font-semibold">Trip</th>
                    <th className="text-left pb-2 font-semibold">Vehicle</th>
                    <th className="text-left pb-2 font-semibold">Faculty</th>
                    <th className="text-left pb-2 font-semibold">ETA</th>
                    <th className="text-left pb-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { id: "#104", vehicle: "MH12 AB 1234", faculty: "Dr. Anjali K.", eta: scenario.tripDisrupted && !scenario.alternativeApproved ? "10:18" : "9:20", status: scenario.tripDisrupted && !scenario.alternativeApproved ? "delayed" as const : "on-time" as const },
                    { id: "#105", vehicle: "MH12 CD 5678", faculty: "Prof. Rane", eta: "9:45", status: "on-time" as const },
                    { id: "#106", vehicle: "MH14 GH 3456", faculty: "Prof. Sharma", eta: "9:30", status: "on-time" as const },
                  ].map(trip => (
                    <tr key={trip.id} className="border-t border-gray-50">
                      <td className="py-2 font-semibold text-violet-700">
                        <button onClick={() => navigate(trip.status === "delayed" ? "A06" : "A05")}
                          className="hover:underline">{trip.id}</button>
                      </td>
                      <td className="py-2 text-gray-600">{trip.vehicle}</td>
                      <td className="py-2 text-gray-600">{trip.faculty}</td>
                      <td className={`py-2 font-semibold ${trip.status === "delayed" ? "text-red-600" : "text-gray-900"}`}>{trip.eta}</td>
                      <td className="py-2"><StatusBadge status={trip.status} size="sm" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Operations Feed */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="font-semibold text-gray-900 text-sm">AI Operations Feed</div>
            <div className="text-xs text-gray-400 mt-0.5">Real-time system activity</div>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              scenario.tripDisrupted && !scenario.alternativeApproved
                ? { time: "08:20", msg: "Admin approval required — Dr. Anjali K. trip intervention", type: "action" }
                : null,
              ...FEED.filter(f => f.type !== "action"),
            ].filter(Boolean).slice(0, 6).map((item, i) => {
              const f = item!;
              const colors = {
                success: "border-l-emerald-400 bg-emerald-50",
                attention: "border-l-amber-400 bg-amber-50",
                intervention: "border-l-violet-400 bg-violet-50",
                action: "border-l-red-400 bg-red-50",
              };
              const textColors = {
                success: "text-gray-700",
                attention: "text-amber-800",
                intervention: "text-violet-800",
                action: "text-red-800",
              };
              const timeColors = {
                success: "text-gray-400",
                attention: "text-amber-500",
                intervention: "text-violet-500",
                action: "text-red-500",
              };
              const c = colors[f.type as keyof typeof colors] || "bg-gray-50";
              return (
                <button key={i} onClick={() => f.type === "action" ? navigate("A06") : undefined}
                  className={`w-full text-left px-4 py-3 border-l-4 ${c} hover:opacity-90 transition-opacity`}>
                  <div className={`text-[11px] font-bold ${timeColors[f.type as keyof typeof timeColors] || "text-gray-400"}`}>{f.time}</div>
                  <div className={`text-xs mt-0.5 ${textColors[f.type as keyof typeof textColors] || "text-gray-700"}`}>{f.msg}</div>
                </button>
              );
            })}
          </div>
          <div className="p-4 border-t border-gray-100">
            <button onClick={() => navigate("A05")}
              className="w-full text-center text-xs text-violet-600 font-semibold hover:text-violet-700">
              View Live Operations →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
