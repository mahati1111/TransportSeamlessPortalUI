import { StatusType } from "../types";

const configs: Record<StatusType, { bg: string; text: string; dot: string; label: string }> = {
  planning:        { bg: "bg-violet-100", text: "text-violet-700", dot: "bg-violet-500", label: "Planning" },
  monitoring:      { bg: "bg-blue-100",   text: "text-blue-700",   dot: "bg-blue-500",   label: "Monitoring" },
  recommended:     { bg: "bg-amber-100",  text: "text-amber-700",  dot: "bg-amber-500",  label: "Recommended" },
  "action-required": { bg: "bg-orange-100", text: "text-orange-700", dot: "bg-orange-500", label: "Action Required" },
  executing:       { bg: "bg-emerald-100",text: "text-emerald-700",dot: "bg-emerald-500",label: "Executing" },
  completed:       { bg: "bg-emerald-100",text: "text-emerald-700",dot: "bg-emerald-500",label: "Completed" },
  exception:       { bg: "bg-red-100",    text: "text-red-700",    dot: "bg-red-500",    label: "Exception" },
  confirmed:       { bg: "bg-emerald-100",text: "text-emerald-700",dot: "bg-emerald-500",label: "Confirmed" },
  delayed:         { bg: "bg-red-100",    text: "text-red-700",    dot: "bg-red-500",    label: "Delayed" },
  "on-time":       { bg: "bg-emerald-100",text: "text-emerald-700",dot: "bg-emerald-500",label: "On Time" },
  new:             { bg: "bg-violet-100", text: "text-violet-700", dot: "bg-violet-500", label: "New" },
  submitted:       { bg: "bg-violet-100", text: "text-violet-700", dot: "bg-violet-500", label: "Submitted" },
  approved:        { bg: "bg-emerald-100",text: "text-emerald-700",dot: "bg-emerald-500",label: "Approved" },
  rejected:        { bg: "bg-red-100",    text: "text-red-700",    dot: "bg-red-500",    label: "Rejected" },
};

interface Props {
  status: StatusType;
  label?: string;
  size?: "sm" | "md";
}

export default function StatusBadge({ status, label, size = "md" }: Props) {
  const c = configs[status];
  const padding = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold tracking-wide uppercase ${padding} ${c.bg} ${c.text}`}>
      <span className={`inline-block w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {label ?? c.label}
    </span>
  );
}
