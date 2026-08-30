import { useState } from "react";
import { Screen } from "../../types";

interface Props { navigate: (s: Screen) => void; }

const STOPS = [
  { stop: 1, location: "Hinjewadi Phase 1", passenger: "Dr. Anjali Kulkarni", time: "8:10 AM" },
  { stop: 2, location: "Wakad", passenger: "Prof. Deepak Rane", time: "8:25 AM" },
  { stop: 3, location: "Baner", passenger: "Prof. Sneha Joshi", time: "8:40 AM" },
];

export default function PickupStatus({ navigate }: Props) {
  const [currentStop, setCurrentStop] = useState(1);
  const [boarded, setBoarded] = useState<number[]>([]);
  const [showNoShow, setShowNoShow] = useState(false);
  const [complete, setComplete] = useState(false);

  const stop = STOPS[currentStop - 1];

  const handleBoarded = () => {
    setBoarded(prev => [...prev, currentStop]);
    if (currentStop < STOPS.length) {
      setTimeout(() => { setCurrentStop(prev => prev + 1); navigate("D03"); }, 800);
    } else {
      setComplete(true);
    }
  };

  const handleNoShow = () => {
    setShowNoShow(false);
    if (currentStop < STOPS.length) {
      setCurrentStop(prev => prev + 1);
    } else {
      setComplete(true);
    }
  };

  if (complete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full bg-white px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-5">
          <span className="text-4xl">✓</span>
        </div>
        <h2 className="font-jakarta font-bold text-gray-900 text-2xl mb-2">All Passengers Boarded</h2>
        <p className="text-gray-500 text-sm mb-6">{boarded.length} of {STOPS.length} passengers confirmed</p>
        <button onClick={() => navigate("D06")}
          className="w-full bg-violet-700 hover:bg-violet-800 text-white py-4 rounded-2xl font-bold text-base">
          Navigate to MIT ADT →
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="text-xs text-gray-400 uppercase font-semibold mb-0.5">Pickup Status</div>
        <div className="font-jakarta font-bold text-gray-900 text-xl">Stop {currentStop} of {STOPS.length}</div>
      </div>

      {/* Progress */}
      <div className="px-4 py-3">
        <div className="flex gap-2">
          {STOPS.map((s, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i + 1 < currentStop ? "bg-emerald-500" : i + 1 === currentStop ? "bg-violet-600" : "bg-gray-200"}`} />
          ))}
        </div>
      </div>

      <div className="flex-1 px-4">
        {/* Current stop card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
              <span className="text-2xl">📍</span>
            </div>
            <div>
              <div className="font-jakarta font-bold text-gray-900 text-lg">{stop.location}</div>
              <div className="text-sm text-gray-500">Expected: {stop.time}</div>
            </div>
          </div>

          <div className="bg-violet-50 rounded-xl p-4 mb-4">
            <div className="text-xs text-violet-500 font-semibold uppercase mb-1">Passenger</div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">{stop.passenger.split(" ").map(n=>n[0]).join("").slice(0,2)}</span>
              </div>
              <div>
                <div className="font-bold text-gray-900">{stop.passenger}</div>
                <div className="text-xs text-violet-500">Awaiting pickup</div>
              </div>
            </div>
          </div>

          {/* Waiting indicator */}
          <div className="flex items-center gap-2 text-amber-600 text-sm mb-2">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-semibold">Waiting for passenger to board</span>
          </div>
        </div>

        {/* Already boarded */}
        {boarded.length > 0 && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-4">
            <div className="text-xs text-emerald-600 font-semibold uppercase mb-2">On Board</div>
            {boarded.map(b => (
              <div key={b} className="flex items-center gap-2 text-sm text-emerald-700">
                <span>✓</span> {STOPS[b-1].passenger}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom actions */}
      <div className="px-4 pb-4 space-y-2.5">
        <button onClick={handleBoarded}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-jakarta font-bold text-lg transition-colors">
          ✓ Passenger Boarded
        </button>
        <button onClick={() => setShowNoShow(true)}
          className="w-full bg-white border border-red-200 text-red-600 py-3.5 rounded-2xl font-bold text-base hover:bg-red-50">
          Passenger No-Show
        </button>
      </div>

      {/* No-show modal */}
      {showNoShow && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/40">
          <div className="bg-white w-full rounded-t-3xl p-6 pb-8">
            <div className="w-12 h-1 bg-gray-200 rounded mx-auto mb-5" />
            <h3 className="font-jakarta font-bold text-gray-900 text-xl text-center mb-2">Mark as no-show?</h3>
            <p className="text-gray-500 text-sm text-center mb-6">{stop.passenger} will be marked as no-show and admin will be notified.</p>
            <div className="space-y-2.5">
              <button onClick={handleNoShow}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-bold text-base">Confirm No-Show</button>
              <button onClick={() => setShowNoShow(false)}
                className="w-full border border-gray-200 text-gray-700 py-3.5 rounded-2xl font-semibold text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
