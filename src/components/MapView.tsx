interface Stop {
  id: string;
  label: string;
  x: number;
  y: number;
  type: "pickup" | "waypoint" | "destination" | "vehicle";
}

interface Props {
  vehiclePosition?: { x: number; y: number };
  showVehicle?: boolean;
  highlightedRoute?: boolean;
  disrupted?: boolean;
  alternative?: boolean;
  className?: string;
}

const STOPS: Stop[] = [
  { id: "hinjewadi", label: "Hinjewadi", x: 80,  y: 130, type: "pickup" },
  { id: "wakad",     label: "Wakad",     x: 170, y: 120, type: "waypoint" },
  { id: "baner",     label: "Baner",     x: 250, y: 105, type: "waypoint" },
  { id: "mitadt",    label: "MIT ADT",   x: 370, y: 200, type: "destination" },
];

const routeD = "M 80 130 C 100 128, 150 122, 170 120 C 200 117, 230 108, 250 105 C 290 100, 340 150, 370 200";
const altRouteD = "M 200 190 C 250 185, 310 195, 370 200";

export default function MapView({ vehiclePosition, showVehicle = true, disrupted = false, alternative = false, className = "" }: Props) {
  const vx = vehiclePosition?.x ?? 160;
  const vy = vehiclePosition?.y ?? 122;

  return (
    <div className={`relative bg-slate-50 rounded-xl overflow-hidden border border-gray-200 ${className}`}>
      <svg viewBox="0 0 480 280" className="w-full h-full" style={{ minHeight: 200 }}>
        {/* Background grid lines */}
        {[40,80,120,160,200,240].map(y => (
          <line key={y} x1="0" y1={y} x2="480" y2={y} stroke="#E2E8F0" strokeWidth="1" />
        ))}
        {[60,120,180,240,300,360,420].map(x => (
          <line key={x} x1={x} y1="0" x2={x} y2="280" stroke="#E2E8F0" strokeWidth="1" />
        ))}

        {/* Road network (background) */}
        <path d="M 0 150 Q 200 140 480 160" stroke="#CBD5E1" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M 120 0 Q 130 140 150 280" stroke="#CBD5E1" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M 300 0 Q 320 100 350 280" stroke="#CBD5E1" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M 0 80 Q 240 90 480 85" stroke="#E2E8F0" strokeWidth="4" fill="none" />

        {/* Main route */}
        <path
          d={routeD}
          stroke={disrupted ? "#EF4444" : "#7C3AED"}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={disrupted ? "6 4" : "none"}
          opacity={alternative ? 0.3 : 1}
        />

        {/* Alternative route */}
        {alternative && (
          <path
            d={altRouteD}
            stroke="#10B981"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        )}

        {/* Stop markers */}
        {STOPS.map(stop => (
          <g key={stop.id}>
            <circle
              cx={stop.x} cy={stop.y} r="10"
              fill={stop.type === "destination" ? "#7C3AED" : stop.type === "pickup" ? "#F59E0B" : "white"}
              stroke={stop.type === "destination" ? "#5B21B6" : stop.type === "pickup" ? "#D97706" : "#7C3AED"}
              strokeWidth="2"
            />
            {stop.type === "destination" && (
              <text x={stop.x} y={stop.y + 4} textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">★</text>
            )}
            {stop.type === "pickup" && (
              <circle cx={stop.x} cy={stop.y} r="4" fill="#D97706" />
            )}
            {stop.type === "waypoint" && (
              <circle cx={stop.x} cy={stop.y} r="4" fill="#7C3AED" />
            )}
            <text x={stop.x} y={stop.y + 24} textAnchor="middle" fill="#374151" fontSize="9" fontWeight="500">
              {stop.label}
            </text>
          </g>
        ))}

        {/* Alternative vehicle marker */}
        {alternative && (
          <g>
            <circle cx={200} cy={190} r="14" fill="#10B981" opacity={0.2} />
            <rect x="192" y="184" width="16" height="12" rx="3" fill="#10B981" />
            <rect x="190" y="188" width="4" height="6" rx="1" fill="#059669" />
            <rect x="206" y="188" width="4" height="6" rx="1" fill="#059669" />
            <text x={200} y={215} textAnchor="middle" fill="#059669" fontSize="8" fontWeight="600">MH12 CD 5678</text>
          </g>
        )}

        {/* Vehicle marker */}
        {showVehicle && (
          <g>
            <circle cx={vx} cy={vy} r="16" fill={disrupted ? "#EF4444" : "#7C3AED"} opacity={0.15} />
            <rect x={vx - 8} y={vy - 6} width="16" height="12" rx="3" fill={disrupted ? "#EF4444" : "#7C3AED"} />
            <rect x={vx - 10} y={vy - 2} width="4" height="6" rx="1" fill={disrupted ? "#DC2626" : "#5B21B6"} />
            <rect x={vx + 6} y={vy - 2} width="4" height="6" rx="1" fill={disrupted ? "#DC2626" : "#5B21B6"} />
            <circle cx={vx - 5} cy={vy + 7} r="3" fill={disrupted ? "#B91C1C" : "#4C1D95"} />
            <circle cx={vx + 5} cy={vy + 7} r="3" fill={disrupted ? "#B91C1C" : "#4C1D95"} />
            <text x={vx} y={vy - 18} textAnchor="middle" fill={disrupted ? "#EF4444" : "#7C3AED"} fontSize="8" fontWeight="700">MH12 AB 1234</text>
          </g>
        )}

        {/* Labels */}
        <text x="20" y="20" fill="#94A3B8" fontSize="9">Pune · MIT ADT Route</text>
        {disrupted && (
          <g>
            <rect x="30" y="240" width="120" height="22" rx="4" fill="#FEE2E2" />
            <text x="90" y="255" textAnchor="middle" fill="#DC2626" fontSize="9" fontWeight="600">Traffic Disruption Detected</text>
          </g>
        )}
      </svg>
    </div>
  );
}
