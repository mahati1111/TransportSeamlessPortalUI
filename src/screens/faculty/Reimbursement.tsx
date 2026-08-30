import { useState } from "react";
import { Screen, ScenarioState } from "../../types";
import StatusBadge from "../../components/StatusBadge";

interface Props { navigate: (s: Screen) => void; scenario: ScenarioState; }

export default function Reimbursement({ navigate, scenario }: Props) {
  const [claimType, setClaimType] = useState<"auto" | "review">("auto");
  const [uploaded, setUploaded] = useState(true);

  const isExcess = claimType === "review";
  const claimedAmount = isExcess ? 1850 : 720;
  const eligibleAmount = isExcess ? 1000 : 720;
  const excess = isExcess ? 850 : 0;

  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <div className="text-xs tracking-widest uppercase text-violet-500 font-semibold mb-1">Reimbursement</div>
          <h1 className="font-jakarta text-2xl font-bold text-gray-900">Reimbursement</h1>
          <p className="text-gray-500 text-sm mt-1">Upload receipts and track claim status</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setClaimType("auto")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${claimType === "auto" ? "border-emerald-400 bg-emerald-50 text-emerald-700" : "border-gray-200 text-gray-500"}`}>
            Auto-approved (₹720)
          </button>
          <button onClick={() => setClaimType("review")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${claimType === "review" ? "border-amber-400 bg-amber-50 text-amber-700" : "border-gray-200 text-gray-500"}`}>
            Excess case (₹1,850)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 space-y-4">
          {/* Status banner */}
          {!isExcess ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <div className="font-semibold text-emerald-800">Automatically Approved</div>
                <div className="text-emerald-600 text-sm">All policy checks passed. Reimbursement: ₹720</div>
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 flex items-center gap-3">
              <span className="text-amber-500 text-xl">⚠</span>
              <div>
                <div className="font-semibold text-amber-800">Admin Review Required</div>
                <div className="text-amber-600 text-sm">Claim ₹1,850 exceeds policy limit of ₹1,000. Excess: ₹{excess}</div>
              </div>
            </div>
          )}

          {/* Receipt upload */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-3">Receipt</div>
            {uploaded ? (
              <div className="border-2 border-dashed border-emerald-300 rounded-xl bg-emerald-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg border border-emerald-200 flex items-center justify-center">
                    <span className="text-emerald-600 text-xl">📄</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 text-sm">uber_receipt_18sep2026.pdf</div>
                    <div className="text-xs text-gray-400">Uploaded · 234 KB</div>
                  </div>
                  <span className="text-emerald-500 text-lg">✓</span>
                </div>
                {/* Extracted data */}
                <div className="mt-3 pt-3 border-t border-emerald-200">
                  <div className="text-xs text-emerald-600 font-semibold mb-2">Extracted by System</div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Provider", value: "Uber" },
                      { label: "Date", value: "18 Sep 2026" },
                      { label: "Fare", value: `₹${claimedAmount}` },
                      { label: "Trip", value: "Hinjewadi → MIT ADT" },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-white rounded-lg px-3 py-2">
                        <div className="text-xs text-gray-400">{label}</div>
                        <div className="font-semibold text-gray-900 text-sm">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <button onClick={() => setUploaded(true)}
                className="w-full border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-violet-300 hover:bg-violet-50 transition-all">
                <div className="text-3xl mb-2">📤</div>
                <div className="font-semibold text-gray-700 text-sm">Upload Receipt</div>
                <div className="text-xs text-gray-400 mt-1">PDF, JPG or PNG · Max 5 MB</div>
              </button>
            )}
          </div>

          {/* Verification checklist */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-3">Eligibility Verification</div>
            {[
              { label: "Trip verified", pass: true },
              { label: "Fare within limit", pass: !isExcess },
              { label: "Quota available", pass: true },
              { label: "Receipt valid", pass: true },
              { label: "Emergency eligible", pass: true },
            ].map(({ label, pass }) => (
              <div key={label} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${pass ? "bg-emerald-500" : "bg-red-500"}`}>
                  <span className="text-white text-[10px]">{pass ? "✓" : "✕"}</span>
                </div>
                <span className="text-sm text-gray-700">{label}</span>
                <span className={`ml-auto text-xs font-semibold ${pass ? "text-emerald-600" : "text-red-500"}`}>{pass ? "Pass" : "Fail"}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: summary */}
        <div className="space-y-4">
          <div className={`rounded-xl border-2 p-5 ${isExcess ? "border-amber-300 bg-amber-50" : "border-emerald-300 bg-emerald-50"}`}>
            <div className="text-xs uppercase font-semibold tracking-wide mb-3 text-gray-500">Claim Summary</div>
            <div className="space-y-3">
              <div>
                <div className="text-xs text-gray-400">Claimed Amount</div>
                <div className="font-jakarta font-bold text-2xl text-gray-900">₹{claimedAmount.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Eligible Amount</div>
                <div className={`font-jakarta font-bold text-xl ${isExcess ? "text-amber-700" : "text-emerald-700"}`}>₹{eligibleAmount.toLocaleString()}</div>
              </div>
              {isExcess && (
                <div>
                  <div className="text-xs text-gray-400">Excess (not covered)</div>
                  <div className="font-jakarta font-bold text-xl text-red-600">₹{excess.toLocaleString()}</div>
                </div>
              )}
              <div className="pt-2 border-t border-gray-200">
                <div className="text-xs text-gray-400 mb-1">Policy Limit</div>
                <div className="text-sm font-semibold text-gray-700">₹1,000 per trip</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-xs uppercase font-semibold tracking-wide text-gray-400 mb-3">Status</div>
            <StatusBadge status={isExcess ? "action-required" : "approved"} label={isExcess ? "Admin Review" : "Auto-approved"} />
            <div className="mt-3 text-xs text-gray-500">
              {isExcess ? "Admin will review excess amount within 2 business days" : "Amount will be processed within 5 business days"}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-xs uppercase font-semibold tracking-wide text-gray-400 mb-3">Claim Timeline</div>
            {[
              { label: "Receipt uploaded", time: "18 Sep, 12:45 PM", done: true },
              { label: "Data extracted", time: "18 Sep, 12:45 PM", done: true },
              { label: "Policy verified", time: "18 Sep, 12:46 PM", done: true },
              { label: isExcess ? "Admin review" : "Auto-approved", time: isExcess ? "Pending" : "18 Sep, 12:46 PM", done: !isExcess },
              { label: "Payment processed", time: "Within 5 days", done: false },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-2.5 mb-2">
                <div className={`w-3 h-3 rounded-full mt-0.5 flex-shrink-0 ${step.done ? "bg-emerald-500" : "bg-gray-200"}`} />
                <div>
                  <div className={`text-xs font-semibold ${step.done ? "text-gray-900" : "text-gray-400"}`}>{step.label}</div>
                  <div className="text-[10px] text-gray-400">{step.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
