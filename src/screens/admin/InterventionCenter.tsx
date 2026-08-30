import { useState } from "react";
import { Screen, ScenarioState } from "../../types";
import Modal from "../../components/Modal";

interface Props {
  navigate: (s: Screen) => void;
  scenario: ScenarioState;
  setScenario: (s: Partial<ScenarioState>) => void;
}

export default function InterventionCenter({ navigate, scenario, setScenario }: Props) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleApprove = () => {
    setShowConfirm(false);
    setShowSuccess(true);
    setTimeout(() => {
      setScenario({ alternativeApproved: true });
      setShowSuccess(false);
    }, 1800);
  };

  if (scenario.alternativeApproved) {
    return (
      <div className="p-6 max-w-xl mx-auto mt-12">
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-5">
            <span className="text-white text-3xl">✓</span>
          </div>
          <h2 className="font-jakarta text-2xl font-bold text-gray-900 mb-2">Plan Approved</h2>
          <div className="space-y-2 text-sm text-emerald-700 mb-6">
            <div>✓ Alternative vehicle assigned — MH12 CD 5678</div>
            <div>✓ Driver (Suresh Kumar) notified</div>
            <div>✓ Dr. Anjali Kulkarni notified</div>
            <div>✓ Route updated · New ETA: 9:42 AM</div>
          </div>
          <button onClick={() => navigate("A05")} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm">
            View Live Operations →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl">
      {/* Alert header */}
      <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 mb-5 flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-lg">⚡</span>
        </div>
        <div>
          <div className="text-xs text-red-500 font-semibold uppercase tracking-wide mb-0.5">Transport Intervention</div>
          <div className="font-jakarta font-bold text-gray-900 text-xl">Dr. Anjali Kulkarni's trip is delayed</div>
          <div className="text-red-700 text-sm mt-1">Current ETA: 10:18 AM · Lecture: 10:00 AM · <strong>Lecture will be missed without intervention</strong></div>
        </div>
        <div className="ml-auto text-right">
          <div className="text-xs text-gray-400">Detected</div>
          <div className="font-bold text-gray-900 text-sm">08:18 AM</div>
        </div>
      </div>

      {/* Comparison */}
      <div className="grid grid-cols-2 gap-5 mb-5">
        {/* Current plan */}
        <div className="bg-white rounded-xl border-2 border-red-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="font-jakarta font-bold text-gray-900">Current Plan</div>
            <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-lg uppercase">Problem</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Vehicle</span>
              <span className="font-semibold text-gray-900">MH12 AB 1234</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Driver</span>
              <span className="font-semibold text-gray-900">Ramesh Pawar</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Current ETA</span>
              <span className="font-bold text-red-600 text-base">10:18 AM</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Lecture</span>
              <span className="font-semibold text-gray-900">10:00 AM</span>
            </div>
            <div className="pt-2 border-t border-gray-100">
              <div className="text-xs text-gray-400 mb-1">Impact</div>
              <div className="flex items-center gap-1.5 text-red-600 font-semibold text-sm">
                <span>✕</span> Lecture missed — 18 min late
              </div>
            </div>
          </div>
        </div>

        {/* AI recommended */}
        <div className="bg-white rounded-xl border-2 border-violet-400 p-5 relative">
          <div className="absolute -top-3 left-4">
            <span className="px-3 py-1 bg-amber-400 text-gray-900 text-xs font-bold rounded-full">✦ AI Recommended</span>
          </div>
          <div className="flex items-center justify-between mb-4 mt-1">
            <div className="font-jakarta font-bold text-gray-900">Plan B</div>
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-lg uppercase">Preferred</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Vehicle</span>
              <span className="font-semibold text-gray-900">MH12 CD 5678</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Driver</span>
              <span className="font-semibold text-gray-900">Suresh Kumar</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">New ETA</span>
              <span className="font-bold text-emerald-600 text-base">9:42 AM</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Lecture</span>
              <span className="font-semibold text-gray-900">10:00 AM</span>
            </div>
            <div className="pt-2 border-t border-gray-100">
              <div className="text-xs text-gray-400 mb-1">Impact</div>
              <div className="flex items-center gap-1.5 text-emerald-600 font-semibold text-sm">
                <span>✓</span> Lecture protected — 18 min early
              </div>
              <div className="flex items-center gap-1.5 text-emerald-600 text-xs mt-1">
                <span>✓</span> No additional cost · No cab required
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Evidence chips */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-5">
        <div className="text-xs text-gray-400 uppercase font-semibold mb-3">Evidence</div>
        <div className="flex gap-2 flex-wrap">
          {[
            { label: "High delay probability", color: "bg-red-50 text-red-700 border-red-200" },
            { label: "Alternative vehicle nearby", color: "bg-violet-50 text-violet-700 border-violet-200" },
            { label: "Lecture deadline: 10:00 AM", color: "bg-amber-50 text-amber-700 border-amber-200" },
            { label: "Vehicle available (Suresh)", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
            { label: "No cab required", color: "bg-blue-50 text-blue-700 border-blue-200" },
            { label: "0 additional cost", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
          ].map(chip => (
            <span key={chip.label} className={`px-3 py-1 rounded-full text-xs font-semibold border ${chip.color}`}>{chip.label}</span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button onClick={() => setShowConfirm(true)}
          className="flex-1 bg-violet-700 hover:bg-violet-800 text-white py-3.5 rounded-xl font-jakarta font-bold text-base transition-colors shadow-sm">
          ✓ Approve Plan
        </button>
        <button onClick={() => navigate("A07")}
          className="px-6 py-3.5 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 text-sm">
          View Alternatives
        </button>
        <button className="px-6 py-3.5 border border-red-200 text-red-600 rounded-xl font-semibold hover:bg-red-50 text-sm">
          Reject
        </button>
      </div>

      {/* Confirm modal */}
      <Modal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Approve vehicle transfer?"
        footer={
          <>
            <button onClick={() => setShowConfirm(false)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
            <button onClick={handleApprove} className="px-4 py-2 bg-violet-700 hover:bg-violet-800 text-white rounded-lg text-sm font-semibold">Approve</button>
          </>
        }
      >
        <div className="text-sm text-gray-600 space-y-3">
          <p>Transfer Dr. Anjali Kulkarni from <strong>MH12 AB 1234</strong> to <strong>MH12 CD 5678</strong> (Suresh Kumar)?</p>
          <div className="bg-violet-50 rounded-lg p-3 text-xs">
            <div className="font-semibold text-violet-800 mb-1">This action will:</div>
            <div className="text-violet-700 space-y-0.5">
              <div>· Assign Suresh Kumar for pickup</div>
              <div>· Update ETA to 9:42 AM</div>
              <div>· Notify Dr. Anjali Kulkarni automatically</div>
              <div>· Update driver route for both vehicles</div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Success overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl">
            <div className="w-12 h-12 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <div className="font-jakarta font-bold text-gray-900">Applying intervention…</div>
            <div className="text-sm text-gray-500 mt-1">Notifying driver and faculty</div>
          </div>
        </div>
      )}
    </div>
  );
}
