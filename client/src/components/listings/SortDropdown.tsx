type SortDropdownProps = {
    sortOption: string;
    onSortChange: (value: string) => void;
  };
  
  export default function SortDropdown({
    sortOption,
    onSortChange,
  }: SortDropdownProps) {
    return (
      <select
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        style={{
          padding: "0.75rem",
          borderRadius: "8px",
          backgroundColor: "#111",
          color: "white",
          border: "1px solid #333",
        }}
      >
        <option value="default">Sort By</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="title-az">Title: A to Z</option>
      </select>
    );
  }