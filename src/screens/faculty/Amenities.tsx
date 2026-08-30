import { useState } from "react";
import { Screen } from "../../types";
import StatusBadge from "../../components/StatusBadge";

interface Props { navigate: (s: Screen) => void; }

export default function Amenities({ navigate }: Props) {
  const [tab, setTab] = useState<"accommodation" | "food" | "access">("accommodation");
  const [accomConfirmed, setAccomConfirmed] = useState(true);
  const [foodConfirmed, setFoodConfirmed] = useState(true);

  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-5">
        <div className="text-xs tracking-widest uppercase text-violet-500 font-semibold mb-1">Amenities</div>
        <h1 className="font-jakarta text-2xl font-bold text-gray-900">Visit Amenities</h1>
        <p className="text-gray-500 text-sm mt-1">Accommodation, food and campus access for 18 September 2026</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-5 w-fit">
        {[
          { id: "accommodation" as const, label: "Accommodation" },
          { id: "food" as const, label: "Food" },
          { id: "access" as const, label: "Campus Access" },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t.id ? "bg-white text-violet-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "accommodation" && (
        <div className="space-y-4">
          {/* AI Recommendation */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <span className="text-amber-500 text-lg mt-0.5">✦</span>
            <div className="flex-1">
              <div className="text-xs text-amber-600 font-semibold uppercase tracking-wide mb-1">System Recommendation</div>
              <div className="font-semibold text-amber-900">Room G-204 has been reserved for you</div>
              <div className="text-amber-700 text-sm mt-1">Based on availability and proximity to your lecture hall</div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {["Available", "Near lecture hall", "Matches schedule"].map(r => (
                  <span key={r} className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">{r}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Room card */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                  <span className="text-2xl">🏠</span>
                </div>
                <div>
                  <div className="font-jakarta font-bold text-gray-900">MIT ADT Guest House</div>
                  <div className="text-sm text-gray-500">Room G-204 · Second Floor</div>
                </div>
              </div>
              <StatusBadge status={accomConfirmed ? "confirmed" : "recommended"} />
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: "Check-in", value: "9:45 AM" },
                { label: "Check-out", value: "6:00 PM" },
                { label: "Floor", value: "Ground" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-0.5">{label}</div>
                  <div className="font-semibold text-gray-900 text-sm">{value}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              {!accomConfirmed ? (
                <button onClick={() => setAccomConfirmed(true)}
                  className="flex-1 bg-violet-700 hover:bg-violet-800 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors">
                  Confirm Room
                </button>
              ) : (
                <div className="flex-1 bg-emerald-50 border border-emerald-200 py-2.5 rounded-xl text-sm font-semibold text-emerald-700 text-center">
                  ✓ Confirmed
                </div>
              )}
              <button className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50">
                View Details
              </button>
              <button className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50">
                Navigate
              </button>
            </div>
          </div>

          {/* Alternatives */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-3">Other Available Rooms</div>
            {[
              { room: "G-206", floor: "Ground", status: "Available" },
              { room: "F-102", floor: "First", status: "Available" },
              { room: "F-108", floor: "First", status: "Occupied" },
            ].map(r => (
              <div key={r.room} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <div className="text-sm font-semibold text-gray-900">Room {r.room}</div>
                  <div className="text-xs text-gray-400">{r.floor} Floor</div>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${r.status === "Available" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "food" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <span className="text-2xl">🍽</span>
                </div>
                <div>
                  <div className="font-jakarta font-bold text-gray-900">Lunch</div>
                  <div className="text-sm text-gray-500">Guest Faculty Dining Hall</div>
                </div>
              </div>
              <StatusBadge status={foodConfirmed ? "confirmed" : "recommended"} />
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: "Slot", value: "12:15 PM" },
                { label: "Duration", value: "45 min" },
                { label: "Guests", value: "1" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-0.5">{label}</div>
                  <div className="font-semibold text-gray-900 text-sm">{value}</div>
                </div>
              ))}
            </div>
            <div className="mb-4">
              <div className="text-xs text-gray-400 mb-2">Menu Preview</div>
              <div className="flex gap-2 flex-wrap">
                {["Dal Tadka", "Jeera Rice", "Roti", "Mixed Veg", "Curd", "Dessert"].map(item => (
                  <span key={item} className="px-2.5 py-1 bg-orange-50 text-orange-700 rounded-lg text-xs font-medium">{item}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              {!foodConfirmed ? (
                <button onClick={() => setFoodConfirmed(true)}
                  className="flex-1 bg-violet-700 hover:bg-violet-800 text-white py-2.5 rounded-xl text-sm font-semibold">
                  Confirm Slot
                </button>
              ) : (
                <div className="flex-1 bg-emerald-50 border border-emerald-200 py-2.5 rounded-xl text-sm font-semibold text-emerald-700 text-center">
                  ✓ Slot Confirmed
                </div>
              )}
              <button className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50">
                View Details
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-xs text-gray-400 uppercase font-semibold mb-3">Available Dining Slots</div>
            {[
              { time: "11:30 AM", capacity: "12/20", available: true },
              { time: "12:15 PM", capacity: "8/20", available: true, selected: true },
              { time: "1:00 PM", capacity: "18/20", available: true },
              { time: "1:30 PM", capacity: "20/20", available: false },
            ].map(slot => (
              <div key={slot.time} className={`flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 ${slot.selected ? "text-violet-700" : ""}`}>
                <div className="font-semibold text-sm">{slot.time}</div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{slot.capacity} seats</span>
                  {slot.selected && <span className="text-xs bg-violet-50 text-violet-700 px-2 py-0.5 rounded-full font-semibold">Reserved</span>}
                  {!slot.available && <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-semibold">Full</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "access" && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="text-xs text-gray-400 uppercase font-semibold mb-4">Campus Access Points</div>
          {[
            { label: "Entry Gate", icon: "🚪", status: "Cleared", desc: "Vehicle pass registered · MH12 AB 1234" },
            { label: "Reception", icon: "🏢", status: "Registered", desc: "Faculty badge ready for collection" },
            { label: "Lecture Hall 301", icon: "🎓", status: "Reserved", desc: "Room reserved 10:00 AM – 12:00 PM" },
            { label: "Guest House", icon: "🏠", status: "Cleared", desc: "Room key at reception" },
            { label: "Dining Hall", icon: "🍽", status: "Reserved", desc: "Slot at 12:15 PM" },
          ].map(({ label, icon, status, desc }) => (
            <div key={label} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
              <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center">
                <span className="text-lg">{icon}</span>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 text-sm">{label}</div>
                <div className="text-xs text-gray-400">{desc}</div>
              </div>
              <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">{status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
