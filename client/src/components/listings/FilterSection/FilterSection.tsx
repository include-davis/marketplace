import styles from "./FilterSection.module.scss";

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
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>Listings</h2>

      <div className={styles.statusList}>
        {statuses.map((status) => {
          const isSelected = selectedStatus === status.key;

          return (
            <div
              key={status.key}
              onClick={() => onStatusChange(status.key)}
              className={`${styles.statusItem} ${
                isSelected ? styles.selected : ""
              }`}
            >
              <span className={styles.label}>{status.label}</span>

              <span className={styles.count}>
                {statusCounts?.[status.key] ?? 0}
              </span>
            </div>
          );
        })}
      </div>
    </aside>
  );
}