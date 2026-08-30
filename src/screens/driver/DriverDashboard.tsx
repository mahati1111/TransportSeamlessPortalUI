import { Screen, ScenarioState } from "../../types";
import StatusBadge from "../../components/StatusBadge";

interface Props {
  navigate: (s: Screen) => void;
  scenario: ScenarioState;
}

export default function DriverDashboard({ navigate, scenario }: Props) {
  const vehicle = scenario.alternativeApproved ? "MH12 CD 5678" : "MH12 AB 1234";

  return (
    <div className="bg-gray-50 min-h-full">
      {/* Driver profile hero */}
      <div className="bg-[#1C0F4A] px-5 pt-4 pb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-14 h-14 rounded-full bg-violet-600 flex items-center justify-center">
            <span className="text-white text-xl font-bold">RP</span>
          </div>
          <div>
            <div className="font-jakarta font-bold text-white text-lg">Ramesh Pawar</div>
            <div className="text-violet-300 text-sm">Driver · MIT ADT University</div>
          </div>
        </div>
        {/* Notification */}
        <div className="bg-amber-400 rounded-xl px-4 py-3 flex items-center gap-3">
          <span className="text-gray-900 text-lg">📣</span>
          <div className="flex-1">
            <div className="font-bold text-gray-900 text-sm">New route assigned for 8:10 AM.</div>
            <div className="text-gray-800 text-xs">3 passengers · Hinjewadi → MIT ADT</div>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-4">
        {/* Vehicle card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                <span className="text-xl">🚐</span>
              </div>
              <div>
                <div className="font-bold text-gray-900">{vehicle}</div>
                <div className="text-xs text-gray-400">Toyota Innova Crysta</div>
              </div>
            </div>
            <StatusBadge status="confirmed" label="Assigned" size="sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg p-2.5">
              <div className="text-xs text-gray-400">Capacity</div>
              <div className="font-bold text-gray-900">4 seats</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2.5">
              <div className="text-xs text-gray-400">Fuel</div>
              <div className="font-bold text-gray-900">Full ✓</div>
            </div>
          </div>
        </div>

        {/* Today's trips */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="font-jakarta font-bold text-gray-900">Today's Trips</div>
            <div className="text-xs text-violet-600 font-semibold">2 trips</div>
          </div>

          {/* Next trip */}
          <div className="bg-violet-50 rounded-xl p-3 mb-2">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-violet-500 font-semibold uppercase">Next — Trip 1</div>
              <div className="font-bold text-violet-800">8:10 AM</div>
            </div>
            <div className="font-semibold text-gray-900 text-sm">Hinjewadi → MIT ADT</div>
            <div className="text-xs text-gray-500 mt-1">3 passengers · 4 stops</div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              {["Dr. Anjali K.", "Prof. Rane", "Prof. Joshi"].map((p, i) => (
                <div key={i} className="bg-white rounded-lg px-2 py-1.5">
                  <div className="text-[10px] text-gray-400">P{i+1}</div>
                  <div className="text-xs font-semibold text-gray-700">{p}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Second trip */}
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs text-gray-400 font-semibold uppercase">Trip 2</div>
              <div className="font-bold text-gray-600">12:30 PM</div>
            </div>
            <div className="text-sm text-gray-600">MIT ADT → Hinjewadi</div>
            <div className="text-xs text-gray-400 mt-0.5">Return route · 2 passengers</div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 pb-4">
        <button onClick={() => navigate("D02")}
          className="w-full bg-violet-700 hover:bg-violet-800 text-white py-4 rounded-2xl font-jakarta font-bold text-lg transition-colors shadow-sm">
          View Today's Route →
        </button>
      </div>
    </div>
  );
}
