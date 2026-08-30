import { Screen, ScenarioState } from "../../types";
import StatusBadge from "../../components/StatusBadge";
import MapView from "../../components/MapView";

interface Props {
  navigate: (s: Screen) => void;
  scenario: ScenarioState;
}

export default function TransportDetails({ navigate, scenario }: Props) {
  const vehicle = scenario.alternativeApproved ? "MH12 CD 5678" : "MH12 AB 1234";
  const driver = scenario.alternativeApproved ? "Suresh Kumar" : "Ramesh Pawar";
  const capacity = scenario.alternativeApproved ? 6 : 4;
  const eta = scenario.alternativeApproved ? "9:42 AM" : "9:20 AM";
  const status = scenario.tripDisrupted && !scenario.alternativeApproved ? "delayed" : "confirmed";

  const route = [
    { stop: "Hinjewadi Phase 1", time: "8:10 AM", passengers: "Dr. Anjali Kulkarni + 2" },
    { stop: "Wakad", time: "8:25 AM", passengers: "Prof. Deepak Rane" },
    { stop: "Baner", time: "8:40 AM", passengers: "Prof. Sneha Joshi" },
    { stop: "MIT ADT Campus", time: eta, passengers: "Destination" },
  ];

  const countdown = scenario.alternativeApproved ? "17 min" : scenario.tripDisrupted ? "78 min" : "37 min";
  const countdownColor = scenario.tripDisrupted && !scenario.alternativeApproved ? "text-red-600" : "text-emerald-600";

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-5">
        <div className="text-xs tracking-widest uppercase text-violet-500 font-semibold mb-1">Transport</div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-jakarta text-2xl font-bold text-gray-900">Transport Details</h1>
            <p className="text-gray-500 text-sm mt-1">18 September 2026 · Hinjewadi → MIT ADT</p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={status} />
            <button onClick={() => navigate("F05")}
              className="px-4 py-2 bg-violet-700 hover:bg-violet-800 text-white rounded-xl text-sm font-semibold transition-colors">
              View Live Trip
            </button>
          </div>
        </div>
      </div>

      {scenario.tripDisrupted && !scenario.alternativeApproved && (
        <div className="mb-5 bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 flex items-center gap-3">
          <span className="text-amber-500 text-xl">⚠</span>
          <div>
            <div className="font-semibold text-amber-800 text-sm">Traffic detected — ETA recalculated</div>
            <div className="text-amber-700 text-xs">New ETA: 10:18 AM. Admin is reviewing alternative transport.</div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 space-y-4">
          {/* Map */}
          <MapView
            disrupted={scenario.tripDisrupted && !scenario.alternativeApproved}
            showVehicle
            vehiclePosition={{ x: 170, y: 122 }}
            className="h-56"
          />

          {/* Route timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-4">Route</div>
            <div className="space-y-0">
              {route.map((stop, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${i < 2 ? "bg-violet-600 border-violet-600" : i === 2 ? "bg-amber-500 border-amber-500" : "bg-emerald-500 border-emerald-500"}`} />
                    {i < route.length - 1 && <div className="w-0.5 h-10 bg-gray-200 my-1" />}
                  </div>
                  <div className="pb-3 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{stop.stop}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{stop.passengers}</div>
                      </div>
                      <div className="text-xs font-bold text-gray-600">{stop.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-3">Vehicle</div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                <span className="text-violet-600 text-xl">🚐</span>
              </div>
              <div>
                <div className="font-bold text-gray-900">{vehicle}</div>
                <div className="text-xs text-gray-500">Capacity: {capacity} seats</div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg px-3 py-2">
              <div className="text-xs text-gray-400">Passengers</div>
              <div className="font-bold text-gray-900">3 / {capacity}</div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-3">Driver</div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center">
                <span className="text-white text-sm font-bold">{driver.split(" ").map(n=>n[0]).join("")}</span>
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm">{driver}</div>
                <div className="text-xs text-gray-500">+91 98765 43210</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-2">Pickup Time</div>
            <div className="font-jakarta text-2xl font-bold text-gray-900">8:10 AM</div>
            <div className="text-xs text-gray-500 mt-1">Hinjewadi Phase 1</div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-2">ETA at MIT ADT</div>
            <div className={`font-jakarta text-2xl font-bold ${countdownColor}`}>{eta}</div>
            <div className="text-xs text-gray-500 mt-1">Lecture at 10:00 AM</div>
          </div>

          <div className={`rounded-xl border p-4 ${countdownColor === "text-red-600" ? "bg-red-50 border-red-200" : "bg-emerald-50 border-emerald-200"}`}>
            <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Lecture Countdown</div>
            <div className={`font-jakarta text-3xl font-bold ${countdownColor}`}>{countdown}</div>
            <div className={`text-xs mt-1 ${countdownColor}`}>until 10:00 AM lecture</div>
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
