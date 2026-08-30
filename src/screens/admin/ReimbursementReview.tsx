import { useState } from "react";
import { Screen } from "../../types";
import StatusBadge from "../../components/StatusBadge";
import Modal from "../../components/Modal";

interface Props { navigate: (s: Screen) => void; }

const CLAIMS = [
  { id: 1, faculty: "Dr. Anjali Kulkarni", trip: "Hinjewadi → MIT ADT", claimed: 720, eligible: 720, limit: 1000, status: "approved" as const, type: "auto" },
  { id: 2, faculty: "Dr. Sunita Patil", trip: "Pune Airport → MIT ADT", claimed: 1850, eligible: 1000, limit: 1000, status: "action-required" as const, type: "review" },
  { id: 3, faculty: "Prof. Amit Desai", trip: "Viman Nagar → MIT ADT", claimed: 450, eligible: 450, limit: 1000, status: "approved" as const, type: "auto" },
  { id: 4, faculty: "Prof. Deepak Rane", trip: "Wakad → MIT ADT", claimed: 1200, eligible: 1000, limit: 1000, status: "action-required" as const, type: "review" },
];

export default function ReimbursementReview({ navigate }: Props) {
  const [selected, setSelected] = useState<number | null>(2);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [approved, setApproved] = useState<number[]>([]);

  const claim = CLAIMS.find(c => c.id === selected);

  return (
    <div className="p-6">
      <div className="mb-5">
        <div className="text-xs tracking-widest uppercase text-violet-500 font-semibold mb-1">Reimbursements</div>
        <h1 className="font-jakarta text-2xl font-bold text-gray-900">Reimbursement Review</h1>
        <p className="text-gray-500 text-sm mt-1">{CLAIMS.filter(c=>c.type==="review").length} claims pending review · {CLAIMS.filter(c=>c.type==="auto").length} auto-approved</p>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Table */}
        <div className="col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-xs text-gray-400 uppercase tracking-wide">
                  <th className="py-3 px-4 text-left font-semibold">Faculty</th>
                  <th className="py-3 px-4 text-left font-semibold">Trip</th>
                  <th className="py-3 px-4 text-left font-semibold">Claimed</th>
                  <th className="py-3 px-4 text-left font-semibold">Eligible</th>
                  <th className="py-3 px-4 text-left font-semibold">Limit</th>
                  <th className="py-3 px-4 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {CLAIMS.map(c => (
                  <tr key={c.id} onClick={() => setSelected(c.id)}
                    className={`cursor-pointer hover:bg-gray-50 transition-colors ${selected === c.id ? "bg-violet-50" : ""}`}>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-gray-900 text-sm">{c.faculty}</div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{c.trip}</td>
                    <td className="py-3 px-4 text-sm font-bold text-gray-900">₹{c.claimed.toLocaleString()}</td>
                    <td className={`py-3 px-4 text-sm font-bold ${c.type === "review" ? "text-amber-600" : "text-emerald-600"}`}>
                      ₹{c.eligible.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">₹{c.limit.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      {approved.includes(c.id) ? (
                        <StatusBadge status="approved" size="sm" />
                      ) : (
                        <StatusBadge status={c.status} size="sm" label={c.type === "auto" ? "Auto-approved" : "Review Required"} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail panel */}
        {claim && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="text-xs text-gray-400 uppercase font-semibold mb-3">Claim Detail</div>
              <div className="font-bold text-gray-900 mb-1">{claim.faculty}</div>
              <div className="text-xs text-gray-400 mb-4">{claim.trip}</div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Claimed</span>
                  <span className="font-bold text-gray-900">₹{claim.claimed.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Eligible</span>
                  <span className={`font-bold ${claim.type === "review" ? "text-amber-600" : "text-emerald-600"}`}>₹{claim.eligible.toLocaleString()}</span>
                </div>
                {claim.type === "review" && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Excess</span>
                    <span className="font-bold text-red-600">₹{(claim.claimed - claim.eligible).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Policy limit</span>
                  <span className="font-semibold text-gray-700">₹{claim.limit.toLocaleString()}</span>
                </div>
              </div>

              {/* Verification */}
              <div className="border-t border-gray-100 pt-3">
                <div className="text-xs text-gray-400 uppercase mb-2">Verification</div>
                {[
                  { label: "Trip verified", pass: true },
                  { label: "Receipt verified", pass: true },
                  { label: "Emergency verified", pass: true },
                  { label: "Fare within policy", pass: claim.type !== "review" },
                ].map(({ label, pass }) => (
                  <div key={label} className="flex items-center gap-2 py-1">
                    <span className={`text-sm ${pass ? "text-emerald-500" : "text-red-500"}`}>{pass ? "✓" : "✕"}</span>
                    <span className="text-xs text-gray-600">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {claim.type === "review" && !approved.includes(claim.id) && (
              <div className="space-y-2">
                <button onClick={() => setShowApproveModal(true)}
                  className="w-full bg-violet-700 hover:bg-violet-800 text-white py-2.5 rounded-xl text-sm font-semibold">
                  Approve ₹{claim.eligible.toLocaleString()}
                </button>
                <button className="w-full border border-red-200 text-red-600 hover:bg-red-50 py-2.5 rounded-xl text-sm font-semibold">
                  Reject
                </button>
                <button className="w-full border border-gray-200 text-gray-700 hover:bg-gray-50 py-2.5 rounded-xl text-sm font-semibold">
                  Review Trip
                </button>
              </div>
            )}
            {approved.includes(claim.id) && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl py-3 text-center text-sm font-semibold text-emerald-700">
                ✓ Approved ₹{claim.eligible.toLocaleString()}
              </div>
            )}
          </div>
        )}
      </div>

      <Modal
        open={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        title={`Approve reimbursement of ₹${claim?.eligible.toLocaleString()}?`}
        footer={
          <>
            <button onClick={() => setShowApproveModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700">Cancel</button>
            <button onClick={() => { setApproved(prev => [...prev, selected!]); setShowApproveModal(false); }}
              className="px-4 py-2 bg-violet-700 hover:bg-violet-800 text-white rounded-lg text-sm font-semibold">Approve</button>
          </>
        }
      >
        <div className="text-sm text-gray-600">
          <p className="mb-2">Fare exceeds policy limit. Approving eligible amount of <strong>₹{claim?.eligible.toLocaleString()}</strong> out of claimed ₹{claim?.claimed.toLocaleString()}.</p>
          <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-500">
            Excess of ₹{claim && (claim.claimed - claim.eligible).toLocaleString()} will not be reimbursed as per policy.
          </div>
        </div>
      </Modal>
    </div>
  );
}
