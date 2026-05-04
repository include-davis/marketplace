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
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "1rem",
        backgroundColor: "#fff",
        width: "100%",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      <h2
        style={{
          marginBottom: "1rem",
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
                padding: "0.5rem 0.75rem",
                marginBottom: "0.25rem",
                cursor: "pointer",
                borderRadius: "6px",
                backgroundColor: isSelected ? "#f3f3f3" : "transparent",
                fontWeight: isSelected ? 600 : 400,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) e.currentTarget.style.background = "#fafafa";
              }}
              onMouseLeave={(e) => {
                if (!isSelected) e.currentTarget.style.background = "transparent";
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