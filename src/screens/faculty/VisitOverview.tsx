import { Screen, ScenarioState } from "../../types";
import StatusBadge from "../../components/StatusBadge";

interface Props {
  navigate: (s: Screen) => void;
  scenario: ScenarioState;
}

export default function VisitOverview({ navigate, scenario }: Props) {
  const vehicle = scenario.alternativeApproved ? "MH12 CD 5678" : "MH12 AB 1234";
  const driver = scenario.alternativeApproved ? "Suresh Kumar" : "Ramesh Pawar";
  const eta = scenario.alternativeApproved ? "9:42 AM" : "9:20 AM";

  const stops = [
    { time: "8:10", label: "Pickup · Hinjewadi", status: "done" },
    { time: "8:25", label: "Wakad", status: "done" },
    { time: "8:40", label: "Baner", status: "active" },
    { time: eta, label: "MIT ADT Campus", status: "upcoming" },
    { time: "10:00", label: "Lecture — Hall 301", status: "upcoming" },
  ];

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <div className="text-xs tracking-widest uppercase text-violet-500 font-semibold mb-1">My Visit</div>
          <h1 className="font-jakarta text-2xl font-bold text-gray-900">Visit Overview</h1>
          <p className="text-gray-500 text-sm mt-1">18 September 2026 · MIT ADT University</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => navigate("F02")}
            className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            Edit Visit
          </button>
          <button onClick={() => navigate("F05")}
            className="px-4 py-2 bg-violet-700 hover:bg-violet-800 text-white rounded-xl text-sm font-semibold transition-colors">
            View Live Trip
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Left: main details */}
        <div className="col-span-2 space-y-4">
          {/* Status banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <div>
              <div className="font-semibold text-emerald-800">Visit Confirmed</div>
              <div className="text-emerald-700 text-sm">Transport, accommodation and food have been arranged by the system.</div>
            </div>
          </div>

          {/* Visit details */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-3">Visit Details</div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Date", value: "18 September 2026" },
                { label: "Lecture Time", value: "10:00 AM – 12:00 PM" },
                { label: "Campus", value: "MIT ADT · Loni Kalbhor" },
                { label: "Department", value: "School of Engineering" },
                { label: "Pickup From", value: "Hinjewadi Phase 1" },
                { label: "Passengers", value: "3" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="text-xs text-gray-400 mb-0.5">{label}</div>
                  <div className="text-sm font-semibold text-gray-900">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Transport */}
          <button onClick={() => navigate("F04")}
            className="w-full bg-white rounded-xl border border-gray-200 p-5 text-left hover:border-violet-300 hover:shadow-sm transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs tracking-widest uppercase text-gray-400 font-semibold">Transport</div>
              <StatusBadge status={scenario.alternativeApproved ? "executing" : "confirmed"} />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-violet-50 rounded-lg p-3">
                <div className="text-xs text-violet-400 mb-1">Vehicle</div>
                <div className="font-bold text-violet-900 text-sm">{vehicle}</div>
              </div>
              <div className="bg-violet-50 rounded-lg p-3">
                <div className="text-xs text-violet-400 mb-1">Driver</div>
                <div className="font-bold text-violet-900 text-sm">{driver}</div>
              </div>
              <div className="bg-violet-50 rounded-lg p-3">
                <div className="text-xs text-violet-400 mb-1">Pickup</div>
                <div className="font-bold text-violet-900 text-sm">8:10 AM</div>
              </div>
            </div>
          </button>

          {/* Journey timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-4">Journey Timeline</div>
            <div className="space-y-0">
              {stops.map((stop, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                      stop.status === "done" ? "bg-emerald-500 border-emerald-500" :
                      stop.status === "active" ? "bg-violet-600 border-violet-600 ring-2 ring-violet-200" :
                      "bg-white border-gray-300"
                    }`}>
                      {stop.status === "done" && <div className="w-full h-full rounded-full flex items-center justify-center"><span className="text-white text-[8px]">✓</span></div>}
                    </div>
                    {i < stops.length - 1 && (
                      <div className={`w-0.5 h-8 my-1 ${stop.status === "done" ? "bg-emerald-400" : "bg-gray-200"}`} />
                    )}
                  </div>
                  <div className="pb-4">
                    <div className={`text-sm font-semibold ${stop.status === "active" ? "text-violet-700" : stop.status === "done" ? "text-gray-500" : "text-gray-900"}`}>
                      {stop.label}
                    </div>
                    <div className={`text-xs mt-0.5 ${stop.status === "active" ? "text-violet-500 font-bold" : "text-gray-400"}`}>{stop.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: amenities + actions */}
        <div className="space-y-4">
          <button onClick={() => navigate("F06")}
            className="w-full bg-white rounded-xl border border-gray-200 p-4 text-left hover:border-violet-300 transition-all">
            <div className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-3">Accommodation</div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🏠</span>
              <div>
                <div className="font-bold text-gray-900 text-sm">Guest House</div>
                <div className="text-xs text-gray-500">Room G-204</div>
              </div>
            </div>
            <div className="text-xs text-gray-500">Check-in: 9:45 AM</div>
            <div className="mt-2"><StatusBadge status="confirmed" size="sm" /></div>
          </button>

          <button onClick={() => navigate("F06")}
            className="w-full bg-white rounded-xl border border-gray-200 p-4 text-left hover:border-violet-300 transition-all">
            <div className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-3">Food</div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🍽</span>
              <div>
                <div className="font-bold text-gray-900 text-sm">Lunch</div>
                <div className="text-xs text-gray-500">12:15 PM</div>
              </div>
            </div>
            <div className="text-xs text-gray-500">Guest Faculty Dining</div>
            <div className="mt-2"><StatusBadge status="confirmed" size="sm" /></div>
          </button>

          <button onClick={() => navigate("F07")}
            className="w-full bg-white rounded-xl border border-amber-200 p-4 text-left hover:border-amber-300 transition-all">
            <div className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-3">Return Transport</div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">↩</span>
              <div>
                <div className="font-bold text-gray-900 text-sm">12:30 PM</div>
                <div className="text-xs text-gray-500">MIT ADT → Hinjewadi</div>
              </div>
            </div>
            <div className="mt-2"><StatusBadge status="recommended" size="sm" label="Confirm Required" /></div>
          </button>

          <button onClick={() => navigate("F09")}
            className="w-full bg-white rounded-xl border border-gray-200 p-4 text-left hover:border-violet-300 transition-all">
            <div className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-2">Reimbursement</div>
            <div className="font-jakarta text-2xl font-bold text-emerald-600">₹720</div>
            <div className="text-xs text-emerald-700 font-semibold">Auto-approved</div>
          </button>
        </div>
      </div>
    </div>
  );
}
