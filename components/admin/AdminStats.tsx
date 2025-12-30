type AdminStatsProps = {
  total: number;
  onTrack: number;
  atRisk: number;
  critical: number;
};

export default function AdminStats({
  total,
  onTrack,
  atRisk,
  critical,
}: AdminStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <Stat
        label="Total Projects"
        value={total}
        accent="from-blue-500 to-blue-600"
      />
      <Stat
        label="On Track"
        value={onTrack}
        accent="from-green-500 to-green-600"
      />
      <Stat
        label="At Risk"
        value={atRisk}
        accent="from-yellow-500 to-yellow-600"
      />
      <Stat
        label="Critical"
        value={critical}
        accent="from-red-500 to-red-600"
      />
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {/* Accent bar */}
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`}
      />

      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}
