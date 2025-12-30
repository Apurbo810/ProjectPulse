type Props = {
  status: "On Track" | "At Risk" | "Critical";
};

const styles = {
  "On Track": {
    bg: "bg-green-100",
    text: "text-green-700",
    dot: "bg-green-600",
  },
  "At Risk": {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    dot: "bg-yellow-600",
  },
  "Critical": {
    bg: "bg-red-100",
    text: "text-red-700",
    dot: "bg-red-600",
  },
};

export default function HealthBadge({ status }: Props) {
  const s = styles[status];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${s.bg} ${s.text}`}
    >
      <span className={`h-2 w-2 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}
