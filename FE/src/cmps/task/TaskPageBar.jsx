import { useState } from "react";

export default function TaskPageBar() {
  const [filters, setFilters] = useState({
    status: "",
    orderBy: "",
    order: ""
  });

  const handleSubmit = () => {
    console.log("Submitting filters:", filters);
    // TODO: fetch tasks with filters
  };

  const handleFiltersChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <div className="filter-bar">
      <div className="filters">
        <div className="combobox">
          <label htmlFor="status">Status:</label>
          <select id="status" name="status" value={filters.status} onChange={handleFiltersChange}>
            <option value="">All</option>
            <option value="open">Open</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="combobox">
          <label htmlFor="orderBy">Order By:</label>
          <select
            id="orderBy"
            name="orderBy"
            value={filters.orderBy}
            onChange={handleFiltersChange}
          >
            <option value="">Default</option>
            <option value="created_at">Creation Time</option>
            <option value="due_date">Due Date</option>
          </select>
        </div>

        <div className="combobox">
          <label htmlFor="order">Order:</label>
          <select id="order" name="order" value={filters.order} onChange={handleFiltersChange}>
            <option value="">Default</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
