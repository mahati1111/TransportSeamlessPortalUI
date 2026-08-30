import { Screen, ScenarioState } from "../../types";
import MapView from "../../components/MapView";
import StatusBadge from "../../components/StatusBadge";

interface Props {
  navigate: (s: Screen) => void;
  scenario: ScenarioState;
}

export default function LiveOperations({ navigate, scenario }: Props) {
  const trips = [
    {
      id: "#104", faculty: "Dr. Anjali Kulkarni", vehicle: "MH12 AB 1234", driver: "Ramesh Pawar",
      currentEta: scenario.tripDisrupted && !scenario.alternativeApproved ? "10:18" : "9:20",
      lectureTime: "10:00", risk: scenario.tripDisrupted && !scenario.alternativeApproved ? "HIGH" : "LOW",
      status: scenario.tripDisrupted && !scenario.alternativeApproved ? "delayed" as const : "on-time" as const,
    },
    { id: "#105", faculty: "Prof. Deepak Rane", vehicle: "MH12 CD 5678", driver: "Suresh Kumar", currentEta: "9:45", lectureTime: "11:00", risk: "LOW", status: "on-time" as const },
    { id: "#106", faculty: "Dr. Priya Mehta", vehicle: "MH14 GH 3456", driver: "Vikram Patil", currentEta: "9:30", lectureTime: "9:00", risk: "MED", status: "monitoring" as const },
    { id: "#107", faculty: "Prof. Rahul Sharma", vehicle: "MH12 CD 5678", driver: "Suresh Kumar", currentEta: "2:10", lectureTime: "2:00", risk: "LOW", status: "confirmed" as const },
  ];

  return (
    <div className="p-6">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <div className="text-xs tracking-widest uppercase text-violet-500 font-semibold mb-1">Live Operations</div>
          <h1 className="font-jakarta text-2xl font-bold text-gray-900">Real-Time Operations</h1>
          <p className="text-gray-500 text-sm mt-1">All active trips · 18 September 2026 · Live tracking</p>
        </div>
        {scenario.tripDisrupted && !scenario.alternativeApproved && (
          <button onClick={() => navigate("A06")}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold animate-pulse">
            ⚡ Intervention Required
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Map */}
        <div className="col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <div className="font-semibold text-gray-900 text-sm">Live Fleet Map</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-gray-500">Live</span>
              </div>
            </div>
            <MapView
              showVehicle
              disrupted={scenario.tripDisrupted && !scenario.alternativeApproved}
              alternative={scenario.alternativeApproved}
              className="h-80"
            />
          </div>
        </div>

        {/* Trip list */}
        <div className="space-y-3">
          <div className="text-xs tracking-widest uppercase text-gray-400 font-semibold">Active Trips</div>
          {trips.map(trip => (
            <button key={trip.id} onClick={() => navigate(trip.status === "delayed" ? "A06" : "A05")}
              className={`w-full text-left bg-white rounded-xl border p-3.5 hover:shadow-sm transition-all ${trip.risk === "HIGH" ? "border-red-300 ring-1 ring-red-200" : "border-gray-200"}`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-violet-700">{trip.id}</span>
                    {trip.risk === "HIGH" && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-red-100 text-red-600 rounded">HIGH RISK</span>
                    )}
                    {trip.risk === "MED" && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-amber-100 text-amber-600 rounded">AT RISK</span>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-gray-800 mt-0.5">{trip.faculty}</div>
                </div>
                <StatusBadge status={trip.status} size="sm" />
              </div>
              <div className="text-xs text-gray-400 mb-1">{trip.vehicle} · {trip.driver}</div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="bg-gray-50 rounded px-2 py-1">
                  <div className="text-[10px] text-gray-400">Current ETA</div>
                  <div className={`text-xs font-bold ${trip.risk === "HIGH" ? "text-red-600" : "text-gray-900"}`}>{trip.currentEta}</div>
                </div>
                <div className="bg-gray-50 rounded px-2 py-1">
                  <div className="text-[10px] text-gray-400">Lecture</div>
                  <div className="text-xs font-bold text-gray-900">{trip.lectureTime}</div>
                </div>
              </div>
              {trip.risk === "HIGH" && (
                <div className="mt-2 text-xs text-red-600 font-semibold">⚠ Tap to review intervention →</div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
