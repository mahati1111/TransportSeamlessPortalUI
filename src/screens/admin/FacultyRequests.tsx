import { useState } from "react";
import { Screen } from "../../types";
import StatusBadge from "../../components/StatusBadge";

interface Props { navigate: (s: Screen) => void; }

const REQUESTS = [
  { id: 1, faculty: "Dr. Anjali Kulkarni", date: "18 Sep", pickup: "Hinjewadi", lecture: "10:00 AM", transport: true, accommodation: false, food: true, return: true, status: "confirmed" as const },
  { id: 2, faculty: "Prof. Deepak Rane", date: "18 Sep", pickup: "Wakad", lecture: "11:00 AM", transport: true, accommodation: false, food: true, return: false, status: "confirmed" as const },
  { id: 3, faculty: "Dr. Priya Mehta", date: "19 Sep", pickup: "Baner", lecture: "9:00 AM", transport: true, accommodation: true, food: true, return: true, status: "planning" as const },
  { id: 4, faculty: "Prof. Rahul Sharma", date: "19 Sep", pickup: "Kharadi", lecture: "2:00 PM", transport: true, accommodation: false, food: false, return: true, status: "new" as const },
  { id: 5, faculty: "Dr. Sunita Patil", date: "20 Sep", pickup: "Pune Airport", lecture: "10:30 AM", transport: true, accommodation: true, food: true, return: true, status: "action-required" as const },
  { id: 6, faculty: "Prof. Amit Desai", date: "20 Sep", pickup: "Viman Nagar", lecture: "3:00 PM", transport: true, accommodation: false, food: false, return: false, status: "completed" as const },
];

export default function FacultyRequests({ navigate }: Props) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<number[]>([]);

  const filtered = REQUESTS.filter(r =>
    (filter === "all" || r.status === filter) &&
    (r.faculty.toLowerCase().includes(search.toLowerCase()) || r.pickup.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleSelect = (id: number) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="p-6">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <div className="text-xs tracking-widest uppercase text-violet-500 font-semibold mb-1">Faculty Requests</div>
          <h1 className="font-jakarta text-2xl font-bold text-gray-900">Incoming Requests</h1>
          <p className="text-gray-500 text-sm mt-1">{REQUESTS.length} requests · 18–20 September 2026</p>
        </div>
        {selected.length > 0 && (
          <button onClick={() => navigate("A03")}
            className="flex items-center gap-2 bg-violet-700 hover:bg-violet-800 text-white px-4 py-2.5 rounded-xl text-sm font-semibold">
            Plan {selected.length} Selected →
          </button>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search faculty or location…"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 pl-8 text-sm focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-200" />
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        </div>
        <div className="flex gap-1.5">
          {[
            { value: "all", label: "All" },
            { value: "new", label: "New" },
            { value: "planning", label: "Planning" },
            { value: "confirmed", label: "Confirmed" },
            { value: "action-required", label: "Action Req." },
          ].map(f => (
            <button key={f.value} onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter === f.value ? "bg-violet-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-xs text-gray-400 uppercase tracking-wide">
              <th className="py-3 px-4 text-left w-8">
                <input type="checkbox" onChange={e => setSelected(e.target.checked ? filtered.map(r=>r.id) : [])}
                  checked={selected.length === filtered.length && filtered.length > 0}
                  className="rounded" />
              </th>
              <th className="py-3 px-4 text-left font-semibold">Faculty</th>
              <th className="py-3 px-4 text-left font-semibold">Date</th>
              <th className="py-3 px-4 text-left font-semibold">Pickup</th>
              <th className="py-3 px-4 text-left font-semibold">Lecture</th>
              <th className="py-3 px-4 text-left font-semibold">Transport</th>
              <th className="py-3 px-4 text-left font-semibold">Accom.</th>
              <th className="py-3 px-4 text-left font-semibold">Food</th>
              <th className="py-3 px-4 text-left font-semibold">Return</th>
              <th className="py-3 px-4 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(req => (
              <tr key={req.id} className={`hover:bg-gray-50 cursor-pointer transition-colors ${selected.includes(req.id) ? "bg-violet-50" : ""}`}>
                <td className="py-3 px-4">
                  <input type="checkbox" checked={selected.includes(req.id)} onChange={() => toggleSelect(req.id)} className="rounded" />
                </td>
                <td className="py-3 px-4">
                  <button onClick={() => navigate("A03")} className="text-left">
                    <div className="font-semibold text-gray-900 text-sm hover:text-violet-700">{req.faculty}</div>
                  </button>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">{req.date}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{req.pickup}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{req.lecture}</td>
                <td className="py-3 px-4">
                  <span className={`text-sm ${req.transport ? "text-emerald-600" : "text-gray-300"}`}>{req.transport ? "✓" : "—"}</span>
                </td>
                <td className="py-3 px-4">
                  <span className={`text-sm ${req.accommodation ? "text-emerald-600" : "text-gray-300"}`}>{req.accommodation ? "✓" : "—"}</span>
                </td>
                <td className="py-3 px-4">
                  <span className={`text-sm ${req.food ? "text-emerald-600" : "text-gray-300"}`}>{req.food ? "✓" : "—"}</span>
                </td>
                <td className="py-3 px-4">
                  <span className={`text-sm ${req.return ? "text-emerald-600" : "text-gray-300"}`}>{req.return ? "✓" : "—"}</span>
                </td>
                <td className="py-3 px-4">
                  <StatusBadge status={req.status} size="sm" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
