export default function ProductFilters({ categories, activeCategory, setActiveCategory, sortOption, setSortOption }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
      {/* Category Dropdown */}
      <div className="w-full sm:w-auto flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Category:</span>
        <select
          className="border rounded-md px-3 py-2 text-sm w-full sm:w-auto"
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category} className="capitalize">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Dropdown */}
      <div className="w-full sm:w-auto flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        <select
          className="border rounded-md px-3 py-2 text-sm w-full sm:w-auto"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>
    </div>
  )
}