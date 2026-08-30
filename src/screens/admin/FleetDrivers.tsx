import { useState } from "react";
import { Screen } from "../../types";
import StatusBadge from "../../components/StatusBadge";

interface Props { navigate: (s: Screen) => void; }

const VEHICLES = [
  { id: "MH12 AB 1234", type: "Van", capacity: 4, occupancy: 3, driver: "Ramesh Pawar", status: "on-time" as const, location: "Wakad", eta: "8:25", phone: "+91 98765 43210" },
  { id: "MH12 CD 5678", type: "Minibus", capacity: 6, occupancy: 4, driver: "Suresh Kumar", status: "on-time" as const, location: "Kharadi", eta: "9:35", phone: "+91 98765 43211" },
  { id: "MH14 GH 3456", type: "Van", capacity: 4, occupancy: 2, driver: "Vikram Patil", status: "on-time" as const, location: "Viman Nagar", eta: "9:50", phone: "+91 98765 43212" },
  { id: "MH14 EF 9012", type: "Minibus", capacity: 6, occupancy: 0, driver: "—", status: "delayed" as const, location: "Depot", eta: "—", phone: "—" },
  { id: "MH18 KL 1111", type: "Van", capacity: 4, occupancy: 0, driver: "Anand Shinde", status: "confirmed" as const, location: "Depot", eta: "Standby", phone: "+91 98765 43213" },
];

export default function FleetDrivers({ navigate }: Props) {
  const [view, setView] = useState<"cards" | "map">("cards");
  const [selected, setSelected] = useState<string | null>(null);

  const sel = VEHICLES.find(v => v.id === selected);

  return (
    <div className="p-6">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <div className="text-xs tracking-widest uppercase text-violet-500 font-semibold mb-1">Fleet & Drivers</div>
          <h1 className="font-jakarta text-2xl font-bold text-gray-900">Fleet Management</h1>
          <p className="text-gray-500 text-sm mt-1">{VEHICLES.length} vehicles · 18 September 2026</p>
        </div>
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          <button onClick={() => setView("cards")} className={`px-3 py-1.5 rounded text-xs font-semibold ${view === "cards" ? "bg-white shadow text-gray-900" : "text-gray-500"}`}>Cards</button>
          <button onClick={() => setView("map")} className={`px-3 py-1.5 rounded text-xs font-semibold ${view === "map" ? "bg-white shadow text-gray-900" : "text-gray-500"}`}>Map</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: "Running", value: "3", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
          { label: "Available", value: "2", color: "text-blue-600 bg-blue-50 border-blue-200" },
          { label: "Maintenance", value: "1", color: "text-red-600 bg-red-50 border-red-200" },
          { label: "Total Passengers", value: "9", color: "text-violet-600 bg-violet-50 border-violet-200" },
        ].map(s => (
          <div key={s.label} className={`rounded-xl border p-3 ${s.color}`}>
            <div className="text-xs font-semibold uppercase tracking-wide opacity-70">{s.label}</div>
            <div className="font-jakarta text-2xl font-bold mt-0.5">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-5">
        {/* Vehicle list */}
        <div className="flex-1 space-y-3">
          {VEHICLES.map(v => {
            const isSelected = selected === v.id;
            const statusColorMap = {
              "on-time": "border-l-emerald-400",
              "confirmed": "border-l-blue-400",
              "delayed": "border-l-red-400",
              "completed": "border-l-gray-400",
              "monitoring": "border-l-blue-400",
              "recommended": "border-l-amber-400",
              "action-required": "border-l-orange-400",
              "executing": "border-l-emerald-400",
              "exception": "border-l-red-400",
              "planning": "border-l-violet-400",
              "new": "border-l-violet-400",
              "submitted": "border-l-violet-400",
              "approved": "border-l-emerald-400",
              "rejected": "border-l-red-400",
            };
            return (
              <button key={v.id} onClick={() => setSelected(isSelected ? null : v.id)}
                className={`w-full text-left bg-white rounded-xl border-l-4 border border-gray-200 p-4 hover:shadow-sm transition-all ${statusColorMap[v.status] || "border-l-gray-300"} ${isSelected ? "ring-2 ring-violet-300" : ""}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <span className="text-xl">🚐</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{v.id}</div>
                      <div className="text-xs text-gray-400">{v.type} · Driver: {v.driver}</div>
                    </div>
                  </div>
                  <StatusBadge status={v.status} size="sm" />
                </div>
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {[
                    { label: "Capacity", value: `${v.occupancy}/${v.capacity}` },
                    { label: "Location", value: v.location },
                    { label: "ETA", value: v.eta },
                    { label: "Phone", value: v.phone.replace("+91 ", "") },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div className="text-[10px] text-gray-400">{label}</div>
                      <div className="text-xs font-semibold text-gray-800 mt-0.5">{value}</div>
                    </div>
                  ))}
                </div>
                {v.occupancy > 0 && v.status !== "delayed" && (
                  <div className="mt-2">
                    <div className="w-full h-1.5 bg-gray-100 rounded">
                      <div className="h-1.5 bg-violet-500 rounded" style={{ width: `${(v.occupancy/v.capacity)*100}%` }} />
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        {sel && (
          <div className="w-72 flex-shrink-0 space-y-3">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                  <span className="text-2xl">🚐</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">{sel.id}</div>
                  <div className="text-xs text-gray-400">{sel.type}</div>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { label: "Driver", value: sel.driver },
                  { label: "Phone", value: sel.phone },
                  { label: "Capacity", value: `${sel.occupancy}/${sel.capacity}` },
                  { label: "Location", value: sel.location },
                  { label: "ETA", value: sel.eta },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-gray-400">{label}</span>
                    <span className="font-semibold text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <StatusBadge status={sel.status} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => navigate("A05")} className="w-full border border-violet-200 text-violet-700 hover:bg-violet-50 py-2 rounded-lg text-xs font-semibold">View Live Trip</button>
              <button onClick={() => navigate("A06")} className="w-full border border-gray-200 text-gray-700 hover:bg-gray-50 py-2 rounded-lg text-xs font-semibold">View Route</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
