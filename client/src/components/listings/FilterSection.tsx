type FilterSectionProps = {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
  };
  
  export default function FilterSection({
    selectedCategory,
    onCategoryChange,
  }: FilterSectionProps) {
    const categories = ["All", "Electronics", "Clothing", "Home", "Books"];
  
    return (
      <aside
        style={{
          border: "1px solid #333",
          borderRadius: "10px",
          padding: "1rem",
          backgroundColor: "#111",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Filters</h2>
  
        <div>
          <p style={{ marginBottom: "0.5rem" }}>Category</p>
          {categories.map((category) => (
            <label
              key={category}
              style={{
                display: "block",
                marginBottom: "0.5rem",
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={() => onCategoryChange(category)}
                style={{ marginRight: "0.5rem" }}
              />
              {category}
            </label>
          ))}
        </div>
      </aside>
    );
  }