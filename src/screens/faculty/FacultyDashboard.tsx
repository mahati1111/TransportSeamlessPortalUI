import { Screen, ScenarioState } from "../../types";
import StatusBadge from "../../components/StatusBadge";

interface Props {
  navigate: (s: Screen) => void;
  scenario: ScenarioState;
}

export default function FacultyDashboard({ navigate, scenario }: Props) {
  const transportStatus = scenario.alternativeApproved ? "exception" : scenario.tripDisrupted ? "delayed" : "confirmed";
  const transportLabel = scenario.alternativeApproved ? "Vehicle Updated" : scenario.tripDisrupted ? "Delay Detected" : "Transport Confirmed";
  const eta = scenario.alternativeApproved ? "9:42 AM" : scenario.tripDisrupted ? "10:18 AM" : "9:20 AM";
  const vehicle = scenario.alternativeApproved ? "MH12 CD 5678" : "MH12 AB 1234";
  const etaColor = scenario.tripDisrupted && !scenario.alternativeApproved ? "text-red-600" : "text-emerald-600";

  return (
    <div className="p-6 max-w-5xl">
      {/* Welcome */}
      <div className="mb-6">
        <div className="text-xs tracking-widest uppercase text-violet-500 font-semibold mb-1">Overview</div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-jakarta text-3xl font-bold text-gray-900">Good morning, Dr. Kulkarni</h1>
            <p className="text-gray-500 text-sm mt-1">Your visit is confirmed. System is monitoring transport.</p>
          </div>
          <button onClick={() => navigate("F02")}
            className="flex items-center gap-2 bg-violet-700 hover:bg-violet-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">
            <span>+</span> New Visit Request
          </button>
        </div>
      </div>

      {/* Alert banner */}
      {scenario.tripDisrupted && !scenario.alternativeApproved && (
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 flex items-center gap-3">
          <span className="text-amber-500 text-xl">⚠</span>
          <div>
            <div className="font-semibold text-amber-800 text-sm">Traffic detected on your route</div>
            <div className="text-amber-700 text-xs">Admin is reviewing alternative transport options. You'll be notified automatically.</div>
          </div>
        </div>
      )}
      {scenario.alternativeApproved && (
        <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-3 flex items-center gap-3">
          <span className="text-emerald-500 text-xl">✓</span>
          <div>
            <div className="font-semibold text-emerald-800 text-sm">Alternative vehicle assigned — you'll arrive on time</div>
            <div className="text-emerald-700 text-xs">Vehicle changed to MH12 CD 5678. New ETA: 9:42 AM. Lecture protected.</div>
          </div>
        </div>
      )}

      {/* KPI strip */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <button onClick={() => navigate("F04")}
          className="bg-white rounded-xl border border-gray-200 p-4 text-left hover:border-violet-300 hover:shadow-sm transition-all group">
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Pickup in</div>
          <div className="font-jakarta text-2xl font-bold text-violet-700 group-hover:text-violet-800">18 min</div>
          <div className="text-xs text-gray-500 mt-0.5">Driver is approaching</div>
          <div className="w-full h-1 bg-violet-600 rounded mt-3" />
        </button>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Visit Date</div>
          <div className="font-jakarta text-2xl font-bold text-gray-900">18 Sep</div>
          <div className="text-xs text-gray-500 mt-0.5">Lecture: 10:00 – 12:00 PM</div>
          <div className="w-full h-1 bg-amber-400 rounded mt-3" />
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Reimbursement</div>
          <div className="font-jakarta text-2xl font-bold text-gray-900">₹720</div>
          <div className="text-xs text-emerald-600 mt-0.5">Auto-approved</div>
          <div className="w-full h-1 bg-emerald-500 rounded mt-3" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Left col — main cards */}
        <div className="col-span-2 space-y-4">
          {/* Transport card */}
          <button onClick={() => navigate("F04")}
            className="w-full bg-white rounded-xl border border-gray-200 p-5 text-left hover:border-violet-300 hover:shadow-sm transition-all">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs tracking-widest uppercase text-gray-400 font-semibold">Transport</div>
                <div className="font-jakarta text-lg font-bold text-gray-900 mt-0.5">Pickup · 8:10 AM</div>
              </div>
              <StatusBadge status={transportStatus} label={transportLabel} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-400 mb-1">Vehicle</div>
                <div className="font-semibold text-gray-900 text-sm">{vehicle}</div>
                <div className="text-xs text-gray-500">Capacity: {scenario.alternativeApproved ? "6" : "4"}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-400 mb-1">Driver</div>
                <div className="font-semibold text-gray-900 text-sm">{scenario.alternativeApproved ? "Suresh Kumar" : "Ramesh Pawar"}</div>
                <div className="text-xs text-gray-500">+91 98765 43210</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-400 mb-1">Pickup From</div>
                <div className="font-semibold text-gray-900 text-sm">Hinjewadi Phase 1</div>
                <div className="text-xs text-gray-500">Near Infosys Gate</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-400 mb-1">ETA at MIT ADT</div>
                <div className={`font-semibold text-sm ${etaColor}`}>{eta}</div>
                <div className="text-xs text-gray-500">Lecture: 10:00 AM</div>
              </div>
            </div>
            <button onClick={e => { e.stopPropagation(); navigate("F05"); }}
              className="mt-4 w-full bg-violet-700 hover:bg-violet-800 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors">
              View Live Trip →
            </button>
          </button>

          {/* Upcoming visit */}
          <button onClick={() => navigate("F03")}
            className="w-full bg-white rounded-xl border border-gray-200 p-5 text-left hover:border-violet-300 hover:shadow-sm transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs tracking-widest uppercase text-gray-400 font-semibold">Upcoming Visit</div>
              <StatusBadge status="confirmed" />
            </div>
            <div className="flex gap-6">
              <div className="flex-1">
                <div className="font-jakarta text-lg font-bold text-gray-900">MIT ADT University</div>
                <div className="text-sm text-gray-500 mt-1">School of Engineering · Loni Kalbhor</div>
              </div>
              <div className="text-right">
                <div className="font-jakarta font-bold text-gray-900">18 Sep 2026</div>
                <div className="text-sm text-gray-500">10:00 AM – 12:00 PM</div>
              </div>
            </div>
            {/* Journey timeline */}
            <div className="mt-4 flex items-center gap-0">
              {[
                { time: "8:10", label: "Hinjewadi", color: "bg-amber-500" },
                { time: "8:25", label: "Wakad", color: "bg-violet-400" },
                { time: "8:40", label: "Baner", color: "bg-violet-500" },
                { time: "9:20", label: "MIT ADT", color: "bg-violet-700" },
                { time: "10:00", label: "Lecture ★", color: "bg-emerald-500" },
              ].map((stop, i, arr) => (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-2.5 h-2.5 rounded-full ${stop.color}`} />
                    <div className="text-[10px] text-gray-500 mt-1 whitespace-nowrap">{stop.time}</div>
                    <div className="text-[9px] text-gray-400 whitespace-nowrap">{stop.label}</div>
                  </div>
                  {i < arr.length - 1 && <div className="w-8 h-0.5 bg-gray-200 mx-1 mb-6" />}
                </div>
              ))}
            </div>
          </button>
        </div>

        {/* Right col */}
        <div className="space-y-4">
          {/* Accommodation */}
          <button onClick={() => navigate("F06")}
            className="w-full bg-white rounded-xl border border-gray-200 p-4 text-left hover:border-violet-300 transition-all">
            <div className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-2">Accommodation</div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-violet-600 text-lg">🏠</span>
              <div className="font-semibold text-gray-900 text-sm">Guest House · G-204</div>
            </div>
            <div className="text-xs text-gray-500">Check-in 9:45 AM</div>
            <div className="mt-2">
              <StatusBadge status="confirmed" size="sm" label="Reserved" />
            </div>
          </button>

          {/* Food */}
          <button onClick={() => navigate("F06")}
            className="w-full bg-white rounded-xl border border-gray-200 p-4 text-left hover:border-violet-300 transition-all">
            <div className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-2">Food</div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-amber-500 text-lg">🍽</span>
              <div className="font-semibold text-gray-900 text-sm">Lunch · 12:15 PM</div>
            </div>
            <div className="text-xs text-gray-500">Guest Faculty Dining Hall</div>
            <div className="mt-2">
              <StatusBadge status="confirmed" size="sm" label="Reserved" />
            </div>
          </button>

          {/* Return transport */}
          <button onClick={() => navigate("F07")}
            className="w-full bg-white rounded-xl border border-gray-200 p-4 text-left hover:border-amber-200 transition-all">
            <div className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-2">Return Transport</div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-amber-500 text-lg">🚐</span>
              <div className="font-semibold text-gray-900 text-sm">12:30 PM Departure</div>
            </div>
            <div className="text-xs text-gray-500">MIT ADT → Hinjewadi via Wakad</div>
            <div className="mt-2">
              <StatusBadge status="recommended" size="sm" label="Awaiting Confirm" />
            </div>
          </button>

          {/* Reimbursement */}
          <button onClick={() => navigate("F09")}
            className="w-full bg-white rounded-xl border border-gray-200 p-4 text-left hover:border-violet-300 transition-all">
            <div className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-2">Reimbursement</div>
            <div className="font-jakarta text-xl font-bold text-gray-900">₹720</div>
            <div className="text-xs text-emerald-600 font-semibold mt-0.5">Auto-approved</div>
            <div className="text-xs text-gray-400 mt-1">Uber · 18 Sep</div>
          </button>
        </div>
      </div>
    </div>
  );
}
