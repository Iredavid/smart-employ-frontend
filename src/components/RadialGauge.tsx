interface RadialGaugeProps {
  value: number; // 0–100
}

export function RadialGauge({ value }: RadialGaugeProps) {
  const radius = 70;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (value / 100) * circumference;

  const getColor = () => {
    if (value >= 75) return "#22c55e"; // green
    if (value >= 50) return "#facc15"; // yellow
    return "#ef4444"; // red
  };

  return (
    <div className="flex flex-col items-center">
      <svg height={radius * 2} width={radius * 2}>
        {/* Background circle */}
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* Progress circle */}
        <circle
          stroke={getColor()}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{
            strokeDashoffset,
            transition: "stroke-dashoffset 0.8s ease",
          }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
        />
      </svg>

      <div className="-mt-20 text-center">
        <p className="text-3xl font-bold text-gray-800">
          {value}
        </p>
        <p className="text-sm text-gray-500">out of 100</p>
        <p className="mt-1 text-sm font-medium">
          Employability Score
        </p>
      </div>
    </div>
  );
}
