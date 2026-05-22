// "use client";

// import { useMemo, useState } from "react";
// import FilterSection from "@/components/listings/FilterSection";
// import ProductGrid from "@/components/listings/ProductGrid";
// import SortDropdown from "@/components/listings/SortDropdown";
// import {
//   EmptyState,
//   ErrorState,
//   LoadingState,
// } from "@/components/listings/ListingStates";

// type Product = {
//   id: number;
//   title: string;
//   price: number;
//   category: string;
// };

// const mockProducts: Product[] = [
//   { id: 1, title: "Wireless Mouse", price: 25, category: "Electronics" },
//   { id: 2, title: "Desk Lamp", price: 40, category: "Home" },
//   { id: 3, title: "T-Shirt", price: 18, category: "Clothing" },
//   { id: 4, title: "Notebook", price: 8, category: "Books" },
//   { id: 5, title: "Keyboard", price: 55, category: "Electronics" },
//   { id: 6, title: "Hoodie", price: 35, category: "Clothing" },
//   { id: 7, title: "Shelf Organizer", price: 30, category: "Home" },
//   { id: 8, title: "Novel", price: 14, category: "Books" },
// ];

// export default function ListingsPage() {
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [sortOption, setSortOption] = useState("default");
//   const [visibleCount, setVisibleCount] = useState(4);

//   const loading = false;
//   const error = false;

//   const filteredAndSortedProducts = useMemo(() => {
//     let result = [...mockProducts];

//     if (selectedCategory !== "All") {
//       result = result.filter(
//         (product) => product.category === selectedCategory
//       );
//     }

//     if (sortOption === "price-low") {
//       result.sort((a, b) => a.price - b.price);
//     } else if (sortOption === "price-high") {
//       result.sort((a, b) => b.price - a.price);
//     } else if (sortOption === "title-az") {
//       result.sort((a, b) => a.title.localeCompare(b.title));
//     }

//     return result;
//   }, [selectedCategory, sortOption]);

//   const visibleProducts = filteredAndSortedProducts.slice(0, visibleCount);
//   const canLoadMore = visibleCount < filteredAndSortedProducts.length;

//   return (
//     <main style={{ padding: "2rem" }}>
//       <h1 style={{ marginBottom: "1.5rem" }}>Listings</h1>

//       <section
//         style={{
//           display: "flex",
//           justifyContent: "flex-end",
//           marginBottom: "1.5rem",
//         }}
//       >
//         <SortDropdown
//           sortOption={sortOption}
//           onSortChange={setSortOption}
//         />
//       </section>

//       <section
//         style={{
//           display: "grid",
//           gridTemplateColumns: "260px 1fr",
//           gap: "2rem",
//           alignItems: "start",
//         }}
//       >
//         <FilterSection
//           selectedCategory={selectedCategory}
//           onCategoryChange={setSelectedCategory}
//         />

//         <div>
//           {loading ? (
//             <LoadingState />
//           ) : error ? (
//             <ErrorState />
//           ) : filteredAndSortedProducts.length === 0 ? (
//             <EmptyState />
//           ) : (
//             <>
//               <ProductGrid products={visibleProducts} />

//               {canLoadMore && (
//                 <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
//                   <button
//                     onClick={() => setVisibleCount((prev) => prev + 4)}
//                     style={{
//                       padding: "0.75rem 1.25rem",
//                       borderRadius: "8px",
//                       border: "1px solid #333",
//                       backgroundColor: "#111",
//                       color: "white",
//                       cursor: "pointer",
//                     }}
//                   >
//                     Load More
//                   </button>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </section>
//     </main>
//   );
// }