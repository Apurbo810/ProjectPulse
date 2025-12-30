type Props = {
    label: string;
    variant: "green" | "yellow" | "red";
  };
  
  const styles = {
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
  };
  
  export default function Badge({ label, variant }: Props) {
    return (
      <span
        className={`inline-flex items-center px-2 py-1 text-sm font-medium rounded ${styles[variant]}`}
      >
        {label}
      </span>
    );
  }
  