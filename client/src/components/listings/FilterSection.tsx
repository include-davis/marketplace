type ListingStatus = "active" | "inactive" | "draft" | "completed";

type FilterSectionProps = {
  selectedStatus: ListingStatus;
  onStatusChange: (status: ListingStatus) => void;
  statusCounts: Record<ListingStatus, number>;
};

export default function FilterSection({
  selectedStatus,
  onStatusChange,
  statusCounts,
}: FilterSectionProps) {
  const statuses: { key: ListingStatus; label: string }[] = [
    { key: "active", label: "Active" },
    { key: "inactive", label: "Inactive" },
    { key: "draft", label: "Drafts" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <aside
      style={{
        border: "2px solid #111",
        borderRadius: "8px",
        padding: "1.5rem",
        backgroundColor: "#e6e6e6",
        width: "100%",
      }}
    >
      <h2
        style={{
          marginBottom: "1.5rem",
          fontSize: "1rem",
          fontWeight: 600,
        }}
      >
        Listings
      </h2>

      <div>
        {statuses.map((status) => {
          const isSelected = selectedStatus === status.key;

          return (
            <div
              key={status.key}
              onClick={() => onStatusChange(status.key)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.55rem 0",
                marginBottom: "0.5rem",
                cursor: "pointer",
                backgroundColor: "transparent",
                fontWeight: isSelected ? 500 : 400,
                color: isSelected ? "#111" : "#555",
              }}
            >
              <span>{status.label}</span>
              <span>{statusCounts?.[status.key] ?? 0}</span>
            </div>
          );
        })}
      </div>
    </aside>
  );
}