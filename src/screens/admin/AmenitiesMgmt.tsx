import { useState } from "react";
import { Screen } from "../../types";

interface Props { navigate: (s: Screen) => void; }

export default function AmenitiesMgmt({ navigate }: Props) {
  const [tab, setTab] = useState<"accommodation" | "food" | "access">("accommodation");

  const rooms = [
    { id: "G-204", floor: "Ground", faculty: "Dr. Anjali Kulkarni", checkin: "9:45 AM", status: "reserved", recommended: true },
    { id: "G-206", floor: "Ground", faculty: "—", checkin: "—", status: "available", recommended: false },
    { id: "F-101", floor: "First", faculty: "Dr. Priya Mehta", checkin: "8:00 AM", status: "occupied", recommended: false },
    { id: "F-102", floor: "First", faculty: "—", checkin: "—", status: "available", recommended: false },
    { id: "F-108", floor: "First", faculty: "Prof. Rahul Sharma", checkin: "2:00 PM", status: "reserved", recommended: false },
    { id: "F-112", floor: "First", faculty: "—", checkin: "—", status: "maintenance", recommended: false },
  ];

  const slots = [
    { time: "7:30 AM", type: "Breakfast", capacity: "4/20", reserved: 4 },
    { time: "11:30 AM", type: "Lunch", capacity: "12/20", reserved: 12 },
    { time: "12:15 PM", type: "Lunch", capacity: "8/20", reserved: 8, highlighted: true },
    { time: "1:00 PM", type: "Lunch", capacity: "18/20", reserved: 18 },
    { time: "1:30 PM", type: "Lunch", capacity: "20/20", reserved: 20 },
    { time: "4:00 PM", type: "Snacks", capacity: "6/15", reserved: 6 },
  ];

  const statusColor: Record<string, string> = {
    available: "bg-emerald-50 text-emerald-700",
    reserved: "bg-violet-50 text-violet-700",
    occupied: "bg-blue-50 text-blue-700",
    maintenance: "bg-red-50 text-red-600",
  };

  return (
    <div className="p-6">
      <div className="mb-5">
        <div className="text-xs tracking-widest uppercase text-violet-500 font-semibold mb-1">Amenities</div>
        <h1 className="font-jakarta text-2xl font-bold text-gray-900">Amenities Management</h1>
        <p className="text-gray-500 text-sm mt-1">Guest house · Dining · Campus access · 18 September 2026</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-5 w-fit">
        {[
          { id: "accommodation" as const, label: "Accommodation" },
          { id: "food" as const, label: "Food & Dining" },
          { id: "access" as const, label: "Campus Access" },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t.id ? "bg-white text-violet-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "accommodation" && (
        <div>
          {/* AI Recommendation */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4 flex items-start gap-3">
            <span className="text-amber-500 text-xl mt-0.5">✦</span>
            <div className="flex-1">
              <div className="font-semibold text-amber-900 text-sm">Room G-204 recommended for Dr. Anjali Kulkarni</div>
              <div className="flex gap-2 mt-1.5 flex-wrap">
                {["Available", "Near lecture hall", "Matches schedule"].map(r => (
                  <span key={r} className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">{r}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-semibold">Accept</button>
              <button className="px-3 py-1.5 border border-amber-200 text-amber-700 rounded-lg text-xs font-semibold hover:bg-amber-50">Alternatives</button>
            </div>
          </div>

          {/* Room grid */}
          <div className="grid grid-cols-3 gap-3">
            {rooms.map(room => (
              <div key={room.id} className={`bg-white rounded-xl border p-4 ${room.recommended ? "border-amber-300 ring-1 ring-amber-200" : "border-gray-200"}`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-bold text-gray-900">Room {room.id}</div>
                    <div className="text-xs text-gray-400">{room.floor} Floor</div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColor[room.status]}`}>{room.status}</span>
                    {room.recommended && <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold">Recommended</span>}
                  </div>
                </div>
                {room.faculty !== "—" && (
                  <div className="text-xs text-gray-600 mt-1">{room.faculty}</div>
                )}
                {room.checkin !== "—" && (
                  <div className="text-xs text-gray-400 mt-0.5">Check-in: {room.checkin}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "food" && (
        <div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 grid grid-cols-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">
              <span>Time</span>
              <span>Type</span>
              <span>Reservations</span>
              <span>Capacity</span>
            </div>
            {slots.map((slot, i) => (
              <div key={i} className={`px-4 py-3 border-b border-gray-50 last:border-0 grid grid-cols-4 items-center ${slot.highlighted ? "bg-violet-50" : ""}`}>
                <span className={`font-semibold text-sm ${slot.highlighted ? "text-violet-700" : "text-gray-900"}`}>{slot.time}</span>
                <span className="text-sm text-gray-600">{slot.type}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-gray-200 rounded">
                    <div className="h-1.5 rounded bg-violet-500" style={{ width: `${(slot.reserved/20)*100}%` }} />
                  </div>
                  <span className="text-xs text-gray-500">{slot.capacity}</span>
                </div>
                {slot.highlighted && <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded font-semibold w-fit">Dr. Anjali K.</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "access" && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="text-xs text-gray-400 uppercase font-semibold mb-4">Access Authorizations</div>
          {[
            { faculty: "Dr. Anjali Kulkarni", gate: "✓ Cleared", reception: "✓ Registered", hall: "Hall 301", vehicle: "MH12 AB 1234" },
            { faculty: "Prof. Deepak Rane", gate: "✓ Cleared", reception: "✓ Registered", hall: "Hall 205", vehicle: "MH12 CD 5678" },
            { faculty: "Dr. Priya Mehta", gate: "Pending", reception: "Pending", hall: "Hall 101", vehicle: "MH14 GH 3456" },
          ].map((row, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
              <div className="font-semibold text-gray-900 text-sm w-44">{row.faculty}</div>
              <div className="flex items-center gap-4 text-xs">
                <span className={row.gate.startsWith("✓") ? "text-emerald-600 font-semibold" : "text-amber-500"}>{row.gate}</span>
                <span className={row.reception.startsWith("✓") ? "text-emerald-600 font-semibold" : "text-amber-500"}>{row.reception}</span>
                <span className="text-gray-600">{row.hall}</span>
                <span className="text-gray-400">{row.vehicle}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
